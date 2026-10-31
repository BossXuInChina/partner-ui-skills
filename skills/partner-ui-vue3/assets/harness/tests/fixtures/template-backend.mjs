/** QA process only: bundle canonical test doubles and fulfill browser HTTP requests. */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const mockEntries = {
  blank: 'blank/mocks/api.ts',
  list: 'workbench-list/mocks/index.ts',
  detail: 'workbench-detail/mocks/index.ts',
  dashboard: 'workbench-dashboard/mocks/index.ts',
  chat: 'ai-chat/mocks/index.ts',
  workspace: 'ai-assistant-workspace/mocks/index.ts',
};
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
class FixtureRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
const ensure = (condition, message, status) => {
  if (!condition) throw new FixtureRequestError(message, status);
};
const textField = (body, key) => {
  ensure(record(body) && typeof body[key] === 'string', `QA_BODY_FIELD:${key}`);
  return body[key];
};
const idsField = (body, key = 'ids') => {
  ensure(
    record(body) && Array.isArray(body[key]) && body[key].every((id) => typeof id === 'string'),
    `QA_BODY_FIELD:${key}`,
  );
  return body[key];
};
const json = (value) => ({
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify(value),
});
const empty = () => ({ status: 204, body: '' });
async function sse(iterable) {
  const events = [];
  for await (const delta of iterable) events.push(`data: ${JSON.stringify(delta)}\n\n`);
  return {
    status: 200,
    contentType: 'text/event-stream',
    body: events.join('') + 'data: [DONE]\n\n',
  };
}
function chatRequest(body, key) {
  ensure(
    record(body) &&
      typeof body.requestId === 'string' &&
      typeof body.query === 'string' &&
      typeof body.idempotencyKey === 'string' &&
      body.idempotencyKey === key &&
      Array.isArray(body.messages) &&
      record(body.context) &&
      typeof body.context.aiEnabled === 'boolean' &&
      typeof body.context.mode === 'string',
    'QA_CHAT_REQUEST_INVALID',
  );
  return body;
}

/** One backend instance per page/viewport. No mutation is shared between smoke visits. */
export function createTemplateBackend(modules, { apiBasePath = '/__template-api' } = {}) {
  const list = modules.list.createMockListApi();
  const detail = modules.detail.createMockDetailApi();
  const dashboard = modules.dashboard.createMockDashboardApi();
  const blank = modules.blank.makeBlankMockApi();
  const chat = modules.chat.makeAiChatMockApi();
  const workspace = modules.workspace.makeWorkspaceMockApi();
  ensure(/^\/[\w/-]+$/.test(apiBasePath) && !apiBasePath.endsWith('/'), 'QA_API_BASE_INVALID');
  return async function handle({ url, method, headers = {}, body: serialized }) {
    try {
      const parsed = new URL(url);
      ensure(
        parsed.pathname.startsWith(apiBasePath + '/'),
        'QA_ENDPOINT_UNKNOWN:' + parsed.pathname,
        501,
      );
      const operation = parsed.pathname.slice(apiBasePath.length);
      ensure(method === 'GET' || method === 'POST', 'QA_METHOD_UNSUPPORTED:' + method, 405);
      const signal = new AbortController().signal;
      const normalizedHeaders = new Headers(headers);
      const key = normalizedHeaders.get('Idempotency-Key');
      let body;
      if (method === 'POST') {
        ensure(typeof key === 'string' && !!key.trim(), 'QA_IDEMPOTENCY_REQUIRED');
        ensure(
          normalizedHeaders.get('Content-Type')?.split(';')[0]?.trim().toLowerCase() ===
            'application/json',
          'QA_CONTENT_TYPE_REQUIRED',
        );
        try {
          body = JSON.parse(serialized ?? '');
        } catch {
          throw new FixtureRequestError('QA_JSON_INVALID');
        }
        ensure(record(body), 'QA_BODY_OBJECT_REQUIRED');
      }
      const context = { signal, idempotencyKey: key };
      const endpoint = method + ' ' + operation;
      switch (endpoint) {
        case 'GET /agreements':
          return json(await list.load(signal));
        case 'POST /agreements/create':
          return json(
            await list.create(
              {
                name: textField(body, 'name'),
                partner: textField(body, 'partner'),
                endDate: textField(body, 'endDate'),
              },
              context,
            ),
          );
        case 'POST /agreements/renew':
          return json(await list.renew(idsField(body), context));
        case 'POST /agreements/terminate':
          await list.terminate(textField(body, 'id'), context);
          return empty();
        case 'POST /agreements/export':
          ensure(Array.isArray(body.rows), 'QA_BODY_FIELD:rows');
          await list.exportRows(body.rows, context);
          return empty();
        case 'GET /agreement-detail':
          return json(await detail.load(signal));
        case 'POST /agreement-detail/save':
          ensure(record(body.agreement), 'QA_BODY_FIELD:agreement');
          return json(await detail.save(body.agreement, context));
        case 'POST /agreement-detail/renew':
          return json(await detail.renew(textField(body, 'id'), context));
        case 'POST /agreement-detail/copy':
          return json(await detail.copy(textField(body, 'id'), context));
        case 'POST /agreement-detail/export':
          await detail.exportPdf(textField(body, 'id'), context);
          return empty();
        case 'GET /dashboard':
          return json(await dashboard.load(signal));
        case 'POST /dashboard/action':
          ensure(
            ['report', 'process-todo', 'app'].includes(body.type),
            'QA_DASHBOARD_ACTION_INVALID',
          );
          await dashboard.perform(body, context);
          return empty();
        case 'POST /blank/primary':
          await blank.primary(context);
          return empty();
        case 'POST /chat/stream':
          return await sse(chat.stream(chatRequest(body, key), signal));
        case 'GET /workspace/agreements': {
          const range = parsed.searchParams.get('range');
          ensure(range === '30' || range === '90', 'QA_RANGE_INVALID');
          return json(await workspace.listAgreements({ range }, signal));
        }
        case 'GET /workspace/insights':
          return json(await workspace.listInsights(signal));
        case 'POST /workspace/chat/stream': {
          const request = chatRequest(body, key);
          return await sse(workspace.assistant.stream(request.query, signal, request.context));
        }
        case 'POST /workspace/agreements/renew':
          return json(await workspace.renew(idsField(body), context));
        case 'POST /workspace/agreements/update': {
          ensure(record(body.patch), 'QA_BODY_FIELD:patch');
          return json(
            await workspace.assistant.updateAgreement(
              textField(body, 'id'),
              { owner: textField(body.patch, 'owner') },
              context,
            ),
          );
        }
        case 'POST /workspace/agreements/renew-one':
          return json(await workspace.assistant.renewAgreement(textField(body, 'id'), context));
        default:
          throw new FixtureRequestError('QA_ENDPOINT_UNKNOWN:' + endpoint, 501);
      }
    } catch (error) {
      return {
        status: error instanceof FixtureRequestError ? error.status : 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: error.message }),
      };
    }
  };
}

function approvedFonts(fontsRoot) {
  if (!fontsRoot) return undefined;
  const directory = resolve(fontsRoot);
  const names = ['HarmonyOS_Sans.ttf', 'HarmonyOS_Sans_SC.ttf'];
  for (const name of [...names, 'LICENSE.txt'])
    ensure(existsSync(resolve(directory, name)), 'QA_APPROVED_FONT_MISSING:' + name);
  return { directory, names };
}

/** Loads mocks into the QA Node process. The production Vite graph never imports this file. */
export async function prepareTemplateFixtures(project, options = {}) {
  const directory = resolve(project);
  const require = createRequire(resolve(directory, 'package.json'));
  const { build } = require('esbuild');
  const fonts = approvedFonts(options.fontsRoot);
  const artifactRoot = resolve(directory, '.artifacts/template-fixtures');
  mkdirSync(artifactRoot, { recursive: true });
  const scratch = mkdtempSync(resolve(artifactRoot, 'run-'));
  const entry = resolve(scratch, 'mocks.mjs');
  const apiBasePath = options.apiBasePath ?? '/__template-api';
  const routePattern = '**' + apiBasePath + '/**';
  const failures = [];
  const sessions = [];
  const registrations = [];
  let closed = false;
  try {
    await build({
      stdin: {
        contents: Object.entries(mockEntries)
          .map(
            ([name, file]) =>
              `export * as ${name} from ${JSON.stringify(resolve(directory, 'src/templates', file))};`,
          )
          .join('\n'),
        resolveDir: directory,
        sourcefile: 'external-template-fixtures.ts',
        loader: 'ts',
      },
      outfile: entry,
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'node22',
      packages: 'external',
      logLevel: 'silent',
      absWorkingDir: directory,
      alias: {
        '@scaffold': resolve(directory, 'src/scaffold'),
        '@templates': resolve(directory, 'src/templates'),
      },
      ...(existsSync(resolve(directory, 'tsconfig.json'))
        ? { tsconfig: resolve(directory, 'tsconfig.json') }
        : {}),
    });
    const modules = await import(pathToFileURL(entry).href);
    const createBackend = () => createTemplateBackend(modules, { apiBasePath });
    return {
      scratch,
      failures,
      sessions,
      createBackend,
      async setupPage(page, { route, viewport } = {}) {
        if (closed) throw new Error('QA_FIXTURES_CLOSED');
        const backend = createBackend();
        const session = { path: route?.path, viewport, requests: [] };
        sessions.push(session);
        const handler = async (intercept) => {
          const request = intercept.request();
          const response = await backend({
            url: request.url(),
            method: request.method(),
            headers: request.headers(),
            body: request.postData(),
          });
          const result = {
            method: request.method(),
            path: new URL(request.url()).pathname,
            status: response.status,
          };
          session.requests.push(result);
          if (response.status >= 400)
            failures.push({ ...result, route: route?.path, body: response.body });
          await intercept.fulfill(response);
        };
        await page.route(routePattern, handler);
        registrations.push({ page, pattern: routePattern, handler });
        if (fonts) {
          const fontPattern = '**/__qa-fonts/*';
          const fontHandler = async (intercept) => {
            const name = new URL(intercept.request().url()).pathname.split('/').at(-1);
            if (!fonts.names.includes(name)) {
              failures.push({ path: '__qa-fonts/' + name, status: 404 });
              await intercept.fulfill({ status: 404, body: 'QA_FONT_UNKNOWN' });
              return;
            }
            const path = resolve(fonts.directory, name);
            ensure(path.startsWith(fonts.directory + sep), 'QA_FONT_PATH_INVALID');
            await intercept.fulfill({ path, contentType: 'font/ttf' });
          };
          await page.route(fontPattern, fontHandler);
          registrations.push({ page, pattern: fontPattern, handler: fontHandler });
          await page.addInitScript(() => {
            const install = () => {
              const style = document.createElement('style');
              style.dataset.qaApprovedFonts = 'true';
              style.textContent =
                '@font-face{font-family:"Partner AI HarmonyOS Sans";src:url("/__qa-fonts/HarmonyOS_Sans.ttf") format("truetype");font-weight:400 700;font-display:block}@font-face{font-family:"Partner AI HarmonyOS Sans SC";src:url("/__qa-fonts/HarmonyOS_Sans_SC.ttf") format("truetype");font-weight:400 700;font-display:block}:root{--partner-ui-host-font-family:"Partner AI HarmonyOS Sans","Partner AI HarmonyOS Sans SC",sans-serif}';
              document.head.append(style);
            };
            if (document.head) install();
            else document.addEventListener('DOMContentLoaded', install, { once: true });
          });
        }
      },
      assertNoFailures() {
        if (failures.length) throw new Error('QA_BACKEND_FAILURES:' + JSON.stringify(failures));
      },
      async close() {
        closed = true;
        for (const { page, pattern, handler } of registrations)
          if (!page.isClosed()) await page.unroute(pattern, handler);
        rmSync(scratch, { recursive: true, force: true });
      },
    };
  } catch (error) {
    rmSync(scratch, { recursive: true, force: true });
    throw error;
  }
}

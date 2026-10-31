import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareTemplateFixtures } from './template-backend.mjs';

const fixtureDirectory = dirname(fileURLToPath(import.meta.url));
const harness = resolve(fixtureDirectory, '../..');
const templates = existsSync(resolve(harness, 'src/templates'))
  ? resolve(harness, 'src/templates')
  : resolve(harness, '../templates');
const require = createRequire(resolve(harness, 'package.json'));
const get = (operation) => ({ url: 'http://qa.local/__template-api' + operation, method: 'GET' });
const post = (operation, body = {}) => ({
  url: 'http://qa.local/__template-api' + operation,
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'qa-operation' },
  body: JSON.stringify(body),
});
const data = (response) => {
  assert.equal(response.status, 200, response.body);
  return JSON.parse(response.body);
};

test('external QA bundles real canonical mocks using only project-local esbuild', async (t) => {
  const project = mkdtempSync(resolve(tmpdir(), 'partner-template-backend-'));
  let fixtures;
  try {
    mkdirSync(resolve(project, 'node_modules'));
    symlinkSync(
      dirname(require.resolve('esbuild/package.json')),
      resolve(project, 'node_modules/esbuild'),
      'dir',
    );
    writeFileSync(resolve(project, 'package.json'), '{"type":"module"}');
    cpSync(templates, resolve(project, 'src/templates'), { recursive: true });
    fixtures = await prepareTemplateFixtures(project);
    assert.ok(fixtures.scratch.startsWith(resolve(project, '.artifacts')));
    await t.test('all read endpoints return original mock DTOs and range filtering', async () => {
      const backend = fixtures.createBackend();
      assert.equal(data(await backend(get('/agreements'))).length, 23);
      assert.ok(data(await backend(get('/agreement-detail?id=HT-2026-0101'))).agreement.id);
      assert.equal(data(await backend(get('/dashboard'))).metrics.length, 4);
      assert.equal(data(await backend(get('/workspace/agreements?range=30'))).length, 1);
      assert.equal(data(await backend(get('/workspace/agreements?range=90'))).length, 3);
      assert.equal(data(await backend(get('/workspace/insights'))).length, 2);
    });
    await t.test('mutations call real stateful mocks and are isolated per page', async () => {
      const first = fixtures.createBackend();
      const second = fixtures.createBackend();
      const row = data(
        await first(
          post('/agreements/create', {
            name: 'QA agreement',
            partner: 'QA partner',
            endDate: '2027-01-01',
          }),
        ),
      );
      assert.equal(data(await first(get('/agreements'))).length, 24);
      assert.equal(data(await second(get('/agreements'))).length, 23);
      assert.equal(
        data(await first(post('/agreements/renew', { ids: [row.id] })))[0].status,
        '审批中',
      );
      assert.equal((await first(post('/agreements/terminate', { id: row.id }))).status, 204);
      assert.equal(data(await first(get('/agreements'))).length, 23);
      const detail = data(await first(get('/agreement-detail'))).agreement;
      assert.equal(
        data(
          await first(
            post('/agreement-detail/save', { agreement: { ...detail, owner: 'QA owner' } }),
          ),
        ).owner,
        'QA owner',
      );
      assert.equal(
        data(await first(post('/agreement-detail/renew', { id: detail.id }))).status,
        '审批中',
      );
      assert.match(
        data(await first(post('/agreement-detail/copy', { id: detail.id }))).id,
        /-copy$/,
      );
      const workspace = data(await first(get('/workspace/agreements?range=90')));
      assert.equal(
        data(
          await first(
            post('/workspace/agreements/update', { id: workspace[0].id, patch: { owner: 'QA' } }),
          ),
        ).owner,
        'QA',
      );
      assert.equal(
        data(await first(post('/workspace/agreements/renew-one', { id: workspace[0].id }))).status,
        '审批中',
      );
      assert.equal(
        data(await first(post('/workspace/agreements/renew', { ids: [workspace[2].id] })))[0]
          .status,
        '审批中',
      );
      assert.equal(data(await second(get('/workspace/agreements?range=90')))[0].status, '待续签');
    });
    await t.test('void operations use explicit 204 responses', async () => {
      const backend = fixtures.createBackend();
      for (const [operation, body] of [
        ['/blank/primary', {}],
        ['/agreements/export', { rows: [] }],
        ['/agreement-detail/export', { id: 'id' }],
        ['/dashboard/action', { type: 'report' }],
      ])
        assert.equal((await backend(post(operation, body))).status, 204);
    });
    await t.test('SSE uses actual typed mock API deltas and a terminal DONE event', async () => {
      const backend = fixtures.createBackend();
      const request = {
        requestId: 'qa-1',
        idempotencyKey: 'qa-operation',
        query: '区域排名',
        context: { aiEnabled: true, mode: '' },
        messages: [],
      };
      const chat = await backend(post('/chat/stream', request));
      assert.equal(chat.status, 200);
      assert.equal(chat.contentType, 'text/event-stream');
      assert.match(chat.body, /region-table/);
      assert.ok(chat.body.endsWith('data: [DONE]\n\n'));
      const workspace = await backend(
        post('/workspace/chat/stream', { ...request, query: '哪些协议需要续签' }),
      );
      assert.equal(workspace.status, 200);
      assert.match(workspace.body, /agreement-table/);
    });
    await t.test('unknown operations and malformed write contracts fail explicitly', async () => {
      const backend = fixtures.createBackend();
      const cases = [
        [get('/unimplemented'), 501, 'QA_ENDPOINT_UNKNOWN'],
        [{ ...get('/agreements'), method: 'DELETE' }, 405, 'QA_METHOD_UNSUPPORTED'],
        [get('/workspace/agreements?range=invalid'), 400, 'QA_RANGE_INVALID'],
        [
          { ...post('/blank/primary'), headers: { 'Content-Type': 'application/json' } },
          400,
          'QA_IDEMPOTENCY_REQUIRED',
        ],
        [{ ...post('/blank/primary'), body: '{' }, 400, 'QA_JSON_INVALID'],
        [post('/agreements/create', { name: 'missing-fields' }), 400, 'QA_BODY_FIELD'],
        [post('/workspace/agreements/renew', { ids: [42] }), 400, 'QA_BODY_FIELD'],
        [post('/chat/stream', { query: 'missing-context' }), 400, 'QA_CHAT_REQUEST_INVALID'],
      ];
      for (const [request, status, message] of cases) {
        const response = await backend(request);
        assert.equal(response.status, status, response.body);
        assert.ok(response.body.includes(message), response.body);
      }
    });
    await t.test(
      'browser setup creates fresh sessions and records any intercepted failure',
      async () => {
        const routes = new Map();
        const page = {
          route: async (pattern, handler) => routes.set(pattern, handler),
          isClosed: () => false,
          unroute: async (pattern) => routes.delete(pattern),
        };
        await fixtures.setupPage(page, {
          route: { path: '/templates/blank' },
          viewport: { width: 1440, height: 900 },
        });
        let fulfilled;
        const invoke = async (request) => {
          await routes.get('**/__template-api/**')({
            request: () => ({
              url: () => request.url,
              method: () => request.method,
              headers: () => request.headers ?? {},
              postData: () => request.body,
            }),
            fulfill: async (value) => {
              fulfilled = value;
            },
          });
          return fulfilled;
        };
        assert.equal((await invoke(get('/agreements'))).status, 200);
        fixtures.assertNoFailures();
        assert.equal((await invoke(get('/not-real'))).status, 501);
        assert.throws(() => fixtures.assertNoFailures(), /QA_BACKEND_FAILURES/);
        assert.equal(fixtures.sessions.length, 1);
        assert.equal(fixtures.sessions[0].requests.length, 2);
      },
    );
    const scratch = fixtures.scratch;
    await fixtures.close();
    assert.equal(existsSync(scratch), false);
    fixtures = undefined;
  } finally {
    await fixtures?.close();
    rmSync(project, { recursive: true, force: true });
  }
});

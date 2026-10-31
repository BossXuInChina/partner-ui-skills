#!/usr/bin/env node
/** One-time, unmasked HTML-to-Vue page evidence. Pixel differences require human review. */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { createServer as createPortServer } from 'node:net';
import { createServer as createHttpServer } from 'node:http';
import {
  createReadStream,
  existsSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const viewport = { width: 1440, height: 900 };
const evidenceEnvKeys = ['PARTNER_UI_EVIDENCE', 'SMOKE_EVIDENCE', 'WB_EVIDENCE', 'AI_EVIDENCE'];
const templates = [
  'blank',
  'workbench-list',
  'workbench-detail',
  'workbench-dashboard',
  'ai-chat',
  'ai-assistant-workspace',
];
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};
function inside(parent, child) {
  const path = relative(parent, child);
  return path === '' || (!path.startsWith('..' + sep) && path !== '..' && !isAbsolute(path));
}

async function randomPort() {
  const server = createPortServer();
  await new Promise((yes, no) => {
    server.once('error', no);
    server.listen(0, '127.0.0.1', yes);
  });
  const port = server.address().port;
  await new Promise((yes, no) => server.close((error) => (error ? no(error) : yes())));
  return port;
}
const hashFile = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');

async function staticServer(directory) {
  const base = realpathSync(directory);
  const server = createHttpServer((request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      if (pathname === '/favicon.ico') {
        response.writeHead(204).end();
        return;
      }
      if (pathname === '/__parity_blank') {
        response
          .writeHead(200, { 'Content-Type': 'text/html' })
          .end('<!doctype html><title>Parity image comparison</title>');
        return;
      }
      if (pathname.includes('\0')) throw new Error('Invalid path');
      let file = resolve(base, '.' + pathname);
      if (!inside(base, file)) throw new Error('Path escape');
      if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
      file = realpathSync(file);
      if (!inside(base, file) || !statSync(file).isFile()) throw new Error('Non-file');
      response.writeHead(200, {
        'Content-Type': mime[extname(file)] ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      if (request.method === 'HEAD') response.end();
      else createReadStream(file).pipe(response);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
  await new Promise((yes, no) => {
    server.once('error', no);
    server.listen(0, '127.0.0.1', yes);
  });
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((yes, no) => server.close((error) => (error ? no(error) : yes()))),
  };
}

async function pageState(page) {
  return page.evaluate(() => {
    const box = (element) => {
      const r = element.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    };
    const visible = (element) => {
      const r = element.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(element).visibility !== 'hidden';
    };
    const headings = [...document.querySelectorAll('h1,h2,h3')]
      .filter(visible)
      .map((element) => ({ text: element.textContent.trim(), ...box(element) }));
    const explanations = [...document.querySelectorAll('p,footer,small,details')]
      .filter(visible)
      .filter((element) => /演示|本地模拟|参考路径|页面说明/.test(element.textContent))
      .map((element) => ({ text: element.textContent.trim().slice(0, 500), ...box(element) }));
    return {
      title: document.title,
      bodyFont: getComputedStyle(document.body).fontFamily,
      pageFont: getComputedStyle(document.querySelector('.feature-page') ?? document.body)
        .fontFamily,
      fontStatus: document.fonts.status,
      approvedFontLoaded:
        document.fonts.check('400 16px "Partner AI HarmonyOS Sans"') &&
        document.fonts.check('400 16px "Partner AI HarmonyOS Sans SC"'),
      dimensions: {
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
      headings,
      explanations,
      tables: [...document.querySelectorAll('table')].filter(visible).map(box),
      aiScopes: [...document.querySelectorAll('.partner-ai')].filter(visible).map(box),
      images: [...document.images].map((image) => ({
        source: image.currentSrc.startsWith('data:')
          ? 'data:' + image.currentSrc.slice(5, 40)
          : image.currentSrc,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      })),
    };
  });
}

async function capture(browser, fixtures, url, name, variant, output, timeout) {
  const began = performance.now();
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.setDefaultTimeout(timeout);
  const errors = [],
    warnings = [],
    requests = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push('console.error: ' + message.text());
    if (
      message.type() === 'warning' &&
      /Vue warn|Failed to resolve component/i.test(message.text())
    )
      warnings.push(message.text());
  });
  page.on('pageerror', (error) => errors.push('pageerror: ' + error.message));
  page.on('requestfailed', (request) =>
    errors.push('requestfailed: ' + request.url() + ' ' + request.failure()?.errorText),
  );
  page.on('response', (response) => {
    if (new URL(response.url()).pathname.startsWith('/__template-api/'))
      requests.push({ path: new URL(response.url()).pathname, status: response.status() });
  });
  const result = {
    variant,
    url,
    screenshot: `screenshots/${name}-${variant}.png`,
    status: 'CAPTURED',
    errors,
    vueWarnings: warnings,
    requests,
    mask: [],
  };
  try {
    await fixtures.setupPage(page, { route: { path: variant + ':' + name }, viewport });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => !!document.querySelector('#app')?.__vue_app__);
    await page.locator('main').first().waitFor({ state: 'visible' });
    if (variant === 'after')
      await page.locator('[data-template-ready="true"]').first().waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      // Both sides use the same approved QA font faces; this does not modify feature sources.
      await Promise.all([
        document.fonts.load('400 16px "Partner AI HarmonyOS Sans"'),
        document.fonts.load('400 16px "Partner AI HarmonyOS Sans SC"'),
      ]);
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode().catch(() => undefined)));
      await new Promise((yes) => requestAnimationFrame(() => requestAnimationFrame(yes)));
    });
    result.state = await pageState(page);
    for (const image of result.state.images)
      if (!image.complete || image.naturalWidth === 0)
        errors.push('IMAGE_NOT_READY: ' + image.source);
    if (!result.state.approvedFontLoaded) errors.push('QA_APPROVED_FONT_NOT_LOADED');
    if (errors.length || warnings.length) result.status = 'ERROR';
  } catch (error) {
    errors.push(error.message);
    result.status = 'ERROR';
  } finally {
    try {
      await page.screenshot({
        path: resolve(output, result.screenshot),
        fullPage: true,
        animations: 'disabled',
        timeout: 5000,
      });
    } catch (error) {
      errors.push('SCREENSHOT_FAILED: ' + error.message);
      result.status = 'ERROR';
      delete result.screenshot;
    }
    result.durationMs = Math.round(performance.now() - began);
    await context.close();
  }
  return result;
}

async function compareImages(browser, base, name, before, after, output) {
  const page = await browser.newPage();
  try {
    await page.goto(base + '/__parity_blank');
    const result = await page.evaluate(
      async ({ beforeUrl, afterUrl }) => {
        const load = (url) =>
          new Promise((yes, no) => {
            const image = new Image();
            image.onload = () => yes(image);
            image.onerror = no;
            image.src = url;
          });
        const [before, after] = await Promise.all([load(beforeUrl), load(afterUrl)]);
        const width = Math.max(before.width, after.width),
          height = Math.max(before.height, after.height);
        const canvas = () => {
          const value = document.createElement('canvas');
          value.width = width;
          value.height = height;
          return value;
        };
        const first = canvas(),
          second = canvas(),
          difference = canvas();
        for (const [value, image] of [
          [first, before],
          [second, after],
        ]) {
          const context = value.getContext('2d');
          context.fillStyle = '#fff';
          context.fillRect(0, 0, width, height);
          context.drawImage(image, 0, 0);
        }
        const a = first.getContext('2d').getImageData(0, 0, width, height).data,
          b = second.getContext('2d').getImageData(0, 0, width, height).data;
        const diff = difference.getContext('2d').createImageData(width, height),
          tiles = new Map();
        let changedPixels = 0;
        for (let index = 0; index < a.length; index += 4) {
          const changed =
            Math.max(
              Math.abs(a[index] - b[index]),
              Math.abs(a[index + 1] - b[index + 1]),
              Math.abs(a[index + 2] - b[index + 2]),
              Math.abs(a[index + 3] - b[index + 3]),
            ) > 16;
          if (changed) {
            changedPixels++;
            const x = (index / 4) % width,
              y = Math.floor(index / 4 / width),
              key = `${Math.floor(x / 160)}:${Math.floor(y / 100)}`;
            tiles.set(key, (tiles.get(key) ?? 0) + 1);
          }
          diff.data[index] = changed
            ? 220
            : Math.round((b[index] + b[index + 1] + b[index + 2]) / 3);
          diff.data[index + 1] = changed ? 20 : diff.data[index];
          diff.data[index + 2] = changed ? 60 : diff.data[index];
          diff.data[index + 3] = changed ? 255 : 100;
        }
        difference.getContext('2d').putImageData(diff, 0, 0);
        const pair = document.createElement('canvas');
        pair.width = width * 2;
        pair.height = height;
        const ctx = pair.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, pair.width, pair.height);
        ctx.drawImage(before, 0, 0);
        ctx.drawImage(after, width, 0);
        return {
          width,
          height,
          beforeSize: { width: before.width, height: before.height },
          afterSize: { width: after.width, height: after.height },
          changedPixels,
          changedRatio: changedPixels / (width * height),
          thresholdPerChannel: 16,
          tileSize: { width: 160, height: 100 },
          topDifferenceRegions: [...tiles]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 12)
            .map(([key, count]) => {
              const [x, y] = key.split(':').map(Number);
              return {
                x: x * 160,
                y: y * 100,
                width: Math.min(160, width - x * 160),
                height: Math.min(100, height - y * 100),
                changedPixels: count,
              };
            }),
          difference: difference.toDataURL('image/png'),
          pair: pair.toDataURL('image/png'),
        };
      },
      { beforeUrl: base + '/' + before.screenshot, afterUrl: base + '/' + after.screenshot },
    );
    for (const [key, suffix] of [
      ['difference', 'diff'],
      ['pair', 'side-by-side'],
    ]) {
      writeFileSync(
        resolve(output, `screenshots/${name}-${suffix}.png`),
        Buffer.from(result[key].split(',')[1], 'base64'),
      );
      delete result[key];
    }
    return {
      ...result,
      differenceImage: `screenshots/${name}-diff.png`,
      sideBySide: `screenshots/${name}-side-by-side.png`,
      interpretation:
        'Unmasked diagnostic pixels, including allowed demo text removals. No visual acceptance is inferred.',
    };
  } finally {
    await page.close();
  }
}

function gallery(report) {
  const escape = (value) =>
    String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  return (
    '<!doctype html><meta charset="utf-8"><title>Template parity review</title><style>body{font:14px system-ui;margin:24px;background:#f4f5f7;color:#222}section{margin:32px 0}img{width:100%;height:auto;border:1px solid #ccc}summary{cursor:pointer}p{line-height:1.6}</style><h1>模板对照：左 HTML / 右 Vue</h1><p>1440×900；全页截图；无 mask；相同批准字体。仅演示说明允许删除。像素差仅用于定位，全部页面待人工视觉验收。</p>' +
    report.pages
      .map(
        (page) =>
          '<section><h2>' +
          escape(page.template) +
          '</h2><p>' +
          escape(page.before.status + ' / ' + page.after.status) +
          (page.comparison
            ? '，未 mask 像素差 ' + (page.comparison.changedRatio * 100).toFixed(2) + '%'
            : '') +
          '</p>' +
          (page.comparison
            ? '<img src="' +
              page.comparison.sideBySide +
              '"><details><summary>未 mask 差异图</summary><img src="' +
              page.comparison.differenceImage +
              '"></details>'
            : '') +
          '</section>',
      )
      .join('')
  );
}

export async function verifyTemplateParity(options = {}) {
  if (options.evidence !== true && !evidenceEnvKeys.some((key) => process.env[key] === '1'))
    throw new Error('PARITY_EVIDENCE_REQUIRED');
  const began = performance.now();
  const project = resolve(
    options.project ?? resolve(root, '.cache/step5-dev/skill/assets/harness'),
  );
  const evidenceRoot = resolve(root, '.artifacts/step5-parity');
  mkdirSync(evidenceRoot, { recursive: true });
  const output = resolve(options.outDir ?? mkdtempSync(resolve(evidenceRoot, 'run-')));
  if (!inside(evidenceRoot, output)) throw new Error('PARITY_OUTPUT_MUST_BE_IN_ARTIFACTS');
  if (existsSync(output) && readdirSync(output).length) throw new Error('PARITY_OUTPUT_NOT_EMPTY');
  mkdirSync(resolve(output, 'screenshots'), { recursive: true });
  mkdirSync(resolve(output, 'before'), { recursive: true });
  const report = {
    schemaVersion: '1.0',
    status: 'RUNNING',
    evidence: true,
    visualAcceptance: 'pending-human-review',
    viewport,
    masks: [],
    allowedDifferences: [
      'Removed demo notes in page headings/descriptions/footer',
      'Removed blank-template reference path instructions',
    ],
    project,
    output,
    startedAt: new Date().toISOString(),
    inputs: {
      scriptSha256: hashFile(fileURLToPath(import.meta.url)),
      fixtureSha256: hashFile(
        resolve(root, 'skills/partner-ui-vue3/assets/harness/tests/fixtures/template-backend.mjs'),
      ),
      runtimeJsSha256: hashFile(
        resolve(root, 'skills/partner-ui-pages/assets/runtime/partner-ui-runtime.js'),
      ),
      runtimeCssSha256: hashFile(
        resolve(root, 'skills/partner-ui-pages/assets/runtime/partner-ui-runtime.css'),
      ),
      stageViteConfigSha256: hashFile(resolve(project, 'vite.config.ts')),
      lockSha256: hashFile(resolve(root, 'source.lock.json')),
      runtimeVersions: JSON.parse(
        readFileSync(resolve(root, 'skills/partner-ui-pages/assets/runtime/versions.json'), 'utf8'),
      ),
      templates: templates.map((name) => ({
        name,
        originalHtmlSha256: hashFile(
          resolve(root, 'skills/partner-ui-pages/assets/templates', name + '.html'),
        ),
        canonicalPageSha256: hashFile(
          resolve(root, 'skills/partner-ui-vue3/assets/templates', name, 'Page.vue'),
        ),
        stagePageSha256: hashFile(resolve(project, 'src/templates', name, 'Page.vue')),
      })),
    },
    pages: [],
    stages: [],
  };
  const save = () => {
    writeFileSync(resolve(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    writeFileSync(resolve(output, 'index.html'), gallery(report));
  };
  let staticHost, vite, browser, fixtures;
  const previousEnv = {
    VITE_ENABLE_MOCKS: process.env.VITE_ENABLE_MOCKS,
    VITE_TEMPLATE_API_BASE: process.env.VITE_TEMPLATE_API_BASE,
  };
  try {
    let stage = performance.now();
    for (const name of templates)
      execFileSync(
        'python3',
        [
          resolve(root, 'skills/partner-ui-pages/scripts/new_page.py'),
          '--template',
          name,
          '--out',
          resolve(output, 'before', name),
          '--no-fonts',
        ],
        { cwd: root, stdio: 'pipe' },
      );
    report.stages.push({
      stage: 'generate-original-html',
      durationMs: Math.round(performance.now() - stage),
    });
    staticHost = await staticServer(output);
    const require = createRequire(resolve(project, 'package.json'));
    const { createServer } = await import(pathToFileURL(require.resolve('vite')).href);
    const { prepareTemplateFixtures } = await import(
      pathToFileURL(
        resolve(root, 'skills/partner-ui-vue3/assets/harness/tests/fixtures/template-backend.mjs'),
      ).href
    );
    fixtures = await prepareTemplateFixtures(project, {
      fontsRoot: resolve(root, 'skills/partner-ui-pages/assets/fonts'),
    });
    process.env.VITE_ENABLE_MOCKS = 'false';
    process.env.VITE_TEMPLATE_API_BASE = '/__template-api';
    stage = performance.now();
    vite = await createServer({
      root: project,
      server: { host: '127.0.0.1', port: await randomPort(), strictPort: true },
      logLevel: 'error',
    });
    await vite.listen();
    const devUrl = `http://127.0.0.1:${vite.httpServer.address().port}`;
    report.stages.push({ stage: 'start-vite', durationMs: Math.round(performance.now() - stage) });
    report.devUrl = devUrl;
    const { chromium } = require('@playwright/test');
    browser = await chromium.launch({ headless: true });
    save();
    for (const name of templates) {
      const before = await capture(
        browser,
        fixtures,
        `${staticHost.url}/before/${name}/index.html`,
        name,
        'before',
        output,
        options.timeout ?? 30000,
      );
      const after = await capture(
        browser,
        fixtures,
        `${devUrl}/templates/${name}`,
        name,
        'after',
        output,
        options.timeout ?? 30000,
      );
      const page = { template: name, before, after };
      if (before.screenshot && after.screenshot)
        page.comparison = await compareImages(browser, staticHost.url, name, before, after, output);
      report.pages.push(page);
      save();
    }
    report.backendSessions = fixtures.sessions;
    report.backendFailures = fixtures.failures;
    report.status =
      report.pages.every(
        (page) => page.before.status === 'CAPTURED' && page.after.status === 'CAPTURED',
      ) && !fixtures.failures.length
        ? 'CAPTURED_REVIEW_REQUIRED'
        : 'CAPTURE_ERRORS';
  } catch (error) {
    report.status = 'CAPTURE_ERRORS';
    report.fatalError = error.message;
  } finally {
    try {
      await browser?.close();
    } finally {
      try {
        await fixtures?.close();
      } finally {
        try {
          await vite?.close();
        } finally {
          await staticHost?.close();
        }
      }
    }
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    report.durationMs = Math.round(performance.now() - began);
    save();
  }
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const options = {};
  for (let index = 2; index < process.argv.length; index++) {
    const option = process.argv[index];
    if (option === '--evidence') {
      options.evidence = true;
      continue;
    }
    const value = process.argv[++index];
    if (!value || value.startsWith('--')) throw new Error('PARITY_OPTION_VALUE_REQUIRED');
    if (option === '--project') options.project = value;
    else if (option === '--out') options.outDir = value;
    else throw new Error('PARITY_OPTION_UNKNOWN:' + option);
  }
  const report = await verifyTemplateParity(options);
  console.log(
    JSON.stringify({
      status: report.status,
      pages: report.pages.length,
      durationMs: report.durationMs,
      report: resolve(report.output, 'report.json'),
      gallery: resolve(report.output, 'index.html'),
    }),
  );
  if (report.status === 'CAPTURE_ERRORS') process.exitCode = 1;
}

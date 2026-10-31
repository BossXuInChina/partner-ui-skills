import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import { productionMockGuard } from '../skills/partner-ui-vue3/assets/harness/build/mock-guard.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let vite;
async function actualVite() {
  if (vite) return vite;
  const candidates = [process.env.PARTNER_HARNESS_VITE_ROOT,
    path.join(root, 'dist/partner-ui-vue3/assets/harness'),
    path.join(root, '.cache/harness-wb-verify/skill/assets/harness')].filter(Boolean).map((directory) => path.resolve(directory));
  const installed = candidates.find((directory) => fs.existsSync(path.join(directory, 'node_modules/vite/package.json')));
  if (!installed) throw new Error('Install the packaged harness dependencies, or set PARTNER_HARNESS_VITE_ROOT to that harness, before running real Vite guard tests.');
  const require = createRequire(path.join(installed, 'package.json'));
  vite = await import(pathToFileURL(require.resolve('vite')).href);
  return vite;
}

async function fixture(run) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'partner-harness-guard-'));
  const put = (name, source) => {
    const file = path.join(directory, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, source);
  };
  put('package.json', '{"type":"module"}');
  try { return await run({ directory, put }); }
  finally { fs.rmSync(directory, { recursive: true, force: true }); }
}

async function build(directory, options, warnings = []) {
  const { build } = await actualVite();
  return build({
    root: directory, configFile: false, logLevel: 'silent',
    resolve: { alias: { '@': path.join(directory, 'src') } },
    plugins: [productionMockGuard(options)],
    build: { write: false, minify: false, emptyOutDir: false,
      rollupOptions: { input: path.join(directory, 'src/main.js'),
        onwarn: (warning) => warnings.push(warning.message), output: { format: 'es' } } },
  });
}

test('production rejects an enabled mock flag before Vite can start', () => {
  assert.throws(() => productionMockGuard({ production: true, mocksEnabled: true }), /PRODUCTION_MOCK_FLAG/);
});

test('path checks normalize queries and Windows separators without scanning words or unrelated files', () => {
  const guard = productionMockGuard({ production: true, mocksEnabled: false });
  const context = { error(message) { throw new Error(message); } };
  for (const id of ['/app/src/mocks/data.ts?raw', 'C:\\app\\src\\feature\\mocks\\data.ts?worker',
    '/app/src/customer.mock.ts?raw', '/app/src/mocks/../mocks/data.ts'])
    assert.throws(() => guard.load.call(context, id), /PRODUCTION_MOCK_IMPORT/);
  assert.equal(guard.transform.call(context, 'const mockCount = 1; const text = "mock API";', '/app/src/api.js'), null);
  assert.equal(guard.load.call(context, '/app/src/mockery/client.js?mock=true'), null);
});

test('real production Vite build ignores unused mock files and accepts normal mock-related fields and text', () =>
  fixture(async ({ directory, put }) => {
    put('src/main.js', 'document.body.textContent=JSON.stringify({mockCount:0,note:"mock is a normal API field"});');
    put('src/mocks/unused.js', 'throw new Error("unused fixture must not be scanned");');
    const result = await build(directory, { production: true, mocksEnabled: false });
    const code = result.output.filter((file) => file.type === 'chunk').map((file) => file.code).join('\n');
    assert.match(code, /mockCount/);
    assert.doesNotMatch(code, /unused fixture/);
  }));

test('real production Vite builds reject direct, alias-resolved and raw mock imports', () =>
  fixture(async ({ directory, put }) => {
    put('src/mocks/data.js', 'export const data="development fixture";');
    put('src/data.mock.js', 'export const data="development fixture";');
    for (const specifier of ['./mocks/data.js', '@/mocks/data.js', './data.mock.js?raw']) {
      put('src/main.js', `import * as data from ${JSON.stringify(specifier)};console.log(data);`);
      await assert.rejects(build(directory, { production: true, mocksEnabled: false }), /PRODUCTION_MOCK_IMPORT/);
    }
  }));

test('real development-policy Vite build requires the explicit flag and records the fixture boundary', () =>
  fixture(async ({ directory, put }) => {
    put('src/main.js', 'import {data} from "./mocks/data.js";document.body.textContent=data;');
    put('src/mocks/data.js', 'export const data="development fixture";');
    await assert.rejects(build(directory, { production: false, mocksEnabled: false }), /DEV_MOCK_FLAG_REQUIRED/);
    const warnings = [];
    const result = await build(directory, { production: false, mocksEnabled: true }, warnings);
    assert.ok(result.output.some((file) => file.type === 'chunk' && file.code.includes('development fixture')));
    assert.ok(warnings.some((warning) => warning.includes('DEV_MOCK_BOUNDARY')));
  }));

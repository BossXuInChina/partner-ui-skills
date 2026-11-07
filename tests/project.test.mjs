import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test, { after, before } from 'node:test';
import { chromium } from 'playwright';
import { journey } from './helpers/project-journey.mjs';
import { loadKit, skillRoot } from '../skills/partner-ui-pages/scripts/project/files.mjs';
import { readProject, makeIndex } from '../skills/partner-ui-pages/scripts/project/graph.mjs';
import { deliveryFiles, emitProject } from '../skills/partner-ui-pages/scripts/project/emit.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scratch = mkdtempSync(resolve(tmpdir(), 'partner-js-project-'));
const kit = loadKit();
const save = (project, name, value) => { const file = resolve(project, name); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value, null, 2)); };
let seq = 0, browser;
function starter() {
  const project = resolve(scratch, 'project-' + ++seq);
  cpSync(resolve(skillRoot, 'assets/project/starter'), project, { recursive: true });
  save(project, 'kit-lock.json', kit.pin);
  return project;
}
function minimal(app = `export default { template: '<p>ready</p>' };`) {
  const project = resolve(scratch, 'minimal-' + ++seq);
  save(project, 'project.json', { schemaVersion: 1, id: 'test-project', title: '测试 </title> 项目', entry: 'app.js', startPage: 'home', pages: [{ id: 'home', label: 'Home', file: 'pages/home.js' }], styles: [] });
  save(project, 'kit-lock.json', kit.pin);
  save(project, 'app.js', app);
  save(project, 'pages/home.js', `export default { template: '<p>home</p>' };`);
  return project;
}
function command(script, args, { source = skillRoot, success = true } = {}) {
  const result = spawnSync(process.execPath, [resolve(source, 'scripts', script), ...args], { cwd: scratch, encoding: 'utf8', env: { ...process.env, NODE_PATH: '', NODE_OPTIONS: '' } });
  if (success) assert.equal(result.status, 0, result.stderr || result.stdout);
  else assert.notEqual(result.status, 0);
  return result;
}
before(async () => { browser = await chromium.launch({ headless: true }); });
after(async () => { await browser?.close(); rmSync(scratch, { recursive: true, force: true }); });

test('generated import catalog resolves to real runtime values', async () => {
  const result = emitProject(minimal()), page = await browser.newPage();
  try {
    await page.goto(pathToFileURL(result.output).href);
    const missing = await page.evaluate(exports => {
      const actual = { vue: PartnerUI.Vue, '@workbench/ui-vue3': PartnerUI.Workbench, 'huawei-partner-ai-ui': PartnerUI.AI };
      return Object.fromEntries(Object.entries(exports).map(([id, names]) => [id, names.filter(name => !(name in actual[id]))]));
    }, kit.catalog.exports);
    assert.deepEqual(missing, { vue: [], '@workbench/ui-vue3': [], 'huawei-partner-ai-ui': [] });
    for (const asset of kit.catalog.assets) assert.ok(existsSync(resolve(skillRoot, asset.reference)), asset.reference);
  } finally { await page.close(); }
});

test('source index follows module boundaries and reverse dependencies', () => {
  const project = starter(), index = makeIndex(readProject(project));
  assert.equal(index.pages.length, 3);
  const metric = index.entries.find(item => item.path === 'components/MetricTile.js');
  assert.deepEqual(metric.usedBy, ['blocks/BusinessSummary.js']);
  assert.deepEqual(metric.affectedPages, ['overview']);
  assert.deepEqual(index.entries.find(item => item.path === 'state/store.js').affectedPages, ['overview', 'partners', 'detail']);
  const changed = JSON.parse(command('project_index.mjs', [project, '--changed', 'components/MetricTile.js']).stdout);
  assert.deepEqual(changed.entries.map(item => item.path).sort(), ['blocks/BusinessSummary.js', 'components/MetricTile.js', 'pages/overview.js']);
  const styles = JSON.parse(command('project_index.mjs', [project, '--changed', 'styles/app.css']).stdout);
  assert.equal(styles.entries.length, 2);
});

test('page selection builds only its project dependency closure and preserves lock identity', () => {
  const project = starter(), partial = readProject(project, { page: 'partners' });
  assert.ok(partial.modules.has('blocks/PartnerList.js'));
  assert.ok(partial.modules.has('blocks/AssistantPanel.js'));
  assert.equal(partial.modules.has('pages/detail.js'), false);
  assert.equal(partial.modules.has('components/MetricTile.js'), false);
  const manifest = JSON.parse(deliveryFiles(partial).get('delivery.json'));
  assert.deepEqual(manifest.pages, ['partners']);
  assert.deepEqual(manifest.kit, kit.pin);
});

for (const [label, app, files, error] of [
  ['missing file', `import Missing from './missing.js'; export default Missing`, {}, /PROJECT_FILE_MISSING/],
  ['missing named export', `import { absent } from './state.js'; export default absent`, { 'state.js': 'export const present = 1' }, /PROJECT_EXPORT_MISSING/],
  ['undefined local export', 'export { neverDefined }; export default {}', {}, /PROJECT_EXPORT_UNDEFINED/],
  ['unknown public export', `import { WorkbenchInvented } from '@workbench/ui-vue3'; export default WorkbenchInvented`, {}, /PROJECT_EXPORT_MISSING/],
  ['package private path', `import X from '@workbench/ui-vue3/dist/internal.js'; export default X`, {}, /PROJECT_IMPORT_BOUNDARY/],
  ['circular graph', `import './a.js'; export default {}`, { 'a.js': `import './b.js'`, 'b.js': `import './a.js'` }, /PROJECT_CYCLE/],
  ['dynamic import', `export default { async setup() { await import('./page.js') } }`, {}, /PROJECT_DYNAMIC_CODE/],
  ['eval', `eval('console.log(1)'); export default {}`, {}, /PROJECT_DYNAMIC_CODE/],
  ['top-level await', `await Promise.resolve(); export default {}`, {}, /PROJECT_TOP_LEVEL_AWAIT/],
  ['missing local registration', `import Local from './local.js'; export default { template: '<Local />' }`, { 'local.js': `export default { template: '<p>local</p>' }` }, /PROJECT_COMPONENT_UNKNOWN/],
  ['bad Vue directive', `export default { template: '<div v-if></div>' }`, {}, /PROJECT_TEMPLATE_SYNTAX/],
  ['wrong enum', `export default { template: '<WorkbenchTabs size="medium" :items="[]" model-value="x" />' }`, {}, /PROJECT_PROP_ENUM/],
  ['wrong bound literal enum', `export default { template: \`<WorkbenchTabs :size="'medium'" :items="[]" model-value="x" />\` }`, {}, /PROJECT_PROP_ENUM/],
  ['runtime string template', `const body = '<p>x</p>'; export default { template: body }`, {}, /PROJECT_DYNAMIC_TEMPLATE/],
]) test(`rejects ${label} before producing output`, () => {
  const project = minimal(app);
  for (const [name, source] of Object.entries(files)) save(project, name, source);
  assert.throws(() => emitProject(project), error);
  assert.equal(existsSync(resolve(project, 'out')), false);
});

test('graph parsing never executes source; re-exports and destructured exports work', () => {
  const project = minimal(`import { counter } from './public.js'; globalThis.__unexpectedBuildExecution = true; export default { template: '<p>safe build</p>' };`);
  save(project, 'state.js', `export let counter = 0; export const { name, count: alias } = { name: 'a', count: 2 };`);
  save(project, 'public.js', `export * from './state.js'; export * as state from './state.js';`);
  const graph = readProject(project);
  assert.deepEqual([...graph.modules.get('public.js').exports].sort(), ['alias', 'counter', 'name', 'state']);
  assert.equal(globalThis.__unexpectedBuildExecution, undefined);
});

test('changed pins are rejected, key order is not treated as a pin change', () => {
  const project = starter();
  save(project, 'kit-lock.json', Object.fromEntries(Object.entries(kit.pin).reverse()));
  readProject(project);
  const pin = structuredClone(kit.pin); pin.packages[0].sha256 = 'wrong'; save(project, 'kit-lock.json', pin);
  assert.throws(() => readProject(project), /PROJECT_KIT_LOCK_MISMATCH/);
});

test('source path escapes, symlinks and output overwrite hazards are rejected', () => {
  const project = minimal(`import X from '../outside.js'; export default X`);
  assert.throws(() => readProject(project), /PROJECT_PATH_ESCAPE/);
  save(project, 'app.js', `import X from './link.js'; export default X`);
  save(scratch, 'outside.js', 'export default {}'); symlinkSync(resolve(scratch, 'outside.js'), resolve(project, 'link.js'));
  assert.throws(() => readProject(project), /PROJECT_SYMLINK/);
  save(project, 'app.js', `export default {template: '<p>safe</p>'}`);
  assert.throws(() => emitProject(project, { out: project }), /PROJECT_OUTPUT_OVER_SOURCE/);
  const target = resolve(scratch, 'existing'); mkdirSync(target); save(target, 'user.txt', 'preserve');
  assert.throws(() => emitProject(project, { out: target }), /PROJECT_OUTPUT_UNOWNED/);
  assert.equal(readFileSync(resolve(target, 'user.txt'), 'utf8'), 'preserve');
  emitProject(project); const html = resolve(project, 'out/index.html'); writeFileSync(html, 'hand edited');
  assert.throws(() => emitProject(project), /PROJECT_OUTPUT_EDITED/);
  assert.equal(readFileSync(html, 'utf8'), 'hand edited');
});

test('shared and single builds are deterministic, and declared assets are included', async () => {
  const project = minimal(`import picture from './media/test.svg'; import data from './fixtures/data.json'; export default { setup() { return { picture, data }; }, template: '<div><img :src="picture" alt="demo" /><p>{{ data.text }}</p></div>' };`);
  save(project, 'media/test.svg', '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="4" height="4" fill="red"/></svg>');
  save(project, 'fixtures/data.json', { text: '</script><h1>literal data</h1>' });
  save(project, 'styles/view.css', '.picture { background: url("../media/test.svg") }');
  const config = JSON.parse(readFileSync(resolve(project, 'project.json'))); config.styles = ['styles/view.css']; save(project, 'project.json', config);
  const graph = readProject(project);
  for (const single of [false, true]) {
    const first = deliveryFiles(graph, { single }), second = deliveryFiles(readProject(project), { single });
    assert.deepEqual(first, second);
    assert.ok(!first.get('index.html').includes('type="module"'));
    assert.ok(![...first.keys()].some(name => /toolchain/.test(name)));
    const out = emitProject(project, { single });
    const page = await browser.newPage();
    try {
      await page.goto(pathToFileURL(out.output).href);
      await page.getByText('</script><h1>literal data</h1>', { exact: true }).waitFor();
      assert.equal(await page.locator('h1').count(), 0);
      assert.ok(await page.getByAltText('demo').evaluate(image => image.complete && image.naturalWidth === 4));
    } finally { await page.close(); }
  }
  assert.ok([...deliveryFiles(graph).keys()].some(name => name.startsWith('media/')));
  assert.equal([...deliveryFiles(graph, { single: true }).keys()].length, 3);
  save(project, 'styles/view.css', '.x { background: url(https://example.com/remote.png) }');
  assert.throws(() => emitProject(project), /PROJECT_REMOTE_ASSET/);
  save(project, 'styles/view.css', '@import "other.css";');
  assert.throws(() => emitProject(project), /PROJECT_CSS_IMPORT/);
});

test('ESM live bindings and module singleton semantics survive classic-script compilation', async () => {
  const project = minimal(`const initial = counter; import { counter, increment } from './state.js'; import { sameCounter } from './other.js'; const topLevel = this; increment(); export default { setup() { return { answer: initial + ':' + counter + ':' + sameCounter() + ':' + (topLevel === undefined) }; }, template: '<p>{{ answer }}</p>' };`);
  save(project, 'state.js', 'export let counter = 0; export function increment() { counter++; }');
  save(project, 'other.js', `import * as state from './state.js'; export function sameCounter() { return state.counter; }`);
  const out = emitProject(project), page = await browser.newPage();
  try { await page.goto(pathToFileURL(out.output).href); await page.getByText('0:1:1:true', { exact: true }).waitFor(); }
  finally { await page.close(); }
});

test('single HTML preserves script and HTML-comment text in authored JS strings', async () => {
  const text = '<!-- <script> </script> 中文 <!-- <script>';
  const project = minimal(`const text = ${JSON.stringify(text)}; export default { setup() { return { text }; }, template: '<p>{{ text }}</p>' };`);
  const out = emitProject(project, { single: true }), page = await browser.newPage();
  try { await page.goto(pathToFileURL(out.output).href); await page.getByText(text, { exact: true }).waitFor(); }
  finally { await page.close(); }
});

test('consumer commands run outside the maintenance repo without node_modules', () => {
  const portable = resolve(scratch, 'portable-skill');
  for (const path of ['assets/runtime', 'assets/project', 'scripts/project', 'scripts/toolchain']) cpSync(resolve(skillRoot, path), resolve(portable, path), { recursive: true });
  for (const name of ['new_project.mjs', 'check_project.mjs', 'emit_project.mjs', 'project_index.mjs', 'catalog.mjs']) cpSync(resolve(skillRoot, 'scripts', name), resolve(portable, 'scripts', name));
  const project = resolve(scratch, 'independent-demo');
  command('new_project.mjs', ['--out', project], { source: portable });
  command('new_project.mjs', ['--out', project], { source: portable, success: false });
  assert.equal(JSON.parse(command('check_project.mjs', [project], { source: portable }).stdout).ok, true);
  assert.ok(JSON.parse(command('catalog.mjs', ['--name', 'WorkbenchChart'], { source: portable }).stdout)[0].reference.endsWith('wb-chart.md'));
  for (const args of [[project], [project, '--single'], [project, '--page', 'partners']]) command('emit_project.mjs', args, { source: portable });
  assert.equal(existsSync(resolve(portable, 'node_modules')), false);
  assert.equal(existsSync(resolve(project, 'node_modules')), false);
});


for (const single of [false, true]) test(`${single ? 'standalone single HTML' : 'shared multi-JS'}: real file:// business and AI journey`, { timeout: 40000 }, async () => {
  const project = starter(), result = emitProject(project, { single });
  let output = result.output;
  if (single) { output = resolve(scratch, 'single-alone.html'); cpSync(result.output, output); }
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, offline: true });
  try { await journey(await context.newPage(), output, { single }); }
  finally { await context.close(); }
});

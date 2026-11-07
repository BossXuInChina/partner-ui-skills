import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test, { after, before } from 'node:test';
import * as native from 'esbuild';
import { chromium } from 'playwright';
import { bundleComponents } from '../skills/partner-ui-pages/scripts/project/component-bundle.mjs';
import { loadComponentResources, projectResources } from '../skills/partner-ui-pages/scripts/project/component-project.mjs';
import { loadKit, skillRoot } from '../skills/partner-ui-pages/scripts/project/files.mjs';
import { readProject } from '../skills/partner-ui-pages/scripts/project/graph.mjs';
import { deliveryFiles } from '../skills/partner-ui-pages/scripts/project/emit.mjs';
import { journey } from './helpers/project-journey.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scratch = mkdtempSync(resolve(tmpdir(), 'partner-component-tests-'));
const evidence = resolve(root, '.artifacts/component-bundling/verification');
const kit = loadKit();
const { graph } = loadComponentResources(skillRoot);
const wb = '@workbench/ui-vue3', ai = 'huawei-partner-ai-ui';
const samples = {}, save = (dir, file, value) => { mkdirSync(dirname(resolve(dir, file)), { recursive: true }); writeFileSync(resolve(dir, file), typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value, null, 2) + '\n'); };
let count = 0, browser;
function minimal(source, resources) {
  const directory = resolve(scratch, 'project-' + ++count);
  save(directory, 'project.json', { schemaVersion: 1, id: 'components-test', title: '组件按需测试', entry: 'app.js', pages: [{ id: 'home', label: '首页', file: 'pages/home.js' }], startPage: 'home', styles: [] });
  save(directory, 'kit-lock.json', kit.pin); save(directory, 'app.js', source); save(directory, 'pages/home.js', `export default {template:'<div>home</div>'}`);
  if (resources) save(directory, 'resources.json', resources);
  return directory;
}
const inspect = (source, resources) => projectResources(readProject(minimal(source, resources)));
const bundle = options => bundleComponents({ graph, esbuild: native, ...options });
function writeDelivery(project, runtime, directory, single = false) {
  const files = deliveryFiles(project, { runtime, single });
  for (const [file, content] of files) save(directory, file, content);
  return resolve(directory, 'index.html');
}
function command(skill, script, args) {
  const result = spawnSync(process.execPath, [resolve(skill, 'scripts', script), ...args], { cwd: scratch, encoding: 'utf8', timeout: 120000, env: { ...process.env, PATH: '/usr/bin:/bin', NODE_PATH: '', NODE_OPTIONS: '', ESBUILD_BINARY_PATH: '' } });
  assert.equal(result.status, 0, result.stderr || result.stdout || result.error?.message);
  return JSON.parse(result.stdout);
}
before(async () => {
  mkdirSync(evidence, { recursive: true });
  browser = await chromium.launch({ headless: true });
  for (const [name, requested] of [['form', { [wb]: ['WorkbenchButton', 'WorkbenchInput'] }], ['table', { [wb]: ['WorkbenchTable', 'WorkbenchModal'] }], ['chat', { [ai]: ['ChatPanel'] }]]) {
    samples[name] = await bundle({ requested });
    save(evidence, name + '-report.json', samples[name].report);
  }
});
after(async () => { await browser?.close(); rmSync(scratch, { recursive: true, force: true }); });

test('Button/Input excludes unselected components, styles, third-party frameworks and icon payloads', () => {
  const { report, css, js } = samples.form;
  assert.ok(report.modules.some(id => id.endsWith('/button/WorkbenchButton.vue')));
  assert.ok(report.modules.some(id => id.endsWith('/input/WorkbenchInput.vue')));
  assert.ok(!report.modules.some(id => /(?:ChatPanel|WorkbenchTable|WorkbenchChart|WorkbenchUpload)\.vue|^ai\/|^robot\/|@opentiny|@tiptap/.test(id)));
  assert.doesNotMatch(css, /\.wb-table|\.tr-sender|\.chat-panel|\.wb-chart/);
  assert.match(css, /:focus-visible/); assert.match(css, /:disabled/);
  assert.ok(report.icons.workbench.system.length > 0 && report.icons.workbench.system.length < graph.icons.workbench.system.inventory.icons.length / 5);
  assert.ok(report.bytes.js < 400000 && report.bytes.css < 100000);
  assert.doesNotMatch(js, /WebAssembly|runtime-modules\.json/);
});

test('Table/Modal retains its transitive controls while excluding unrelated business components', () => {
  const { report, css } = samples.table;
  for (const name of ['WorkbenchTable', 'WorkbenchModal', 'WorkbenchButton', 'WorkbenchCheckbox', 'WorkbenchPagination']) assert.ok(report.provenance.components[wb].includes(name), name);
  assert.ok(!report.modules.some(id => /(?:WorkbenchChart|WorkbenchUpload|ChatPanel)\.vue/.test(id)));
  assert.match(css, /\.wb-modal/); assert.match(css, /\.wb-table/);
  assert.ok(report.bytes.js < 600000 && report.bytes.css < 170000);
});

test('ChatPanel retains its real renderer/editor dependencies without MCP, Workbench tables or unrelated vendor themes', () => {
  const { report, css } = samples.chat;
  assert.ok(report.modules.some(id => id.endsWith('/ChatComposer.vue')));
  assert.ok(report.modules.some(id => id.includes('@tiptap')));
  assert.ok(!report.modules.some(id => /(?:mcp-add-form|mcp-server-picker|fluent-editor|cropperjs|AgreementTable\.vue|BusinessNavigationCard\.vue|WorkbenchTable\.vue)/.test(id)));
  assert.deepEqual(report.roots[ai], ['ChatPanel']);
  for (const name of ['AiAlert', 'AiToast']) assert.ok(report.provenance.components[ai].includes(name), 'ChatPanel internal dependency ' + name);
  assert.ok(report.icons.ai.includes('composer.stop') && report.icons.ai.includes('composer.send'));
  assert.ok(!report.icons.ai.includes('business.navigate'));
  assert.doesNotMatch(css, /mcp-add-form|\.wb-table|\.tiny-color-picker/);
  assert.ok(report.styles.some(id => id.includes('/vue-theme/tooltip/')));
  assert.ok(report.bytes.js < 1700000 && report.bytes.css < 330000);
});

test('session helpers and optional renderer selection do not pull all business cards', async () => {
  const session = await bundle({ helpers: ['createChatSession'] });
  assert.ok(!session.report.modules.some(id => /^(ai|robot|workbench)\/|dompurify/.test(id)));
  await assert.rejects(bundle({ helpers: ['chatRenderers'] }), /COMPONENT_RENDERERS_UNDECLARED/);
  const summary = await bundle({ requested: { [ai]: ['ChatPanel'] }, helpers: ['chatRenderers'], renderers: ['ai-summary'] });
  assert.ok(summary.report.provenance.components[ai].includes('AiSummaryCard'));
  assert.ok(!summary.report.modules.some(id => /AgreementTable\.vue|BusinessNavigationCard\.vue/.test(id)));
});

test('static imports, aliases, global template tags and namespace properties establish roots', () => {
  const source = `import * as W from '@workbench/ui-vue3';import { AiSummaryCard as Summary } from 'huawei-partner-ai-ui';const Button=W.WorkbenchButton;export default {components:{Button,Summary},template:'<Button>OK</Button><Summary text="x"/><WorkbenchInput />'};`;
  const result = inspect(source);
  assert.deepEqual(result.requested[wb], ['WorkbenchButton', 'WorkbenchInput']);
  assert.deepEqual(result.requested[ai], ['AiSummaryCard']);
});

for (const [label, source, resources, message] of [
  ['dynamic component', `export default {template:'<component :is="current" />'}`, undefined, /COMPONENT_DYNAMIC_UNDECLARED/],
  ['dynamic icon', `import {WorkbenchIcon} from '@workbench/ui-vue3';export default {components:{WorkbenchIcon},template:'<WorkbenchIcon :name="current" />'}`, undefined, /COMPONENT_DYNAMIC_UNDECLARED/],
  ['opaque namespace', `import * as W from '@workbench/ui-vue3'; const all=Object.values(W); export default {template:'<p>ok</p>'}`, undefined, /COMPONENT_DYNAMIC_UNDECLARED/],
  ['global runtime', `const all=window.PartnerUI.Workbench;export default {template:'<p>ok</p>'}`, undefined, /COMPONENT_GLOBAL_RUNTIME_ACCESS/],
  ['undeclared renderer family', `import {chatRenderers} from 'partner-ui';export default {setup(){return {chatRenderers}},template:'<p>ok</p>'}`, undefined, /COMPONENT_RENDERERS_UNDECLARED/],
  ['unknown component', `export default {template:'<p>ok</p>'}`, { components: ['WorkbenchImagined'] }, /COMPONENT_ROOT_UNKNOWN/],
  ['unknown resource field', `export default {template:'<p>ok</p>'}`, { allComponents: true }, /COMPONENT_RESOURCES_FIELD/],
]) test(`fails closed for ${label}`, () => assert.throws(() => inspect(source, resources), message));

test('bounded dynamic components/icons and immutable native SVG variants are supported', async () => {
  const icon = graph.icons.workbench.system.inventory.icons.find(icon => icon.key === '/ic_arrow_right_line#2:141');
  const selected = inspect(`import {WorkbenchIcon} from '@workbench/ui-vue3';export default {components:{WorkbenchIcon},template:'<component :is="current" /><WorkbenchIcon :name="icon" />'}`, { components: ['WorkbenchButton'], icons: ['system:' + icon.key] });
  assert.ok(selected.requested[wb].includes('WorkbenchButton'));
  const result = await bundle(selected);
  assert.ok(result.report.icons.workbench.system.includes(icon.key));
  assert.ok(result.report.provenance.assets.some(asset => asset.id.endsWith('/' + icon.assetFile)));
  await assert.rejects(bundle({ requested: { [wb]: ['WorkbenchIcon'] }, icons: ['system:this-icon-does-not-exist'] }), /COMPONENT_ICON_UNKNOWN/);
});

test('resource graph integrity is checked before loading any code', () => {
  const copy = resolve(scratch, 'tampered');
  mkdirSync(resolve(copy, 'assets/components'), { recursive: true });
  cpSync(resolve(skillRoot, 'assets/components/manifest.json'), resolve(copy, 'assets/components/manifest.json'));
  const manifest = JSON.parse(readFileSync(resolve(copy, 'assets/components/manifest.json')));
  save(copy, 'assets/components/' + manifest.resources.file, '{}');
  assert.throws(() => loadComponentResources(copy), /COMPONENT_RESOURCE_HASH/);
});

test('component inventory exposes named JS/CSS and indexes raw icons in asset packs', () => {
  const dir = resolve(skillRoot, 'assets/components');
  const catalog = JSON.parse(readFileSync(resolve(dir, 'catalog.json')));
  const button = catalog.components.workbench.WorkbenchButton;
  assert.equal(button.js, 'components/workbench/WorkbenchButton.js');
  assert.equal(button.css, 'components/workbench/WorkbenchButton.css');
  assert.match(readFileSync(resolve(dir, button.js), 'utf8'), /export/);
  assert.match(readFileSync(resolve(dir, button.css), 'utf8'), /\.wb-button/);
  assert.equal(graph.modules[button.module].file, button.js);
  assert.equal(graph.modules[button.module].loader, 'js');
  assert.ok(Object.values(graph.modules).filter(record => record.asset).every(record => /^(icons|media)\/.+\.pack\.gz$/.test(record.file)));
  assert.ok(new Set(Object.values(graph.modules).map(record => record.file)).size < 150);
  assert.equal(existsSync(resolve(dir, 'icons/ai-artwork.json')), true);
});

test('modified internal or icon pack is rejected before bundling', () => {
  const copy = resolve(scratch, 'tampered-packs');
  const assets = resolve(copy, 'assets/components');
  cpSync(resolve(skillRoot, 'assets/components'), assets, { recursive: true });
  for (const file of ['internal/vendor-modules.pack.gz', 'icons/workbench-system.pack.gz']) {
    const path = resolve(assets, file);
    const original = readFileSync(path);
    writeFileSync(path, original.subarray(0, original.length - 1));
    assert.throws(() => loadComponentResources(copy), error => error.message === 'COMPONENT_RESOURCE_HASH: ' + file);
    writeFileSync(path, original);
  }
});

test('shared and standalone packaging consume exactly the same selected runtime', () => {
  const project = readProject(minimal(`export default {template:'<WorkbenchButton>确认</WorkbenchButton>'}`));
  const runtime = samples.form;
  const shared = deliveryFiles(project, { runtime }), single = deliveryFiles(project, { runtime, single: true });
  const a = JSON.parse(shared.get('component-report.json')), b = JSON.parse(single.get('component-report.json'));
  assert.equal(a.closureHash, b.closureHash);
  assert.deepEqual(a.hashes, b.hashes);
  assert.ok(!single.has('runtime/partner-ui-runtime.js'));
  assert.ok([...shared.keys()].some(name => name.startsWith('modules/')));
  assert.doesNotMatch(single.get('index.html'), /type="module"|https?:\/\//);
});

test('all published Workbench and AI exports compile from the locked resource graph', async () => {
  const result = await bundle({ requested: Object.fromEntries([wb, ai].map(pkg => [pkg, kit.catalog.exports[pkg]])) });
  assert.equal(Object.values(result.report.roots).flat().length, Object.values(kit.catalog.exports).slice(1).flat().length);
  assert.equal(result.report.icons.ai.length, Object.keys(graph.icons.ai.entries).length);
  assert.ok(!result.report.modules.some(id => /mcp-add-form|mcp-server-picker/.test(id)));
  save(evidence, 'all-public-exports.json', result.report);
});

test('form, table/modal and chat match the pinned full runtime in real file:// rendering', { timeout: 60000 }, async () => {
  const cases = {
    form: { template: `<main class="pui-stack" style="width:440px;padding:32px"><WorkbenchButton @click="count++">增加 {{count}}</WorkbenchButton><WorkbenchButton disabled>禁用按钮</WorkbenchButton><WorkbenchInput v-model="value" type="password" aria-label="密码" /><p>{{value}}</p></main>`, setup: `const count=Vue.ref(0),value=Vue.ref('test123');return {count,value};` },
    table: { template: `<main style="padding:32px;width:900px"><button id="open" @click="open=true">打开</button><WorkbenchTable caption="伙伴列表" :columns="columns" :rows="rows" row-key="id" :total="rows.length" /><WorkbenchModal v-model="open" title="详情确认" :actions="[{id:'ok',label:'确认',appearance:'primary'}]" @action="open=false">确认表格内容</WorkbenchModal></main>`, setup: `const open=Vue.ref(false);return {open,columns:[{key:'name',title:'伙伴名称',field:'name'},{key:'region',title:'区域',field:'region'}],rows:[{id:'a',name:'示例伙伴',region:'上海'}]};` },
    chat: { template: `<main class="partner-ai" style="height:760px;width:680px;margin:24px"><ChatPanel :messages="messages" :processing="false" error="" :aborted="false" @send="send" /></main>`, setup: `const messages=Vue.ref([]);return {messages,send(q){messages.value.push({id:'u1',role:'user',content:q},{id:'a1',role:'assistant',content:'你好，已收到：'+q})}};` },
  };
  const results = [];
  for (const [name, fixture] of Object.entries(cases)) {
    const snapshots = [], metrics = [];
    for (const mode of ['full', 'components']) {
      const folder = resolve(scratch, name + '-' + mode), runtime = mode === 'components' ? samples[name] : { js: readFileSync(resolve(skillRoot, 'assets/runtime/partner-ui-runtime.js')), css: readFileSync(resolve(skillRoot, 'assets/runtime/partner-ui-runtime.css')) };
      save(folder, 'runtime.js', runtime.js); save(folder, 'runtime.css', runtime.css);
      save(folder, 'index.html', `<!doctype html><html><meta charset="utf-8"><link rel="stylesheet" href="runtime.css"><body class="pui-page"><div id="app"></div><script src="runtime.js"></script><script>PartnerUI.createApp({setup(){${fixture.setup}},template:${JSON.stringify(fixture.template)}}).mount('#app')</script></body></html>`);
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, offline: true }), page = await context.newPage(), errors = [], remote = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error' || /ICON_NOT_FOUND|ICON_ASSET_NOT_FOUND/.test(message.text())) errors.push(message.text()); });
      page.on('request', request => { if (/^https?:/.test(request.url())) remote.push(request.url()); });
      try {
        await page.goto(pathToFileURL(resolve(folder, 'index.html')).href);
        if (name === 'form') {
          await page.getByRole('button', { name: '增加 0' }).click();
          assert.equal(await page.getByRole('button', { name: '禁用按钮' }).isDisabled(), true);
          await page.locator('input').fill('changed');
          await page.locator('input').blur();
        }
        if (name === 'table') { await page.locator('#open').click(); await page.getByRole('dialog').waitFor(); }
        if (name === 'chat') { await page.locator('[contenteditable="true"]').fill('组件按需'); await page.locator('[contenteditable="true"]').press('Enter'); await page.getByText('你好，已收到：组件按需', { exact: true }).waitFor(); }
        await page.waitForTimeout(400);
        metrics.push(await page.locator('button,input,.wb-table,.chat-panel,[role="dialog"],.tr-sender').evaluateAll(elements => elements.map(element => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height, font: getComputedStyle(element).fontSize, background: getComputedStyle(element).backgroundColor }))));
        snapshots.push((await page.screenshot({ path: resolve(evidence, name + '-' + mode + '.png'), animations: 'disabled', caret: 'hide' })).toString('base64'));
        assert.deepEqual(errors, []); assert.deepEqual(remote, []);
      } finally { await context.close(); }
    }
    assert.deepEqual(metrics[0], metrics[1], name + ' measured styles');
    const comparison = await browser.newPage();
    const diff = await comparison.evaluate(async images => {
      const pixels = [];
      for (const base64 of images) {
        const image = new Image(); image.src = 'data:image/png;base64,' + base64; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = image.width; canvas.height = image.height;
        const context = canvas.getContext('2d'); context.drawImage(image, 0, 0); pixels.push(context.getImageData(0, 0, image.width, image.height).data);
      }
      let differentPixels = 0, maxChannelDifference = 0;
      for (let i = 0; i < pixels[0].length; i += 4) {
        let delta = 0;
        for (let channel = 0; channel < 4; channel++) delta = Math.max(delta, Math.abs(pixels[0][i + channel] - pixels[1][i + channel]));
        if (delta) differentPixels++; maxChannelDifference = Math.max(maxChannelDifference, delta);
      }
      return { differentPixels, maxChannelDifference, totalPixels: pixels[0].length / 4 };
    }, snapshots);
    await comparison.close();
    assert.ok(diff.differentPixels <= 16 && diff.maxChannelDifference <= 30, name + ': ' + JSON.stringify(diff));
    results.push({ name, ...diff });
  }
  save(evidence, 'visual-parity.json', { scope: 'Three representative fixtures at 1440x900, complete interactions above; not an exhaustive all-state visual regression.', tolerance: { differentPixels: 16, maxChannelDifference: 30 }, results });
});

test('isolated consumer builds both deliveries with bundled WASM, Node only and no npm installation', { timeout: 180000 }, async () => {
  const portable = resolve(scratch, 'portable-skill');
  for (const directory of ['assets/runtime', 'assets/components', 'assets/project', 'scripts/project', 'scripts/toolchain', 'scripts/component-toolchain']) cpSync(resolve(skillRoot, directory), resolve(portable, directory), { recursive: true });
  for (const name of ['new_project.mjs', 'emit_project.mjs']) cpSync(resolve(skillRoot, 'scripts', name), resolve(portable, 'scripts', name));
  const demo = resolve(scratch, 'independent-demo');
  command(portable, 'new_project.mjs', ['--out', demo]);
  const deliveries = [];
  for (const single of [false, true]) {
    const out = command(portable, 'emit_project.mjs', [demo, '--components', ...(single ? ['--single'] : [])]);
    deliveries.push(out);
    assert.ok(out.bytes.js < 2100000 && out.bytes.css < 500000);
    let output = out.output;
    if (single) { output = resolve(scratch, 'standalone-components.html'); cpSync(out.output, output); }
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, offline: true });
    try { await journey(await context.newPage(), output, { single, evidenceDirectory: evidence }); }
    finally { await context.close(); }
  }
  assert.equal(deliveries[0].closureHash, deliveries[1].closureHash);
  assert.equal(existsSync(resolve(portable, 'node_modules')), false);
  assert.equal(existsSync(resolve(demo, 'node_modules')), false);
  save(evidence, 'independent-consumer.json', deliveries);
});

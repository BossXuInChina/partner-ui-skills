import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { checkRecord, checkPage, compareComponent } from '../skills/partner-ui-review/scripts/rules.mjs';
import { collectPage } from '../skills/partner-ui-review/scripts/measure.mjs';
import { discoverRoutes } from '../skills/partner-ui-review/scripts/browser.mjs';
import { checkSource } from '../skills/partner-ui-vue3/scripts/check_vue.mjs';
import { createServer } from 'node:http';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { capture } from '../skills/partner-ui-review/scripts/shots.mjs';

const record = () => ({ selectorPath: '.page', box: { x: 0, y: 0, width: 120, height: 40 }, owned: true, visible: true, spacing: { paddingTop: '20px', paddingBottom: '20px', paddingLeft: '24px', paddingRight: '24px', marginTop: '0px' }, spacingTokens: ['4px','20px','24px'], autoSpacing: [], card: true, cardPadding: { block: '20px', inline: '24px' }, hasText: true, font: { fontSize: '14px', fontWeight: '400', lineHeight: '22px', letterSpacing: '0px' }, fontBundles: [{ fontSize: '14px', fontWeight: '400', lineHeight: '22px', letterSpacing: '0px' }], colours: { color: 'rgb(20, 20, 20)', backgroundColor: 'rgba(0, 0, 0, 0)' }, colourTokens: ['rgb(20, 20, 20)'], tokenExpressions: [], clipped: false, fullTextAvailable: false });
const cases = [
  ['R1_SPACING_TOKEN', r => { r.spacing.marginTop = '12px'; }],
  ['R2_CARD_PADDING', r => { r.spacing.paddingTop = '4px'; }],
  ['R3_FONT_BUNDLE', r => { r.font.lineHeight = 'normal'; }],
  ['R4_COLOUR_TOKEN', r => { r.colours.color = 'rgba(20, 20, 20, 0.5)'; }],
  ['R5_GRID', r => { r.spacing.marginTop = '3px'; }],
  ['R6_OVERFLOW', r => { r.clipped = true; }],
];
for (const [rule, fail] of cases) {
  test(`${rule} accepts a valid rendered record`, () => assert.equal(checkRecord(record()).some(f => f.rule === rule), false));
  test(`${rule} detects its failing rendered record`, () => { const r = record(); fail(r); assert.ok(checkRecord(r).some(f => f.rule === rule)); });
}
test('page overflow and console rules have independent positive and negative cases', () => {
  assert.deepEqual(checkPage({ width: 1185, pageWidth: 1185 }), []);
  assert.equal(checkPage({ width: 1185, pageWidth: 1190 })[0].rule, 'R6_OVERFLOW');
  assert.equal(checkPage({ width: 1185, pageWidth: 1185, errors: [{ message: '[Vue warn] missing prop' }] })[0].rule, 'R7_CONSOLE');
});
const component = () => ({ id: 'button', component: 'WorkbenchButton', packageVersion: '1', props: { size: 'small' }, state: 'default', theme: 'light', containerWidth: 320, selectorPath: '#button', styles: { paddingTop: '8px', color: 'rgb(0, 0, 0)' } });
test('R8 comparable independent component sample passes', () => assert.deepEqual(compareComponent(component(), component()).findings, []));
test('R8 different padding is evidence requiring cascade confirmation', () => { const c = component(); c.styles.paddingTop = '12px'; const out = compareComponent(c, component()); assert.equal(out.findings[0].rule, 'R8_COMPONENT_OVERRIDE'); assert.equal(out.findings[0].severity, 'needs-review'); });
test('R8 mismatched props, width or missing baseline never claim success', () => { const c = component(); c.props.size = 'large'; assert.ok(compareComponent(c, component()).notVerified); assert.ok(compareComponent(c).notVerified); assert.ok(compareComponent(component(), { ...component(), errors: [{ message: 'invalid fixture prop' }] }).notVerified); });
test('auto spacing, explicit documented card exception and tooltip availability retain their semantics', () => {
  const r = record(); r.spacing.marginTop = '31px'; r.autoSpacing = ['marginTop']; r.spacing.paddingTop = '4px'; r.cardException = { reason: 'compact business block' }; r.clipped = true; r.fullTextAvailable = true;
  assert.deepEqual(checkRecord(r), []);
});
test('manifest discovers IDs while respecting legacy and navigation states', () => {
  const manifest = { pages: [{ id: 'admin' }, { id: 'navigation' }, { id: 'old' }, { id: 'menu', navigationOnly: true }, { id: 'other', legacy: true }, { id: 'admin' }] };
  assert.deepEqual(discoverRoutes(manifest, { scenario: 'home', legacy: { home: { old: {} } } }), ['home/admin']);
  assert.throws(() => discoverRoutes(manifest), /scenario/);
  assert.deepEqual(discoverRoutes({ pages: { first: {}, second: {} } }, { scenario: 'home' }), ['home/first', 'home/second']);
});

const icons = new Set(['valid-a', 'valid-b']);
const iconCheck = (script, exp) => checkSource(`<script setup>${script}</script><template><WorkbenchIcon :name="${exp}" /></template>`, { iconNames: icons }).filter(f => f.rule.startsWith('ICON_'));
test('frozen literal map with fallback and literal conditional enumerate every icon', () => {
  assert.deepEqual(iconCheck("const ICONS = Object.freeze({__proto__:null,a:'valid-a',b:'valid-b'});", 'ICONS[state] ?? ICONS.a'), []);
  assert.deepEqual(iconCheck('', "state ? 'valid-a' : 'valid-b'"), []);
});
test('unknown non-null expressions and inherited map keys cannot be hidden by fallback', () => {
  assert.ok(iconCheck('', "remote.icon ?? 'valid-a'").some(f => f.rule === 'ICON_DYNAMIC'));
  assert.ok(iconCheck("const ICONS = Object.freeze({a:'valid-a'});", "ICONS[state] ?? 'valid-b'").some(f => f.rule === 'ICON_DYNAMIC'));
});
test('map unknown names, unknown keys, mutable maps and shadowed freeze stay observable', () => {
  assert.ok(iconCheck("const ICONS = Object.freeze({__proto__:null,a:'invalid',b:'valid-b'});", 'ICONS[state] ?? ICONS.b').some(f => f.rule === 'ICON_REGISTERED'));
  assert.ok(iconCheck("const ICONS = Object.freeze({__proto__:null,a:'valid-a'});", 'ICONS[state]').some(f => f.rule === 'ICON_DYNAMIC'));
  assert.ok(iconCheck("const ICONS = Object.freeze({__proto__:null,a:'valid-a'});", 'ICONS.missing').some(f => f.rule === 'ICON_DYNAMIC'));
  assert.ok(iconCheck("const ICONS = {a:'valid-a'};", 'ICONS[state] ?? ICONS.a').some(f => f.rule === 'ICON_DYNAMIC'));
  assert.ok(iconCheck("const Object = {freeze:x=>x}; const ICONS = Object.freeze({__proto__:null,a:'valid-a'});", 'ICONS[state] ?? ICONS.a').some(f => f.rule === 'ICON_DYNAMIC'));
});

// Real layout, CSS computation, clipping and hit-testing cannot be tested by SFC prop tests.
let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });
test('browser sampling reads scoped tokens, card geometry, font bundles and clipping', async () => {
  const page = await browser.newPage({ viewport: { width: 600, height: 500 } });
  try {
    await page.setContent(`<style>
      :root { --wb-spacing-base:4px; --wb-spacing-layout-container-block:20px; --wb-spacing-layout-container-inline:24px; --wb-color-text-primary:rgb(20 20 20); --wb-color-surface-card-default:rgb(255 255 255); --wb-font-body-m-font-size:14px; --wb-font-body-m-font-weight:400; --wb-font-body-m-line-height:22px; --wb-font-body-m-letter-spacing:0em; }
      body { margin:0; } #good,#bad { padding:20px 24px; font:400 14px/22px Arial; letter-spacing:0; color:var(--wb-color-text-primary); background:var(--wb-color-surface-card-default); }
      #bad { padding-top:3px; color:rgb(255 0 0); line-height:normal; }
      #clip { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:30px; }
      .wb-internal { color:rgb(255 0 0); }
    </style><div id="good">Valid text</div><div id="bad">Invalid text</div><div id="clip">A very long sentence clipped here</div><div class="wb-internal">Library-owned<span class="business-slot-copy">Page slot</span></div>`);
    const result = await page.evaluate(collectPage, { cardSelector: '#good,#bad', pageOwnedSelectors: ['.business-slot-copy'] });
    assert.deepEqual(checkRecord(result.records.find(r => r.selectorPath === '#good')), []);
    const failures = checkRecord(result.records.find(r => r.selectorPath === '#bad'));
    for (const rule of ['R1_SPACING_TOKEN','R2_CARD_PADDING','R3_FONT_BUNDLE','R4_COLOUR_TOKEN','R5_GRID']) assert.ok(failures.some(f => f.rule === rule), rule);
    assert.ok(checkRecord(result.records.find(r => r.selectorPath === '#clip')).some(f => f.rule === 'R6_OVERFLOW'));
    assert.ok(!result.records.some(r => r.text === 'Library-owned'));
    assert.ok(result.records.some(r => r.text === 'Page slot'));
    await page.locator('#clip').evaluate(el => el.title = el.textContent);
    const titled = await page.evaluate(collectPage, {});
    assert.equal(checkRecord(titled.records.find(r => r.selectorPath === '#clip')).some(f => f.rule === 'R6_OVERFLOW'), false);
  } finally { await page.close(); }
});
test('browser sampling finds page overflow and covered interactive target', async () => {
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  try {
    await page.setContent('<div style="width:600px">wide</div><button id="under" style="position:absolute;top:80px;left:20px;width:100px;height:40px">under</button><button id="over" style="position:absolute;top:80px;left:20px;width:100px;height:40px">over</button>');
    const result = await page.evaluate(collectPage, {});
    assert.ok(result.pageWidth > 400);
    assert.equal(result.overlaps[0].target, '#under');
  } finally { await page.close(); }
});

test('background gradients without semantic token expressions remain review candidates', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent('<style>:root{--wb-color-brand:red}div{height:40px}#token{background:linear-gradient(var(--wb-color-brand),transparent)}#raw{background:linear-gradient(red,blue)}</style><div id="token"></div><div id="raw"></div>');
    const result = await page.evaluate(collectPage, {});
    assert.equal(checkRecord(result.records.find(r => r.selectorPath === '#token')).some(f => f.actual?.property === 'backgroundImage'), false);
    assert.ok(checkRecord(result.records.find(r => r.selectorPath === '#raw')).some(f => f.rule === 'R4_COLOUR_TOKEN' && f.actual?.property === 'backgroundImage'));
  } finally { await page.close(); }
});

test('route capture records real page errors and Vue warnings without losing successful route evidence', async () => {
  const out = mkdtempSync(resolve(tmpdir(), 'partner-review-capture-'));
  const server = createServer((_request, response) => { response.writeHead(200, { 'content-type': 'text/html' }); response.end('<div>Ready</div><script>if(location.hash.includes("broken")){console.warn("[Vue warn] fixture warning");throw new Error("fixture runtime failure")}</script>'); });
  await new Promise(yes => server.listen(0, '127.0.0.1', yes));
  try {
    const results = await capture({ project: process.cwd(), url: `http://127.0.0.1:${server.address().port}/`, out, widths: [600], height: 400, routes: ['healthy', 'broken'], readySelector: 'div' });
    assert.deepEqual(results[0].errors, []);
    assert.ok(results[0].screenshot.endsWith('healthy-600.png'));
    assert.ok(results[1].errors.some(e => e.message.includes('fixture runtime failure')));
    assert.ok(results[1].errors.some(e => e.message.includes('[Vue warn]')));
  } finally { await new Promise(yes => server.close(yes)); rmSync(out, { recursive: true, force: true }); }
});

#!/usr/bin/env node
// Browser regression for a built single-file canvas (file://). Checks real layout and behavior:
// no network/console errors, images decoded, no node overlap, pointer-anchored zoom, every page's
// seven inspector parts, label highlight + clear, preview + focus return, connections, close, export,
// and phone width. It does NOT judge whether the recognized content is complete or correct.
// Usage: node test_canvas_browser.mjs --html /abs/canvas.html [--manifest /abs/manifest.json] [--screens /abs/dir]
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {execSync} from 'node:child_process';
import assert from 'node:assert/strict';

const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const html = arg('--html'), manifestPath = arg('--manifest'), screens = arg('--screens');
if (!html) { console.error('Usage: node test_canvas_browser.mjs --html /abs/canvas.html [--manifest manifest.json] [--screens dir]'); process.exit(2); }
const require = createRequire(import.meta.url);
let playwright;
for (const base of [process.cwd(), path.dirname(new URL(import.meta.url).pathname), (() => { try { return execSync('npm root -g').toString().trim(); } catch { return null; } })()].filter(Boolean)) {
  try { playwright = require(require.resolve('playwright', {paths:[base]})); break; } catch {}
}
if (!playwright) { console.error('playwright not found; install it or run where it is available'); process.exit(2); }

const results = [], problems = [];
const check = async (name, fn) => { try { await fn(); results.push(name); } catch (err) { problems.push(name + ': ' + err.message.split('\n')[0]); } };
const browser = await playwright.chromium.launch();
try {
  const context = await browser.newContext({viewport:{width:1440, height:900}, acceptDownloads:true});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console ' + m.text()); });
  page.on('request', r => { if (!/^(data|blob|file):/.test(r.url())) errors.push('network ' + r.url()); });
  await page.goto('file://' + path.resolve(html));
  await page.waitForSelector('.dch[data-ready="true"]', {timeout:15000});
  const data = manifestPath ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : null;
  const views = await page.$$eval('[data-view-id]', els => els.map(e => e.dataset.viewId));

  for (const view of views) {
    await page.click(`[data-view-id="${view}"]`);
    await page.waitForTimeout(150);
    await page.waitForFunction(() => [...document.querySelectorAll('.dch-node img')].every(i => i.complete));
    await check(`${view}: images decoded`, async () => {
      const bad = await page.$$eval('.dch-node img', imgs => imgs.filter(i => !i.naturalWidth).map(i => i.alt));
      assert.deepEqual(bad, []);
    });
    await check(`${view}: nodes do not overlap`, async () => {
      const boxes = await page.$$eval('.dch-node', els => els.map(e => ({id:e.dataset.pageId, x:e.offsetLeft, y:e.offsetTop, w:e.offsetWidth, h:e.offsetHeight})));
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        assert.ok(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y, `${a.id} overlaps ${b.id}`);
      }
    });
    await check(`${view}: edges drawn`, async () => {
      const n = await page.$$eval('path.dch-link', p => p.length);
      const expected = await page.evaluate(v => { const c = window.__CANVAS__; const ids = new Set([...document.querySelectorAll('.dch-node')].map(n => n.dataset.pageId)); return c.edges.filter(e => ids.has(e.from) && ids.has(e.to)).length; }, view);
      assert.equal(n, expected);
    });
  }

  await check('zoom keeps the content point under the pointer', async () => {
    await page.click('[data-host="fit"]');
    const vp = await page.$eval('.dch-viewport', el => { const r = el.getBoundingClientRect(); return {x:r.left, y:r.top, w:r.width, h:r.height}; });
    for (const [fx, fy] of [[.2, .3], [.5, .5], [.8, .7]]) {
      const px = vp.x + vp.w * fx, py = vp.y + vp.h * fy;
      const before = await page.evaluate(([px, py, vx, vy]) => { const t = window.__CANVAS__.getTransform(); return {x:(px - vx - t.x) / t.s, y:(py - vy - t.y) / t.s}; }, [px, py, vp.x, vp.y]);
      await page.mouse.move(px, py); await page.mouse.wheel(0, -240); await page.waitForTimeout(50);
      const after = await page.evaluate(([px, py, vx, vy]) => { const t = window.__CANVAS__.getTransform(); return {x:(px - vx - t.x) / t.s, y:(py - vy - t.y) / t.s, s:t.s}; }, [px, py, vp.x, vp.y]);
      assert.ok(Math.abs(before.x - after.x) < 1 && Math.abs(before.y - after.y) < 1, `drift ${(after.x - before.x).toFixed(2)},${(after.y - before.y).toFixed(2)}`);
    }
  });
  await check('drag on empty canvas pans', async () => {
    await page.click('[data-host="fit"]');
    const vp = await page.$eval('.dch-viewport', el => { const r = el.getBoundingClientRect(); return {x:r.left + 8, y:r.bottom - 50}; });
    const t0 = await page.evaluate(() => window.__CANVAS__.getTransform());
    await page.mouse.move(vp.x, vp.y); await page.mouse.down(); await page.mouse.move(vp.x + 120, vp.y - 40, {steps:4}); await page.mouse.up();
    const t1 = await page.evaluate(() => window.__CANVAS__.getTransform());
    assert.ok(Math.abs(t1.x - t0.x - 120) < 2 && Math.abs(t1.y - t0.y + 40) < 2);
  });

  const pageIds = data ? data.pages.map(p => p.id) : await page.$$eval('.dch-node', n => n.map(e => e.dataset.pageId));
  for (const id of pageIds) {
    await check(`${id}: inspector seven parts and section details`, async () => {
      await page.evaluate(pid => window.__CANVAS__.select(pid), id);
      await page.waitForSelector(`.dch-node.on[data-page-id="${id}"]`);
      const parts = await page.$$eval('[data-inspector-part]', els => els.map(e => e.dataset.inspectorPart));
      assert.deepEqual(parts, ['identity', 'evidence', 'scope', 'completeness', 'sections', 'connections', 'limits']);
      const counts = await page.$$eval('.dci-section', s => s.map(x => [x.querySelectorAll('[data-section-spec]').length, x.querySelectorAll('[data-section-contract]').length]));
      assert.ok(counts.length && counts.every(([a, b]) => a === 1 && b === 1), 'each section needs both detail blocks');
      if (data) assert.equal(counts.length, data.pages.find(p => p.id === id).sections.length);
    });
  }

  await check('detail column scrolls with the mouse wheel', async () => {
    await page.evaluate(p => window.__CANVAS__.select(p), pageIds[0]);
    const box = await page.$eval('.dch-detail', el => { el.scrollTop = 0; const r = el.getBoundingClientRect(); return {x:r.left + r.width / 2, y:r.top + r.height / 2, overflow:el.scrollHeight > el.clientHeight}; });
    if (!box.overflow) return;
    await page.mouse.move(box.x, box.y); await page.mouse.wheel(0, 400); await page.waitForTimeout(150);
    assert.ok(await page.$eval('.dch-detail', el => el.scrollTop) > 0, 'wheel did not scroll the detail column');
  });
  await check('label hover highlights region and leaving clears it', async () => {
    await page.evaluate(p => window.__CANVAS__.select(p), pageIds[0]);
    const chip = page.locator('.dci [data-inspector-action="region"]').first();
    await chip.scrollIntoViewIfNeeded(); await chip.hover();
    await page.waitForFunction(() => [...document.querySelectorAll('.dch-node .dch-box')].some(b => !b.hidden));
    await page.mouse.move(5, 5);
    await page.waitForFunction(() => [...document.querySelectorAll('.dch-node .dch-box')].every(b => b.hidden));
  });
  await check('preview opens with region, Escape closes and returns focus', async () => {
    const chip = page.locator('.dci [data-inspector-action="region"]').first();
    await chip.click();
    await page.waitForSelector('dialog.dch-preview[open]');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog.dch-preview').open);
    const focused = await page.evaluate(() => document.activeElement?.dataset?.inspectorAction);
    assert.equal(focused, 'region');
  });
  if (data && data.workItems.some(w => w.lane === 'review')) await check('review item preview is labelled as excluded', async () => {
    const w = data.workItems.find(x => x.lane === 'review'), owner = data.pages.find(p => p.sections.some(s => s.id === w.sectionId));
    await page.evaluate(p => window.__CANVAS__.select(p), owner.id);
    await page.click(`[data-work-item-id="${w.id}"]`);
    await page.waitForSelector('dialog.dch-preview[open]');
    assert.match(await page.textContent('.dch-preview-bar b'), /排除/);
    await page.click('[data-host="close-preview"]');
  });
  await check('connection button selects target page', async () => {
    const edge = await page.evaluate(() => window.__CANVAS__.edges[0]);
    if (!edge) return;
    await page.evaluate(p => window.__CANVAS__.select(p), edge.from);
    await page.click(`[data-inspector-part="connections"] [data-target-page-id="${edge.to}"]`);
    await page.waitForSelector(`.dch-node.on[data-page-id="${edge.to}"]`);
    assert.match(await page.textContent('.dci-header h2'), new RegExp(await page.$eval(`.dch-node[data-page-id="${edge.to}"] strong`, e => e.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
  });
  await check('close clears selection and highlight', async () => {
    await page.click('[data-inspector-action="close"]');
    assert.equal(await page.$$eval('.dch-node.on', n => n.length), 0);
    assert.ok(await page.$('[data-inspector-empty]'));
  });
  await check('export downloads the same manifest', async () => {
    const [download] = await Promise.all([page.waitForEvent('download'), page.click('[data-host="export"]')]);
    const json = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.equal(json.schemaVersion, 'design-evidence/1');
    if (data) assert.equal(JSON.stringify(json), JSON.stringify(data));
  });
  if (screens) { fs.mkdirSync(screens, {recursive:true}); await page.click('[data-host="fit"]'); await page.screenshot({path:path.join(screens, 'desktop.png')}); }
  await check('phone width: no horizontal page scroll, detail opens as drawer', async () => {
    await page.setViewportSize({width:390, height:844}); await page.waitForTimeout(250);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'horizontal page scroll');
    await page.evaluate(p => window.__CANVAS__.select(p), pageIds[0]);
    await page.waitForTimeout(300);
    const box = await page.$eval('.dch-detail', el => el.getBoundingClientRect().toJSON());
    assert.ok(box.left >= 0 && box.right <= 391, 'drawer outside viewport');
    if (screens) await page.screenshot({path:path.join(screens, 'phone.png')});
  });
  await check('no console, page or network errors', async () => assert.deepEqual(errors, []));
} finally { await browser.close(); }
console.log(JSON.stringify({ok:!problems.length, passed:results.length, problems,
  note:'Browser behavior only. Content completeness, component fit and visual acceptance need source review.'}, null, 2));
process.exit(problems.length ? 1 : 0);

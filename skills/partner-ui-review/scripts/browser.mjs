import { createRequire } from 'node:module';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function localPlaywright(project) {
  for (const root of [project, resolve(dirname(fileURLToPath(import.meta.url)), '..'), resolve(dirname(fileURLToPath(import.meta.url)), '../../..')]) {
    const require = createRequire(resolve(root, 'package.json'));
    for (const name of ['playwright', '@playwright/test']) {
      try { return require(name); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
    }
  }
  throw new Error('PLAYWRIGHT_MISSING: install Playwright in the project or the unpacked skill, then install Chromium.');
}

export function discoverRoutes(manifest, { scenario, legacy = {} } = {}) {
  if (!scenario) throw new Error('Manifest discovery requires --scenario; folder names are not router IDs.');
  const pages = Array.isArray(manifest.pages) ? manifest.pages : Object.entries(manifest.pages ?? {}).map(([id, page]) => ({ id, ...page }));
  return [...new Set(pages.filter(page => {
    const id = page.id ?? page.pageId;
    return id && !legacy[scenario]?.[id] && !page.legacy && !page.navigationOnly && !/(^|-)navigation$/.test(id) && page.lifecycle !== 'legacy';
  }).map(page => `${scenario}/${page.id ?? page.pageId}`))];
}

export function options(args) {
  const opt = { project: process.cwd(), widths: [1920], height: 1080, routes: [], out: 'ui-review-evidence', cardSelector: '', rootSelector: 'body' };
  const names = { '--project': 'project', '--url': 'url', '--out': 'out', '--manifest': 'manifest', '--scenario': 'scenario', '--legacy': 'legacy', '--card-selector': 'cardSelector', '--root-selector': 'rootSelector', '--config': 'config', '--baseline': 'baseline', '--ready-selector': 'readySelector' };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (names[a]) { if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Missing value for ${a}`); opt[names[a]] = args[++i]; }
    else if (a === '--widths') opt.widths = args[++i].split(',').map(Number);
    else if (a === '--height') opt.height = Number(args[++i]);
    else if (a.startsWith('--')) throw new Error(`Unknown option: ${a}`);
    else opt.routes.push(a.replace(/^#/, ''));
  }
  opt.project = resolve(opt.project); opt.out = resolve(opt.out);
  if (!opt.url || !/^https?:$/.test(new URL(opt.url).protocol)) throw new Error('Supply --url http://127.0.0.1:<port>/ for a running project server.');
  if (![...opt.widths, opt.height].every(n => Number.isInteger(n) && n > 0)) throw new Error('Viewport dimensions must be positive integers.');
  if (opt.manifest) opt.routes.push(...discoverRoutes(JSON.parse(readFileSync(opt.manifest, 'utf8')), { scenario: opt.scenario, legacy: opt.legacy ? JSON.parse(readFileSync(opt.legacy, 'utf8')) : {} }));
  opt.routes = [...new Set(opt.routes)];
  if (!opt.routes.length) throw new Error('Supply route IDs or --manifest and --scenario.');
  opt.config = opt.config ? JSON.parse(readFileSync(opt.config, 'utf8')) : {};
  return opt;
}

export const shotName = (route, width, state = 'default', profile = '') => `${route.replace(/[^a-zA-Z0-9_-]/g, '_')}-${width}${state === 'default' ? '' : '-' + state}${profile ? '-' + profile : ''}.png`;
export function saveJSON(file, data) { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, JSON.stringify(data, null, 2) + '\n'); }
export const isMain = url => process.argv[1] && resolve(process.argv[1]) === fileURLToPath(url);

export async function visitRoutes(opt, visit) {
  const states = opt.config?.states ?? [];
  const ids = new Set(['default']);
  for (const state of states) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(state.id ?? '') || ids.has(state.id) || !state.routes?.length || !state.actions?.length || state.actions.some(a => !((typeof a.click === 'string' && a.click && !a.scrollIntoView) || (typeof a.scrollIntoView === 'string' && a.scrollIntoView && !a.click))))
      throw new Error('Review states require a unique id, explicit routes and click or scrollIntoView actions.');
    ids.add(state.id);
  }
  const containers = opt.config?.containerProfiles ?? [];
  const profileIds = new Set();
  for (const profile of containers) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(profile.id ?? '') || profileIds.has(profile.id) || !profile.selector || !Number.isInteger(profile.width) || profile.width <= 0 || !Number.isInteger(profile.viewportWidth) || profile.viewportWidth < profile.width)
      throw new Error('Container profiles require a unique id, selector, positive width and enclosing viewportWidth');
    profileIds.add(profile.id);
  }
  const profiles = [...opt.widths.map(width=>({width})), ...containers.map(p=>({...p, containerWidth:p.width, width:p.viewportWidth}))];
  const { chromium } = localPlaywright(opt.project);
  const browser = await chromium.launch();
  const results = [];
  mkdirSync(opt.out, { recursive: true });
  try {
    for (const profile of profiles) for (const route of opt.routes.filter(r=>!profile.routes || profile.routes.includes(r))) for (const state of [{ id: 'default' }, ...states.filter(s => s.routes.includes(route))]) {
      const { width, containerWidth } = profile;
      const page = await browser.newPage({ viewport: { width, height: opt.height }, reducedMotion: 'reduce', locale: 'zh-CN', timezoneId: 'Asia/Shanghai' });
      const errors = [];
      page.on('pageerror', e => errors.push({ type: 'pageerror', message: e.message }));
      page.on('console', m => { if (m.type() === 'error' || /\[Vue warn\]/.test(m.text())) errors.push({ type: m.type(), message: m.text() }); });
      try {
        await page.goto(new URL(`#${route}`, opt.url).href, { waitUntil: 'domcontentloaded', timeout: 60000 });
        if (opt.readySelector) await page.locator(opt.readySelector).waitFor({ state: 'visible', timeout: 60000 });
        else await page.waitForLoadState('networkidle', { timeout: 60000 });
        if (containerWidth) {
          if (await page.locator(profile.selector).count() !== 1) throw new Error('Container profile selector must resolve to exactly one host');
          // Explicit test fixture only: emulate an inspector/side pane without editing product source.
          await page.addStyleTag({content: `${profile.selector} { width: ${containerWidth}px; max-width: 100%; }`});
        }
        await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
        for (const action of state.actions ?? []) {
          if (action.click) await page.locator(action.click).click();
          else await page.locator(action.scrollIntoView).scrollIntoViewIfNeeded();
        }
        if (state.readySelector) await page.locator(state.readySelector).waitFor({ state: 'visible' });
        await page.evaluate(() => document.fonts.ready);
        // Two stable frames after fonts/images; disable CSS animation only in the capture.
        await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
        const result = await visit(page, { route, width, state: state.id, containerWidth, profile: profile.id ?? '', errors });
        const screenshot = resolve(opt.out, shotName(route, width, state.id, profile.id));
        await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
        results.push({ route, width, state: state.id, containerWidth, profile: profile.id ?? '', screenshot, errors, ...result });
      } catch (error) {
        results.push({ route, width, state: state.id, containerWidth, profile: profile.id ?? '', errors: [...errors, { type: 'capture', message: error.message }], notVerified: ['Route capture failed'] });
      } finally { await page.close(); }
    }
  } finally { await browser.close(); }
  return results;
}

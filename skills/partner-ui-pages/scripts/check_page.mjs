#!/usr/bin/env node
// Optional delivery check for a Partner UI page (needs Node 18+ and Playwright with Chromium).
//
//   node scripts/check_page.mjs my-page/index.html [--out shots/] [--width 1440] [--height 900] [--wait 2500]
//
// Reports: console errors / Vue warnings, unresolved components, AI panels without height,
// hard-coded colors in page CSS, custom blocks (pui-custom), and saves a full-page screenshot.
// Exit code 1 when errors are found.
import { createRequire } from 'node:module'
import path from 'node:path'
import fs from 'node:fs'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d }
const file = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')))
if (!file) { console.error('usage: node check_page.mjs <page.html> [--out dir] [--width 1440] [--height 900] [--wait 2500]'); process.exit(2) }

function loadPlaywright() {
  const bases = [import.meta.url, process.cwd() + '/', process.env.PLAYWRIGHT_PATH, '/opt/npm-tools/node_modules/'].filter(Boolean)
  for (const b of bases) {
    try { return createRequire(b.startsWith('file:') ? b : pathToFileURL(b).href)('playwright') } catch {}
  }
  console.error('Playwright not found. Install it (npm i -D playwright && npx playwright install chromium) or set PLAYWRIGHT_PATH to a node_modules folder.')
  process.exit(2)
}
const { chromium } = loadPlaywright()

const abs = path.resolve(file)
const outDir = opt('out', '')
const width = +opt('width', 1440), height = +opt('height', 900), wait = +opt('wait', 2500)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height } })
const errors = [], warnings = []
page.on('console', (m) => {
  const t = m.text()
  if (m.type() === 'error') errors.push(t)
  else if (m.type() === 'warning' && /Vue warn|PartnerUI|ICON_NOT_FOUND/.test(t)) warnings.push(t)
})
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
await page.goto(pathToFileURL(abs).href)
await page.waitForTimeout(wait)

const report = await page.evaluate(() => {
  const out = { runtime: !!window.PartnerUI, version: window.PartnerUI?.versions, unresolved: [], aiZero: [], aiScope: [], colors: [], custom: [] }
  // Unresolved components end up as unknown elements with PascalCase-derived names.
  const known = new Set(['main', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'div', 'span', 'p', 'a', 'button', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'img', 'svg', 'path', 'g', 'circle', 'rect', 'line', 'polyline', 'polygon', 'text', 'tspan', 'defs', 'lineargradient', 'stop', 'use', 'clippath', 'mask', 'ellipse', 'symbol', 'title', 'desc', 'pattern', 'radialgradient', 'filter', 'foreignobject'])
  document.querySelectorAll('body *').forEach((el) => {
    const n = el.tagName.toLowerCase()
    if (/^(workbench|ai|chat|agreement|workspace|business|assistant|ui|pui)[a-z]/.test(n) && !n.includes('-') && !known.has(n)) out.unresolved.push(n)
  })
  document.querySelectorAll('.chat-panel, .agreement-assistant-panel').forEach((el) => { if (el.getBoundingClientRect().height < 200) out.aiZero.push(el.className) })
  document.querySelectorAll('.chat-panel, .ai-summary-card, .workspace-smart-card, .workspace-smart-tag, .business-navigation-card, .agreement-table').forEach((el) => {
    if (!el.closest('.partner-ai, .partner-assistant-host')) out.aiScope.push(el.className.split(' ')[0])
  })
  out.restyled = !!document.documentElement.dataset.puiRestyled
  const hex = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g
  if (!out.restyled) for (const s of document.querySelectorAll('style')) {
    if (s.hasAttribute('data-pui-allow-colors')) continue
    const css = s.textContent.replace(/var\([^)]*\)/g, '')
    for (const m of css.match(hex) || []) out.colors.push('style: ' + m)
  }
  if (!out.restyled) document.querySelectorAll('[style]').forEach((el) => {
    // Only page-authored styles: skip component internals (Workbench, TinyRobot, AI UI) and restyle output.
    if (el.closest('.pui-render, [data-pui-allow-colors], svg, .partner-ai, [class*="wb-"], [class*="tr-"]')) return
    const v = el.getAttribute('style').replace(/var\([^)]*\)/g, '')
    for (const m of v.match(hex) || []) out.colors.push(`<${el.tagName.toLowerCase()} class="${el.className}">: ${m}`)
  })
  document.querySelectorAll('.pui-custom').forEach((el) => out.custom.push(el.getAttribute('data-pui-name') || el.className))
  // restyle() pages: modules still in prototype styling (each must be mapped to a component by meaning or marked layout/custom).
  out.unadapted = out.restyled && window.PartnerUI?.restyle?.audit ? window.PartnerUI.restyle.audit(document.querySelector('[data-pui-root]') || document.body).map((x) => `${x.kind}  ${x.path}  «${x.text}»`) : []
  return out
})

if (outDir) {
  fs.mkdirSync(outDir, { recursive: true })
  const shot = path.join(outDir, path.basename(abs).replace(/\.html?$/, '') + `-${width}.png`)
  await page.screenshot({ path: shot, fullPage: true })
  console.log('screenshot:', shot)
}
await browser.close()

const uniq = (a) => [...new Set(a)]
if (report.restyled) console.log('restyle() page: hard-coded color check skipped (page CSS is snapped to tokens at runtime)')
console.log(`runtime loaded: ${report.runtime}${report.version ? ' ' + JSON.stringify(report.version) : ''}`)
if (!report.runtime) errors.push('PartnerUI runtime not loaded (check the runtime/ path)')
for (const [title, list] of [['errors', errors], ['Vue/PartnerUI warnings', warnings], ['unresolved components', report.unresolved], ['AI panels without height', report.aiZero], ['AI components outside .partner-ai', report.aiScope], ['hard-coded colors (use var(--wb-*))', report.colors], ['custom blocks (list them in the page notes)', report.custom], ['unadapted modules (restyle: map by meaning, or mark layout/custom)', report.unadapted || []]]) {
  const u = uniq(list)
  console.log(`\n${title}: ${u.length}`)
  u.slice(0, 30).forEach((x) => console.log('  - ' + String(x).slice(0, 300)))
}
process.exit(errors.length || report.unresolved.length || report.aiZero.length || report.aiScope.length ? 1 : 0)

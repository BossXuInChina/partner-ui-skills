// Usage: NODE_PATH=/opt/node22/lib/node_modules node shots.cjs <port> <outDir> <route>...   (route like "trade/bid-list")
const { chromium } = require('playwright');
const [port, out, ...routes] = process.argv.slice(2);
(async () => { const b = await chromium.launch(); require('fs').mkdirSync(out, { recursive: true });
  for (const r of routes) { const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || /Vue warn/.test(m.text())) errs.push(m.text()); });
    await p.goto(`http://127.0.0.1:${port}/#${r}`); await p.waitForTimeout(3500);
    await p.screenshot({ path: `${out}/${r.replace(/\//g, '_')}.png`, fullPage: true });
    console.log(r, 'errors', errs.length, errs.slice(0, 2).join(' | ').slice(0, 300)); await p.close(); }
  await b.close(); })();

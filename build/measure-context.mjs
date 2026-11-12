// Deterministic text-volume measurement, not a tokenizer or an Agent success benchmark.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { queryAssets } from '../shared/catalog/assets.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const skill = resolve(root, 'skills/partner-ui-pages');
const index = JSON.parse(readFileSync(resolve(skill, 'references/quick/index.json'), 'utf8'));
const size = text => ({ utf8Bytes: Buffer.byteLength(text), unicodeCodePoints: [...text].length });
const sha256 = text => createHash('sha256').update(text).digest('hex');
const rows = index.entries.map(entry => {
  const full = queryAssets(skill, ['show', '--id', entry.id, '--package', entry.package, '--view', 'full']);
  const quick = queryAssets(skill, ['show', '--id', entry.id, '--package', entry.package]);
  return { id: entry.id, package: entry.package, full: size(full), quick: size(quick),
    fullSha256: sha256(full), quickSha256: sha256(quick),
    byteReductionPercent: Number(((1 - Buffer.byteLength(quick) / Buffer.byteLength(full)) * 100).toFixed(2)) };
});
const total = key => rows.reduce((sum, row) => sum + row[key].utf8Bytes, 0);
const representativeIds = ['wb-metric-card', 'wb-event-calendar', 'wb-table', 'ai-summary-card'];
const journeys = representativeIds.map(id => {
  const entry = index.entries.find(e => e.id === id);
  const search = queryAssets(skill, ['search', '--query', entry.name ?? id, '--limit', '5']);
  const row = rows.find(e => e.id === id && e.package === entry.package);
  return { id, query: entry.name ?? id, search: size(search),
    searchPlusFullBytes: Buffer.byteLength(search) + row.full.utf8Bytes,
    searchPlusQuickBytes: Buffer.byteLength(search) + row.quick.utf8Bytes,
    note: 'Same new search response on both sides isolates reference-view savings; not a historical Agent trace.' };
});
// Natural PRD wording: does the expected asset appear in the top 5? Hits only, no quality claim.
const naturalQueries = [
  ['指标', 'wb-metric-card'], ['KPI', 'wb-metric-card'], ['metric card', 'wb-metric-card'],
  ['数值 卡片', 'wb-metric-card'], ['经营数值卡片', 'wb-metric-card'], ['弹窗', 'wb-modal'],
  ['摘要', 'ai-summary-card'], ['对话框', 'wb-modal'], ['日历', 'wb-event-calendar'],
  ['表格', 'wb-table'], ['筛选', 'wb-filter-chips'], ['上传', 'wb-upload'], ['聊天', 'chat-panel'],
  ['WorkbenchTable', 'wb-table'],
];
const naturalJourneys = naturalQueries.map(([query, id]) => {
  const text = queryAssets(skill, ['search', '--query', query, '--limit', '5']);
  const result = JSON.parse(text);
  const position = result.items.findIndex(item => item.id === id);
  const row = rows.find(e => e.id === id);
  return { query, expectedId: id, hit: position >= 0, position: position >= 0 ? position + 1 : null,
    matchMode: result.matchMode, total: result.total, search: size(text),
    searchPlusQuickBytes: position >= 0 ? Buffer.byteLength(text) + row.quick.utf8Bytes : null };
});
const hits = naturalJourneys.filter(row => row.hit).length;
console.log(JSON.stringify({
  schemaVersion: 1, method: 'UTF-8 bytes and Unicode code points; no token, cost, latency or Agent-quality inference',
  lockSha256: sha256(readFileSync(resolve(root, 'source.lock.json'))),
  assets: rows.length, totalFullBytes: total('full'), totalQuickBytes: total('quick'),
  totalByteReductionPercent: Number(((1 - total('quick') / total('full')) * 100).toFixed(2)),
  largerOrEqualQuickViews: rows.filter(row => row.quick.utf8Bytes >= row.full.utf8Bytes).map(row => row.id),
  journeys,
  naturalRecall: { hits, queries: naturalJourneys.length, topN: 5,
    note: 'Expected asset among the first 5 search items for natural wording; not an Agent success rate.' },
  naturalJourneys, rows,
}, null, 2));

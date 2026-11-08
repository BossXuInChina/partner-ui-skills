#!/usr/bin/env node
// Adapter: legacy homepage canvas (window.ADMIN_DATA / HOME_* modules, JSON 3.0 era) -> design-evidence/1.
// It only re-shapes recorded data. It mints fixed semantic IDs once (from the legacy array order) so later
// edits must use IDs, never positions. It does not add facts that the legacy data did not contain;
// gaps the legacy format could not express are written as explicit unknowns for review.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : null; };
const input = arg('--input'), out = arg('--out');
const packageVersion = arg('--asset-version') || '@workbench/ui-vue3@0.2.0-prototype.20261031.1';
if (!input || !out) { console.error('Usage: node legacy_home_v3.mjs --input <legacy canvas dir> --out <new scenario dir> [--asset-version <pkg@ver>]'); process.exit(2); }
if (fs.existsSync(path.join(out, 'manifest.json'))) { console.error('Refusing to overwrite existing ' + path.join(out, 'manifest.json')); process.exit(2); }

const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
for (const f of ['admin', 'sales', 'requirements', 'section-specs', 'asset-contracts', 'region-map', 'gaps', 'scope-policy'])
  vm.runInContext(fs.readFileSync(path.join(input, 'modules', f + '.js'), 'utf8'), ctx, {filename:f + '.js'});
const {ADMIN_DATA, ADMIN_EDGES, SALES_DATA, SALES_EDGES, HOME_REQUIREMENTS:REQ, HOME_SECTION_SPECS:SPEC, HOME_ASSET_CONTRACTS:CONTRACTS,
  HOME_SECTION_REGIONS:SECTION_REGIONS, HOME_COMPONENT_REGIONS:COMPONENT_REGIONS, HOME_GAPS:GAPS, HOME_SCOPE_POLICY:POLICY} = ctx;

function jpegSize(buf) {
  if (buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') return {width:buf.readUInt32BE(16), height:buf.readUInt32BE(20)};
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const marker = buf[i + 1], len = buf.readUInt16BE(i + 2);
    if (marker >= 0xC0 && marker <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(marker)) return {height:buf.readUInt16BE(i + 5), width:buf.readUInt16BE(i + 7)};
    i += 2 + len;
  }
  throw new Error('cannot read image size');
}
const two = n => String(n).padStart(2, '0');
const splitAssets = s => String(s || '').split(/[,，、]/).map(x => x.trim()).filter(Boolean);
const clampRegion = r => {
  if (!Array.isArray(r) || r.length !== 4) return undefined;
  let [x, y, w, h] = r.map(Number); x = Math.max(0, x); y = Math.max(0, y); w = Math.min(w, 100 - x); h = Math.min(h, 100 - y);
  return w > 0 && h > 0 ? [x, y, w, h] : undefined;
};

fs.mkdirSync(path.join(out, 'crops'), {recursive:true});
const sources = [], pages = [], workItems = [], usedAssets = new Set(), edges = [];
const roleViews = [{id:'admin', title:'经销商 · 管理员', list:ADMIN_DATA, edges:ADMIN_EDGES}, {id:'sales', title:'经销商 · 销售', list:SALES_DATA, edges:SALES_EDGES}];

for (const v of roleViews) for (const lp of v.list) {
  const file = lp.img + '.jpg', src = path.join(input, 'assets', file), buf = fs.readFileSync(src), size = jpegSize(buf);
  fs.copyFileSync(src, path.join(out, 'crops', file));
  const sourceId = 'crop-' + lp.id;
  sources.push({id:sourceId, path:'crops/' + file, width:size.width, height:size.height,
    note:'旧样板只随附裁剪图；原始大图路径与裁剪矩形未登记（审核 P2-02），此处以裁剪图自身作为来源。'});
  const req = REQ[lp.id] || {}, specs = SPEC[lp.id] || [], gaps = GAPS[lp.id] || {}, overrides = POLICY.sectionOverrides[lp.id] || {};
  const sections = lp.blocks.map((b, i) => {
    const [title, summary, assetText, fit, note] = b, spec = specs[i] || {}, id = lp.id + '-s' + two(i + 1);
    const region = clampRegion(spec.r || SECTION_REGIONS[lp.id]?.[i]);
    const componentRegions = COMPONENT_REGIONS[lp.id]?.[i] || {};
    const assetIds = splitAssets(assetText).filter(a => CONTRACTS[a]);
    const nonAssets = splitAssets(assetText).filter(a => !CONTRACTS[a]);
    assetIds.forEach(a => usedAssets.add(a));
    const mappings = assetIds.map(a => {
      const r = clampRegion(componentRegions[a]);
      return {id:id + '-' + a, assetId:a, configurationStatus:'candidate', props:{}, slots:{}, bindings:{}, events:{}, actionIds:[],
        ...(r ? {evidence:{region:r, precision:'approx-component'}} : {}),
        unknowns:['旧样板只登记了候选组件名，实例 props/slots/事件未配置（审核 P2-01）。']};
    });
    const section = {id, title, legacyIndex:i, evidence:{sourceId, ...(region ? {region} : {})}, evidencePrecision:region ? 'approx-section' : 'page',
      facts:[summary, spec.f].filter(Boolean),
      fields:[],
      referenceState:spec.d ? {截图状态:spec.d} : {},
      referenceDisplayData:[],
      actions:[],
      mappings,
      unknowns:[...(spec.q ? [spec.q] : []),
        ...(spec.a ? ['可见操作尚未逐项登记为 action（审核 P1-01）；旧版文字：' + spec.a] : []),
        '字段与截图样例值尚未结构化登记（审核 P1-03）。',
        ...nonAssets.map(n => '非组件资产标注：' + n + '（需落为工作项或说明）')],
      acceptance:spec.v ? [spec.v] : [],
      legacyFit:[fit, note].filter(Boolean).join('；')};
    // Work items: explicit legacy gaps, then section overrides, then a default reuse scope for the remainder.
    let n = 0;
    const add = (lane, reason, base, title2, extra = {}) => {
      const validBase = (base || []).filter(a => CONTRACTS[a]); validBase.forEach(a => usedAssets.add(a));
      const w = {id:id + '-w' + (++n), sectionId:id, title:title2, lane, reason,
        ...(lane === 'reuse' ? {inPageRestoration:true, pageGeneration:'use-existing-components', baseAssetIds:validBase, ...(validBase.length ? {} : {layoutContentOnly:true})} : {}),
        ...(lane === 'component-work' ? {inPageRestoration:true, pageGeneration:'after-component-verification', priority:1, baseAssetIds:validBase, workKind:validBase.length ? 'existing-adaptation' : 'primitive-gap'} : {}),
        ...(lane === 'review' ? {inPageRestoration:false, pageGeneration:'exclude', baseAssetIds:validBase} : {}), ...extra};
      workItems.push(w); return w;
    };
    for (const g of gaps[String(i)] || []) {
      const p = POLICY.workItems[g.name];
      if (!p) throw new Error('legacy gap without scope policy: ' + g.name);
      add(p.lane, p.action || g.reason, p.base, g.name, {legacyLabel:p.label});
    }
    const o = overrides[String(i)];
    if (o) {
      const lane = o.lane === 'mixed' ? 'reuse' : o.lane;
      // Legacy overrides often restate a gap already recorded for the same section; keep one item per lane.
      if (!workItems.some(w => w.sectionId === id && w.lane === lane)) add(lane, o.action, o.base, o.label, {legacyLabel:o.label});
    }
    if (!workItems.some(w => w.sectionId === id && w.lane !== 'review')) {
      add('reuse', '旧样板判断：' + (fit || '组合') + (note ? '；' + note : '') + '。候选组件未验证实例配置。', assetIds, title + ' · 既有组件组合');
    }
    return section;
  });
  const own = new Set(sections.map(s => s.id));
  const pageWork = workItems.filter(w => own.has(w.sectionId));
  pages.push({id:lp.id, title:lp.title, role:lp.subtitle, description:lp.intro, image:'crops/' + file,
    crop:{sourceId, x:0, y:0, width:size.width, height:size.height}, sections,
    requirementSummary:{facts:req.facts || [], unknowns:[...(req.unknown || []), ...(req.missing || []).map(m => '能力线索（旧版）：' + m)], acceptance:req.accept || [],
      scopeWorkItemIds:pageWork.map(w => w.id),
      componentWork:pageWork.filter(w => w.lane !== 'reuse').map(w => ({workItemId:w.id, lane:w.lane, reason:w.reason}))}});
}
for (const v of roleViews) v.edges.forEach(([from, to, label, conf]) => edges.push({id:from + '--' + to, from, to, label,
  strength:conf === '触点待核' ? 'origin-only' : 'explicit',
  evidence:conf === '触点待核' ? '原图连线只确定起点所在区块，具体点击触点待核。' : '原图连线（旧样板第二轮复核）。'}));

const assets = [...usedAssets].sort().map(id => {
  const c = CONTRACTS[id];
  return {id, version:packageVersion, publicExport:c.exportName, qualification:c.eligibility, kind:c.kind,
    contractSource:'旧首页样板资产索引（asset-contracts.js，名称清单）；类型/必填/枚举需回到锁包参考核对。',
    publicContract:{props:c.props || [], events:c.events || [], slots:c.slots || []}, usage:c.source || []};
});
const manifest = {schemaVersion:'design-evidence/1',
  meta:{title:'伙伴工作台首页', migratedFrom:'legacy-home-v3', migratedAt:new Date().toISOString().slice(0, 10), scopePolicyVersion:POLICY.version,
    principle:POLICY.principle, rules:POLICY.rules,
    knownGaps:['P1-01 可见操作未逐项登记', 'P1-02 销售首页区块过度合并', 'P1-03 截图参考数据未结构化', 'P2-01 实例配置缺失', 'P2-02 原图来源与裁剪矩形缺失']},
  canvas:{title:'伙伴工作台首页 · 需求画布', subtitle:'由旧首页样板迁移；内容缺口见 meta.knownGaps',
    scopeBanner:'还原基准：已有组件样式 · 能力缺失 / 场景改造优先 · 全新组合待评审，排除本次还原',
    views:roleViews.map(v => ({id:v.id, title:v.title, groups:[{id:v.id + '-entry', title:'首页入口', pageIds:[v.list[0].id]}, {id:v.id + '-targets', title:'关联页面与状态', pageIds:v.list.slice(1).map(p => p.id)}]}))},
  sources, assets, pages, edges, workItems,
  generationPlan:{included:workItems.filter(w => w.lane !== 'review').map(w => w.id), excludedPendingReview:workItems.filter(w => w.lane === 'review').map(w => w.id)}};
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ok:true, out, pages:pages.length, sections:pages.reduce((a, p) => a + p.sections.length, 0), workItems:workItems.length, assets:assets.length, edges:edges.length}, null, 2));

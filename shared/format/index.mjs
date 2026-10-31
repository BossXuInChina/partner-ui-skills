const wbName = '@workbench/ui-vue3';
const aiName = 'huawei-partner-ai-ui';
const columns = ['组件预览', '变体与状态', '使用场景', '使用规范与API'];
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const entries = (value) => Object.entries(value ?? {}).sort(([a], [b]) => compare(a, b));
const string = (value) => typeof value === 'string' ? value : JSON.stringify(value) ?? '';
const inline = (value) => string(value).replace(/[\r\n]+/g, ' ');
const cell = (value) => inline(value).replaceAll('|', '\\|');
const tick = (value) => {
  const text = inline(value);
  const mark = '`'.repeat(Math.max(1, ...[...text.matchAll(/`+/g)].map(match => match[0].length + 1)));
  return mark + (/^`|`$/.test(text) ? ' ' + text + ' ' : text) + mark;
};

function revision(pkg) {
  return pkg.sourceCommit ?? pkg.metadata?.release?.sourceCommit ?? 'unknown';
}
function label(pkg) {
  return `${pkg.name}@${pkg.version} (${revision(pkg)})`;
}
function provenance(packages) {
  return `Generated from ${packages.map(label).join('; ')} — do not edit.`;
}
function header(packages) {
  return '<!-- ' + provenance(packages) + ' -->';
}
function fence(code, language = '') {
  const runs = [...string(code).matchAll(/`+/g)].map(match => match[0].length);
  const mark = '`'.repeat(Math.max(3, ...runs.map(length => length + 1)));
  return `${mark}${language}\n${string(code)}\n${mark}`;
}
function table(headings, rows) {
  return ['| ' + headings.map(cell).join(' | ') + ' |', '| ' + headings.map(() => '---').join(' | ') + ' |', ...rows.map(row => '| ' + row.map(cell).join(' | ') + ' |')].join('\n');
}
function qualification(pkg) {
  const release = pkg.metadata?.release ?? {};
  const status = { channel: release.channel ?? 'unknown', stableEligible: release.stableEligible ?? 'unknown', targetProductionEligible: release.targetProductionEligible ?? 'unknown' };
  if (pkg.manifest?.workbench?.productionEligible !== undefined) status.productionEligible = pkg.manifest.workbench.productionEligible;
  const dirty = release.sourceHasLocalChanges;
  return `包：${tick(pkg.name + '@' + pkg.version)} · commit：${tick(revision(pkg))} · dirty：${dirty === undefined ? 'unknown' : string(dirty)}\n\n资格（包内声明）：${Object.entries(status).map(([key, value]) => `${key}=${string(value)}`).join('；')}。元数据和示例不授予发布或生产批准。`;
}
function studioURL(route, pkg, bases) {
  if (!route) return null;
  if (typeof route !== 'string' || !/^\/preview\//.test(route)) throw new Error('REFERENCE_STUDIO_ROUTE_INVALID');
  const relative = new URL(route, 'https://studio.invalid');
  if (relative.origin !== 'https://studio.invalid' || !relative.pathname.startsWith('/preview/')) throw new Error('REFERENCE_STUDIO_ROUTE_INVALID');
  const base = bases[pkg.name];
  if (!base) return null;
  const url = new URL(base.endsWith('/') ? base : base + '/');
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('REFERENCE_STUDIO_BASE_INVALID');
  return new URL(route.slice(1), url).href;
}
function studioLink(route, pkg, bases, title = '在 Studio 中查看') {
  const url = studioURL(route, pkg, bases);
  return url ? `[${title}](${url})` : route ? `Studio 基址未配置；包内相对路由：${tick(route)}` : '包内未提供对应 Studio 路由。';
}
function reasons(value) {
  return (value ?? []).map(item => `${item.code ?? 'unsupported'}：${item.reason ?? string(item)}`).join('；');
}
function description(value) {
  if (typeof value === 'string') return value;
  if (!value) return '';
  return Object.values(value).map(string).join('；');
}
function propsTable(contract, notes = {}) {
  const props = entries(contract.props);
  return props.length ? table(['名称', '类型', '默认', '可选值', '说明'], props.map(([name, prop]) => [name + (prop.required ? ' *' : ''), Array.isArray(prop.type) ? prop.type.join(' | ') : prop.type, prop.default === undefined ? '' : string(prop.default), (prop.enum ?? []).map(string).join(' / '), description(notes[name])])) : '包内未声明 props。';
}
function apiText(contract, usage = {}) {
  const lines = [propsTable(contract, usage.propNotes)];
  if (contract.events?.length) lines.push('### Events', ...contract.events.map(event => `- ${tick(event)}${usage.eventNotes?.[event] ? '：' + description(usage.eventNotes[event]) : ''}`));
  const slots = contract.slots ?? [];
  if (slots.length) lines.push('### Slots', ...slots.map(slot => `- ${tick(slot)}${usage.slotNotes?.[slot] ? '：' + description(usage.slotNotes[slot]) : ''}`));
  if (contract.slotPatterns?.length) lines.push('### 动态 Slots', ...contract.slotPatterns.map(pattern => pattern.kind === 'prefix' ? `- 包内前缀模式：${tick(pattern.prefix + '<key>')}；原表达式：${tick(pattern.expression)}` : `- ${tick(pattern.kind ?? 'unknown')}；表达式：${tick(pattern.expression)}。包内未解析为确定的公开 slot 名。`));
  if (contract.exposed?.length) lines.push('### 实例成员', ...contract.exposed.map(item => `- ${tick(item.declaration ?? item.name)}`));
  for (const family of contract.family ?? []) {
    lines.push(`### 同族导出：${tick(family.publicImport?.exportName ?? 'unknown')}`, apiText({ ...family, family: [] }));
  }
  return lines.join('\n\n');
}
function examplesText(asset) {
  const examples = asset?.usageExamples ?? [];
  if (!examples.length) return `官方来源 SFC：${asset?.usageStatus ?? 'unavailable'}。${reasons(asset?.unsupported) || '包内未提供可移植示例；不以场景源码或手写代码补齐。'}`;
  const status = `官方来源 SFC：${asset?.usageStatus ?? 'unknown'}。${reasons(asset?.unsupported)}`;
  return status + '\n\n' + examples.map(example => {
    const lines = [`### 示例：${inline(example.title ?? example.id)}`, `id：${tick(example.id)} · portability：${tick(example.portability ?? 'unknown')} · owner：${tick(example.source?.ownerAssetId ?? asset.assetId)}`];
    if (example.description) lines.push(example.description);
    if (example.dataBoundary) lines.push(example.dataBoundary);
    if (example.portability === 'portable' && typeof example.code === 'string') lines.push(fence(example.code, 'vue'));
    else lines.push(`unsupported：${reasons(example.unsupported) || '包内未声明可移植 SFC；代码不作为可复用示例展开。'}`);
    return lines.join('\n\n');
  }).join('\n\n');
}
function variantsText(asset, pkg, bases) {
  const variants = asset?.variants;
  if (!variants) return '变体元数据不可用；未推断 props 或新增案例。';
  const lines = [`状态：${tick(variants.status)}。${variants.caseSemantics ?? '声明值属于 Studio 案例数据，不自动等于公开组件 props。'}`, studioLink(asset.studio?.paths?.variants, pkg, bases)];
  if (variants.unsupported?.length) lines.push('unsupported：' + reasons(variants.unsupported));
  if (variants.cases?.length) {
    lines.push(table(['分组', '案例', 'id', 'Studio'], variants.cases.map(item => [item.group, item.label, item.id, studioLink(item.studioPath ?? asset.studio?.paths?.variants, pkg, bases, '案例')])));
    lines.push('### Studio 案例值（不是 props 映射）', fence(JSON.stringify(variants.cases, null, 2), 'json'));
  }
  if (variants.declarations) lines.push('### 包内声明', fence(JSON.stringify(variants.declarations, null, 2), 'json'));
  if (variants.customCaseInventory) lines.push('### 定制画廊来源清单（unsupported）', fence(JSON.stringify(variants.customCaseInventory, null, 2), 'json'));
  return lines.join('\n\n');
}
function rulesText(rules) {
  return rules?.length ? rules.map(rule => [`### ${inline(rule.title ?? rule.id)}`, `id：${tick(rule.id)} · ${inline(rule.strength ?? 'unknown')} / ${inline(rule.status ?? 'unknown')}`, rule.text ?? '', rule.when?.length ? '**适用条件**：' + rule.when.join('；') : '', rule.references?.length ? '**包内引用**：' + string(rule.references) : ''].filter(Boolean).join('\n\n')).join('\n\n') : '包内未提供规则；不补写设计结论。';
}
function assetPage(pkg, id, contract, asset, bases) {
  const title = asset?.title ?? contract.publicImport?.exportName ?? id;
  const content = [header([pkg]), `# ${inline(title)} — ${tick(contract.publicImport?.exportName ?? id)}`, `资产：${tick(id)} · 类型：${tick(contract.kind)} · 资产合同版本：${tick(contract.version ?? 'unknown')}`, qualification(pkg)];
  content.push(`## ${columns[0]}`, studioLink(asset?.studio?.paths?.preview ?? asset?.studioPath, pkg, bases), asset?.usage?.intro ?? '', `公开入口：${tick(contract.publicImport?.moduleName)} → ${tick(contract.publicImport?.exportName)}`);
  content.push(`## ${columns[1]}`, variantsText(asset, pkg, bases));
  content.push(`## ${columns[2]}`, studioLink(asset?.studio?.paths?.scenes, pkg, bases), '**适用**：' + ((contract.useWhen ?? []).join('；') || '包内未声明。'), '**不适用**：' + ((contract.avoidWhen ?? []).join('；') || '包内未声明。'), examplesText(asset));
  content.push(`## ${columns[3]}`, studioLink(asset?.studio?.paths?.usage, pkg, bases), apiText(contract, asset?.usage), '### 规则', rulesText(contract.rules));
  if (contract.dependencies?.length) content.push('### 组件依赖', contract.dependencies.map(tick).join('、'));
  if (contract.foundationKeys?.length) content.push('### Foundation 引用', contract.foundationKeys.map(tick).join('、'));
  for (const section of asset?.usage?.sections ?? []) content.push('### ' + inline(section.title), ...(section.paragraphs ?? []), ...(section.bullets ?? []).map(item => '- ' + item));
  if (asset?.usage?.related?.length) content.push('### 包内关联引用', fence(JSON.stringify(asset.usage.related, null, 2), 'json'));
  return content.filter(Boolean).join('\n\n') + '\n';
}
function indexPage(pkg, bases) {
  const contracts = pkg.metadata.components?.assets ?? {};
  const usage = pkg.metadata.usage?.assets ?? {};
  return [header([pkg]), '# Workbench 组件索引', qualification(pkg), '按资产选择后再读取对应页面；规范与真实参数检查回到 Studio。栏目：' + columns.join(' · '), table(['资产', '导出', '类型', '适用', 'Studio'], entries(contracts).map(([id, contract]) => [`[${usage[id]?.title ?? id}](${id}.md)`, contract.publicImport?.exportName, contract.kind, (contract.useWhen ?? []).join('；'), studioLink(usage[id]?.studioPath, pkg, bases)]))].join('\n\n') + '\n';
}
function tokensPage(packages) {
  const lines = [header(packages), '# Tokens'];
  for (const pkg of packages) {
    lines.push('## ' + tick(pkg.name), qualification(pkg));
    const document = pkg.metadata.tokens;
    if (!document?.tokens) { lines.push('tokens.json 不可用；未从源码、CSS 或手写文档推断 Token。'); continue; }
    const rows = document.tokens.flatMap(token => token.cssVariables?.length ? token.cssVariables.map(variable => [token.foundationKey ?? token.name, token.kind, variable.name, variable.values?.light, variable.values?.dark]) : [[token.foundationKey ?? token.name, token.kind, '', string(token), '']]);
    lines.push(table(['Key', '类别', 'CSS 变量', 'Light', 'Dark'], rows));
  }
  return lines.join('\n\n') + '\n';
}
function iconsPage(pkg) {
  const document = pkg.metadata.icons;
  const lines = [header([pkg]), '# 图标', qualification(pkg)];
  if (!document) return lines.concat('icons.json 不可用；未猜测图标名称或自绘图标。').join('\n\n') + '\n';
  lines.push(`包内图标：${document.iconCount}。完整可检索条目、别名和每项真实调用 props 见 [icons.json](icons.json)。`);
  for (const family of document.families ?? []) {
    lines.push('## ' + inline(family.id), `数量：${family.iconCount}`, table(['导出', '公开 props'], (family.components ?? []).map(component => [component.publicImport?.exportName, string(component.props)])), fence(JSON.stringify(family.selection, null, 2), 'json'));
  }
  return lines.join('\n\n') + '\n';
}
function patternsPage(pkg) {
  const assets = entries(pkg.metadata.components?.assets).filter(([, asset]) => asset.kind === 'block' || asset.kind === 'pattern');
  const rules = entries(pkg.metadata.components?.supportingRules);
  const lines = [header([pkg]), '# Blocks 与 Patterns', qualification(pkg), '以下分类和组合规则直接来自包内组件元数据。'];
  for (const [id, asset] of assets) lines.push(`## [${id}](workbench/${id}.md)`, `类型：${tick(asset.kind)} · 导出：${tick(asset.publicImport?.exportName)}`, ...(asset.useWhen ?? []), rulesText(asset.rules));
  for (const [id, rule] of rules) lines.push('## ' + inline(id), fence(JSON.stringify(rule, null, 2), 'json'));
  if (!assets.length && !rules.length) lines.push('包内未提供 Block/Pattern 分类或规则。');
  return lines.join('\n\n') + '\n';
}
function designRulesPage(pkg) {
  const lines = [header([pkg]), '# 设计规则', qualification(pkg)];
  for (const [id, asset] of entries(pkg.metadata.components?.assets)) lines.push(`## [${id}](workbench/${id}.md)`, rulesText(asset.rules));
  for (const [id, rule] of entries(pkg.metadata.components?.supportingRules)) lines.push('## ' + inline(id), fence(JSON.stringify(rule, null, 2), 'json'));
  return lines.join('\n\n') + '\n';
}
function aiPage(pkg, packages) {
  const lines = [header(pkg ? [pkg] : packages), '# Partner AI UI'];
  if (!pkg) return lines.concat('锁中没有 AI UI 包；组件元数据不可用。').join('\n\n') + '\n';
  lines.push(qualification(pkg));
  if (!pkg.metadata.components) lines.push('components.json 不可用；等待计划 6.1 提供包内组件元数据。当前不猜测组件名、props、events 或 slots，不读取源码或复制手写组件文档。');
  else for (const [id, contract] of entries(pkg.metadata.components.assets)) lines.push('## ' + inline(id), apiText(contract));
  lines.push('## 包入口', fence(JSON.stringify(pkg.manifest.exports ?? {}, null, 2), 'json'), '## 锁定依赖', fence(JSON.stringify({ dependencies: pkg.manifest.dependencies ?? {}, peerDependencies: pkg.manifest.peerDependencies ?? {} }, null, 2), 'json'));
  return lines.join('\n\n') + '\n';
}

export function generateReferences({ packages, studioBaseURLs = {} } = {}) {
  if (!Array.isArray(packages) || !packages.length) throw new Error('REFERENCE_PACKAGES_REQUIRED');
  const ordered = [...packages].sort((a, b) => compare(a.name, b.name));
  if (new Set(ordered.map(pkg => pkg.name)).size !== ordered.length) throw new Error('REFERENCE_PACKAGE_DUPLICATE');
  const wb = ordered.find(pkg => pkg.name === wbName);
  if (!wb?.metadata.components) throw new Error('REFERENCE_WORKBENCH_METADATA_REQUIRED');
  const output = new Map();
  output.set('workbench/index.md', indexPage(wb, studioBaseURLs));
  for (const [id, contract] of entries(wb.metadata.components.assets)) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error('REFERENCE_ASSET_ID_INVALID');
    output.set(`workbench/${id}.md`, assetPage(wb, id, contract, wb.metadata.usage?.assets?.[id], studioBaseURLs));
  }
  output.set('tokens.md', tokensPage(ordered));
  output.set('icons.md', iconsPage(wb));
  output.set('icons.json', JSON.stringify({ _generated: provenance([wb]), ...(wb.metadata.icons ?? { schemaVersion: '1.0', status: 'unavailable', icons: [] }) }, null, 2) + '\n');
  output.set('patterns.md', patternsPage(wb));
  output.set('design-rules.md', designRulesPage(wb));
  output.set('ai-ui.md', aiPage(ordered.find(pkg => pkg.name === aiName), ordered));
  output.set('sources.json', JSON.stringify({ _generated: provenance(ordered), schemaVersion: '1.0', studioBaseURLs: Object.fromEntries(entries(studioBaseURLs)), packages: ordered.map(pkg => ({ name: pkg.name, version: pkg.version, sourceCommit: revision(pkg), sha256: pkg.sha256, metadata: Object.keys(pkg.metadata).sort(), qualification: pkg.metadata.release ?? null })) }, null, 2) + '\n');
  return new Map([...output].sort(([a], [b]) => compare(a, b)));
}

import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import postcss from 'postcss';
import ts from 'typescript';
import { parse as parseSFC } from '@vue/compiler-sfc';

const hash = value => createHash('sha256').update(value).digest('hex');
const parse = code => ts.createSourceFile('source.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
function variable(code, name) {
  let result;
  const visit = node => { if (ts.isVariableDeclaration(node) && node.name.getText() === name) result = node.initializer; ts.forEachChild(node, visit); };
  visit(parse(code));
  return result;
}
export function aiIconDefaults(code) {
  const defaults = variable(code, 'defaults');
  const expression = ts.isSatisfiesExpression(defaults) ? defaults.expression : defaults;
  return {
    start: expression.getStart(),
    end: expression.end,
    entries: Object.fromEntries(expression.properties.map(prop => [prop.name.text, prop.getText()])),
  };
}
function helperContract(module) {
  const ast = parse(module.code), declarations = {}, imports = {}, names = new Set();
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement)) {
      const from = module.deps[statement.moduleSpecifier.text];
      if (statement.importClause?.name) imports[statement.importClause.name.text] = { module: from, name: 'default' };
      const bindings = statement.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) for (const item of bindings.elements) imports[item.name.text] = { module: from, name: item.propertyName?.text ?? item.name.text };
      continue;
    }
    const defined = ts.isVariableStatement(statement) ? statement.declarationList.declarations.map(item => item.name.text) : statement.name ? [statement.name.text] : [];
    if (!defined.length || defined.some(name => !name)) throw Error('RESOURCE_HELPER_STATEMENT_UNSUPPORTED');
    const references = new Set();
    const visit = node => { if (ts.isIdentifier(node)) references.add(node.text); ts.forEachChild(node, visit); };
    visit(statement);
    for (const name of defined) { names.add(name); declarations[name] = { code: statement.getText(), references: [...references].filter(ref => !defined.includes(ref)) }; }
  }
  for (const record of Object.values(declarations)) record.references = record.references.filter(ref => names.has(ref) || imports[ref]);
  const renderers = variable(module.code, 'chatRenderers');
  return { imports, declarations, renderers: Object.fromEntries(renderers.elements.map(element => {
    const renderer = element.properties.find(prop => prop.name.text === 'renderer').initializer.text;
    const type = element.properties.find(prop => prop.name.text === 'find').initializer.arguments[0].text;
    return [type, { renderer, code: element.getText() }];
  })) };
}
export function prepareResources(raw) {
  const graph = structuredClone(raw);
  graph.vue = graph.modules['virtual:entry'].deps.vue;
  graph.exports = {};
  const rootEntries = { ...graph.entries };
  const tinyVue = Object.keys(graph.modules).find(id => id.endsWith('/@opentiny/vue/index.js'));
  if (tinyVue) rootEntries['@opentiny/vue'] = tinyVue;
  for (const [name, id] of Object.entries(rootEntries)) {
    const record = graph.modules[id], imports = new Map(), exports = {};
    for (const node of parse(record.code).statements) if (ts.isImportDeclaration(node) && node.importClause) {
      const request = node.moduleSpecifier.text;
      if (node.importClause.name) imports.set(node.importClause.name.text, { module: record.deps[request], name: 'default' });
      if (node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) for (const item of node.importClause.namedBindings.elements) imports.set(item.name.text, { module: record.deps[request], name: item.propertyName?.text ?? item.name.text });
    }
    for (const node of parse(record.code).statements) if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const item of node.exportClause.elements) if (!item.isTypeOnly) {
        const local = item.propertyName?.text ?? item.name.text;
        const target = node.moduleSpecifier ? { module: record.deps[node.moduleSpecifier.text], name: local } : imports.get(local) ?? { module: id, name: local };
        if (target.module) exports[item.name.text] = target;
      }
    }
    graph.exports[name] = exports;
  }
  graph.exports['@workbench/ui-vue3'].workbenchVue3Registry = { module: graph.entries['@workbench/ui-vue3'], name: 'workbenchVue3Registry' };
  // Resolve named imports through known public barrels to their declared export
  // target. This prevents unrelated modules' top-level effects and style imports
  // from entering the graph before tree shaking. No private API is exposed to users.
  for (const record of Object.values(graph.modules)) {
    if (record.loader === 'json' || record.asset || record.styleOnly) continue;
    const edits = [];
    for (const node of parse(record.code).statements) {
      if (!ts.isImportDeclaration(node) || node.importClause?.isTypeOnly) continue;
      const request = node.moduleSpecifier.text, table = graph.exports[request];
      const bindings = node.importClause?.namedBindings;
      if (!table || node.importClause.name || !bindings || !ts.isNamedImports(bindings)) continue;
      const lines = [];
      for (const item of bindings.elements) {
        if (item.isTypeOnly) continue;
        const name = item.propertyName?.text ?? item.name.text, target = table[name];
        if (!target) { lines.push(`import {${item.getText()}} from ${JSON.stringify(request)};`); continue; }
        record.deps[target.module] = target.module;
        lines.push(`import {${target.name} as ${item.name.text}} from ${JSON.stringify(target.module)};`);
      }
      edits.push({ start: node.getStart(), end: node.end, value: lines.join('\n') });
    }
    for (const edit of edits.reverse()) record.code = record.code.slice(0, edit.start) + edit.value + record.code.slice(edit.end);
  }
  graph.icons = { workbench: {}, ai: {} };
  for (const family of ['system', 'status', 'file', 'empty', 'pedestal']) {
    const runtime = `workbench/packages/ui-vue3/src/icons/generated/runtime/${family}.json`;
    const compat = `workbench/packages/ui-vue3/src/icons/generated/compat/${family}.json`;
    if (!graph.modules[runtime]) continue;
    const inventory = JSON.parse(graph.modules[runtime].code);
    graph.icons.workbench[family] = { runtime, compat, loader: `workbench/packages/ui-vue3/src/icons/loaders/${family}.js`, inventory };
  }
  const aiIconsId = 'ai/src/ui/foundation/aiIcons.ts', artId = 'ai/src/assets/ai-icons/artwork.ts';
  const art = variable(graph.modules[artId].code, 'artwork');
  graph.icons.ai = {
    defaultsModule: aiIconsId, ...aiIconDefaults(graph.modules[aiIconsId].code),
    artworkModule: artId, artwork: JSON.parse(art.getText()),
  };
  graph.helpers = { chat: helperContract(graph.modules['skills/partner-ui-pages/maintainer/runtime-src/helpers/chat.ts']) };
  for (const record of Object.values(graph.modules)) {
    record.styleImports = [];
    if (record.asset || record.loader === 'json') continue;
    for (const node of parse(record.code).statements) if (ts.isImportDeclaration(node)) {
      const target = record.deps[node.moduleSpecifier.text];
      if (graph.modules[target]?.styleOnly) record.styleImports.push(target);
    }
  }
  return graph;
}

// Explicit ownership of the old AI global sheet is generated for review and pinned.
// Only selectors present in a component's complete source (all states) can propose an
// owner. The checked-in contract, not this heuristic, governs subsequent builds.
export function suggestAIOwners(graph, cssText) {
  const ast = postcss.parse(cssText), records = [];
  const sources = Object.entries(graph.modules).filter(([id]) => id.startsWith('ai/src/') && id.endsWith('.vue')).map(([id, module]) => {
    const descriptor = parseSFC(module.original, { filename: id }).descriptor, classes = new Set();
    const add = value => value.split(/\s+/).filter(Boolean).forEach(value => classes.add(value));
    const literals = code => { const visit = node => { if (ts.isStringLiteralLike(node)) add(node.text); if (ts.isPropertyAssignment(node) && node.name) add(node.name.text ?? ''); ts.forEachChild(node, visit); }; visit(parse(code)); };
    for (const script of [descriptor.script, descriptor.scriptSetup]) if (script) literals(script.content);
    const visit = node => {
      for (const prop of node.props ?? []) {
        if (prop.type === 6 && prop.name === 'class' && prop.value) add(prop.value.content);
        if (prop.type === 7 && prop.name === 'bind' && prop.arg?.content === 'class' && prop.exp) literals('const classes=(' + prop.exp.content + ')');
      }
      (node.children ?? []).forEach(visit);
    };
    if (descriptor.template?.ast) visit(descriptor.template.ast);
    return [id, classes];
  });
  let count = 0;
  ast.walkRules(rule => {
    const selector = rule.selector;
    const classes = [...selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(match => match[1]).filter(name => name !== 'partner-ai');
    const owners = sources.filter(([, sourceClasses]) => classes.some(name => sourceClasses.has(name))).map(([id]) => id);
    const key = 'ai-global-' + count++;
    records.push({ key, selector, owners: owners.sort(), policy: !classes.length ? 'base' : owners.length ? 'owners' : 'legacy-host', hash: hash(rule.toString()) });
  });
  const ownerSourcesHash = hash(JSON.stringify(Object.entries(graph.modules).filter(([id]) => id.startsWith('ai/src/') && id.endsWith('.vue')).map(([id, module]) => [id, hash(module.original)]).sort(([a], [b]) => a.localeCompare(b, 'en'))));
  return { schemaVersion: 1, sourceHash: hash(cssText), ownerSourcesHash, rules: records };
}

export function splitAIGlobal(cssText, contract) {
  if (contract.sourceHash !== hash(cssText)) throw Error('AI_STYLE_OWNERSHIP_STALE');
  const result = {}, tree = postcss.parse(cssText);
  let sequence = 0;
  // Flatten nesting through esbuild later; at this stage retain each rule's ancestry
  // and declarations, without copying sibling rules into selected fragments.
  function emit(node, parents) {
    if (node.type === 'rule') {
      const record = contract.rules[sequence++];
      if (!record || record.selector !== node.selector || record.hash !== hash(node.toString())) throw Error('AI_STYLE_OWNER_RULE_MISMATCH');
      const own = node.clone({ nodes: node.nodes.filter(child => child.type === 'decl' || child.type === 'comment').map(child => child.clone()) });
      if (own.nodes.some(child => child.type === 'decl')) {
        let wrapped = own;
        for (const parent of [...parents].reverse()) wrapped = parent.clone({ nodes: [wrapped] });
        result['ai/src/styles.css#' + record.key] = { code: wrapped.toString(), source: 'ai/src/styles.css', owners: record.owners, policy: record.policy, order: sequence, deps: {} };
      }
      for (const child of node.nodes) if (child.type !== 'decl' && child.type !== 'comment') emit(child, [...parents, node]);
    } else if (node.type === 'atrule') {
      if (/keyframes$/.test(node.name)) {
        // Keyframe step rules also occur in walkRules and must consume contract rows.
        node.walkRules(() => sequence++);
        result['ai/src/styles.css#animation-' + node.params] = { code: node.toString(), source: 'ai/src/styles.css', policy: 'base', owners: [], order: sequence, deps: {} };
      } else if (node.nodes) for (const child of node.nodes) emit(child, [...parents, node]);
    }
  }
  for (const node of tree.nodes) emit(node, []);
  return result;
}

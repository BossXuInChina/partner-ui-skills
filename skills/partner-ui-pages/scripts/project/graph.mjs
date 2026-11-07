import { readFileSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fail, hash, json, loadKit, localFile, projectRoot, same, slash, tools } from './files.mjs';

export const projectExports = ['ProjectView', 'useProject'];
export const helperExports = ['createChatSession', 'chatRenderers', 'mockAgreementAdapter', 'mockStream', 'overlays', 'welcomeIcon'];
export const mediaTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif' };
const kebab = value => value.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();

function diagnostic(ts, item, file) {
  const position = item.start === undefined ? null : file.getLineAndCharacterOfPosition(item.start);
  return `${file.fileName}${position ? ':' + (position.line + 1) : ''}: ${ts.flattenDiagnosticMessageText(item.messageText, '\n')}`;
}

function walk(ts, node, callback) {
  callback(node);
  ts.forEachChild(node, child => { walk(ts, child, callback); });
}

function bindingNames(ts, name) {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap(item => ts.isOmittedExpression(item) ? [] : bindingNames(ts, item.name));
}

function directExports(ts, file) {
  const out = new Set();
  const locals = new Set();
  for (const node of file.statements) {
    if (ts.isVariableStatement(node)) for (const item of node.declarationList.declarations) bindingNames(ts, item.name).forEach(name => locals.add(name));
    if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && node.name) locals.add(node.name.text);
    if (ts.isImportDeclaration(node)) {
      if (node.importClause?.name) locals.add(node.importClause.name.text);
      const bindings = node.importClause?.namedBindings;
      if (bindings && ts.isNamespaceImport(bindings)) locals.add(bindings.name.text);
      if (bindings && ts.isNamedImports(bindings)) bindings.elements.forEach(item => locals.add(item.name.text));
    }
  }
  for (const node of file.statements) {
    if (ts.isExportAssignment(node)) { if (node.isExportEquals) fail('PROJECT_MODULE_FORMAT', file.fileName + ': use ESM exports'); out.add('default'); }
    else if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const item of node.exportClause.elements) if (!item.isTypeOnly) {
        if (!node.moduleSpecifier && !locals.has(item.propertyName?.text ?? item.name.text)) fail('PROJECT_EXPORT_UNDEFINED', file.fileName + ': ' + item.name.text);
        out.add(item.name.text);
      }
    } else if (node.modifiers?.some(item => item.kind === ts.SyntaxKind.ExportKeyword)) {
      if (node.modifiers.some(item => item.kind === ts.SyntaxKind.DefaultKeyword)) out.add('default');
      else if (ts.isVariableStatement(node)) for (const item of node.declarationList.declarations) bindingNames(ts, item.name).forEach(name => out.add(name));
      else if (node.name && ts.isIdentifier(node.name)) out.add(node.name.text);
    }
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamespaceExport(node.exportClause)) out.add(node.exportClause.name.text);
  }
  return out;
}

export function readProject(input, { kit = loadKit(), page } = {}) {
  const root = projectRoot(input);
  const config = json(localFile(root, 'project.json'));
  if (config.schemaVersion !== 1 || !/^[a-z][a-z\d-]*$/.test(config.id ?? '') || typeof config.title !== 'string' || !config.title.trim()) fail('PROJECT_MANIFEST', 'schemaVersion=1, id and title are required');
  if (!Array.isArray(config.pages) || !config.pages.length || !config.entry?.endsWith('.js')) fail('PROJECT_MANIFEST', 'entry and pages are required');
  const pageIds = new Set();
  for (const item of config.pages) {
    if (!/^[a-z][a-z\d-]*$/.test(item.id ?? '') || pageIds.has(item.id) || typeof item.label !== 'string' || !item.file?.endsWith('.js')) fail('PROJECT_PAGE', JSON.stringify(item));
    pageIds.add(item.id);
  }
  if (!pageIds.has(config.startPage) || (page && !pageIds.has(page))) fail('PROJECT_PAGE', page ?? config.startPage);
  if (!Array.isArray(config.styles ?? []) || (config.styles ?? []).some(file => typeof file !== 'string' || !file.endsWith('.css'))) fail('PROJECT_STYLES', 'styles must be an array of CSS paths');
  const pin = json(localFile(root, 'kit-lock.json'));
  if (!same(pin, kit.pin)) fail('PROJECT_KIT_LOCK_MISMATCH', 'use the locked Skill; upgrade kit-lock.json only after an explicit package upgrade and validation');
  const { ts, vue } = tools();
  const externals = { ...kit.catalog.exports, 'partner-ui': helperExports, 'partner-ui/project': projectExports };
  const modules = new Map(), loading = [], assets = new Map();
  const selectedPages = page ? config.pages.filter(item => item.id === page) : config.pages;

  function target(owner, request) {
    if (Object.hasOwn(externals, request)) return request;
    if (!request.startsWith('./') && !request.startsWith('../')) fail('PROJECT_IMPORT_BOUNDARY', `${owner}: ${request}; use public package roots or a relative .js file`);
    const absolute = localFile(root, slash(relative(root, resolve(root, dirname(owner), request))));
    const id = slash(relative(root, absolute));
    if (!['.js', '.json', ...Object.keys(mediaTypes)].includes(extname(id))) fail('PROJECT_IMPORT_TYPE', `${owner}: ${request}`);
    return id;
  }

  function load(id) {
    if (loading.includes(id)) fail('PROJECT_CYCLE', [...loading, id].join(' -> '));
    if (modules.has(id)) return modules.get(id);
    const filePath = localFile(root, id), bytes = readFileSync(filePath), extension = extname(id);
    if (extension !== '.js') {
      if (extension !== '.json') assets.set(id, bytes);
      const entry = { id, source: extension === '.json' ? bytes.toString('utf8') : '', bytes: bytes.length, hash: hash(bytes), imports: [], deps: {}, exports: new Set(['default']), componentNames: [], templates: [], kind: extension === '.json' ? 'data' : 'asset' };
      if (extension === '.json') entry.data = JSON.parse(entry.source);
      modules.set(id, entry);
      return entry;
    }
    const source = bytes.toString('utf8');
    const ast = ts.createSourceFile(id, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    if (ast.parseDiagnostics.length) fail('PROJECT_SYNTAX', ast.parseDiagnostics.map(item => diagnostic(ts, item, ast)).join('\n'));
    const entry = { id, source, bytes: bytes.length, hash: hash(bytes), imports: [], deps: {}, exports: directExports(ts, ast), componentNames: [], templates: [], kind: id.split('/')[0], ast };
    loading.push(id);
    for (const node of ast.statements) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
        if (!ts.isStringLiteral(node.moduleSpecifier) || node.attributes) fail('PROJECT_IMPORT', id + ': use literal imports without attributes');
        const request = node.moduleSpecifier.text, resolved = target(id, request);
        entry.deps[request] = resolved;
        const dependency = Object.hasOwn(externals, resolved) ? { exports: new Set(externals[resolved]) } : load(resolved);
        const bindings = [];
        if (ts.isImportDeclaration(node)) {
          if (node.importClause?.name) bindings.push({ name: 'default', local: node.importClause.name.text });
          const named = node.importClause?.namedBindings;
          if (named && ts.isNamedImports(named)) for (const binding of named.elements) bindings.push({ name: binding.propertyName?.text ?? binding.name.text, local: binding.name.text });
          if (named && ts.isNamespaceImport(named)) bindings.push({ name: '*', local: named.name.text });
        } else if (node.exportClause && ts.isNamedExports(node.exportClause)) {
          for (const binding of node.exportClause.elements) bindings.push({ name: binding.propertyName?.text ?? binding.name.text, local: binding.name.text });
        } else if (!node.exportClause) for (const name of dependency.exports) if (name !== 'default') entry.exports.add(name);
        for (const binding of bindings) if (binding.name !== '*' && !dependency.exports.has(binding.name)) fail('PROJECT_EXPORT_MISSING', `${id}: ${request} does not export ${binding.name}`);
        entry.imports.push({ request, resolved, bindings });
      }
    }
    walk(ts, ast, node => {
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && ['require', 'eval', 'Function'].includes(node.expression.text)))) fail('PROJECT_DYNAMIC_CODE', `${id}: dynamic import/require/eval is outside the static project contract`);
      if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'Function') fail('PROJECT_DYNAMIC_CODE', id + ': Function constructor is unsupported');
      if (ts.isMetaProperty(node) || ts.isImportEqualsDeclaration(node)) fail('PROJECT_MODULE_FORMAT', id + ': import.meta / import= is unsupported');
      if (ts.isAwaitExpression(node)) {
        let parent = node.parent;
        while (parent && !ts.isFunctionLike(parent)) parent = parent.parent;
        if (!parent) fail('PROJECT_TOP_LEVEL_AWAIT', id);
      }
      if (ts.isPropertyAssignment(node) && (node.name.text === 'template')) {
        if (!ts.isStringLiteral(node.initializer) && !ts.isNoSubstitutionTemplateLiteral(node.initializer)) fail('PROJECT_DYNAMIC_TEMPLATE', `${id}: author templates as literal strings; use props for variable content`);
        entry.templates.push(node.initializer.text);
      }
    });
    const output = ts.transpileModule(source, {
      fileName: id, reportDiagnostics: true,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true, allowJs: true, sourceMap: false, removeComments: false },
      // ESM imports run before the module body even when authored below executable statements.
      // TypeScript's CJS emitter alone preserves source position; hoist static declarations via AST.
      transformers: { before: [context => file => {
        const dependency = node => ts.isImportDeclaration(node) || (ts.isExportDeclaration(node) && !!node.moduleSpecifier);
        return context.factory.updateSourceFile(file, [...file.statements.filter(dependency), ...file.statements.filter(node => !dependency(node))]);
      }] },
    });
    const errors = (output.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error);
    if (errors.length) fail('PROJECT_SYNTAX', errors.map(item => diagnostic(ts, item, ast)).join('\n'));
    entry.code = output.outputText;
    loading.pop();
    modules.set(id, entry);
    return entry;
  }

  const entryId = slash(relative(root, localFile(root, config.entry)));
  const app = load(entryId);
  if (!app.exports.has('default')) fail('PROJECT_DEFAULT_EXPORT', config.entry);
  for (const item of selectedPages) {
    const id = slash(relative(root, localFile(root, item.file)));
    if (!load(id).exports.has('default')) fail('PROJECT_DEFAULT_EXPORT', item.file);
    item.module = id;
  }

  // Parse real Vue templates, including nested states, rather than searching only rendered DOM.
  const contracts = new Map();
  for (const asset of kit.catalog.assets) if (asset.name) { contracts.set(asset.name, asset); contracts.set(kebab(asset.name), asset); }
  for (const module of modules.values()) {
    if (!module.ast) continue;
    const imports = new Map(), locals = new Map();
    for (const imported of module.imports) for (const binding of imported.bindings) {
      if (binding.name !== '*') imports.set(binding.local, contracts.get(binding.name) ?? null);
    }
    walk(ts, module.ast, node => {
      if (ts.isPropertyAssignment(node) && node.name.text === 'components' && ts.isObjectLiteralExpression(node.initializer)) {
        for (const prop of node.initializer.properties) if (prop.name?.text) {
          const value = ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.initializer) ? prop.initializer.text : prop.name.text;
          locals.set(prop.name.text, imports.get(value) ?? contracts.get(value) ?? null);
          locals.set(kebab(prop.name.text), locals.get(prop.name.text));
        }
      }
    });
    for (const template of module.templates) {
      const errors = [];
      const parsed = vue.baseParse(template, { ...vue.parserOptions, onError: error => errors.push(error.message) });
      vue.compile(template, { onError: error => errors.push(error.message) });
      if (errors.length) fail('PROJECT_TEMPLATE_SYNTAX', module.id + ': ' + errors.join('; '));
      const visit = node => {
        if (node.type === 1 && node.tagType === 1 && !['component', 'transition', 'transition-group', 'keep-alive', 'suspense', 'teleport', 'Transition', 'TransitionGroup', 'KeepAlive', 'Suspense', 'Teleport'].includes(node.tag)) {
          const contract = locals.has(node.tag) ? locals.get(node.tag) : contracts.get(node.tag);
          if (!contract && !locals.has(node.tag)) fail('PROJECT_COMPONENT_UNKNOWN', `${module.id}: ${node.tag}; import/register a local component or use a published component`);
          if (contract) {
            module.componentNames.push(contract.name);
            for (const prop of node.props) {
              const name = prop.type === 6 ? prop.name : prop.name === 'bind' && prop.arg?.isStatic ? prop.arg.content : null;
              if (!name) continue;
              const key = Object.keys(contract.props).find(key => key === name || kebab(key) === name);
              const rule = contract.props[key];
              const literal = prop.type === 6 ? prop.value?.content : /^(['"])(.*?)\1$/.exec(prop.exp?.content ?? '')?.[2];
              if (rule?.enum?.length && literal !== undefined) {
                const values = rule.enum.map(String);
                if (!values.includes(literal)) fail('PROJECT_PROP_ENUM', `${module.id}: ${contract.name}.${key}=${literal}; allowed: ${values.join(', ')}`);
              }
            }
          }
        }
        for (const child of node.children ?? []) visit(child);
      };
      visit(parsed);
    }
    module.componentNames = [...new Set(module.componentNames)].sort();
  }
  const styles = (config.styles ?? []).map(id => ({ id, source: readFileSync(localFile(root, id), 'utf8') }));
  return { root, config, entryId, selectedPages, modules, styles, assets, kit, externals };
}

export function makeIndex(project) {
  const manifestSource = readFileSync(resolve(project.root, 'project.json'));
  const reverse = new Map([...project.modules.keys()].map(id => [id, []]));
  for (const module of project.modules.values()) for (const id of Object.values(module.deps)) if (reverse.has(id)) reverse.get(id).push(module.id);
  const closure = start => {
    const found = new Set();
    const visit = id => { if (found.has(id) || !project.modules.has(id)) return; found.add(id); Object.values(project.modules.get(id).deps).forEach(visit); };
    start.forEach(visit); return found;
  };
  const pageClosures = project.selectedPages.map(page => [page.id, closure([project.entryId, page.module])]);
  return {
    schemaVersion: 1, projectId: project.config.id, title: project.config.title,
    pages: project.selectedPages.map(({ id, label, file }) => ({ id, label, file })),
    entries: [...project.modules.values()].sort((a, b) => a.id.localeCompare(b.id, 'en')).map(module => ({
      path: module.id, kind: module.kind, summary: module.source.match(/^\s*\/\/\s*(.+)/m)?.[1] ?? '',
      bytes: module.bytes, lines: module.source ? module.source.split('\n').length : null,
      exports: [...module.exports].sort(), dependencies: Object.values(module.deps).sort(),
      usedBy: reverse.get(module.id).sort(), affectedPages: pageClosures.filter(([, deps]) => deps.has(module.id)).map(([id]) => id),
      components: module.componentNames, sha256: module.hash,
    })).concat(project.styles.map(style => ({
      path: style.id, kind: 'styles', summary: 'Project composition styles', bytes: Buffer.byteLength(style.source), lines: style.source.split('\n').length,
      exports: [], dependencies: [], usedBy: ['project.json'], affectedPages: project.selectedPages.map(page => page.id), components: [], sha256: hash(style.source),
    })), [{
      path: 'project.json', kind: 'manifest', summary: 'Entry, pages and styles', bytes: manifestSource.length, lines: manifestSource.toString('utf8').split('\n').length,
      exports: [], dependencies: [project.entryId, ...project.selectedPages.map(page => page.module), ...project.styles.map(style => style.id)], usedBy: [],
      affectedPages: project.selectedPages.map(page => page.id), components: [], sha256: hash(manifestSource),
    }]),
    contextPolicy: 'Query this index, then read only relevant source and public API references. Generated output, bundled compilers and runtime are not authoring context.',
  };
}

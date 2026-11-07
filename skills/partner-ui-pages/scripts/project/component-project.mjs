import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { gunzipSync } from 'node:zlib';
import { fail, hash, inside, json, localFile, noLinks, publishDirectory, tools } from './files.mjs';
import { readProject } from './graph.mjs';
import { deliveryFiles } from './emit.mjs';
import { bundleComponents } from './component-bundle.mjs';

const packages = ['@workbench/ui-vue3', 'huawei-partner-ai-ui'];
const kebab = value => value.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
const walk = (ts, node, callback) => { callback(node); ts.forEachChild(node, child => walk(ts, child, callback)); };

function readVerified(directory, { file, sha256 }) {
  const bytes = readFileSync(localFile(directory, file));
  if (hash(bytes) !== sha256) fail('COMPONENT_RESOURCE_HASH', file);
  return bytes;
}

function loadResourceCode(directory, graph) {
  const storage = new Map();
  for (const [file, record] of Object.entries(graph.storage ?? {})) {
    const bytes = readVerified(directory, { file, sha256: record.sha256 });
    const contents = file.endsWith('.gz') ? gunzipSync(bytes, { maxOutputLength: record.bytes }) : bytes;
    if (contents.length !== record.bytes) fail('COMPONENT_RESOURCE_SIZE', file);
    storage.set(file, contents);
  }
  for (const records of [graph.modules, graph.styles]) for (const record of Object.values(records)) {
    const pack = storage.get(record.file);
    if (!pack) {
      record.code = readVerified(directory, record).toString('utf8');
      continue;
    }
    const { offset, length, file } = record;
    if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset + length > pack.length) fail('COMPONENT_RESOURCE_RANGE', file);
    const contents = pack.subarray(offset, offset + length);
    if (record.asset) {
      if (hash(contents) !== record.assetHash) fail('COMPONENT_RESOURCE_HASH', file);
      const value = record.mime ? `data:${record.mime};base64,${contents.toString('base64')}` : contents.toString('utf8');
      record.code = 'export default ' + JSON.stringify(value);
    } else {
      record.code = contents.toString('utf8');
    }
    if (hash(record.code) !== record.sha256) fail('COMPONENT_RESOURCE_HASH', file);
  }
  if (graph.icons.ai.artworkFile) {
    graph.icons.ai.artwork = JSON.parse(readVerified(directory, graph.icons.ai.artworkFile));
  }
}

export function loadComponentResources(root) {
  const directory = resolve(root, 'assets/components');
  const manifest = json(localFile(root, 'assets/components/manifest.json'));
  if (![1, 2].includes(manifest.schemaVersion) || manifest.kind !== 'partner-component-resources') fail('COMPONENT_RESOURCE_MANIFEST', 'unsupported resource pack');
  const graph = JSON.parse(readVerified(directory, manifest.resources));
  if (manifest.schemaVersion === 2) readVerified(directory, manifest.catalog);
  loadResourceCode(directory, graph);
  for (const [file, expected] of Object.entries(graph.toolchain.files)) if (hash(readFileSync(localFile(root, file))) !== expected) fail('COMPONENT_TOOLCHAIN_HASH', file);
  const require = createRequire(import.meta.url);
  const esbuild = require(resolve(root, 'scripts/component-toolchain/esbuild/lib/main.js'));
  if (esbuild.version !== graph.toolchain.esbuild) fail('COMPONENT_TOOLCHAIN_VERSION', esbuild.version);
  return { graph, esbuild, identity: { schemaVersion: manifest.schemaVersion, sha256: hash(readFileSync(resolve(directory, 'manifest.json'))), graphSha256: manifest.resources.sha256 } };
}

export function projectResources(project) {
  const { ts, vue } = tools(), requested = Object.fromEntries(packages.map(name => [name, new Set()])), helpers = new Set(), icons = new Set();
  const resourceFile = resolve(project.root, 'resources.json');
  const resources = existsSync(resourceFile) ? json(localFile(project.root, 'resources.json')) : {};
  if (resources.schemaVersion !== undefined && resources.schemaVersion !== 1) fail('COMPONENT_RESOURCES_SCHEMA', 'resources.json.schemaVersion must be 1');
  for (const name of Object.keys(resources)) if (!['schemaVersion', 'components', 'icons', 'renderers'].includes(name)) fail('COMPONENT_RESOURCES_FIELD', name);
  for (const name of ['components', 'icons', 'renderers']) if (resources[name] !== undefined && (!Array.isArray(resources[name]) || resources[name].some(value => typeof value !== 'string'))) fail('COMPONENT_RESOURCES_FIELD', name + ' must be an array of names');
  const names = new Map(packages.flatMap(pkg => project.kit.catalog.exports[pkg].flatMap(name => [[name, [pkg, name]], [kebab(name), [pkg, name]]])));
  function component(name, from) {
    const found = names.get(name);
    if (!found) fail('COMPONENT_ROOT_UNKNOWN', from + ': ' + name);
    requested[found[0]].add(found[1]);
  }
  function dynamic(kind, from) {
    if (!Object.hasOwn(resources, kind)) fail('COMPONENT_DYNAMIC_UNDECLARED', from + ': bound ' + kind + ' in resources.json');
  }
  (resources.components ?? []).forEach(name => component(name, 'resources.json'));
  (resources.icons ?? []).forEach(name => icons.add(name));
  for (const module of project.modules.values()) {
    const namespaces = new Map(), aliases = new Map(), helperAliases = new Map();
    for (const imported of module.imports) for (const binding of imported.bindings) {
      if (packages.includes(imported.resolved)) {
        if (binding.name === '*') namespaces.set(binding.local, imported.resolved);
        else { requested[imported.resolved].add(binding.name); aliases.set(binding.local, binding.name); aliases.set(kebab(binding.local), binding.name); }
      } else if (imported.resolved === 'partner-ui') {
        if (binding.name === '*') fail('COMPONENT_HELPER_NAMESPACE', module.id + ': use named helper imports');
        helpers.add(binding.name); helperAliases.set(binding.local, binding.name);
      }
    }
    module.componentNames.forEach(name => component(name, module.id));
    if (module.ast) walk(ts, module.ast, node => {
      if (ts.isIdentifier(node) && node.text === 'PartnerUI') fail('COMPONENT_GLOBAL_RUNTIME_ACCESS', module.id + ': use public named imports in component mode');
      if (ts.isIdentifier(node) && namespaces.has(node.text) && !ts.isNamespaceImport(node.parent)) {
        const parent = node.parent;
        if (ts.isPropertyAccessExpression(parent) && parent.expression === node) requested[namespaces.get(node.text)].add(parent.name.text);
        else if (ts.isElementAccessExpression(parent) && parent.expression === node && ts.isStringLiteral(parent.argumentExpression)) requested[namespaces.get(node.text)].add(parent.argumentExpression.text);
        else dynamic('components', module.id + ': ' + node.text);
      }
      if (ts.isCallExpression(node)) {
        const name = ts.isIdentifier(node.expression) ? helperAliases.get(node.expression.text) ?? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : '';
        if (name === 'welcomeIcon') {
          const [icon, family] = node.arguments;
          if (icon && ts.isStringLiteralLike(icon) && (!family || ts.isStringLiteralLike(family))) icons.add((family?.text ?? 'system') + ':' + icon.text);
          else dynamic('icons', module.id + ': welcomeIcon');
        }
        if (['resolveComponent', 'resolveDynamicComponent'].includes(name)) {
          const target = node.arguments[0];
          if (target && ts.isStringLiteralLike(target)) component(target.text, module.id);
          else dynamic('components', module.id + ': ' + name);
        }
      }
    });
    for (const template of module.templates) {
      const ast = vue.baseParse(template, vue.parserOptions);
      const visit = node => {
        if (node.type === 1) {
          if (node.props.some(prop => prop.exp?.content && /\bPartnerUI\b/.test(prop.exp.content))) fail('COMPONENT_GLOBAL_RUNTIME_ACCESS', module.id + ': import helpers explicitly');
          if (node.tag === 'component' || node.tag === 'Component') {
            const is = node.props.find(prop => prop.type === 6 ? prop.name === 'is' : prop.name === 'bind' && prop.arg?.content === 'is');
            const literal = is?.type === 6 ? is.value?.content : /^(['"])(.*?)\1$/.exec(is?.exp?.content.trim() ?? '')?.[2];
            if (literal) component(literal, module.id);
            else if (aliases.has(is?.exp?.content.trim())) component(aliases.get(is.exp.content.trim()), module.id);
            else dynamic('components', module.id + ': <component :is>');
          }
          const name = aliases.get(node.tag) ?? names.get(node.tag)?.[1];
          const family = ({ WorkbenchIcon: 'system', WorkbenchSystemIcon: 'system', WorkbenchStatusIcon: 'status', WorkbenchFileIcon: 'file', WorkbenchEmptyIcon: 'empty', WorkbenchPedestalIcon: 'pedestal', AiIcon: 'ai' })[name];
          if (family) for (const prop of node.props) {
            if (prop.type === 6 && prop.name === 'name' && prop.value) icons.add(family + ':' + prop.value.content);
            if (prop.type === 7 && prop.name === 'bind' && prop.arg?.content === 'name') {
              const value = /^(['"])(.*?)\1$/.exec(prop.exp?.content.trim() ?? '');
              if (value) icons.add(family + ':' + value[2]); else dynamic('icons', module.id + ': ' + name + '.name');
            }
          }
        }
        (node.children ?? []).forEach(visit);
      };
      visit(ast);
    }
  }
  if (helpers.has('chatRenderers') && !Array.isArray(resources.renderers)) fail('COMPONENT_RENDERERS_UNDECLARED', 'declare resources.json.renderers; [] selects native text only');
  if (resources.renderers?.includes('pui-template')) dynamic('components', 'pui-template renderer');
  return { requested: Object.fromEntries(Object.entries(requested).map(([key, names]) => [key, [...names].sort()])), helpers: [...helpers].sort(), icons: [...icons].sort(), renderers: resources.renderers, projectSource: [...project.modules.values()].map(module => module.source).join('\n'), resourcesHash: existsSync(resourceFile) ? hash(readFileSync(resourceFile)) : null };
}

export async function emitComponentProject(input, { out, single = false, page } = {}) {
  const project = readProject(input, { page }), selection = projectResources(project);
  const target = noLinks(out ?? resolve(project.root, (page ? 'out-' + page : 'out') + '-components' + (single ? '-single' : '')));
  if (inside(target, project.root)) fail('PROJECT_OUTPUT_OVER_SOURCE', target);
  for (const id of [...project.modules.keys(), ...project.styles.map(style => style.id), 'project.json', 'kit-lock.json', 'resources.json']) if (inside(target, resolve(project.root, id))) fail('PROJECT_OUTPUT_OVER_SOURCE', id);
  const { graph, esbuild, identity } = loadComponentResources(project.kit.root);
  if (project.kit.pin.components?.sha256 !== identity.sha256) fail('COMPONENT_KIT_LOCK_MISMATCH', 'component resource pack must be pinned in kit-lock.json');
  for (const source of graph.sources.filter(source => packages.includes(source.name))) {
    const pkg = project.kit.catalog.packages.find(pkg => pkg.name === source.name);
    if (!pkg || pkg.version !== source.version || pkg.sourceCommit !== source.sourceCommit) fail('COMPONENT_SOURCE_IDENTITY', source.name);
  }
  // Pin the supplemental compiler inputs separately from the unchanged full runtime.
  if (project.config.componentResources && project.config.componentResources !== identity.sha256) fail('COMPONENT_KIT_LOCK_MISMATCH', 'project.json.componentResources does not match this pack');
  let runtime;
  try { runtime = await bundleComponents({ graph, esbuild, ...selection }); }
  finally { esbuild.stop(); }
  runtime.report.resourcePack = identity;
  runtime.report.resourcesHash = selection.resourcesHash;
  runtime.report.sources = graph.sources;
  const files = deliveryFiles(project, { single, runtime });
  publishDirectory(target, files, project.config.id);
  return { output: resolve(target, 'index.html'), mode: single ? 'single-html' : 'shared', policy: runtime.report.policy, pages: project.selectedPages.map(page => page.id), modules: runtime.report.modules.length, styles: runtime.report.styles.length, bytes: runtime.report.bytes, closureHash: runtime.report.closureHash, files: files.size };
}

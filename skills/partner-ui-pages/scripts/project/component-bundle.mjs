import { createHash } from 'node:crypto';

const hash = value => createHash('sha256').update(value).digest('hex');
const quote = JSON.stringify;
const sorted = values => [...new Set(values)].sort();
const wb = '@workbench/ui-vue3', ai = 'huawei-partner-ai-ui';
const helperModule = 'skills/partner-ui-pages/maintainer/runtime-src/helpers/';

function publicEntry(graph, requested, helpers) {
  const lines = [`import * as Vue from ${quote(graph.vue)};`], objects = {};
  let seq = 0;
  for (const packageName of [wb, ai]) {
    const fields = [];
    for (const name of sorted(requested[packageName] ?? [])) {
      const resource = graph.exports[packageName]?.[name];
      if (!resource) throw Error('COMPONENT_EXPORT_MISSING: ' + packageName + ':' + name);
      const local = 'C' + seq++;
      lines.push(`import {${resource.name} as ${local}} from ${quote(resource.module)};`);
      fields.push(`${quote(name)}:${local}`);
    }
    objects[packageName] = '{' + fields.join(',') + '}';
  }
  const helperNames = [];
  for (const name of sorted(helpers)) {
    if (name === 'welcomeIcon') {
      const first = graph.exports[wb].WorkbenchSystemIcon, second = graph.exports[wb].WorkbenchPedestalIcon;
      lines.push(`import {default as SystemIcon} from ${quote(first.module)};import {default as PedestalIcon} from ${quote(second.module)};function welcomeIcon(name,kind='system'){return Vue.markRaw(Vue.defineComponent({render:()=>Vue.h(kind==='pedestal'?PedestalIcon:SystemIcon,{name})}));}`);
    } else {
      const module = helperModule + (name === 'overlays' ? 'overlays.ts' : 'chat.ts');
      lines.push(`import {${name}} from ${quote(module)};`);
    }
    helperNames.push(name);
  }
  lines.push(`const Workbench=${objects[wb]}, AI=${objects[ai]};
const components=Object.fromEntries(Object.entries({...Workbench,...AI}).filter(([name,value])=>/^[A-Z]/.test(name)&&value&&(typeof value==='object'||typeof value==='function')&&['setup','render','__name','template','props'].some(key=>key in value)));
let appCount=0;
function install(app){for(const [name,component] of Object.entries(components))app.component(name,component);return app;}
function createApp(root,props){const app=Vue.createApp(root,props);app.config.idPrefix='pui'+(++appCount);app.config.errorHandler=(error,_vm,info)=>console.error('[PartnerUI]',info,error);return install(app);}
window.PartnerUI={Vue,Workbench,AI,components,createApp,install,workbenchComponents:Object.keys(Workbench),aiComponents:Object.keys(AI),${helperNames.join(',')}};if(!window.Vue)window.Vue=Vue;`);
  return lines.join('\n');
}

function iconSelection(graph, source, declared) {
  const chosen = { workbench: {}, ai: [] }, missing = new Set(declared ?? []);
  for (const [family, info] of Object.entries(graph.icons.workbench)) {
    const selected = new Map();
    for (const icon of info.inventory.icons) {
      const names = [icon.key, icon.alias].filter(Boolean);
      if (names.some(name => source.includes(name) || missing.has(`${family}:${name}`))) {
        selected.set(icon.key, icon);
        names.forEach(name => missing.delete(`${family}:${name}`));
      }
    }
    // The native-size resolver and deprecated-name replacement are part of the
    // icon contract: retain the whole variant group and any replacement target.
    let count;
    do {
      count = selected.size;
      for (const icon of info.inventory.icons) if ([...selected.values()].some(current => (current.variantGroup && current.variantGroup === icon.variantGroup) || current.replacementKey === icon.key)) selected.set(icon.key, icon);
    } while (count !== selected.size);
    chosen.workbench[family] = [...selected.values()].sort((a, b) => a.key.localeCompare(b.key, 'en'));
  }
  for (const name of Object.keys(graph.icons.ai.entries)) if (source.includes(name) || missing.has('ai:' + name)) {
    chosen.ai.push(name); missing.delete('ai:' + name);
  }
  if (missing.size) throw Error('COMPONENT_ICON_UNKNOWN: ' + [...missing].join(', '));
  return chosen;
}

function specialize(graph, icons) {
  const replacements = new Map();
  for (const [family, info] of Object.entries(graph.icons.workbench)) {
    const selected = icons.workbench[family] ?? [], keys = new Set(selected.map(icon => icon.key));
    replacements.set(info.runtime, quote({ ...info.inventory, icons: selected }));
    const originalCompat = JSON.parse(graph.modules[info.compat].code);
    replacements.set(info.compat, quote({ ...originalCompat, icons: originalCompat.icons.filter(icon => keys.has(icon.key)) }));
    const loader = graph.modules[info.loader];
    const assets = new Set(selected.map(icon => icon.assetFile));
    const requests = Object.keys(loader.deps).filter(request => request.endsWith('?raw') && assets.has(request.split('/').at(-1).replace(/\?raw$/, '')));
    const table = requests.map(request => `${quote(request.replace(/\?raw$/, ''))}:()=>import(${quote(request)}).then(m=>m.default)`).join(',');
    // Loader generation is a declared resource adapter, not a rewrite of SVGs.
    const prefix = /,\s*(['"])(\.\.\/[^'"]*\/)\1\s*,?\s*\)/.exec(loader.code)?.[2];
    if (!prefix) throw Error('COMPONENT_ICON_LOADER_CONTRACT: ' + family);
    replacements.set(info.loader, `import {createIconAssetLoader} from '../iconAssetLoader.js';export const ${family}Assets=createIconAssetLoader({${table}},${quote(prefix)});`);
  }
  const aiInfo = graph.icons.ai;
  const entries = icons.ai.map(name => aiInfo.entries[name]);
  const original = graph.modules[aiInfo.defaultsModule].code;
  replacements.set(aiInfo.defaultsModule, original.slice(0, aiInfo.start) + '{' + entries.join(',') + '}' + original.slice(aiInfo.end));
  const artKeys = new Set(entries.flatMap(code => [...code.matchAll(/localIcons\.(\w+)/g)].map(match => match[1])));
  if (icons.ai.includes('panel.mode')) { artKeys.add('sidebar'); artKeys.add('floating'); }
  for (const name of ['like', 'dislike', 'bookmark']) if (artKeys.has(name)) artKeys.add(name + 'Active');
  const artwork = Object.fromEntries([...artKeys].sort().map(name => [name, aiInfo.artwork[name]]));
  replacements.set(aiInfo.artworkModule, `export const artwork=${quote(artwork)};`);
  // Active-state adapters must not instantiate omitted artwork. The original
  // per-icon renderer and immutable path data remain unchanged.
  const localId = 'ai/src/assets/ai-icons/localIcons.ts';
  let localCode = graph.modules[localId].code;
  for (const name of ['like', 'dislike', 'bookmark']) if (!artKeys.has(name)) localCode = localCode.replace(new RegExp('^\\s*' + name + ': createLocalIcon[^\\n]+,?$', 'm'), '');
  replacements.set(localId, localCode);
  return replacements;
}

function selectedHelpers(graph, helpers, renderers) {
  const contract = graph.helpers.chat, wanted = new Set(helpers.filter(name => !['overlays', 'welcomeIcon'].includes(name))), needed = new Set();
  const visit = name => {
    if (needed.has(name)) return;
    needed.add(name);
    if (name === 'chatRenderers') {
      if (!Array.isArray(renderers)) throw Error('COMPONENT_RENDERERS_UNDECLARED: declare resources.json.renderers (an empty array selects native text only)');
      for (const type of renderers) {
        const record = contract.renderers[type];
        if (!record) throw Error('COMPONENT_RENDERER_UNKNOWN: ' + type);
        visit(record.renderer); visit('byType');
      }
      return;
    }
    if (!contract.declarations[name] && !contract.imports[name]) throw Error('COMPONENT_HELPER_UNKNOWN: ' + name);
    contract.declarations[name]?.references.forEach(visit);
  };
  wanted.forEach(visit);
  const imports = Object.entries(contract.imports).filter(([name]) => needed.has(name)).map(([name, info]) => `import {${info.name} as ${name}} from ${quote(info.module)};`);
  const declarations = Object.entries(contract.declarations).filter(([name]) => needed.has(name) && name !== 'chatRenderers').map(([, record]) => record.code);
  if (wanted.has('chatRenderers')) declarations.push('export const chatRenderers=[' + renderers.map(type => contract.renderers[type].code).join(',') + '];');
  return [...imports, ...new Set(declarations)].join('\n');
}

function styleClosure(graph, included) {
  const selected = new Set(), seen = new Set();
  function add(id) {
    if (selected.has(id)) return;
    const record = graph.styles[id];
    if (!record) throw Error('COMPONENT_STYLE_MISSING: ' + id);
    for (const dependency of Object.values(record.deps)) add(dependency);
    selected.add(id);
  }
  function owner(id) {
    if (seen.has(id)) return;
    seen.add(id);
    const module = graph.modules[id];
    if (!module) return;
    for (const target of module.styleImports ?? Object.values(module.deps).filter(target => graph.modules[target]?.styleOnly)) owner(target);
    (module.styles ?? []).forEach(add);
  }
  add('virtual:base.css');
  // The public pui-page/stack/grid scaffolding itself consumes Foundation tokens.
  add('workbench/foundation/generated/runtime/foundation.css');
  const hasRobot = included.some(id => id.startsWith('robot/'));
  const hasAI = included.some(id => id.startsWith('ai/'));
  if (hasRobot) add(graph.stylePolicy.robotBase);
  if (hasRobot) for (const [folder, names] of Object.entries(graph.stylePolicy.robotComponents)) if (included.some(id => id.startsWith('robot/packages/components/src/' + folder + '/'))) for (const name of names) add('robot/packages/components/src/styles/components/' + name + '.less');
  if (hasAI) for (const [id, record] of Object.entries(graph.styles).filter(([, record]) => record.source === 'ai/src/styles.css').sort((a, b) => a[1].order - b[1].order)) if (record.policy === 'base' || record.owners.some(owner => included.includes(owner))) add(id);
  included.forEach(owner);
  const tier = id => id === 'virtual:base.css' ? 9 : id.includes('/foundation/generated/') ? 0 : id.startsWith('workbench/') ? 1 : id.startsWith('node_modules/') ? 2 : id.startsWith('robot/') ? 3 : id.startsWith('ai/src/styles.css#') ? 4 : 5;
  return [...selected].sort((a, b) => tier(a) - tier(b));
}

export async function bundleComponents({ graph, requested = {}, helpers = [], projectSource = '', icons: declared = [], renderers, esbuild }) {
  const entry = publicEntry(graph, requested, helpers), entryId = 'virtual:selected-entry';
  let replacements;
  const plugin = {
    name: 'offline-locked-resource-graph',
    setup(build) {
      build.onResolve({ filter: /.*/ }, args => {
        const id = args.path === entryId ? entryId : graph.modules[args.importer]?.deps[args.path] ?? (graph.modules[args.path] ? args.path : undefined);
        if (!id) throw Error('COMPONENT_DEPENDENCY_MISSING: ' + args.importer + ':' + args.path);
        return { path: id, namespace: 'resources' };
      });
      build.onLoad({ filter: /.*/, namespace: 'resources' }, args => {
        if (args.path === entryId) return { contents: entry, loader: 'js' };
        const module = graph.modules[args.path];
        return { contents: replacements.get(args.path) ?? module.code, loader: module.loader };
      });
    },
  };
  const options = { entryPoints: [entryId], bundle: true, format: 'iife', platform: 'browser', target: 'es2020', outfile: 'runtime.js', write: false, minify: true, metafile: true, legalComments: 'none', plugins: [plugin], define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env.VITE_AI_DELIVERY': '"true"', 'import.meta.env.DEV': 'false', 'import.meta.env.PROD': 'true', 'import.meta.env.SSR': 'false', __VUE_OPTIONS_API__: 'true', __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' }, logLevel: 'silent' };
  const includedBy = result => sorted(Object.values(result.metafile.outputs).flatMap(output => Object.entries(output.inputs).filter(([, info]) => info.bytesInOutput > 0).map(([name]) => name.replace(/^resources:/, '')))).filter(id => id !== entryId);
  const emptyIcons = { workbench: {}, ai: [] };
  const helperCode = selectedHelpers(graph, helpers, renderers);
  const variants = icons => { const map = specialize(graph, icons); map.set(helperModule + 'chat.ts', helperCode); return map; };
  replacements = variants(emptyIcons);
  const probe = await esbuild.build(options), initial = includedBy(probe);
  const genericIcons = /\/icons\/(?:generated|loaders|families)\/|ai-icons\/(?:artwork|localIcons)\.ts$|\/foundation\/aiIcons\.ts$/;
  const source = projectSource + '\n' + initial.filter(id => !genericIcons.test(id)).map(id => graph.modules[id].iconNames?.join('\n') ?? graph.modules[id].original ?? graph.modules[id].code).join('\n');
  const declaredIcons = requested[ai]?.includes('defaultAiIcons') ? sorted([...declared, ...Object.keys(graph.icons.ai.entries).map(name => 'ai:' + name)]) : declared;
  const icons = iconSelection(graph, source, declaredIcons);
  replacements = variants(icons);
  const result = await esbuild.build(options), included = includedBy(result), styles = styleClosure(graph, included);
  const styleResult = await esbuild.build({ stdin: { contents: styles.map(id => '@import ' + quote(id) + ';').join('\n'), loader: 'css' }, bundle: true, write: false, minify: true, target: 'es2020', outfile: 'runtime.css', logLevel: 'silent', plugins: [{ name: 'owned-styles', setup(build) {
    build.onResolve({ filter: /.*/ }, args => {
      if (/^(data:|#)/.test(args.path)) return { path: args.path, external: true };
      const id = graph.styles[args.path] ? args.path : graph.styles[args.importer]?.deps[args.path];
      if (!id) throw Error('COMPONENT_CSS_DEPENDENCY_MISSING: ' + args.importer + ':' + args.path);
      return { path: id, namespace: 'styles' };
    });
    build.onLoad({ filter: /.*/, namespace: 'styles' }, args => ({ contents: graph.styles[args.path].code, loader: 'css' }));
  } }] });
  const js = result.outputFiles[0].text, css = styleResult.outputFiles[0].text;
  const selection = { roots: Object.fromEntries(Object.entries(requested).sort().map(([key, value]) => [key, sorted(value)])), helpers: sorted(helpers), renderers: renderers ?? [], modules: included, styles, icons: { workbench: Object.fromEntries(Object.entries(icons.workbench).map(([kind, records]) => [kind, records.map(icon => icon.key)])), ai: icons.ai.sort() } };
  const inputInfo = Object.fromEntries(Object.entries(result.metafile.inputs).map(([key, info]) => [key.replace(/^resources:/, ''), info]));
  const moduleBytes = Object.fromEntries(Object.values(result.metafile.outputs).flatMap(output => Object.entries(output.inputs).map(([key, info]) => [key.replace(/^resources:/, ''), info.bytesInOutput])));
  const provenance = {
    components: Object.fromEntries([wb, ai].map(pkg => [pkg, Object.entries(graph.exports[pkg]).filter(([name, entry]) => /^[A-Z]/.test(name) && included.includes(entry.module)).map(([name]) => name).sort()])),
    modules: Object.fromEntries(included.map(id => [id, { emittedBytes: moduleBytes[id], sourceHash: graph.modules[id].sourceHash ?? hash(graph.modules[id].original ?? graph.modules[id].code), dependencies: sorted((inputInfo[id]?.imports ?? []).map(item => item.path.replace(/^resources:/, '')).filter(dep => included.includes(dep))) }])),
    styles: Object.fromEntries(styles.map(id => [id, { sha256: hash(graph.styles[id].code), owners: included.filter(owner => graph.modules[owner].styles?.includes(id) || graph.modules[owner].styleImports?.some(ref => graph.modules[ref].styles?.includes(id))).concat(graph.styles[id].owners?.filter(owner => included.includes(owner)) ?? []), policy: graph.styles[id].policy ?? (id.startsWith('virtual:') || id.includes('/foundation/generated/') || id.includes('/styles/root.css') ? 'shared-foundation' : 'owner-dependency') }])),
    assets: included.filter(id => graph.modules[id].asset).map(id => ({ id, sha256: graph.modules[id].assetHash, bytes: graph.modules[id].assetBytes })).concat(styles.flatMap(id => graph.styles[id].assets ?? [])),
  };
  return { js, css, report: { schemaVersion: 1, policy: 'component-source-closure', ...selection, closureHash: hash(quote({ ...selection, content: { js: hash(js), css: hash(css) } })), bytes: { js: Buffer.byteLength(js), css: Buffer.byteLength(css) }, hashes: { js: hash(js), css: hash(css) }, provenance } };
}

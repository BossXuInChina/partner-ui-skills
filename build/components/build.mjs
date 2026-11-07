import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import * as sfc from '@vue/compiler-sfc';
import ts from 'typescript';
import less from 'less';
import postcss from 'postcss';
import { prepareResources, suggestAIOwners, splitAIGlobal } from './prepare.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = file => fs.readFileSync(file, 'utf8');
const json = file => JSON.parse(read(file));
const hash = data => createHash('sha256').update(data).digest('hex');
const slash = file => file.split(path.sep).join('/');
const require = createRequire(path.join(root, 'package.json'));
sfc.registerTS(() => ts);
const sourceLock = json(path.join(root, 'build/components/sources.lock.json'));
const sourceBase = path.join(root, '.cache/component-sources');
const roots = Object.fromEntries(sourceLock.sources.map(source => [source.id, path.join(sourceBase, source.id)]));
const sourceEntries = {
  '@workbench/ui-vue3': path.join(roots.workbench, 'packages/ui-vue3/src/index.ts'),
  'huawei-partner-ai-ui': path.join(roots.ai, 'src/index.ts'),
  '@opentiny/tiny-robot': path.join(roots.robot, 'packages/components/src/index.ts'),
  'partner-ui/chat': path.join(root, 'skills/partner-ui-pages/maintainer/runtime-src/helpers/chat.ts'),
  'partner-ui/overlays': path.join(root, 'skills/partner-ui-pages/maintainer/runtime-src/helpers/overlays.ts'),
};
const robotRequire = createRequire(require.resolve('@opentiny/tiny-robot'));
const modules = {}, styles = {}, virtual = new Map(), dependencies = new Map();
const encode = value => JSON.stringify(value);
function id(file) {
  if (file.startsWith('virtual:')) return file;
  for (const [name, directory] of Object.entries(roots)) if (file.startsWith(directory + '/')) return name + '/' + slash(path.relative(directory, file));
  return slash(path.relative(root, file));
}
function sourceFile(request, owner) {
  const target = path.resolve(path.dirname(owner), request);
  return ['', '.ts', '.tsx', '.js', '.vue', '/index.ts', '/index.js', '/index.vue'].map(suffix => target + suffix).find(file => fs.existsSync(file) && fs.statSync(file).isFile());
}
function recordDependency(owner, request, target) {
  if (!owner) return;
  const key = id(owner);
  if (!dependencies.has(key)) dependencies.set(key, {});
  const before = dependencies.get(key)[request];
  if (before && before !== id(target)) throw Error('RESOURCE_RESOLVE_CONFLICT: ' + key + ':' + request);
  dependencies.get(key)[request] = id(target);
}
function setModule(file, contents, loader = 'js', extra = {}) {
  modules[id(file)] = { code: contents, loader, deps: {}, ...extra };
  return { contents, loader, resolveDir: file.startsWith('virtual:') ? root : path.dirname(file) };
}
async function css(file, source = read(file), scope = null, lang = null, cssModule = false) {
  let content = source;
  if (lang === 'less' || file.endsWith('.less')) content = (await less.render(content, { filename: file, javascriptEnabled: false, rewriteUrls: 'all' })).css;
  const result = await sfc.compileStyleAsync({ filename: file, source: content, id: scope ?? '', scoped: !!scope, trim: false, isProd: true, modules: !!cssModule, modulesOptions: { generateScopedName: name => name + '_' + hash(id(file)).slice(0, 8) } });
  if (result.errors.length) throw Error('RESOURCE_STYLE_COMPILE: ' + id(file) + ': ' + result.errors.join(';'));
  // Preserve full source styles, including states, at-rules and animations. Imports are
  // resolved separately; selection happens by owner, never by rendered demo DOM.
  const ast = postcss.parse(result.code), assets = [];
  ast.walkDecls(decl => {
    decl.value = decl.value.replace(/url\(\s*(['"]?)([^'"\)]+)\1\s*\)/g, (all, _quote, request) => {
      if (/^(data:|#)/.test(request)) return all;
      if (/^(?:[a-z]+:|\/)/i.test(request)) throw Error('RESOURCE_REMOTE_STYLE_ASSET: ' + id(file));
      const [requestedFile, fragment] = request.split('#');
      const target = path.resolve(path.dirname(file), requestedFile.split('?')[0]);
      const type = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' }[path.extname(target)];
      if (!type) throw Error('RESOURCE_STYLE_ASSET: ' + id(target));
      const bytes = fs.readFileSync(target);
      assets.push({ id: id(target), sha256: hash(bytes), bytes: bytes.length, type });
      return `url("data:${type};base64,${bytes.toString('base64')}${fragment ? '#' + fragment : ''}")`;
    });
  });
  styles[id(file)] = { code: ast.toString(), source: id(file), deps: {}, cssModules: result.modules, assets };
  return id(file);
}
function stripRootCSS(source) {
  return source.replace(/^import\s+['"][^'"]+\.(?:css|less)['"];?\s*$/gm, '');
}

export async function buildComponentResources() {
  for (const record of [modules, styles]) for (const key of Object.keys(record)) delete record[key];
  virtual.clear(); dependencies.clear();
  const published = json(path.join(root, 'source.lock.json'));
  for (const source of sourceLock.sources) {
    const archive = path.join(root, source.archive);
    if (hash(fs.readFileSync(archive)) !== source.sha256) throw Error('RESOURCE_SOURCE_HASH: ' + source.id);
    const pin = published.packages.find(pin => pin.name === source.name);
    if (pin && (pin.sourceCommit !== source.sourceCommit || pin.version !== source.version)) throw Error('RESOURCE_SOURCE_IDENTITY: ' + source.id);
    fs.rmSync(roots[source.id], { recursive: true, force: true });
    fs.mkdirSync(roots[source.id], { recursive: true });
    execFileSync('tar', ['-xzf', archive, '-C', roots[source.id]]);
  }
  const entryCode = Object.keys(sourceEntries).map((name, index) => `import * as P${index} from ${encode(name)}; window['P${index}']=P${index};`).join('\n') + `\nimport * as Vue from 'vue';window.Vue=Vue;`;
  virtual.set('virtual:entry', entryCode);
  const plugin = {
    name: 'pinned-component-resources',
    setup(build) {
      build.onResolve({ filter: /.*/ }, async args => {
        if (args.pluginData?.skip) return;
        let file;
        if (virtual.has(args.path)) file = args.path;
        else if (sourceEntries[args.path]) file = sourceEntries[args.path];
        else if (args.path === 'vue') file = require.resolve('vue/dist/vue.esm-bundler.js');
        else if (args.path.startsWith('.') && args.importer && !args.importer.startsWith('virtual:')) file = sourceFile(args.path.replace(/\?raw$/, ''), args.importer);
        if (!file) {
          const resolverRoot = args.importer?.startsWith(roots.robot) ? path.dirname(robotRequire.resolve('@opentiny/tiny-robot')) : args.importer?.startsWith(roots.ai) ? path.dirname(require.resolve('huawei-partner-ai-ui/styles.css')) : args.importer?.startsWith(roots.workbench) ? path.dirname(require.resolve('@workbench/ui-vue3/styles.css')) : args.resolveDir || root;
          const result = await build.resolve(args.path, { resolveDir: resolverRoot, kind: args.kind, pluginData: { skip: true } });
          if (result.errors.length) return result;
          file = result.path;
          if (result.external) throw Error('RESOURCE_EXTERNAL: ' + args.path);
        }
        recordDependency(args.importer, args.path, file);
        return { path: file, namespace: file.startsWith('virtual:') ? 'resource' : 'file' };
      });
      build.onLoad({ filter: /.*/, namespace: 'resource' }, args => setModule(args.path, virtual.get(args.path)));
      build.onLoad({ filter: /.*/, namespace: 'file' }, async args => {
        const file = args.path, extension = path.extname(file);
        let code = read(file);
        if (extension === '.vue') {
          const descriptor = sfc.parse(code, { filename: file, templateParseOptions: { comments: false } }).descriptor;
          const scope = 'data-v-' + hash(id(file)).slice(0, 8);
          const compiled = descriptor.script || descriptor.scriptSetup ? sfc.compileScript(descriptor, { id: scope, isProd: true, inlineTemplate: true, genDefaultAs: '__sfc_main__', templateOptions: { isProd: true, compilerOptions: { comments: false, scopeId: descriptor.styles.some(s => s.scoped) ? scope : undefined } } }) : { content: 'const __sfc_main__ = {};' };
          const owned = [], cssModules = {};
          for (const [index, style] of descriptor.styles.entries()) {
            if (![undefined, 'css', 'less'].includes(style.lang)) throw Error('RESOURCE_STYLE_UNSUPPORTED: ' + id(file));
            const styleFile = style.src ? path.resolve(path.dirname(file), style.src) : file + '.style' + index + '.css';
            const styleId = await css(styleFile, style.src ? read(styleFile) : style.content, style.scoped ? scope : null, style.lang, style.module);
            owned.push(styleId);
            if (style.module) cssModules[typeof style.module === 'string' ? style.module : '$style'] = styles[styleId].cssModules;
          }
          code = compiled.content;
          if (!descriptor.scriptSetup && descriptor.template) {
            const template = sfc.compileTemplate({ source: descriptor.template.content, filename: file, id: scope, scoped: descriptor.styles.some(s => s.scoped), isProd: true, compilerOptions: { comments: false, bindingMetadata: compiled.bindings ?? {} } });
            if (template.errors.length) throw Error('RESOURCE_TEMPLATE: ' + id(file) + ':' + template.errors.join(';'));
            code += '\n' + template.code;
          }
          const fields = [];
          if (!descriptor.scriptSetup && descriptor.template) fields.push('render');
          if (descriptor.styles.some(s => s.scoped)) fields.push('__scopeId:' + encode(scope));
          if (Object.keys(cssModules).length) fields.push('__cssModules:' + encode(cssModules));
          code += `\nexport default /* @__PURE__ */ Object.assign(__sfc_main__,{${fields.join(',')}});`;
          return setModule(file, code, descriptor.scriptSetup?.lang === 'tsx' || descriptor.script?.lang === 'tsx' ? 'tsx' : 'ts', { styles: owned, original: read(file) });
        }
        if (extension === '.css' || extension === '.less') {
          const styleId = await css(file, code);
          return setModule(file, 'export {};', 'js', { styles: [styleId], styleOnly: true });
        }
        if (['.svg', '.png', '.webp', '.gif', '.jpg', '.jpeg'].includes(extension)) {
          const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }[extension];
          const bytes = fs.readFileSync(file);
          // Workbench's loaders import raw SVG; all other assets use self-contained URLs.
          const value = extension === '.svg' && file.includes('/icons/') ? bytes.toString('utf8') : `data:${mime};base64,${bytes.toString('base64')}`;
          return setModule(file, 'export default ' + encode(value), 'js', { asset: true, assetHash: hash(bytes), assetBytes: bytes.length });
        }
        if (file === sourceEntries['huawei-partner-ai-ui'] || file === sourceEntries['@opentiny/tiny-robot']) code = stripRootCSS(code);
        if (/\/icons\/loaders\/[^/]+\.js$/.test(file)) {
          const match = /import\.meta\.glob\('([^']+)'/.exec(code);
          if (!match) throw Error('RESOURCE_ICON_GLOB: ' + id(file));
          const directory = path.resolve(path.dirname(file), path.dirname(match[1]));
          const table = fs.readdirSync(directory).filter(name => name.endsWith('.svg')).sort().map(name => {
            const request = slash(path.join(path.dirname(match[1]), name));
            return `${encode(request)}:()=>import(${encode(request + '?raw')}).then(m=>m.default)`;
          }).join(',');
          code = code.replace(/import\.meta\.glob\([^\n]+\)/, '{' + table + '}');
        }
        code = code.replace(/new URL\(\s*(['"])([^'"]+\.(?:png|svg|webp))\1\s*,\s*import\.meta\.url\s*\)\.href/g, (_all, _quote, request) => {
          const asset = path.resolve(path.dirname(file), request);
          const type = path.extname(asset).slice(1);
          return encode(`data:image/${type === 'svg' ? 'svg+xml' : type};base64,${fs.readFileSync(asset).toString('base64')}`);
        });
        return setModule(file, code, extension === '.json' ? 'json' : extension === '.ts' ? 'ts' : extension === '.tsx' ? 'tsx' : 'js', { original: code });
      });
    },
  };
  await esbuild.build({ entryPoints: ['virtual:entry'], absWorkingDir: root, bundle: true, platform: 'browser', format: 'iife', outfile: '.cache/component-capture.js', write: false, metafile: true, plugins: [plugin], define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env.VITE_AI_DELIVERY': '"true"', 'import.meta.env.DEV': 'false', 'import.meta.env.PROD': 'true', 'import.meta.env.SSR': 'false', __VUE_OPTIONS_API__: 'true', __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' }, logLevel: 'silent' });
  for (const [key, record] of Object.entries(modules)) record.deps = dependencies.get(key) ?? {};
  const cssFromDisk = async file => {
    if (!styles[id(file)]) await css(file);
    const record = styles[id(file)], ast = postcss.parse(record.code);
    const imports = [];
    ast.walkAtRules('import', rule => {
      const match = /^(?:url\()?\s*['"]([^'"]+)['"]/.exec(rule.params);
      if (!match || !match[1].startsWith('.')) throw Error('RESOURCE_CSS_IMPORT: ' + id(file) + ':' + rule.params);
      imports.push(match[1]);
    });
    for (const request of imports) {
      const target = path.resolve(path.dirname(file), request);
      record.deps[request] = id(target);
      await cssFromDisk(target);
    }
    record.code = record.code.replace(/url\(\s*(['"]?)([^'"\)]+)\1\s*\)/g, (all, quote, request) => {
      if (/^(data:|#)/.test(request) || imports.includes(request)) return all;
      if (/^(?:https?:|\/)/.test(request)) throw Error('RESOURCE_REMOTE_STYLE_ASSET: ' + id(file));
      const target = path.resolve(path.dirname(file), request);
      const type = { '.svg': 'image/svg+xml', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' }[path.extname(target)];
      if (!type) throw Error('RESOURCE_STYLE_ASSET: ' + target);
      return `url("data:${type};base64,${fs.readFileSync(target).toString('base64')}")`;
    });
  };
  for (const style of Object.values(styles)) {
    const file = style.source.startsWith('node_modules/') ? path.join(root, style.source) : Object.entries(roots).map(([name, directory]) => style.source.startsWith(name + '/') ? path.join(directory, style.source.slice(name.length + 1)) : null).find(Boolean);
    if (file && fs.existsSync(file)) await cssFromDisk(file);
  }
  // TinyRobot publishes a combined index sheet, but its source has explicit style
  // files per component. Reattach those files to their original component owners.
  const robotStyles = path.join(roots.robot, 'packages/components/src/styles');
  await cssFromDisk(path.join(robotStyles, 'root.css'));
  for (const name of ['container', 'bubble', 'bubble-list', 'bubble-tool', 'sender', 'history', 'anchor', 'prompt', 'prompts', 'layout']) await cssFromDisk(path.join(robotStyles, 'components', name + '.less'));
  const aiGlobal = read(path.join(roots.ai, 'src/styles.css'));
  const contractFile = path.join(root, 'build/components/ai-style-owners.json');
  const out = prepareResources({ schemaVersion: 1, sources: sourceLock.sources, entries: Object.fromEntries(Object.entries(sourceEntries).map(([name, file]) => [name, id(file)])), modules, styles });
  if (!fs.existsSync(contractFile)) throw Error('AI_STYLE_OWNERSHIP_MISSING: review a proposed owner contract before building');
  if (json(contractFile).ownerSourcesHash !== suggestAIOwners(out, aiGlobal).ownerSourcesHash) throw Error('AI_STYLE_OWNER_SOURCES_STALE: review ownership after source changes');
  Object.assign(out.styles, splitAIGlobal(aiGlobal, json(contractFile)));
  out.stylePolicy = {
    robotBase: 'robot/packages/components/src/styles/root.css',
    robotComponents: { container: ['container'], bubble: ['bubble', 'bubble-list', 'bubble-tool'], sender: ['sender'], history: ['history'], anchor: ['anchor'], prompts: ['prompt', 'prompts'], layout: ['layout'] },
  };
  const baseSource = read(path.join(root, 'skills/partner-ui-pages/maintainer/runtime-src/base.css')).split('/* restyle() helpers */')[0];
  out.styles['virtual:base.css'] = { code: baseSource, source: 'runtime-src/base.css', deps: {} };
  const directory = path.join(root, '.artifacts/component-bundling');
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'resources.raw.json'), JSON.stringify(out));
  console.log(JSON.stringify({ modules: Object.keys(modules).length, styles: Object.keys(styles).length, bytes: Buffer.byteLength(JSON.stringify(out)) }));
  return out;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { await buildComponentResources(); }
  catch (error) { console.error(error.errors?.map(e => `${e.location?.file ?? ''}: ${e.text}`).join('\n') ?? error); process.exitCode = 1; }
}

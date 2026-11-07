import { readFileSync } from 'node:fs';
import { basename, dirname, extname, relative, resolve } from 'node:path';
import { fail, hash, html, inside, localFile, noLinks, publishDirectory, safeJSON, slash } from './files.mjs';
import { makeIndex, mediaTypes, readProject } from './graph.mjs';

const inlineStyle = value => String(value).replace(/<\/style/gi, '<\\/style');
const jsonText = value => JSON.stringify(value, null, 2) + '\n';

export function deliveryFiles(project, { single = false, runtime } = {}) {
  const files = new Map(), scripts = [], styles = [];
  const add = (name, content) => {
    if (files.has(name)) fail('PROJECT_OUTPUT_COLLISION', name);
    files.set(name, content); return name;
  };
  function media(id, bytes) {
    const type = mediaTypes[extname(id)];
    if (!type) fail('PROJECT_ASSET_TYPE', id);
    if (single) return `data:${type};base64,${bytes.toString('base64')}`;
    const name = `media/${hash(bytes).slice(0, 16)}-${basename(id).replace(/[^a-zA-Z\d._-]/g, '_')}`;
    if (!files.has(name)) add(name, bytes);
    return './' + name;
  }
  for (const name of ['partner-ui-runtime.css', 'partner-ui-runtime.js']) {
    const content = runtime ? (name.endsWith('.js') ? runtime.js : runtime.css) : readFileSync(resolve(project.kit.root, 'assets/runtime', name));
    if (!single) add('runtime/' + name, content);
    (name.endsWith('.js') ? scripts : styles).push({ name: 'runtime/' + name, content });
  }
  const loader = readFileSync(resolve(project.kit.root, 'assets/project/loader.js'), 'utf8');
  scripts.push({ name: 'project-loader.js', content: loader });
  if (!single) add('project-loader.js', loader);
  for (const module of project.modules.values()) {
    let code = module.code;
    if (module.kind === 'data') code = `Object.defineProperty(exports, '__esModule', {value:true});\nexports.default = ${safeJSON(module.data)};\n`;
    if (module.kind === 'asset') code = `Object.defineProperty(exports, '__esModule', {value:true});\nexports.default = ${safeJSON(media(module.id, project.assets.get(module.id)))};\n`;
    const content = `// Generated from ${module.id.replace(/[\r\n]/g, '')}; edit the source project.\nwindow.__PartnerProject.define(${safeJSON(module.id)}, ${safeJSON(module.deps)}, function(module, exports, require) {\n'use strict';\n${code}\n});\n`;
    const name = (module.kind === 'data' ? 'data-modules/' : module.kind === 'asset' ? 'asset-modules/' : 'modules/') + module.id + (module.id.endsWith('.js') ? '' : '.js');
    scripts.push({ name, content });
    if (!single) add(name, content);
  }
  for (const style of project.styles) {
    if (/@import\b/i.test(style.source)) fail('PROJECT_CSS_IMPORT', style.id + ': list local CSS files in project.json.styles');
    const content = style.source.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (_all, _quote, request) => {
      if (/^(data:|#)/.test(request)) return `url("${request.replaceAll('"', '%22')}")`;
      if (/^(?:[a-z]+:|\/)/i.test(request)) fail('PROJECT_REMOTE_ASSET', style.id + ': ' + request);
      const asset = localFile(project.root, slash(relative(project.root, resolve(project.root, dirname(style.id), request))));
      const url = media(slash(relative(project.root, asset)), readFileSync(asset));
      // CSS is emitted at the delivery root, so URLs use the same base as imported images.
      return `url("${url}")`;
    });
    const name = `style-${styles.length}.css`;
    styles.push({ name, content });
    if (!single) add(name, content);
  }
  const config = { id: project.config.id, title: project.config.title, entry: project.entryId, startPage: project.selectedPages.some(p => p.id === project.config.startPage) ? project.config.startPage : project.selectedPages[0].id, pages: project.selectedPages };
  const start = `window.__PartnerProject.start(${safeJSON(config)});\n`;
  scripts.push({ name: 'project-start.js', content: start });
  if (!single) add('project-start.js', start);
  const styleHTML = styles.map(item => single ? `<style>\n${inlineStyle(item.content)}\n</style>` : `<link rel="stylesheet" href="${html(item.name)}">`).join('\n');
  // Data URLs preserve exact JS bytes, including HTML-comment/script tokens inside user strings.
  // Classic scripts execute in document order without file:// ESM requests or eval wrappers.
  const scriptHTML = scripts.map(item => single ? `<script src="data:text/javascript;charset=utf-8;base64,${Buffer.from(item.content).toString('base64')}"></script>` : `<script src="${html(item.name)}"></script>`).join('\n');
  add('index.html', `<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${html(project.config.title)}</title>\n${styleHTML}\n</head>\n<body>\n<div id="app"></div>\n${scriptHTML}\n</body>\n</html>\n`);
  add('project-index.json', jsonText(makeIndex(project)));
  if (runtime) add('component-report.json', jsonText(runtime.report));
  add('delivery.json', jsonText({
    schemaVersion: 1, kind: 'partner-ui-js-project', projectId: project.config.id,
    mode: single ? 'single-html' : 'shared', pages: config.pages.map(page => page.id),
    kit: project.kit.pin,
    scope: runtime ? 'Selected component source closure, owned styles and bounded icons. Vue is a fixed shared runtime; all component states are retained.' : 'Project dependency closure only. The locked Vue/Workbench/AI runtime remains complete; no library tree-shaking is claimed.',
    ...(runtime ? { componentClosureHash: runtime.report.closureHash, componentResourcePack: runtime.report.resourcePack, resourcesHash: runtime.report.resourcesHash } : {}),
    sources: Object.fromEntries([...project.modules].map(([id, module]) => [id, module.hash]).concat(project.styles.map(style => [style.id, hash(style.source)]), [['project.json', hash(readFileSync(resolve(project.root, 'project.json')))]])),
    files: Object.fromEntries([...files].map(([name, content]) => [name, { bytes: Buffer.byteLength(content), sha256: hash(content) }])),
  }));
  return files;
}

export function emitProject(input, { out, single = false, page } = {}) {
  const project = readProject(input, { page });
  const target = noLinks(out ?? resolve(project.root, page ? 'out-' + page + (single ? '-single' : '') : single ? 'out-single' : 'out'));
  if (inside(target, project.root)) fail('PROJECT_OUTPUT_OVER_SOURCE', target);
  for (const id of [...project.modules.keys(), ...project.styles.map(style => style.id), 'project.json', 'kit-lock.json']) {
    if (inside(target, resolve(project.root, id))) fail('PROJECT_OUTPUT_OVER_SOURCE', id);
  }
  const files = deliveryFiles(project, { single });
  publishDirectory(target, files, project.config.id);
  return { output: resolve(target, 'index.html'), mode: single ? 'single-html' : 'shared', pages: project.selectedPages.map(page => page.id), modules: project.modules.size, files: files.size };
}

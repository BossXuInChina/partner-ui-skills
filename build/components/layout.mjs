import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { transform } from 'esbuild';
import { aiIconDefaults } from './prepare.mjs';

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const ordered = records => Object.entries(records).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
const componentPackages = { '@workbench/ui-vue3': 'workbench', 'huawei-partner-ai-ui': 'ai' };

function internalGroup(id) {
  const group = id.split('/')[0];
  if (group === 'node_modules') return 'vendor';
  if (group === 'robot') return 'tiny-robot';
  if (group === 'workbench' || group === 'ai') return group;
  return 'runtime';
}

function assetLocation(id, code) {
  const value = JSON.parse(code.slice('export default '.length));
  const dataUrl = /^data:([^;]+);base64,/.exec(value);
  const mime = dataUrl?.[1];
  const bytes = mime ? Buffer.from(value.slice(dataUrl[0].length), 'base64') : Buffer.from(value);
  const family = /^workbench\/.*\/icons\/(assets|status|file|empty|pedestal)\//.exec(id)?.[1];
  const file = family ? 'icons/workbench-' + (family === 'assets' ? 'system' : family) + '.pack.gz'
    : 'media/' + internalGroup(id) + '.pack.gz';
  return { file, bytes, mime: mime ?? null };
}

export async function writeComponentLayout(graph, files, directory, iconNames) {
  const components = {}, publicModules = new Map(), styleOwners = new Map(), storage = new Map();
  function append(file, bytes, separator = '') {
    let pack = storage.get(file);
    if (!pack) storage.set(file, pack = { chunks: [], bytes: 0 });
    const offset = pack.bytes, suffix = Buffer.from(separator);
    pack.chunks.push(bytes, suffix);
    pack.bytes += bytes.length + suffix.length;
    return { file, offset, length: bytes.length };
  }
  const claimed = new Set();
  for (const [pkg, group] of Object.entries(componentPackages)) {
    components[group] = {};
    for (const [name, entry] of ordered(graph.exports[pkg])) {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) continue;
      const stem = 'components/' + group + '/' + name;
      if (claimed.has(stem.toLowerCase())) throw Error('COMPONENT_FILENAME_COLLISION: ' + stem);
      claimed.add(stem.toLowerCase());
      const js = stem + '.js';
      const canonical = publicModules.get(entry.module);
      if (canonical) {
        const from = './' + canonical.js.split('/').at(-1);
        files.set(directory + js, 'export { ' + entry.name + ' } from ' + JSON.stringify(from) + ';\n');
      } else {
        publicModules.set(entry.module, { js, css: stem + '.css' });
      }
      components[group][name] = { js, module: entry.module, export: entry.name };
    }
  }

  for (const [id, record] of Object.entries(graph.modules)) {
    if (record.styleOnly) continue;
    const imports = record.styleImports.flatMap(target => graph.modules[target].styles ?? []);
    for (const style of [...(record.styles ?? []), ...imports]) {
      if (!styleOwners.has(style)) styleOwners.set(style, new Set());
      styleOwners.get(style).add(id);
    }
  }
  for (const [id, record] of ordered(graph.styles)) {
    const owners = new Set([...(styleOwners.get(id) ?? []), ...(record.owners ?? [])]);
    const owner = owners.size === 1 ? publicModules.get([...owners][0]) : undefined;
    const file = owner?.css ?? 'internal/' + internalGroup(id) + '-styles.pack.gz';
    const bytes = Buffer.from(record.code);
    Object.assign(record, append(file, bytes, owner ? '\n' : ''), { sha256: sha256(bytes) });
    delete record.code;
  }

  for (const [id, record] of ordered(graph.modules)) {
    const publicEntry = publicModules.get(id);
    const original = record.original ?? record.code;
    record.iconNames = [...new Set(iconNames.filter(name => original.includes(name)))].sort();
    record.sourceHash = sha256(original);
    if (publicEntry && ['ts', 'tsx'].includes(record.loader)) {
      const result = await transform(record.code, { loader: record.loader, target: 'esnext' });
      record.code = result.code;
      record.loader = 'js';
      if (id === graph.icons.ai.defaultsModule) Object.assign(graph.icons.ai, aiIconDefaults(record.code));
    }
    const bytes = Buffer.from(record.code);
    record.sha256 = sha256(bytes);
    record.bytes = bytes.length;
    if (record.asset) {
      const asset = assetLocation(id, record.code);
      if (sha256(asset.bytes) !== record.assetHash) throw Error('COMPONENT_ASSET_SOURCE: ' + id);
      Object.assign(record, append(asset.file, asset.bytes), { mime: asset.mime });
    } else if (publicEntry) {
      record.file = publicEntry.js;
      files.set(directory + record.file, bytes);
    } else {
      Object.assign(record, append('internal/' + internalGroup(id) + '-modules.pack.gz', bytes));
    }
    delete record.code;
    delete record.original;
  }

  graph.storage = {};
  for (const [file, pack] of storage) {
    const content = Buffer.concat(pack.chunks, pack.bytes);
    const bytes = file.endsWith('.gz') ? gzipSync(content) : content;
    files.set(directory + file, bytes);
    graph.storage[file] = { sha256: sha256(bytes), bytes: content.length };
  }
  const artwork = Buffer.from(JSON.stringify(graph.icons.ai.artwork) + '\n');
  const artworkFile = 'icons/ai-artwork.json';
  files.set(directory + artworkFile, artwork);
  graph.icons.ai.artworkFile = { file: artworkFile, sha256: sha256(artwork) };
  delete graph.icons.ai.artwork;
  for (const entries of Object.values(components)) for (const entry of Object.values(entries)) {
    const css = publicModules.get(entry.module).css;
    if (storage.has(css)) entry.css = css;
  }
  return components;
}

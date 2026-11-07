import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { buildComponentResources } from './build.mjs';
import { writeComponentLayout } from './layout.mjs';

const digest = value => createHash('sha256').update(value).digest('hex');
const stable = value => Array.isArray(value) ? value.map(stable) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])])) : value;
const stringify = value => JSON.stringify(stable(value)) + '\n';

export async function componentAssets(root) {
  const graph = await buildComponentResources();
  const files = new Map(), prefix = 'skills/partner-ui-pages/';
  const names = Object.values(graph.icons.workbench).flatMap(info => info.inventory.icons.flatMap(icon => [icon.key, icon.alias].filter(Boolean))).concat(Object.keys(graph.icons.ai.entries));
  const directory = prefix + 'assets/components/';
  const components = await writeComponentLayout(graph, files, directory, names);
  const catalog = stringify({ schemaVersion: 1, components });
  files.set(directory + 'catalog.json', catalog);
  const notices = new Map();
  for (const id of Object.keys(graph.modules).filter(id => id.startsWith('node_modules/'))) {
    let directory = path.dirname(path.join(root, id)), metadata;
    while (directory !== path.dirname(directory)) {
      const file = path.join(directory, 'package.json');
      if (fs.existsSync(file)) { metadata = JSON.parse(fs.readFileSync(file, 'utf8')); if (metadata.name) break; }
      directory = path.dirname(directory);
    }
    if (!metadata?.name || notices.has(metadata.name + '@' + metadata.version)) continue;
    const license = ['LICENSE', 'LICENSE.txt', 'LICENSE.md', 'license', 'license.md', 'LICENSE-MIT'].map(name => path.join(directory, name)).find(fs.existsSync);
    notices.set(metadata.name + '@' + metadata.version, license ? fs.readFileSync(license, 'utf8') : 'Declared license: ' + JSON.stringify(metadata.license ?? 'see upstream package') + '\n' + JSON.stringify(metadata.repository ?? ''));
  }
  notices.set('@opentiny/tiny-robot@0.5.1 (source)', fs.readFileSync(path.join(root, '.cache/component-sources/robot/LICENSE'), 'utf8'));
  files.set(prefix + 'assets/components/NOTICES.txt', [...notices].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([name, license]) => name + '\n' + license).join('\n\n---\n\n'));
  const require = createRequire(path.join(root, 'package.json'));
  const wasmRoot = path.dirname(require.resolve('esbuild-wasm/package.json'));
  const toolFiles = {};
  for (const name of ['lib/main.js', 'bin/esbuild', 'wasm_exec.js', 'wasm_exec_node.js', 'esbuild.wasm', 'package.json', 'LICENSE.md']) {
    let bytes = fs.readFileSync(path.join(wasmRoot, name));
    // Resolve the child Node interpreter to the executable already running this
    // CLI. The stock WASM wrapper otherwise requires a separate `node` on PATH.
    if (name === 'lib/main.js') {
      const source = bytes.toString('utf8');
      if ((source.match(/return \["node", \[/g) ?? []).length !== 2) throw Error('COMPONENT_WASM_ADAPTER_DRIFT');
      bytes = Buffer.from(source.replaceAll('return ["node", [', 'return [process.execPath, ['));
    }
    const file = 'scripts/component-toolchain/esbuild/' + name;
    files.set(prefix + file, bytes); toolFiles[file] = digest(bytes);
  }
  graph.toolchain = { esbuild: JSON.parse(fs.readFileSync(path.join(wasmRoot, 'package.json'), 'utf8')).version, node: '>=22.12.0', adapter: 'Use process.execPath for the child Node interpreter; no binary download or npm install.', files: toolFiles };
  const resourceBytes = stringify(graph);
  const resourceFile = 'internal/resources.json';
  files.set(directory + resourceFile, resourceBytes);
  files.set(directory + 'manifest.json', stringify({ schemaVersion: 2, kind: 'partner-component-resources', sourceLock: digest(fs.readFileSync(path.join(root, 'source.lock.json'))), resources: { file: resourceFile, sha256: digest(resourceBytes) }, catalog: { file: 'catalog.json', sha256: digest(catalog) }, sources: graph.sources, moduleCount: Object.keys(graph.modules).length, styleCount: Object.keys(graph.styles).length }));
  return files;
}

import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { isDeepStrictEqual } from 'node:util';

export const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const json = file => JSON.parse(readFileSync(file, 'utf8'));
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export const slash = file => file.split(sep).join('/');
export const fail = (code, detail) => { throw new Error(`${code}: ${detail}`); };
export const inside = (root, target) => { const path = relative(root, target); return path === '' || (!isAbsolute(path) && path !== '..' && !path.startsWith('..' + sep)); };
export const safeJSON = value => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('\u2028', '\\u2028').replaceAll('\u2029', '\\u2029');
export const html = text => String(text).replace(/[&<>"']/g, value => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[value]);
export const same = isDeepStrictEqual;

export function noLinks(target) {
  const full = resolve(target);
  if (lstatSync(full, { throwIfNoEntry: false })?.isSymbolicLink()) fail('PROJECT_SYMLINK', full);
  // Canonicalize existing ancestors (including macOS /tmp), never follow the output itself.
  let parent = dirname(full);
  while (!existsSync(parent)) parent = dirname(parent);
  return resolve(realpathSync(parent), relative(parent, full));
}

export function localFile(root, name) {
  if (typeof name !== 'string' || !name || isAbsolute(name) || /[\\\0?#]/.test(name)) fail('PROJECT_PATH', String(name));
  const target = resolve(root, name);
  if (!inside(root, target) || target === root) fail('PROJECT_PATH_ESCAPE', name);
  const rel = slash(relative(root, target));
  if (rel.split('/').some(part => part.startsWith('.') || ['node_modules', 'out', 'dist'].includes(part))) fail('PROJECT_SOURCE_BOUNDARY', name);
  // macOS /tmp itself may be an OS symlink; callers canonicalize the project root first.
  let cursor = root;
  for (const part of rel.split('/')) {
    cursor = resolve(cursor, part);
    if (lstatSync(cursor, { throwIfNoEntry: false })?.isSymbolicLink()) fail('PROJECT_SYMLINK', rel);
  }
  if (!existsSync(target) || !lstatSync(target).isFile()) fail('PROJECT_FILE_MISSING', rel);
  return target;
}

export function loadKit(root = skillRoot) {
  const catalog = json(resolve(root, 'assets/project/catalog.json'));
  const versions = json(resolve(root, 'assets/runtime/versions.json'));
  if (catalog.runtimeVersion !== versions.runtime || catalog.packages.some(pkg => versions[pkg.name] !== pkg.version)) fail('PROJECT_KIT_IDENTITY', 'catalog/runtime mismatch');
  const runtime = Object.fromEntries(['partner-ui-runtime.js', 'partner-ui-runtime.css'].map(name => [name, hash(readFileSync(resolve(root, 'assets/runtime', name)))]));
  const componentManifest = resolve(root, 'assets/components/manifest.json');
  const components = existsSync(componentManifest) ? { sha256: hash(readFileSync(componentManifest)) } : undefined;
  return { root, catalog, pin: { schemaVersion: 1, runtimeVersion: versions.runtime, vue: versions.vue, packages: catalog.packages, runtime, ...(components ? { components } : {}) } };
}

let toolchain;
export function tools() {
  if (!toolchain) {
    const require = createRequire(import.meta.url);
    const directory = resolve(skillRoot, 'scripts/toolchain');
    const manifest = json(resolve(directory, 'manifest.json'));
    for (const name of ['typescript.cjs', 'vue-compiler.cjs']) if (hash(readFileSync(resolve(directory, name))) !== manifest.files[name]) fail('PROJECT_TOOLCHAIN', name);
    toolchain = { ts: require(resolve(directory, 'typescript.cjs')), vue: require(resolve(directory, 'vue-compiler.cjs')) };
  }
  return toolchain;
}

export function projectRoot(input) {
  if (!existsSync(input) || !lstatSync(input).isDirectory() || lstatSync(input).isSymbolicLink()) fail('PROJECT_DIRECTORY', input);
  return realpathSync(input);
}

export function allFiles(root, prefix = '') {
  return readdirSync(resolve(root, prefix), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en')).flatMap(entry => {
    const name = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isSymbolicLink()) fail('PROJECT_SYMLINK', name);
    return entry.isDirectory() ? allFiles(root, name) : [name];
  });
}

export function writeNewDirectory(target, files) {
  target = noLinks(target);
  if (existsSync(target)) fail('PROJECT_OUTPUT_EXISTS', target);
  mkdirSync(dirname(target), { recursive: true });
  const staging = mkdtempSync(resolve(dirname(target), '.pui-new-'));
  try { writeFiles(staging, files); renameSync(staging, target); }
  finally { rmSync(staging, { recursive: true, force: true }); }
}

export function writeFiles(root, files) {
  for (const [name, value] of files) {
    const target = resolve(root, name);
    if (!inside(root, target)) fail('PROJECT_OUTPUT_ESCAPE', name);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, value);
  }
}

export function publishDirectory(target, files, projectId) {
  target = noLinks(target);
  if (existsSync(target)) {
    const marker = resolve(target, 'delivery.json');
    if (!existsSync(marker) || lstatSync(marker).isSymbolicLink()) fail('PROJECT_OUTPUT_UNOWNED', target);
    const old = json(marker);
    if (old.kind !== 'partner-ui-js-project' || old.projectId !== projectId || !old.files) fail('PROJECT_OUTPUT_UNOWNED', target);
    for (const file of allFiles(target)) {
      if (file === 'delivery.json') continue;
      if (old.files[file]?.sha256 !== hash(readFileSync(resolve(target, file)))) fail('PROJECT_OUTPUT_EDITED', file + '; edit source, or choose a new output directory');
    }
  }
  mkdirSync(dirname(target), { recursive: true });
  const staging = mkdtempSync(resolve(dirname(target), '.pui-build-'));
  const backup = staging + '-previous';
  try {
    writeFiles(staging, files);
    if (existsSync(target)) renameSync(target, backup);
    try { renameSync(staging, target); } catch (error) { if (existsSync(backup)) renameSync(backup, target); throw error; }
    rmSync(backup, { recursive: true, force: true });
  } finally { rmSync(staging, { recursive: true, force: true }); }
}

export function parseArgs(args, booleanFlags, valueFlags) {
  const result = { positional: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('--')) { result.positional.push(arg); continue; }
    if (Object.hasOwn(result, arg)) fail('PROJECT_OPTION', 'duplicate ' + arg);
    if (booleanFlags.includes(arg)) result[arg] = true;
    else if (valueFlags.includes(arg) && args[i + 1] && !args[i + 1].startsWith('--')) result[arg] = args[++i];
    else fail('PROJECT_OPTION', arg);
  }
  return result;
}

export function cli(run) {
  try { Promise.resolve(run()).catch(error => { console.error(error.message); process.exitCode = 1; }); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

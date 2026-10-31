import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const packRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const names = ['@workbench/ui-vue3', 'huawei-partner-ai-ui'];
export const sha256 = (value) => createHash('sha256').update(value).digest('hex');
export const json = (file) => JSON.parse(readFileSync(file, 'utf8'));
const fail = (message) => { throw new Error('SOURCE_LOCK_INVALID: ' + message); };
export function inside(root, file) {
  const rel = relative(root, file);
  return rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel);
}

function archiveJSON(tarball, member, members) {
  if (!members.has(member)) fail('missing packaged document ' + member);
  return JSON.parse(execFileSync('tar', ['-xOf', tarball, member], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
  }));
}
function exportedDocument(manifest, name) {
  const entry = manifest.exports?.[`./${name}.json`];
  if (entry === undefined) return null;
  const target = typeof entry === 'string' ? entry : entry.import ?? entry.default;
  if (typeof target !== 'string' || !target.startsWith('./') || target.split('/').includes('..'))
    fail('invalid metadata export ' + name);
  return 'package/' + target.slice(2);
}
function validateIdentity(entry, manifest, metadata) {
  if (manifest.name !== entry.name || manifest.version !== entry.version)
    fail('manifest identity ' + entry.name);
  if (!metadata.release || metadata.release.sourceHasLocalChanges !== false)
    fail('clean committed release identity required ' + entry.name);
  for (const [name, data] of Object.entries(metadata)) {
    if (data.schemaVersion !== '1.0' || data.packageName !== entry.name ||
      data.version !== entry.version || data.sourceCommit !== entry.sourceCommit ||
      data.sourceHasLocalChanges !== false)
      fail('metadata identity ' + entry.name + '/' + name);
  }
  if (entry.name === names[0] &&
    !['components', 'usage', 'tokens', 'icons', 'release'].every(name => metadata[name]))
    fail('Workbench consumer metadata is incomplete');
}
export function loadPinnedPackages(root = packRoot) {
  const lock = json(resolve(root, 'source.lock.json'));
  const manifest = json(resolve(root, 'package.json'));
  if (lock.schemaVersion !== '1.0' || !Array.isArray(lock.packages) ||
    JSON.stringify(lock.packages.map(p => p.name).sort()) !== JSON.stringify([...names].sort()))
    fail('exactly the two declared package identities are required');
  const packages = lock.packages.map(entry => {
    if (!/^[a-f0-9]{64}$/.test(entry.sha256) || !/^[a-f0-9]{40}$/.test(entry.sourceCommit) ||
      !/^vendor\/[a-z0-9][a-z0-9._-]*\.tgz$/.test(entry.tarball ?? ''))
      fail('invalid pinned archive identity');
    const tarball = realpathSync(resolve(root, entry.tarball));
    if (!inside(realpathSync(resolve(root, 'vendor')), tarball)) fail('archive escapes vendor');
    if (manifest.dependencies?.[entry.name] !== 'file:' + entry.tarball)
      fail('package.json must consume the locked archive ' + entry.name);
    if (sha256(readFileSync(tarball)) !== entry.sha256) fail('SHA-256 mismatch ' + entry.name);
    const members = new Set(execFileSync('tar', ['-tzf', tarball], {
      encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
    }).trim().split('\n'));
    for (const member of members)
      if (!member.startsWith('package/') || member.split('/').includes('..'))
        fail('unsafe archive member');
    const packaged = archiveJSON(tarball, 'package/package.json', members);
    const metadata = {};
    for (const name of ['components', 'usage', 'tokens', 'icons', 'release']) {
      const member = exportedDocument(packaged, name);
      if (member) metadata[name] = archiveJSON(tarball, member, members);
    }
    validateIdentity(entry, packaged, metadata);
    return { ...entry, manifest: packaged, metadata };
  });
  return { lock, packages };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { packages } = loadPinnedPackages();
  console.log(JSON.stringify({ status: 'PASS', packages: packages.map(({ name, version, sourceCommit }) => ({ name, version, sourceCommit })) }));
}

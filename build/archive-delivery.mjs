import { constants, copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { hashFile, SKILLS, verifyDelivery } from './verify-delivery.mjs';

export function archiveDelivery(input, root) {
  const index = verifyDelivery(root);
  const manifestPath = resolve(input, 'release-manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (!/^[a-f0-9]{40}$/.test(manifest.source?.commit ?? '') || manifest.source.dirty !== false)
    throw new Error('Archive requires a clean, identified source commit');
  if (!Array.isArray(manifest.skills) || manifest.skills.length !== SKILLS.length || new Set(manifest.skills.map(x => x.name)).size !== SKILLS.length)
    throw new Error('Release manifest must contain exactly four skills');
  const checksums = new Map();
  for (const line of readFileSync(resolve(input, 'SHA256SUMS'), 'utf8').trim().split(/\r?\n/)) {
    const match = /^([a-f0-9]{64})  ([A-Za-z0-9][A-Za-z0-9._+-]*)$/.exec(line);
    if (!match || checksums.has(match[2])) throw new Error('Invalid SHA256SUMS');
    checksums.set(match[2], match[1]);
  }
  const expected = [...manifest.skills.map(x => x.file), 'release-manifest.json', 'verify-installers.mjs'];
  if (checksums.size !== expected.length || new Set(expected).size !== expected.length || expected.some(file => !checksums.has(file)))
    throw new Error('SHA256SUMS does not match release manifest');
  for (const file of expected) if (hashFile(resolve(input, file)) !== checksums.get(file)) throw new Error(`Checksum mismatch: ${file}`);
  const metadataDir = `provenance/${manifest.source.commit}`;
  const planned = [];
  for (const item of manifest.skills) {
    if (!SKILLS.includes(item.name) || typeof item.version !== 'string' || !/^[0-9A-Za-z][0-9A-Za-z.+-]*$/.test(item.version) || !Number.isSafeInteger(item.bytes) || item.bytes <= 0 || item.file !== `${item.name}-${item.version}.zip` || item.sha256 !== checksums.get(item.file))
      throw new Error(`Invalid skill identity: ${item.name}`);
    const src = resolve(input, item.file);
    if (readFileSync(src).length !== item.bytes) throw new Error(`Size mismatch: ${item.file}`);
    const archiveIdentity = JSON.parse(execFileSync(process.env.SKILLS_PYTHON || (process.platform === 'win32' ? 'python' : 'python3'), ['-c', `import json,sys,zipfile
with zipfile.ZipFile(sys.argv[1]) as z:
 bad=z.testzip()
 if bad: raise ValueError('Corrupt ZIP member: '+bad)
 z.getinfo(sys.argv[2]+'/SKILL.md')
 print(json.dumps(json.loads(z.read(sys.argv[2]+'/skill.json'))))`, src, item.name], {encoding:'utf8'}));
    if (archiveIdentity.name !== item.name || archiveIdentity.version !== item.version) throw new Error(`Archive identity mismatch: ${item.file}`);
    const relative = `${item.name}/${item.file}`;
    const existing = index.archives.find(x => x.file === relative);
    const target = resolve(root, relative);
    if (existing && (existing.sha256 !== item.sha256 || existing.version !== item.version)) throw new Error(`Version already exists with different content: ${relative}`);
    if (!existing && existsSync(target)) throw new Error(`Unindexed target already exists: ${relative}`);
    if (!existing) planned.push({src, target, entry:{skill:item.name, version:item.version, file:relative, bytes:item.bytes, sha256:item.sha256, origin:'validated-build', provenance:`${metadataDir}/release-manifest.json`}});
  }
  const metadata = ['release-manifest.json', 'SHA256SUMS', 'verify-installers.mjs'].map(file => ({src:resolve(input,file), target:resolve(root,metadataDir,file)}));
  for (const file of metadata) if (existsSync(file.target) && hashFile(file.target) !== hashFile(file.src)) throw new Error(`Provenance conflict: ${file.target}`);
  const created = [];
  const temporary = resolve(root, `.index-${randomUUID()}.tmp`);
  let temporaryCreated = false;
  try {
    mkdirSync(resolve(root, metadataDir), {recursive:true});
    for (const file of [...metadata, ...planned]) if (!existsSync(file.target)) {
      copyFileSync(file.src, file.target, constants.COPYFILE_EXCL);
      created.push(file.target);
    }
    index.archives.push(...planned.map(item => item.entry));
    index.archives.sort((a,b) => a.file < b.file ? -1 : a.file > b.file ? 1 : 0);
    verifyDelivery(root, index);
    writeFileSync(temporary, JSON.stringify(index, null, 2) + '\n', {flag:'wx'});
    temporaryCreated = true;
    renameSync(temporary, resolve(root, 'index.json'));
  } catch (error) {
    for (const file of created.reverse()) rmSync(file, {force:true});
    throw error;
  } finally { if (temporaryCreated) rmSync(temporary, {force:true}); }
  return {status:'PASS', added:planned.length, total:index.archives.length, source:manifest.source.commit};
}
const here = dirname(fileURLToPath(import.meta.url));
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const input = resolve(process.argv[2] ?? resolve(here, '../dist'));
  console.log(JSON.stringify(archiveDelivery(input, resolve(here, '../delivery'))));
}

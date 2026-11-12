import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(process.argv[2] ?? dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(readFileSync(resolve(dir, 'release-manifest.json'), 'utf8'));
if (!Array.isArray(manifest.skills) || manifest.skills.length !== 4) throw new Error('Expected four skills in release-manifest.json');
const expected = new Map();
for (const line of readFileSync(resolve(dir, 'SHA256SUMS'), 'utf8').trim().split(/\r?\n/)) {
  const match = /^([a-f0-9]{64})  ([A-Za-z0-9][A-Za-z0-9._+-]*)$/.exec(line);
  if (!match || expected.has(match[2])) throw new Error(`Invalid checksum entry: ${line}`);
  expected.set(match[2], match[1]);
}
const names = new Set(manifest.skills.map(skill => skill.file));
if (names.size !== 4 || [...names].some(name => typeof name !== 'string' || !name.endsWith('.zip')))
  throw new Error('Invalid skill archive list');
names.add('release-manifest.json');
names.add('verify-installers.mjs');
if (expected.size !== names.size || [...names].some(name => !expected.has(name)))
  throw new Error('Checksum file list does not match the manifest');
for (const [name, hash] of expected) {
  const bytes = readFileSync(resolve(dir, name));
  if (createHash('sha256').update(bytes).digest('hex') !== hash) throw new Error(`Checksum mismatch: ${name}`);
  const skill = manifest.skills.find(item => item.file === name);
  if (skill && (skill.sha256 !== hash || skill.bytes !== bytes.length)) throw new Error(`Manifest mismatch: ${name}`);
  console.log(`OK ${name}`);
}

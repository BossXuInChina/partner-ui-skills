import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { zipSync, strToU8 } from 'fflate';
import { archiveDelivery } from '../build/archive-delivery.mjs';
import { verifyDelivery, SKILLS } from '../build/verify-delivery.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
function makeFixture() {
  const temp = mkdtempSync(resolve(tmpdir(), 'skill-archive-test-'));
  const root = resolve(temp, 'delivery');
  mkdirSync(root);
  for (const name of SKILLS) mkdirSync(resolve(root, name));
  writeFileSync(resolve(root, 'index.json'), JSON.stringify({schemaVersion:1, archives:[]}));
  return {temp, root};
}
function makeRelease(temp, label, commit) {
  const dir = resolve(temp, label);
  mkdirSync(dir);
  const version = '1.0.0-preview.1';
  const skills = SKILLS.map(name => {
    const file = `${name}-${version}.zip`;
    const bytes = Buffer.from(zipSync({[`${name}/SKILL.md`]:strToU8(`---\nname: ${name}\n---\n${label}`), [`${name}/skill.json`]:strToU8(JSON.stringify({name,version}))}));
    writeFileSync(resolve(dir,file),bytes);
    return {name,version,file,bytes:bytes.length,sha256:hash(bytes)};
  });
  const manifest = Buffer.from(JSON.stringify({source:{commit,dirty:false},skills}));
  const verifier = Buffer.from('// verifier\n');
  writeFileSync(resolve(dir,'release-manifest.json'),manifest);
  writeFileSync(resolve(dir,'verify-installers.mjs'),verifier);
  writeFileSync(resolve(dir,'SHA256SUMS'),[...skills.map(s=>`${s.sha256}  ${s.file}`),`${hash(manifest)}  release-manifest.json`,`${hash(verifier)}  verify-installers.mjs`].join('\n')+'\n');
  return {dir, skills};
}

test('archives independent versions with provenance, verifies integrity and permits identical replay', () => {
  const {temp,root} = makeFixture();
  try {
    const release = makeRelease(temp,'first','a'.repeat(40));
    assert.equal(archiveDelivery(release.dir,root).added,4);
    assert.equal(verifyDelivery(root).archives.length,4);
    assert.ok(verifyDelivery(root).archives.every(entry => entry.origin === 'packaged-build'));
    assert.equal(archiveDelivery(release.dir,root).added,0);
    const entry = verifyDelivery(root).archives[0];
    writeFileSync(resolve(root,entry.file), 'tampered');
    assert.throws(() => verifyDelivery(root), /archive mismatch/);
  } finally { rmSync(temp,{recursive:true,force:true}); }
});

test('refuses same version with different bytes without overwriting prior history', () => {
  const {temp,root} = makeFixture();
  try {
    const oldRelease = makeRelease(temp,'first','a'.repeat(40));
    archiveDelivery(oldRelease.dir,root);
    const originalIndex = readFileSync(resolve(root,'index.json'));
    const entry = verifyDelivery(root).archives[0];
    const original = readFileSync(resolve(root,entry.file));
    const replacement = makeRelease(temp,'second','b'.repeat(40));
    assert.throws(() => archiveDelivery(replacement.dir,root), /Version already exists with different content/);
    assert.deepEqual(readFileSync(resolve(root,entry.file)), original);
    assert.deepEqual(readFileSync(resolve(root,'index.json')), originalIndex);
  } finally { rmSync(temp,{recursive:true,force:true}); }
});

test('rejects altered release bytes before modifying the archive', () => {
  const {temp,root} = makeFixture();
  try {
    const release = makeRelease(temp,'first','a'.repeat(40));
    writeFileSync(resolve(release.dir,release.skills[0].file),'tampered');
    assert.throws(() => archiveDelivery(release.dir,root), /Checksum mismatch/);
    assert.equal(verifyDelivery(root).archives.length,0);
  } finally { rmSync(temp,{recursive:true,force:true}); }
});

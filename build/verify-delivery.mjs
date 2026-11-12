import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SKILLS = ['partner-ui-pages', 'partner-ui-vue3', 'partner-ui-review', 'design-requirement-canvas'];
export const hashFile = file => createHash('sha256').update(readFileSync(file)).digest('hex');
export function verifyDelivery(root, candidate) {
  const index = candidate ?? JSON.parse(readFileSync(resolve(root, 'index.json'), 'utf8'));
  if (index.schemaVersion !== 1 || !Array.isArray(index.archives)) throw new Error('Invalid delivery index');
  const seen = new Set();
  for (const entry of index.archives) {
    if (!SKILLS.includes(entry.skill) || typeof entry.version !== 'string' || !entry.version ||
        typeof entry.file !== 'string' || !entry.file.startsWith(entry.skill + '/') ||
        !/^[a-z0-9][a-z0-9._+-]*\.zip$/i.test(entry.file.slice(entry.skill.length + 1)) ||
        !/^[a-f0-9]{64}$/.test(entry.sha256) || !Number.isSafeInteger(entry.bytes) || entry.bytes <= 0 || seen.has(entry.file))
      throw new Error(`Invalid delivery entry: ${entry.file}`);
    seen.add(entry.file);
    const file = resolve(root, entry.file);
    const stat = lstatSync(file);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size !== entry.bytes || hashFile(file) !== entry.sha256)
      throw new Error(`Delivery archive mismatch: ${entry.file}`);
    if (entry.provenance) {
      if (!/^provenance\/[a-zA-Z0-9._/-]+$/.test(entry.provenance) || entry.provenance.split('/').includes('..') || !lstatSync(resolve(root, entry.provenance)).isFile())
        throw new Error(`Invalid provenance: ${entry.file}`);
    }
  }
  for (const skill of SKILLS)
    for (const file of readdirSync(resolve(root, skill)))
      if (file.endsWith('.zip') && !seen.has(skill + '/' + file)) throw new Error(`Unindexed archive: ${skill}/${file}`);
  return index;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(process.argv[2] ?? resolve(dirname(fileURLToPath(import.meta.url)), '../delivery'));
  const index = verifyDelivery(root);
  console.log(JSON.stringify({status:'PASS', archives:index.archives.length}));
}

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function checkDeliveryRelease(index, manifest) {
  if (!Array.isArray(index.archives) || !Array.isArray(manifest.skills)) throw new Error('Invalid delivery or release manifest');
  let compared = 0;
  for (const skill of manifest.skills) {
    const archived = index.archives.find(entry => entry.file === `${skill.name}/${skill.file}`);
    if (!archived) continue; // A new version may be awaiting cross-platform validation before archiving.
    compared++;
    if (archived.sha256 !== skill.sha256 || archived.bytes !== skill.bytes || archived.version !== skill.version)
      throw new Error(`Archived version differs from this build: ${skill.file}; choose a new version`);
  }
  return {status:'PASS', compared, notYetArchived:manifest.skills.length - compared};
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const index = JSON.parse(readFileSync(resolve(root, 'delivery/index.json'), 'utf8'));
  const manifest = JSON.parse(readFileSync(resolve(root, 'dist/release-manifest.json'), 'utf8'));
  console.log(JSON.stringify(checkDeliveryRelease(index, manifest)));
}

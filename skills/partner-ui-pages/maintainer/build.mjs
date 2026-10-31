// Rebuild the offline prototype runtime from the pinned packages installed in this
// workspace, or from a self-contained installed Skill. No component source checkout is used.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(here, '..');
const workspaceRoot = path.resolve(here, '../../..');
const root = fs.existsSync(path.join(skillRoot, 'source.lock.json')) ? skillRoot : workspaceRoot;
const localBuilder = path.join(here, 'runtime-build/build-prototype.mjs');
const builder = fs.existsSync(localBuilder) ? localBuilder : path.join(root, 'shared/runtime/build-prototype.mjs');
const { buildPrototypeRuntime } = await import(pathToFileURL(builder).href);
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--out'))
  throw new Error('usage: node maintainer/build.mjs [--out path-relative-to-maintainer]');
const outDir = path.resolve(here, args[1] ?? '../assets/runtime');
const lock = JSON.parse(fs.readFileSync(path.join(root, 'source.lock.json'), 'utf8'));
const result = await buildPrototypeRuntime({ root, lock, outDir });
for (const file of result.files) console.log(`${path.relative(root, file)} ${Math.round(fs.statSync(file).size / 1024)}KB`);

#!/usr/bin/env node
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const project = resolve(args[0] ?? '.');
if (args.includes('--help')) {
  console.log('Usage: node scripts/static.mjs <project> [--json]\nUses the skill pinned registry. Version drift is reported; registry validation is never bypassed.');
} else {
  const git = arguments_ => { try { return execFileSync('git', ['-C', project, ...arguments_], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; } };
  const read = path => existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;
  const lockPath = [resolve(here, '../source.lock.json'), resolve(here, '../../../source.lock.json')].find(existsSync);
  const skillLock = lockPath ? read(lockPath) : null;
  const declared = read(resolve(project, 'package.json'))?.dependencies ?? {};
  const packages = ['@workbench/ui-vue3', 'huawei-partner-ai-ui'].map(name => ({ name, declared: declared[name] ?? null, installed: read(resolve(project, 'node_modules', name, 'package.json'))?.version ?? null, pinned: skillLock?.packages.find(p => p.name === name)?.version ?? null }));
  const lockfile = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'].map(n => resolve(project, n)).find(existsSync);
  console.error(JSON.stringify({ project, head: git(['rev-parse', 'HEAD']), dirty: git(['status', '--porcelain']), packages, skillLock: skillLock?.buildDate ?? null, projectLock: lockfile ? { path: lockfile, sha256: createHash('sha256').update(readFileSync(lockfile)).digest('hex') } : null, versionDrift: packages.filter(p => p.installed && p.pinned && p.installed !== p.pinned), warning: 'Version drift can make pinned icon/API references stale; installed versions do not grant a lock upgrade.' }));
  const result = spawnSync(process.execPath, [resolve(here, 'check_vue.mjs'), project, ...args.slice(1)], { stdio: 'inherit' });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}

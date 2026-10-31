import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { packRoot } from './verify-lock.mjs';

const skill = resolve(packRoot, 'skills/partner-ui-pages');
const runs = resolve(packRoot, '.artifacts/templates');
mkdirSync(runs, { recursive: true });
const output = mkdtempSync(resolve(runs, 'run-'));
const templates = readdirSync(resolve(skill, 'assets/templates')).filter(name => name.endsWith('.html')).sort();
if (templates.length !== 6) throw new Error('Expected the six original templates');
const checks = [];
for (const file of templates) {
  const name = file.slice(0, -5), dir = resolve(output, name), began = performance.now();
  execFileSync('python3', [resolve(skill, 'scripts/new_page.py'), '--template', name, '--out', dir, '--title', '模板验证', '--no-fonts'], { stdio: 'pipe' });
  const result = spawnSync(process.execPath, [resolve(skill, 'scripts/check_page.mjs'), resolve(dir, 'index.html')], {
    cwd: packRoot, encoding: 'utf8', env: { ...process.env, PWDEBUG: '0', PLAYWRIGHT_PATH: resolve(packRoot, 'node_modules/') + '/' },
  });
  writeFileSync(resolve(output, name + '.log'), (result.stdout ?? '') + (result.stderr ?? '') + (result.error ?? ''));
  const check = { template: name, exitCode: result.status, seconds: +( (performance.now() - began) / 1000).toFixed(2) };
  checks.push(check);
  writeFileSync(resolve(output, 'receipt.json'), JSON.stringify(checks, null, 2) + '\n');
  console.log(JSON.stringify(check));
  if (result.status !== 0) throw new Error('TEMPLATE_CHECK_FAILED: ' + name);
}

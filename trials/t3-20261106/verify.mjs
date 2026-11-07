import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const host = resolve(root, 'host');
const out = resolve(root, 'checks'); mkdirSync(out, { recursive: true });
const checks = [
  ['prepare', process.execPath, ['../prepare.mjs']],
  ['install', 'pnpm', ['install', '--frozen-lockfile']],
  ['browser-prepare', 'pnpm', ['exec', 'playwright', 'install', '--only-shell', 'chromium']],
  ['sources', process.execPath, ['../check-sources.mjs']],
  ['vue-tree', 'pnpm', ['list', 'vue', '--depth', '10', '--json']],
  ['typecheck', 'pnpm', ['typecheck']], ['lint', 'pnpm', ['lint']],
  ['format', 'pnpm', ['format:check']], ['rules', 'pnpm', ['check:rules']],
  ['unit', 'pnpm', ['test:unit']], ['build', 'pnpm', ['build']],
  ['browser', 'pnpm', ['test:browser']], ['smoke', process.execPath, ['tests/smoke.mjs']],
];
const receipt = { startedAt: new Date().toISOString(), node: process.version, checks: [] };
for (const [name, cmd, args] of checks) {
  const startedAt = new Date().toISOString(); const start = Date.now();
  const run = spawnSync(cmd, args, { cwd: host, encoding: 'utf8', env: { ...process.env, HARNESS_PORT: '5423', PLAYWRIGHT_SKIP_BROWSER_GC: '1' }, maxBuffer: 20_000_000 });
  const endedAt = new Date().toISOString(); const log = `${name}.log`;
  writeFileSync(resolve(out, log), (run.stdout ?? '') + (run.stderr ?? '') + (run.error?.message ?? ''));
  receipt.checks.push({ name, command: [cmd, ...args].join(' '), startedAt, endedAt, durationMs: Date.now() - start, exitCode: run.status, log: `checks/${log}` });
  if (['prepare', 'install', 'browser-prepare', 'sources'].includes(name) && run.status !== 0) break;
}
receipt.endedAt = new Date().toISOString();
writeFileSync(resolve(root, 'receipt.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
if (receipt.checks.some(check => check.exitCode !== 0)) process.exitCode = 1;

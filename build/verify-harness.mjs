import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { buildConsumerPack } from './consumer-pack.mjs';
import { packRoot, json } from './verify-lock.mjs';

export function toolEntry(project, name, alias) {
  const directory = realpathSync(resolve(project, 'node_modules', name));
  const manifest = json(resolve(directory, 'package.json'));
  const entry = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.[alias];
  if (!entry) throw new Error('HARNESS_TOOL_BIN_MISSING: ' + name);
  return resolve(directory, entry);
}
export async function verifyHarness(root = packRoot) {
  const runs = resolve(root, '.artifacts/harness');
  mkdirSync(runs, { recursive: true });
  const evidence = mkdtempSync(resolve(runs, 'run-'));
  writeFileSync(
    resolve(runs, 'latest.json'),
    JSON.stringify({ receipt: resolve(evidence, 'receipt.json') }) + '\n',
  );
  const began = performance.now();
  const project = resolve(root, 'dist/partner-ui-vue3/assets/harness');
  const env = {
    ...process.env,
    CI: 'true',
    PWDEBUG: '0',
    VITE_ENABLE_MOCKS: 'false',
    PARTNER_HARNESS_VITE_ROOT: project,
  };
  const checks = [];
  let finished = false;
  const save = () =>
    writeFileSync(
      resolve(evidence, 'receipt.json'),
      JSON.stringify(
        {
          status: checks.some((check) => check.status !== 'PASS')
            ? 'FAIL'
            : finished
              ? 'PASS'
              : 'RUNNING',
          scope: 'packaged standalone Vue harness',
          checks,
          evidenceRoot: evidence,
          seconds: +((performance.now() - began) / 1000).toFixed(2),
        },
        null,
        2,
      ) + '\n',
    );
  function run(name, command, args, { cwd = project, expectedError, extraEnv } = {}) {
    const start = performance.now();
    const result = spawnSync(command, args, {
      cwd,
      env: { ...env, ...extraEnv },
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    const output = (result.stdout ?? '') + (result.stderr ?? '') + (result.error ?? '');
    writeFileSync(resolve(evidence, name + '.log'), output);
    const pass = expectedError
      ? result.status !== null && result.status !== 0 && output.includes(expectedError)
      : result.status === 0;
    const check = {
      name,
      status: pass ? 'PASS' : 'FAIL',
      exitCode: result.status,
      expected: expectedError ?? 'success',
      seconds: +((performance.now() - start) / 1000).toFixed(2),
    };
    checks.push(check);
    save();
    console.log(JSON.stringify(check));
    if (!pass && name === 'preview-browser' && existsSync(resolve(project, 'test-results')))
      cpSync(resolve(project, 'test-results'), resolve(evidence, 'browser-failures'), {
        recursive: true,
      });
    if (!pass) throw new Error('HARNESS_CHECK_FAILED: ' + name + '\n' + output.slice(-4500));
  }
  save();
  await buildConsumerPack({ root });
  run('frozen-install', 'pnpm', ['install', '--frozen-lockfile', '--reporter=append-only']);
  const installed = readdirSync(resolve(project, 'node_modules/.pnpm'));
  const vue = installed.filter((name) => /^vue@/.test(name));
  const vuePackages = [
    'compiler-core',
    'compiler-dom',
    'compiler-sfc',
    'compiler-ssr',
    'reactivity',
    'runtime-core',
    'runtime-dom',
    'server-renderer',
    'shared',
  ];
  if (
    vue.length !== 1 ||
    !/^vue@3\.5\.13(?:_|$)/.test(vue[0]) ||
    vuePackages.some((name) => {
      const rows = installed.filter((row) => row.startsWith('@vue+' + name + '@'));
      return rows.length !== 1 || !rows[0].startsWith('@vue+' + name + '@3.5.13');
    })
  )
    throw new Error('HARNESS_SINGLE_VUE_CHECK_FAILED');
  checks.push({
    name: 'single-vue-install',
    status: 'PASS',
    version: '3.5.13',
    packages: ['vue', ...vuePackages.map((name) => '@vue/' + name)],
  });
  save();
  const node = (name, tool, alias, args) =>
    run(name, process.execPath, [toolEntry(project, tool, alias), ...args]);
  node('typecheck', 'vue-tsc', 'vue-tsc', ['--noEmit']);
  node('lint', 'eslint', 'eslint', ['.', '--max-warnings', '0']);
  node('format', 'prettier', 'prettier', ['--check', '.']);
  run('feature-rules', process.execPath, [
    resolve(project, '../../scripts/check_vue.mjs'),
    resolve(project, 'src'),
  ]);
  run('unit', process.execPath, [toolEntry(project, 'vitest', 'vitest'), 'run'], {
    extraEnv: { VITE_ENABLE_MOCKS: 'true' },
  });
  node('production-build', 'vite', 'vite', ['build']);
  node('preview-browser', '@playwright/test', 'playwright', ['test']);
  run('template-backend-contracts', process.execPath, [
    '--test',
    'tests/fixtures/template-backend.test.mjs',
  ]);
  run('template-smoke', process.execPath, [
    'tests/fixtures/run-template-smoke.mjs',
    '--project',
    '.',
    '--out',
    resolve(evidence, 'template-smoke'),
  ]);
  run('guard-real-vite-tests', process.execPath, ['--test', 'tests/harness-guard.test.mjs'], {
    cwd: root,
  });

  // Exercise the actual harness configuration with an intentionally imported mock.
  const scratch = mkdtempSync(resolve(root, '.cache/harness-negative-'));
  try {
    const negative = resolve(scratch, 'assets/harness');
    cpSync(project, negative, {
      recursive: true,
      filter: (source) =>
        !['node_modules', 'dist', 'test-results', 'playwright-report'].includes(
          source.split(/[\\/]/).at(-1),
        ),
    });
    symlinkSync(resolve(project, 'node_modules'), resolve(negative, 'node_modules'), 'dir');
    const entry = resolve(negative, 'src/main.ts'),
      original = readFileSync(entry, 'utf8');
    const scaffold = resolve(negative, 'src/scaffold');
    const modules = [];
    function collect(directory, prefix = './scaffold') {
      for (const item of readdirSync(directory, { withFileTypes: true })) {
        const name = prefix + '/' + item.name;
        if (item.isDirectory()) collect(resolve(directory, item.name), name);
        else if (/\.(?:ts|vue)$/.test(item.name) && !item.name.endsWith('.d.ts'))
          modules.push(name);
      }
    }
    try {
      collect(scaffold);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (modules.length) {
      writeFileSync(
        resolve(negative, 'src/scaffold-probe.ts'),
        modules
          .map((name, index) => `import * as module${index} from ${JSON.stringify(name)};`)
          .join('\n') +
          `\nObject.defineProperty(globalThis, '__scaffoldBuildProbe', {value:[${modules.map((_, index) => 'module' + index).join(',')}]});\n`,
      );
      writeFileSync(entry, original + '\nimport "./scaffold-probe";\n');
      run(
        'all-scaffold-production-build',
        process.execPath,
        [toolEntry(project, 'vite', 'vite'), 'build'],
        { cwd: negative },
      );
      writeFileSync(entry, original);
    }
    mkdirSync(resolve(negative, 'src/mocks'), { recursive: true });
    writeFileSync(
      resolve(negative, 'src/mocks/forbidden.ts'),
      'export const value = "development-only";\n',
    );
    writeFileSync(entry, original + '\nimport "./mocks/forbidden";\n');
    run(
      'actual-harness-rejects-import',
      process.execPath,
      [toolEntry(project, 'vite', 'vite'), 'build'],
      { cwd: negative, expectedError: 'PRODUCTION_MOCK_IMPORT' },
    );
    writeFileSync(entry, original);
    for (const mode of ['production', 'staging']) {
      writeFileSync(resolve(negative, '.env.' + mode), 'VITE_ENABLE_MOCKS=true\n');
      run(
        'actual-harness-rejects-env-' + mode,
        process.execPath,
        [toolEntry(project, 'vite', 'vite'), 'build', '--mode', mode],
        {
          cwd: negative,
          expectedError: 'PRODUCTION_MOCK_FLAG',
          extraEnv: { VITE_ENABLE_MOCKS: undefined },
        },
      );
      rmSync(resolve(negative, '.env.' + mode));
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
  finished = true;
  save();
  return json(resolve(evidence, 'receipt.json'));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  console.log(JSON.stringify(await verifyHarness()));

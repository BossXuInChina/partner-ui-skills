import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Run against extracted, standalone consumer packages, outside the source tree.
const dist = resolve(process.argv[2] ?? process.env.SKILLS_DIST ?? 'dist');
const python = process.env.SKILLS_PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const work = mkdtempSync(join(tmpdir(), 'skill 独立 smoke '));
const run = (exe, args, cwd = work) => {
  const result = spawnSync(exe, args, {cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024});
  if (result.error || result.status !== 0) throw new Error(`${exe} ${args.join(' ')}\n${result.error ?? ''}\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
};
const node = (...args) => run(process.execPath, args);
try {
  const names = ['partner-ui-pages', 'partner-ui-vue3', 'partner-ui-review', 'design-requirement-canvas'];
  for (const name of names) {
    assert.ok(existsSync(join(dist, name, 'SKILL.md')), `${name}: missing SKILL.md`);
    assert.equal(JSON.parse(readFileSync(join(dist, name, 'skill.json'), 'utf8')).name, name);
  }
  const pages = join(dist, names[0]);
  const demo = join(work, '演示项目 space');
  node(join(pages, 'scripts/new_project.mjs'), '--out', demo, '--id', 'standalone-demo');
  node(join(pages, 'scripts/check_project.mjs'), demo);
  node(join(pages, 'scripts/emit_project.mjs'), demo, '--single');
  assert.ok(existsSync(join(demo, 'out-single/index.html')));
  console.log('PASS partner-ui-pages: create, validate and export single HTML');

  const vue = join(dist, names[1]);
  const feature = join(work, '功能 space');
  node(join(vue, 'scripts/new_feature.mjs'), 'agreements', '--template', 'workbench-list', '--out', feature);
  assert.ok(existsSync(join(feature, 'delivery.json')));
  assert.ok(existsSync(join(feature, 'index.ts')));
  const contested = join(work, '并发 feature');
  const launch = template => new Promise((yes, no) => {
    const child = spawn(process.execPath, [join(vue, 'scripts/new_feature.mjs'), 'contested', '--template', template, '--out', contested], {cwd: work, stdio:'ignore'});
    child.once('error', no);
    child.once('close', yes);
  });
  const codes = await Promise.all([launch('blank'), launch('ai-chat')]);
  assert.deepEqual(codes.sort(), [0, 1], 'exactly one concurrent writer must succeed');
  const delivery = JSON.parse(readFileSync(join(contested, 'delivery.json'), 'utf8'));
  assert.ok(existsSync(join(contested, 'pages', delivery.template, 'Page.vue')));
  console.log('PASS partner-ui-vue3: verify bundled package identity and generate feature');

  const review = join(dist, names[2]);
  const lookup = JSON.parse(node(join(review, 'scripts/assets.mjs'), 'search', '--query', 'WorkbenchTable', '--limit', '5'));
  assert.ok(lookup.total > 0, 'review asset search returned no results');
  // Use tools installed in the target project, as documented by the skill.
  if (process.env.SKILLS_SMOKE_INSTALL_REVIEW === '1') {
    writeFileSync(join(feature, 'package.json'), JSON.stringify({name:'standalone-review-fixture', private:true}));
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const deps = ['typescript@5.9.3', 'vue@3.5.42'];
    if (process.env.SKILLS_SMOKE_BROWSER === '1') deps.push('playwright@1.63.0');
    const result = spawnSync(npm, ['install', '--no-save', '--no-package-lock', '--ignore-scripts', ...deps], {cwd: feature, encoding:'utf8', shell: process.platform === 'win32', maxBuffer: 32 * 1024 * 1024});
    if (result.error || result.status !== 0) throw new Error(`review dependency install failed\n${result.error ?? ''}\n${result.stdout}\n${result.stderr}`);
    node(join(review, 'scripts/static.mjs'), feature, '--json');
    console.log('PASS partner-ui-review: asset search and static analysis of generated feature');
  } else {
    console.log('PASS partner-ui-review: bundled asset search (static analysis skipped)');
  }

  const canvas = join(dist, names[3]);
  const scenario = join(work, '画布 scenario');
  cpSync(join(canvas, 'tests/fixtures/demo-scenario'), scenario, {recursive:true});
  const manifest = join(scenario, 'manifest.json');
  const html = join(scenario, 'dist', '画布.html');
  const handoff = join(scenario, 'dist', 'handoff');
  node(join(canvas, 'scripts/python.mjs'), '--version');
  run(python, [join(canvas, 'scripts/validate_canvas_contract.py'), manifest]);
  const built = JSON.parse(run(python, [join(canvas, 'scripts/build_canvas.py'), manifest, '--out', html]));
  assert.ok(built.output.endsWith('画布.html'), 'Unicode output path should survive the CLI');
  run(python, [join(canvas, 'scripts/export_handoff.py'), manifest, '--out', handoff]);
  assert.ok(existsSync(html));
  assert.ok(existsSync(join(handoff, 'generation-brief.json')));
  console.log('PASS design-requirement-canvas: validate, build and export handoff');
  if (process.env.SKILLS_SMOKE_BROWSER === '1') {
    assert.equal(process.env.SKILLS_SMOKE_INSTALL_REVIEW, '1');
    run(process.execPath, [join(feature, 'node_modules/playwright/cli.js'), 'install', 'chromium', '--only-shell'], feature);
    const {chromium} = createRequire(join(feature, 'package.json'))('playwright');
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(pathToFileURL(join(demo, 'out-single/index.html')).href);
      await page.waitForSelector('#app');
      assert.deepEqual(errors, [], 'offline Pages HTML should load without JavaScript errors');
    } finally { await browser.close(); }
    run(process.execPath, [join(canvas, 'scripts/test_canvas_browser.mjs'), '--html', html, '--manifest', manifest], feature);
    console.log('PASS browser: offline Pages and Canvas interactive checks');
  }
} finally {
  rmSync(work, {recursive:true, force:true});
}

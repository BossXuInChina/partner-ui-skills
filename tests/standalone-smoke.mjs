import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

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
  console.log('PASS partner-ui-vue3: verify bundled package identity and generate feature');

  const review = join(dist, names[2]);
  const lookup = JSON.parse(node(join(review, 'scripts/assets.mjs'), 'search', '--query', 'WorkbenchTable', '--limit', '5'));
  assert.ok(lookup.total > 0, 'review asset search returned no results');
  // Use tools installed in the target project, as documented by the skill.
  if (process.env.SKILLS_SMOKE_INSTALL_REVIEW === '1') {
    writeFileSync(join(feature, 'package.json'), JSON.stringify({name:'standalone-review-fixture', private:true}));
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const result = spawnSync(npm, ['install', '--no-save', '--no-package-lock', '--ignore-scripts', 'typescript@5.9.3', '@vue/compiler-sfc@3.5.42'], {cwd: feature, encoding:'utf8', shell: process.platform === 'win32', maxBuffer: 32 * 1024 * 1024});
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
  run(python, [join(canvas, 'scripts/validate_canvas_contract.py'), manifest]);
  run(python, [join(canvas, 'scripts/build_canvas.py'), manifest, '--out', html]);
  run(python, [join(canvas, 'scripts/export_handoff.py'), manifest, '--out', handoff]);
  assert.ok(existsSync(html));
  assert.ok(existsSync(join(handoff, 'generation-brief.json')));
  console.log('PASS design-requirement-canvas: validate, build and export handoff');
} finally {
  rmSync(work, {recursive:true, force:true});
}

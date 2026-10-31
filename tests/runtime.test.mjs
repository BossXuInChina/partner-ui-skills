import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test, { before, after } from 'node:test';
import { chromium } from 'playwright';
import { buildPrototypeRuntime, verifyInstalledPackageBytes } from '../shared/runtime/build-prototype.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lock = JSON.parse(fs.readFileSync(path.join(root, 'source.lock.json'), 'utf8'));
let scratch;
let first;
let second;
before(async () => {
  fs.mkdirSync(path.join(root, '.artifacts'), { recursive: true });
  scratch = fs.mkdtempSync(path.join(root, '.artifacts/runtime-test-'));
  first = await buildPrototypeRuntime({ root, lock, outDir: path.join(scratch, 'first') });
  second = await buildPrototypeRuntime({ root, lock, outDir: path.join(scratch, 'second') });
});
after(() => { if (scratch) fs.rmSync(scratch, { recursive: true, force: true }); });

test('runtime build is byte-stable and derives date and versions from the lock and installed manifests', () => {
  assert.deepEqual(first.versions, second.versions);
  assert.equal(first.versions.builtAt, lock.buildDate);
  assert.equal(first.versions.runtime, lock.runtimeVersion);
  assert.equal(first.versions.vue, '3.5.13');
  for (const item of lock.packages) assert.equal(first.versions[item.name], item.version);
  assert.equal(Object.keys(first.versions)[0], '_generated');
  for (const item of lock.packages)
    assert.ok(first.versions._generated.includes(`${item.name}@${item.version}(${item.sourceCommit})`));
  assert.deepEqual(first.files.map((file) => path.basename(file)), ['partner-ui-runtime.css', 'partner-ui-runtime.js', 'versions.json']);
  for (const [index, file] of first.files.entries())
    assert.deepEqual(fs.readFileSync(file), fs.readFileSync(second.files[index]));
  for (const file of first.files.filter((file) => /\.(?:js|css)$/.test(file)))
    assert.ok(fs.readFileSync(file, 'utf8').startsWith(`/*! ${first.versions._generated} */`));
  const script = fs.readFileSync(first.files.find((file) => file.endsWith('.js')), 'utf8');
  assert.match(script, /data:image\/png;base64,/);
  assert.doesNotMatch(script, /new URL\(["'](?:\.\/)?assistant-avatar\.png/);
  assert.ok(!script.includes(root), 'no machine-local source path is embedded');
  const inputs = Object.keys(first.metafile.inputs);
  assert.ok(inputs.some((file) => file.includes('huawei-partner-ai-ui') && file.endsWith('/dist-lib/index.js')));
  assert.ok(inputs.some((file) => file.endsWith('/vue/dist/vue.esm-bundler.js')));
  assert.ok(inputs.some((file) => file.endsWith('/images/image-error.jpg')));
  assert.ok(inputs.every((file) => !/\.(?:ttf|woff2?)$/.test(file)), 'fonts stay separate original assets');
});

test('mismatched lock versions fail before writing a runtime', async () => {
  const invalid = structuredClone(lock);
  invalid.packages[0].version = '0.0.0-wrong';
  const outDir = path.join(scratch, 'invalid');
  await assert.rejects(buildPrototypeRuntime({ root, lock: invalid, outDir }), /LOCK_VERSION_MISMATCH/);
  assert.equal(fs.existsSync(outDir), false);
});

test('installed same-version package JS, CSS and documentation must match the locked archive bytes', () => {
  const fixture = fs.mkdtempSync(path.join(scratch, 'installed-copy-'));
  const pin = lock.packages.find((item) => item.name === '@workbench/ui-vue3');
  fs.mkdirSync(path.join(fixture, 'vendor'));
  fs.copyFileSync(path.join(root, pin.tarball), path.join(fixture, pin.tarball));
  const installedRoot = path.join(fixture, 'node_modules', pin.name);
  fs.cpSync(fs.realpathSync(path.join(root, 'node_modules', pin.name)), installedRoot, { recursive: true });
  const check = () => verifyInstalledPackageBytes({ root: fixture, pin, installedRoot });
  assert.ok(check().fileCount > 10);
  for (const name of ['dist/index.js', 'dist/styles.css', 'README.md']) {
    const file = path.join(installedRoot, name), original = fs.readFileSync(file);
    fs.writeFileSync(file, Buffer.concat([original, Buffer.from('\nlocal edit')]));
    assert.equal(JSON.parse(fs.readFileSync(path.join(installedRoot, 'package.json'))).version, pin.version);
    assert.throws(check, /INSTALLED_BYTES_MISMATCH/);
    fs.writeFileSync(file, original);
  }
  const file = path.join(installedRoot, 'dist/index.js');
  fs.rmSync(file);
  assert.throws(check, /INSTALLED_FILE_MISSING_OR_LINK/);
  fs.symlinkSync(path.join(root, 'node_modules', pin.name, 'dist/index.js'), file);
  assert.throws(check, /INSTALLED_FILE_MISSING_OR_LINK/);
  fs.appendFileSync(path.join(fixture, pin.tarball), 'archive edit');
  assert.throws(check, /ARCHIVE_SHA256_MISMATCH/);
});

test('archive traversal and symbolic links are rejected without extracting any member', () => {
  const fixture = fs.mkdtempSync(path.join(scratch, 'unsafe-archive-'));
  fs.mkdirSync(path.join(fixture, 'vendor'));
  const installedRoot = path.join(fixture, 'node_modules/package');
  fs.mkdirSync(installedRoot, { recursive: true });
  const tarball = 'vendor/unsafe.tgz', archive = path.join(fixture, tarball);
  for (const kind of ['traversal', 'symlink']) {
    execFileSync('python3', ['-c',
      'import io,sys,tarfile\nwith tarfile.open(sys.argv[1],"w:gz",format=tarfile.USTAR_FORMAT) as t:\n i=tarfile.TarInfo("package/../escaped.js" if sys.argv[2]=="traversal" else "package/link.js")\n if sys.argv[2]=="symlink":\n  i.type=tarfile.SYMTYPE;i.linkname="/tmp/external";t.addfile(i)\n else:\n  i.size=4;t.addfile(i,io.BytesIO(b"data"))',
      archive, kind]);
    const sha256 = createHash('sha256').update(fs.readFileSync(archive)).digest('hex');
    assert.throws(() => verifyInstalledPackageBytes({ root: fixture, pin: { name: 'package', tarball, sha256 }, installedRoot }),
      kind === 'traversal' ? /ARCHIVE_PATH_INVALID/ : /ARCHIVE_ENTRY_UNSUPPORTED/);
    assert.equal(fs.existsSync(path.join(fixture, 'escaped.js')), false);
  }
});

test('offline IIFE compiles page templates, handles chat state and forwards restyle events', async () => {
  const out = path.dirname(first.files[0]);
  const pageFile = path.join(out, 'smoke.html');
  fs.writeFileSync(pageFile, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="partner-ui-runtime.css"></head><body><div id="app"></div><div id="legacy"><button id="original">Legacy action</button></div><script src="partner-ui-runtime.js"></script></body></html>`);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    const external = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.route(/^https?:/, (route) => { external.push(route.request().url()); return route.abort(); });
    await page.goto(pathToFileURL(pageFile).href);
    const result = await page.evaluate(async () => {
      const p = window.PartnerUI;
      const v = p.Vue;
      const mounted = p.mount('#app', {
        template: '<WorkbenchButton @click="count++">Count {{count}}</WorkbenchButton>',
        setup() { return { count: v.ref(0) }; },
      });
      const button = document.querySelector('#app button');
      button.click();
      await v.nextTick();
      const countText = button.textContent;
      const chat = p.createChatSession({ delay: 0, respond: (query) => 'Reply ' + query });
      await chat.send('hello');
      const completed = { size: chat.messages.length, reply: chat.messages[1].content[0].text, processing: chat.processing };
      chat.reset();
      let originalClicks = 0;
      document.querySelector('#original').addEventListener('click', () => originalClicks++);
      p.restyle({ root: '#legacy', rules: [{ selector: 'button', as: 'button', appearance: 'primary' }] });
      await v.nextTick();
      document.querySelector('#legacy .pui-render button, #legacy button.pui-render').click();
      return { vue: v.version, sameVue: window.Vue === v, buttonRegistered: p.workbenchComponents.includes('WorkbenchButton'), aiRegistered: p.aiComponents.includes('ChatPanel'), avatar: p.AI.ChatPanel.props.avatarSrc.default, countText, completed, resetSize: chat.messages.length, originalClicks, mounted: !!mounted.app, helpers: ['overlays', 'mockStream', 'mockAgreementAdapter', 'welcomeIcon'].every((key) => !!p[key]) };
    });
    assert.equal(result.vue, '3.5.13');
    assert.equal(result.sameVue, true);
    assert.equal(result.buttonRegistered, true);
    assert.equal(result.aiRegistered, true);
    assert.match(result.avatar, /^data:image\/png;base64,/);
    assert.match(result.countText, /Count 1/);
    assert.deepEqual(result.completed, { size: 2, reply: 'Reply hello', processing: false });
    assert.equal(result.resetSize, 0);
    assert.equal(result.originalClicks, 1);
    assert.equal(result.mounted, true);
    assert.equal(result.helpers, true);
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
  } finally { await browser.close(); }
});

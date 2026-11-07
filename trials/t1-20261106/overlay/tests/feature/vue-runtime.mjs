import { createRequire } from 'node:module';
import { readdirSync, realpathSync, readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const rootRequire = createRequire(import.meta.url);
const vuePath = realpathSync(rootRequire.resolve('vue'));
const vueRequire = createRequire(vuePath);
const domPath = realpathSync(vueRequire.resolve('@vue/runtime-dom'));
const domRequire = createRequire(domPath);
const corePath = realpathSync(domRequire.resolve('@vue/runtime-core'));
const vue = rootRequire('vue');
const dom = vueRequire('@vue/runtime-dom');
const core = domRequire('@vue/runtime-core');
assert.equal(vue.createApp, dom.createApp);
assert.equal(dom.getCurrentInstance, core.getCurrentInstance);
const dirs = readdirSync('node_modules/.pnpm');
const physical = Object.fromEntries(
  ['vue', '@vue+runtime-core', '@vue+runtime-dom'].map((name) => [
    name,
    dirs.filter((d) => d.startsWith(name + '@')),
  ]),
);
for (const copies of Object.values(physical)) assert.equal(copies.length, 1);
const modules = JSON.parse(readFileSync('dist/vue-modules.json', 'utf8'));
for (const key of ['vue', '@vue/runtime-core', '@vue/runtime-dom']) {
  assert.ok(
    Object.keys(modules).some((id) => id.includes('/node_modules/' + key + '/')),
    'missing rendered ' + key,
  );
}
const result = {
  physical,
  resolvedPaths: { vue: vuePath, runtimeDom: domPath, runtimeCore: corePath },
  runtimeIdentity: { createApp: true, getCurrentInstance: true },
  renderedModules: modules,
  caveat: 'Precompiled package internals cannot be separately attributed.',
};
writeFileSync('dist/vue-runtime.json', JSON.stringify(result, null, 2) + '\n');
console.log('PASS: physical Vue/core/DOM copies, runtime identity and rendered build modules');

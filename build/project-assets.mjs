import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';

// Maintenance only. Consumers receive pure JS compilers and never install npm dependencies.
export async function projectAssets(root, lock, packages) {
  const require = createRequire(resolve(root, 'package.json'));
  const ts = require('typescript');
  const esbuild = require('esbuild');
  const vue = require('vue');
  const vueRequire = createRequire(require.resolve('vue/package.json'));
  const tsRoot = dirname(require.resolve('typescript/package.json'));
  const tsOutput = await esbuild.transform(readFileSync(require.resolve('typescript'), 'utf8'), {
    loader: 'js', minify: true, target: 'node22', legalComments: 'none',
  });
  const vueOutput = await esbuild.build({
    entryPoints: [vueRequire.resolve('@vue/compiler-dom')], bundle: true,
    platform: 'node', format: 'cjs', target: 'node22', minify: true,
    legalComments: 'none', write: false, metafile: true, logLevel: 'silent',
  });
  const files = new Map([
    ['scripts/toolchain/typescript.cjs', tsOutput.code],
    ['scripts/toolchain/vue-compiler.cjs', vueOutput.outputFiles[0].contents],
    ['scripts/toolchain/TypeScript-LICENSE.txt', readFileSync(resolve(tsRoot, 'LICENSE.txt'))],
    ['scripts/toolchain/TypeScript-NOTICES.txt', readFileSync(resolve(tsRoot, 'ThirdPartyNoticeText.txt'))],
    ['scripts/toolchain/Vue-LICENSE.txt', readFileSync(resolve(dirname(require.resolve('vue/package.json')), 'LICENSE'))],
  ]);
  const notices = new Map();
  for (const input of Object.keys(vueOutput.metafile.inputs)) {
    let directory = dirname(resolve(root, input));
    let metadata;
    while (true) {
      if (existsSync(resolve(directory, 'package.json'))) metadata = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'));
      if (metadata?.name || dirname(directory) === directory) break;
      directory = dirname(directory);
    }
    if (!metadata?.name) continue;
    const license = ['LICENSE', 'LICENSE.txt', 'LICENSE.md', 'license', 'LICENSE-MIT'].map(name => resolve(directory, name)).find(existsSync);
    if (!license) throw new Error('PROJECT_TOOL_LICENSE_MISSING: ' + metadata.name);
    notices.set(metadata.name, `${metadata.name}@${metadata.version}\n${readFileSync(license, 'utf8')}`);
  }
  files.set('scripts/toolchain/VueCompiler-NOTICES.txt', [...notices].sort(([a], [b]) => a.localeCompare(b)).map(([, value]) => value).join('\n\n---\n\n') + '\n');
  const exports = { vue: Object.keys(vue).sort() };
  const assets = [];
  for (const pkg of packages) {
    const declaration = pkg.manifest.exports['.'].types;
    const text = execFileSync('tar', ['-xOf', resolve(root, pkg.tarball), 'package/' + declaration.replace(/^\.\//, '')], { encoding: 'utf8' });
    const ast = ts.createSourceFile('index.d.ts', text, ts.ScriptTarget.Latest, true);
    const names = new Set();
    for (const node of ast.statements) {
      if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const entry of node.exportClause.elements) if (!entry.isTypeOnly) names.add(entry.name.text);
      } else if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
        if (ts.isVariableStatement(node)) for (const entry of node.declarationList.declarations) if (ts.isIdentifier(entry.name)) names.add(entry.name.text);
        if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) && node.name) names.add(node.name.text);
      }
    }
    exports[pkg.name] = [...names].sort();
    for (const [id, asset] of Object.entries(pkg.metadata.components.assets)) {
      assets.push({
        id, package: pkg.name, name: asset.publicImport?.exportName,
        label: asset.label ?? asset.title ?? id,
        kind: asset.kind ?? asset.group ?? 'component', summary: asset.summary ?? null, props: asset.props ?? {},
        events: asset.events ?? [], slots: asset.slots ?? [],
        useWhen: asset.useWhen ?? [], avoidWhen: asset.avoidWhen ?? [],
        status: asset.status ?? null, unsupported: asset.unsupported ?? [],
        reference: `references/${pkg.name === '@workbench/ui-vue3' ? 'workbench' : 'ai-ui'}/${id}.md`,
      });
    }
  }
  const catalog = {
    schemaVersion: 1, runtimeVersion: lock.runtimeVersion,
    packages: lock.packages.map(({ name, version, sha256, sourceCommit }) => ({ name, version, sha256, sourceCommit })),
    exports, assets,
  };
  files.set('assets/project/catalog.json', JSON.stringify(catalog, null, 2) + '\n');
  files.set('scripts/toolchain/manifest.json', JSON.stringify({
    typescript: ts.version, vue: vue.version,
    files: Object.fromEntries([...files].filter(([name]) => name.startsWith('scripts/toolchain/')).map(([name, bytes]) => [name.split('/').at(-1), createHash('sha256').update(bytes).digest('hex')])),
    purpose: 'Bundled build-time JS tools; not included in demo output. Do not read as authoring context.',
  }, null, 2) + '\n');
  return new Map([...files].map(([name, bytes]) => ['skills/partner-ui-pages/' + name, bytes]));
}

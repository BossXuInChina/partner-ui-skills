import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const VUE_VERSION = '3.5.13';
const PACKAGES = ['@workbench/ui-vue3', 'huawei-partner-ai-ui'];
const readJSON = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const inside = (root, file) => {
  const relative = path.relative(root, file);
  return (
    relative === '' ||
    (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative))
  );
};
const fail = (message) => {
  throw new Error('PROTOTYPE_RUNTIME_' + message);
};

function packageManifest(entry, name) {
  let directory = path.dirname(fs.realpathSync(entry));
  while (true) {
    const file = path.join(directory, 'package.json');
    if (fs.existsSync(file)) {
      const manifest = readJSON(file);
      if (manifest.name === name) return { root: directory, manifest };
    }
    const parent = path.dirname(directory);
    if (parent === directory) fail('MANIFEST_MISSING:' + name);
    directory = parent;
  }
}

function installedPackage(require, root, name) {
  let entry;
  try {
    entry = require.resolve(name);
  } catch (error) {
    if (!PACKAGES.includes(name) || error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') throw error;
    entry = require.resolve(name + '/styles.css');
  }
  const info = packageManifest(entry, name);
  if (!inside(root, info.root) || !inside(path.join(root, 'node_modules'), info.root))
    fail('DEPENDENCY_OUTSIDE_INSTALL:' + name);
  return { ...info, entry };
}

const ARCHIVE_HASHES = `import hashlib,io,json,sys,tarfile
try:
 result={};seen=set()
 with tarfile.open(fileobj=io.BytesIO(sys.stdin.buffer.read()),mode="r:gz") as archive:
  for member in archive:
   if not member.isfile() and not member.isdir(): raise ValueError("ARCHIVE_ENTRY_UNSUPPORTED")
   name=member.name
   relative=name[len("package/"):].removesuffix("/") if member.isdir() else name[len("package/"):]
   if not name.startswith("package/") or chr(92) in name or (not relative and not member.isdir()) or (relative and any(part in ("", ".", "..") for part in relative.split("/"))): raise ValueError("ARCHIVE_PATH_INVALID")
   if relative in seen: raise ValueError("ARCHIVE_DUPLICATE_MEMBER")
   seen.add(relative)
   if member.isfile():
    digest=hashlib.sha256()
    with archive.extractfile(member) as stream:
     for chunk in iter(lambda: stream.read(1024*1024),b""): digest.update(chunk)
    result[relative]=digest.hexdigest()
 if not result: raise ValueError("ARCHIVE_EMPTY")
 print(json.dumps(result))
except (tarfile.TarError,OSError,ValueError) as error:
 print(str(error),file=sys.stderr);sys.exit(1)
`;
function archiveHashes(gzip) {
  try {
    return new Map(
      Object.entries(
        JSON.parse(
          execFileSync('python3', ['-c', ARCHIVE_HASHES], {
            input: gzip,
            encoding: 'utf8',
            maxBuffer: 8 * 1024 * 1024,
            stdio: ['pipe', 'pipe', 'pipe'],
          }),
        ),
      ),
    );
  } catch (error) {
    const reason = String(error.stderr ?? '').match(
      /ARCHIVE_(?:ENTRY_UNSUPPORTED|PATH_INVALID|DUPLICATE_MEMBER|EMPTY)/,
    )?.[0];
    fail(reason ?? 'ARCHIVE_INVALID');
  }
}

/** Check every installed archive file, including JS, CSS, declarations and documentation. */
export function verifyInstalledPackageBytes({ root, pin, installedRoot }) {
  root = fs.realpathSync(root);
  installedRoot = fs.realpathSync(installedRoot);
  if (
    !/^vendor\/[a-z0-9][a-z0-9._-]*\.tgz$/.test(pin?.tarball ?? '') ||
    !/^[a-f\d]{64}$/.test(pin.sha256 ?? '')
  )
    fail('LOCK_ARCHIVE_INVALID');
  const vendor = fs.realpathSync(path.join(root, 'vendor'));
  const archive = fs.realpathSync(path.join(root, pin.tarball));
  if (
    !inside(root, vendor) ||
    !inside(vendor, archive) ||
    !inside(path.join(root, 'node_modules'), installedRoot)
  )
    fail('ARCHIVE_OR_INSTALL_OUTSIDE_ROOT');
  const gzip = fs.readFileSync(archive);
  if (createHash('sha256').update(gzip).digest('hex') !== pin.sha256)
    fail('ARCHIVE_SHA256_MISMATCH:' + pin.name);
  const files = archiveHashes(gzip);
  for (const [name, expectedHash] of files) {
    let target = installedRoot;
    for (const part of name.split('/')) {
      target = path.join(target, part);
      if (!fs.existsSync(target) || fs.lstatSync(target).isSymbolicLink())
        fail('INSTALLED_FILE_MISSING_OR_LINK:' + pin.name + '/' + name);
    }
    if (
      !fs.statSync(target).isFile() ||
      createHash('sha256').update(fs.readFileSync(target)).digest('hex') !== expectedHash
    )
      fail('INSTALLED_BYTES_MISMATCH:' + pin.name + '/' + name);
  }
  return { fileCount: files.size };
}

function installedAssets(root, aiRoot) {
  const avatar = (file) => {
    const real = fs.realpathSync(file);
    if (
      !inside(aiRoot, real) ||
      path.basename(real) !== 'assistant-avatar.png' ||
      !fs.statSync(real).isFile()
    )
      fail('AVATAR_NOT_PUBLISHED');
    return 'data:image/png;base64,' + fs.readFileSync(real).toString('base64');
  };
  return {
    name: 'installed-package-assets',
    setup(build) {
      build.onLoad({ filter: /\.js$/ }, (args) => {
        if (!inside(aiRoot, args.path)) return;
        const source = fs.readFileSync(args.path, 'utf8');
        const contents = source.replace(
          /new URL\(\s*(["'])(\.\/)?assistant-avatar\.png\1\s*,\s*import\.meta\.url\s*\)\.href/g,
          (_match, _quote, prefix) =>
            JSON.stringify(
              avatar(
                path.resolve(path.dirname(args.path), (prefix ?? '') + 'assistant-avatar.png'),
              ),
            ),
        );
        return { contents, loader: 'js' };
      });
      build.onLoad({ filter: /\.(?:png|jpe?g|svg|gif|webp|woff2?|ttf)$/ }, (args) => {
        const real = fs.realpathSync(args.path);
        if (!inside(path.join(root, 'node_modules'), real) || /\.(?:woff2?|ttf)$/.test(real))
          fail('UNSUPPORTED_ASSET:' + path.basename(args.path));
        return { contents: fs.readFileSync(real), loader: 'dataurl' };
      });
    },
  };
}

function singleTinyRobot(info) {
  return {
    name: 'single-tiny-robot-context',
    setup(build) {
      build.onResolve({ filter: /^@opentiny\/tiny-robot(?:\/|$)/ }, ({ path: specifier }) => {
        const suffix = specifier.slice('@opentiny/tiny-robot'.length);
        const file = suffix ? path.resolve(info.root, '.' + suffix) : info.entry;
        if (!inside(info.root, file) || !fs.existsSync(file)) fail('TINY_ROBOT_ENTRY_INVALID');
        return { path: file };
      });
    },
  };
}

function validateInputs(root, metafile) {
  const vueRoots = new Map();
  for (const input of Object.keys(metafile.inputs)) {
    if (input === '<define:__PUI_VERSIONS__>') continue;
    const file = fs.realpathSync(path.resolve(root, input));
    if (!inside(root, file)) fail('INPUT_OUTSIDE_ROOT');
    const match = input
      .replaceAll('\\', '/')
      .match(/(?:^|\/)node_modules\/(vue|@vue\/[^/]+|@opentiny\/tiny-robot)\//);
    if (!match) continue;
    const name = match[1];
    const info = packageManifest(file, name);
    const expected = name === '@opentiny/tiny-robot' ? '0.5.1' : VUE_VERSION;
    if (info.manifest.version !== expected) fail('RUNTIME_VERSION_MISMATCH:' + name);
    if (vueRoots.has(name) && vueRoots.get(name) !== info.root)
      fail('DUPLICATE_RUNTIME_MODULE:' + name);
    vueRoots.set(name, info.root);
  }
}

/** Build the offline prototype runtime from this checkout's installed public packages only. */
export async function buildPrototypeRuntime({ root, lock, outDir } = {}) {
  if (
    !root ||
    !outDir ||
    !lock?.runtimeVersion ||
    !/^\d{4}-\d{2}-\d{2}$/.test(lock.buildDate ?? '')
  )
    fail('INPUT_INVALID');
  root = fs.realpathSync(root);
  const require = createRequire(path.join(root, 'package.json'));
  const packages = new Map();
  for (const name of [
    ...PACKAGES,
    'vue',
    '@opentiny/tiny-robot',
    '@opentiny/tiny-robot-kit',
    'esbuild',
  ])
    packages.set(name, installedPackage(require, root, name));
  for (const name of PACKAGES) {
    const pinned = lock.packages?.find((item) => item.name === name);
    if (!pinned || pinned.version !== packages.get(name).manifest.version)
      fail('LOCK_VERSION_MISMATCH:' + name);
    if (!/^[a-f\d]{40}$/i.test(pinned.sourceCommit ?? ''))
      fail('LOCK_SOURCE_COMMIT_INVALID:' + name);
    verifyInstalledPackageBytes({ root, pin: pinned, installedRoot: packages.get(name).root });
  }
  if (packages.get('vue').manifest.version !== VUE_VERSION) fail('VUE_VERSION_MISMATCH:vue');
  const generated =
    'generated from ' +
    PACKAGES.map((name) => {
      const pinned = lock.packages.find((item) => item.name === name);
      return `${name}@${pinned.version}(${pinned.sourceCommit})`;
    }).join(' + ') +
    ' — do not edit';
  const versions = {
    _generated: generated,
    runtime: lock.runtimeVersion,
    builtAt: lock.buildDate,
    ...Object.fromEntries(
      [...PACKAGES, 'vue', '@opentiny/tiny-robot', '@opentiny/tiny-robot-kit'].map((name) => [
        name,
        packages.get(name).manifest.version,
      ]),
    ),
  };
  const workspaceSource = path.join(root, 'skills/partner-ui-pages/maintainer/runtime-src');
  const source = fs.existsSync(workspaceSource)
    ? workspaceSource
    : path.join(root, 'maintainer/runtime-src');
  const entry = path.join(source, 'partner-ui-runtime.ts');
  if (!fs.existsSync(entry)) fail('SOURCE_MISSING');
  const esbuild = await import(pathToFileURL(packages.get('esbuild').entry).href);
  const result = await esbuild.build({
    absWorkingDir: root,
    entryPoints: { 'partner-ui-runtime': entry },
    bundle: true,
    format: 'iife',
    outdir: path.resolve(outDir),
    platform: 'browser',
    target: 'es2020',
    minify: true,
    metafile: true,
    legalComments: 'none',
    write: false,
    alias: { vue: require.resolve('vue/dist/vue.esm-bundler.js') },
    plugins: [
      singleTinyRobot(packages.get('@opentiny/tiny-robot')),
      installedAssets(root, packages.get('huawei-partner-ai-ui').root),
    ],
    banner: {
      js: `/*! ${generated} */\n/*! Partner UI prototype runtime ${versions.runtime} (${versions.builtAt}) — Vue ${versions.vue}, @opentiny/tiny-robot ${versions['@opentiny/tiny-robot']}. */\nvar process=globalThis.process||{env:{NODE_ENV:"production"}};`,
      css: `/*! ${generated} */`,
    },
    define: {
      __PUI_VERSIONS__: JSON.stringify(versions),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      'process.env.NODE_ENV': '"production"',
      'import.meta.env.DEV': 'false',
      'import.meta.env.PROD': 'true',
      'import.meta.env.SSR': 'false',
      'import.meta.env.MODE': '"production"',
    },
    logLevel: 'warning',
  });
  validateInputs(root, result.metafile);
  const outputs = new Map(result.outputFiles.map((file) => [file.path, file.contents]));
  outputs.set(
    path.resolve(outDir, 'versions.json'),
    Buffer.from(JSON.stringify(versions, null, 2) + '\n'),
  );
  for (const [file, contents] of outputs) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, contents);
  }
  return { files: [...outputs.keys()].sort(), versions, metafile: result.metafile };
}

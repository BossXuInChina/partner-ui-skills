import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve, relative, dirname } from "node:path";
import { build } from "esbuild";
import { parse, compileScript } from "vue/compiler-sfc";
import { loadPinnedPackages } from "./verify-lock.mjs";
import { createRequire } from "node:module";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const filesIn = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? filesIn(resolve(dir, e.name)) : [resolve(dir, e.name)],
  );
function studioURL(route, name, bases) {
  if (!route) return null;
  if (
    typeof route !== "string" ||
    !route.startsWith("/") ||
    route.startsWith("//") ||
    /[\\\s]/.test(route)
  )
    throw Error("GALLERY_STUDIO_ROUTE_INVALID");
  const base = new URL(bases[name]);
  if (
    !["http:", "https:"].includes(base.protocol) ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  )
    throw Error("GALLERY_STUDIO_BASE_INVALID");
  const url = new URL(route, base);
  if (
    url.origin !== base.origin ||
    (name === "@workbench/ui-vue3"
      ? !url.pathname.startsWith("/preview/")
      : url.pathname !== "/overview.html")
  )
    throw Error("GALLERY_STUDIO_ROUTE_INVALID");
  return url.href;
}
export async function buildGallery({ root, lock, packages, outDir }) {
  const actual = loadPinnedPackages(root);
  if (
    JSON.stringify(lock) !== JSON.stringify(actual.lock) ||
    JSON.stringify(packages) !== JSON.stringify(actual.packages)
  )
    throw Error("GALLERY_LOCK_IDENTITY_MISMATCH");
  const catalog = [],
    examples = new Map();
  for (const pkg of packages) {
    for (const [id, asset] of Object.entries(pkg.metadata.components.assets)) {
      const usage = pkg.metadata.usage?.assets?.[id];
      const candidate = usage?.usageExamples?.find(
        (e) => e.portability === "portable" && typeof e.code === "string",
      );
      let preview = false;
      if (
        candidate &&
        candidate.source?.codeSha256 === "sha256:" + hash(candidate.code) &&
        (candidate.imports ?? []).every((i) =>
          ["vue", "@workbench/ui-vue3", "huawei-partner-ai-ui"].includes(i),
        )
      ) {
        try {
          const { descriptor, errors } = parse(candidate.code, {
            filename: id + ".vue",
          });
          if (
            errors.length ||
            descriptor.styles.length ||
            descriptor.script ||
            !descriptor.scriptSetup ||
            !descriptor.template
          )
            throw Error("unsupported SFC");
          const compiled = compileScript(descriptor, {
            id: hash(id).slice(0, 8),
            inlineTemplate: true,
          });
          examples.set(id, compiled.content);
          preview = true;
        } catch {
          /* Explicit Studio fallback for unsupported official examples. */
        }
      }
      const route =
        asset.studioPath ?? usage?.studioPath ?? usage?.studio?.paths?.preview;
      catalog.push({
        id,
        source: pkg.name,
        version: pkg.version,
        commit: pkg.sourceCommit,
        buildDate: lock.buildDate,
        qualification: {
          channel: pkg.metadata.release?.channel ?? null,
          developmentEligible:
            pkg.metadata.release?.developmentEligible ?? null,
          stableEligible: pkg.metadata.release?.stableEligible ?? null,
          targetProductionEligible:
            pkg.metadata.release?.targetProductionEligible ?? null,
          status: asset.status ?? null,
        },
        studio: studioURL(route, pkg.name, lock.studioBaseURLs),
        label: asset.label ?? id,
        kind: asset.kind ?? asset.group ?? "unknown",
        summary: asset.summary ?? null,
        publicImport: asset.publicImport,
        props: asset.props ?? {},
        events: asset.events ?? [],
        eventDetails: asset.eventDetails ?? {},
        slots: asset.slots ?? [],
        slotDetails: asset.slotDetails ?? {},
        slotPatterns: asset.slotPatterns ?? [],
        family: asset.family ?? [],
        useWhen: asset.useWhen ?? [],
        avoidWhen: asset.avoidWhen ?? [],
        rules: asset.rules ?? [],
        cases: asset.cases ?? usage?.variants?.cases ?? [],
        caseCoverage: asset.caseCoverage ?? usage?.variants ?? null,
        usage: usage?.usage ?? null,
        unsupported: asset.unsupported ?? [],
        preview,
        previewTitle: candidate?.title ?? null,
        previewBoundary: candidate?.dataBoundary ?? null,
      });
    }
  }
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const entry = resolve(root, "gallery/app.js");
  const virtual = {
    name: "gallery-data",
    setup(b) {
      b.onResolve({ filter: /^gallery:catalog$/ }, () => ({
        path: "catalog",
        namespace: "gallery",
      }));
      b.onResolve({ filter: /^gallery:examples$/ }, () => ({
        path: "examples",
        namespace: "gallery",
      }));
      b.onResolve({ filter: /^gallery-example:/ }, (args) => ({
        path: args.path.slice(16),
        namespace: "gallery-example",
      }));
      b.onLoad({ filter: /.*/, namespace: "gallery" }, (args) => ({
        contents:
          args.path === "catalog"
            ? `export default ${JSON.stringify(catalog)}`
            : `export default {${[...examples.keys()].map((id) => `${JSON.stringify(id)}:()=>import(${JSON.stringify("gallery-example:" + id)})`).join(",")}}`,
        loader: "js",
        resolveDir: root,
      }));
      b.onLoad({ filter: /.*/, namespace: "gallery-example" }, (args) => ({
        contents: examples.get(args.path),
        loader: "js",
        resolveDir: root,
      }));
    },
  };
  const result = await build({
    entryPoints: [entry],
    outdir: resolve(outDir, "assets"),
    bundle: true,
    splitting: true,
    format: "esm",
    platform: "browser",
    charset: "utf8",
    minify: true,
    metafile: true,
    plugins: [virtual],
    assetNames: "[name]-[hash]",
    entryNames: "[name]-[hash]",
    chunkNames: "chunk-[hash]",
    loader: {
      ".png": "file",
      ".woff2": "file",
      ".woff": "file",
      ".svg": "file",
    },
  });
  const outputs = Object.entries(result.metafile.outputs);
  const main = outputs.find(
    ([, v]) =>
      v.entryPoint === relative(process.cwd(), entry) ||
      resolve(v.entryPoint ?? "") === entry,
  );
  if (!main) throw Error("GALLERY_ENTRY_MISSING");
  const mainPath = "assets/" + main[0].split("/").at(-1);
  const css = main[1].cssBundle
    ? "assets/" + main[1].cssBundle.split("/").at(-1)
    : null;
  writeFileSync(
    resolve(outDir, "index.html"),
    `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Partner UI 图库</title>${css ? `<link rel="stylesheet" href="./${css}">` : ""}</head><body><div id="app"></div><script type="module" src="./${mainPath}"></script></body></html>\n`,
  );
  const files = filesIn(outDir).sort();
  const totalBytes = files.reduce((n, f) => n + statSync(f).size, 0);
  const initialSet = new Set([
    resolve(outDir, "index.html"),
    resolve(outDir, mainPath),
    ...(css ? [resolve(outDir, css)] : []),
  ]);
  // Include statically imported chunks recursively; dynamic imports remain deferred.
  const visit = (key) => {
    const meta = result.metafile.outputs[key];
    if (!meta) return;
    for (const imp of meta.imports ?? [])
      if (imp.kind !== "dynamic-import" && !imp.external) {
        const path = resolve(imp.path);
        if (!initialSet.has(path)) {
          initialSet.add(path);
          visit(imp.path);
        }
      }
  };
  visit(main[0]);
  if (main[1].cssBundle) visit(main[1].cssBundle);
  const initialBytes = [...initialSet].reduce(
    (n, f) => n + (files.includes(f) ? statSync(f).size : 0),
    0,
  );
  const inputs = Object.keys(result.metafile.inputs).map((name) =>
    name.replaceAll("\\", "/"),
  );
  const copies = (name) =>
    new Set(
      inputs
        .filter((path) => path.includes("node_modules/" + name + "/"))
        .map((path) =>
          path.slice(
            0,
            path.indexOf("node_modules/" + name + "/") +
              ("node_modules/" + name + "/").length,
          ),
        ),
    ).size;
  const vue = JSON.parse(
    readFileSync(
      createRequire(resolve(root, "package.json")).resolve("vue/package.json"),
      "utf8",
    ),
  );
  const runtime = {
    version: vue.version,
    vueCopies: copies("vue"),
    coreCopies: copies("@vue/runtime-core"),
    domCopies: copies("@vue/runtime-dom"),
  };
  if (
    Object.values(runtime)
      .slice(1)
      .some((count) => count !== 1)
  )
    throw Error("GALLERY_SINGLE_VUE_REQUIRED");
  return {
    files,
    metrics: {
      entries: catalog.length,
      previews: examples.size,
      initialBytes,
      dynamicBytes: totalBytes - initialBytes,
      totalBytes,
      fileCount: files.length,
      runtime,
      initialScope:
        "Application static closure only; the default official preview auto-loads a dynamic chunk. Cold-load network bytes are measured separately.",
    },
  };
}

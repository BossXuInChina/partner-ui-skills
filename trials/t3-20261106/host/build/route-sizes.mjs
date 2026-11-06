/** Analyze the emitted Rollup graph. No source files or package internals are read. */
import { Buffer } from "node:buffer";
import { posix, relative, resolve } from "node:path";

export const TEMPLATE_NAMES = [
  "blank",
  "workbench-list",
  "workbench-detail",
  "workbench-dashboard",
  "ai-chat",
  "ai-assistant-workspace",
];
const businessTemplates = new Set([
  "blank",
  "workbench-list",
  "workbench-detail",
  "workbench-dashboard",
]);
const cleanId = (id) =>
  String(id ?? "")
    .replaceAll("\\", "/")
    .split("?")[0];
const bytes = (source) =>
  typeof source === "string"
    ? Buffer.byteLength(source, "utf8")
    : (source?.byteLength ?? 0);
const tinyRobotModule =
  /(?:^|\/)(?:@opentiny\/tiny-robot(?:-kit)?(?:\/|$)|@opentiny\+tiny-robot(?:-kit)?@)/;
const assetKind = (file) =>
  /\.(?:ttf|otf|woff2?)$/i.test(file)
    ? "fonts"
    : /\.css$/i.test(file)
      ? "styles"
      : /\.(?:png|jpe?g|webp|avif|gif|svg|ico)$/i.test(file)
        ? "images"
        : /\.map$/i.test(file)
          ? "sourceMaps"
          : "other";

function routeDefinitions(root, { names, routes }) {
  if (names !== undefined && routes !== undefined)
    throw new Error("ROUTE_CHUNK_CONFIG: choose names or explicit routes");
  if (
    (names !== undefined && !Array.isArray(names)) ||
    (routes !== undefined && !Array.isArray(routes))
  )
    throw new Error("ROUTE_CHUNK_CONFIG: names and routes must be arrays");
  const selected =
    routes ??
    (names ?? TEMPLATE_NAMES).map((name) => {
      if (typeof name !== "string" || !/^[a-z][a-z0-9-]*$/.test(name))
        throw new Error("ROUTE_CHUNK_CONFIG: invalid template name");
      return {
        route: "/templates/" + name,
        file: `src/templates/${name}/Page.vue`,
        business: businessTemplates.has(name),
      };
    });
  if (!Array.isArray(selected) || selected.length === 0)
    throw new Error("ROUTE_CHUNK_CONFIG: select at least one route");
  const seen = new Set();
  return selected.map((entry) => {
    if (
      !entry ||
      typeof entry.route !== "string" ||
      !/^\/(?!\/)[^\s#\\]*$/.test(entry.route) ||
      typeof entry.file !== "string" ||
      !entry.file.endsWith(".vue") ||
      (entry.business !== undefined && typeof entry.business !== "boolean")
    )
      throw new Error("ROUTE_CHUNK_CONFIG: expected {route, file, business?}");
    const file = cleanId(resolve(root, entry.file));
    const local = relative(resolve(root), file);
    if (
      local === ".." ||
      local.startsWith("../") ||
      local.startsWith("..\\") ||
      /^(?:[a-z]:[\\/]|\/)/i.test(local) ||
      seen.has(entry.route)
    )
      throw new Error(
        "ROUTE_CHUNK_CONFIG: duplicate route or file outside project",
      );
    seen.add(entry.route);
    return { ...entry, file, business: entry.business ?? true };
  });
}

export function analyzeRouteChunks(
  bundle,
  { root = process.cwd(), names, routes: selectedRoutes } = {},
) {
  const definitions = routeDefinitions(root, { names, routes: selectedRoutes });
  const chunks = new Map(
    Object.values(bundle)
      .filter((output) => output.type === "chunk")
      .map((output) => [output.fileName, output]),
  );
  const assets = Object.values(bundle)
    .filter((output) => output.type === "asset")
    .map((output) => ({
      fileName: output.fileName,
      rawBytes: bytes(output.source),
      kind: assetKind(output.fileName),
    }));
  const project = cleanId(resolve(root));
  const displayId = (id) => {
    const clean = cleanId(id);
    return clean.startsWith(project + "/")
      ? clean.slice(project.length + 1)
      : clean.startsWith("/")
        ? cleanId(relative(project, clean))
        : clean;
  };
  function resolvedReference(importer, reference) {
    if (chunks.has(reference)) return reference;
    const candidate = posix.normalize(
      posix.join(posix.dirname(importer), reference),
    );
    return chunks.has(candidate) ? candidate : undefined;
  }
  function references(file, dynamic = false) {
    const chunk = chunks.get(file);
    return [...chunk.imports, ...(dynamic ? chunk.dynamicImports : [])]
      .map((reference) => resolvedReference(file, reference))
      .filter(Boolean);
  }
  function closure(roots, dynamic = false) {
    const result = new Set();
    const pending = [...roots];
    while (pending.length) {
      const file = pending.pop();
      if (!chunks.has(file) || result.has(file)) continue;
      result.add(file);
      pending.push(...references(file, dynamic));
    }
    return result;
  }
  function summarize(files) {
    const sorted = [...files].sort();
    const linkedAssets = new Set();
    const externalImports = new Set();
    const tinyRobot = [];
    for (const file of sorted) {
      const chunk = chunks.get(file);
      for (const asset of [
        ...(chunk.viteMetadata?.importedCss ?? []),
        ...(chunk.viteMetadata?.importedAssets ?? []),
      ])
        linkedAssets.add(asset);
      for (const imported of chunk.imports)
        if (!resolvedReference(file, imported)) externalImports.add(imported);
      for (const [id, info] of Object.entries(chunk.modules ?? {}))
        if (info.renderedLength !== 0 && tinyRobotModule.test(cleanId(id)))
          tinyRobot.push({
            chunk: file,
            module: displayId(id),
            renderedLength: info.renderedLength ?? null,
          });
    }
    return {
      chunkFiles: sorted,
      rawJSBytes: sorted.reduce(
        (sum, file) => sum + bytes(chunks.get(file).code),
        0,
      ),
      linkedAssetFiles: [...linkedAssets].sort(),
      linkedAssetBytes: assets
        .filter((asset) => linkedAssets.has(asset.fileName))
        .reduce((sum, asset) => sum + asset.rawBytes, 0),
      externalImports: [...externalImports].sort(),
      tinyRobot: { present: tinyRobot.length > 0, modules: tinyRobot },
    };
  }
  const entryFiles = [...chunks.values()]
    .filter((chunk) => chunk.isEntry)
    .map((chunk) => chunk.fileName)
    .sort();
  const applicationInitial = closure(entryFiles);
  const missingRoutes = [];
  const routes = definitions.map((definition) => {
    const isPage = (id) =>
      cleanId(id) === definition.file && !String(id).includes("type=style");
    const renderedPage = (chunk) =>
      Object.entries(chunk.modules ?? {}).find(
        ([id, info]) => isPage(id) && info.renderedLength !== 0,
      )?.[0];
    const candidates = [...chunks.values()].filter((chunk) =>
      isPage(chunk.facadeModuleId),
    );
    const fallback = candidates.length
      ? candidates
      : [...chunks.values()].filter((chunk) => !!renderedPage(chunk));
    const entry = fallback.find((chunk) => chunk.isDynamicEntry) ?? fallback[0];
    if (!entry) {
      missingRoutes.push(definition.route);
      return { route: definition.route, status: "unattributed", facade: null };
    }
    const staticFiles = closure([entry.fileName]);
    const initialFiles = closure([...entryFiles, entry.fileName]);
    const directDynamic = new Set(
      [...staticFiles].flatMap((file) =>
        chunks
          .get(file)
          .dynamicImports.map((reference) => resolvedReference(file, reference))
          .filter((fileName) => fileName && !staticFiles.has(fileName)),
      ),
    );
    const dynamicFiles = closure(directDynamic, true);
    for (const file of staticFiles) dynamicFiles.delete(file);
    return {
      route: definition.route,
      status: "attributed",
      facade: displayId(entry.facadeModuleId),
      sourceModule: displayId(renderedPage(entry) || entry.facadeModuleId),
      entryChunk: { fileName: entry.fileName, rawBytes: bytes(entry.code) },
      staticDependencies: summarize(staticFiles),
      dynamicDependencies: {
        directChunkFiles: [...directDynamic].sort(),
        externalDynamicImports: [
          ...new Set(
            [...staticFiles, ...dynamicFiles].flatMap((file) =>
              chunks
                .get(file)
                .dynamicImports.filter(
                  (reference) => !resolvedReference(file, reference),
                ),
            ),
          ),
        ].sort(),
        ...summarize(dynamicFiles),
      },
      initialDependencies: {
        basis:
          "application entry static closure plus this selected route; other route dynamic imports are excluded",
        ...summarize(initialFiles),
      },
      businessRoute: definition.business,
    };
  });
  const routeCounts = new Map();
  for (const route of routes)
    for (const file of route.staticDependencies?.chunkFiles ?? [])
      routeCounts.set(file, (routeCounts.get(file) ?? 0) + 1);
  for (const route of routes)
    if (route.staticDependencies)
      route.staticDependencies.sharedChunkFiles =
        route.staticDependencies.chunkFiles.filter(
          (file) => routeCounts.get(file) > 1,
        );
  const resourceTotals = Object.fromEntries(
    ["fonts", "styles", "images", "sourceMaps", "other"].map((kind) => {
      const matching = assets.filter((asset) => asset.kind === kind);
      return [
        kind,
        {
          count: matching.length,
          rawBytes: matching.reduce((sum, asset) => sum + asset.rawBytes, 0),
          files: matching.map((asset) => asset.fileName).sort(),
        },
      ];
    }),
  );
  return {
    schemaVersion: "1.0",
    scope:
      "One Vite client build: emitted uncompressed UTF-8 JS and asset bytes; excludes this report itself. No gzip, network transfer, runtime timing, or production approval is inferred.",
    attribution:
      "Route facade/module IDs and Rollup static/dynamic import edges. TinyRobot detection uses rendered @opentiny/tiny-robot[-kit] module IDs; code prebundled inside an unrelated module cannot be separately attributed.",
    byteAccounting:
      "Closures count each emitted JS chunk once. Shared chunks appear in each dependent route and must not be summed across routes. Dynamic totals are separate from route static totals.",
    totals: {
      javascript: {
        count: chunks.size,
        rawBytes: [...chunks.values()].reduce(
          (sum, chunk) => sum + bytes(chunk.code),
          0,
        ),
      },
      assets: {
        count: assets.length,
        rawBytes: assets.reduce((sum, asset) => sum + asset.rawBytes, 0),
      },
      resources: resourceTotals,
    },
    applicationEntry: {
      entryChunkFiles: entryFiles,
      entryChunks: entryFiles.map((fileName) => ({
        fileName,
        rawBytes: bytes(chunks.get(fileName).code),
      })),
      rawEntryJSBytes: entryFiles.reduce(
        (sum, file) => sum + bytes(chunks.get(file).code),
        0,
      ),
      ...summarize(applicationInitial),
    },
    routes,
    missingRoutes,
    p8: {
      businessRoutesWithTinyRobotInStaticClosure: routes
        .filter(
          (route) =>
            route.businessRoute && route.staticDependencies?.tinyRobot.present,
        )
        .map((route) => route.route),
      businessRoutesWithTinyRobotInInitialClosure: routes
        .filter(
          (route) =>
            route.businessRoute && route.initialDependencies?.tinyRobot.present,
        )
        .map((route) => route.route),
      unverifiedRoutes: missingRoutes,
      policy:
        "Observed dependency placement only; no guessed byte threshold. Package-level monolith findings require a Track A change.",
    },
    assets: assets.sort((a, b) => a.fileName.localeCompare(b.fileName)),
  };
}

export function routeChunkReport({
  root = process.cwd(),
  reportFile = "route-chunks.json",
  names,
  routes,
} = {}) {
  routeDefinitions(root, { names, routes });
  return {
    name: "partner-template-route-chunks",
    apply: "build",
    enforce: "post",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const report = analyzeRouteChunks(bundle, { root, names, routes });
        if (report.missingRoutes.length)
          this.error(
            "ROUTE_CHUNK_FACADE_MISSING:" + report.missingRoutes.join(","),
          );
        this.emitFile({
          type: "asset",
          fileName: reportFile,
          source: JSON.stringify(report, null, 2) + "\n",
        });
      },
    },
  };
}

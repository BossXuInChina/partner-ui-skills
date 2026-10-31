import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeRouteChunks,
  routeChunkReport,
  TEMPLATE_NAMES,
} from "../skills/partner-ui-vue3/assets/harness/build/route-sizes.mjs";

const chunk = (fileName, code, extra = {}) => ({
  type: "chunk",
  fileName,
  code,
  imports: [],
  dynamicImports: [],
  modules: {},
  isEntry: false,
  isDynamicEntry: false,
  facadeModuleId: null,
  ...extra,
});
function outputFixture() {
  const bundle = {
    "assets/index.js": chunk("assets/index.js", "entry", {
      isEntry: true,
      imports: ["assets/common.js"],
      dynamicImports: TEMPLATE_NAMES.map((name) => "assets/" + name + ".js"),
    }),
    "assets/common.js": chunk("assets/common.js", "共享", {
      viteMetadata: { importedCss: new Set(["assets/shared.css"]) },
    }),
    "assets/robot.js": chunk("assets/robot.js", "robot code", {
      modules: {
        "/project/node_modules/@opentiny/tiny-robot/dist/index.js": {
          renderedLength: 10,
        },
        "/project/node_modules/@opentiny/tiny-robot-kit/dist/index.js": {
          renderedLength: 0,
        },
      },
    }),
    "assets/chart.js": chunk("assets/chart.js", "chart code", {
      imports: ["assets/common.js"],
    }),
    "assets/shared.css": {
      type: "asset",
      fileName: "assets/shared.css",
      source: "样式",
    },
    "assets/host.ttf": {
      type: "asset",
      fileName: "assets/host.ttf",
      source: Uint8Array.from([1, 2, 3, 4, 5]),
    },
    "assets/image.webp": {
      type: "asset",
      fileName: "assets/image.webp",
      source: Uint8Array.from([1, 2, 3]),
    },
  };
  for (const name of TEMPLATE_NAMES)
    bundle["assets/" + name + ".js"] = chunk(
      "assets/" + name + ".js",
      "page:" + name,
      {
        isDynamicEntry: true,
        facadeModuleId: "/project/src/templates/" + name + "/Page.vue",
        modules: {
          ["/project/src/templates/" + name + "/Page.vue"]: {
            renderedLength: 10,
          },
        },
        imports: ["./common.js"],
      },
    );
  bundle["assets/workbench-list.js"].dynamicImports = [
    "assets/robot.js",
    "external-lazy",
  ];
  bundle["assets/workbench-dashboard.js"].imports.push("assets/robot.js");
  bundle["assets/ai-chat.js"].imports.push("assets/robot.js");
  bundle["assets/ai-chat.js"].dynamicImports.push("assets/chart.js");
  return bundle;
}

test("route byte accounting follows static edges and reports dynamic output separately", () => {
  const bundle = outputFixture();
  const report = analyzeRouteChunks(bundle, { root: "/project" });
  assert.equal(report.routes.length, 6);
  assert.deepEqual(report.missingRoutes, []);
  const list = report.routes.find(
    (route) => route.route === "/templates/workbench-list",
  );
  assert.equal(list.facade, "src/templates/workbench-list/Page.vue");
  assert.deepEqual(list.staticDependencies.chunkFiles, [
    "assets/common.js",
    "assets/workbench-list.js",
  ]);
  assert.equal(
    list.staticDependencies.rawJSBytes,
    Buffer.byteLength("共享") + Buffer.byteLength("page:workbench-list"),
  );
  assert.deepEqual(list.dynamicDependencies.chunkFiles, ["assets/robot.js"]);
  assert.equal(
    list.dynamicDependencies.rawJSBytes,
    Buffer.byteLength("robot code"),
  );
  assert.deepEqual(list.dynamicDependencies.externalDynamicImports, [
    "external-lazy",
  ]);
  assert.ok(
    list.staticDependencies.sharedChunkFiles.includes("assets/common.js"),
  );
  assert.equal(
    list.staticDependencies.linkedAssetBytes,
    Buffer.byteLength("样式"),
  );
  assert.equal(report.applicationEntry.rawEntryJSBytes, 5);
  assert.equal(
    report.applicationEntry.rawJSBytes,
    5 + Buffer.byteLength("共享"),
  );
  assert.equal(
    report.totals.javascript.rawBytes,
    Object.values(bundle)
      .filter((output) => output.type === "chunk")
      .reduce((sum, output) => sum + Buffer.byteLength(output.code), 0),
  );
  assert.deepEqual(report.totals.resources.fonts, {
    count: 1,
    rawBytes: 5,
    files: ["assets/host.ttf"],
  });
  assert.equal(report.totals.resources.images.rawBytes, 3);
});
test("P8 reports actual TinyRobot placement and ignores fully tree-shaken modules", () => {
  const report = analyzeRouteChunks(outputFixture(), { root: "/project" });
  const list = report.routes.find(
    (route) => route.route === "/templates/workbench-list",
  );
  assert.equal(list.staticDependencies.tinyRobot.present, false);
  assert.equal(list.initialDependencies.tinyRobot.present, false);
  assert.equal(list.dynamicDependencies.tinyRobot.present, true);
  assert.deepEqual(report.p8.businessRoutesWithTinyRobotInStaticClosure, [
    "/templates/workbench-dashboard",
  ]);
  assert.deepEqual(report.p8.businessRoutesWithTinyRobotInInitialClosure, [
    "/templates/workbench-dashboard",
  ]);
  assert.equal(list.dynamicDependencies.tinyRobot.modules.length, 1);
});
test("application entry dependencies are included in each selected route initial closure", () => {
  const bundle = outputFixture();
  bundle["assets/index.js"].imports.push("assets/robot.js");
  const report = analyzeRouteChunks(bundle, { root: "/project" });
  assert.equal(report.p8.businessRoutesWithTinyRobotInInitialClosure.length, 4);
  assert.equal(
    report.routes.find((route) => route.route === "/templates/blank")
      .staticDependencies.tinyRobot.present,
    false,
  );
  assert.equal(
    report.routes.find((route) => route.route === "/templates/blank")
      .initialDependencies.tinyRobot.present,
    true,
  );
});
test("cycles and shared chunks are counted once, and missing facades remain explicit", () => {
  const bundle = outputFixture();
  bundle["assets/common.js"].imports.push("assets/index.js");
  delete bundle["assets/blank.js"];
  const report = analyzeRouteChunks(bundle, { root: "/project" });
  assert.deepEqual(report.missingRoutes, ["/templates/blank"]);
  assert.equal(
    report.routes.find((route) => route.route === "/templates/blank").status,
    "unattributed",
  );
  assert.equal(
    report.applicationEntry.rawJSBytes,
    5 + Buffer.byteLength("共享"),
  );
});
test("build plugin emits a report and fails clearly when attribution is impossible", () => {
  const plugin = routeChunkReport({ root: "/project" });
  const emitted = [];
  assert.equal(plugin.apply, "build");
  plugin.generateBundle.handler.call(
    {
      emitFile: (asset) => emitted.push(asset),
      error: (message) => {
        throw new Error(message);
      },
    },
    {},
    outputFixture(),
  );
  assert.equal(emitted[0].fileName, "route-chunks.json");
  assert.equal(JSON.parse(emitted[0].source).routes.length, 6);
  assert.throws(
    () =>
      plugin.generateBundle.handler.call(
        {
          emitFile() {},
          error: (message) => {
            throw new Error(message);
          },
        },
        {},
        {},
      ),
    /ROUTE_CHUNK_FACADE_MISSING/,
  );
});

test("style-only and fully removed modules cannot masquerade as a route JS facade", () => {
  const bundle = outputFixture();
  delete bundle["assets/blank.js"];
  bundle["assets/common.js"].modules[
    "/project/src/templates/blank/Page.vue?vue&type=style"
  ] = { renderedLength: 20 };
  bundle["assets/common.js"].modules["/project/src/templates/blank/Page.vue"] =
    { renderedLength: 0 };
  assert.deepEqual(
    analyzeRouteChunks(bundle, { root: "/project" }).missingRoutes,
    ["/templates/blank"],
  );
});

test("a trimmed harness attributes only selected routes and still rejects a missing selected facade", () => {
  const bundle = outputFixture();
  delete bundle["assets/blank.js"];
  const plugin = routeChunkReport({
    root: "/project",
    names: ["workbench-list"],
  });
  const emitted = [];
  const context = {
    emitFile: (asset) => emitted.push(asset),
    error: (message) => {
      throw new Error(message);
    },
  };
  plugin.generateBundle.handler.call(context, {}, bundle);
  assert.deepEqual(
    JSON.parse(emitted[0].source).routes.map((route) => route.route),
    ["/templates/workbench-list"],
  );
  delete bundle["assets/workbench-list.js"];
  assert.throws(
    () => plugin.generateBundle.handler.call(context, {}, bundle),
    /ROUTE_CHUNK_FACADE_MISSING:\/templates\/workbench-list/,
  );
});

test("product route configuration follows an explicit feature facade and reports its actual path", () => {
  const bundle = outputFixture();
  const page = bundle["assets/workbench-list.js"];
  page.facadeModuleId = "/project/src/features/agreements/Page.vue";
  page.modules = { [page.facadeModuleId]: { renderedLength: 30 } };
  const report = analyzeRouteChunks(bundle, {
    root: "/project",
    routes: [
      { route: "/agreements/:id?", file: "src/features/agreements/Page.vue" },
    ],
  });
  assert.equal(report.routes[0].route, "/agreements/:id?");
  assert.equal(report.routes[0].facade, "src/features/agreements/Page.vue");
  assert.equal(report.routes[0].businessRoute, true);
  assert.deepEqual(report.missingRoutes, []);
});

test("empty, conflicting, malformed or escaping route configuration cannot silently disable attribution", () => {
  for (const options of [
    { names: [] },
    { routes: [] },
    { names: "blank" },
    { routes: null },
    { names: ["blank"], routes: [] },
    { names: ["../blank"] },
    { routes: [{ route: "https://elsewhere", file: "src/Page.vue" }] },
    { routes: [{ route: "/page", file: "../Page.vue" }] },
    { routes: [{ route: "/page", file: "src/Page.vue", business: "yes" }] },
    {
      routes: [
        { route: "/page", file: "src/Page.vue" },
        { route: "/page", file: "src/Other.vue" },
      ],
    },
  ])
    assert.throws(
      () => routeChunkReport({ root: "/project", ...options }),
      /ROUTE_CHUNK_CONFIG/,
    );
});

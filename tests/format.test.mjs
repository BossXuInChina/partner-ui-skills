import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { generateReferences } from "../shared/format/index.mjs";

const root = new URL("../", import.meta.url);
const lock = JSON.parse(
  readFileSync(new URL("source.lock.json", root), "utf8"),
);
const columns = ["组件预览", "变体与状态", "使用场景", "使用规范与API"];
const wbName = "@workbench/ui-vue3";
const bases = {
  [wbName]: "https://studio.example.test/team/wb/",
  "huawei-partner-ai-ui": "https://ai.example.test",
};

// Read only the locked tarball. No source checkout, Studio host or generated file is needed.
function archiveJSON(tarball) {
  const tar = gunzipSync(readFileSync(new URL(tarball, root)));
  const documents = new Map();
  for (let offset = 0; offset + 512 <= tar.length;) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const text = (start, size) =>
      header
        .subarray(start, start + size)
        .toString("utf8")
        .replace(/\0.*$/s, "");
    const name = [text(345, 155), text(0, 100)].filter(Boolean).join("/");
    const size = Number.parseInt(text(124, 12).trim() || "0", 8);
    const type = text(156, 1);
    assert.ok(Number.isFinite(size) && size >= 0, "valid tar size");
    if ((type === "" || type === "0") && name.endsWith(".json"))
      documents.set(
        name,
        JSON.parse(
          tar.subarray(offset + 512, offset + 512 + size).toString("utf8"),
        ),
      );
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return documents;
}
function packageInputs() {
  return lock.packages.map((entry) => {
    const files = archiveJSON(entry.tarball);
    const metadata = {};
    for (const name of ["components", "usage", "tokens", "icons", "release"]) {
      const found = [...files].find(([path]) =>
        new RegExp(`/dist(?:-lib)?/${name}\\.json$`).test(path),
      );
      if (found) metadata[name] = found[1];
    }
    return { ...entry, manifest: files.get("package/package.json"), metadata };
  });
}
const packages = packageInputs();
const wb = packages.find((pkg) => pkg.name === wbName);
const ai = packages.find((pkg) => pkg.name === "huawei-partner-ai-ui");

test("all locked assets get four Studio columns, declared API and genuine official SFCs", () => {
  const output = generateReferences({ packages, studioBaseURLs: bases });
  const contracts = wb.metadata.components.assets;
  assert.equal(Object.keys(contracts).length, 73);
  assert.equal(output.size, Object.keys(contracts).length + 8 + 19);
  assert.deepEqual([...output.keys()], [...output.keys()].sort());
  for (const [id, contract] of Object.entries(contracts)) {
    const page = output.get(`workbench/${id}.md`);
    assert.ok(page, `${id} has a page`);
    assert.match(
      output.get("workbench/index.md"),
      new RegExp(`\\(${id}\\.md\\)`),
    );
    const headings = [...page.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
    assert.deepEqual(headings, columns, id);
    assert.ok(page.includes(contract.publicImport.exportName));
    for (const [name, prop] of Object.entries(contract.props)) {
      assert.ok(page.includes(name), `${id}.${name}`);
      for (const value of prop.enum ?? [])
        assert.ok(page.includes(String(value)), `${id}.${name} enum`);
    }
    for (const example of wb.metadata.usage.assets[id].usageExamples) {
      assert.ok(page.includes(example.id));
      assert.ok(page.includes(example.source.ownerAssetId));
      if (example.portability === "portable")
        assert.ok(
          page.includes(example.code),
          `${id} example source preserved verbatim`,
        );
      else {
        assert.match(page, /unsupported/);
        for (const reason of example.unsupported)
          assert.ok(page.includes(reason.reason));
      }
    }
  }
});

test("every shared case and unsupported custom gallery remains represented without controls-to-props inference", () => {
  const output = generateReferences({ packages, studioBaseURLs: bases });
  let cases = 0;
  let custom = 0;
  let unsupported = 0;
  let unavailable = 0;
  for (const [id, asset] of Object.entries(wb.metadata.usage.assets)) {
    const page = output.get(`workbench/${id}.md`);
    for (const entry of asset.variants.cases) {
      assert.ok(
        page.includes(
          JSON.stringify(entry, null, 2)
            .split("\n")
            .slice(1, -1)
            .map((line) => "  " + line)
            .join("\n"),
        ),
        `${id}/${entry.id} keeps entire case data`,
      );
      cases++;
    }
    for (const reason of asset.variants.unsupported ?? [])
      assert.ok(page.includes(reason.reason));
    if (asset.variants.status === "unsupported") unsupported++;
    if (asset.variants.customCaseInventory) {
      assert.ok(
        page.includes(
          JSON.stringify(asset.variants.customCaseInventory, null, 2),
        ),
      );
      assert.match(page, /定制画廊来源清单（unsupported）/);
      custom++;
    }
    if (asset.variants.status === "unavailable") {
      assert.match(page, /unavailable/);
      unavailable++;
    }
  }
  assert.equal(cases, 212);
  assert.equal(custom, 38);
  assert.equal(unsupported, 42);
  assert.equal(unavailable, 20);
});

test("configured Studio base is combined with package routes; output has no built-in endpoint", () => {
  const output = generateReferences({ packages, studioBaseURLs: bases });
  const page = output.get("workbench/wb-alert.md");
  const route = wb.metadata.usage.assets["wb-alert"].studioPath;
  assert.ok(
    page.includes("https://studio.example.test/team/wb/" + route.slice(1)),
  );
  assert.doesNotMatch(
    [...output.values()].join("\n"),
    /localhost:4173|localhost:5173|\/Users\//,
  );
  const unconfigured = generateReferences({ packages }).get(
    "workbench/wb-alert.md",
  );
  assert.ok(unconfigured.includes(route));
  assert.match(unconfigured, /Studio 基址未配置/);
  for (const base of [
    "javascript:alert(1)",
    "https://user:secret@example.test",
    "https://example.test/?token=1",
    "https://example.test/#anchor",
  ]) {
    assert.throws(
      () =>
        generateReferences({ packages, studioBaseURLs: { [wbName]: base } }),
      /REFERENCE_STUDIO_BASE_INVALID/,
    );
  }
});

test("icons JSON retains all real family, native-size and exact public selector mappings", () => {
  const output = generateReferences({ packages, studioBaseURLs: bases });
  const { _generated, ...icons } = JSON.parse(output.get("icons.json"));
  assert.match(_generated, /do not edit/);
  assert.deepEqual(icons, wb.metadata.icons);
  assert.equal(icons.icons.length, 1201);
  assert.equal(
    icons.families.reduce((sum, family) => sum + family.iconCount, 0),
    1201,
  );
  for (const family of icons.families) {
    assert.ok(output.get("icons.md").includes(family.id));
    for (const component of family.components)
      assert.ok(
        output.get("icons.md").includes(component.publicImport.exportName),
      );
  }
});

test("all generated files carry package identity; sources record metadata availability and actual qualifications", () => {
  const output = generateReferences({ packages, studioBaseURLs: bases });
  for (const [path, content] of output) {
    if (path.endsWith(".json")) {
      assert.equal(Object.keys(JSON.parse(content))[0], "_generated", path);
      assert.match(
        JSON.parse(content)._generated,
        /Generated from .*@.*\([0-9a-f]{40}\).*— do not edit\./,
      );
    } else {
      assert.match(
        content.split("\n")[0],
        /^<!-- Generated from .*@.*\([0-9a-f]{40}\).*— do not edit\. -->$/,
      );
    }
  }
  const sources = JSON.parse(output.get("sources.json"));
  const identity = sources.packages.find((pkg) => pkg.name === wbName);
  assert.equal(identity.sourceCommit, wb.sourceCommit);
  assert.equal(identity.sha256, wb.sha256);
  assert.equal(identity.qualification.targetProductionEligible, false);
  assert.deepEqual(
    sources.packages.find((pkg) => pkg.name === ai.name).metadata,
    ["components", "release"],
  );
  assert.match(output.get("workbench/index.md"), /productionEligible=false/);
  assert.ok(output.get("ai-ui.md").includes(ai.sourceCommit));
  assert.match(output.get("ai-ui.md"), /targetProductionEligible=unknown/);
});

test("AI index and component references preserve the public metadata and source", () => {
  const output = generateReferences({ packages, studioBaseURLs: bases });
  const assets = ai.metadata.components.assets;
  assert.equal(Object.keys(assets).length, 18);
  assert.equal(ai.metadata.components.publicHelpers.length, 4);
  for (const [id, asset] of Object.entries(assets)) {
    const page = output.get(`ai-ui/${id}.md`);
    assert.ok(page);
    assert.deepEqual(
      [...page.matchAll(/^## (.+)$/gm)].map((m) => m[1]),
      columns,
    );
    assert.ok(output.get("ai-ui.md").includes(`(ai-ui/${id}.md)`));
    assert.ok(output.get("ai-ui/index.md").includes(`(${id}.md)`));
    assert.ok(page.includes("https://ai.example.test" + asset.studioPath));
    for (const value of [
      asset.props,
      asset.events,
      asset.eventDetails,
      asset.slots,
      asset.slotDetails,
      asset.exposed,
      asset.caseCoverage,
      asset.cases,
      asset.status,
      asset.source,
    ]) {
      const inner = JSON.stringify(value, null, 2)
        .split("\n")
        .slice(1, -1)
        .map((line) => "  " + line)
        .join("\n");
      if (inner) assert.ok(page.includes(inner), `${id} preserves metadata`);
    }
    assert.equal(asset.source.commit, ai.sourceCommit);
    assert.equal(asset.source.version, ai.version);
  }
  for (const helper of ai.metadata.components.publicHelpers)
    assert.ok(output.get("ai-ui.md").includes(helper.publicImport.exportName));
  assert.match(output.get("ai-ui.md"), /公开辅助导出（非组件）/);
  assert.match(output.get("tokens.md"), /tokens\.json 不可用/);
});

test("AI missing signatures, structured defaults, null qualification and hostile fields remain faithful and safe", () => {
  const inputs = structuredClone(packages);
  const asset = inputs.find((pkg) => pkg.name === ai.name).metadata.components
    .assets["ai-summary-card"];
  asset.label = "<img src=x onerror=alert(1)> [evil]";
  asset.props.example = {
    type: "string",
    default: { kind: "factory", expression: "() => []" },
  };
  asset.props.missing = { type: "string", default: { kind: "undefined" } };
  asset.eventDetails.missing = {
    signature: null,
    unsupported: [{ reason: "not derived" }],
  };
  asset.cases = [
    {
      id: "case",
      controls: { fakeProp: "not-api" },
      props: null,
      propsStatus: "not-derived",
    },
  ];
  const page = generateReferences({
    packages: inputs,
    studioBaseURLs: bases,
  }).get("ai-ui/ai-summary-card.md");
  assert.match(page, /&lt;img/);
  assert.doesNotMatch(page.split("\n")[2], /<img/);
  for (const fragment of [
    '"kind": "factory"',
    '"kind": "undefined"',
    '"signature": null',
    '"maturity": null',
    "AI_RELEASE_STATUS_UNDECLARED",
    '"propsStatus": "not-derived"',
  ])
    assert.ok(page.includes(fragment));
  assert.ok(page.indexOf("fakeProp") < page.indexOf("## 使用规范与API"));
  assert.doesNotMatch(page.slice(page.indexOf("## 使用规范与API")), /fakeProp/);
});

test("rules retain applicability, text, references and component/foundation dependencies from metadata", () => {
  const inputs = structuredClone(packages);
  const asset = inputs.find((pkg) => pkg.name === wbName).metadata.components
    .assets["wb-alert"];
  asset.rules = [
    {
      id: "bound-rule",
      title: "Bound title",
      text: "Source-only truth",
      strength: "must",
      status: "confirmed",
      when: ["only-this-condition"],
      references: [{ id: "related-asset" }],
    },
  ];
  asset.dependencies = ["dependency-proof"];
  asset.foundationKeys = ["foundation-proof"];
  const output = generateReferences({ packages: inputs });
  for (const value of [
    "bound-rule",
    "Source-only truth",
    "only-this-condition",
    "related-asset",
  ]) {
    assert.ok(output.get("workbench/wb-alert.md").includes(value));
    assert.ok(output.get("design-rules.md").includes(value));
  }
  assert.match(output.get("workbench/wb-alert.md"), /dependency-proof/);
  assert.match(output.get("workbench/wb-alert.md"), /foundation-proof/);
});

test("declared members and dynamic slots preserve known contracts while unresolved expressions stay unknown", () => {
  const output = generateReferences({ packages });
  for (const [id, contract] of Object.entries(wb.metadata.components.assets)) {
    const page = output.get(`workbench/${id}.md`);
    for (const item of contract.exposed)
      assert.ok(page.includes(item.declaration), `${id}.${item.name}`);
    for (const family of contract.family) {
      assert.ok(page.includes(family.publicImport.exportName));
      for (const item of family.exposed)
        assert.ok(page.includes(item.declaration));
    }
    for (const pattern of contract.slotPatterns) {
      if (pattern.kind === "prefix")
        assert.ok(page.includes(pattern.prefix + "<key>"));
      else assert.match(page, /包内未解析为确定的公开 slot 名/);
    }
  }
});

test("nonportable and missing examples never become invented public code; custom declarations survive", () => {
  const inputs = structuredClone(packages);
  const usage = inputs.find((pkg) => pkg.name === wbName).metadata.usage.assets[
    "wb-alert"
  ];
  usage.usageExamples = [
    {
      id: "not-portable",
      title: "源场景",
      source: { ownerAssetId: "wb-alert" },
      portability: "unsupported",
      unsupported: [
        { code: "private-dependency", reason: "Private helper cannot ship" },
      ],
      code: "import Private from '../private/secret.vue'",
    },
  ];
  usage.variants = {
    status: "unsupported",
    cases: [],
    unsupported: [{ code: "custom", reason: "No shared gallery export" }],
    declarations: { controls: [{ name: "host-control", kind: "select" }] },
    customCaseInventory: { explicitCaseIds: ["custom-a"] },
  };
  const output = generateReferences({ packages: inputs });
  const page = output.get("workbench/wb-alert.md");
  assert.match(page, /Private helper cannot ship/);
  assert.match(page, /owner：`wb-alert`/);
  assert.match(page, /host-control/);
  assert.match(page, /custom-a/);
  assert.doesNotMatch(page, /secret\.vue|import Private/);
  usage.usageExamples = [];
  usage.usageStatus = "unavailable";
  const missing = generateReferences({ packages: inputs }).get(
    "workbench/wb-alert.md",
  );
  assert.match(missing, /官方来源 SFC：unavailable/);
  assert.doesNotMatch(missing, /```vue/);
});

test("generation is deterministic and does not mutate caller package objects", () => {
  const original = JSON.stringify(packages);
  const first = generateReferences({ packages, studioBaseURLs: bases });
  const second = generateReferences({
    packages: [...packages].reverse(),
    studioBaseURLs: Object.fromEntries(Object.entries(bases).reverse()),
  });
  assert.deepEqual([...first], [...second]);
  assert.equal(JSON.stringify(packages), original);
});

test("unsafe generated paths, external Studio routes and escaping traversal are rejected", () => {
  const input = structuredClone(packages);
  const packageWB = input.find((pkg) => pkg.name === wbName);
  packageWB.metadata.components.assets["../outside"] =
    packageWB.metadata.components.assets["wb-alert"];
  assert.throws(
    () => generateReferences({ packages: input }),
    /REFERENCE_ASSET_ID_INVALID/,
  );
  for (const route of [
    "https://private.example.test",
    "//private.example.test/preview/x",
    "/preview/../../private",
    "/preview/%2e%2e/%2e%2e/private",
  ]) {
    const changed = structuredClone(packages);
    changed.find((pkg) => pkg.name === wbName).metadata.usage.assets[
      "wb-alert"
    ].studio.paths.preview = route;
    assert.throws(
      () => generateReferences({ packages: changed, studioBaseURLs: bases }),
      /REFERENCE_STUDIO_ROUTE_INVALID/,
    );
  }
  assert.throws(
    () => generateReferences({ packages: [wb, wb] }),
    /REFERENCE_PACKAGE_DUPLICATE/,
  );
  assert.throws(
    () => generateReferences({ packages: [ai] }),
    /REFERENCE_WORKBENCH_METADATA_REQUIRED/,
  );
});

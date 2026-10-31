import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  existsSync,
  realpathSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import {
  convertPrototype,
  loadPublicExports,
  parseConvertOptions,
  writeConversion,
} from "../skills/partner-ui-vue3/scripts/convert_prototype.mjs";
import { requireProjectTool } from "../skills/partner-ui-vue3/scripts/tooling.mjs";

const root = resolve(import.meta.dirname, "..");
const script = join(
  root,
  "skills/partner-ui-vue3/scripts/convert_prototype.mjs",
);
const exportsByPackage = {
  "@workbench/ui-vue3": new Set(["WorkbenchButton", "WorkbenchTable"]),
  "huawei-partner-ai-ui": new Set(["ChatPanel"]),
  vue: new Set(["ref", "reactive", "computed", "compile"]),
};
const html = (
  body = "const count = Vue.ref(0); return { count };",
  template = "<WorkbenchButton>{{ count }}</WorkbenchButton>",
  prelude = "",
) =>
  `<html><head><style>.feature {color:var(--wb-color-text-primary)}</style></head><body><script type="text/x-template" id="page">${template}</script><script src="runtime/partner-ui-runtime.js"></script><script>${prelude}\nPartnerUI.mount('#app', {template:'#page', setup() {${body}}});</script></body></html>`;
const convert = (source, options = {}) =>
  convertPrototype({
    html: source,
    exportsByPackage,
    project: root,
    ...options,
  });
const { parse } = requireProjectTool("vue/compiler-sfc", root);
const ts = requireProjectTool("typescript", root);
function assertParseable(result) {
  const { descriptor, errors } = parse(result.page, { filename: "Page.vue" });
  assert.equal(errors.length, 0);
  const ast = ts.createSourceFile(
    "Page.ts",
    descriptor.scriptSetup.content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  assert.equal(
    ast.parseDiagnostics.length,
    0,
    ast.parseDiagnostics.map((error) => String(error.messageText)).join(";"),
  );
}
function temporary(fn) {
  const folder = mkdtempSync(
    join(realpathSync(tmpdir()), "prototype-convert-"),
  );
  try {
    return fn(folder);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
}

const realMetadata = loadPublicExports({ project: root });
test("locked public type exports exclude AI type-only contracts and match real component values", () => {
  assert.ok(
    realMetadata.exportsByPackage["@workbench/ui-vue3"].has("WorkbenchButton"),
  );
  assert.ok(
    realMetadata.exportsByPackage["huawei-partner-ai-ui"].has("ChatPanel"),
  );
  assert.ok(
    !realMetadata.exportsByPackage["huawei-partner-ai-ui"].has("Agreement"),
  );
  assert.equal(realMetadata.packages.length, 2);
  for (const item of realMetadata.packages)
    assert.match(item.sourceCommit, /^[0-9a-f]{40}$/);
});
for (const name of [
  "blank",
  "workbench-list",
  "workbench-detail",
  "workbench-dashboard",
  "ai-chat",
  "ai-assistant-workspace",
]) {
  test("real pages HTML extracts without execution: " + name, () => {
    const input = readFileSync(
      join(root, "skills/partner-ui-pages/assets/templates", name + ".html"),
      "utf8",
    );
    const result = convertPrototype({
      html: input,
      filename: name + ".html",
      ...realMetadata,
      project: root,
    });
    assert.equal(result.report.status, "needs-review");
    assert.equal(result.report.productionReady, false);
    assert.ok(result.report.extraction.setupBody.includes("return"));
    assert.ok(result.report.importedComponents.length >= 4);
    assert.ok(!result.page.includes("<script src="));
    assert.ok(!result.page.includes("partner-ui-runtime.js"));
    assert.match(
      result.page,
      /throw new Error\('PROTOTYPE_CONVERSION_NEEDS_REVIEW'\)/,
    );
    assertParseable(result);
  });
}
test("Vue namespace/destructuring aliases rewrite actual AST references but preserve strings/comments and shadowed locals", () => {
  const result = convert(
    html(
      `
    // Vue.ref('comment') and PartnerUI.mockStream are documentation.
    const description = 'Vue.ref and PartnerUI.mockStream';
    const count = makeRef(1), state = V.reactive({ count });
    const shadow = (Vue) => Vue.ref('local');
    return { count, state, description, shadow };
  `,
      "<WorkbenchButton>{{ count }}</WorkbenchButton>",
      "const V=Vue; const { ref: makeRef }=V;",
    ),
  );
  assert.match(result.page, /ref as __vue_ref/);
  assert.match(result.page, /reactive as __vue_reactive/);
  assert.match(result.page, /const count = __vue_ref\(1\)/);
  assert.ok(
    result.page.includes(
      "// Vue.ref('comment') and PartnerUI.mockStream are documentation.",
    ),
  );
  assert.ok(result.page.includes("'Vue.ref and PartnerUI.mockStream'"));
  assert.ok(result.page.includes("(Vue) => Vue.ref('local')"));
  assertParseable(result);
});
test("nested Vue aliases and mixed declarations preserve unrelated values and shorthand keys", () => {
  const result = convert(
    html(
      `const {ref:make}, marker=1; function local(){ const V=Vue; return V.ref(2); } const count=make(0); const keys={make}; return {count,marker,keys,local};`.replace(
        "const {ref:make}, marker=1;",
        "const {ref:make}=Vue, marker=1;",
      ),
    ),
  );
  assert.match(result.page, /marker=1/);
  assert.ok(!result.page.includes("const V=Vue"));
  assert.match(result.page, /return __vue_ref\(2\)/);
  assert.match(result.page, /keys=\{make: __vue_ref\}/);
  assertParseable(result);
});
test("PartnerUI aliases and every helper chain have anchored TODOs and blocked placeholders", () => {
  const result = convert(
    html(
      `const chat=P.createChatSession({respond:()=> 'fake'}); const renderers=P.chatRenderers; return {chat,renderers};`,
      '<ChatPanel :messages="chat.messages"/>',
      "const P=PartnerUI;",
    ),
  );
  assert.ok(
    result.report.prototypeUsages.some(
      (item) =>
        item.path === "PartnerUI.createChatSession" &&
        item.todo === "TODO(conversion.md#chat)",
    ),
  );
  assert.ok(
    result.report.prototypeUsages.some(
      (item) =>
        item.path === "PartnerUI.chatRenderers" &&
        item.todo === "TODO(conversion.md#renderers)",
    ),
  );
  assert.ok(
    result.page.includes(
      "/* TODO(conversion.md#chat): PartnerUI.createChatSession */",
    ),
  );
  assert.ok(!result.page.includes("P.createChatSession("));
  assert.ok(!result.page.includes("P.chatRenderers"));
  assertParseable(result);
});
test("aliased mount resolves by symbol and unknown runtime helpers are never silently accepted", () => {
  const input = html("const count=Vue.notARealExport(0); return {count};")
    .replace("PartnerUI.mount", "mount")
    .replace("<script>\n", "<script>const P=PartnerUI; const mount=P.mount;\n");
  const result = convert(input);
  assert.ok(
    !result.report.vueImports.some(
      (entry) => entry.exported === "notARealExport",
    ),
  );
  assert.ok(
    result.report.prototypeUsages.some(
      (entry) => entry.path === "Vue.notARealExport",
    ),
  );
  assertParseable(result);
});
test("unknown/ambiguous/type-only tags do not generate fictitious imports", () => {
  const metadata = {
    ...exportsByPackage,
    "huawei-partner-ai-ui": new Set(["WorkbenchButton", "ChatPanel"]),
  };
  const result = convert(
    html("", "<WorkbenchButton/><DoesNotExist/><Agreement/>"),
    { exportsByPackage: metadata },
  );
  assert.equal(result.report.importedComponents.length, 0);
  assert.ok(
    result.report.issues.some((item) => item.code === "AMBIGUOUS_COMPONENT"),
  );
  assert.equal(
    result.report.issues.filter((item) => item.code === "UNKNOWN_COMPONENT")
      .length,
    2,
  );
});
test("template Vue/helper expressions transform without changing static strings or comments", () => {
  const result = convert(
    html(
      "const count=Vue.ref(0); return {count};",
      `<WorkbenchButton title="PartnerUI.mockStream" @click="PartnerUI.overlays.message('Vue.ref')">{{ Vue.computed(() => count) }}</WorkbenchButton><!-- PartnerUI.mockStream -->`,
    ),
  );
  assert.ok(result.page.includes('title="PartnerUI.mockStream"'));
  assert.ok(result.page.includes("<!-- PartnerUI.mockStream -->"));
  assert.ok(result.page.includes("&quot;PartnerUI.overlays.message&quot;"));
  assert.ok(result.page.includes("{{ __vue_computed(() => count) }}"));
  assert.ok(
    result.report.prototypeUsages.some((item) => item.location === "template"),
  );
  assertParseable(result);
});
test("module dependencies/side effects and custom return expressions are explicit review items, not executed or discarded", () => {
  const result = convert(
    html(
      "const rows=seed; return { rows, renamed: rows, calculated: rows.length };",
      '<WorkbenchTable :rows="rows"/>',
      'const seed=[1]; throw new Error("MUST_NOT_EXECUTE");',
    ),
  );
  assert.ok(result.report.extraction.moduleScope.includes("MUST_NOT_EXECUTE"));
  assert.ok(!result.page.includes("MUST_NOT_EXECUTE"));
  assert.ok(
    result.report.issues.some(
      (item) => item.code === "MODULE_SCOPE_NOT_COPIED",
    ),
  );
  assert.ok(result.report.issues.some((item) => item.code === "EXPOSE_RETURN"));
  assert.match(result.page, /const renamed = rows/);
});
for (const [name, input, pattern] of [
  [
    "missing mount",
    '<script type="text/x-template" id="page"><div/></script>',
    /MOUNT_REQUIRED/,
  ],
  [
    "multiple mounts",
    html() + '<script>PartnerUI.mount("#a",{});</script>',
    /MOUNT_REQUIRED/,
  ],
  [
    "missing template",
    html().replace("text/x-template", "text/plain"),
    /TEMPLATE_REQUIRED/,
  ],
  [
    "duplicate template",
    html() + '<script type="text/x-template" id="page"><div/></script>',
    /TEMPLATE_REQUIRED/,
  ],
  ["invalid script", html("const = ;"), /SCRIPT_PARSE/],
  [
    "dynamic options",
    html().replace(
      "{template:'#page', setup() {const count = Vue.ref(0); return { count };}}",
      "options",
    ),
    /MOUNT_OPTIONS/,
  ],
  [
    "dynamic selector",
    html().replace("template:'#page'", "template:selector"),
    /TEMPLATE_SELECTOR/,
  ],
])
  test("rejects invalid input before any output: " + name, () =>
    assert.throws(() => convert(input), pattern),
  );
test("CLI help works without installations and options are explicit", () => {
  const result = spawnSync(process.execPath, [script, "--help"], {
    cwd: tmpdir(),
    encoding: "utf8",
  });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /--input/);
  assert.throws(() => parseConvertOptions(["--input", "x"]), /required/);
  assert.throws(
    () => parseConvertOptions(["--input", "x", "--out", "a", "--force"]),
    /unknown option/,
  );
  assert.throws(
    () => parseConvertOptions(["--input", "x", "--input", "y", "--out", "a"]),
    /repeated/,
  );
});
test("writes both review outputs, refuses overwrites/traversal/symlinks and leaves no partial output on error", () =>
  temporary((folder) => {
    const result = convert(html());
    const output = join(folder, "new-feature");
    writeConversion({ out: output, result });
    assert.equal(
      JSON.parse(readFileSync(join(output, "conversion.json"))).status,
      "needs-review",
    );
    assert.deepEqual(readdirSync(output).sort(), [
      "Page.vue",
      "conversion.json",
    ]);
    assert.throws(
      () => writeConversion({ out: output, result }),
      /OUTPUT_EXISTS/,
    );
    assert.throws(
      () => writeConversion({ out: folder + "/x/../escape", result }),
      /OUTPUT_PATH/,
    );
    assert.throws(
      () =>
        writeConversion({
          out: join(folder, "bad"),
          result: { page: "a", report: { status: "pass" } },
        }),
      /CONVERSION_RESULT_INVALID/,
    );
    assert.ok(!existsSync(join(folder, "bad")));
    mkdirSync(join(folder, "real"));
    symlinkSync(join(folder, "real"), join(folder, "link"), "dir");
    assert.throws(
      () => writeConversion({ out: join(folder, "link", "nested"), result }),
      /symlink/,
    );
    assert.deepEqual(
      readdirSync(folder).filter((name) =>
        name.startsWith(".prototype-conversion-"),
      ),
      [],
    );
  }));
test("failed CLI input does not create an output directory", () =>
  temporary((folder) => {
    const input = join(folder, "bad.html"),
      output = join(folder, "output");
    writeFileSync(input, "<div>not a prototype</div>");
    const result = spawnSync(
      process.execPath,
      [script, "--input", input, "--out", output, "--project", root],
      { cwd: root, encoding: "utf8" },
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /MOUNT_REQUIRED/);
    assert.ok(!existsSync(output));
  }));
test("consecutive trailing namespace aliases and returned helpers remain parseable and fully marked", () => {
  const result = convert(
    html(
      "const marker=1, A=Vue, B=Vue; const count=A.ref(0); return {count, renderers:PartnerUI.chatRenderers};",
    ),
  );
  assert.match(result.page, /const marker=1;/);
  assert.ok(
    result.report.prototypeUsages.some(
      (entry) =>
        entry.path === "PartnerUI.chatRenderers" && entry.location === "return",
    ),
  );
  assertParseable(result);
});
test("template slot/loop/arrow scopes protect local Vue objects while transforming outer expressions", () => {
  const result = convert(
    html(
      "return {};",
      `<div v-for="(Vue, index) in items"><WorkbenchButton @click="Vue.ref(index)">{{Vue.ref(index)}}</WorkbenchButton></div><template #default="{PartnerUI}"><ChatPanel :messages="PartnerUI.messages"/></template><div>{{ list.map(Vue => Vue.ref(0)) }}</div>`,
    ),
  );
  assert.ok(result.page.includes('v-for="(Vue, index) in items"'));
  assert.ok(result.page.includes('@click="Vue.ref(index)"'));
  assert.ok(result.page.includes("{{Vue.ref(index)}}"));
  assert.ok(result.page.includes(':messages="PartnerUI.messages"'));
  assert.ok(result.page.includes("list.map(Vue => Vue.ref(0))"));
  assert.ok(
    !result.report.prototypeUsages.some(
      (entry) => entry.location === "template",
    ),
  );
  assertParseable(result);
});
test("a serialization failure cleans temporary files after the first output was prepared", () =>
  temporary((folder) => {
    const result = convert(html());
    result.report.circular = result.report;
    assert.throws(
      () => writeConversion({ out: join(folder, "incomplete"), result }),
      /circular/i,
    );
    assert.deepEqual(readdirSync(folder), []);
  }));
test("CLI creates a guarded review directory from an actual pages template", () =>
  temporary((folder) => {
    const output = join(folder, "converted");
    const result = spawnSync(
      process.execPath,
      [
        script,
        "--input",
        join(root, "skills/partner-ui-pages/assets/templates/blank.html"),
        "--out",
        output,
        "--project",
        root,
      ],
      { cwd: root, encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /NEEDS REVIEW/);
    const report = JSON.parse(
      readFileSync(join(output, "conversion.json"), "utf8"),
    );
    assert.equal(report.status, "needs-review");
    assert.equal(report.packages.length, 2);
    assert.match(
      readFileSync(join(output, "Page.vue"), "utf8"),
      /PROTOTYPE_CONVERSION_NEEDS_REVIEW/,
    );
  }));

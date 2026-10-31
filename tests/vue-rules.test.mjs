import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  checkSource,
  checkVueDirectory,
  loadIconNames,
} from "../skills/partner-ui-vue3/scripts/check_vue.mjs";

const iconNames = new Set(["registered-search"]);
const fixtures = [
  [
    "IMPORT_BOUNDARY",
    '<script setup>import x from "@workbench/ui-vue3/dist/internal.js"</script>',
    '<script setup>import { WorkbenchButton } from "@workbench/ui-vue3"; import "huawei-partner-ai-ui/styles.css"; import x from "./src/local";</script>',
  ],
  [
    "COMPONENT_CSS",
    "<style>.host .wb-button {height:40px}.partner-ai > div {height:300px}</style>",
    '<style>.host {height:400px}.partner-ai {height:400px}.host[data-note=".wb-button"] {width:100%}</style>',
  ],
  [
    "IMPORTANT",
    "<style>.host {height:400px!important}</style>",
    "<style>/* !important */.host {height:400px}</style>",
  ],
  [
    "COLOR_LITERAL",
    "<style>.host {color:#fff;background:rgba(0,0,0,.2)}</style>",
    '<style>.host {color:var(--wb-color-text-primary);background-image:url("image.svg#fff");content:"#fff"}</style>',
  ],
  [
    "SPACING_GRID",
    "<style>.host {padding:14px;gap:3px}</style>",
    "<style>.host {padding:16px 24px;gap:8px;border:1px solid var(--wb-color-border)}</style>",
  ],
  [
    "ICON_REGISTERED",
    '<template><WorkbenchIcon name="made-up" /></template>',
    '<template><WorkbenchIcon name="registered-search" /></template>',
  ],
  [
    "MOCK_BOUNDARY",
    '<script setup>import data from "./mocks/data"</script>',
    '<script setup>import data from "./api/data"</script>',
  ],
  [
    "RUNTIME_TEMPLATE",
    '<script setup>import {compile as make} from "vue";const x = make("<div/>"); const y={template:`<p>${x}</p>`}</script>',
    '<script setup>const description="compile( and template: are documentation"; // compile("<p/>")\nconst y={component:"Page"}</script>',
  ],
  [
    "UNSAFE_HTML",
    '<template><div v-html="html"/></template><script setup>const html="untrusted"</script>',
    '<template><div v-html="safeHtml"/></template><script setup>import DOMPurify from "dompurify";import {computed} from "vue"; const safeHtml=computed(()=>DOMPurify.sanitize(raw))</script>',
  ],
  [
    "BROWSER_DIALOG",
    '<script setup>window.confirm("Proceed?");prompt("Value")</script>',
    '<template><p>alert( is mentioned in help text</p></template><script setup>const copy="confirm("</script>',
  ],
  [
    "PARTNER_GLOBAL",
    "<script setup>window.PartnerUI.foo(); PartnerUI.Button;</script>",
    '<script setup>const help="window.PartnerUI and PartnerUI.Button";</script>',
  ],
];
for (const [rule, failing, passing] of fixtures) {
  test(`${rule}: failing fixture`, () => {
    const found = checkSource(failing, {
      file: "src/Feature.vue",
      iconNames,
    }).filter((entry) => entry.rule === rule);
    assert.ok(found.length > 0);
    assert.ok(found.every((entry) => entry.line > 0));
    assert.ok(
      found.every(
        (entry) =>
          entry.severity === (rule === "SPACING_GRID" ? "warning" : "error"),
      ),
    );
  });
  test(`${rule}: passing fixture`, () =>
    assert.equal(
      checkSource(passing, { file: "src/Feature.vue", iconNames }).filter(
        (entry) => entry.rule === rule,
      ).length,
      0,
    ));
}
test("parses import/export/dynamic/require ASTs and only rejects actual package internals", () => {
  const source = `export {x} from '../unpublished-checkout/packages/ui-vue3/src/x'; const x=import('@workbench/ui-vue3/internal');require('@workbench/ui-vue3/dist/x');const docs="import '@workbench/ui-vue3/private'";`;
  assert.equal(
    checkSource(source, { file: "Feature.ts", iconNames }).filter(
      (entry) => entry.rule === "IMPORT_BOUNDARY",
    ).length,
    3,
  );
});
test("template event expressions are scanned", () =>
  assert.ok(
    checkSource(
      "<template><button @click=\"alert('bad')\">Open</button></template>",
      { iconNames },
    ).some((entry) => entry.rule === "BROWSER_DIALOG"),
  ));
test("CSS :deep into package selectors is forbidden, comments and content are not selectors", () => {
  assert.ok(
    checkSource("<style>.host :deep(.tr-chat) {height:400px}</style>", {
      iconNames,
    }).some((entry) => entry.rule === "COMPONENT_CSS"),
  );
  assert.equal(
    checkSource(
      '<style>/* .wb-button{} */.host::after{content:".tr-chat"}</style>',
      { iconNames },
    ).filter((entry) => entry.rule === "COMPONENT_CSS").length,
    0,
  );
});
test("v-html does not trust a function merely named sanitize", () =>
  assert.ok(
    checkSource(
      '<script setup>const sanitize=x=>x</script><template><div v-html="sanitize(raw)"/></template>',
      { iconNames },
    ).some((entry) => entry.rule === "UNSAFE_HTML"),
  ));
test("mock imports are permitted in test, mocks and development entry sources", () => {
  for (const file of [
    "src/mocks/a.ts",
    "src/tests/a.ts",
    "src/a.spec.ts",
    "src/main.dev.ts",
  ])
    assert.equal(
      checkSource('import x from "./mocks/x"', { file, iconNames }).filter(
        (entry) => entry.rule === "MOCK_BOUNDARY",
      ).length,
      0,
    );
});
test("registered icon constants are resolved and dynamic names expose static boundary", () => {
  assert.equal(
    checkSource(
      '<script setup>const icon="registered-search"</script><template><WorkbenchIcon :name="icon" /></template>',
      { iconNames },
    ).filter((entry) => entry.rule.startsWith("ICON_")).length,
    0,
  );
  assert.ok(
    checkSource('<template><WorkbenchIcon :name="remote.icon" /></template>', {
      iconNames,
    }).some(
      (entry) => entry.rule === "ICON_DYNAMIC" && entry.severity === "warning",
    ),
  );
});
test("recursive scan excludes dependencies, generated content, mocks and tests", () => {
  const directory = mkdtempSync(join(tmpdir(), "partner-vue-rules-"));
  try {
    for (const path of [
      "node_modules/a",
      "dist",
      "vendor",
      "mocks",
      "tests",
      "__tests__",
      ".artifacts",
    ]) {
      mkdirSync(join(directory, path), { recursive: true });
      writeFileSync(join(directory, path, "bad.ts"), 'alert("bad")');
    }
    writeFileSync(join(directory, "safe.ts"), "export const safe = true");
    writeFileSync(join(directory, "negative.spec.ts"), 'alert("fixture")');
    let result = checkVueDirectory(directory, { iconNames });
    assert.equal(result.files, 1);
    assert.equal(result.errors, 0);
    mkdirSync(join(directory, "src"));
    writeFileSync(
      join(directory, "src", "bad.vue"),
      '<script setup>\nalert("bad")\n</script>',
    );
    result = checkVueDirectory(directory, { iconNames });
    assert.equal(result.errors, 1);
    assert.equal(result.findings[0].line, 2);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
test("CLI errors fail, spacing warnings do not fail", () => {
  const directory = mkdtempSync(join(tmpdir(), "partner-vue-cli-"));
  try {
    const file = join(directory, "Feature.vue");
    writeFileSync(
      file,
      "<template><main/></template><style>.host{padding:3px}</style>",
    );
    let run = spawnSync(
      process.execPath,
      ["skills/partner-ui-vue3/scripts/check_vue.mjs", directory],
      { encoding: "utf8" },
    );
    assert.equal(run.status, 0);
    assert.match(run.stdout, /warning SPACING_GRID/);
    writeFileSync(file, '<script setup>alert("bad")</script>');
    run = spawnSync(
      process.execPath,
      ["skills/partner-ui-vue3/scripts/check_vue.mjs", directory],
      { encoding: "utf8" },
    );
    assert.equal(run.status, 1);
    assert.match(run.stdout, /Feature.vue:1: error BROWSER_DIALOG/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
test("default icon registry is pinned public metadata", () =>
  assert.ok(loadIconNames().size > 100));

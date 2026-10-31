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
  ["SFC_PARSE", "<template><main></template>", "<template><main/></template>"],
  [
    "CSS_PARSE",
    "<template><main/></template><style>.host{padding:8px</style>",
    "<template><main/></template><style>.host{padding:8px}</style>",
  ],
  [
    "ICON_DYNAMIC",
    '<template><WorkbenchIcon :name="remote.icon" /></template>',
    '<template><WorkbenchIcon name="registered-search" /></template>',
  ],
  [
    "IMPORT_BOUNDARY",
    '<script setup>import x from "@workbench/ui-vue3/dist/internal.js"</script>',
    '<script setup>import { WorkbenchButton } from "@workbench/ui-vue3"; import "huawei-partner-ai-ui/styles.css"; import x from "./src/local";</script>',
  ],
  [
    "COMPONENT_CSS",
    "<template><main/></template><style>.host .wb-button {height:40px}</style>",
    '<template><main/></template><style>.host {height:400px}.partner-ai {height:400px}.host[data-note=".wb-button"] {width:100%}</style>',
  ],
  [
    "IMPORTANT",
    "<template><main/></template><style>.host {height:400px!important}</style>",
    "<template><main/></template><style>/* !important */.host {height:400px}</style>",
  ],
  [
    "COLOR_LITERAL",
    "<template><main/></template><style>.host {color:#fff}</style>",
    '<template><main/></template><style>.host {color:var(--wb-color-text-primary);background-image:url("image.svg#fff");content:"#fff"}</style>',
  ],
  [
    "SPACING_GRID",
    "<template><main/></template><style>.host {padding:14px}</style>",
    "<template><main/></template><style>.host {padding:16px 24px;gap:8px;border:1px solid var(--wb-color-border)}</style>",
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
    '<script setup>import {compile as make} from "vue";const x = make("<div/>")</script>',
    '<script setup>const description="compile( and template: are documentation"; // compile("<p/>")\nconst y={component:"Page"}</script>',
  ],
  [
    "UNSAFE_HTML",
    '<template><div v-html="html"/></template><script setup>const html="untrusted"</script>',
    '<template><div v-html="safeHtml"/></template><script setup>import DOMPurify from "dompurify";import {computed} from "vue"; const safeHtml=computed(()=>DOMPurify.sanitize(raw))</script>',
  ],
  [
    "BROWSER_DIALOG",
    '<script setup>window.confirm("Proceed?")</script>',
    '<template><p>alert( is mentioned in help text</p></template><script setup>const copy="confirm("</script>',
  ],
  [
    "PARTNER_GLOBAL",
    "<script setup>window.PartnerUI.foo();</script>",
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
          entry.severity ===
          (["SPACING_GRID", "ICON_DYNAMIC"].includes(rule)
            ? "warning"
            : "error"),
      ),
    );
  });
  test(`${rule}: passing fixture`, () => {
    const found = checkSource(passing, { file: "src/Feature.vue", iconNames });
    assert.equal(found.filter((entry) => entry.rule === rule).length, 0);
    assert.deepEqual(
      found,
      [],
      "Passing input must not hide an unrelated parser/rule error.",
    );
  });
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
    checkSource(
      "<template><main/></template><style>.host :deep(.tr-chat) {height:400px}</style>",
      {
        iconNames,
      },
    ).some((entry) => entry.rule === "COMPONENT_CSS"),
  );
  assert.equal(
    checkSource(
      '<template><main/></template><style>/* .wb-button{} */.host::after{content:".tr-chat"}</style>',
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

// Regressions are small consumer behaviors, not copies of the detection algorithm.
const checked = (source, file = "src/Feature.vue") =>
  checkSource(source, { file, iconNames });
const rejects = (rule, source) =>
  assert.ok(
    checked(source).some((item) => item.rule === rule),
    `Expected ${rule}`,
  );
const accepts = (source) => assert.deepEqual(checked(source), []);
const html = (script, expression = "html", template = "") =>
  `<script setup>${script}</script><template><div v-html="${expression}"/>${template}</template>`;
const purify = `import DOMPurify from 'dompurify';import {computed} from 'vue';`;

for (const [name, source] of [
  [
    "conditional raw return",
    html(
      purify +
        `const html=computed(()=>{if(flag)return raw;return DOMPurify.sanitize(raw)})`,
    ),
  ],
  [
    "switch raw return",
    html(
      purify +
        `const html=computed(()=>{switch(kind){case 'raw':return raw;default:return DOMPurify.sanitize(raw)}})`,
    ),
  ],
  [
    "finally raw return",
    html(
      purify +
        `const html=computed(()=>{try{return DOMPurify.sanitize(raw)}finally{return raw}})`,
    ),
  ],
  [
    "inner declaration cannot sanitize outer name",
    html(
      purify +
        `const html=raw;function unused(){const html=DOMPurify.sanitize(raw)}`,
    ),
  ],
  [
    "rewritten local",
    html(purify + `let html=DOMPurify.sanitize(raw);html=raw`),
  ],
  [
    "rewritten ref",
    html(
      purify +
        `import {ref} from 'vue';const html=ref(DOMPurify.sanitize(raw));html.value=raw`,
    ),
  ],
  [
    "mutable ref is not proven safe by its initializer",
    html(
      purify +
        `import {ref} from 'vue';const html=ref(DOMPurify.sanitize(raw))`,
    ),
  ],
  [
    "shadowed purifier",
    html(purify + `const html=computed((DOMPurify)=>DOMPurify.sanitize(raw))`),
  ],
  [
    "shadowed computed",
    html(
      purify +
        `function f(computed){return computed(()=>DOMPurify.sanitize(raw))}const html=f(other)`,
    ),
  ],
  [
    "rewritten sanitizer through alias",
    html(
      purify +
        `const alias=DOMPurify;alias.sanitize=(x)=>x;const html=DOMPurify.sanitize(raw)`,
    ),
  ],
  [
    "rewritten sanitizer method",
    html(
      purify + `DOMPurify.sanitize=(x)=>x;const html=DOMPurify.sanitize(raw)`,
    ),
  ],
  [
    "template write invalidates sanitized const/ref",
    html(
      purify + `const html=computed(()=>DOMPurify.sanitize(raw))`,
      "html",
      `<button @click="html.value=raw">Change</button>`,
    ),
  ],
  [
    "slot variable shadows sanitized module name",
    `<script setup>${purify}const html=DOMPurify.sanitize(raw)</script><template><Widget v-slot="{html}"><div v-html="html"/></Widget></template>`,
  ],
  [
    "loop variable shadows sanitized module name",
    `<script setup>${purify}const html=DOMPurify.sanitize(raw)</script><template><div v-for="html in rows" v-html="html"/></template>`,
  ],
])
  test(`UNSAFE_HTML rejects ${name}`, () => rejects("UNSAFE_HTML", source));

test("UNSAFE_HTML accepts lexically resolved immutable sanitized aliases and all sanitized returns", () => {
  accepts(
    html(
      purify +
        `const html=computed(()=>{const clean=DOMPurify.sanitize(raw);if(flag)return clean;return DOMPurify.sanitize(other)})`,
    ),
  );
  accepts(
    html(
      `import {sanitize as clean} from 'dompurify';import {computed as derive} from 'vue';const initial=clean(raw);const html=derive(()=>{function unrelated(){return raw}return flag?initial:clean(other)})`,
    ),
  );
  accepts(
    html(
      purify +
        `const html=DOMPurify.sanitize(raw);function unused(){const html=raw}`,
    ),
  );
});

for (const [name, source] of [
  [
    "Vue namespace compiler",
    `<script setup>import * as Vue from 'vue';Vue.compile(raw)</script>`,
  ],
  [
    "immutable Vue compiler alias",
    `<script setup>import {compile} from 'vue';const make=compile;make(raw)</script>`,
  ],
  [
    "constant createApp template",
    `<script setup>import {createApp} from 'vue';const text='<main/>';createApp({template:text})</script>`,
  ],
  [
    "constant defineComponent options",
    `<script setup>import {defineComponent} from 'vue';const text='<main/>';const options={template:text};defineComponent(options)</script>`,
  ],
  [
    "shorthand Vue template option",
    `<script setup>import {createSSRApp} from 'vue';const template='<main/>';createSSRApp({template})</script>`,
  ],
  [
    "SFC export-default template",
    `<script>const text='<main/>';export default {template:text}</script>`,
  ],
  [
    "defineOptions template macro",
    `<script setup>defineOptions({template:raw})</script>`,
  ],
])
  test(`RUNTIME_TEMPLATE rejects ${name}`, () =>
    rejects("RUNTIME_TEMPLATE", source));

test("switch lexical names do not replace a sanitized module binding", () => {
  accepts(
    html(
      purify +
        `const html=DOMPurify.sanitize(raw);switch(kind){case 'local':const html=raw;break}`,
    ),
  );
});
test("runtime rules allow ordinary business fields and locally bound APIs", () => {
  accepts(
    `<script setup>const email={template:'welcome'};validator.compile(schema);const confirm=(dto)=>save(dto);confirm(input)</script>`,
  );
  accepts(
    `<script setup>import {compile} from 'vue';function local(compile){compile(schema)};const window={confirm:save};window.confirm(dto)</script>`,
  );
  accepts(
    `<script setup>import * as PartnerUI from '@workbench/ui-vue3';const Button=PartnerUI.WorkbenchButton</script>`,
  );
  accepts(
    `<script setup>function local(PartnerUI,confirm){PartnerUI.Button;confirm(dto)}</script>`,
  );
});
test("browser/global rules retain explicit globals and immutable browser aliases", () => {
  rejects("BROWSER_DIALOG", `<script setup>prompt('Value')</script>`);
  rejects(
    "BROWSER_DIALOG",
    `<script setup>const ask=window.confirm;ask('Proceed?')</script>`,
  );
  rejects("PARTNER_GLOBAL", `<script setup>PartnerUI.Button</script>`);
});
test("mock filename imports are rejected independently of directory names", () => {
  rejects(
    "MOCK_BOUNDARY",
    `<script setup>import api from './api.mock.ts'</script>`,
  );
  rejects(
    "MOCK_BOUNDARY",
    `<script setup>const api=import('./api.mock.ts?raw')</script>`,
  );
  assert.deepEqual(
    checked(`import api from './api.mock.ts'`, "src/main.dev.ts"),
    [],
  );
});
test("public icon aliases retain registry checking", () => {
  rejects(
    "ICON_REGISTERED",
    `<script setup>import {WorkbenchIcon as Icon} from '@workbench/ui-vue3'</script><template><Icon name="made-up"/></template>`,
  );
  accepts(
    `<script setup>import {WorkbenchIcon as Icon} from '@workbench/ui-vue3';const name='registered-search'</script><template><Icon :name="name"/></template>`,
  );
  accepts(
    `<script setup>import {WorkbenchIcon as Icon} from './local-icons'</script><template><Icon name="local-name"/></template>`,
  );
});
for (const [name, source, rule] of [
  [
    "inline bound CSS string",
    `<template><main :style="'color:#fff'"/></template>`,
    "COLOR_LITERAL",
  ],
  [
    "inline bound important string",
    `<template><main :style="'height:100px !important'"/></template>`,
    "IMPORTANT",
  ],
  [
    "constant style object",
    `<script setup>const host={padding:'3px'}</script><template><main :style="host"/></template>`,
    "SPACING_GRID",
  ],
  [
    "constant property and style array",
    `<script setup>const tone='#fff';const host={color:tone}</script><template><main :style="[host]"/></template>`,
    "COLOR_LITERAL",
  ],
  [
    "numeric spacing",
    `<template><main :style="{gap:3}"/></template>`,
    "SPACING_GRID",
  ],
  [
    "named CSS colour",
    `<template><main/></template><style>.host{color:rebeccapurple}</style>`,
    "COLOR_LITERAL",
  ],
  [
    "functional CSS colour",
    `<template><main/></template><style>.host{background:oklch(50% .2 30)}</style>`,
    "COLOR_LITERAL",
  ],
  [
    "RGB CSS colour",
    `<template><main/></template><style>.host{background:rgba(0,0,0,.2)}</style>`,
    "COLOR_LITERAL",
  ],
  [
    "class attribute internal selector",
    `<template><main/></template><style>[class~="wb-button"]{height:40px}</style>`,
    "COMPONENT_CSS",
  ],
  [
    "AI descendant selector",
    `<template><main/></template><style>.partner-ai > div{height:300px}</style>`,
    "COMPONENT_CSS",
  ],
  [
    "gap spacing",
    `<template><main/></template><style>.host{gap:3px}</style>`,
    "SPACING_GRID",
  ],
])
  test(`CSS rejects ${name}`, () => rejects(rule, source));
test("CSS allows static token styles and unrelated colour-like identifiers", () => {
  accepts(
    `<script setup>const host={color:'var(--red)',padding:'8px'}</script><template><main :style="[host]"/></template><style>.host{animation-name:red;color:currentColor;background:transparent}.host[data-note="wb-button"]{width:100%}</style>`,
  );
});
test("CLI --help succeeds without a directory", () => {
  const run = spawnSync(
    process.execPath,
    ["skills/partner-ui-vue3/scripts/check_vue.mjs", "--help"],
    { encoding: "utf8" },
  );
  assert.equal(run.status, 0);
  assert.match(run.stdout, /Usage: check_vue\.mjs <directory>/);
  assert.equal(run.stderr, "");
});

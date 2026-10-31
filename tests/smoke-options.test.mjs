import test from "node:test";
import assert from "node:assert/strict";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  symlinkSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import {
  DEFAULT_ROUTES,
  VIEWPORTS,
  normalizeRoutes,
  loadAiComponentNames,
  parseSmokeOptions,
  validatePageState,
  runSmoke,
} from "../skills/partner-ui-vue3/scripts/smoke.mjs";

test("six route smokes each visit both requested viewports; evidence is opt-in", () => {
  const options = parseSmokeOptions([], {});
  assert.equal(options.routes.length, 6);
  assert.equal(options.evidence, false);
  assert.deepEqual(VIEWPORTS, [
    { width: 1440, height: 900 },
    { width: 1280, height: 800 },
  ]);
  assert.ok(
    DEFAULT_ROUTES.every((route) => route.path.startsWith("/templates/")),
  );
  assert.equal(parseSmokeOptions(["--evidence"], {}).evidence, true);
  for (const key of [
    "WB_EVIDENCE",
    "AI_EVIDENCE",
    "PARTNER_UI_EVIDENCE",
    "SMOKE_EVIDENCE",
  ])
    assert.equal(parseSmokeOptions([], { [key]: "1" }).evidence, true);
});
test("CLI accepts development URL, project, output and route configuration", () => {
  const directory = mkdtempSync(join(tmpdir(), "partner-smoke-options-"));
  try {
    const path = join(directory, "routes.json");
    writeFileSync(
      path,
      JSON.stringify({
        routes: [
          "/one",
          { path: "/two", expectAI: true, readySelector: "[data-ready]" },
        ],
      }),
    );
    const options = parseSmokeOptions(
      [
        "--url",
        "http://127.0.0.1:5173",
        "--project",
        directory,
        "--out",
        join(directory, "qa"),
        "--routes",
        path,
        "--timeout",
        "5000",
      ],
      {},
    );
    assert.equal(options.routes[1].expectAI, true);
    assert.equal(options.timeout, 5000);
    assert.equal(options.project, directory);
    assert.match(options.url, /5173/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
test("bad arguments and foreign route URLs are rejected", () => {
  for (const args of [
    ["--unknown"],
    ["--url"],
    ["--url", "file:///tmp/a"],
    ["--timeout", "NaN"],
    ["--timeout", "10"],
  ])
    assert.throws(() => parseSmokeOptions(args, {}));
  for (const config of [
    [],
    ["https://example.com"],
    ["//example.com"],
    [{ path: "/x", readySelector: 5 }],
  ])
    assert.throws(() => normalizeRoutes(config));
});
test("console errors, Vue warnings and unresolved components fail the visit", () => {
  const errors = validatePageState(
    {
      consoleErrors: ["backend failed"],
      vueWarnings: ["[Vue warn]: Failed to resolve component: Missing"],
      pageErrors: ["unhandled error"],
    },
    {},
  );
  assert.equal(errors.length, 3);
  assert.deepEqual(validatePageState({}, {}), []);
});
test("AI scope and panel height are validated without rejecting short inline components", () => {
  assert.deepEqual(
    validatePageState(
      {
        ai: [
          { name: "AiToast", inScope: true, height: 40, panel: false },
          {
            name: "WorkspaceSmartTag",
            inScope: true,
            height: 24,
            panel: false,
          },
          { name: "ChatPanel", inScope: true, height: 400, panel: true },
        ],
        scopes: [{ height: 400 }, { height: 24 }],
      },
      { expectAI: true },
    ),
    [],
  );
  const errors = validatePageState(
    {
      ai: [{ name: "ChatPanel", inScope: false, height: 100, panel: true }],
      scopes: [{ height: 100 }],
    },
    { expectAI: true },
  );
  assert.ok(errors.some((x) => x.startsWith("AI_SCOPE")));
  assert.ok(errors.some((x) => x.startsWith("AI_HEIGHT")));
  assert.ok(
    validatePageState({ ai: [] }, { expectAI: true }).some((x) =>
      x.startsWith("AI_MISSING"),
    ),
  );
});

// Runner infrastructure needs a real browser: component tests cannot observe the dev-server
// boundary, browser console pipeline, rendered height or screenshot opt-in behavior.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const installedHarness = resolve(
  process.env.PARTNER_HARNESS_TOOLCHAIN ??
    join(root, "dist/partner-ui-vue3/assets/harness"),
);
test(
  "isolated skill uses only harness tools and captures actual browser failures",
  {
    skip: !existsSync(join(installedHarness, "node_modules/vite")),
    timeout: 60000,
  },
  async () => {
    const temporary = mkdtempSync(join(tmpdir(), "partner-isolated-smoke-"));
    const skill = join(temporary, "partner-ui-vue3");
    const project = join(skill, "assets/harness");
    try {
      mkdirSync(project, { recursive: true });
      cpSync(
        join(root, "skills/partner-ui-vue3/scripts"),
        join(skill, "scripts"),
        { recursive: true },
      );
      mkdirSync(join(skill, "references"));
      cpSync(
        join(root, "skills/partner-ui-vue3/references/icons.json"),
        join(skill, "references/icons.json"),
      );
      // No node_modules exists at the isolated skill root. Its harness owns every tool.
      symlinkSync(
        realpathSync(join(installedHarness, "node_modules")),
        join(project, "node_modules"),
        "dir",
      );
      writeFileSync(
        join(project, "package.json"),
        JSON.stringify({ type: "module" }),
      );
      writeFileSync(
        join(project, "index.html"),
        '<html><head><link rel="icon" href="data:,"></head><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>',
      );
      writeFileSync(
        join(project, "main.js"),
        `import {createApp,h} from 'vue';
const path=location.pathname;
const InlineAi={name:'WorkspaceSmartTag',render(){return h('span',{style:{display:'inline-block',height:'24px'}},'Inline AI fixture')}};
const PublicAiIcon={name:'AiIcon',render(){return h('span',{style:{display:'inline-block',height:'24px'}},'Public AI icon')}};
const HostLayout={name:'AssistantHostLayout',render(){return h('div',{class:'business-layout'},this.$slots.default?.())}};
const OverlayHost={name:'BusinessOverlayHost',render(){return h('div',{class:'business-overlays'},this.$slots.default?.())}};
const BusinessDialog={name:'UiDialog',props:{theme:String},render(){return h('div',{class:'business-dialog'},this.$slots.default?.())}};
createApp({name:'AiChatPage',render(){return h(HostLayout,null,{default:()=>h(OverlayHost,null,{default:()=>h('main',{'data-template-ready':'true'},[h('h1','Fixture'),path.includes('dialog')?h(BusinessDialog,{theme:path.includes('aurora')?'aurora':'workbench'},{default:()=>path.includes('dialog-icon')?h(PublicAiIcon):h('p','Business dialog content')}):null,path.includes('icon-outside')&&!path.includes('dialog')?h(PublicAiIcon):null,path.includes('inline')?h('div',{class:path.includes('outside')?'host':'partner-ai',style:{height:'24px'}},[h(InlineAi)]):h('div',{class:path.includes('outside')?'host':'partner-ai',style:{height:path.includes('short')?'100px':'400px'}},[h('section',{'data-ai-component':'ChatPanel',style:{height:'100%'}},'AI fixture')])])})})}}).mount('#app');
if(path.includes('console'))console.error('negative fixture console error');
if(path.includes('warning'))console.warn('[Vue warn]: Failed to resolve component: FixtureMissing');`,
      );
      const source = join(project, "Feature.vue");
      writeFileSync(
        source,
        "<template><main/></template><style>.host{padding:16px;color:var(--wb-color-text-primary)}</style>",
      );
      const rules = spawnSync(
        process.execPath,
        [join(skill, "scripts/check_vue.mjs"), project],
        { cwd: temporary, encoding: "utf8" },
      );
      assert.equal(rules.status, 0, rules.stdout + rules.stderr);
      assert.match(rules.stdout, /Checked /);
      const output = join(temporary, "evidence-off");
      const clean = await runSmoke({
        project,
        routes: [
          { path: "/good", expectAI: true },
          { path: "/inline", expectAI: true },
          { path: "/workbench-dialog", expectAI: true },
        ],
        out: output,
        evidence: false,
      });
      assert.equal(clean.status, "PASS");
      assert.equal(clean.routes.length, 3);
      assert.equal(
        clean.routes[1].visits[0].ai.ai[0].name,
        "WorkspaceSmartTag",
      );
      assert.ok(
        clean.routes.every((route) =>
          route.visits.every(
            (visit) =>
              !visit.ai.ai.some((component) => component.name === "AiChatPage"),
          ),
        ),
      );
      assert.equal(clean.routes[1].visits[0].ai.ai[0].panel, false);
      assert.deepEqual(
        clean.routes[0].visits[0].ai.neutralHosts
          .map((host) => host.name)
          .sort(),
        ["AssistantHostLayout", "BusinessOverlayHost"],
      );
      assert.ok(
        clean.routes[0].visits[0].ai.neutralHosts.every(
          (host) => !host.inScope,
        ),
      );
      assert.ok(
        clean.routes[2].visits[0].ai.neutralHosts.some(
          (host) => host.name === "UiDialog",
        ),
      );
      assert.equal(clean.routes[0].visits.length, 2);
      assert.equal(
        readdirSync(output).filter((name) => name.endsWith(".png")).length,
        0,
      );
      // Run the copied CLI from outside the source repository to prove dependency closure.
      const routesFile = join(temporary, "routes.json");
      writeFileSync(routesFile, JSON.stringify(["/good"]));
      const child = spawnSync(
        process.execPath,
        [
          join(skill, "scripts/smoke.mjs"),
          "--project",
          project,
          "--routes",
          routesFile,
          "--evidence",
          "--out",
          join(temporary, "evidence-on"),
        ],
        { cwd: temporary, encoding: "utf8", timeout: 30000 },
      );
      assert.equal(child.status, 0, child.stdout + child.stderr);
      assert.match(child.stdout, /PASS:/);
      assert.equal(
        readdirSync(join(temporary, "evidence-on")).filter((name) =>
          name.endsWith(".png"),
        ).length,
        2,
      );
      let failure;
      try {
        await runSmoke({
          project,
          routes: [
            "/console",
            "/warning",
            "/outside",
            "/short",
            "/inline-outside",
            "/icon-outside",
            "/dialog-icon-outside",
            "/aurora-dialog",
          ],
          out: join(temporary, "failures"),
          evidence: false,
        });
      } catch (error) {
        failure = error.result;
      }
      assert.equal(failure?.status, "FAIL");
      assert.ok(failure.routes.every((route) => route.status === "FAIL"));
      assert.ok(
        failure.routes
          .find((route) => route.path === "/console")
          .visits[0].errors.some((error) => error.includes("console.error")),
      );
      assert.ok(
        failure.routes
          .find((route) => route.path === "/warning")
          .visits[0].errors.some((error) => error.includes("Vue warning")),
      );
      assert.ok(
        failure.routes
          .find((route) => route.path === "/outside")
          .visits[0].errors.some((error) => error.includes("AI_SCOPE")),
      );
      assert.ok(
        failure.routes
          .find((route) => route.path === "/short")
          .visits[0].errors.some((error) => error.includes("AI_HEIGHT")),
      );
      assert.ok(
        failure.routes
          .find((route) => route.path === "/inline-outside")
          .visits[0].errors.some((error) => error.includes("AI_SCOPE")),
      );
      const iconVisit = failure.routes.find(
        (route) => route.path === "/icon-outside",
      ).visits[0];
      assert.ok(
        iconVisit.errors.some((error) => error.includes("AI_SCOPE: AiIcon")),
      );
      assert.ok(
        iconVisit.ai.ai.some(
          (component) => component.name === "AiIcon" && !component.inScope,
        ),
      );
      assert.ok(
        failure.routes
          .find((route) => route.path === "/dialog-icon-outside")
          .visits[0].errors.some((error) => error.includes("AI_SCOPE: AiIcon")),
      );
      assert.ok(
        failure.routes
          .find((route) => route.path === "/aurora-dialog")
          .visits[0].errors.some((error) =>
            error.includes("AI_SCOPE: UiDialog"),
          ),
      );
      assert.equal(
        readdirSync(join(temporary, "failures")).filter((name) =>
          name.endsWith("-failure.png"),
        ).length,
        16,
      );
      assert.equal(
        JSON.parse(
          readFileSync(join(temporary, "failures/receipt.json"), "utf8"),
        ).status,
        "FAIL",
      );
    } finally {
      rmSync(temporary, { recursive: true, force: true });
    }
  },
);

test("AI component identities come from the pinned public declarations, excluding business Page names and icon maps", () => {
  const names = loadAiComponentNames(root);
  assert.ok(names.includes("AiIcon"));
  assert.ok(names.includes("AiIconProvider"));
  assert.ok(names.includes("WorkspaceSmartTag"));
  assert.ok(names.includes("UiDialog"));
  assert.ok(names.includes("ChatPanel"));
  assert.ok(names.includes("AgreementAssistantPanel"));
  assert.equal(names.length, 16);
  for (const name of [
    "AiChatPage",
    "AiAssistantWorkspacePage",
    "defaultAiIcons",
    "useAssistantWindow",
  ])
    assert.equal(names.includes(name), false);
});

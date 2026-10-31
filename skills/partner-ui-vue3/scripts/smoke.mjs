#!/usr/bin/env node
/** One development smoke per route, with two viewport visits; no permanent component browser suite. */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { createRequire } from "node:module";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  realpathSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { requireProjectTool } from "./tooling.mjs";

const ownFile = fileURLToPath(import.meta.url);
export const DEFAULT_ROUTES = [
  "workbench-list",
  "workbench-detail",
  "workbench-dashboard",
  "ai-assistant-workspace",
  "ai-chat",
  "blank",
].map((name) => ({ path: `/templates/${name}` }));
export const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
];
const evidenceEnabled = (env) =>
  ["PARTNER_UI_EVIDENCE", "SMOKE_EVIDENCE", "WB_EVIDENCE", "AI_EVIDENCE"].some(
    (key) => env[key] === "1",
  );

export function normalizeRoutes(input) {
  const routes = Array.isArray(input) ? input : input?.routes;
  if (!Array.isArray(routes) || routes.length === 0)
    throw new Error("SMOKE_ROUTES: provide a nonempty route array");
  return routes.map((entry) => {
    const route = typeof entry === "string" ? { path: entry } : { ...entry };
    if (
      typeof route.path !== "string" ||
      !route.path.startsWith("/") ||
      route.path.startsWith("//") ||
      /[\r\n]/.test(route.path)
    )
      throw new Error("SMOKE_ROUTES: each route needs a local absolute path");
    if (
      route.readySelector !== undefined &&
      typeof route.readySelector !== "string"
    )
      throw new Error("SMOKE_ROUTES: readySelector must be a selector string");
    return route;
  });
}

export function parseSmokeOptions(args, env = process.env) {
  const options = {
    project: resolve(dirname(ownFile), "../assets/harness"),
    evidence: evidenceEnabled(env),
    routes: DEFAULT_ROUTES,
    timeout: 30000,
  };
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--evidence") options.evidence = true;
    else if (
      ["--project", "--url", "--routes", "--out", "--timeout"].includes(arg)
    ) {
      const value = args[++index];
      if (!value || value.startsWith("--"))
        throw new Error(`SMOKE_OPTIONS: ${arg} requires a value`);
      if (arg === "--project") options.project = resolve(value);
      if (arg === "--out") options.out = resolve(value);
      if (arg === "--url") {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol))
          throw new Error("SMOKE_OPTIONS: --url requires HTTP(S)");
        options.url = url.href;
      }
      if (arg === "--routes")
        options.routes = normalizeRoutes(
          JSON.parse(readFileSync(resolve(value), "utf8")),
        );
      if (arg === "--timeout") {
        options.timeout = Number(value);
        if (!Number.isFinite(options.timeout) || options.timeout < 100)
          throw new Error("SMOKE_OPTIONS: --timeout must be at least 100ms");
      }
    } else throw new Error(`SMOKE_OPTIONS: unknown argument ${arg}`);
  }
  options.out ??= resolve(options.project, ".artifacts/smoke");
  return options;
}

export function validatePageState(
  { consoleErrors = [], vueWarnings = [], pageErrors = [], ai = [] },
  route,
) {
  const errors = [
    ...consoleErrors.map((message) => `console.error: ${message}`),
    ...vueWarnings.map((message) => `Vue warning: ${message}`),
    ...pageErrors.map((message) => `pageerror: ${message}`),
  ];
  for (const component of ai) {
    if (!component.inScope)
      errors.push(`AI_SCOPE: ${component.name} is outside .partner-ai`);
    if (component.panel && component.height < 200)
      errors.push(
        `AI_HEIGHT: ${component.name} is ${component.height}px; minimum is 200px`,
      );
  }
  if (route.expectAI && ai.length === 0)
    errors.push("AI_MISSING: the route expects a mounted AI component");
  return [...new Set(errors)];
}

/** Read the installed package's public declaration entry; never load the runtime library. */
export function loadAiComponentNames(project) {
  const ts = requireProjectTool("typescript", project);
  const compilerOptions = {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
  };
  const containingFile = resolve(project, "__qa_public_types__.ts");
  const entry = ts.resolveModuleName(
    "huawei-partner-ai-ui",
    containingFile,
    compilerOptions,
    ts.sys,
  ).resolvedModule?.resolvedFileName;
  if (!entry || !/\.d\.(?:ts|mts|cts)$/.test(entry))
    throw new Error(
      "AI_PUBLIC_TYPES_REQUIRED: install the pinned huawei-partner-ai-ui package",
    );
  const parseTypes = (file) =>
    ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
  const names = new Set();
  const declarations = parseTypes(entry);
  const modules = new Map();
  function componentType(node) {
    let found = false;
    function visit(type) {
      if (
        ts.isTypeReferenceNode(type) &&
        ["Component", "DefineComponent", "FunctionalComponent"].includes(
          ts.isIdentifier(type.typeName)
            ? type.typeName.text
            : type.typeName.right.text,
        )
      )
        found = true;
      if (
        ts.isImportTypeNode(type) &&
        type.qualifier &&
        ["Component", "DefineComponent", "FunctionalComponent"].includes(
          ts.isIdentifier(type.qualifier)
            ? type.qualifier.text
            : type.qualifier.right.text,
        )
      )
        found = true;
      ts.forEachChild(type, visit);
    }
    if (node) visit(node);
    return found;
  }
  for (const statement of declarations.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      statement.isTypeOnly ||
      !statement.moduleSpecifier ||
      !ts.isStringLiteralLike(statement.moduleSpecifier) ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    )
      continue;
    const specifier = statement.moduleSpecifier.text;
    const exports = statement.exportClause.elements.filter(
      (element) => !element.isTypeOnly,
    );
    if (specifier.endsWith(".vue")) {
      for (const element of exports) names.add(element.name.text);
      continue;
    }
    const target = ts.resolveModuleName(
      specifier,
      entry,
      compilerOptions,
      ts.sys,
    ).resolvedModule?.resolvedFileName;
    if (!target || !/\.d\.(?:ts|mts|cts)$/.test(target)) continue;
    if (!modules.has(target)) modules.set(target, parseTypes(target));
    for (const declaration of modules.get(target).statements) {
      if (!ts.isVariableStatement(declaration)) continue;
      for (const variable of declaration.declarationList.declarations) {
        if (!ts.isIdentifier(variable.name) || !componentType(variable.type))
          continue;
        for (const element of exports)
          if (
            (element.propertyName?.text ?? element.name.text) ===
            variable.name.text
          )
            names.add(element.name.text);
      }
    }
  }
  if (
    !names.has("AiIcon") ||
    !names.has("ChatPanel") ||
    !names.has("AgreementAssistantPanel")
  )
    throw new Error("AI_PUBLIC_COMPONENT_DECLARATIONS_INCOMPLETE");
  return [...names].sort();
}

/** Runs inside the browser. Uses published component classes or explicit host markers. */
export function inspectAiDom(publicNames) {
  if (!Array.isArray(publicNames) || publicNames.length === 0)
    throw new Error("AI_PUBLIC_COMPONENT_NAMES_REQUIRED");
  const aiNames = new Set(publicNames);
  // ChatLayout is a known nested panel, checked in addition to the public package components.
  aiNames.add("ChatLayout");
  const panelName =
    /^(?:ChatPanel|ChatLayout|AgreementAssistantPanel|AiChatPanel|AiAssistantPanel)$/;
  const candidates = new Map();
  const neutralHosts = [];
  // Published HOST_LAYOUT.md: these exact hosts own business/navigation slots and
  // business-region portals. They do not establish the visual AI token scope.
  const neutralHostPolicies = {
    AssistantHostLayout:
      "Neutral layout for business, navigation and assistant slots (public HOST_LAYOUT.md).",
    BusinessOverlayHost:
      "Neutral business-region overlay provider/portal (public HOST_LAYOUT.md).",
  };
  const visible = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      getComputedStyle(element).visibility !== "hidden"
    );
  };
  function add(element, name, panel) {
    if (!(element instanceof Element) || !visible(element)) return;
    const existing = candidates.get(element);
    candidates.set(element, {
      name: existing?.name ?? name,
      inScope: !!element.closest(".partner-ai"),
      height: Math.round(element.getBoundingClientRect().height),
      panel: !!(panel || existing?.panel),
    });
  }
  for (const element of document.querySelectorAll(
    "[data-ai-component], .ai-chat-panel, .ai-assistant-panel, .partner-ai-chat-panel, .tr-container, .tr-chat-panel",
  ))
    add(
      element,
      element.getAttribute("data-ai-component") || element.className,
      true,
    );
  const seen = new Set();
  // Development Vue exposes component owners on DOM nodes, including fragment children.
  for (const element of document.querySelectorAll("#app *")) {
    for (
      let instance = element.__vueParentComponent;
      instance && !seen.has(instance);
      instance = instance.parent
    ) {
      seen.add(instance);
      const name = instance.type?.name || instance.type?.__name || "";
      if (aiNames.has(name)) {
        const owner =
          instance.subTree?.el instanceof Element
            ? instance.subTree.el
            : element;
        const neutralReason =
          neutralHostPolicies[name] ||
          (name === "UiDialog" && instance.props?.theme === "workbench"
            ? "Explicit workbench-themed business dialog; public UiDialog props/HOST_LAYOUT.md allow business-region portals."
            : undefined);
        if (neutralReason) {
          neutralHosts.push({
            name,
            reason: neutralReason,
            inScope: !!owner.closest(".partner-ai"),
          });
          // Continue inspecting descendants: a neutral host never exempts its AI children.
        } else add(owner, name, panelName.test(name));
      }
    }
  }
  return {
    ai: [...candidates.values()],
    neutralHosts,
    scopes: [...document.querySelectorAll(".partner-ai")]
      .filter(visible)
      .map((element) => ({
        height: Math.round(element.getBoundingClientRect().height),
      })),
  };
}

async function reservePort() {
  const server = createServer();
  await new Promise((yes, no) => {
    server.once("error", no);
    server.listen(0, "127.0.0.1", yes);
  });
  const port = server.address().port;
  await new Promise((yes, no) =>
    server.close((error) => (error ? no(error) : yes())),
  );
  return port;
}
async function startDev(project, timeout) {
  const require = createRequire(resolve(project, "package.json"));
  const viteManifest = require.resolve("vite/package.json");
  const manifest = JSON.parse(readFileSync(viteManifest, "utf8"));
  const entry = resolve(
    dirname(viteManifest),
    typeof manifest.bin === "string" ? manifest.bin : manifest.bin.vite,
  );
  const port = await reservePort();
  const url = `http://127.0.0.1:${port}/`;
  const child = spawn(
    process.execPath,
    [entry, "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
    {
      cwd: project,
      env: {
        ...process.env,
        CI: "true",
        PWDEBUG: "0",
        VITE_ENABLE_MOCKS: "false",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let output = "";
  child.stdout.on("data", (chunk) => {
    output = (output + chunk).slice(-10000);
  });
  child.stderr.on("data", (chunk) => {
    output = (output + chunk).slice(-10000);
  });
  const started = Date.now();
  try {
    while (Date.now() - started < timeout) {
      if (child.exitCode !== null)
        throw new Error(`Vite exited with ${child.exitCode}: ${output}`);
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(1000),
        });
        if (response.ok) return { child, url, output: () => output };
      } catch {
        /* Dev process can take a moment to bind. */
      }
      await new Promise((yes) => setTimeout(yes, 100));
    }
    throw new Error(`Vite dev server did not become ready: ${output}`);
  } catch (error) {
    child.kill("SIGTERM");
    throw error;
  }
}

export async function runSmoke(options = {}) {
  const project = resolve(
    options.project ?? resolve(dirname(ownFile), "../assets/harness"),
  );
  const routes = normalizeRoutes(options.routes ?? DEFAULT_ROUTES);
  const timeout = options.timeout ?? 30000;
  const evidence = options.evidence ?? evidenceEnabled(process.env);
  const out = resolve(options.out ?? resolve(project, ".artifacts/smoke"));
  mkdirSync(out, { recursive: true });
  const result = {
    status: "RUNNING",
    scope: "one development smoke per route, two viewport visits",
    evidence,
    routes: [],
    startedAt: new Date().toISOString(),
  };
  const receipt = resolve(out, "receipt.json");
  const save = () =>
    writeFileSync(receipt, JSON.stringify(result, null, 2) + "\n");
  save();
  let dev;
  let browser;
  try {
    dev = options.url ? undefined : await startDev(project, timeout);
    const base = options.url ?? dev.url;
    const { chromium } = requireProjectTool(
      ["@playwright/test", "playwright"],
      project,
    );
    const aiComponentNames = loadAiComponentNames(project);
    result.aiComponentNames = aiComponentNames;
    browser = await chromium.launch({ headless: true });
    for (const route of routes) {
      const routeResult = { path: route.path, status: "PASS", visits: [] };
      for (const viewport of VIEWPORTS) {
        const visit = { viewport, status: "PASS", errors: [] };
        const context = await browser.newContext({ viewport });
        const page = await context.newPage();
        page.setDefaultTimeout(timeout);
        const consoleErrors = [];
        const vueWarnings = [];
        const pageErrors = [];
        page.on("console", (message) => {
          const text = message.text();
          if (message.type() === "error") consoleErrors.push(text);
          if (
            message.type() === "warning" &&
            /\[Vue warn\]|Failed to resolve component/i.test(text)
          )
            vueWarnings.push(text);
        });
        page.on("pageerror", (error) => pageErrors.push(error.message));
        const name = `${route.path.replace(/[^\w-]+/g, "-").replace(/^-|-$/g, "") || "root"}-${viewport.width}x${viewport.height}`;
        try {
          await options.setupPage?.(page, { route, viewport });
          await page.goto(
            new URL(
              route.path.replace(/^\//, ""),
              base.endsWith("/") ? base : base + "/",
            ).href,
            { waitUntil: "domcontentloaded" },
          );
          if (!(await page.locator('script[src*="/@vite/client"]').count()))
            throw new Error(
              "DEV_REQUIRED: smoke requires the Vite development server so Vue warnings remain visible",
            );
          await page.waitForFunction(
            () => !!document.querySelector("#app")?.__vue_app__,
          );
          await page.locator("main").first().waitFor({ state: "visible" });
          if (route.readySelector)
            await page
              .locator(route.readySelector)
              .first()
              .waitFor({ state: "visible" });
          else if (await page.locator("[data-template-ready]").count())
            await page
              .locator('[data-template-ready="true"]')
              .first()
              .waitFor({ state: "visible" });
          await page.evaluate(async () => {
            await document.fonts.ready;
            await new Promise((yes) =>
              requestAnimationFrame(() => requestAnimationFrame(yes)),
            );
          });
          const layout = await page.evaluate(inspectAiDom, aiComponentNames);
          visit.errors = validatePageState(
            { consoleErrors, vueWarnings, pageErrors, ...layout },
            route,
          );
          visit.ai = layout;
          if (visit.errors.length) throw new Error(visit.errors.join("\n"));
          if (evidence) {
            visit.screenshot = resolve(out, name + ".png");
            await page.screenshot({
              path: visit.screenshot,
              fullPage: true,
              animations: "disabled",
            });
          }
        } catch (error) {
          visit.status = "FAIL";
          if (!visit.errors.length) visit.errors.push(error.message);
          visit.consoleErrors = consoleErrors;
          visit.vueWarnings = vueWarnings;
          visit.pageErrors = pageErrors;
          visit.screenshot = resolve(out, name + "-failure.png");
          try {
            await page.screenshot({
              path: visit.screenshot,
              fullPage: true,
              animations: "disabled",
              timeout: 5000,
            });
          } catch {
            delete visit.screenshot;
          }
          try {
            writeFileSync(
              resolve(out, name + "-failure.html"),
              await page.content(),
            );
          } catch {
            /* Browser may have failed before navigation. */
          }
          routeResult.status = "FAIL";
        } finally {
          await context.close();
        }
        routeResult.visits.push(visit);
      }
      result.routes.push(routeResult);
      save();
    }
    result.status = result.routes.some((route) => route.status === "FAIL")
      ? "FAIL"
      : "PASS";
  } catch (error) {
    result.status = "FAIL";
    result.fatalError = error.message;
  } finally {
    await browser?.close();
    if (dev) {
      result.devLog = dev.output();
      dev.child.kill("SIGTERM");
    }
    result.finishedAt = new Date().toISOString();
    save();
  }
  result.receipt = receipt;
  if (result.status !== "PASS") {
    const error = new Error(
      `SMOKE_FAILED: ${
        result.fatalError ??
        result.routes
          .filter((route) => route.status === "FAIL")
          .map((route) => route.path)
          .join(", ")
      }; receipt: ${receipt}`,
    );
    error.result = result;
    throw error;
  }
  return result;
}
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(resolve(process.argv[1])) === realpathSync(ownFile)
) {
  try {
    const result = await runSmoke(parseSmokeOptions(process.argv.slice(2)));
    console.log(
      `PASS: ${result.routes.length} route smoke(s), two viewports each; receipt: ${result.receipt}`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

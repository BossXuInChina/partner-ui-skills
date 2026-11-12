#!/usr/bin/env node
import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import {
  basename,
  dirname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";

const ownFile = fileURLToPath(import.meta.url);
const defaultSkillRoot = resolve(dirname(ownFile), "..");
export const FEATURE_TEMPLATES = Object.freeze({
  blank: { api: "BlankApi", operations: ["primary"] },
  "workbench-list": {
    api: "WorkbenchListApi",
    operations: [
      "load",
      "create",
      "renew",
      "terminate",
      "exportRows",
      "openDetail",
    ],
  },
  "workbench-detail": {
    api: "WorkbenchDetailApi",
    operations: ["load", "save", "renew", "copy", "exportPdf"],
  },
  "workbench-dashboard": {
    api: "WorkbenchDashboardApi",
    operations: ["load", "perform"],
  },
  "ai-chat": {
    api: "AiChatApi",
    operations: ["stream", "navigate"],
    storage: "ChatHistoryStorage",
  },
  "ai-assistant-workspace": {
    api: "AssistantWorkspaceApi",
    operations: [
      "listAgreements",
      "listInsights",
      "assistant.stream",
      "assistant.updateAgreement",
      "assistant.renewAgreement",
      "renew",
      "navigate",
    ],
    storage: "WorkspaceHistoryStorage",
  },
});
const normalize = (file) => file.replaceAll("\\", "/");
const inside = (root, file) => {
  const path = relative(root, file);
  return (
    path === "" ||
    (path !== ".." && !path.startsWith(".." + sep) && !isAbsolute(path))
  );
};
const readJSON = (file) => JSON.parse(readFileSync(file, "utf8"));
const statIfPresent = (file) => {
  try {
    return lstatSync(file);
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw error;
  }
};

function lockRootFor(skillRoot) {
  if (existsSync(resolve(skillRoot, "source.lock.json"))) return skillRoot;
  const maintenance = resolve(skillRoot, "../..");
  if (
    normalize(relative(maintenance, skillRoot)) === "skills/partner-ui-vue3" &&
    existsSync(resolve(maintenance, "package.json")) &&
    readJSON(resolve(maintenance, "package.json")).name === "partner-ui-skills"
  )
    return maintenance;
  throw new Error(
    "FEATURE_SOURCE_LOCK_MISSING: use a complete generated Skill",
  );
}
function readFeatureSkillVersion(skillRoot) {
  const file = resolve(skillRoot, "skill.json");
  const stat = statIfPresent(file);
  if (!stat)
    return {
      version: null,
      reason: "No skill.json exists at the source Skill root; skillVersion is null. Package, runtime and maintenance versions are not substitutes.",
    };
  if (stat.isSymbolicLink() || !stat.isFile())
    throw new Error(
      "FEATURE_SKILL_DECLARATION_INVALID: skill.json must be a regular file",
    );
  let declaration;
  try {
    declaration = readJSON(file);
  } catch {
    throw new Error(
      "FEATURE_SKILL_DECLARATION_INVALID: skill.json must contain valid JSON",
    );
  }
  if (declaration?.name !== "partner-ui-vue3")
    throw new Error("FEATURE_SKILL_NAME_INVALID: expected partner-ui-vue3");
  // SemVer 2.0.0: numeric identifiers have no leading zeroes; build metadata may.
  const semver =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
  if (
    typeof declaration.version !== "string" ||
    !semver.test(declaration.version)
  )
    throw new Error(
      "FEATURE_SKILL_VERSION_INVALID: skill.json version must be valid SemVer",
    );
  return { version: declaration.version, reason: null };
}
function tarDocument(archive, member) {
  let offset = 0;
  while (offset + 512 <= archive.length) {
    const header = archive.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const field = (start, size) =>
      header
        .subarray(start, start + size)
        .toString("utf8")
        .split("\0")[0];
    const rawSize = field(124, 12).trim();
    if (!/^[0-7]+$/.test(rawSize))
      throw new Error("FEATURE_TAR_HEADER_INVALID");
    const size = Number.parseInt(rawSize, 8);
    const start = offset + 512;
    if (
      !Number.isSafeInteger(size) ||
      size < 0 ||
      start + size > archive.length
    )
      throw new Error("FEATURE_TAR_TRUNCATED");
    const prefix = field(345, 155);
    const name = (prefix ? prefix + "/" : "") + field(0, 100);
    if (name === member) {
      if (size > 2 * 1024 * 1024 || !["", "0"].includes(field(156, 1)))
        throw new Error("FEATURE_TAR_DOCUMENT_INVALID");
      return JSON.parse(archive.subarray(start, start + size).toString("utf8"));
    }
    offset = start + Math.ceil(size / 512) * 512;
  }
  throw new Error("FEATURE_TAR_DOCUMENT_MISSING:" + member);
}
function publicDocument(entry) {
  const target =
    typeof entry === "string" ? entry : (entry?.import ?? entry?.default);
  if (
    typeof target !== "string" ||
    !target.startsWith("./") ||
    target.includes("\\") ||
    target.split("/").includes("..")
  )
    throw new Error("FEATURE_PUBLIC_METADATA_INVALID");
  return "package/" + target.slice(2);
}
export function readFeaturePackageIdentity(skillRoot = defaultSkillRoot) {
  const root = lockRootFor(resolve(skillRoot));
  const lock = readJSON(resolve(root, "source.lock.json"));
  const expected = ["@workbench/ui-vue3", "huawei-partner-ai-ui"];
  if (
    lock.schemaVersion !== "1.0" ||
    !Array.isArray(lock.packages) ||
    JSON.stringify(lock.packages.map((entry) => entry.name).sort()) !==
      JSON.stringify([...expected].sort())
  )
    throw new Error("FEATURE_SOURCE_LOCK_INVALID");
  const vendor = realpathSync(resolve(root, "vendor"));
  const packages = lock.packages.map((entry) => {
    if (
      !/^[a-f0-9]{64}$/.test(entry.sha256 ?? "") ||
      !/^[a-f0-9]{40}$/.test(entry.sourceCommit ?? "") ||
      !/^vendor\/[a-z0-9][a-z0-9._-]*\.tgz$/.test(entry.tarball ?? "")
    )
      throw new Error("FEATURE_PACKAGE_IDENTITY_INVALID");
    const tarball = realpathSync(resolve(root, entry.tarball));
    if (!inside(vendor, tarball))
      throw new Error("FEATURE_ARCHIVE_ESCAPES_VENDOR");
    const compressed = readFileSync(tarball);
    if (createHash("sha256").update(compressed).digest("hex") !== entry.sha256)
      throw new Error("FEATURE_ARCHIVE_SHA_MISMATCH:" + entry.name);
    const archive = gunzipSync(compressed, {
      maxOutputLength: 512 * 1024 * 1024,
    });
    const manifest = tarDocument(archive, "package/package.json");
    if (manifest.name !== entry.name || manifest.version !== entry.version)
      throw new Error("FEATURE_PACKAGE_IDENTITY_MISMATCH");
    const release = tarDocument(
      archive,
      publicDocument(manifest.exports?.["./release.json"]),
    );
    if (
      release.packageName !== entry.name ||
      release.version !== entry.version ||
      release.sourceCommit !== entry.sourceCommit
    )
      throw new Error("FEATURE_RELEASE_IDENTITY_MISMATCH");
    const status = Object.fromEntries(
      Object.entries(release).filter(
        ([key]) =>
          ["channel", "releaseChannel", "status"].includes(key) ||
          key.endsWith("Eligible"),
      ),
    );
    return {
      name: entry.name,
      version: entry.version,
      source: {
        kind: "tarball",
        file: entry.tarball,
        sha256: entry.sha256,
        scope: "skill-lock",
        copiedToFeature: false,
      },
      sourceCommit: entry.sourceCommit,
      sourceHasLocalChanges:
        typeof release.sourceHasLocalChanges === "boolean"
          ? release.sourceHasLocalChanges
          : null,
      status,
      peerVue: manifest.peerDependencies?.vue ?? null,
    };
  });
  return { root, lock, packages };
}

function sourceTree(directory) {
  const files = [];
  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true }).sort(
      (a, b) => a.name.localeCompare(b.name),
    )) {
      const file = resolve(current, entry.name);
      if (entry.isSymbolicLink())
        throw new Error("FEATURE_SOURCE_SYMLINK:" + file);
      if (entry.isDirectory()) {
        if (
          ![
            "node_modules",
            "vendor",
            "dist",
            ".git",
            ".artifacts",
            ".cache",
          ].includes(entry.name)
        )
          walk(file);
      } else if (entry.isFile() && /\.(?:ts|vue|css|json)$/.test(file))
        files.push(file);
    }
  }
  walk(directory);
  return files;
}
function scaffoldImports(source) {
  return [
    ...source.matchAll(
      /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]@scaffold\/([^'"]+)['"]/g,
    ),
  ].map((match) => match[1]);
}
function sourceTarget(root, path) {
  if (
    !/^[a-zA-Z0-9_./-]+$/.test(path) ||
    path.split("/").includes("..") ||
    path.startsWith("/")
  )
    throw new Error("FEATURE_SCAFFOLD_PATH_INVALID");
  for (const suffix of ["", ".ts", ".vue", ".css", "/index.ts"]) {
    const file = resolve(root, path + suffix);
    if (!inside(root, file)) throw new Error("FEATURE_SCAFFOLD_PATH_INVALID");
    const stat = statIfPresent(file);
    if (!stat) continue;
    if (
      stat.isSymbolicLink() ||
      !inside(realpathSync(root), realpathSync(file))
    )
      throw new Error("FEATURE_SOURCE_SYMLINK:" + file);
    if (stat.isFile()) return file;
  }
  throw new Error("FEATURE_SCAFFOLD_MODULE_MISSING:" + path);
}
function publicBindings(text) {
  const names = new Set();
  for (const match of text.matchAll(
    /\bimport\s*{([^}]+)}\s*from\s*['"](?:@workbench\/ui-vue3|huawei-partner-ai-ui)['"]/g,
  ))
    for (const part of match[1].split(",")) {
      const binding = part.trim();
      if (
        !binding.startsWith("type ") &&
        /^[A-Z]\w*(?:\s+as\s+\w+)?$/.test(binding)
      )
        names.add(binding.split(/\s+/)[0]);
    }
  for (const match of text.matchAll(
    /import\(\s*['"]huawei-partner-ai-ui['"]\s*\)\.then\(\s*\(?\s*(\w+)\s*\)?\s*=>\s*\1\.([A-Z]\w*)/g,
  ))
    names.add(match[2]);
  return [...names];
}
function draftDelivery(name, template, identity, files, skillVersion) {
  const page = `pages/${template}/Page.vue`;
  const components = [
    ...new Set([...files.values()].flatMap(publicBindings)),
  ].sort();
  const customComponents = [...files.keys()]
    .filter((file) => file.endsWith(".vue") && file !== page)
    .map((file) => ({
      name: basename(file, ".vue"),
      file,
      reason:
        "Selected template/scaffold composition using public package APIs; adapt its feature-owned behavior to the product requirements.",
      suggestedPackageComponent: null,
    }));
  if (template === "workbench-dashboard")
    customComponents.push({
      name: "DashboardTrendChart",
      file: page,
      reason:
        "Feature-owned token-based SVG trend chart; no product chart library is integrated.",
      suggestedPackageComponent: null,
    });
  return {
    feature: name,
    skillVersion: skillVersion.version,
    generatedAt: new Date().toISOString(),
    template,
    packages: identity.packages.map((entry) => {
      const copy = { ...entry };
      delete copy.peerVue;
      return copy;
    }),
    vue: {
      peerRequired: Object.fromEntries(
        identity.packages.map((entry) => [entry.name, entry.peerVue]),
      ),
      requested: "3.5.13",
      resolved: null,
      singleInstance: null,
    },
    pages: [{ route: "/" + name, file: page, components }],
    customComponents,
    api: FEATURE_TEMPLATES[template].operations.map((operation) => ({
      name: `${FEATURE_TEMPLATES[template].api}.${operation}`,
      method: null,
      path: null,
      status: "assumed",
      contract: `pages/${template}/api.ts`,
    })),
    requirements: [
      {
        id: "R1",
        text: "Adapt the selected template to the actual product requirements and host contracts.",
        files: [page, `pages/${template}/usePage.ts`],
        status: "to-confirm",
      },
    ],
    checks: [
      "typecheck",
      "lint",
      "check:rules",
      "unit",
      "build",
      "smoke",
      "visual-parity",
    ].map((check) => ({
      name: check,
      command: null,
      result: "not-run",
      durationMs: null,
    })),
    bundle: {
      routeChunksKb: [
        {
          route: "/" + name,
          entryFiles: [],
          staticKb: null,
          dynamicKb: null,
          sharedFiles: [],
        },
      ],
      notes: [
        "Not built; no byte or TinyRobot initial-closure claim is made. Raw KB = emitted bytes / 1024.",
      ],
    },
    knownLimits: [
      ...(skillVersion.reason ? [skillVersion.reason] : []),
      "This is a source starting point; host installation, actual requirements, API/auth/platform integration and verification are not completed.",
      "Package source.file is relative to the source Skill lock root; archives are verified inputs and are not copied into this feature. Update source.file/scope after the host vendors and installs them.",
      "Package status is copied without changing eligibility; AI UI release currently has no production-eligibility claim.",
      "Host supplies approved fonts. Persistence defaults off. No production approval or external release action is included.",
    ],
  };
}
export function renderFeatureDelivery(manifest) {
  return `# ${manifest.feature} 交付草稿\n\n由 delivery.json 生成；当前是功能源码起点。\n\n- 模板：${manifest.template}\n- 页面：${manifest.pages.map((page) => `${page.route} → ${page.file}`).join("; ")}\n- Skill 版本：${manifest.skillVersion ?? "未声明（null）"}\n- API：${manifest.api.length} 项，全部 assumed，method/path 未确认\n- 检查：${manifest.checks.map((check) => `${check.name}=${check.result}`).join("; ")}\n- 体积：未构建、未测量\n\n## 包来源\n\n${manifest.packages.map((entry) => `- ${entry.name}@${entry.version}; source commit ${entry.sourceCommit}; SHA-256 ${entry.source.sha256}; status ${JSON.stringify(entry.status)}`).join("\n")}\n\n## 未解决事项\n\n${manifest.knownLimits.map((limit) => "- " + limit).join("\n")}\n`;
}
function integrationNotes(name, template, identity) {
  const ai = !!FEATURE_TEMPLATES[template].storage;
  return `# ${name} 接入起点\n\n此目录未安装依赖、未改宿主配置，所有检查均未运行。工具脚本可在Node22.12执行；附带pnpm11.22验证工程实际需要Node22.13+，产品遵循自身工具链约定。按宿主已有 router/store/transport/i18n/测试约定接入；API 契约在 pages/${template}/api.ts，当前为 assumed。真实 URL/鉴权/decoder/幂等与权限由宿主实现并注入，不能直接使用 harness 的验证端点。\n\n## 文件与路由\n\n从本模块 index.ts 导入 createFeatureRoutes(api${ai ? ", options?" : ""})，把返回记录接入宿主 router；Page 按需加载，路由为 /${name}。Page 可通过 loadFeaturePage() 动态加载后直接组合使用。不要静态导入整个 AI 页面来替代懒路由。\n\n已复制所选模板的源码、单测和 mocks，仅递归复制实际需要的 scaffold。@scaffold 引用已改成模块内相对路径，不要求宿主增加或覆盖同名全局 alias。feature-dom.d.ts 仅声明标准 data-* DOM 属性；确保宿主 tsconfig 包含本目录。生产入口不导入 mocks 或测试；测试数据必须明确启用，产品构建需保留等价 mock guard。\n\nindex.ts 引入 styles/layout.css。应用入口各导入一次 ${ai || template === "workbench-dashboard" ? "Workbench CSS、TinyRobot 公开样式、AI UI CSS，保持此顺序" : "Workbench CSS"}；需要 AI 的实际调用顺序参见 Skill integration.md。字体由宿主通过 --partner-ui-host-font-family 提供，功能无字体。${ai ? `\nAI Page 的 API 与 historyNamespace 均必填；routes factory 默认给 partner-feature-${name}，多账号/租户应由宿主再隔离。storage 默认不注入，workspace persistHistory 默认 false，不自动访问 localStorage。真实续传能力只有后端支持后才接入。` : ""}\n\n## 依赖与来源\n\n依赖安装位置由宿主确定，工具不会执行安装。以下 tarball 来自原 Skill 的 vendor/，未复制进本功能：\n\n${identity.packages.map((entry) => `- ${entry.name}@${entry.version}: file:<Skill根>/${entry.source.file}; SHA-256 ${entry.source.sha256}`).join("\n")}\n\nVue 目标3.5.13；router使用宿主的vue-router 4，Vue peer范围见delivery.json。直接使用TinyRobot组件/类型的功能须在产品声明@opentiny/tiny-robot@0.5.1；当前scaffold关闭按钮使用其公开TrActionButton。不要依赖传递依赖恰好可解析。API/测试按实际消费还需要Vue、Vitest、@vue/test-utils和宿主现有SFC构建工具。\n\n交付草稿的 source.file 按原 Skill 锁根解析（scope=skill-lock），不声称本目录已经包含或安装tarball。宿主vendor并安装后更新真实位置、resolved Vue和单实例证据。\n\n## 验证后更新清单\n\n用宿主实际命令完成类型、Lint、规则、单测、构建及headless smoke；check_vue.mjs可对本目录运行。先确认业务加载/空/错误/取消/防重/显式重试和键盘路径。\n\n若沿用附带routeChunkReport，在验证工程副本配置实际位置，例如 routes:[{route:'/${name}',file:'src/features/${name}/pages/${template}/Page.vue',business:${!ai}}]；不要保留默认六路归因来验证单个模块。插件不在本次生成物中复制。\n\n记录实际路由静态/动态/共享闭包与TinyRobot位置，再把delivery.json的not-run/null改为真实结果；当前API、平台、视觉对照与生产资格均未验证。DELIVERY.md须从更新后的delivery.json重新生成，保持一致。\n`;
}
export function createFeature({
  name,
  template = "blank",
  directory,
  skillRoot = defaultSkillRoot,
} = {}) {
  if (
    typeof name !== "string" ||
    name.length > 64 ||
    !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)
  )
    throw new Error(
      "FEATURE_NAME_INVALID: use a lowercase kebab-case slug (max 64 characters)",
    );
  if (!Object.hasOwn(FEATURE_TEMPLATES, template))
    throw new Error("FEATURE_TEMPLATE_UNKNOWN:" + template);
  const sourceRoot = realpathSync(resolve(skillRoot));
  const requested = resolve(directory ?? name);
  const parent = realpathSync(dirname(requested));
  if (!lstatSync(parent).isDirectory())
    throw new Error("FEATURE_PARENT_NOT_DIRECTORY");
  const destination = resolve(parent, basename(requested));
  if (inside(sourceRoot, destination) || inside(destination, sourceRoot))
    throw new Error("FEATURE_DESTINATION_OVERLAPS_SKILL");
  if (statIfPresent(destination))
    throw new Error("FEATURE_DESTINATION_EXISTS:" + destination);
  const skillVersion = readFeatureSkillVersion(sourceRoot);
  const identity = readFeaturePackageIdentity(sourceRoot);
  if (inside(resolve(identity.root, "vendor"), destination))
    throw new Error("FEATURE_DESTINATION_OVERLAPS_VENDOR");
  const templateRoot = resolve(sourceRoot, "assets/templates", template);
  const scaffoldRoot = resolve(sourceRoot, "assets/scaffold");
  for (const input of [
    templateRoot,
    scaffoldRoot,
    resolve(sourceRoot, "assets/templates/shared/layout.css"),
    resolve(sourceRoot, "assets/harness/src/feature-dom.d.ts"),
  ]) {
    if (
      lstatSync(input).isSymbolicLink() ||
      !inside(sourceRoot, realpathSync(input))
    )
      throw new Error("FEATURE_SOURCE_SYMLINK:" + input);
  }
  const files = new Map();
  for (const source of sourceTree(templateRoot))
    files.set(
      `pages/${template}/${normalize(relative(templateRoot, source))}`,
      readFileSync(source, "utf8"),
    );
  if (
    !files.has(`pages/${template}/Page.vue`) ||
    !files.has(`pages/${template}/api.ts`)
  )
    throw new Error("FEATURE_TEMPLATE_INCOMPLETE");
  const queued = [...files.values()].flatMap(scaffoldImports);
  const copied = new Set();
  while (queued.length) {
    const suffix = queued.pop();
    const source = sourceTarget(scaffoldRoot, suffix);
    if (copied.has(source)) continue;
    copied.add(source);
    const content = readFileSync(source, "utf8");
    const file = "scaffold/" + normalize(relative(scaffoldRoot, source));
    files.set(file, content);
    queued.push(...scaffoldImports(content));
    // Scaffold modules use relative imports internally; include their local closure too.
    for (const match of content.matchAll(
      /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"](\.[^'"]+)['"]/g,
    )) {
      const imported = normalize(
        relative(scaffoldRoot, resolve(dirname(source), match[1])),
      );
      sourceTarget(scaffoldRoot, imported);
      queued.push(imported);
    }
  }
  for (const [file, content] of files)
    files.set(
      file,
      content.replace(
        /(['"])@scaffold\/([^'"]+)\1/g,
        (_match, quote, suffix) => {
          const target = resolve("feature", "scaffold", suffix);
          let specifier = normalize(
            relative(dirname(resolve("feature", file)), target),
          );
          if (!specifier.startsWith(".")) specifier = "./" + specifier;
          return quote + specifier + quote;
        },
      ),
    );
  files.set(
    "styles/layout.css",
    readFileSync(
      resolve(sourceRoot, "assets/templates/shared/layout.css"),
      "utf8",
    ),
  );
  files.set(
    "feature-dom.d.ts",
    readFileSync(
      resolve(sourceRoot, "assets/harness/src/feature-dom.d.ts"),
      "utf8",
    ),
  );
  const definition = FEATURE_TEMPLATES[template];
  const storageImport = definition.storage
    ? `import type { ${definition.storage} } from './pages/${template}/types';\n`
    : "";
  const optionsType = definition.storage
    ? `, options: { historyNamespace?: string; storage?: ${definition.storage}${template === "ai-assistant-workspace" ? "; persistHistory?: boolean" : ""} } = {}`
    : "";
  const extraProps = definition.storage
    ? `, historyNamespace: options.historyNamespace ?? 'partner-feature-${name}', ...(options.storage ? { storage: options.storage } : {})${template === "ai-assistant-workspace" ? ", persistHistory: options.persistHistory ?? false" : ""}`
    : "";
  files.set(
    "routes.ts",
    `import type { RouteRecordRaw } from 'vue-router';\nimport type { ${definition.api} } from './pages/${template}/api';\n${storageImport}\nexport function createFeatureRoutes(api: ${definition.api}${optionsType}): RouteRecordRaw[] {\n  return [{ path: '/${name}', name: '${name}', component: () => import('./pages/${template}/Page.vue'), props: () => ({ api${extraProps} }) }];\n}\n`,
  );
  files.set(
    "index.ts",
    `import './styles/layout.css';\nexport { createFeatureRoutes } from './routes';\nexport type { ${definition.api} } from './pages/${template}/api';\nexport const loadFeaturePage = () => import('./pages/${template}/Page.vue');\n`,
  );
  const manifest = draftDelivery(name, template, identity, files, skillVersion);
  files.set("delivery.json", JSON.stringify(manifest, null, 2) + "\n");
  files.set("DELIVERY.md", renderFeatureDelivery(manifest));
  files.set("INTEGRATION.md", integrationNotes(name, template, identity));
  const scratch = mkdtempSync(resolve(parent, "." + name + "-staging-"));
  let reservation;
  try {
    for (const [file, content] of files) {
      const target = resolve(scratch, file);
      if (!inside(scratch, target))
        throw new Error("FEATURE_OUTPUT_PATH_INVALID");
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, content, { flag: "wx" });
    }
    // Reserve the target before publishing. Windows cannot rename a directory
    // over an existing directory, even when it is empty; remove our empty
    // reservation first there. Windows then refuses an already-existing target.
    mkdirSync(destination);
    reservation = lstatSync(destination);
    if (process.platform === "win32") {
      rmdirSync(destination);
      reservation = undefined;
    }
    renameSync(scratch, destination);
    reservation = undefined;
    return {
      directory: destination,
      template,
      files: [...files.keys()].sort(),
      manifest,
    };
  } catch (error) {
    if (reservation) {
      const current = statIfPresent(destination);
      if (
        current?.ino === reservation.ino &&
        current?.dev === reservation.dev
      ) {
        try {
          rmdirSync(destination);
        } catch {
          /* Never recursively remove a nonempty destination. */
        }
      }
    }
    throw error;
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}
export function parseNewFeatureOptions(args) {
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === "--help" || argument === "-h") options.help = true;
    else if (argument === "--json") options.json = true;
    else if (argument === "--template" || argument === "--out") {
      const value = args[++index];
      if (!value || value.startsWith("--"))
        throw new Error(argument + " requires a value");
      options[argument === "--template" ? "template" : "directory"] = value;
    } else if (argument.startsWith("-") || options.name)
      throw new Error("Unexpected argument: " + argument);
    else options.name = argument;
  }
  return options;
}
function main(args) {
  const options = parseNewFeatureOptions(args);
  if (options.help) {
    console.log(
      "Usage: node new_feature.mjs <kebab-case-name> [--template " +
        Object.keys(FEATURE_TEMPLATES).join("|") +
        "] [--out <new-directory>] [--json]\nDefault template: blank. Default output: ./<name>. The parent must exist; existing targets are never overwritten. Creates source, integration notes and an unverified delivery draft; does not install dependencies or edit host configuration.",
    );
    return;
  }
  const result = createFeature(options);
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else
    console.log(
      `Created ${result.directory} from ${result.template}: ${result.files.length} files. Read INTEGRATION.md; delivery checks are not-run.`,
    );
}
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(resolve(process.argv[1])) === realpathSync(ownFile)
) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

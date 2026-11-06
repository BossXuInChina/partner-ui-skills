import test from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createFeature,
  FEATURE_TEMPLATES,
  readFeaturePackageIdentity,
  renderFeatureDelivery,
} from "../skills/partner-ui-vue3/scripts/new_feature.mjs";
import {
  findIcons,
  loadIconRegistry,
} from "../skills/partner-ui-vue3/scripts/find_icon.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skill = resolve(root, "skills/partner-ui-vue3");
const featureScript = resolve(skill, "scripts/new_feature.mjs");
const iconScript = resolve(skill, "scripts/find_icon.mjs");
const temporary = () =>
  mkdtempSync(resolve(tmpdir(), "partner-feature-tools-"));
function portableSkill(parent) {
  const portable = resolve(parent, "skill");
  for (const path of ["assets/templates", "assets/scaffold"])
    cpSync(resolve(skill, path), resolve(portable, path), { recursive: true });
  mkdirSync(resolve(portable, "assets/harness/src"), { recursive: true });
  cpSync(
    resolve(skill, "assets/harness/src/feature-dom.d.ts"),
    resolve(portable, "assets/harness/src/feature-dom.d.ts"),
  );
  cpSync(resolve(skill, "skill.json"), resolve(portable, "skill.json"));
  mkdirSync(resolve(portable, "scripts"));
  for (const name of ["new_feature.mjs", "find_icon.mjs"])
    cpSync(resolve(skill, "scripts", name), resolve(portable, "scripts", name));
  mkdirSync(resolve(portable, "references"));
  cpSync(
    resolve(skill, "references/icons.json"),
    resolve(portable, "references/icons.json"),
  );
  cpSync(
    resolve(root, "source.lock.json"),
    resolve(portable, "source.lock.json"),
  );
  cpSync(resolve(root, "vendor"), resolve(portable, "vendor"), {
    recursive: true,
  });
  return portable;
}
function runScript(script, args, cwd = root) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd,
    env: { ...process.env, PATH: "" },
    encoding: "utf8",
  });
}

test("all six source templates produce closed feature starts and truthful unverified manifests", () => {
  const parent = temporary();
  const originalLock = readFileSync(resolve(root, "source.lock.json"), "utf8");
  const originalManifest = readFileSync(resolve(root, "package.json"), "utf8");
  try {
    for (const template of Object.keys(FEATURE_TEMPLATES)) {
      const name = "feature-" + template;
      const result = createFeature({
        name,
        template,
        directory: resolve(parent, name),
      });
      assert.ok(
        existsSync(resolve(result.directory, `pages/${template}/Page.vue`)),
      );
      assert.ok(existsSync(resolve(result.directory, "styles/layout.css")));
      assert.ok(existsSync(resolve(result.directory, "feature-dom.d.ts")));
      assert.ok(result.files.some((file) => file.includes("/mocks/")));
      assert.ok(result.files.some((file) => file.includes("/__tests__/")));
      assert.ok(
        !result.files.some((file) => /\.(?:ttf|otf|woff2?|tgz)$/.test(file)),
      );
      assert.equal(existsSync(resolve(result.directory, "vendor")), false);
      for (const file of result.files.filter((file) =>
        /\.(?:ts|vue)$/.test(file),
      )) {
        const source = readFileSync(resolve(result.directory, file), "utf8");
        assert.doesNotMatch(source, /['"]@scaffold\//);
        for (const match of source.matchAll(
          /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"](\.[^'"]+)['"]/g,
        )) {
          const candidate = resolve(
            dirname(resolve(result.directory, file)),
            match[1],
          );
          assert.ok(
            ["", ".ts", ".vue", ".css", "/index.ts"].some((suffix) =>
              existsSync(candidate + suffix),
            ),
            `${template}: unresolved ${match[1]} in ${file}`,
          );
        }
      }
      const manifest = JSON.parse(
        readFileSync(resolve(result.directory, "delivery.json"), "utf8"),
      );
      assert.equal(manifest.skillVersion, "0.1.1");
      assert.ok(
        manifest.knownLimits.every((limit) => !limit.includes("skillVersion is null")),
      );
      assert.equal(manifest.vue.resolved, null);
      assert.equal(manifest.vue.singleInstance, null);
      assert.ok(
        manifest.checks.every(
          (check) => check.result === "not-run" && check.durationMs === null,
        ),
      );
      assert.ok(
        manifest.api.every(
          (api) =>
            api.status === "assumed" &&
            api.path === null &&
            api.method === null,
        ),
      );
      assert.equal(manifest.pages[0].route, "/" + name);
      assert.ok(manifest.pages[0].components.includes("WorkbenchTopNav"));
      assert.equal(
        readFileSync(resolve(result.directory, "DELIVERY.md"), "utf8"),
        renderFeatureDelivery(manifest),
      );
      assert.doesNotMatch(
        readFileSync(resolve(result.directory, "index.ts"), "utf8"),
        /export\s*{\s*default\s+as/,
      );
      if (template === "blank")
        assert.equal(
          result.files.some((file) => file.startsWith("scaffold/")),
          false,
        );
      if (template === "ai-chat")
        assert.ok(manifest.pages[0].components.includes("ChatPanel"));
      if (template === "ai-assistant-workspace")
        assert.ok(
          manifest.pages[0].components.includes("AgreementAssistantPanel"),
        );
    }
    assert.equal(
      readFileSync(resolve(root, "source.lock.json"), "utf8"),
      originalLock,
    );
    assert.equal(
      readFileSync(resolve(root, "package.json"), "utf8"),
      originalManifest,
    );
    assert.ok(readdirSync(parent).every((name) => !name.includes("staging")));
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("all independent Skills declare their version and user-controlled releases", () => {
  for (const name of ["partner-ui-vue3", "partner-ui-pages", "partner-ui-review"]) {
    const declaration = JSON.parse(
      readFileSync(resolve(root, "skills", name, "skill.json"), "utf8"),
    );
    assert.equal(declaration.name, name);
    assert.equal(declaration.version, { "partner-ui-pages": "0.1.0", "partner-ui-vue3": "0.1.1", "partner-ui-review": "0.1.2" }[name]);
    assert.equal(declaration.releasePolicy, "user-decides");
  }
});
test("a missing Skill declaration preserves null without borrowing package or runtime versions", () => {
  const parent = temporary();
  try {
    const portable = portableSkill(parent);
    unlinkSync(resolve(portable, "skill.json"));
    writeFileSync(
      resolve(portable, "package.json"),
      JSON.stringify({
        name: "partner-ui-vue3",
        version: "99.0.0",
        runtimeVersion: "88.0.0",
      }),
    );
    const result = createFeature({
      name: "no-declaration",
      skillRoot: portable,
      directory: resolve(parent, "no-declaration"),
    });
    assert.equal(result.manifest.skillVersion, null);
    assert.ok(
      result.manifest.knownLimits.some((limit) =>
        /No skill.json.*source Skill root.*skillVersion is null/.test(limit),
      ),
    );
    assert.match(
      readFileSync(resolve(result.directory, "DELIVERY.md"), "utf8"),
      /未声明（null）/,
    );
    assert.equal(
      readFileSync(resolve(result.directory, "DELIVERY.md"), "utf8"),
      renderFeatureDelivery(result.manifest),
    );
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("invalid Skill declarations fail without partial output or fallback versions", () => {
  const parent = temporary();
  try {
    const portable = portableSkill(parent);
    const script = resolve(portable, "scripts/new_feature.mjs");
    const invalid = [
      ["{", /FEATURE_SKILL_DECLARATION_INVALID/],
      [
        JSON.stringify({ name: "partner-ui-pages", version: "0.1.0" }),
        /FEATURE_SKILL_NAME_INVALID/,
      ],
      ...[
        null, 1, "", "0.1", "v0.1.0", "01.1.0", "0.1.0-01", "0.1.0+", "0.1.0\n",
      ].map((version) => [
        JSON.stringify({ name: "partner-ui-vue3", version, runtimeVersion: "0.1.0" }),
        /FEATURE_SKILL_VERSION_INVALID/,
      ]),
      [
        JSON.stringify({ name: "partner-ui-vue3", runtimeVersion: "0.1.0" }),
        /FEATURE_SKILL_VERSION_INVALID/,
      ],
    ];
    for (const [index, [declaration, error]] of invalid.entries()) {
      writeFileSync(resolve(portable, "skill.json"), declaration);
      const destination = resolve(parent, "invalid-" + index);
      const result = runScript(
        script,
        ["invalid-skill", "--out", destination, "--json"],
        parent,
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, error);
      assert.equal(result.stdout, "");
      assert.equal(existsSync(destination), false);
      assert.ok(readdirSync(parent).every((name) => !name.includes("staging")));
    }
    writeFileSync(
      resolve(portable, "skill.json"),
      JSON.stringify({ name: "partner-ui-vue3", version: "1.2.3-rc.1+build.001" }),
    );
    const result = createFeature({
      name: "valid-semver",
      skillRoot: portable,
      directory: resolve(parent, "valid-semver"),
    });
    assert.equal(result.manifest.skillVersion, "1.2.3-rc.1+build.001");
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("package identity comes from verified tarballs and preserves the release claims", () => {
  const identity = readFeaturePackageIdentity();
  const lock = JSON.parse(
    readFileSync(resolve(root, "source.lock.json"), "utf8"),
  );
  for (const entry of identity.packages) {
    const pinned = lock.packages.find((item) => item.name === entry.name);
    assert.equal(entry.source.sha256, pinned.sha256);
    assert.equal(entry.sourceCommit, pinned.sourceCommit);
    assert.equal(entry.version, pinned.version);
    assert.equal(entry.source.scope, "skill-lock");
    assert.equal(entry.source.copiedToFeature, false);
  }
  assert.equal(
    identity.packages.find((entry) => entry.name === "@workbench/ui-vue3")
      .status.targetProductionEligible,
    false,
  );
  assert.deepEqual(
    identity.packages.find((entry) => entry.name === "huawei-partner-ai-ui")
      .status,
    {},
  );
});
test("unsafe names, unknown templates, existing directories and dangling target symlinks never overwrite", () => {
  const parent = temporary();
  try {
    for (const name of [
      "",
      "..",
      "../escape",
      "a/../b",
      "a\\b",
      "UpperCase",
      "-name",
      "a--b",
      "x$(id)",
      "1name",
      "a".repeat(65),
    ])
      assert.throws(
        () =>
          createFeature({ name, directory: resolve(parent, "destination") }),
        /FEATURE_NAME_INVALID/,
      );
    assert.throws(
      () =>
        createFeature({
          name: "safe",
          template: "../blank",
          directory: resolve(parent, "destination"),
        }),
      /FEATURE_TEMPLATE_UNKNOWN/,
    );
    const existing = resolve(parent, "existing");
    mkdirSync(existing);
    writeFileSync(resolve(existing, "user.txt"), "preserve");
    assert.throws(
      () => createFeature({ name: "safe", directory: existing }),
      /FEATURE_DESTINATION_EXISTS/,
    );
    assert.equal(
      readFileSync(resolve(existing, "user.txt"), "utf8"),
      "preserve",
    );
    const empty = resolve(parent, "empty");
    mkdirSync(empty);
    assert.throws(
      () => createFeature({ name: "safe", directory: empty }),
      /FEATURE_DESTINATION_EXISTS/,
    );
    const dangling = resolve(parent, "dangling");
    symlinkSync(resolve(parent, "missing"), dangling);
    assert.throws(
      () => createFeature({ name: "safe", directory: dangling }),
      /FEATURE_DESTINATION_EXISTS/,
    );
    assert.throws(
      () =>
        createFeature({
          name: "safe",
          directory: resolve(skill, "generated-feature"),
        }),
      /FEATURE_DESTINATION_OVERLAPS_SKILL/,
    );
    assert.throws(
      () =>
        createFeature({
          name: "safe",
          directory: resolve(parent, "missing-parent/safe"),
        }),
      /ENOENT/,
    );
    assert.ok(readdirSync(parent).every((name) => !name.includes("staging")));
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("standalone CLI runs with only Node, without global tools or Skill root dependencies", () => {
  const parent = temporary();
  try {
    const portable = portableSkill(parent);
    const script = resolve(portable, "scripts/new_feature.mjs");
    const result = runScript(
      script,
      [
        "standalone-chat",
        "--template",
        "ai-chat",
        "--out",
        resolve(parent, "standalone-chat"),
        "--json",
      ],
      parent,
    );
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).manifest.feature, "standalone-chat");
    assert.equal(JSON.parse(result.stdout).manifest.skillVersion, "0.1.1");
    assert.equal(existsSync(resolve(portable, "node_modules")), false);
    const found = runScript(
      resolve(portable, "scripts/find_icon.mjs"),
      ["告警", "--family", "status", "--size", "12", "--limit", "2", "--json"],
      parent,
    );
    assert.equal(found.status, 0, found.stderr);
    assert.equal(JSON.parse(found.stdout).results.length, 2);
    for (const tool of [script, resolve(portable, "scripts/find_icon.mjs")]) {
      const help = runScript(tool, ["--help"], parent);
      assert.equal(help.status, 0, help.stderr);
      assert.match(help.stdout, /Usage:/);
    }
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("bad archive SHA, forged identity and symlinked inputs fail before publishing output", () => {
  const parent = temporary();
  try {
    const portable = portableSkill(parent);
    const lockFile = resolve(portable, "source.lock.json");
    const lock = JSON.parse(readFileSync(lockFile, "utf8"));
    const original = JSON.stringify(lock);
    lock.packages[0].sha256 = "0".repeat(64);
    writeFileSync(lockFile, JSON.stringify(lock));
    assert.throws(
      () =>
        createFeature({
          name: "bad-sha",
          skillRoot: portable,
          directory: resolve(parent, "bad-sha"),
        }),
      /FEATURE_ARCHIVE_SHA_MISMATCH/,
    );
    assert.equal(existsSync(resolve(parent, "bad-sha")), false);
    const wrongVersion = JSON.parse(original);
    wrongVersion.packages[0].version = "99.0.0";
    writeFileSync(lockFile, JSON.stringify(wrongVersion));
    assert.throws(
      () => readFeaturePackageIdentity(portable),
      /FEATURE_PACKAGE_IDENTITY_MISMATCH/,
    );
    writeFileSync(lockFile, original);
    const archive = JSON.parse(original).packages[0].tarball;
    unlinkSync(resolve(portable, archive));
    symlinkSync(resolve(root, archive), resolve(portable, archive));
    assert.throws(
      () => readFeaturePackageIdentity(portable),
      /FEATURE_ARCHIVE_ESCAPES_VENDOR/,
    );
    unlinkSync(resolve(portable, archive));
    cpSync(resolve(root, archive), resolve(portable, archive));
    const page = resolve(portable, "assets/templates/blank/Page.vue");
    unlinkSync(page);
    symlinkSync(resolve(parent, "external-user-file"), page);
    writeFileSync(resolve(parent, "external-user-file"), "private sentinel");
    assert.throws(
      () =>
        createFeature({
          name: "bad-source",
          skillRoot: portable,
          directory: resolve(parent, "bad-source"),
        }),
      /FEATURE_SOURCE_SYMLINK/,
    );
    assert.equal(existsSync(resolve(parent, "bad-source")), false);
    assert.ok(readdirSync(parent).every((name) => !name.includes("staging")));
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("concurrent CLI creation publishes one complete tree and refuses the other writer", async () => {
  const parent = temporary();
  try {
    const destination = resolve(parent, "contended");
    const launch = (template) =>
      new Promise((yes, no) => {
        const child = spawn(
          process.execPath,
          [
            featureScript,
            "contended",
            "--template",
            template,
            "--out",
            destination,
          ],
          { cwd: parent, env: { ...process.env, PATH: "" }, stdio: "ignore" },
        );
        child.once("error", no);
        child.once("close", (code) => yes(code));
      });
    const codes = await Promise.all([launch("blank"), launch("ai-chat")]);
    assert.deepEqual(codes.sort(), [0, 1]);
    const delivery = JSON.parse(
      readFileSync(resolve(destination, "delivery.json"), "utf8"),
    );
    assert.ok(
      existsSync(resolve(destination, `pages/${delivery.template}/Page.vue`)),
    );
    assert.equal(readdirSync(resolve(destination, "pages")).length, 1);
    assert.ok(readdirSync(parent).every((name) => !name.includes("staging")));
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});
test("icon filters use the actual 1196-entry registry and confirmed native dimensions", () => {
  const registry = loadIconRegistry();
  assert.equal(registry.iconCount, 1196);
  const result = findIcons({
    query: "告警",
    family: "status",
    size: "12x12",
    limit: 2,
  });
  assert.ok(result.total >= 2);
  assert.equal(result.results.length, 2);
  for (const icon of result.results) {
    const actual = registry.icons.find((entry) => entry.key === icon.key);
    assert.equal(icon.native.width, 12);
    assert.equal(icon.native.height, 12);
    assert.equal(icon.family, "status");
    assert.deepEqual(
      icon.publicBindings,
      actual.components.map((entry) => ({
        publicImport: entry.publicImport,
        props: entry.props,
      })),
    );
  }
  assert.equal(
    findIcons({ query: "nonexistent-icon-key-702913" }).results.length,
    0,
  );
  assert.equal(
    findIcons({ limit: 2000 }).results.length,
    registry.icons.length,
  );
  assert.equal(findIcons({ size: "9999" }).total, 0);
  assert.ok(
    findIcons({ query: "告警 镂空" }).results.every((icon) =>
      (icon.name + icon.alias + icon.key).includes("告警"),
    ),
  );
});
test("icon CLI reports bad filters and never substitutes a guessed icon", () => {
  for (const args of [
    ["--family", "made-up"],
    ["--size", "-1"],
    ["--size", "1.5"],
    ["--limit", "0"],
    ["--limit", "NaN"],
    ["--unknown"],
  ])
    assert.equal(runScript(iconScript, args).status, 1);
  const result = runScript(iconScript, [
    "missing-registry-key-917317",
    "--json",
  ]);
  assert.equal(result.status, 0);
  assert.deepEqual(JSON.parse(result.stdout).results, []);
  const readable = runScript(iconScript, [
    "告警",
    "--family",
    "status",
    "--size",
    "12",
    "--limit",
    "1",
  ]);
  assert.equal(readable.status, 0);
  assert.match(readable.stdout, /import \{ WorkbenchStatusIcon \}/);
  assert.match(readable.stdout, /native=12x12/);
});

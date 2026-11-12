import test from "node:test";
import assert from "node:assert/strict";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { checkGenerated, writeGenerated } from "../build/generated.mjs";
import {
  loadPinnedPackages,
  packRoot,
  json,
  sha256,
  validateComponentsCatalog,
} from "../build/verify-lock.mjs";
import { packageSkills } from "../build/consumer-pack.mjs";
import { execFileSync } from "node:child_process";

function fixture(run) {
  const root = mkdtempSync(resolve(tmpdir(), "partner-pack-lock-"));
  try {
    return run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
test("the real pinned archives supply both identities and their actual metadata capabilities", () => {
  const { packages } = loadPinnedPackages();
  assert.equal(packages.length, 2);
  assert.equal(
    packages[0].componentsSchemaSha256,
    "43dfeb418e57f1ab635eafbf5cc6e3c560b6448fc37ecf7b192026ada713faa1",
  );
  assert.equal(
    packages[1].componentsSchemaSha256,
    packages[0].componentsSchemaSha256,
  );
  assert.deepEqual(packages[0].componentsSchema, packages[1].componentsSchema);
  const wb = packages.find((p) => p.name === "@workbench/ui-vue3");
  assert.deepEqual(Object.keys(wb.metadata), [
    "components",
    "usage",
    "tokens",
    "icons",
    "release",
  ]);
  assert.equal(
    wb.metadata.usage.assetCount,
    Object.keys(wb.metadata.components.assets).length,
  );
  assert.equal(wb.metadata.icons.iconCount, wb.metadata.icons.icons.length);
  const ai = packages.find((p) => p.name === "huawei-partner-ai-ui");
  assert.ok(ai.metadata.release);
  // This stage does not invent the structured AI export scheduled in its owning package.
  assert.equal(
    Object.hasOwn(ai.metadata, "components"),
    Boolean(ai.manifest.exports?.["./components.json"]),
  );
});
test("lock verification rejects archive tampering, identity changes and dependency bypasses", () =>
  fixture((root) => {
    cpSync(resolve(packRoot, "vendor"), resolve(root, "vendor"), {
      recursive: true,
    });
    for (const name of ["source.lock.json", "package.json"])
      cpSync(resolve(packRoot, name), resolve(root, name));
    const lock = json(resolve(root, "source.lock.json"));
    const manifest = json(resolve(root, "package.json"));
    const archive = resolve(root, lock.packages[0].tarball),
      original = readFileSync(archive);
    writeFileSync(archive, Buffer.concat([original, Buffer.from("tampered")]));
    assert.throws(() => loadPinnedPackages(root), /SHA-256 mismatch/);
    writeFileSync(archive, original);
    const changed = structuredClone(lock);
    changed.packages[0].sourceCommit = "f".repeat(40);
    writeFileSync(resolve(root, "source.lock.json"), JSON.stringify(changed));
    assert.throws(() => loadPinnedPackages(root), /metadata identity/);
    writeFileSync(resolve(root, "source.lock.json"), JSON.stringify(lock));
    manifest.dependencies[lock.packages[0].name] = "latest";
    writeFileSync(resolve(root, "package.json"), JSON.stringify(manifest));
    assert.throws(
      () => loadPinnedPackages(root),
      /must consume the locked archive/,
    );
  }));
test("pinned schema rejects a mismatched pin and missing public export", () =>
  fixture((root) => {
    cpSync(resolve(packRoot, "vendor"), resolve(root, "vendor"), {
      recursive: true,
    });
    for (const name of ["source.lock.json", "package.json"])
      cpSync(resolve(packRoot, name), resolve(root, name));
    const lock = json(resolve(root, "source.lock.json"));
    const changed = structuredClone(lock);
    changed.componentsSchemaSha256 = "0".repeat(64);
    writeFileSync(resolve(root, "source.lock.json"), JSON.stringify(changed));
    assert.throws(
      () => loadPinnedPackages(root),
      /SOURCE_LOCK_INVALID: components schema SHA-256 mismatch/,
    );
    const archive = resolve(root, lock.packages[0].tarball),
      unpack = resolve(root, "unpack");
    mkdirSync(unpack);
    execFileSync("tar", ["-xzf", archive, "-C", unpack]);
    const manifestFile = resolve(unpack, "package/package.json"),
      manifest = json(manifestFile);
    delete manifest.exports["./components.schema.json"];
    writeFileSync(manifestFile, JSON.stringify(manifest));
    execFileSync("tar", ["-czf", archive, "-C", unpack, "package"]);
    lock.packages[0].sha256 = sha256(readFileSync(archive));
    writeFileSync(resolve(root, "source.lock.json"), JSON.stringify(lock));
    assert.throws(
      () => loadPinnedPackages(root),
      /SOURCE_LOCK_INVALID: missing components schema export/,
    );
  }));
test("catalog cross-field checks reject contradictory public evidence", () => {
  const catalog = loadPinnedPackages().packages[1].metadata.components;
  const invalid = (change, error) => {
    const value = structuredClone(catalog);
    change(value, Object.values(value.assets)[0]);
    assert.throws(() => validateComponentsCatalog(value), error);
  };
  invalid(
    (c) => c.assetCount++,
    /SOURCE_LOCK_INVALID: components catalog asset count/,
  );
  invalid((c, a) => (a.id = "wrong"), /components catalog asset id/);
  invalid(
    (c, a) => (a.publicImport.moduleName = "wrong"),
    /components catalog public import/,
  );
  invalid(
    (c, a) => (a.source.commit = "wrong"),
    /components catalog source identity/,
  );
  invalid(
    (c, a) => (a.cases[0].unsupported = []),
    /components catalog case props/,
  );
  invalid((c, a) => (a.cases[0].props = {}), /components catalog case props/);
  invalid((c, a) => {
    a.cases[0].props = 42;
    a.cases[0].propsStatus = "derived";
  }, /components catalog case props/);
  invalid((c, a) => (a.status.unsupported = []), /components catalog status/);
  invalid((c, a) => (a.status = {}), /components catalog status/);
});
test("ordinary checks reject hand edits, missing files, unrecorded pages and cannot silently regenerate", () =>
  fixture((root) => {
    const files = new Map([
      ["shared/references/a.md", "actual package contract\n"],
    ]);
    writeGenerated(root, files);
    checkGenerated(root, files);
    const target = resolve(root, "shared/references/a.md");
    writeFileSync(target, "hand edited");
    assert.throws(() => checkGenerated(root, files), /GENERATED_DRIFT/);
    assert.equal(readFileSync(target, "utf8"), "hand edited");
    writeGenerated(root, files);
    mkdirSync(resolve(root, "shared/references/workbench"), {
      recursive: true,
    });
    writeFileSync(
      resolve(root, "shared/references/workbench/forged.md"),
      "invented contract",
    );
    assert.throws(() => checkGenerated(root, files), /unrecorded/);
    rmSync(resolve(root, "shared/references/workbench"), { recursive: true });
    rmSync(target);
    assert.throws(() => checkGenerated(root, files), /GENERATED_DRIFT/);
  }));
test("consumer quick references reject hand edits, missing and unrecorded files", () =>
  fixture((root) => {
    const name = "skills/partner-ui-pages/references/quick/workbench/example.md";
    const files = new Map([[name, "source contract\n"]]);
    writeGenerated(root, files);
    checkGenerated(root, files);
    writeFileSync(resolve(root, name), "edited");
    assert.throws(() => checkGenerated(root, files), /GENERATED_DRIFT/);
    writeGenerated(root, files);
    const extra = resolve(root, "skills/partner-ui-pages/references/quick/forged.md");
    writeFileSync(extra, "not from package");
    assert.throws(() => checkGenerated(root, files), /unrecorded/);
    rmSync(extra);
    rmSync(resolve(root, name));
    assert.throws(() => checkGenerated(root, files), /GENERATED_DRIFT/);
  }));

test("generation rejects escaping paths and protects edited retired generated files", () =>
  fixture((root) => {
    assert.throws(
      () => writeGenerated(root, new Map([["../escape", "bad"]])),
      /PATH_ESCAPES/,
    );
    const files = new Map([["shared/references/retired.md", "generated"]]);
    writeGenerated(root, files);
    writeFileSync(
      resolve(root, "shared/references/retired.md"),
      "a local edit",
    );
    assert.throws(
      () => writeGenerated(root, new Map()),
      /REMOVAL_HAS_LOCAL_CHANGES/,
    );
    assert.equal(
      readFileSync(resolve(root, "shared/references/retired.md"), "utf8"),
      "a local edit",
    );
  }));
test("managed prefix and ancestor symlinks cannot redirect generated writes outside the checkout", () =>
  fixture((root) =>
    fixture((outside) => {
      mkdirSync(resolve(root, "shared"), { recursive: true });
      symlinkSync(outside, resolve(root, "shared/references"), "dir");
      const files = new Map([
        ["shared/references/probe.md", "must stay inside"],
      ]);
      assert.throws(() => writeGenerated(root, files), /GENERATED_SYMLINK/);
      assert.equal(existsSync(resolve(outside, "probe.md")), false);
      rmSync(resolve(root, "shared/references"));
      rmSync(resolve(root, "shared"), { recursive: true });
      symlinkSync(outside, resolve(root, "shared"), "dir");
      assert.throws(() => writeGenerated(root, files), /GENERATED_SYMLINK/);
      assert.equal(existsSync(resolve(outside, "references/probe.md")), false);
    }),
  ));
test("self-contained archives keep source and lockfiles while excluding installed dependencies and test/build output", () =>
  fixture((root) => {
    for (const name of [
      "package.json",
      "source.lock.json",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
    ])
      cpSync(resolve(packRoot, name), resolve(root, name));
    mkdirSync(resolve(root, "vendor"));
    writeFileSync(resolve(root, "vendor/input.tgz"), "fixture archive");
    mkdirSync(resolve(root, "shared/runtime"), { recursive: true });
    writeFileSync(resolve(root, "shared/runtime/builder.mjs"), "export {};");
    mkdirSync(resolve(root, "shared/gallery/assets"), { recursive: true });
    writeFileSync(
      resolve(root, "shared/gallery/index.html"),
      "<!doctype html><title>Generated gallery</title>",
    );
    writeFileSync(resolve(root, "shared/gallery/assets/app.js"), "export {};");
    mkdirSync(resolve(root, "gallery"), { recursive: true });
    writeFileSync(resolve(root, "gallery/serve.mjs"), "export {};");
    for (const skill of ["partner-ui-pages", "partner-ui-vue3", "partner-ui-review"]) {
      const folder = resolve(root, "skills", skill);
      mkdirSync(resolve(folder, "assets/harness/src"), { recursive: true });
      writeFileSync(resolve(folder, "SKILL.md"), "# Skill");
      writeFileSync(
        resolve(folder, "assets/harness/src/main.ts"),
        "export {};",
      );
      for (const name of [
        "node_modules",
        "dist",
        "test-results",
        ".artifacts",
      ]) {
        mkdirSync(resolve(folder, "assets/harness", name), { recursive: true });
        writeFileSync(
          resolve(folder, "assets/harness", name, "private-output.txt"),
          name,
        );
      }
    }
    const canvas = resolve(root, "skills/design-requirement-canvas");
    mkdirSync(resolve(canvas, "scripts/__pycache__"), { recursive: true });
    mkdirSync(resolve(canvas, "tests/.out"), { recursive: true });
    mkdirSync(resolve(canvas, "node_modules"), { recursive: true });
    writeFileSync(resolve(canvas, "SKILL.md"), "# Canvas");
    writeFileSync(resolve(canvas, "package-lock.json"), "{}");
    writeFileSync(resolve(canvas, "scripts/build_canvas.py"), "");
    writeFileSync(resolve(canvas, "scripts/__pycache__/private-output.txt"), "cache");
    writeFileSync(resolve(canvas, "tests/.out/private-output.txt"), "out");
    writeFileSync(resolve(canvas, "node_modules/private-output.txt"), "dep");
    packageSkills(root, json(resolve(root, "source.lock.json")));
    const canvasMembers = JSON.parse(
      execFileSync(
        "python3",
        [
          "-c",
          "import json,sys,zipfile;print(json.dumps(zipfile.ZipFile(sys.argv[1]).namelist()))",
          resolve(root, "dist", "design-requirement-canvas.zip"),
        ],
        { encoding: "utf8" },
      ),
    );
    assert.deepEqual(canvasMembers.sort(), [
      "design-requirement-canvas/SKILL.md",
      "design-requirement-canvas/package-lock.json",
      "design-requirement-canvas/scripts/build_canvas.py",
    ]);
    for (const skill of ["partner-ui-pages", "partner-ui-vue3", "partner-ui-review"]) {
      const members = JSON.parse(
        execFileSync(
          "python3",
          [
            "-c",
            "import json,sys,zipfile;print(json.dumps(zipfile.ZipFile(sys.argv[1]).namelist()))",
            resolve(root, "dist", skill + ".zip"),
          ],
          { encoding: "utf8" },
        ),
      );
      assert.ok(members.includes(skill + "/assets/harness/src/main.ts"));
      assert.ok(members.includes(skill + "/pnpm-lock.yaml"));
      assert.ok(members.includes(skill + "/vendor/input.tgz"));
      assert.ok(!members.some((name) => name.includes("private-output.txt")));
    }
  }));

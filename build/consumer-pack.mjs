import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadPinnedPackages, packRoot, json } from "./verify-lock.mjs";
import { checkGenerated, writeGenerated } from "./generated.mjs";
import { generateReferences } from "../shared/format/index.mjs";
import { buildPrototypeRuntime } from "../shared/runtime/build-prototype.mjs";
import { buildGallery } from "./build-gallery.mjs";

const skills = ["partner-ui-pages", "partner-ui-vue3"];
export async function candidateFiles(root, lock, packages) {
  const files = new Map();
  const refs = generateReferences({
    packages,
    studioBaseURLs: lock.studioBaseURLs,
  });
  for (const [name, content] of refs) {
    files.set("shared/references/" + name, content);
    for (const skill of skills)
      files.set(`skills/${skill}/references/${name}`, content);
  }
  mkdirSync(resolve(root, ".cache"), { recursive: true });
  const outDir = mkdtempSync(resolve(root, ".cache/runtime-"));
  try {
    const built = await buildPrototypeRuntime({ root, lock, outDir });
    for (const file of built.files) {
      const name = relative(outDir, file).split("\\").join("/");
      if (!name || name.startsWith("../"))
        throw new Error("RUNTIME_OUTPUT_ESCAPES");
      files.set(
        "skills/partner-ui-pages/assets/runtime/" + name,
        readFileSync(file),
      );
    }
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
  const galleryDir = mkdtempSync(resolve(root, ".cache/gallery-"));
  try {
    const gallery = await buildGallery({
      root,
      lock,
      packages,
      outDir: galleryDir,
    });
    for (const file of gallery.files) {
      const name = relative(galleryDir, file).split("\\").join("/");
      if (!name || name.startsWith("../"))
        throw new Error("GALLERY_OUTPUT_ESCAPES");
      files.set("shared/gallery/" + name, readFileSync(file));
    }
    files.set(
      "shared/gallery/metrics.json",
      JSON.stringify(
        {
          _generated:
            "Generated from source.lock.json and published metadata — do not edit.",
          ...gallery.metrics,
          scope:
            "Uncompressed emitted HTML/CSS/JS/assets before this metrics file; dynamic bytes are separate from the application static closure.",
          sources: packages.map((pkg) => ({
            name: pkg.name,
            version: pkg.version,
            sourceCommit: pkg.sourceCommit,
            sha256: pkg.sha256,
          })),
        },
        null,
        2,
      ) + "\n",
    );
  } finally {
    rmSync(galleryDir, { recursive: true, force: true });
  }
  return files;
}
function sortedFiles(root, prefix = "") {
  return readdirSync(resolve(root, prefix), { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const name = prefix ? prefix + "/" + entry.name : entry.name;
      if (entry.isSymbolicLink())
        throw new Error("SKILL_SYMLINK_NOT_SELF_CONTAINED: " + name);
      return entry.isDirectory() ? sortedFiles(root, name) : [name];
    });
}
function maintenanceManifest(root, name) {
  const original = json(resolve(root, "package.json"));
  return {
    _generated:
      "generated from source.lock.json and the consumer toolchain — do not edit",
    name: name + "-maintenance",
    private: true,
    type: "module",
    packageManager: original.packageManager,
    engines: original.engines,
    scripts:
      name === skills[0]
        ? { "build:runtime": "node maintainer/build.mjs" }
        : {},
    dependencies: original.dependencies,
    devDependencies: original.devDependencies,
  };
}
export function packageSkills(root, lock) {
  const dist = resolve(root, "dist");
  mkdirSync(dist, { recursive: true });
  for (const skill of skills) {
    const target = resolve(dist, skill);
    rmSync(target, { recursive: true, force: true });
    cpSync(resolve(root, "skills", skill), target, {
      recursive: true,
      filter: (source) =>
        ![
          "node_modules",
          "dist",
          "test-results",
          "playwright-report",
          ".artifacts",
          ".cache",
          ".git",
          "__pycache__",
          ".DS_Store",
          "vendor",
        ].includes(source.split(/[\\/]/).at(-1)),
    });
    cpSync(resolve(root, "vendor"), resolve(target, "vendor"), {
      recursive: true,
    });
    cpSync(resolve(root, "shared/gallery"), resolve(target, "assets/gallery"), {
      recursive: true,
    });
    mkdirSync(resolve(target, "scripts"), { recursive: true });
    cpSync(
      resolve(root, "gallery/serve.mjs"),
      resolve(target, "scripts/serve_gallery.mjs"),
    );
    for (const file of [
      "source.lock.json",
      "pnpm-workspace.yaml",
      "pnpm-lock.yaml",
    ])
      cpSync(resolve(root, file), resolve(target, file));
    writeFileSync(
      resolve(target, "package.json"),
      JSON.stringify(maintenanceManifest(root, skill), null, 2) + "\n",
    );
    if (skill === skills[0])
      cpSync(
        resolve(root, "shared/runtime"),
        resolve(target, "maintainer/runtime-build"),
        {
          recursive: true,
        },
      );
    if (skill === skills[1] && existsSync(resolve(target, "assets/scaffold")))
      cpSync(
        resolve(target, "assets/scaffold"),
        resolve(target, "assets/harness/src/scaffold"),
        {
          recursive: true,
        },
      );
    if (skill === skills[1] && existsSync(resolve(target, "assets/templates")))
      cpSync(
        resolve(target, "assets/templates"),
        resolve(target, "assets/harness/src/templates"),
        {
          recursive: true,
        },
      );
    const files = sortedFiles(target);
    const archive = resolve(dist, skill + ".zip");
    // Python's standard library makes archive bytes reproducible without a zip dependency.
    execFileSync(
      "python3",
      [
        "-c",
        'import json,pathlib,sys,zipfile\nr=pathlib.Path(sys.argv[1]);files=json.loads(sys.argv[4]);date=tuple(map(int,sys.argv[3].split("-")))+(0,0,0)\nwith zipfile.ZipFile(sys.argv[2],"w",compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:\n for p in files:\n  i=zipfile.ZipInfo(r.name+"/"+p,date);i.compress_type=zipfile.ZIP_DEFLATED;i.external_attr=0o100644<<16;z.writestr(i,(r/p).read_bytes())',
        target,
        archive,
        lock.buildDate,
        JSON.stringify(files),
      ],
      { stdio: "pipe" },
    );
  }
}
export async function buildConsumerPack({
  root = packRoot,
  write = false,
  checkOnly = false,
} = {}) {
  const { lock, packages } = loadPinnedPackages(root);
  const files = await candidateFiles(root, lock, packages);
  if (write) writeGenerated(root, files);
  checkGenerated(root, files);
  if (!checkOnly) packageSkills(root, lock);
  return {
    status: "PASS",
    validationScope: "locked consumer pack",
    generatedFiles: files.size,
    skills,
    packaged: !checkOnly,
  };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const args = process.argv.slice(2);
  if (args.some((arg) => !["--write", "--check"].includes(arg)))
    throw new Error("Unknown build option");
  console.log(
    JSON.stringify(
      await buildConsumerPack({
        write: args.includes("--write"),
        checkOnly: args.includes("--check"),
      }),
    ),
  );
}

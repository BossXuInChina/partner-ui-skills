import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { inside, json, sha256 } from "./verify-lock.mjs";

const manifestPath = "build/generated-files.json";
function checkedPath(root, name) {
  const canonicalRoot = realpathSync(root);
  const file = resolve(canonicalRoot, name);
  if (
    !inside(canonicalRoot, file) ||
    name.split("/").includes("..") ||
    name.startsWith("/")
  )
    throw new Error("GENERATED_PATH_ESCAPES: " + name);
  let ancestor = canonicalRoot;
  for (const part of relative(canonicalRoot, file).split(sep)) {
    ancestor = resolve(ancestor, part);
    const stat = lstatSync(ancestor, { throwIfNoEntry: false });
    if (!stat) break;
    if (stat.isSymbolicLink() || !inside(canonicalRoot, realpathSync(ancestor)))
      throw new Error("GENERATED_SYMLINK: " + name);
  }
  return file;
}
export function generatedManifest(files) {
  return {
    _generated: "generated from source.lock.json — do not edit",
    files: Object.fromEntries(
      [...files]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, value]) => [name, sha256(value)]),
    ),
  };
}
export function checkGenerated(root, files) {
  const expected = generatedManifest(files);
  const stored = checkedPath(root, manifestPath);
  if (
    !existsSync(stored) ||
    JSON.stringify(json(stored)) !== JSON.stringify(expected)
  )
    throw new Error(
      "GENERATED_DRIFT: manifest differs; run pnpm generate after reviewing the lock",
    );
  for (const [name, content] of files) {
    const file = checkedPath(root, name);
    if (!existsSync(file) || !readFileSync(file).equals(Buffer.from(content)))
      throw new Error("GENERATED_DRIFT: " + name);
  }
  for (const prefix of [
    "shared/references",
    "shared/gallery",
    "skills/partner-ui-pages/references/quick",
    "skills/partner-ui-vue3/references/quick",
    "skills/partner-ui-review/references/quick",
    "skills/partner-ui-pages/references/workbench",
    "skills/partner-ui-vue3/references/workbench",
    "skills/partner-ui-pages/references/ai-ui",
    "skills/partner-ui-vue3/references/ai-ui",
    "skills/partner-ui-review/references/workbench",
    "skills/partner-ui-review/references/ai-ui",
    "skills/partner-ui-pages/assets/runtime",
    "skills/partner-ui-pages/assets/components",
    "skills/partner-ui-pages/scripts/component-toolchain",
    "skills/partner-ui-pages/scripts/toolchain",
  ]) {
    for (const name of managedFiles(root, prefix))
      if (!files.has(name))
        throw new Error("GENERATED_DRIFT: unrecorded " + name);
  }
}
function managedFiles(root, prefix) {
  const directory = checkedPath(root, prefix);
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const name = prefix + "/" + entry.name;
    if (entry.isSymbolicLink()) throw new Error("GENERATED_SYMLINK: " + name);
    return entry.isDirectory() ? managedFiles(root, name) : [name];
  });
}
export function writeGenerated(root, files) {
  const manifestFile = checkedPath(root, manifestPath);
  const previous = existsSync(manifestFile)
    ? json(manifestFile)
    : { files: {} };
  for (const [name, hash] of Object.entries(previous.files)) {
    if (files.has(name)) continue;
    const file = checkedPath(root, name);
    if (existsSync(file) && sha256(readFileSync(file)) !== hash)
      throw new Error("GENERATED_REMOVAL_HAS_LOCAL_CHANGES: " + name);
    rmSync(file, { force: true });
  }
  for (const [name, content] of files) {
    const file = checkedPath(root, name);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
  }
  mkdirSync(dirname(manifestFile), { recursive: true });
  writeFileSync(
    manifestFile,
    JSON.stringify(generatedManifest(files), null, 2) + "\n",
  );
}

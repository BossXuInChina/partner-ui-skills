import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { buildConsumerPack } from "./consumer-pack.mjs";
import { json, packRoot, sha256 } from "./verify-lock.mjs";

const names = ["partner-ui-pages", "partner-ui-vue3"];
const semver =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
const dist = resolve(packRoot, "dist");
const manifestPath = resolve(dist, "release-manifest.json");

// A failed run must not leave an earlier manifest representing the new output.
rmSync(manifestPath, { force: true });
await buildConsumerPack();
const lockBytes = readFileSync(resolve(packRoot, "source.lock.json"));
const lock = JSON.parse(lockBytes.toString("utf8"));
if (
  lock.releasePolicy !== "user-decides" ||
  !/^\d{4}-\d{2}-\d{2}$/.test(lock.buildDate ?? "")
)
  throw new Error("Invalid release policy or build date in source lock");

// Check both identities and complete archives before writing either versioned copy.
const skills = names.map((name) => {
  const metadata = json(resolve(packRoot, "skills", name, "skill.json"));
  if (
    metadata.name !== name ||
    typeof metadata.version !== "string" ||
    !semver.test(metadata.version)
  )
    throw new Error(`Invalid skill identity: ${name}`);
  const archive = resolve(dist, name + ".zip");
  const archivedMetadata = execFileSync(
    "python3",
    [
      "-c",
      `import json,sys,zipfile
with zipfile.ZipFile(sys.argv[1]) as z:
 bad=z.testzip()
 if bad: raise ValueError('Corrupt ZIP member: '+bad)
 print(json.dumps(json.loads(z.read(sys.argv[2]))))`,
      archive,
      `${name}/skill.json`,
    ],
    { encoding: "utf8" },
  );
  const packaged = JSON.parse(archivedMetadata);
  if (packaged.name !== metadata.name || packaged.version !== metadata.version)
    throw new Error(`Archive identity mismatch: ${name}`);
  const bytes = readFileSync(archive);
  return {
    name,
    version: metadata.version,
    file: `${name}-${metadata.version}.zip`,
    sha256: sha256(bytes),
    bytes: bytes.length,
    archive,
  };
});

for (const skill of skills) {
  const target = resolve(dist, skill.file);
  const temporary = target + ".tmp";
  try {
    copyFileSync(skill.archive, temporary);
    if (sha256(readFileSync(temporary)) !== skill.sha256)
      throw new Error(`Copy mismatch: ${skill.name}`);
    renameSync(temporary, target);
  } finally {
    rmSync(temporary, { force: true });
  }
}
const manifest = {
  schemaVersion: "1.0",
  releasePolicy: lock.releasePolicy,
  sourceLock: { buildDate: lock.buildDate, sha256: sha256(lockBytes) },
  packages: lock.packages.map(({ name, version, sha256, sourceCommit }) => ({
    name,
    version,
    sha256,
    sourceCommit,
  })),
  skills: skills.map(({ archive, ...skill }) => skill),
};
const temporaryManifest = manifestPath + ".tmp";
try {
  writeFileSync(temporaryManifest, JSON.stringify(manifest, null, 2) + "\n");
  renameSync(temporaryManifest, manifestPath);
} finally {
  rmSync(temporaryManifest, { force: true });
}
console.log(
  JSON.stringify({ status: "PASS", manifest: "dist/release-manifest.json" }),
);

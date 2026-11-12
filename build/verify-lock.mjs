import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const packRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const names = ["@workbench/ui-vue3", "huawei-partner-ai-ui"];
export const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");
export const json = (file) => JSON.parse(readFileSync(file, "utf8"));
const fail = (message) => {
  throw new Error("SOURCE_LOCK_INVALID: " + message);
};
export function inside(root, file) {
  const rel = relative(root, file);
  // relative() uses "\\" on Windows, so check the platform separator as well as "/".
  return rel !== ".." && !rel.startsWith("../") && !rel.startsWith(".." + sep) && !isAbsolute(rel);
}

function archiveBytes(tarball, member, members) {
  if (!members.has(member)) fail("missing packaged document " + member);
  return execFileSync("tar", ["-xOf", tarball, member], {
    maxBuffer: 32 * 1024 * 1024,
  });
}
function archiveJSON(tarball, member, members) {
  return JSON.parse(archiveBytes(tarball, member, members).toString("utf8"));
}
function exportedDocument(manifest, name) {
  const entry = manifest.exports?.[`./${name}.json`];
  if (entry === undefined) return null;
  const target =
    typeof entry === "string" ? entry : (entry.import ?? entry.default);
  if (
    typeof target !== "string" ||
    !target.startsWith("./") ||
    target.split("/").includes("..")
  )
    fail("invalid metadata export " + name);
  return "package/" + target.slice(2);
}
function validateIdentity(entry, manifest, metadata) {
  if (manifest.name !== entry.name || manifest.version !== entry.version)
    fail("manifest identity " + entry.name);
  if (!metadata.release || metadata.release.sourceHasLocalChanges !== false)
    fail("clean committed release identity required " + entry.name);
  for (const [name, data] of Object.entries(metadata)) {
    if (
      data.schemaVersion !== "1.0" ||
      data.packageName !== entry.name ||
      data.version !== entry.version ||
      data.sourceCommit !== entry.sourceCommit ||
      data.sourceHasLocalChanges !== false
    )
      fail("metadata identity " + entry.name + "/" + name);
  }
  if (
    entry.name === names[0] &&
    !["components", "usage", "tokens", "icons", "release"].every(
      (name) => metadata[name],
    )
  )
    fail("Workbench consumer metadata is incomplete");
}
// Checks known cross-field contract invariants; this is not a JSON Schema validator.
export function validateComponentsCatalog(catalog) {
  const invalid = (detail) => fail("components catalog " + detail);
  if (
    !catalog ||
    !catalog.assets ||
    typeof catalog.assets !== "object" ||
    Array.isArray(catalog.assets) ||
    catalog.assetCount !== Object.keys(catalog.assets).length
  )
    invalid("asset count");
  const hasReason = (value) =>
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) =>
        typeof item?.code === "string" &&
        item.code.trim() &&
        typeof item.reason === "string" &&
        item.reason.trim(),
    );
  for (const [id, asset] of Object.entries(catalog.assets)) {
    if (!asset || asset.id !== id) invalid("asset id " + id);
    if (asset.publicImport?.moduleName !== catalog.packageName)
      invalid("public import " + id);
    if (
      asset.source?.package !== catalog.packageName ||
      asset.source?.version !== catalog.version ||
      asset.source?.commit !== catalog.sourceCommit
    )
      invalid("source identity " + id);
    if (!Array.isArray(asset.cases)) invalid("cases " + id);
    for (const item of asset.cases) {
      if (
        !item ||
        !Object.hasOwn(item, "props") ||
        (item.props === null
          ? item.propsStatus !== "not-derived" || !hasReason(item.unsupported)
          : item.propsStatus !== "derived" ||
            typeof item.props !== "object" ||
            Array.isArray(item.props))
      )
        invalid("case props " + id);
    }
    if (
      !asset.status ||
      typeof asset.status !== "object" ||
      !["maturity", "deliveryEligibility"].every(
        (key) =>
          asset.status[key] === null ||
          (typeof asset.status[key] === "string" && asset.status[key].trim()),
      ) ||
      ((asset.status.maturity === null ||
        asset.status.deliveryEligibility === null) &&
        !hasReason(asset.status.unsupported))
    )
      invalid("status " + id);
  }
}
export function loadPinnedPackages(root = packRoot) {
  const lock = json(resolve(root, "source.lock.json"));
  const manifest = json(resolve(root, "package.json"));
  if (
    lock.schemaVersion !== "1.0" ||
    !Array.isArray(lock.packages) ||
    JSON.stringify(lock.packages.map((p) => p.name).sort()) !==
      JSON.stringify([...names].sort())
  )
    fail("exactly the two declared package identities are required");
  const schemaPin = lock.componentsSchemaSha256;
  if (
    schemaPin !== undefined &&
    (typeof schemaPin !== "string" || !/^[a-f0-9]{64}$/.test(schemaPin))
  )
    fail("invalid components schema SHA-256");
  const packages = lock.packages.map((entry) => {
    if (
      !/^[a-f0-9]{64}$/.test(entry.sha256) ||
      !/^[a-f0-9]{40}$/.test(entry.sourceCommit) ||
      !/^vendor\/[a-z0-9][a-z0-9._-]*\.tgz$/.test(entry.tarball ?? "")
    )
      fail("invalid pinned archive identity");
    const tarball = realpathSync(resolve(root, entry.tarball));
    if (!inside(realpathSync(resolve(root, "vendor")), tarball))
      fail("archive escapes vendor");
    if (manifest.dependencies?.[entry.name] !== "file:" + entry.tarball)
      fail("package.json must consume the locked archive " + entry.name);
    if (sha256(readFileSync(tarball)) !== entry.sha256)
      fail("SHA-256 mismatch " + entry.name);
    const members = new Set(
      execFileSync("tar", ["-tzf", tarball], {
        encoding: "utf8",
        maxBuffer: 8 * 1024 * 1024,
      })
        .trim()
        // Windows tar.exe prints CRLF; without \r? every member name ends in "\r" and no lookup matches.
        .split(/\r?\n/),
    );
    for (const member of members)
      if (!member.startsWith("package/") || member.split("/").includes(".."))
        fail("unsafe archive member");
    const packaged = archiveJSON(tarball, "package/package.json", members);
    const metadata = {};
    for (const name of ["components", "usage", "tokens", "icons", "release"]) {
      const member = exportedDocument(packaged, name);
      if (member) metadata[name] = archiveJSON(tarball, member, members);
    }
    validateIdentity(entry, packaged, metadata);
    if (schemaPin !== undefined) {
      const member = exportedDocument(packaged, "components.schema");
      if (!member) fail("missing components schema export " + entry.name);
      if (!metadata.components) fail("missing components export " + entry.name);
      const bytes = archiveBytes(tarball, member, members);
      const componentsSchemaSha256 = sha256(bytes);
      if (componentsSchemaSha256 !== schemaPin)
        fail("components schema SHA-256 mismatch " + entry.name);
      let componentsSchema;
      try {
        componentsSchema = JSON.parse(bytes.toString("utf8"));
      } catch {
        fail("invalid components schema JSON " + entry.name);
      }
      validateComponentsCatalog(metadata.components);
      return {
        ...entry,
        manifest: packaged,
        metadata,
        componentsSchema,
        componentsSchemaSha256,
      };
    }
    return { ...entry, manifest: packaged, metadata };
  });
  return { lock, packages };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { packages } = loadPinnedPackages();
  console.log(
    JSON.stringify({
      status: "PASS",
      packages: packages.map(({ name, version, sourceCommit }) => ({
        name,
        version,
        sourceCommit,
      })),
    }),
  );
}

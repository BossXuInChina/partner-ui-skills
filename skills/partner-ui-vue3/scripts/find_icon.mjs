#!/usr/bin/env node
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ownFile = fileURLToPath(import.meta.url);
const defaultRegistry = resolve(dirname(ownFile), "../references/icons.json");
export function loadIconRegistry(file = defaultRegistry) {
  const registry = JSON.parse(readFileSync(file, "utf8"));
  if (
    registry.schemaVersion !== "1.0" ||
    registry.packageName !== "@workbench/ui-vue3" ||
    !registry.version ||
    !/^[a-f0-9]{40}$/.test(registry.sourceCommit ?? "") ||
    !Array.isArray(registry.icons) ||
    registry.icons.length !== registry.iconCount
  )
    throw new Error("ICON_REGISTRY_INVALID");
  return registry;
}
function dimensions(size) {
  if (size === undefined) return undefined;
  const match = String(size).match(/^(\d+)(?:[x×](\d+))?$/i);
  if (
    !match ||
    !Number.isSafeInteger(Number(match[1])) ||
    !Number.isSafeInteger(Number(match[2] ?? match[1])) ||
    Number(match[1]) <= 0 ||
    Number(match[2] ?? match[1]) <= 0
  )
    throw new Error(
      "ICON_SIZE_INVALID: use a positive native size, such as 24 or 24x24",
    );
  return { width: Number(match[1]), height: Number(match[2] ?? match[1]) };
}
export function findIcons({
  query = "",
  family,
  size,
  limit = 20,
  registryFile = defaultRegistry,
} = {}) {
  if (!Number.isSafeInteger(limit) || limit < 1)
    throw new Error("ICON_LIMIT_INVALID: use a positive integer");
  const registry = loadIconRegistry(registryFile);
  const families = registry.families.map((entry) => entry.id);
  if (family && !families.includes(family))
    throw new Error("ICON_FAMILY_UNKNOWN: " + families.join(", "));
  const native = dimensions(size);
  const terms = String(query)
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const filtered = registry.icons.filter((icon) => {
    if (family && icon.family !== family) return false;
    if (
      native &&
      (icon.native?.status !== "confirmed" ||
        icon.native.width !== native.width ||
        icon.native.height !== native.height)
    )
      return false;
    const haystack = [
      icon.key,
      icon.name,
      icon.alias,
      icon.displayName,
      icon.semantic,
      icon.group,
      icon.family,
    ]
      .filter(Boolean)
      .join(" ")
      .normalize("NFKC")
      .toLocaleLowerCase("en-US");
    return terms.every((term) => haystack.includes(term));
  });
  return {
    registry: {
      packageName: registry.packageName,
      version: registry.version,
      sourceCommit: registry.sourceCommit,
      iconCount: registry.iconCount,
    },
    filters: {
      query: String(query),
      family: family ?? null,
      native: native ?? null,
      limit,
    },
    total: filtered.length,
    results: filtered.slice(0, limit).map((icon) => ({
      key: icon.key,
      family: icon.family,
      name: icon.name,
      alias: icon.alias,
      native: icon.native,
      exported: icon.exported,
      renderedCanvas: icon.renderedCanvas,
      publicBindings: icon.components.map((component) => ({
        publicImport: component.publicImport,
        props: component.props,
      })),
    })),
  };
}
export function parseFindIconOptions(args) {
  const options = { query: "", limit: 20 };
  const words = [];
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === "--help" || argument === "-h") options.help = true;
    else if (argument === "--json") options.json = true;
    else if (["--query", "--family", "--size", "--limit"].includes(argument)) {
      const value = args[++index];
      if (!value || value.startsWith("--"))
        throw new Error(argument + " requires a value");
      if (argument === "--query") words.push(value);
      if (argument === "--family") options.family = value;
      if (argument === "--size") options.size = value;
      if (argument === "--limit") options.limit = Number(value);
    } else if (argument.startsWith("-"))
      throw new Error("Unknown option: " + argument);
    else words.push(argument);
  }
  options.query = words.join(" ");
  return options;
}
function main(args) {
  const options = parseFindIconOptions(args);
  if (options.help) {
    console.log(
      "Usage: node find_icon.mjs [keywords] [--query text] [--family system|status|file|empty|pedestal] [--size 24|24x24] [--limit 20] [--json]\nReads only the Skill icons.json. --size filters confirmed native dimensions; it does not resize artwork.",
    );
    return;
  }
  const result = findIcons(options);
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(
      `${result.total} registered match(es); showing ${result.results.length}; ${result.registry.packageName}@${result.registry.version} (${result.registry.sourceCommit})`,
    );
    for (const icon of result.results) {
      console.log(
        `${icon.key}\n  family=${icon.family}; name=${icon.name}; alias=${icon.alias}; native=${icon.native?.width ?? "?"}x${icon.native?.height ?? "?"}; rendered=${icon.renderedCanvas?.width ?? "?"}x${icon.renderedCanvas?.height ?? "?"}`,
      );
      for (const binding of icon.publicBindings)
        console.log(
          `  import { ${binding.publicImport.exportName} } from ${JSON.stringify(binding.publicImport.moduleName)}; props=${JSON.stringify(binding.props)}`,
        );
    }
  }
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

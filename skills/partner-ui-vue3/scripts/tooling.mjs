import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scripts = dirname(fileURLToPath(import.meta.url));
/** Resolve only installed local tools: target project, packaged harness, then the maintainer repo. */
export function requireProjectTool(names, project) {
  const modules = Array.isArray(names) ? names : [names];
  const roots = [
    ...new Set(
      [
        project,
        process.cwd(),
        resolve(scripts, "../assets/harness"),
        resolve(scripts, "../../.."),
      ]
        .filter(Boolean)
        .map((directory) => resolve(directory)),
    ),
  ];
  for (const root of roots) {
    const require = createRequire(resolve(root, "package.json"));
    for (const module of modules) {
      try {
        return require(module);
      } catch (error) {
        if (
          error.code !== "MODULE_NOT_FOUND" &&
          error.code !== "ERR_PACKAGE_PATH_NOT_EXPORTED"
        )
          throw error;
      }
    }
  }
  throw new Error(
    `LOCAL_TOOL_MISSING: install assets/harness dependencies (needed: ${modules.join(" or ")})`,
  );
}

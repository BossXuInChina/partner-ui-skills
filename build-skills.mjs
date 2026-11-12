#!/usr/bin/env node
// One-step build of the four consumable skills into ./dist/.
// Usage (from the repo folder, any OS):  node build-skills.mjs
// Writes a full log to build-skills.log; send that file back if something fails.
import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const logFile = join(root, "build-skills.log");
const isWindows = process.platform === "win32";
const verifiedNode = "24.21.0";
const skills = ["partner-ui-pages", "partner-ui-vue3", "partner-ui-review", "design-requirement-canvas"];

writeFileSync(logFile, `build-skills ${new Date().toISOString()}\n`);
const log = (text) => appendFileSync(logFile, text.endsWith("\n") ? text : text + "\n");
const say = (text) => { console.log(text); log(text); };
const stop = (text) => {
  say("\n✗ " + text);
  say(`  Full log: ${logFile}`);
  process.exit(1);
};

// Run a command, stream its output to the console and the log, return true on success.
function run(label, command, args) {
  say(`\n▶ ${label}\n  ${command} ${args.join(" ")}`);
  // Windows needs a shell to find pnpm.cmd / corepack.cmd.
  const result = spawnSync(command, args, { cwd: root, shell: isWindows, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (result.stdout) { process.stdout.write(result.stdout); log(result.stdout); }
  if (result.stderr) { process.stderr.write(result.stderr); log(result.stderr); }
  if (result.error) log(String(result.error));
  return result.status === 0;
}
function quiet(command, args) {
  const result = spawnSync(command, args, { cwd: root, shell: isWindows, encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : null;
}

say("Partner UI skills — build into ./dist/");
say(`Repo: ${root}`);

// 1. Right folder?
let manifest;
try { manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8")); } catch {}
if (!manifest || !existsSync(join(root, "source.lock.json")) || !existsSync(join(root, "skills")))
  stop("Run this script from the partner-ui-skills repo folder (the one containing package.json and skills/).");

// 2. Node version: the build is verified on 24.21.0; other versions may fail the drift check.
say(`\nNode ${process.versions.node} (verified: ${verifiedNode}) on ${process.platform}`);
if (process.versions.node.split(".")[0] !== verifiedNode.split(".")[0])
  say(`! Node ${process.versions.node} is not Node 24. If the build fails with GENERATED_DRIFT, install Node ${verifiedNode} and rerun.`);

// 3. pnpm: use it if installed, otherwise run the pinned version through corepack (ships with Node).
const wanted = (manifest.packageManager ?? "pnpm@11.22.0").replace(/^pnpm@/, "").split("+")[0];
let pnpm = ["pnpm", []];
const found = quiet("pnpm", ["--version"]);
if (found) {
  say(`pnpm ${found} (repo pins ${wanted})`);
} else if (quiet("corepack", ["--version"])) {
  say(`pnpm not found; using corepack pnpm@${wanted}`);
  pnpm = ["corepack", [`pnpm@${wanted}`]];
} else {
  stop(`pnpm not found and corepack unavailable. Install pnpm with:  npm install -g pnpm@${wanted}  then rerun.`);
}
const runPnpm = (label, args) => run(label, pnpm[0], [...pnpm[1], ...args]);

// 4. Install the locked dependencies, check the component lock, build.
if (!runPnpm("Installing locked dependencies", ["install", "--frozen-lockfile"]))
  stop("Dependency install failed. Check your network/registry access, then rerun.");
if (!runPnpm("Checking locked component packages", ["verify:lock"]))
  stop("Component lock check failed. The vendor/ files or source.lock.json do not match; do not edit them, send the log instead.");
if (!runPnpm("Building the skills", ["build"]))
  stop("Build failed. Send build-skills.log for diagnosis.");

// 5. Confirm each skill folder is importable (has SKILL.md at its top).
const dist = join(root, "dist");
const missing = skills.filter((name) => !existsSync(join(dist, name, "SKILL.md")));
if (missing.length) stop("Build finished but these skills are missing from dist/: " + missing.join(", "));

say("\n✓ Done. Import each of these folders as its own skill:");
for (const name of skills) say("  " + resolve(dist, name));
const zips = readdirSync(dist).filter((name) => name.endsWith(".zip"));
if (zips.length) say("\nSingle-file uploads (one skill per zip):\n" + zips.map((z) => "  " + resolve(dist, z)).join("\n"));
say(`\nLog: ${logFile}`);

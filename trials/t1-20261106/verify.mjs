import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const work = resolve(process.cwd(), "../");
const checks = [
  ["install", "pnpm install --frozen-lockfile"],
  ["typecheck", "pnpm run typecheck"],
  ["lint", "pnpm run lint"],
  ["format", "pnpm run format:check"],
  ["rules", "pnpm run check:rules"],
  ["unit", "pnpm run test:unit"],
  ["build", "pnpm run build"],
  ["vue-runtime", "node tests/feature/vue-runtime.mjs"],
  ["smoke", "node tests/feature/smoke.mjs"],
  ["browser", "node tests/feature/qa.mjs"],
  ["mock-flag", "VITE_ENABLE_MOCKS=true pnpm run build"],
];
mkdirSync(resolve(work, "logs"), { recursive: true });
const results = [];
for (const [name, command] of checks) {
  const start = Date.now();
  const result = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    timeout: 180000,
  });
  const output = (result.stdout ?? "") + (result.stderr ?? "");
  const expectedFailure = name === "mock-flag";
  const passed = expectedFailure
    ? result.status !== 0 && output.includes("PRODUCTION_MOCK_FLAG")
    : result.status === 0;
  const entry = {
    name,
    command,
    result: passed ? (expectedFailure ? "expected-failure" : "pass") : "fail",
    durationMs: Date.now() - start,
  };
  results.push(entry);
  writeFileSync(resolve(work, `logs/${name}.log`), output);
  writeFileSync(
    resolve(work, "checks.json"),
    JSON.stringify(results, null, 2) + "\n",
  );
  console.log(`${entry.name}: ${entry.result} (${entry.durationMs} ms)`);
  if (!passed) process.exit(1);
}

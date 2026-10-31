#!/usr/bin/env node
/** External QA only; mock modules never enter the production app graph. */
import { existsSync, realpathSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSmokeOptions, runSmoke } from '../../../../scripts/smoke.mjs';
import { prepareTemplateFixtures } from './template-backend.mjs';

export async function runTemplateSmoke(options = {}) {
  const project = resolve(options.project ?? fileURLToPath(new URL('../..', import.meta.url)));
  const fixtures = await prepareTemplateFixtures(project, { fontsRoot: options.fontsRoot });
  try {
    const result = await runSmoke({ ...options, project, setupPage: fixtures.setupPage });
    result.backendSessions = fixtures.sessions;
    if (fixtures.failures.length) {
      result.status = 'FAIL';
      result.backendFailures = fixtures.failures;
    }
    writeFileSync(result.receipt, JSON.stringify(result, null, 2) + '\n');
    fixtures.assertNoFailures();
    return result;
  } catch (error) {
    if (error.result?.receipt) {
      error.result.backendSessions = fixtures.sessions;
      error.result.backendFailures = fixtures.failures;
      writeFileSync(error.result.receipt, JSON.stringify(error.result, null, 2) + '\n');
    }
    throw error;
  } finally {
    await fixtures.close();
  }
}
async function main(args) {
  const remaining = [];
  let fontsRoot;
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--fonts-root') {
      fontsRoot = args[++index];
      if (!fontsRoot || fontsRoot.startsWith('--'))
        throw new Error('--fonts-root requires an approved original font directory');
    } else remaining.push(args[index]);
  }
  const options = parseSmokeOptions(remaining);
  const result = await runTemplateSmoke({ ...options, fontsRoot });
  console.log(
    `PASS: ${result.routes.length} template route smoke(s), two viewports each; receipt: ${result.receipt}`,
  );
}
const ownFile = fileURLToPath(import.meta.url);
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(resolve(process.argv[1])) === realpathSync(ownFile)
) {
  try {
    await main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

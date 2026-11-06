#!/usr/bin/env node
import { resolve } from 'node:path';
import { options, visitRoutes, saveJSON, isMain } from './browser.mjs';

export async function capture(opt) {
  const results = await visitRoutes(opt, async page => ({ aiRoots: await page.locator('.partner-ai').count() }));
  saveJSON(resolve(opt.out, 'shots.json'), results);
  return results;
}
if (isMain(import.meta.url)) {
  const result = await capture(options(process.argv.slice(2)));
  console.log(JSON.stringify(result.map(({ route, width, state, errors, notVerified }) => ({ route, width, state, errors: errors.length, notVerified }))));
  process.exitCode = result.some(r => r.errors.length || r.notVerified?.length) ? 1 : 0;
}

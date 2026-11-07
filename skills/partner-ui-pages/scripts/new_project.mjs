import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { allFiles, cli, fail, loadKit, parseArgs, skillRoot, writeNewDirectory } from './project/files.mjs';

cli(() => {
  const args = parseArgs(process.argv.slice(2), ['--help'], ['--out', '--id', '--title']);
  if (args['--help']) return console.log('node scripts/new_project.mjs --out ./my-demo [--id my-demo] [--title "伙伴工作台"]');
  if (!args['--out'] || args.positional.length) fail('PROJECT_USAGE', 'provide --out; use --help');
  const id = args['--id'] ?? basename(resolve(args['--out']));
  if (!/^[a-z][a-z\d-]*$/.test(id)) fail('PROJECT_ID', 'use --id with lowercase letters, digits and hyphens');
  const template = resolve(skillRoot, 'assets/project/starter');
  const files = new Map(allFiles(template).map(name => [name, readFileSync(resolve(template, name))]));
  const config = JSON.parse(files.get('project.json'));
  config.id = id;
  config.title = args['--title'] ?? config.title;
  files.set('project.json', JSON.stringify(config, null, 2) + '\n');
  files.set('kit-lock.json', JSON.stringify(loadKit().pin, null, 2) + '\n');
  writeNewDirectory(args['--out'], files);
  console.log(JSON.stringify({ project: resolve(args['--out']), pages: config.pages.map(page => page.id), next: 'Run project_index.mjs, then emit_project.mjs. No npm install is needed.' }, null, 2));
});

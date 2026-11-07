import { cli, fail, loadKit, parseArgs } from './project/files.mjs';
cli(() => {
  const args = parseArgs(process.argv.slice(2), ['--help'], ['--query', '--name']);
  if (args['--help']) return console.log('node scripts/catalog.mjs [--query keyword | --name WorkbenchTabs]');
  if (args.positional.length) fail('PROJECT_USAGE', 'use --query or --name');
  let assets = loadKit().catalog.assets;
  if (args['--name']) assets = assets.filter(asset => asset.name === args['--name']);
  if (args['--query']) { const query = args['--query'].toLowerCase(); assets = assets.filter(asset => JSON.stringify(asset).toLowerCase().includes(query)); }
  console.log(JSON.stringify(args['--name'] ? assets : assets.map(({ id, name, label, kind, reference }) => ({ id, name, label, kind, reference })), null, 2));
});

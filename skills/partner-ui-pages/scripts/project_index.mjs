import { cli, fail, parseArgs } from './project/files.mjs';
import { makeIndex, readProject } from './project/graph.mjs';
cli(() => {
  const args = parseArgs(process.argv.slice(2), ['--help'], ['--query', '--changed', '--page']);
  if (args['--help']) return console.log('node scripts/project_index.mjs <project-dir> [--query keyword | --changed path] [--page page-id]');
  if (args.positional.length !== 1) fail('PROJECT_USAGE', 'provide one project directory; use --help');
  const index = makeIndex(readProject(args.positional[0], { page: args['--page'] }));
  if (args['--changed']) {
    const paths = args['--changed'].split(',');
    for (const path of paths) if (!index.entries.some(item => item.path === path)) fail('PROJECT_INDEX_PATH', path + ' is not in the selected dependency graph');
    const affected = new Set(paths), pending = [...paths];
    while (pending.length) {
      const path = pending.pop();
      for (const user of index.entries.find(item => item.path === path).usedBy) if (!affected.has(user)) { affected.add(user); pending.push(user); }
    }
    index.entries = index.entries.filter(item => affected.has(item.path));
  }
  if (args['--query']) {
    const query = args['--query'].toLowerCase();
    index.entries = index.entries.filter(item => JSON.stringify(item).toLowerCase().includes(query));
  }
  console.log(JSON.stringify(index, null, 2));
});

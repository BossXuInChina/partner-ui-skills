import { cli, fail, parseArgs } from './project/files.mjs';
import { deliveryFiles } from './project/emit.mjs';
import { makeIndex, readProject } from './project/graph.mjs';
cli(() => {
  const args = parseArgs(process.argv.slice(2), ['--help'], ['--page']);
  if (args['--help']) return console.log('node scripts/check_project.mjs <project-dir> [--page page-id]');
  if (args.positional.length !== 1) fail('PROJECT_USAGE', 'provide one project directory; use --help');
  const project = readProject(args.positional[0], { page: args['--page'] });
  deliveryFiles(project); // Also checks CSS assets and deterministic output construction; no files are written.
  const index = makeIndex(project);
  console.log(JSON.stringify({ ok: true, scope: 'Static dependency/template/literal-prop/lock/offline-asset checks. No source execution, browser interaction, or visual acceptance.', pages: index.pages.map(page => page.id), modules: project.modules.size, sourceFiles: index.entries.length, largeModules: index.entries.filter(item => item.lines > 350 || item.bytes > 18000).map(item => ({ path: item.path, lines: item.lines, bytes: item.bytes })) }, null, 2));
});

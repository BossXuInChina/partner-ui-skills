import { cli, fail, parseArgs } from './project/files.mjs';
import { emitProject } from './project/emit.mjs';
import { emitComponentProject } from './project/component-project.mjs';
cli(async () => {
  const args = parseArgs(process.argv.slice(2), ['--single', '--help', '--components'], ['--out', '--page']);
  if (args['--help']) return console.log('node scripts/emit_project.mjs <project-dir> [--components] [--single] [--page page-id] [--out directory]');
  if (args.positional.length !== 1) fail('PROJECT_USAGE', 'provide one project directory; use --help');
  const emit = args['--components'] ? emitComponentProject : emitProject;
  console.log(JSON.stringify(await emit(args.positional[0], { single: !!args['--single'], out: args['--out'], page: args['--page'] }), null, 2));
});

import { spawnSync } from 'node:child_process';

const python = process.env.SKILLS_PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const result = spawnSync(python, process.argv.slice(2), { stdio: 'inherit' });
if (result.error) {
  console.error(`Python could not be started (${python}); set SKILLS_PYTHON to its executable path.`, result.error.message);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}

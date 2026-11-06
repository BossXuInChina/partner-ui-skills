import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = fileURLToPath(new URL('.', import.meta.url));
const skill = resolve(root, '../../dist/partner-ui-vue3');
const sha = file => createHash('sha256').update(readFileSync(file)).digest('hex');
const pinnedFile = resolve(root, 'source.lock.json');
const currentFile = resolve(skill, 'source.lock.json');
if (sha(pinnedFile) !== sha(currentFile)) throw Error('Skill source.lock.json 与本试验锁不一致；拒绝混用');
const lock = JSON.parse(readFileSync(pinnedFile, 'utf8'));
mkdirSync(resolve(root, 'vendor'), { recursive: true });
for (const pkg of lock.packages) {
  const name = pkg.tarball.split('/').at(-1);
  const source = resolve(skill, pkg.tarball);
  const target = resolve(root, 'vendor', name);
  if (sha(source) !== pkg.sha256) throw Error(`Skill tarball SHA 不匹配: ${pkg.name}`);
  const release = pkg.name === '@workbench/ui-vue3' ? 'package/dist/release.json' : 'package/dist-lib/release.json';
  const result = spawnSync('tar', ['-xOzf', source, release], { encoding: 'utf8' });
  if (result.status !== 0) throw Error(`无法读取包信息: ${pkg.name}`);
  const stamp = JSON.parse(result.stdout);
  if (stamp.version !== pkg.version || stamp.sourceCommit !== pkg.sourceCommit) throw Error(`包版本或来源不匹配: ${pkg.name}`);
  copyFileSync(source, target);
  if (sha(target) !== pkg.sha256) throw Error(`复制校验失败: ${pkg.name}`);
  console.log(`${pkg.name}@${pkg.version}: SHA 和来源匹配`);
}

import { createHash } from 'node:crypto';
import { readFileSync, realpathSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root=fileURLToPath(new URL('.',import.meta.url)); const host=resolve(root,'host'); const skill=resolve(root,'../../dist/partner-ui-vue3');
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const lock=JSON.parse(readFileSync(resolve(skill,'source.lock.json'))); const baseline=JSON.parse(readFileSync(resolve(root,'baseline-files.json')));
const manifest=JSON.parse(readFileSync(resolve(host,'package.json'))); const checked=[];
for(const p of lock.packages){ const file=resolve(root,'vendor',p.tarball.split('/').at(-1)); if(hash(file)!==p.sha256) throw Error(`tar mismatch ${p.name}`); const direct=manifest.dependencies[p.name]; if(direct!==`file:../vendor/${p.tarball.split('/').at(-1)}`) throw Error(`dependency mismatch ${p.name}`); const release=p.name==='@workbench/ui-vue3'?'package/dist/release.json':'package/dist-lib/release.json'; const result=spawnSync('tar',['-xOzf',file,release],{encoding:'utf8'}); if(result.status!==0) throw Error('tar release missing'); const stamp=JSON.parse(result.stdout); if(stamp.version!==p.version||stamp.sourceCommit!==p.sourceCommit) throw Error(`stamp mismatch ${p.name}`); checked.push({name:p.name,sha256:p.sha256,sourceCommit:p.sourceCommit}); }
for(const file of ['pnpm-lock.yaml','tests/unit/baseline.test.ts','tests/browser/baseline.spec.ts','src/pages/HomePage.vue','src/services/http.ts']) if(hash(resolve(host,file))!==baseline[file]) throw Error(`baseline modified ${file}`);
const prettier=await import(resolve(host,'node_modules/prettier/index.mjs'));
for(const file of ['route-sizes.mjs','mock-guard.mjs']) { const from=readFileSync(resolve(skill,'assets/harness/build',file),'utf8'); const local=readFileSync(resolve(host,'build',file),'utf8'); if(await prettier.format(from,{filepath:file})!==local) throw Error(`mixed harness tool ${file}`); }
const files = ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','vite.config.ts','tsconfig.json','playwright.config.ts', ...['src','tests','build'].flatMap(function walk(dir) { return readdirSync(resolve(host,dir), { withFileTypes:true }).flatMap(entry => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]); })];
const hostHashes = Object.fromEntries(files.sort().map(file => [file, hash(resolve(host,file))]));
if (hash(resolve(root,'source.lock.json')) !== hash(resolve(skill,'source.lock.json'))) throw Error('试验锁与当前 Skill 锁不一致');
const trialHashes = Object.fromEntries(['source.lock.json','prepare.mjs','verify.mjs','check-sources.mjs'].map(file => [file, hash(resolve(root,file))]));
const evidence={trialHashes,hostHashes,skillPath:realpathSync(skill),skillSha256:hash(resolve(skill,'SKILL.md')),sourceLockSha256:hash(resolve(skill,'source.lock.json')),testingSha256:hash(resolve(skill,'references/testing.md')),checked};
console.log(JSON.stringify(evidence,null,2));

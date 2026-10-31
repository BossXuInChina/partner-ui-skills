import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const receipt = read('receipt.json');
const sourceCheck = spawnSync(process.execPath, [resolve(root, 'check-sources.mjs')], { encoding: 'utf8' });
if (sourceCheck.status !== 0 || sourceCheck.stdout !== readFileSync(resolve(root, 'checks/sources.log'), 'utf8') || receipt.checks.some(c => c.exitCode !== 0) || receipt.checks.length !== 13) throw Error('Source or verification evidence is stale or incomplete');
const graph = read('host/dist/route-chunks.json');
const pkgs = [
  ['@workbench/ui-vue3','0.2.0-prototype.20261031.1','workbench-ui-vue3-0.2.0-prototype.20261031.1.tgz','ec8ed28188210781fe9d8aab582e41f736a99efc0740a8f6e79deb94e98ba82a','af939228028791e24280015c5d48a35a658d40f3',{channel:'development',developmentEligible:true,stableEligible:false,targetProductionEligible:false}],
  ['huawei-partner-ai-ui','0.3.1-dev.20261031.1','huawei-partner-ai-ui-0.3.1-dev.20261031.1.tgz','69045605688b022f114788274991a36f3910eeadd92f876e5407b5b7f2cf75d7','8d5f658b9152fecbe954840ac2f52a01c551636f',{}],
].map(([name,version,file,sha256,sourceCommit,status])=>({name,version,source:{kind:'tarball',file:`vendor/${file}`,sha256},sourceCommit,sourceHasLocalChanges:false,status}));
const d = { feature:'agreements-query', skillVersion:null, generatedAt:new Date().toISOString(), packages:pkgs,
 vue:{peerRequired:{'@workbench/ui-vue3':'>=3.5.13 <=3.5.42','huawei-partner-ai-ui':'>=3.5.13 <=3.5.42'},resolved:'3.5.13',singleInstance:null, evidence:['checks/vue-tree.log','host/dist/vue-runtime-evidence.json','browser-vue.json','smoke/receipt.json']},
 pages:[{route:'/',file:'host/src/pages/HomePage.vue',components:['WorkbenchButton']},{route:'/agreements',file:'host/src/pages/AgreementsPage.vue',components:['WorkbenchAlert','WorkbenchButton','WorkbenchDraftListFilter','WorkbenchFormItem','WorkbenchInput','WorkbenchSelect','WorkbenchTable']}],customComponents:[],
 api:[{name:'loadAgreements',method:'GET',path:null,status:'assumed',notes:'本地假设 /api/agreements，参数 name/status/page/pageSize，响应 items/total；复用宿主 Axios 与 AbortSignal；真实路径与鉴权待确认。'}],
 requirements:[{id:'R1',text:'只读协议列表、名称和状态筛选、重置、分页',files:['host/src/pages/AgreementsPage.vue','host/src/services/agreements.ts'],status:'assumed'},{id:'R2',text:'请求中、空、失败重试及取消旧请求',files:['host/src/pages/AgreementsPage.vue'],status:'done'},{id:'R3',text:'路由往返保留查询条件和共享访问记录',files:['host/src/stores/workspace.ts','host/src/router/index.ts'],status:'done'}],
 checks:receipt.checks.map(c=>({name:c.name,command:c.command,result:c.exitCode===0?'pass':'fail',durationMs:c.durationMs,startedAt:c.startedAt,endedAt:c.endedAt,evidence:c.log})),
 bundle:{routeChunksKb:graph.routes.map(r=>({route:r.route,entryFiles:[r.entryChunk.fileName],staticKb:r.staticDependencies.rawJSBytes/1024,dynamicKb:r.dynamicDependencies.rawJSBytes/1024,sharedFiles:r.staticDependencies.sharedChunkFiles})),notes:['未压缩 rawBytes / 1024；共享 chunk 不跨路由相加，不代表传输大小或性能。详情见 host/dist/route-chunks.json。构建存在大 chunk 提示。']},
 knownLimits:['Skill 未声明独立版本。','接口、鉴权、目标平台、生产资格、跨浏览器及人工视觉验收均未验证；Workbench 包声明 targetProductionEligible=false，AI 包未声明生产资格。','安装树和构建可见 Vue runtime 模块为 3.5.13，浏览器应用实例报告 3.5.13；预编译代码中可能内嵌的 runtime 无法独立归因，singleInstance 保持 null。','engines 声明 Node >=22.12，但当前 pnpm 要求 >=22.13；本次使用 Node 26。','QA 网络桩只在浏览器测试进程注入，不是实际后端。']};
writeFileSync(resolve(root,'delivery.json'),JSON.stringify(d,null,2)+'\n');
const lines = ['# 协议查询交付（修订 Skill 流程）','',`生成：${d.generatedAt}`,'','## 页面与契约','','- /agreements：只读列表、名称和状态筛选、重置、分页、加载/空/错误与重试；切回首页后保留已提交条件和页码。','- 假设 GET /api/agreements（name、status、page、pageSize；items、total），复用宿主 Axios 与鉴权；真实契约待确认。','- 保留首页及共享访问记录；外部 QA 桩仅用于验证。','','## 验证','',...d.checks.map(c=>`- ${c.name}: ${c.result}（${c.durationMs} ms；${c.evidence}）`),'',`实际范围：${receipt.startedAt} 至 ${receipt.endedAt}（UTC），Node ${receipt.node}。两条路由各覆盖 1440×900 和 1280×800；浏览器覆盖查询、状态、分页、空、错误重试、并发及路由往返。`,'','## 包与产物','',...d.packages.map(p=>`- ${p.name}@${p.version}：${p.source.file}，SHA-256 ${p.source.sha256}，来源提交 ${p.sourceCommit}；资格 ${JSON.stringify(p.status)}。`),...d.bundle.routeChunksKb.map(r=>`- ${r.route}：静态闭包 ${r.staticKb.toFixed(1)} KiB，动态闭包 ${r.dynamicKb.toFixed(1)} KiB（未压缩，含共享文件）。`),'','## 限制','',...d.knownLimits.map(x=>`- ${x}`),'','复跑：在本目录执行 `node verify.mjs`（自动核验当前 Skill 锁并复制 vendor，然后冻结安装及准备 Chromium），再执行 `node make-delivery.mjs` 更新清单。'];
writeFileSync(resolve(root,'DELIVERY.md'),lines.join('\n')+'\n');

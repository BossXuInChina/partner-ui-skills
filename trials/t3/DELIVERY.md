# 协议查询交付（修订 Skill 流程）

生成：2026-10-31T10:01:58.082Z

## 页面与契约

- /agreements：只读列表、名称和状态筛选、重置、分页、加载/空/错误与重试；切回首页后保留已提交条件和页码。
- 假设 GET /api/agreements（name、status、page、pageSize；items、total），复用宿主 Axios 与鉴权；真实契约待确认。
- 保留首页及共享访问记录；外部 QA 桩仅用于验证。

## 验证

- 全新临时副本（无 node_modules/vendor/dist）完成 vendor 准备、冻结安装及来源校验，证据见 clean-replay-receipt.json。
- prepare: pass（62 ms；checks/prepare.log）
- install: pass（1732 ms；checks/install.log）
- browser-prepare: pass（2744 ms；checks/browser-prepare.log）
- sources: pass（110 ms；checks/sources.log）
- vue-tree: pass（2723 ms；checks/vue-tree.log）
- typecheck: pass（2633 ms；checks/typecheck.log）
- lint: pass（2869 ms；checks/lint.log）
- format: pass（2041 ms；checks/format.log）
- rules: pass（2390 ms；checks/rules.log）
- unit: pass（2213 ms；checks/unit.log）
- build: pass（4020 ms；checks/build.log）
- browser: pass（5258 ms；checks/browser.log）
- smoke: pass（1119 ms；checks/smoke.log）

实际范围：2026-10-31T10:01:17.782Z 至 2026-10-31T10:01:47.696Z（UTC），Node v26.0.0。两条路由各覆盖 1440×900 和 1280×800；浏览器覆盖查询、状态、分页、空、错误重试、并发及路由往返。

## 包与产物

- @workbench/ui-vue3@0.2.0-prototype.20261031.1：vendor/workbench-ui-vue3-0.2.0-prototype.20261031.1.tgz，SHA-256 ec8ed28188210781fe9d8aab582e41f736a99efc0740a8f6e79deb94e98ba82a，来源提交 af939228028791e24280015c5d48a35a658d40f3；资格 {"channel":"development","developmentEligible":true,"stableEligible":false,"targetProductionEligible":false}。
- huawei-partner-ai-ui@0.3.1-dev.20261031.1：vendor/huawei-partner-ai-ui-0.3.1-dev.20261031.1.tgz，SHA-256 69045605688b022f114788274991a36f3910eeadd92f876e5407b5b7f2cf75d7，来源提交 8d5f658b9152fecbe954840ac2f52a01c551636f；资格 {}。
- /：静态闭包 1285.1 KiB，动态闭包 2762.6 KiB（未压缩，含共享文件）。
- /agreements：静态闭包 1345.8 KiB，动态闭包 2762.6 KiB（未压缩，含共享文件）。

## 限制

- Skill 未声明独立版本。
- 接口、鉴权、目标平台、生产资格、跨浏览器及人工视觉验收均未验证；Workbench 包声明 targetProductionEligible=false，AI 包未声明生产资格。
- 安装树和构建可见 Vue runtime 模块为 3.5.13，浏览器应用实例报告 3.5.13；预编译代码中可能内嵌的 runtime 无法独立归因，singleInstance 保持 null。
- engines 声明 Node >=22.12，但当前 pnpm 要求 >=22.13；本次使用 Node 26。
- QA 网络桩只在浏览器测试进程注入，不是实际后端。

复跑：在本目录执行 `node verify.mjs`（自动核验当前 Skill 锁并复制 vendor，然后冻结安装及准备 Chromium），再执行 `node make-delivery.mjs` 更新清单。

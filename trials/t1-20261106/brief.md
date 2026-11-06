# T1 记录

# 协议管理交付

源码：`overlay/src/features/agreements/`；运行 `./run.sh` 从锁定的独立 Skill 复制 harness、安装依赖并串行执行检查。宿主通过 `agreementApiKey` 注入接口。功能与验证路由分别列于 delivery.json。

## 实际验证

- install: pass（1785 ms；`pnpm install --frozen-lockfile`）
- typecheck: pass（3239 ms；`pnpm run typecheck`）
- lint: pass（4252 ms；`pnpm run lint`）
- format: pass（2402 ms；`pnpm run format:check`）
- rules: pass（1593 ms；`pnpm run check:rules`）
- unit: pass（7663 ms；`pnpm run test:unit`）
- build: pass（9428 ms；`pnpm run build`）
- vue-runtime: pass（66 ms；`node tests/feature/vue-runtime.mjs`）
- smoke: pass（1597 ms；`node tests/feature/smoke.mjs`）
- browser: pass（8448 ms；`node tests/feature/qa.mjs`）
- mock-flag: expected-failure（2886 ms；`VITE_ENABLE_MOCKS=true pnpm run build`）

Chromium headless 两尺寸检查搜索、状态筛选、第二页和重置时的请求参数与显示结果，以及空态/失败重试、详情连续 ID 切换、助手草稿、失败重试、停止和关闭回焦。transport 单测覆盖 AbortSignal 与失败重试身份；QA 网络桩仅由测试进程注入。

Vue、runtime-core、runtime-dom 安装物理副本各为一个 3.5.13；Node 实际导出身份、构建渲染模块和浏览器挂载结果支持当前工程单实例，证据见 evidence/vue-runtime.json。预编译包内部代码无法独立归因。

## 契约与限制

- Skill 未声明独立版本。
- 真实 API、端点、鉴权、权限、持久化策略和目标平台未验证。
- Workbench 包仅开发/原型资格，AI 包未声明生产资格；没有生产批准。
- 浏览器检查为 Chromium headless 两尺寸；未验证跨浏览器、人工视觉验收。
- 默认开发入口 /api 是假设路径，部署时宿主须注入经过验证的 API。
- 可见安装树和产物图支持单 Vue；预编译组件包内部潜在内嵌代码无法独立归因。

接口 DTO、分页、SSE 均为 assumed；`/api` 仅为 harness 示例，生产宿主应注入接口、端点与鉴权。包版本、完整来源、SHA、路由及体积口径见 delivery.json，原始图见 evidence/route-chunks.json。

## Skill 修订与复跑

当前 Skill 与 testing 指引已读取；按修订指引保留随包 workspace 和 vendor 相对位置，显式配置功能 router、体积与 QA 路由，验证步骤串行。文件 SHA-256 分别为 `b14731081dd93f74266d7af6316432679ddd01c3810c72ab04111bd47bc3ed4c`、`f66d68e9a4713657696af62729427f108f96cc5ff40037aee53e27379a4dd468`。

先前工具适配绊点已在修订后的 Skill 前置说明，本轮无此阻碍。Node 26.0.0、pnpm 11.22.0，冻结依赖从缓存克隆安装，未软链宿主 node_modules；本轮安装耗时见检查表。服务使用独立端口 4281 并已清理。

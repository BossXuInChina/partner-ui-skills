# 检查范围与证据

先验证最小相关范围，再按实际影响扩大。状态、props/emits、API 解码、取消、幂等、存储和失败重试优先用 Vitest 组件/组合逻辑测试；布局几何、原生焦点、滚动、拖拽及真实资源加载才需要浏览器。扩展已有测试；新增 browser spec 必须说明 component test 不能覆盖的具体原因，不为每个组件或修复建立永久浏览器套件。

## 使用已提供的工具

使用 harness 的 packageManager、锁文件和随包工具，不依赖全局安装的检查器。当前所锁 pnpm 要求 Node ≥22.13，engines 与技术栈默认声明差异见 [集成](integration.md)；不要在 22.12 用 pnpm 结果声称完整工程通过。复制 feature 后调整宿主路径与路由，具体见 [integration.md](integration.md)。复制 harness 时保留其 workspace 边界，避免 pnpm 在上层工作区安装。改用实际功能路由时，同时更新 router、体积报告的显式 routes、相关 QA URL 与数据契约；保留仍适用的断言，在对应功能测试中覆盖迁移后的行为，不改分析器源码硬编码路径。在验证工程目录运行：

```sh
cd assets/harness
pnpm install --frozen-lockfile
pnpm run verify
```

`verify` 当前串行执行 typecheck、lint、format:check、check:rules、test:unit、build、smoke:fixtures。它验证独立工程与外部 QA fixture，不证明真实公司 API/权限已接通。真实产品必须再用实际宿主契约验证；报告不能把定向结果称 full。

| 命令                             | 实际范围                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pnpm run typecheck`             | strict TypeScript、`strictTemplates`，检查 Page 与 typed API 边界                                                       |
| `pnpm run lint` / `format:check` | ESLint / Prettier                                                                                                       |
| `pnpm run check:rules`           | 调用 Skill 本地 `scripts/check_vue.mjs src`，报 file:line、rule 与严重性；非零 errors 退出失败                          |
| `pnpm run test:unit`             | Vitest；包括 scaffold 测试及 `src/templates/**/__tests__`                                                               |
| `pnpm run build`                 | 真实 Vite 产物、mock guard、`dist/route-chunks.json`                                                                    |
| `pnpm run smoke:fixtures`        | 六条模板路由；每条一次 smoke，分别访问 1440×900、1280×800；QA Node 进程编译隔离 mocks 并拦截 HTTP，不向生产图导入 mocks |
| `pnpm run smoke`                 | 相同 dev smoke 工具；未注入模板 fixture，需可用的真实宿主服务或调用方 setupPage                                         |
| `pnpm run test:browser`          | 现有 preview Playwright 用例；headless、仅失败截图/保留失败 trace，不是上述 dev 六路由 smoke 的替代                     |

日常可只跑相关 unit 文件与相关路由；提供实际执行命令、范围、结果和耗时。依赖变化、未知影响、交接或发布时再跑相应完整门禁。不要为了检查次数重复安装、重复打包，或通过跳过断言缩短时间。

## 静态与 mock 门禁

`check_vue.mjs` 检查公开导入边界、组件内部 CSS 覆盖、`!important`、硬编码颜色、图标名、非法 mock 导入、runtime template/compile、未净化 v-html、原生对话框与 PartnerUI 全局。spacing 非 4 倍数是 warning。它只追踪确定的局部常量、词法绑定与有限静态表达式；HTML 净化只认可不可变且未被重写的值和真实 Vue computed。let、可变 ref、任意 helper 返回等不确定值不会判为已净化。复杂解构、重导出、动态 options/样式/图标与未知函数副作用仍需复核。静态通过不是完整安全证明，也不证明完整运行时数据流、无障碍或业务正确性，不能代替类型/组件/浏览器验证。

`mocks/` 和 `*.mock.*` 只用于明确开发入口或测试。harness `.env.test` 显式启用 `VITE_ENABLE_MOCKS=true`，仅供 unit 注入测试替身；生产默认关闭，preview/smoke 使用外部 HTTP fixture。不要把该标记复制进 `.env.production`。

所有 `vite build`（含自定义 mode）在 mock flag=true 时直接失败；生产实际导入 mocks 路径也失败，包括别名及带 query 的导入。未被导入的 fixture 不因存在而失败，正常字段/文案中的 mock 单词也不应误报。维护仓 `verify:harness` 已包含真实 Vite 正例与故意导入/flag 负例；报告期望失败及具体门禁，不能把负例失败写成产品构建失败或把假子命令当真实验证。

## 路由 smoke 的真实边界

`smoke.mjs` 启动 Vite **dev**，从安装包公开类型取得 AI 组件名单；检查真实 DOM 的 console/页面错误、Vue warning、AI scope 与真实面板高度，并在 finally 关闭浏览器与服务。中性宿主与业务弹层例外、内联小卡片的尺寸规则见 [ai-ui-vue.md](ai-ui-vue.md)。相对图片地址仍须实际加载，不能通过忽略坏图完成验收。当前 smoke 没有独立坏图或控件越界检测器；这些项目须另做实际 DOM/资源复核，阶段视觉工具会检查图片是否加载成功。

已有产品可给本地工具传 `--routes <json>` 选择相关路由，路由项含 `path`，可加 `readySelector` 与 `expectAI`。当前工具还要求 Vite dev、`#app.__vue_app__` 挂载点和可见 `<main>`，AI 实例按 `#app` 的 app context 归属遍历，包含 Teleport 到挂载点外的节点；适用于附带 harness 及符合这些条件的宿主。其他挂载约定须适配 QA 工具或用产品已有浏览器验证，不为通过工具改产品结构。这仍是定向 dev smoke，不是全部产品行为测试。只有需要绘制/浏览器行为的改动才扩大浏览器范围。

## 截图只用于明确的证据任务

普通成功检查默认不写 PNG。显式 `--evidence`，或 `PARTNER_UI_EVIDENCE/SMOKE_EVIDENCE/WB_EVIDENCE/AI_EVIDENCE=1`，才开启成功截图；失败截图/trace 保留用于诊断。approved fonts 只在 QA 注入，feature 仍不打包字体。

模板交付或原型转换时做一次页面对照：原 HTML 与 Vue 路由在 1440×900、同一批准字体下保存完整 before/after、未 mask 并排/差异图和差异清单。允许删除演示说明、底部“页面说明”与 blank 参考路径说明；不遮盖真实布局或组件差异。像素比例用于定位，不能自动批准视觉或生产资格。

本维护仓根目录另有阶段工具（不随 Skill 分发）：

```sh
node build/verify-template-parity.mjs --evidence --project <已安装的独立harness>
```

它不自动给视觉 PASS；工程视觉复核、用户验收和生产批准分别记录。常规路由截图可用现有 `smoke:fixtures --evidence`，不要为此新增永久 per-component suite。

## 读取产物大小

附带插件默认按六份模板路径匹配；精简或改名时先按 [integration.md](integration.md) 同步配置/分析器，不能直接沿用默认六路报告。`dist/route-chunks.json` 来自实际 Rollup 图：区分 entry、路由静态闭包、动态闭包、共享 chunk 与样式/图片/字体资源，单独报告 initial 与全部 deferred/总产物。字节是未压缩产物大小，不是网络传输、gzip 或加载时间；同一 shared chunk 可出现在多个路由，不能跨路由直接求和。

TinyRobot 归因基于有实际 rendered 内容的模块 ID；已预编译进其他包单体代码的内容无法独立归因。依赖图未识别到 TinyRobot 不等于证明其字节不存在，动态输出也不能说成“没有产物”。发现包级单体/加载问题回包维护流程处理，不能由 feature 绕开公开入口或复制组件源码。

其他工具用法见 [tools.md](tools.md)；生成和提取成功本身不是验证通过，转换稿的 mount guard 只在人工完成迁移后移除。交付按 [delivery.md](delivery.md) 如实记录未运行项与范围。

运行会写临时文件的 fixture/smoke 与格式检查时使用验证脚本的串行顺序；并行任务各用独立工作目录与端口。交付清单分别列出功能模块路由和实际验证的 harness 路由，所有 contract、requirements 和报告路径都相对交付根且必须存在。

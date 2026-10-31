# 接入现有产品与独立验证工程

已有产品仓库的 package manager、TypeScript、ESLint、router、store、HTTP client、alias、i18n 与测试约定优先；不要为套用 Skill 更换它们。先核对依赖/路由/接口入口，再按需复制 `assets/templates/<name>/` 与 `assets/scaffold/` 中实际用到的模块。默认不添加 Pinia。

## 安装与单 Vue

当前锁定包均声明 Vue peer `>=3.5.13 <=3.5.42`，不把 Vue 作为生产普通依赖。用户运行时固定 **3.5.13**；3.5.42 是有限范围的另一个验证端点，不代表任意 Vue 版本都可用。版本升级后重新核对 manifest、元数据与锁，不能沿用旧断言。

- 消费随 Skill 的 `vendor/` tarball，通过 `file:` 安装，核实 `source.lock.json` 的版本、SHA-256 与完整 source commit。发布包是 API 真值；不读取相邻 Workbench/AI UI 维护仓。
- 独立 harness 从 `assets/harness/` 执行 `pnpm install --frozen-lockfile`；这里的 `file:../../vendor/<filename>` 按打包后的 Skill 目录解析。保留 vendor、lock 和 workspace，不把源码目录当 npm 包。
- harness 当前 engines 声明 Node ≥22.12，但所锁 pnpm 11.22.0 实际要求 Node ≥22.13（22.12 会在 pnpm 启动时失败）；运行完整工程请用 22.13+。该工具链声明待统一，不能把 22.12 的脚本验证当作完整安装验证。`pnpm-workspace.yaml` overrides 将 Vue 及其 runtime/compiler/shared 子包固定 3.5.13；Vite `resolve.dedupe` 含 `vue` 与 TinyRobot。现有产品用其等价 overrides/dedupe 配置，并核对子包是否一致。
- 用安装树、实际 resolved 路径及消费者构建/浏览器证据确认单实例；overrides 或版本字符串相同本身不构成证明。不要在同页把 CDN Vue、另一包的嵌套 Vue 或不同 URL 的 Vue 模块混用。
- 使用 scaffold 的 `AssistantCloseButton.vue` 时，产品直接声明 `@opentiny/tiny-robot@0.5.1`。它使用公开 `TrActionButton` 和 AI UI 的 `AiIcon`；AI UI 当前没有对应 close-button 组件导出，不依赖传递依赖碰巧可解析。

## 样式、字体与宿主容器

按实际消费在应用入口各导入一次。纯 Workbench 功能只需 Workbench CSS；使用 AI 时按 [harness 入口](../assets/harness/src/main.ts) 保留以下顺序：

```ts
import "@workbench/ui-vue3/styles.css";
import "@opentiny/tiny-robot/dist/style.css";
import "huawei-partner-ai-ui/styles.css";
// 再导入产品自己的宿主布局样式。
```

TinyRobot 的 `dist/style.css` 是该依赖文档提供的样式入口；不是打开 Workbench/AI UI 私有模块的许可。组件与公开类型只从两包根导入，允许的两包 CSS 入口如上。不要复制库源码、内部选择器或整段编译 CSS 到功能里。

字体由宿主提供批准的字体资源；Skill 不携带字体，也不转换/子集化字体。harness 在 `body` 使用 `--partner-ui-host-font-family`，共享 `.feature-page` 将 AI 字体映射到该值。产品应在应用根之外的宿主层定义字体，使 Teleport 到 `body` 的弹层和多个 Vue app 都可继承；只在 Page 的 scoped CSS 设置字体不能覆盖这些位置。若需让包内已声明字体 Token 采用宿主字体，按当前 [Token 参考](tokens.md) 的公开字体 Token 作有限映射，并验证真实计算样式，不猜 Token 名称。

`--partner-ui-host-font-family`、宿主高度和 feature 布局变量属于 host token，不用来重定义组件内部间距、颜色或绘制。Foundation Token 优先；字体接线和宿主布局可使用明确记录的 host token 例外。禁止 `.wb-*`、`.tr-*`、`.partner-ai` 后代或 `:deep()` 覆盖内部样式；无 `!important`。外层 feature 容器设置布局即可，不给 AI 面板再叠装饰背景、边框和阴影。

## 路由、挂载与 AI

页面按产品 router 懒加载，API 用必填 props 或产品既有 DI 注入。附带 harness 的 `src/template-routes.ts` 展示六个 `/templates/<name>` 路由和 typed API 注入；这些是验证工程入口，不要求产品保留该路由命名。生产页面使用预编译 SFC，不挂 `window.PartnerUI`、不传 `template:` 字符串、不用 window 事件总线。

同页挂载多个 Vue app 时，在各自首次 mount **之前** 设置不同 `app.config.idPrefix`，避免 AI UI `useId` 及 SVG/ARIA ID 冲突；卸载时调用该 app 的 `unmount()`，不删另一个 app 的节点。一个 app 内多个面板仍给各自的历史 namespace。router、状态、API 与存储实例的生命周期由宿主确定。

AI 入口用 `defineAsyncComponent` 或路由动态 import，业务 renderers 也按需导入。协议业务使用 `AgreementAssistantPanel` + 真实 `AgreementAssistantAdapter`；通用业务使用 `ChatPanel` + scaffold `useChatSession(transport)`。当前实际公开导出还包括 `AssistantHostLayout`、`BusinessOverlayHost`；以包根 `.d.ts` 核对 props/events，不能据名字猜用法。AI 的详细接线见 [ai-ui-vue.md](ai-ui-vue.md)。

AI 组件置于 `.partner-ai` scope；聊天/助手**面板**从宿主取得明确高度（可采用已确定高度的 flex/grid 容器，并给可收缩子项 `min-height: 0`）。验证实际面板至少 200px，不只看祖先写了百分比。内联 SmartTag/Card 保持内容高度，不强行撑为面板。宿主外层保持中性，布局包装类属于 feature；AI 自身视觉通过公开 API 与 Token 控制。

附带 `routeChunkReport({ root })` 默认要求六份 `src/templates/<name>/Page.vue` 全部参与构建。只保留部分示例时，在 `vite.config.ts` 用 `routeChunkReport({ root, names: ['workbench-list'] })` 选实际保留模板，并同步 router 与 QA 路由。功能采用产品目录/路由时，改传显式 `routes: [{ route: '/agreements', file: 'src/features/agreements/Page.vue', business: true }]`（不与 `names` 同传）；`file` 必须对应项目内实际参与构建的 Page，路由表非空且名称唯一。缺失所选 facade 仍使构建失败。插件只归因显式配置，不自动发现任意业务路由；不能以补回无关页面或忽略构建错误完成精简接入。

懒加载只能改变消费入口。检查构建的 `route-chunks.json`，记录应用入口加路由静态闭包中的真实 TinyRobot 归属；包本身若有聚合依赖，不能用 `defineAsyncComponent` 的存在宣称已消除首屏成本。

## API、取消与历史隐私

URL、鉴权、权限、request/response decoder、下载和导航由宿主实现。harness `src/template-api.ts` 的 fetch/SSE 路径是 **assumed** 验证契约，不能照抄成公司接口；真实网络响应先按 DTO 校验。业务 mutation 把注入的 `signal` 和 `idempotencyKey` 传给服务；显式重试同一操作复用 key，不把某个任意 ID 当作所有业务操作身份。

scaffold 的 transport 接收配置 URL/headers 与协议 decoder，处理流式取消；默认 SSE 协议仍是 assumed。路由离开、scope 释放和用户停止都取消请求，旧请求不能覆盖新状态。接口与状态接入完成后，还需验证加载、空、错误、取消、防重、重试和关键键盘路径。

历史默认关闭持久化，不直接采用包提供的浏览器默认存储：

- `AgreementAssistantPanel` 的 `historyOptions` 接受 `namespace` / `storage`。显式注入隔离的空读/空写 storage，可保持关闭持久化；需要启用时由宿主实现已批准的 `ConversationStorage`。
- scaffold `ChatStorage` 通过 read/write 闭包绑定功能 namespace 与隐私策略。注入本身不读写，只有显式 `restore()` / `persist()` 才执行 IO；`reset()` 不自动删除已存数据。
- 现有 AI 模板另有必填 `historyNamespace` 及可选 storage。沿用其真实公开接口；不同功能、租户或账号不能无意复用历史空间，账号切换及删除策略由产品契约决定。

## 当前可用检查与工具边界

`check_vue.mjs` 和 `smoke.mjs` 已提供，具体规则、运行方式与证据开关见 [testing.md](testing.md)。harness 有类型、lint、单测、mock 构建 guard 及路由 chunk 报告；这些检查不等于平台注册、真实 API 或生产批准。

`new_feature.mjs` 生成所选模板与必要 scaffold 的源码起点，保留 typed API 注入及懒路由，依赖仍由宿主安装；`find_icon.mjs` 检索真实注册数据；`convert_prototype.mjs` 仅做 guarded 静态提取。用法见 [tools.md](tools.md)，迁移仍按 [conversion.md](conversion.md) 人工核对公开导出、业务/API 假设与视觉。

Starling、TurboUI 目标平台接入尚未验证；遵循其实际产品仓库和已提供的契约，不虚构平台 API、配置或验收结果。把这些缺口写入 [交付清单](delivery.md) 的 `knownLimits`。

# Vue 业务模块中的 AI

本页只说明公开类型与现有 scaffold 已验证的组合方式，不补写组件 API 手册。AI 包的 `components.json` 已由实际声明生成；16 个公开组件及非组件辅助导出见 [AI 索引](ai-ui/index.md) 与 [包参考](ai-ui.md)。新增 props、事件或 slots 先核对锁定包的公开 TypeScript 入口，不能从名称推测，也不能导入包内部实现。

## 选择会话入口

- 通用问答、智能问数：公开 `ChatPanel` 配 [`useChatSession`](../assets/scaffold/chat/useChatSession.ts)、注入的 `ChatTransport` 和业务 SFC renderers。Page 负责绑定 `messages/processing/error/aborted` 及 `send/abort/retry/newConversation`；状态与请求放 composable。实例见 [ai-chat](../assets/templates/ai-chat/Page.vue)。
- 协议业务：使用公开 `AgreementAssistantPanel` 与真实 `AgreementAssistantAdapter`。[`createAgreementAdapter`](../assets/scaffold/ai/agreementAdapter.ts) 只转发宿主 API、signal、上下文与幂等键，不补造业务响应；只有 API 真正支持时才提供 `continueStream`。不要为了复用面板，把其他领域数据塞进 `Agreement`。
- 助手用 `defineAsyncComponent` 懒载，业务 renderers 也在 AI 入口动态 import；静态 import renderer 会连带加载 AI/TinyRobot。没有通用 `GeneralAssistant` wrapper。初始就打开助手的路由会立即加载它，不能据此声称“未点击便零加载”。

## 消息与业务卡片

[`createBusinessRenderers`](../assets/scaffold/ai/renderers.ts) 用真实 SFC 展示公开 `ai-summary`、`business-navigation`、`agreement-table`；renderer 从 TinyRobot 公共 `useMessageContent(props)` 读取当前内容。新增卡片同样写 SFC，不执行服务器传来的模板、HTML 或组件源码。

业务导航提供有限的 `target → callback` 表，由宿主映射到路由。未知 target 显示本地化反馈；不将 target 当 URL，也不通过 window 事件传递导航或业务操作。修改协议等动作由 typed API 执行，卡片点击本身不代表服务提交成功。

自有 part 使用 `ChatTransport<MyPart>` / `useChatSession<MyPart>`，并在 fetch transport 与 session 两侧注入同一个 `partValidator`。参考 [RegionSalesPart 与校验器](../assets/templates/ai-chat/types.ts) 和 [真实表格 renderer](../assets/templates/ai-chat/RegionSalesRenderer.vue)：

- 默认泛型仍只接受公开 `AssistantPart`；扩展校验器仅处理未知 `type`。
- 已知 `text`、摘要、导航、协议表等 part 仍严格走公开契约校验，宽松 extension 不能放行畸形公开 part。
- SSE 每条 delta、会话消费与历史恢复使用同一校验边界。不要用 `any` 或把自有 part 强转为 `AssistantPart` 绕过它。

关闭按钮复用 [`AssistantCloseButton.vue`](../assets/scaffold/ai/AssistantCloseButton.vue)：真实 TinyRobot `TrActionButton` 加公开 `AiIcon name="panel.close"`，含可访问名称。产品须直接依赖 TinyRobot；不要手绘替代。欢迎图标可用 [`welcomeIcon`](../assets/scaffold/ai/welcomeIcon.ts)，它仅把已注册的 Workbench System/Pedestal 组件包装为 `markRaw`，名称查 [icons.md](icons.md)。

## 传输、停止与存储

[`createFetchChatTransport`](../assets/scaffold/chat/transport.ts) 的默认 wire 契约明确为 **assumed**：POST `ChatRequest` JSON；SSE `data` 为 `ChatDelta` JSON，`[DONE]` 结束，EOF 刷新尾事件。真实 URL、鉴权、序列化、事件 decoder 与响应校验由宿主注入并确认，不把模板端点当公司 API。

`useChatSession` 提供 send、abort、显式 retry/reset；首个有效输出取消消息 loading，processing 直到流结束。停止与卸载会取消本地请求并隔离迟到响应；实际 transport 必须传递 `AbortSignal`。会话重试复用原 `idempotencyKey`；业务动作通过 `createFetchBusinessAction` 时，幂等键由调用方必填并跨重试复用。错误代码用 scaffold locale 映射成中文。

历史默认不持久化，生产保持关闭：

- `ChatStorage` 本身没有 namespace 参数。宿主以 read/write 闭包绑定该 feature 的 namespace 与隐私策略；注入本身零 IO，仅显式 `restore()/persist()` 访问存储，`reset()` 不等于清理存储。
- 协议面板使用公开 `historyOptions.namespace` 与注入 storage。现有 workspace 模板默认显式传入不读写的 storage，避免落入面板默认浏览器存储；仅 `persistHistory=true` 且有真实 storage 才开启。不同 feature 的 namespace 隔离，用户边界由宿主管理。

## 作用域、尺寸与业务弹层

真实 AI 内容放在 `.partner-ai`，聊天面板由固定高度容器或公共宿主提供确定高度。页面使用共享 `.feature-page` 时保留其字体与 box-sizing 作用域；不能靠覆盖 `.tr-*`、`.wb-*` 或 `.partner-ai` 后代修布局。

smoke 中的 `neutralHosts` 是 QA 分类，不是组件 prop：`AssistantHostLayout` 管导航、业务与助手槽，`BusinessOverlayHost` 管业务区域弹层，二者无需把整个业务区染成 AI 作用域。公开 `UiDialog theme="workbench"` 的业务弹层也按中性宿主处理；这些例外不豁免其中真实 AI 子组件。小型内联 AI 卡片无需强行达到聊天面板的 200px；该高度门禁只检查真实面板。

业务弹层按公开宿主契约选择 region/global：`BusinessOverlayHost.region` 指向不含导航/助手的业务容器；`UiDialog scope="region"` 需要 provider，显式 global 使用全页模态语义。别在忙碌编辑时切换所有权。沿用组件焦点与关闭生命周期，不用全页蒙层遮住本应可交互的助手。具体实例与接入边界见 [integration.md](integration.md)。

## CSS 与开发资源

应用入口按现有 harness 顺序一次性引入：Workbench CSS → TinyRobot 公共 `@opentiny/tiny-robot/dist/style.css` → AI UI CSS，再引入宿主样式。TinyRobot CSS 若随异步组件晚于 AI CSS 插入，会改变输入区布局；静态 CSS 不等于静态加载 TinyRobot JS。宿主提供字体，body 也使用宿主字体变量，让 Teleport 弹层保持字体一致；feature 不带字体文件。

harness 的 `optimizeDeps.exclude: ['huawei-partner-ai-ui']` 保留发布包相对 `new URL()` 头像资源位置，避免 Vite 预优化将其指向不存在的 deps 图片。保留真实图片加载检查，不用隐藏 broken image 或复制维护仓资源修复它。检查与证据规则见 [testing.md](testing.md)。

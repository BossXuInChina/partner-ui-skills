# 产品模块起步代码

这些 SFC 与 helpers 使用随包公开组件、类型和 Token。它们是宿主接入骨架；真实鉴权、业务 API、权限、路由和产品批准由宿主完成，没有模拟回复、默认业务数据或运行时模板编译。

- `ai/AssistantCloseButton.vue` 使用公开 TinyRobot TrActionButton 与 AiIcon panel.close；`welcomeIcon` 保留 System/Pedestal 的原始绘制与尺寸。
- `ai/renderers.ts` 为 ChatPanel 创建三个真实 SFC 内容渲染器；宿主提供有限的导航 target → callback 表和协议打开 callback。不传原始 URL，不派发 window 业务事件。未知 target 交 `unknownTarget`，不会自动导航。仅消费已发布 AssistantPart 契约；无法识别的内容不能猜测字段。
- `ai/agreementAdapter.ts` 接受必填的真实 AgreementAssistantAdapter API 实现，原样传递 AbortSignal、请求上下文与业务幂等键；宿主跨业务重试复用相同 key。可选续传只有真实 API 实现时才提供。
- `feedback/useMessages` 与 `MessagesHost` 共同控制 GlobalMessageStack，宿主应只挂一个 host。按 dismiss id 删除、checkbox 事件更新状态；不提供可触发原生 URL 导航的 linkHref 包装。
- `layout/` 只给宿主页面容器、栅格与堆叠设置布局样式，不覆盖组件内部。媒体断点 1280px 对齐发布 Token；子项列跨度由宿主页面决定。
- 中文文案集中 `locale/zh-CN.ts`；协议中 Agreement.status 的中文值是已发布业务枚举，保留原值。

宿主路由应按需动态导入 AI 功能，例如在 AI 功能入口执行 `const { createBusinessRenderers } = await import('./ai/renderers')`，不要把 AI 包与业务 renderers 静态接入所有业务路由。这里没有 GeneralAssistant host wrapper。若新增宿主封装，需 lazy 入口、`.partner-ai` 作用域和明确高度；每个实例给独立 historyOptions.namespace，注入 storage 并默认关闭持久化，不用默认浏览器存储。

与 `chat/useChatSession` 组合时，消息/取消/重试由 chat 模块负责；业务 renderers 仅展示公开结构化 parts 并回调宿主，不发起协议变更。构建/单测通过不代表真实 API、视觉或生产资格已验收。

`chat/transport.ts` 的 `SSE_PROTOCOL_ASSUMPTION` 明确标记默认 wire 契约为 assumed：POST ChatRequest JSON、SSE data 中的公开 AssistantDelta JSON、`[DONE]` 与 EOF 尾事件处理。真实 URL、鉴权、序列化和事件 decoder 均由宿主注入并确认，不把默认假设当成已签订 API。

`ChatStorage` 不固定 namespace；宿主通过 read/write 闭包绑定 namespace 与隐私策略。注入 storage 本身不产生 IO，只有显式 `restore()` / `persist()` 才读写；`reset()` 只重置会话状态，不自动清理远端或本地存储。错误代码用 `locale/zh-CN.ts` 的 `chatErrorMessage` 转成界面文案，未知代码显示通用连接失败提示。

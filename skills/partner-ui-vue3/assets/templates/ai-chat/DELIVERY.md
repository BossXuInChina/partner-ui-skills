# 智能问数模板

`Page.vue` 必填 `api: AiChatApi`、`historyNamespace: string`；可注入 `storage: ChatHistoryStorage`。默认无持久化，注入存储本身也不触发读写；宿主只有明确调用组合逻辑的 `session.restore()/persist()` 才读写该 namespace。生产宿主默认不传存储。

`api.stream` 的 POST ChatRequest / SSE ChatDelta 协议为 assumed。URL、鉴权、序列化由宿主确认和注入。泛型 `RegionSalesPart` 是此业务模板自己的消息契约，由 `isRegionSalesPart` 严格校验；它由真实 SFC `RegionSalesRenderer.vue` 渲染公开 WorkbenchTable，并非 AI 包新增 API。使用 fetch helper 时务必传同一 partValidator，session 与存储恢复也使用它；扩展不能放宽公开 AssistantPart 的校验。

欢迎、常用问题、停止、重试、新会话、摘要及卡片导航对应原同名 HTML。`api.navigate` 只接收有限目标与参数，宿主映射路由。AI ChatPanel 和业务 renderers 按需 import；宿主路由也应懒载本 Page。`.partner-ai` 固定高度。应用入口一次性引入两公开包 styles.css，不在此模板引入字体。

`mocks/index.ts` 的 `aiChatSeed`、`aiChatReply`、`makeAiChatMockApi` 仅供独立 QA/unit fixture；禁止生产入口导入。未连接真实服务不代表产品 API/权限/生产资格获批。根 harness 完成真实构建与页面验收后再填写验收证据。

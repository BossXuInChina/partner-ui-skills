# 协议续签工作台模板

`Page.vue` 必填 `api: AssistantWorkspaceApi`、`historyNamespace: string`。所有列表、智慧洞察、批量/单条续签、AI adapter 由宿主注入真实实现；协议与端点均为 assumed，需实际公司契约确认。`decodeAgreements/decodeInsights` 是此模板的业务边界校验，不能替代服务鉴权。

默认 `persistHistory=false`，显式向公开 AgreementAssistantPanel 提供不读写的 storage，避免包默认浏览器持久化；生产保持默认。只有同时显式设 `persistHistory=true` 且注入 `ConversationStorage` 才启用带必填 namespace 的历史存储。不同模板/用户须隔离 namespace，隐私/清理策略由宿主负责。

初始侧栏打开，使用公开 AssistantHostLayout / AgreementAssistantPanel（协议专域），以 defineAsyncComponent 懒载；不封装通用 GeneralAssistant。AI 关闭/模式/全屏切换时业务主屏与已挂载助手会话保持。`.partner-ai` 助手区域高度为宿主确定的 100%，宿主容器 100vh。列表有 loading/error/empty、范围变更取消旧请求、卸载取消请求；续签禁止重复提交，服务返回后才更新并通知；显式失败重试复用同一 idempotency key。导航仅有限目标回调，不处理原始 URL。

`mocks/index.ts` 导出原 HTML 固定 `workspaceSeed`、`workspaceReply` 和 `makeWorkspaceMockApi`，仅供 QA/unit 外部 fixture，禁止生产导入。应用入口一次性引入公开包 CSS，字体由宿主提供。本模板不声明真实服务/权限或生产资格已通过；根 harness 完成构建与页面验收后记录证据。

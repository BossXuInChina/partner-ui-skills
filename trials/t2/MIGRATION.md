# 原型迁移映射与复核

`draft-list/`、`draft-ai/` 为实际转换器输出，保留 `needs-review` guard 和完整提取报告供审计。最终功能采用 Skill 随包的对应预迁移 SFC 起点，逐项与这两份提取稿及原 HTML 对照；最终文件不包含 guard。它不是直接执行转换器输出。

| 原型与提取项 | 最终实现 |
| --- | --- |
| `#page` x-template、`PartnerUI.mount`、全局注册 | `features/*/pages/*/Page.vue` 为预编译 SFC；公开包显式导入，由 feature 路由和 harness 挂载。 |
| 列表的 `seed`、`rows`、筛选/排序/分页/选中、创建/续签/终止/导出 | `features/list/pages/workbench-list/{mocks/index.ts,types.ts,api.ts,usePage.ts,Page.vue}`；种子仅 fixture，API 必须注入，筛选与分页由组合函数管理，写操作在服务成功后反馈。 |
| `confirm`、全局消息、`$refs` | 受控反馈弹窗和 `scaffold/feedback/`；表格组件引用与事件由 typed Page 处理。 |
| AI `agreements`、范围、行与批量续签、insights | `features/workspace/pages/ai-assistant-workspace/{mocks/index.ts,types.ts,api.ts,usePage.ts,Page.vue}`，异步读取、取消、重试及写操作幂等由组合函数和注入 API 承担。 |
| `mockAgreementAdapter`、`chatRenderers`、`PuiAssistantCloseButton` | 宿主注入 `api.assistant`；`features/workspace/scaffold/ai/{renderers.ts,renderers/,AssistantCloseButton.vue}` 为具名结构化渲染器及公开组件组合；fixture 只在测试进程。 |
| `pui:navigate` / AI business action | `usePage.ts` 以有限 target 和 API 回调处理，不使用 window 全局事件，宿主需接实际路由。 |
| `pui-*` utility、样式、面板模式 | `features/*/styles/layout.css`、Page 局部布局及 `.partner-ai` 容器，AI 模式切换保留业务与会话挂载。字体由宿主提供。 |
| 示例提示、页尾“页面说明” | 按转换约定移除，不作为业务 UI；fixture 回复不代表服务能力。 |

两个最终 Page 无 runtime template/compile、原型全局 helpers 或 mount guard；转换草稿仍保留 guard。静态规则不能证明全部行为，API 与目标环境仍须接入和验收。

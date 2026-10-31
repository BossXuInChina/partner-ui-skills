# 原型转为 Vue 功能模块

Workflow B 只用于由 `partner-ui-pages` 生成且原始 HTML/runtime 可取得的原型。其他 HTML、截图或需求走需求实现流程，先识别行为与公开组件，不假定其具有 `PartnerUI` 语义。此流程产出 SFC、typed composables/API 与交付清单，不把原型 runtime 带入产品。

## mount

保留原页面结构、真实组件配置、文案与交互；只可把演示说明、参考路径和底部“页面说明”移入 `DELIVERY.md`。六个 [现有业务模板](../assets/templates/) 提供拆分实例；共享状态/API 注入方式随产品目录调整，不要求再包装一层应用。

| 原型入口                                                    | 实际替代                                                                                      |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `PartnerUI.mount()` / `createApp()`、`#page` x-template     | `<script setup lang="ts">` 的 Page SFC；由宿主应用/懒载路由挂载                               |
| `PartnerUI.install()`、全局组件注册、`PartnerUI.components` | 从两个包的公开根入口显式 named import；按生成参考与公开类型选资产                             |
| `window.Vue` / `PartnerUI.Vue` / `Vue.ref/reactive`         | 从宿主同一份 `vue` 导入组合式 API                                                             |
| `PartnerUI.Workbench/AI/BubbleRenderers` 全局命名空间       | 包的公开 exports；业务 renderer 采用下述 SFC 组合，不复制包内部组件                           |
| `setup()` 中的固定业务数据、假 loading                      | DTO 与注入 API；composable 管 loading/error/empty、取消及重复提交；固定 fixture 移入 `mocks/` |

## chat

| 原型 helper                                         | 实际替代                                                                                                                                     |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `PartnerUI.createChatSession({respond,delay})`      | [`useChatSession(transport)`](../assets/scaffold/chat/useChatSession.ts)；真实异步流，不保留假延时或 respond 函数                            |
| `PartnerUI.mockAgreementAdapter()` / `mockStream()` | 宿主真实 `AgreementAssistantAdapter`；可用 [`createAgreementAdapter`](../assets/scaffold/ai/agreementAdapter.ts) 转发。开发替身仅放 `mocks/` |
| 原型 `initialMessages` / 模拟回复                   | 按真实服务或明确注入的历史存储取得；不当成生产默认业务状态                                                                                   |

停止、重试、首输出 loading、幂等键、历史 namespace 与默认关闭持久化的边界见 [ai-ui-vue.md](ai-ui-vue.md)。不存在真实 API 时保持 assumed，不能用模拟成功掩盖未接入。

## renderers

`PartnerUI.chatRenderers` 的摘要、导航、协议表分别使用 scaffold [`ai/renderers.ts`](../assets/scaffold/ai/renderers.ts) 中真实 SFC。`pui-template` 改为业务自有 SFC renderer，使用 `useMessageContent` 读取经过运行时验证的 typed part；现有 RegionSalesRenderer 是对应实例。`pui-html` 也优先重组为 SFC/结构化数据；如业务确需富文本，只能在说明原因、使用 DOMPurify 净化后绑定，不能执行返回的 Vue 模板。

不保留 `template:` 字符串、Vue `compile()`、`window.PartnerUI` 或原型 HTML 编译器。转换记录必须列出不能自动转换的行为，而不是留下可执行的 runtime 兜底。

## navigation

- `pui:navigate`、`pui:open-agreement` window 事件改为 typed emits/callbacks，宿主用有限 target 表映射路由；未知 target 显示反馈，不按任意 URL 打开。
- `<PuiAssistantCloseButton>` 改为 scaffold `AssistantCloseButton.vue`，保留真实 TinyRobot 按钮、公开 panel.close 图标与可访问名称。
- `PartnerUI.welcomeIcon()` 改为 scaffold `welcomeIcon()`；图标从生成 [icons.md](icons.md) 核对 family/name/尺寸，不临摹或重画原图。

## feedback

`PartnerUI.overlays.modal()` / `.close()` 改为受控的 WorkbenchModal、WorkbenchFeedbackDialog 与明确的打开/关闭状态，内容为 SFC slot。`overlays.message()` 改为 [`useMessages`](../assets/scaffold/feedback/useMessages.ts) 配 [`MessagesHost`](../assets/scaffold/feedback/MessagesHost.vue) / 公开 GlobalMessageStack；父级按 id 处理 dismiss 与 checkbox，不把原生 alert/confirm 当替代。成功提示必须发生在真实提交成功后。

## layout

`pui-container/grid/stack/row/title/text/num` 等页面 utility 改为 [`PageContainer/PageGrid/PageStack`](../assets/scaffold/layout/) 或 [feature-* 共享布局](../assets/templates/shared/layout.css)，沿用原 Token 与栅格。公共组件内部外观不通过 CSS 重做。

原型字体 stylesheet 不进入 feature；字体由宿主提供。多个 Vue app 由宿主分别设置唯一 `app.config.idPrefix`，不能复制原型挂载时的自动前缀假设。助手关闭/切换模式保持业务与会话挂载，不能靠换 key/v-if 丢弃状态。

## restyle

`PartnerUI.restyle()` 不迁入产品，也不作为迁移后兜底。重新以真实组件组合页面；缺少对应组件的业务块列入交付清单并说明原因，不能伪称包内已有该能力。

## 交接与当前工具边界

交付记录保留源原型、已迁移交互、自有块、API 的 provided/assumed 状态、包来源与资格声明、未解决差异及实际检查范围/耗时，见 [delivery.md](delivery.md)。静态/单测/视觉检查不等于生产批准。

先用静态提取工具形成可审查草稿：

```sh
node scripts/convert_prototype.mjs --input <prototype.html> --out <new-directory> --project <installed-harness>
```

输出 `Page.vue` 与 `conversion.json`，状态始终 `needs-review`。它按实际公开 value exports 为可识别标签添加 imports、抽取 setup 并改写 Vue 引用，将原型 helper 标为 `TODO(conversion.md#…)` 与显式抛错占位；不执行 HTML/runtime。模块级 seed/副作用不进入 Page，原文留在报告供逐项迁移。未知组件、闭包依赖和动态行为不能自动变成产品能力。输出带 `PROTOTYPE_CONVERSION_NEEDS_REVIEW` mount guard；人工完成 API、状态和布局等迁移后，才移除 guard 进行实际挂载、交互与视觉检查；这些检查完成前状态仍是 `needs-review`。

工具拒绝已有输出及不支持的输入结构，父目录须存在；更多边界见 [tools.md](tools.md)。手工迁移可从 `new_feature` 生成起点并用 `find_icon` 查询注册名；不要用另一个 runtime 编译器代替转换。

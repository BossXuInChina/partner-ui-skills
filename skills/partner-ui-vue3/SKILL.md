---
name: partner-ui-vue3
description: 用伙伴工作台 Workbench 与 AI UI 发布包，将 PRD、partner-ui-pages 原型或已有业务页面实现为 Vue 3 + TypeScript 功能模块，包含 SFC、状态逻辑、注入 API、测试与交付清单。适用于交付 Vue 源码、原型转产品代码、现有产品仓库集成或代码复查；只需双击打开的 HTML 演示时使用 partner-ui-pages。
---

# 伙伴工作台 Vue 3

产出可由产品团队维护的源码。组件能力只来自随包锁定的公开导出、类型和元数据；宿主负责平台、路由、API、鉴权和存储。包的开发/原型资格与功能代码验证分别声明，检查通过不授予生产批准。Skill 版本见 [skill.json](skill.json)，升级流程见 [维护说明](references/maintenance.md)。

## 选择工作流

| 请求                                | 执行方式                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. PRD / 需求 → 功能模块            | 列需求、页面、组件映射、API 草案和状态图；把假设与尚缺契约作为检查点发给用户，再实现已明确的范围。已有授权或已确认的映射直接沿用，不重复索要确认。   |
| B. partner-ui-pages 原型 → 功能模块 | 先读 [转换对照](references/conversion.md)，把 x-template、全局组件与 helpers 改为预编译 SFC、显式 imports、注入 API 和组合式状态；对照原型验证视觉。 |
| C. 现有产品仓库内修改               | 先读目标仓库规则、依赖、TS/Lint/路由/HTTP/测试约定；既有约定优先于本 Skill 默认值。发现运行时或 peer 不兼容时报告实际缺口，不擅自升级框架。          |
| D. 复查代码                         | 运行类型、Lint 和静态规则，按规则与实际行为报告问题。仅要求审查时不重写；用户已要求修复时继续完成授权范围。                                          |

输入含需求画布交接 `generation-brief.json`（`design-handoff/1`）时走 A，并以它为已确认范围：只实现 `generation: use-existing-components` 的区块；`after-component-verification` 先按 `preconditions` 核对组件能力，未证实不做；`excludedParts` / `exclusions` 不绘制也不近似实现；`candidate` 组件配置仍按锁包契约核对。

任务已明确时直接选路；只有新功能、转换或现仓修改确实无法区分时问一个问题。非 `partner-ui-pages` 生成的 HTML 作为需求输入走 A，不使用运行时 restyle。只需离线演示则转到相邻 `partner-ui-pages`。

## 读取与选型

先用 `node scripts/assets.mjs search --query "关键词" --limit 5` 定位资产，再用 `node scripts/assets.mjs show --id <id>` 读取消费速查；需完整变体/更多示例时加 `--view full`。查询只读随包资料，不证明宿主版本一致或运行时通过验证；命令以 Skill 根为基准，其他工作目录请使用脚本绝对路径。search 返回 0 或 `matchMode: partial` 不代表资产不存在：先换更短关键词或英文导出名重试，再查 [Workbench 索引](references/workbench/index.md) 与 [AI 包参考](references/ai-ui.md)；确认缺失后才自建并标 `pui-custom`。无 Node 时直接用这两个索引。只读命中的组件页、相关 [设计规则](references/design-rules.md) 和 [Token](references/tokens.md) 段落，通常 3–8 个组件足够。规则有适用条件和强度，不能把建议升级为全局禁止。组件 API、使用场景及原生图标尺寸以当前锁包记录为准，不按截图猜 props。

使用 AI 时读 [AI Vue 组合](references/ai-ui-vue.md)；[AI 包参考](references/ai-ui.md) 说明现有结构化元数据的实际范围。大图标表只做关键词过滤查询，核对 `key`/`alias` 与 family，不全量展开 [图标资料](references/icons.md) 或 JSON。

默认 Vue 3.5.42、Vite、TS strict、vue-router 4、fetch、集中中文文案；已有 store 才复用 Pinia。依赖从 `vendor/` 与 `source.lock.json` 获取，保留 version、SHA-256、完整 commit 与包资格声明。更多已决策项及未验证契约见 [假设](references/assumptions.md)。消费工程不读取维护仓库内部，也不把其源码复制进参考。

## 实现与交付

按需要选择 `assets/templates/` 的六个起点：`blank`、`workbench-list`、`workbench-detail`、`workbench-dashboard`、`ai-chat`、`ai-assistant-workspace`。起点中的 Page 需要显式注入 API；先核对各自 `api.ts`、`types.ts`、README/DELIVERY。手工复制时带入所需 `assets/scaffold/`，将 `@scaffold`/`@templates` 映射到目标模块，并在宿主注册懒加载路由。不要复制整个原型运行时。

Page 负责布局与意图，组合式函数负责状态/并发/取消，API 层负责请求、解码及注入 transport；mocks 单独保留在开发与测试路径。没有真实接口时产出 `assumed` 类型契约及可替换适配器，继续可独立验证的部分，不把模拟数据或成功提示伪装成服务完成。

功能模块与独立 harness 为默认交付形态；现有仓库采用其目录约定。记录自定义业务块的必要性和替代边界。模块结构、`delivery.json` 字段与人读 `DELIVERY.md` 见 [交付约定](references/delivery.md)；包安装、样式、字体、Vue 单实例与平台边界见 [宿主集成](references/integration.md)。真实 API、平台和包资格分别给出验证结果。

## 约束到验证的对应

| 约束                                                                                         | 证据入口                                                                                                                                 |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| P1 只用包公开入口，样式在 app 入口按约定一次导入；不深引入源码                               | `check_vue` 的 `IMPORT_BOUNDARY`；[集成](references/integration.md)                                                                      |
| P2 typed props/emits、TS strict、无导出 any、strictTemplates                                 | harness `typecheck` / `lint`；[测试](references/testing.md)                                                                              |
| P3 组件发意图、状态与 API 分层、宿主配置端点及鉴权                                           | API/组合逻辑测试与 [交付](references/delivery.md) 的契约复核；不把静态扫描当作数据流证明                                                 |
| P4 loading/error/empty、双提交保护、卸载取消、显式重试及业务幂等                             | 组合逻辑与 transport 测试；[AI](references/ai-ui-vue.md)、[测试](references/testing.md)                                                  |
| P5 mock 隔离、显式测试/开发开关，生产图拒绝 mock                                             | `MOCK_BOUNDARY`、实际 Vite mock guard 正反验证；[测试](references/testing.md)                                                            |
| P6 无 runtime template/compile；v-html 仅明确净化后使用                                      | `RUNTIME_TEMPLATE` / `UNSAFE_HTML`；[转换](references/conversion.md)                                                                     |
| P7 无浏览器 alert/confirm/prompt 或 PartnerUI 全局事件总线                                   | `BROWSER_DIALOG` / `PARTNER_GLOBAL`；真实受控弹层与 typed 导航回调                                                                       |
| P8 视觉 AI 组件在 `.partner-ai`，面板有确定高度，历史 namespace 隔离且存储注入；助手按需加载 | dev smoke、历史/消息测试与路由静态/动态体积报告；中性宿主容器边界见 [AI](references/ai-ui-vue.md)                                        |
| P9 表格名称、图标按钮名称、键盘与弹层回焦                                                    | 命中组件规则、组件测试及必要浏览器/键盘复核；[测试](references/testing.md)                                                               |
| P10 功能模块不携带字体；资产按显示用途处理                                                   | 交付文件与产物审查；宿主字体和 Teleport 说明见 [集成](references/integration.md)                                                         |
| 设计规则：不覆盖组件内部、不用裸颜色，图标必须登记；按钮摆放、组件/Block 边界遵循命中规则    | `COMPONENT_CSS` / `IMPORTANT` / `COLOR_LITERAL` / `ICON_REGISTERED`，以及生成的组件规则；`SPACING_GRID` 和 `ICON_DYNAMIC` 是需复核的警告 |

静态检查只覆盖可可靠识别的违规；动态图标需要锁包支持的受限映射。验证最终实例效果，不以控件配置值或“已导入组件”代替行为证据。缺少能力时记录业务自定义块；不自绘注册操作图标，不用 deep CSS 或改 SVG 绘制属性补缺口。

## 可执行验证

复制独立 harness 时保留随包 vendor、lock 与 workspace 的相对布局。替换页面后，先按 [宿主集成](references/integration.md#路由挂载与-ai) 同步 router、`routeChunkReport` 的显式 routes 和 QA 路由；不要修改分析器源码或保留错误的六路默认值。

在独立 Skill 的 `assets/harness` 安装冻结依赖后，运行类型、Lint、规则、单测和生产构建。`pnpm verify` 串联这些检查及显式 QA 网络桩 smoke；`pnpm smoke` 检查宿主实际服务。QA 桩由独立 Node 测试进程注入，不进入生产图。

工具用法与生成边界见 [工具说明](references/tools.md)。常用入口：

```sh
node scripts/new_feature.mjs agreements --template workbench-list --out <new-feature-dir>
node scripts/find_icon.mjs 告警 --family status --limit 5
node scripts/convert_prototype.mjs --input <prototype.html> --out <new-conversion-dir>
node scripts/check_vue.mjs <feature-dir>
node scripts/smoke.mjs --project <harness-dir>
```

`smoke` 使用 dev 模式捕获 Vue 警告，每条路由一个 smoke、覆盖 1440×900 和 1280×800；真实面板高度小于 200px、AI scope 缺失或控制台错误会失败；控件越界与资源加载仍需专项复核。成功截图仅显式证据开关保存，失败保留诊断。原型转换的视觉对照在交付试验时做，不建立每组件常驻浏览器套件。

生成器只创建源码起点，不安装或改宿主；转换器输出带 mount guard 的 `needs-review` 提取稿，按 [转换对照](references/conversion.md) 手工迁移完成后才能移除 guard。完整命令、检查层级和截图边界见 [测试](references/testing.md)。

交付时先报告实际结果，给出可审查源码、清单、检查范围及未解决契约；不把定向通过写成全量通过。发布频率和外部操作按当次用户授权执行。

## 当前消费约定

- 组件内部有意设计的 padding 不统一抹平；页面排版、业务卡片内多内容拼装必须遵守命中规范。优先复用正式 Block/Pattern；新入库内容以锁包索引为准，剩余交易候选不视为公共资产。
- 浮层需在宿主字体和层级中正确显示，验证弹窗滚动区内不裁剪；页签与内容留白由组合层控制。WorkbenchTabs.size 仅支持 small / large，默认 small；按公开契约选用，不能传 medium。
- 同一操作组最多一个主要填充按钮；操作类用 Button 的 no-container 对应公开配置，页面跳转才用 Link。高级筛选使用标准 toolbar 行为与颜色。
- 业务页签切换留在所属首页；无独立演示的模块保留可点击状态并给出未激活提示，不让用户落到无法返回的孤立页面。
- 草稿安排可复用 useDraftThenCommit：确认/保存/通知由宿主提供，失败保留草稿；不要把本地演示成功写成服务端完成。新增数值进度支持当前与预计增量，预计值不能标成已达成。

# CHANGELOG

## 组件按需打包预览 · 2026-11-07

- 组件资源公开层按 Workbench 和 AI UI 命名 JS/CSS，并提供小型组件索引。内部模块与共享样式分包存储，图标保存为索引资产，按需构建继续使用逻辑依赖图。

- 新增 `emit_project.mjs --components`：按公共入口和显式动态声明选择组件实现、内部依赖、组件完整 CSS、原始图标与图片/字体资源；同时支持多 JS、单 HTML 和按页交付。
- 自有源码补充归档对应当前干净发布 sourceCommit；TinyRobot 源码对应 0.5.1 npm gitHead。来源与文件哈希独立记录，不伪称仅从聚合发布 CSS 自动裁剪。
- 提供包内 WASM 构建工具；消费端无 npm install、无在线下载。固定 Vue 与基础 Token 共享，未选择的业务组件和厂商主题不进入 Demo。可选 renderer 不再因聚合 helper 默认引入全部业务卡片。
- 输出包含同一闭包标识、模块依赖、样式归属、图标、资产与字节报告；动态入口缺少声明、未知资源或被修改的资源包会失败，不隐式全量兜底。
- Skill 指令和版本元数据保持本轮开始时的字节；旧完整 runtime 及原有命令继续可用。通过独立 preview 归档交付，组件资格仍为 development/prototype；128k Agent 长程稳定性未做基准评估。

## Pages 0.3.0 / Vue3 0.2.1 · 2026-11-07

- Pages 默认新增 Vue 3 多 JS 项目：components、blocks、pages、共享 state、fixtures 和页面布局独立维护；ESM 静态依赖编译为隔离的经典脚本，file:// 可直接打开。
- 提供项目脚手架、实时依赖索引/变更影响查询、锁包组件查询、静态检查、按页构建和同源单 HTML 导出。随包纯 JS 工具链无需消费端安装依赖，不进入生成 Demo。
- 三页示例覆盖筛选、跨页草稿、确认/取消保存、常驻 AI 模拟会话及错误重试；锁/hash、来源清单、可重复生成和未修改输出保护一并提供。
- 保留旧六个 HTML 模板和改造流程；Skill 按需读取项目或旧 HTML 指南。纠正图表能力、图库入口及 WorkbenchTabs 的 size 契约；Vue3 的相同页签说明同步修正。
- 未升级 Workbench/AI 来源锁，未缩减完整组件 runtime，未宣称 128k Agent 成功率改善。验证证据按本批实际执行结果交付，历史试验不自动获得新资格。

## 0.1.0 · 2026-10-31

首次独立 Skill 交付。两个 Skill 消费同一 source.lock 固定的公开 Workbench 与 AI UI 包，保留来源资格、完整 commit 和 SHA-256。

- partner-ui-pages 保留六份离线 HTML 原型、原件字体和自包含运行时。
- partner-ui-vue3 提供 PRD、原型转换、现仓集成和审查流程；六份 typed SFC、注入 API/取消与幂等起点、隔离 QA harness、生成/转换/静态/图标/smoke 工具。
- 两份交付包含同源参考、16 份 AI 组件 API 与包生成图库；76 条资产，52 份可移植示例预编译，缺项保留 Studio 入口和真实原因。
- T1 PRD → 列表/详情/懒载助手、T2 两原型转换、T3 Pinia/axios/i18n 现仓接入分别在新会话完成实际验证。历史收据属于当时来源与版本，不因本次编号自动获得新结果。
- Skill 独立版本见 skill.json，生成器读取该版本；未知版本保留 null。包版本、runtimeVersion 和 Skill 版本分别记录。

当前组件包资格保留 development/prototype；真实 API、鉴权、公司平台、跨浏览器和用户视觉验收未覆盖。本次为本地交付，是否发布及频率由用户决定。

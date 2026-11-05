# CHANGELOG

## 0.1.0 · 2026-10-31

首次独立 Skill 交付。两个 Skill 消费同一 source.lock 固定的公开 Workbench 与 AI UI 包，保留来源资格、完整 commit 和 SHA-256。

- partner-ui-pages 保留六份离线 HTML 原型、原件字体和自包含运行时。
- partner-ui-vue3 提供 PRD、原型转换、现仓集成和审查流程；六份 typed SFC、注入 API/取消与幂等起点、隔离 QA harness、生成/转换/静态/图标/smoke 工具。
- 两份交付包含同源参考、16 份 AI 组件 API 与包生成图库；76 条资产，52 份可移植示例预编译，缺项保留 Studio 入口和真实原因。
- T1 PRD → 列表/详情/懒载助手、T2 两原型转换、T3 Pinia/axios/i18n 现仓接入分别在新会话完成实际验证。历史收据属于当时来源与版本，不因本次编号自动获得新结果。
- Skill 独立版本见 skill.json，生成器读取该版本；未知版本保留 null。包版本、runtimeVersion 和 Skill 版本分别记录。

当前组件包资格保留 development/prototype；真实 API、鉴权、公司平台、跨浏览器和用户视觉验收未覆盖。本次为本地交付，是否发布及频率由用户决定。

## 0.1.1 · 2026-11-06

静态规则引擎迁入 shared/static 单一来源，构建时分发。支持冻结图标映射、显式 fallback 与条件字面量；未知表达式/可变映射保持警告，未登记名称保持错误。包来源锁未升级。

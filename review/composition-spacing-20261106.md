# 间距检视责任修订 · 2026-11-06

本次按用户澄清更新 `partner-ui-review` 至 0.1.1：正式组件内部按自身公开契约核对；页面布局、Demo 自建业务卡片、卡片内多内容和 slot 组合必须严格遵守现有规范。封装为组件或位于组件后代，不构成业务布局豁免。Demo 与组件源仓本轮未修改。

## 规则与实现

- 新增 `references/composition.md`，明确组件/业务组合责任、现有 Card 规则与语义 Token、嵌套留白、actions 变体和规范例外依据。
- 组件边界结合当前包样式主类、已知类族和显式配置；最近边界优先。业务 slot 被纳入后，内部嵌套的正式组件不会被误算成页面内容；`.is-wide` 等通用修饰类不被当成组件根。`.partner-ai` 是命名空间，不直接证明每个后代归库所有。
- 用 Typed OM 读取真实级联后的 auto，支持 logical margin 与 RTL；旧 auto 声明被固定值覆盖后不再豁免。
- R9 `layoutContracts` 明确 role、selector、规范 basis 与语义 Token，检查 CSS 属性及两区域真实边缘距离。合法 Token 用错位置、多个 margin/gap 叠加后超标均可失败。明确契约违反为 must-fix，测量退出非零；缺少规范、匹配节点、Token 或归属证据，保留未验证。
- `cardExceptions` 增加必须的规范依据；不能以“业务需要/紧凑/flush”直接放行。默认卡片与 actions 等变体分别映射契约，承接 padding 的层仍须检查。

规范核对基于 Demo 实际 Workbench `0.2.0-prototype.20261104.5` 的 `components.json` 中 `wb-card-spacing` 与所选页面实现；Skill 旧 pin 的规则用于交叉核对，来源锁未改变。未修改共享静态引擎或图标登记。

## 真实 Demo 验证

沿用 7 个代表路由、1920/1185 双宽，在新目录保存结果，不覆盖前轮证据。组件 Select 的独立基线继续复用已验证样本。

| 原间距输出 | 本轮判定 |
|---|---|
| trade/trade-home 20 条 marginLeft | 实际为 margin-inline-start:auto，属于分配空间；修正误报，页面业务内容仍在测量范围 |
| operations/oper-dealer-ai 20 条 3px marginTop | 来自 WorkspaceSmartCard 内部编号；恢复组件责任归属，未将组件直接宣告验收通过 |
| marketing/jmf 4 条 2px gap | 同一图表分段间隔的 row/column、双宽记录；继续保留候选，按既有设计理由复核，不自动清零 |

最终 R1 为 4 条，R5 为 4 条。其余输出为 R3 498、R4 90、R6 28；各规则候选仍需复核，不能将数量变化解释为页面已经整改。

配置了 3 类布局契约：标准业务卡片 padding、交易同级卡片排列、营销同级卡片排列；双宽合计 40 个实例、无 R9 违反。此处只证明已映射范围，不证明整个页面所有布局角色完成验收。trade/order-detail 尚未配置 R9 契约；经营页面每个宽度保留 1 个 AI 未分类节点。14 个测量上下文无运行错误；命令仍因既有横向溢出退出 1。

另在真实 trade/trade-home 中做浏览器临时扰动：将交易卡片排列 gap 从规范 16px 改为另一个合法 Token 的 24px，不改源码。R9 实测从 0 变为 2 条 must-fix（rowGap/columnGap），证明它不会因为数值属于 Token 就放行。浏览器关闭后扰动消失。

## 验证与限制

- 真实浏览器测试涵盖业务 slot 不漏检、嵌套库组件不误报、通用修饰类不扩大排除、logical auto/RTL/覆盖关系、合法错误 Token、叠加间距、规范/目标缺失。完整测试 188 项通过，无 skip。
- 新候选构建/打包通过；版本 ZIP 与 manifest 校验值对应，旧候选保留。新版不自动安装到全局技能目录。
- R9 校验实际间距，不单独证明源码用了正确语义 Token 名称；同值别名仍需静态核对。未覆盖全 scenarios 的角色映射与页面间距整改；组件内部全局审查另按自身契约执行。

证据：[仓外目录](../../.artifacts/astra-ui-composition-20261106/)，包括 `trial-config.json`、`trial/measure.json`、`trial/findings.json`、`sensitivity.json` 和测试/打包日志。此前 `review/validation-20261106.md` 是 0.1.0 的历史验证，不覆盖本次新规则。

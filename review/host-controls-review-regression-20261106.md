# 宿主基线与组件用途检视 · 2026-11-06

`partner-ui-review` 0.1.5 基于 Scenarios 投标页签/高级筛选的真实遗漏，补充 `references/composition.md`：

- 组件内部有意 padding 仍按组件规范；增加宿主盒模型、外高/内高/内缩、选中底块四边及字体就绪后的几何检查。
- 核对公开 props 的用途与展开/收起状态颜色，不以合法 Token 代替用途正确性，不将所有 text 按钮统一染蓝。
- 明确通用自动测量与项目定向断言边界，规则提示不冒充新增检测器；业务重置/确认交互保持不变。

项目对照在旁侧 Scenarios `review/segment-and-filter-controls-20261106.md`；新浏览器断言存入其既有 smoke，content-box 与黑色 drilldown 的隔离反例均被拒绝。

验证：45 项相关测试通过；quick_validate 通过；package:release 通过；0.1.5 ZIP 中入口、元数据、参考说明和版本记录与源文件字节一致。未改通用检测器、来源锁、审批资料或全局已安装 Skill。未对外发布本地候选 ZIP。

# 组件内部与业务组合的间距边界

先判断间距由谁负责，再选择规范。组件内部存在有意设计的 padding、图文距离、光学偏移，不能因它不是通用 4px 网格值就判为页面错误。页面布局、Demo 自建业务卡片和卡片内多内容组合，必须遵守对应布局规范；“由组件拼出来”“放在 slot 里”“封装成一个 .vue”都不能成为豁免理由。

| 对象 | 检查依据与处理 |
|---|---|
| 已发布组件/正式 Block 内部 | 当前实际包的公开 API、变体契约、规范和可比独立样本。保留规范允许的内部值；来源不清记未验证。页面覆盖导致偏差走 R8，真实组件问题交维护方。 |
| 页面版心、栅格、卡片排列 | Foundation 布局规范和适用 Pattern；核对边缘留白、行列间隔、重排及实际卡片间距。 |
| Demo 自建业务卡片 | 核对外壳 padding、标题/正文/操作区关系；包装成组件不会改变其消费层责任。优先复用已发布的 Card/Block。 |
| 卡片内部的业务内容、组件 slot | 由页面输出的分组、文字、表格、控件排列继续严格检查。slot 中再次嵌入的正式组件，其内部重新按组件契约处理。 |

不要把组件库内部一概标为“设计如此”。“不使用页面通用间距规则”不等于“组件已经通过验收”。同样，不要向已经提供正确 padding 的 Card 再叠加一圈业务 padding；应核对最终内容边界。

## 如何确定正确间距

1. 从实际消费包查适用规则与变体，注明 rule ID/资料路径。旧 Skill pin 与项目版本不同，应核实差异。
2. 选择该布局职责对应的语义 Token。仅命中某个合法数值不代表位置用对；不要将所有内容距离统一成一个数字。
3. 同时测量 CSS 属性与实际区域距离。父 gap、子 margin、嵌套 padding 可以叠加；单个属性都合规，最终距离仍可能错误。
4. 按页面状态、宽度和内容组合验证；缺少角色映射/规范依据的区域记未验证，不能因没有命中规则称“全页间距通过”。

现有参考：[`wb-card-spacing`](workbench/wb-card.md) 明确标准 Card 左右 24、顶部 20；无 actions 底部 20，有 actions 正文到操作区及底部各 24；多卡间距 16。`wb-card-header-slot-groups` 和 `wb-card-footer-text-action-align` 另有组合/光学对齐要求，不能用通用网格检查推翻。数值由当前 CSS Token 解析，具体变体仍以当前包契约为准。

| 组合职责 | 对照 Token（需确认适用规则） |
|---|---|
| 标准业务卡片内边距 | `--wb-spacing-layout-container-block` / `--wb-spacing-layout-container-inline` |
| 多卡排列 | `--wb-spacing-layout-card-gap` |
| 业务内容组之间 | `--wb-spacing-layout-content-gap` |
| 独立业务章节 | `--wb-spacing-layout-section-gap` / `--wb-spacing-layout-section-gap-large`，按规范选择 |
| 正文到操作区 | `--wb-spacing-layout-action-gap` |
| 页面版心与边缘 | 当前 Foundation 栅格的 safe-edge/gutter，按断点核对 |

## 自动测量配置

`pageOwnedSelectors` 明确组件插槽中的业务容器，采用最近边界：遇到嵌套的包组件立即停止向上继承页面所有权。包样式来源与已知组件类族用于识别内部节点；特殊包根可通过 `packageRootSelectors` 补充。报告必须保留各归属计数与未分类区域。

R9 使用有依据的 `layoutContracts`，判断“合法 Token 用错位置”和“组合后实际间距错误”。以下选择器只是配置示例，不能直接套用到未知工程：

```json
{
  "pageOwnedSelectors": [".business-slot"],
  "layoutContracts": [
    {
      "id": "business-card-grid",
      "selector": ".business-card-grid",
      "role": "card-grid",
      "basis": "当前包 wb-card-spacing：多卡排列",
      "properties": {"rowGap":"--wb-spacing-layout-card-gap","columnGap":"--wb-spacing-layout-card-gap"}
    },
    {
      "id": "business-content-actions",
      "selector": ".business-slot",
      "role": "content-actions",
      "basis": "当前包 wb-card-spacing：正文到操作区",
      "relations": [{"from":":scope > .content","to":":scope > .actions","axis":"y","token":"--wb-spacing-layout-action-gap"}]
    }
  ]
}
```

`properties` 支持 padding/margin 的 Top/Bottom/Left/Right 以及 rowGap/columnGap；`relations` 测量两个唯一、可见节点的边缘间距，x/y 是物理坐标，RTL/纵向书写应明确节点顺序。可用 `routes` 限定适用路由。缺少规范、目标、Token 或归属确认，不输出伪通过；明确契约违反为 must-fix，命令退出非零。

R9 验证角色对应的实际数值，不单独证明源码引用了正确的 Token 名称；同值别名仍需静态核对。包样式只用于识别组件主类，`.is-wide` 等通用修饰类不能把业务内容变成组件内部。

自动布局中的 logical margin `auto` 用浏览器 Typed OM 读取最终级联，不能把分配出的剩余空间当固定间距，也不能因旧规则含 auto 而忽略后来覆盖的固定值。

`cardExceptions` 必须同时给 selector、reason、basis，引用适用规范或已确认的变体。只有“业务需要/紧凑/flush”不充分；若 padding 委托给另一层，必须继续测量承接层和最终内容边界。默认 R2 对照普通无 actions 卡片；有 actions 等明确变体用对应 R9 契约覆盖其真实职责，报告说明范围。

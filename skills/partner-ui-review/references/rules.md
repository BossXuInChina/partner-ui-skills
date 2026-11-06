# 浏览器测量规则

Token 名从已加载 CSSOM 获取，值从每个待测元素的计算样式读取，遵循实际继承和主题，不把锁包数字硬编码为规则。默认数字归一误差 0.05 CSS px；页面溢出使用 1px 布局取整容差。容差不构成视觉验收。

| 规则 | 判定与边界 |
|---|---|
| R1 SPACING_TOKEN | 页面自有元素的 padding/margin/gap 对照当前 spacing token 或 0；Typed OM 按真实级联识别 logical/physical auto，不按分配宽度判错，也不豁免被覆盖的 auto。数值合法不证明语义位置正确，后者由 R9 检查。 |
| R2 CARD_PADDING | 显式 `--card-selector` 的标准无 actions 业务卡片对照 container block/inline padding；不能凭圆角/白底认定。明确变体按 R9 配置不同区域契约。例外必须有 selector、reason、规范 basis，业务组合本身不构成例外。 |
| R3 FONT_BUNDLE | 有直接文本的页面元素同时比对 size/weight/line-height/letter-spacing；letter-spacing normal 等价于 0px，line-height normal 不等价于已知字号组合。缺失字体 Token 记未验证。 |
| R4 COLOUR_TOKEN | 比对浏览器规范化的颜色，保留 alpha；透明背景与无宽度/不可见边框无颜色违规。非 none 的背景图片/渐变若没有匹配的语义 Token 声明，输出 needs-review，不静默忽略。Token 的 color-mix、图片/渐变表达式为候选合法表达式，仍需确认生效规则及资源例外。 |
| R5 GRID | 对未命中 Token 的页面间距检查 4px 网格；不把边框、字体、图表数据位置及响应式百分比尺寸全部套进网格。输出 warning，明确意图后在报告解释。 |
| R6 OVERFLOW | 页面横向溢出为 must-fix；截断无 title/已挂载 description、交互中心点被另一交互遮挡为 needs-review。滚动区域、懒加载 tooltip、弹层、行数截断需交互复核，首屏不能作全覆盖。 |
| R7 CONSOLE | console error、pageerror、Vue warning 为 must-fix；捕获失败也失败，不生成伪通过。 |
| R8 COMPONENT_OVERRIDE | 只有独立 fixture 与宿主样本包/组件/props/state/theme/容器宽度相同才比较。差异为 needs-review，附匹配宿主 CSS；必须定位真正生效规则才能升为 must-fix。没有基线明确未验证。 |
| R9 LAYOUT_SPACING | `layoutContracts` 把业务布局角色与现有规范/语义 Token 对应，检查 CSS 属性和两个区域的实际边缘间距，发现合法数值用错位置或叠加留白。明确契约不符为 must-fix；规范、目标、Token 或归属缺失为未验证。 |

所有权结合实际包样式类、已知组件类族与 `packageRootSelectors`；`.partner-ai` 仅作为待分类命名空间，不能将其中业务容器全部排除。`pageOwnedSelectors` 纳入页面 slot；最近边界优先，slot 内嵌套正式组件重新归组件内部。归属计数、未分类区域随结果输出。详见 [两层责任及语义配置](composition.md)。组件内部不套用页面通用网格，也不因此自动通过组件验收。

`--config <json>` 示例（具体选择器/参数由项目实际 API 确认）：

```json
{
  "pageOwnedSelectors": [".business-slot-copy"],
  "components": [{
    "id":"primary-action", "selector":"#primary-action", "component":"WorkbenchButton",
    "packageVersion":"<actual installed version>", "props":{"appearance":"primary"},
    "state":"default", "theme":"light"
  }]
}
```

独立 fixture 使用真实公开组件与同版本包 CSS，不复制组件外观。在 fixture URL 上运行 measure，输出样本后，在宿主页传 `--baseline <fixture-output>/component-samples.json`。该文件的声明也必须复核；工具不证明调用者提供的 props/state 为真。不要用宿主页自己的样本充当独立基线。

测试需覆盖每个规则的正反例，并使用真实浏览器 DOM 验证 CSS 计算、字体、几何与遮挡；纯 DOM 模拟不能证明布局。组合差异继续由设计图和交互证据判断。

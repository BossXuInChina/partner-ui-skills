<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文字下钻 MoreAction Block — `WorkbenchMoreAction`

资产：`wb-more-action` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/more-action?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchMoreAction`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "ready",
      "label": "示例数据"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：卡片标题或页签头右侧的“更多”“查看历史”等下钻入口

**不适用**：跳转到真实地址且无需按钮语义（使用Link）；主要操作（使用填充按钮）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| disabled | Boolean | false |  |  |
| label | String | 更多 |  |  |

### Events

- `click`

### 规则

### 无容器文字下钻

id：`wb-more-action-style` · must / confirmed

使用Button appearance=text、intent=drilldown、drilldown=more与textLayout=inline：仅占文字行高、无内边距，右侧箭头沿用Button规则；保留悬浮、按下、焦点与禁用状态。

**适用条件**：卡片或页签头部下钻入口

### 组件依赖

`wb-button`

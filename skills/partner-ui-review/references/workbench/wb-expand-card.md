<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 展开卡片 ExpandCard Block — `WorkbenchExpandCard`

资产：`wb-expand-card` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/expand-card?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchExpandCard`

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

**适用**：列表中的每项需要以图标与摘要标题呈现，并通过右侧箭头展开详情（如伙伴身份差距）

**不适用**：同一区域只能展开一项且需手风琴语义（使用Collapse）；整卡跳转或含主要操作的卡片（使用Card Blocks）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| expanded | Boolean | false |  |  |
| title * | String |  |  |  |

### Events

- `update:expanded`

### Slots

- `icon`

- `title`

- `default`

### 规则

### 摘要头与展开内容

id：`wb-expand-card-structure` · must / confirmed

浅灰背景（surface-card-tinted），头部上下8px、左右16px内边距：底座图标（建议PedestalIcon 28px）、标题（headline-xs）、右侧12px下箭头按钮；展开内容同样左右16px，展开/收起使用高度过渡且首帧不跳动，减少动效时关闭过渡。

**适用条件**：展开卡片

### 组件依赖

`wb-pedestal-icon`

### Foundation 引用

`color-surface-card-tinted`、`color-text-primary`、`color-icon-primary`、`color-border-focus`、`font-headline-xs`、`radius-md`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`

<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 嵌套确认 Pattern — `WorkbenchNestedConfirmation`

资产：`wb-nested-confirmation` · 类型：`pattern` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-P5-PATTERN-BLOCKS-20260929/p5-nested-confirm-candidate?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchNestedConfirmation`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "closed",
      "label": "关闭"
    },
    {
      "id": "parent",
      "label": "父层"
    },
    {
      "id": "child",
      "label": "子层"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：父级确认流程需要在子对话框收集补充信息，且子层结果先回填父层草稿

**不适用**：普通单层确认或表单；子层操作必须独立持久化或页面没有父级草稿

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| childBusy | Boolean | false |  |  |
| childOpen * | Boolean |  |  |  |
| childSize | String | m |  |  |
| childTitle * | String |  |  |  |
| parentBusy | Boolean | false |  |  |
| parentOpen * | Boolean |  |  |  |
| parentSize | String | l |  |  |
| parentTitle * | String |  |  |  |

### Events

- `request-close-parent`

- `request-close-child`

### Slots

- `parent`

- `parent-footer`

- `child`

- `child-footer`

### 规则

### 顶层对话框接收关闭意图

id：`wb-nested-confirmation-top-layer` · must / confirmed

子对话框打开时，父对话框忽略 Escape 和遮罩关闭；顶层关闭后的焦点恢复由底层 WorkbenchModal 负责。

**适用条件**：父级对话框打开子级对话框

### 子层结果由宿主暂存

id：`wb-nested-confirmation-staged-result` · must / confirmed

Pattern 只发出子层关闭意图；宿主负责清除取消的子草稿或把确认结果暂存到父层草稿，最终提交仍由父层确认。

**适用条件**：子对话框收集父流程所需信息

### 组件依赖

`wb-modal`

### Foundation 引用

`color-surface-page`、`spacing-layout-content-gap`

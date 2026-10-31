<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 草稿筛选 Pattern — `WorkbenchDraftListFilter`

资产：`wb-draft-list-filter` · 类型：`pattern` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-P5-PATTERN-BLOCKS-20260929/p5-draft-filter-candidate?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchDraftListFilter`

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
      "label": "初始列表"
    },
    {
      "id": "draft",
      "label": "草稿未提交"
    },
    {
      "id": "applied",
      "label": "已应用"
    },
    {
      "id": "empty",
      "label": "空结果"
    }
  ],
  "controls": [
    {
      "id": "fieldCount",
      "type": "select",
      "label": "筛选字段数",
      "description": "1／2 项对照地址／联系人实际字段数量，3／4 项仅演示扩展布局；数据仍是联系人示例。",
      "default": 2,
      "options": [
        {
          "value": 1,
          "label": "1 项"
        },
        {
          "value": 2,
          "label": "2 项"
        },
        {
          "value": 3,
          "label": "3 项"
        },
        {
          "value": 4,
          "label": "4 项"
        }
      ]
    }
  ],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：管理列表提供显式查询按钮，用户先编辑筛选草稿再提交

**不适用**：输入后立即过滤的即时搜索；筛选由服务端自动触发且无显式提交动作

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| applyLabel | String | 查询 |  |  |
| fieldCount | Number | 1 |  |  |
| resetLabel | String | 重置 |  |  |

### Events

- `apply`

- `reset`

### Slots

- `default`

- `actions`

### 规则

### 草稿显式提交

id：`wb-draft-list-filter-explicit-apply` · must / confirmed

筛选控件的编辑值与已应用条件分开保存；只有触发查询后才更新结果条件。

**适用条件**：手动查询管理列表

### 宿主执行重置

id：`wb-draft-list-filter-reset` · default / confirmed

Pattern 发出重置意图；宿主负责清空草稿与已应用条件，并同步结果集和分页。

**适用条件**：手动查询管理列表

### 组件依赖

`wb-button`

### Foundation 引用

`spacing-component-lg`、`spacing-component-sm`

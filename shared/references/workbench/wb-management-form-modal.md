<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 必填编辑弹窗 · 校验与失败重试 — `WorkbenchManagementFormModal`

资产：`wb-management-form-modal` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-OPS-JOURNEY-CANDIDATES-20261105/ops-required-edit-modal-candidate?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchManagementFormModal`

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
      "label": "预填与清空"
    },
    {
      "id": "validation-error",
      "label": "必填校验失败"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：管理资料以单层 Modal 承载字段表单并需要稳定的提醒、补充内容和操作区插槽

**不适用**：嵌套确认或跨步骤提交流程；表单字段、必填规则或真实保存行为应被区块固定

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| contentClass | String |  |  |  |
| modelValue | Boolean |  |  |  |
| size | String | l | m / l |  |
| title * | String |  |  |  |

### Events

- `update:modelValue`

### Slots

- `notice`

- `default`

- `supplement`

- `footer`

### 规则

### 内容由宿主提供

id：`wb-management-form-modal-slots` · must / confirmed

Block 提供单层大尺寸 Modal、主要内容、可选提醒／补充区和 footer 插槽；字段、校验与提交回调由宿主持有。

**适用条件**：创建或编辑管理记录

### 不持有业务保存

id：`wb-management-form-modal-no-business-save` · must / confirmed

Block 只转发受控开关与关闭事件，不执行持久化，也不隐含成功状态。

**适用条件**：使用管理表单 Modal

### 组件依赖

`wb-modal`

### Foundation 引用

`spacing-layout-container-inline`、`spacing-layout-content-gap`

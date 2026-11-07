<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 折叠面板 Collapse — `WorkbenchCollapse`

资产：`wb-collapse` · 类型：`component` · 资产合同版本：`1.1.1`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-COLLAPSE-V1/collapse?view=preview)

将同一内容区内次要、可按需查看的信息折叠展示。每项独立控制，可同时展开。

公开入口：`@workbench/ui-vue3` → `WorkbenchCollapse`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-COLLAPSE-V1/collapse?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "collapsed",
      "label": "全部收起"
    },
    {
      "id": "expanded",
      "label": "单项展开"
    },
    {
      "id": "multi-expanded",
      "label": "多项展开"
    }
  ],
  "controls": [
    {
      "id": "overflow",
      "label": "表单内容溢出",
      "description": "切换纵向滚动条并验证内容宽度稳定",
      "type": "boolean",
      "default": true
    },
    {
      "id": "longTitle",
      "label": "超长标题",
      "description": "验证标题省略且右侧操作保持可见",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showPrefixIcon",
      "label": "显示标题前缀图标",
      "description": "配置折叠标题左侧的文件夹图标",
      "type": "boolean",
      "default": true
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "type": "select",
      "label": "组件状态",
      "default": "collapsed",
      "options": [
        {
          "value": "collapsed",
          "label": "全部收起"
        },
        {
          "value": "expanded",
          "label": "单项展开"
        },
        {
          "value": "multi-expanded",
          "label": "多项展开"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "overflow",
      "label": "表单内容溢出",
      "description": "切换纵向滚动条并验证内容宽度稳定",
      "type": "boolean",
      "default": true
    },
    {
      "id": "longTitle",
      "label": "超长标题",
      "description": "验证标题省略且右侧操作保持可见",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showPrefixIcon",
      "label": "显示标题前缀图标",
      "description": "配置折叠标题左侧的文件夹图标",
      "type": "boolean",
      "default": true
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [
    "openBasic",
    "openTable",
    "openMultiA",
    "openMultiB",
    "feedback"
  ],
  "explicitCaseIds": [],
  "loopExpressions": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：内容分组、独立展开多项

**不适用**：手风琴模式、动画、自动保留插槽内部状态及未经验证的内部框架生产场景

官方来源 SFC：supported。

### 示例：订单活动折叠项

id：`order-activity-foldout` · portability：`portable` · owner：`wb-collapse`

订单活动折叠项场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchCollapse, WorkbenchCollapseItem } from '@workbench/ui-vue3'
const open = ref(true)
function exportHistory() {}
</script>
<template>
  <WorkbenchCollapse>
    <WorkbenchCollapseItem v-model="open" title="最近活动" action-label="导出" @action="exportHistory">
      <ul><li>订单已创建</li><li>付款已确认</li></ul>
    </WorkbenchCollapseItem>
  </WorkbenchCollapse>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-COLLAPSE-V1/collapse?view=usage)

包内未声明 props。

### Slots

- `default`：容纳WorkbenchCollapseItem项的列表。；组件不定义项目间的数据联动或手风琴状态。

### 同族导出：`WorkbenchCollapseItem`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actionDisabled | Boolean | false |  |  |
| actionLabel | String |  |  |  |
| showIcon | Boolean | false |  |  |
| title * | String |  |  |  |

### Events

- `action`

### Slots

- `icon`

- `default`

### 规则

### 预览入口 `/preview/WB-COLLAPSE-V1/collapse`。

id：`wb-collapse-rule-2` · must / confirmed

预览入口 `/preview/WB-COLLAPSE-V1/collapse`。本版为已批准 Vue 3 原型资产，多个折叠项互相独立，可同时展开；默认全部收起且不使用展开动画。

**适用条件**：折叠面板首版

### 折叠箭头位于最左侧，显示尺寸12px；箭头到标题组合4px。标题使用 `font

id：`wb-collapse-rule-4` · must / confirmed

主标题触发器按下钻/披露语义使用color-text-primary、color-text-action-hover、color-text-action-active与color-text-disabled，箭头通过currentColor同步。右侧actionLabel是独立操作型，使用完整Text Action状态链且不触发展开。折叠箭头12px，标题图标14px，标题到内容区12px。

**适用条件**：折叠面板首版

### 相邻折叠项之间只绘制一条分割线：收起模块到下方分割线12px，展开模块到下方分割线16px，分割线到下一模块始终12px。首项顶部和末项底部

id：`wb-collapse-rule-6` · must / confirmed

相邻折叠项之间只绘制一条分割线：收起模块到下方分割线12px，展开模块到下方分割线16px，分割线到下一模块始终12px。首项顶部和末项底部不绘制额外分割线。标题过长时单行省略并通过原生 `title` 保留全文，右侧操作保持可见。

**适用条件**：折叠面板首版

### Collapse 内容插槽不规定背景、内边距、高度或滚动方向。实际发生溢出的表格

id：`wb-collapse-rule-8` · must / confirmed

Collapse 内容插槽不规定背景、内边距、高度或滚动方向。实际发生溢出的表格或表单由自身滚动容器复用 `WorkbenchScrollbar`；覆盖式轨道不参与排版，宿主使用固定边缘内边距避免内容与轨道重叠。滚动条出现或消失不能改变面板宽度、标题、操作位置、内容可用宽度、文字换行或表格列宽。

**适用条件**：折叠面板首版

### 本版为 human-approved / prototype-validated

id：`wb-collapse-rule-10` · must / confirmed

本版为 human-approved / prototype-validated / prototype-only。正式实现位于 [internal reference omitted]

**适用条件**：折叠面板首版

### WorkbenchCollapse 提供默认插槽，WorkbenchCollap

id：`wb-collapse-rule-14` · must / confirmed

WorkbenchCollapse 提供默认插槽，WorkbenchCollapseItem 使用独立布尔 v-model，默认 false；支持 title、showIcon（默认false）、actionLabel、actionDisabled，action 事件、icon 与默认内容插槽。内容左边缘与标题对齐，有前缀图标时对齐图标。内容允许嵌套一层 Collapse；第三层及更深折叠项禁用。右侧操作禁用时不响应点击或进入 Tab 导航。

**适用条件**：折叠面板首版

### 收起时销毁内容插槽，重新展开会重新挂载；子组件内部状态、未托管的输入值及滚动位置

id：`wb-collapse-rule-16` · must / confirmed

收起时销毁内容插槽，重新展开会重新挂载；子组件内部状态、未托管的输入值及滚动位置可能重置。需要保留业务草稿时由父级保存数据并通过 v-model 传回；本版不提供 keep-alive 或手风琴模式。收起时不输出 aria-controls；展开时关联真实内容区域，区域名称取完整标题。

**适用条件**：折叠面板首版

### Collapse 不依赖 Scrollbar 实现，滚动由内容插槽自行配置。无动

id：`wb-collapse-rule-18` · must / confirmed

Collapse 不依赖 Scrollbar 实现，滚动由内容插槽自行配置。无动画；Vue 2、公司内部框架及生产交付尚未验证。

**适用条件**：折叠面板首版

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-text-action`、`color-text-action-hover`、`color-text-action-active`、`color-text-action-disabled`、`color-icon-primary`、`color-icon-hover`、`color-icon-active`、`color-border`、`color-border-focus`、`color-border-separator-subtle`、`color-surface-card-default`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`font-body-m`、`font-headline-xs`、`font-headline-m`、`radius-sm`、`radius-lg`

### 选型

内容存在明确标题且用户可延后阅读时使用；主要步骤、必须始终可见的信息不要折叠。需要互斥单开模式时当前组件不提供该行为。

### 设计结构与排版

WorkbenchCollapse仅组织折叠项；WorkbenchCollapseItem提供标题、可选图标、正文和独立右侧操作。最多支持一层嵌套，收起时正文卸载。

### 交互与键盘

标题触发器使用原生按钮键盘操作；独立action按钮不会触发展开。actionDisabled时操作不进入Tab序列。

### 使用边界与职责

组件公开入口为 WorkbenchCollapse（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "折叠面板 Collapse组件规范",
    "href": "#rules"
  }
]
```

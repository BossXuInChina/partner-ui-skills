<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 滚动条 Scrollbar — `WorkbenchScrollbar`

资产：`wb-scrollbar` · 类型：`component` · 资产合同版本：`1.1.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SCROLLBAR-V1/scrollbar?view=preview)

用于为受限内容区域提供覆盖式滚动指示与拖动控制。滚动内容仍由浏览器原生滚动机制处理。

公开入口：`@workbench/ui-vue3` → `WorkbenchScrollbar`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-SCROLLBAR-V1/scrollbar?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    },
    {
      "id": "hover",
      "label": "悬浮"
    }
  ],
  "controls": [
    {
      "id": "overflow",
      "label": "内容超出容器",
      "type": "boolean",
      "default": true
    }
  ],
  "pilotControls": [
    {
      "id": "axis",
      "label": "滚动方向",
      "type": "select",
      "default": "horizontal",
      "options": [
        {
          "value": "horizontal",
          "label": "横向"
        },
        {
          "value": "vertical",
          "label": "纵向"
        }
      ],
      "group": "状态与内容"
    },
    {
      "id": "size",
      "label": "轨道尺寸",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认尺寸"
        },
        {
          "value": "small",
          "label": "小尺寸"
        }
      ]
    },
    {
      "id": "overflow",
      "label": "内容超出容器",
      "type": "boolean",
      "default": true
    },
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "hover",
          "label": "悬浮",
          "when": {
            "overflow": [
              true
            ]
          }
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 390,
      "max": 1920,
      "step": 1,
      "unit": "px",
      "group": "布局"
    }
  ],
  "presets": [
    {
      "id": "horizontal",
      "label": "默认滚动",
      "controls": {
        "axis": "horizontal",
        "overflow": true,
        "demoState": "default",
        "previewWidth": 1280,
        "size": "default"
      }
    },
    {
      "id": "fit",
      "label": "内容未溢出",
      "controls": {
        "axis": "horizontal",
        "overflow": false,
        "demoState": "default",
        "previewWidth": 1280,
        "size": "default"
      }
    },
    {
      "id": "vertical",
      "label": "悬浮滚动",
      "controls": {
        "axis": "vertical",
        "overflow": true,
        "demoState": "hover",
        "previewWidth": 1280,
        "size": "small"
      }
    },
    {
      "id": "page",
      "label": "主页面",
      "controls": {
        "axis": "vertical",
        "overflow": true,
        "demoState": "default",
        "previewWidth": 1280,
        "size": "default"
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "titles": {
      "horizontal": "横向表格 · 默认尺寸",
      "fit": "内容未溢出",
      "vertical": "纵向摘要 · 小尺寸",
      "page": "主页面滚动 · 默认尺寸"
    }
  },
  "dynamicBindings": [
    "samples"
  ],
  "explicitCaseIds": [
    "sample.id"
  ],
  "loopExpressions": [
    "sample in samples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜单、多行输入框、弹出气泡框内的滚动。；默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧边抽屉等尺寸较大的独立层级，以及用户需要频繁拖拽或观察滚动位置的区域。

**不适用**：未经适配验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：受限内容滚动

id：`bounded-content` · portability：`portable` · owner：`wb-scrollbar`

视口高度由调用方样式约束，长内容触发垂直滚动。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchScrollbar } from '@workbench/ui-vue3'
const entries = ['申请进度', '所需材料', '联系人信息', '审批记录', '补充说明']
</script>
<template>
  <div class="scroll-region">
    <WorkbenchScrollbar label="申请详情内容">
      <section v-for="entry in entries" :key="entry"><h2>{{ entry }}</h2><p>查看与{{ entry }}相关的信息和处理说明。</p></section>
    </WorkbenchScrollbar>
  </div>
</template>
<style scoped>
.scroll-region { block-size: 12rem; }
</style>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SCROLLBAR-V1/scrollbar?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| axis | String | vertical |  | 滚动方向：vertical或horizontal，默认vertical。 |
| describedby | String |  |  | 关联说明元素的ID。 |
| label * | String |  |  | 必填的滚动区域可访问名称。 |
| size | String | default |  | 轨道尺寸：small或default；large作为default兼容别名。 |
| state | String |  |  | Studio状态预览值，用于展示hover态。 |

### Slots

- `default`：无；提供需要滚动的全部内容；内容尺寸由宿主和内容自然决定。

### 实例成员

- `viewport: HTMLElement | null | undefined;`

- `measure(): void;`

### 规则

### Small（小尺寸）：轨道10px，默认可见滑块4px、两侧各3px；Hover

id：`wb-scrollbar-rule-1` · must / confirmed

Small（小尺寸）：轨道10px，默认可见滑块4px、两侧各3px；Hover/拖动可见滑块6px、两侧各2px。

**适用条件**：滚动条尺寸选择

### Default（默认尺寸）：轨道14px，默认可见滑块6px、两侧各4px；Ho

id：`wb-scrollbar-rule-2` · must / confirmed

Default（默认尺寸）：轨道14px，默认可见滑块6px、两侧各4px；Hover/拖动可见滑块10px、两侧各2px。

**适用条件**：滚动条尺寸选择

### 小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜

id：`wb-scrollbar-rule-3` · must / confirmed

小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜单、多行输入框、弹出气泡框内的滚动。

**适用条件**：滚动条尺寸选择

### 默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧

id：`wb-scrollbar-rule-4` · must / confirmed

默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧边抽屉等尺寸较大的独立层级，以及用户需要频繁拖拽或观察滚动位置的区域。

**适用条件**：滚动条尺寸选择

### 水平和纵向对称应用，滑块四边等宽透明边框，radius-full，确保可见端部为

id：`wb-scrollbar-rule-5` · must / confirmed

水平和纵向对称应用，滑块四边等宽透明边框，radius-full，确保可见端部为半圆。

**适用条件**：滚动条尺寸选择

### 浅色默认#191919/20%，深色默认#F3F3F3/30%；悬浮及拖动使用c

id：`wb-scrollbar-rule-6` · must / confirmed

默认#DFDFDF；悬浮及拖动使用color-scrollbar-thumb-fill-hover（#AEAEAE）。

**适用条件**：滚动条尺寸选择

### `WorkbenchScrollbar.vue` 提供覆盖式轨道，不参与内容排版

id：`wb-scrollbar-rule-7` · must / confirmed

`WorkbenchScrollbar.vue` 提供覆盖式轨道，不参与内容排版。显隐、Hover与拖动不改变内容可用宽高和宿主面板尺寸；尺寸与内容变化由ResizeObserver重新测量。

**适用条件**：滚动条尺寸选择

### `axis`: vertical（默认）或horizontal；`size`: 

id：`wb-scrollbar-rule-8` · must / confirmed

`axis`: vertical（默认）或horizontal；`size`: small或default（默认）；large保留为default的兼容别名；`label`必填，`describedby`可选；默认Slot为滚动内容。宿主约束尺寸，主内容及页面级使用default，辅助微型区域显式使用small。

**适用条件**：滚动条尺寸选择

### 滚动内容保持浏览器原生滚动，隐藏原生滚动条；覆盖轨道支持Pointer拖动、轨道

id：`wb-scrollbar-rule-9` · must / confirmed

滚动内容保持浏览器原生滚动，隐藏原生滚动条；覆盖轨道支持Pointer拖动、轨道点击、捕获释放。区域可Tab聚焦，支持方向键、PageUp/Down、Home/End，触屏及滚轮使用原生滚动。非溢出时无轨道，滑块长度随可见内容比例变化。

**适用条件**：滚动条尺寸选择

### 宿主在内容边缘安排固定内边距，避免边缘交互控件与轨道重叠，不随滚动条显隐切换内边

id：`wb-scrollbar-rule-10` · must / confirmed

宿主在内容边缘安排固定内边距，避免边缘交互控件与轨道重叠，不随滚动条显隐切换内边距。

**适用条件**：滚动条尺寸选择

### `scrollbar.css`仍供textarea等原生控件使用：wb-scro

id：`wb-scrollbar-rule-11` · must / confirmed

`scrollbar.css`仍供textarea等原生控件使用：wb-scrollbar保留原生小尺寸，wb-scrollbar--large为历史默认尺寸样式类，提供尺寸和Hover；单独使用CSS类不提供覆盖式布局保证，宿主须管理稳定空间。Firefox原生样式只能thin降级，精确尺寸应使用覆盖式组件。

**适用条件**：滚动条尺寸选择

### 预览含默认尺寸水平表格、小尺寸气泡内容滚动、默认尺寸页面视口；演示内容尺寸不是正

id：`wb-scrollbar-rule-12` · must / confirmed

预览含默认尺寸水平表格、小尺寸气泡内容滚动、默认尺寸页面视口；演示内容尺寸不是正式布局Token。

**适用条件**：滚动条尺寸选择

### Foundation 引用

`color-border`、`color-border-hover`、`color-border-focus`、`color-border-disabled`、`color-text-primary`、`color-text-placeholder`、`color-text-secondary`、`color-text-disabled`、`color-icon-placeholder`、`color-icon-secondary`、`color-icon-primary`、`color-icon-active`、`color-icon-disabled`、`color-fill-hover`、`color-fill-subtle-default`、`color-fill-subtle-disabled`、`color-surface-card-default`、`color-info-primary-subtle`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-container-inline`、`radius-sm`、`radius-lg`、`shadow-base`、`font-body-m`、`font-headline-m`、`color-error`、`font-body-s`、`color-scrollbar-thumb-fill-hover`、`radius-full`

### 容器与适用范围

宿主负责约束滚动视口尺寸、内容和边缘留白；Scrollbar覆盖轨道不参与排版。内容未溢出时不显示轨道。

- default适合主内容区，small适合下拉菜单、文本框等辅助小区域。

- 水平与垂直方向使用同一轴向参数；避免交互内容贴近滚动轨道。

### 键盘与可访问性

滚动区域可Tab聚焦；方向键、PageUp/PageDown、Home/End可控制滚动。触屏和滚轮继续使用浏览器原生滚动。

- label是必需的区域名称；describedby可关联补充说明。

<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 下拉菜单 Dropdown — `WorkbenchDropdown`

资产：`wb-dropdown` · 类型：`component` · 资产合同版本：`1.1.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=preview)

用于组合操作项、单选配置项和复选配置项的菜单。字段选择、复杂筛选或月份面板使用专门选择器或组合面板。

公开入口：`@workbench/ui-vue3` → `WorkbenchDropdown`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 组件状态 | 默认 | demoState-default | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 组件状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 预览尺寸 | Small · 28px | previewSize-small | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 预览尺寸 | Default · 36px | previewSize-default | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 预览尺寸 | Large · 40px | previewSize-large | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 面板宽度 | 最小宽度 | widthBoundary-min | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 面板宽度 | 默认 / 内容自适应 | widthBoundary-auto | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 面板宽度 | 最大宽度 · 216px | widthBoundary-max | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 触发器类型 | 按钮触发器 | previewTriggerType-button | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 触发器类型 | 文字按钮触发器 | previewTriggerType-text | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 触发器类型 | 图标按钮触发器 | previewTriggerType-icon | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 激活宽度预览 | 关闭 | showBoundaryPanel-false | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 激活宽度预览 | 开启 | showBoundaryPanel-true | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 回显位置 | 触发器回显 | feedbackPlacement-trigger | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 回显位置 | 关联区域回显 | feedbackPlacement-associated | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |
| 回显位置 | 不回显 | feedbackPlacement-none | [案例](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-default",
    "group": "组件状态",
    "label": "默认",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "demoState-disabled",
    "group": "组件状态",
    "label": "禁用",
    "controls": {
      "demoState": "disabled",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "previewSize-small",
    "group": "预览尺寸",
    "label": "Small · 28px",
    "controls": {
      "demoState": "default",
      "previewSize": "small",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "previewSize-default",
    "group": "预览尺寸",
    "label": "Default · 36px",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "previewSize-large",
    "group": "预览尺寸",
    "label": "Large · 40px",
    "controls": {
      "demoState": "default",
      "previewSize": "large",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "widthBoundary-min",
    "group": "面板宽度",
    "label": "最小宽度",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "min",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "widthBoundary-auto",
    "group": "面板宽度",
    "label": "默认 / 内容自适应",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "widthBoundary-max",
    "group": "面板宽度",
    "label": "最大宽度 · 216px",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "max",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "previewTriggerType-button",
    "group": "触发器类型",
    "label": "按钮触发器",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "previewTriggerType-text",
    "group": "触发器类型",
    "label": "文字按钮触发器",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "text",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "previewTriggerType-icon",
    "group": "触发器类型",
    "label": "图标按钮触发器",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "icon",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "showBoundaryPanel-false",
    "group": "激活宽度预览",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "showBoundaryPanel-true",
    "group": "激活宽度预览",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": true,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "feedbackPlacement-trigger",
    "group": "回显位置",
    "label": "触发器回显",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "trigger",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "feedbackPlacement-associated",
    "group": "回显位置",
    "label": "关联区域回显",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "associated",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  },
  {
    "id": "feedbackPlacement-none",
    "group": "回显位置",
    "label": "不回显",
    "controls": {
      "demoState": "default",
      "previewSize": "default",
      "widthBoundary": "auto",
      "previewTriggerType": "button",
      "showBoundaryPanel": false,
      "feedbackPlacement": "none",
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DROPDOWN-V1/dropdown?view=variants"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "previewSize",
      "label": "预览尺寸",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "small",
          "label": "Small · 28px"
        },
        {
          "value": "default",
          "label": "Default · 36px"
        },
        {
          "value": "large",
          "label": "Large · 40px"
        }
      ]
    },
    {
      "id": "widthBoundary",
      "label": "面板宽度",
      "type": "select",
      "default": "auto",
      "options": [
        {
          "value": "min",
          "label": "最小宽度"
        },
        {
          "value": "auto",
          "label": "默认 / 内容自适应"
        },
        {
          "value": "max",
          "label": "最大宽度 · 216px"
        }
      ]
    },
    {
      "id": "previewTriggerType",
      "label": "触发器类型",
      "type": "select",
      "default": "button",
      "options": [
        {
          "value": "button",
          "label": "按钮触发器"
        },
        {
          "value": "text",
          "label": "文字按钮触发器"
        },
        {
          "value": "icon",
          "label": "图标按钮触发器"
        }
      ]
    },
    {
      "id": "showBoundaryPanel",
      "label": "激活宽度预览",
      "description": "保持展开当前尺寸与宽度边界的混合配置菜单",
      "type": "boolean",
      "default": false
    },
    {
      "id": "feedbackPlacement",
      "label": "回显位置",
      "type": "select",
      "default": "trigger",
      "options": [
        {
          "value": "trigger",
          "label": "触发器回显"
        },
        {
          "value": "associated",
          "label": "关联区域回显"
        },
        {
          "value": "none",
          "label": "不回显"
        }
      ]
    }
  ],
  "pilotControls": [
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
          "value": "disabled",
          "label": "禁用"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "previewSize",
      "label": "预览尺寸",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "small",
          "label": "Small · 28px"
        },
        {
          "value": "default",
          "label": "Default · 36px"
        },
        {
          "value": "large",
          "label": "Large · 40px"
        }
      ]
    },
    {
      "id": "widthBoundary",
      "label": "面板宽度",
      "type": "select",
      "default": "auto",
      "options": [
        {
          "value": "min",
          "label": "最小宽度"
        },
        {
          "value": "auto",
          "label": "默认 / 内容自适应"
        },
        {
          "value": "max",
          "label": "最大宽度 · 216px"
        }
      ]
    },
    {
      "id": "previewTriggerType",
      "label": "触发器类型",
      "type": "select",
      "default": "button",
      "options": [
        {
          "value": "button",
          "label": "按钮触发器"
        },
        {
          "value": "text",
          "label": "文字按钮触发器"
        },
        {
          "value": "icon",
          "label": "图标按钮触发器"
        }
      ]
    },
    {
      "id": "showBoundaryPanel",
      "label": "激活宽度预览",
      "description": "保持展开当前尺寸与宽度边界的混合配置菜单",
      "type": "boolean",
      "default": false
    },
    {
      "id": "feedbackPlacement",
      "label": "回显位置",
      "type": "select",
      "default": "trigger",
      "options": [
        {
          "value": "trigger",
          "label": "触发器回显"
        },
        {
          "value": "associated",
          "label": "关联区域回显"
        },
        {
          "value": "none",
          "label": "不回显"
        }
      ]
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
      "unit": "px"
    }
  ],
  "presets": [
    {
      "id": "demoState-default",
      "label": "演示状态 · 默认",
      "controls": {
        "demoState": "default"
      }
    },
    {
      "id": "demoState-disabled",
      "label": "演示状态 · 禁用",
      "controls": {
        "demoState": "disabled"
      }
    },
    {
      "id": "previewSize-small",
      "label": "预览尺寸 · Small · 28px",
      "controls": {
        "previewSize": "small"
      }
    },
    {
      "id": "previewSize-default",
      "label": "预览尺寸 · Default · 36px",
      "controls": {
        "previewSize": "default"
      }
    },
    {
      "id": "previewSize-large",
      "label": "预览尺寸 · Large · 40px",
      "controls": {
        "previewSize": "large"
      }
    },
    {
      "id": "widthBoundary-min",
      "label": "面板宽度 · 最小宽度",
      "controls": {
        "widthBoundary": "min"
      }
    },
    {
      "id": "widthBoundary-auto",
      "label": "面板宽度 · 默认 / 内容自适应",
      "controls": {
        "widthBoundary": "auto"
      }
    },
    {
      "id": "widthBoundary-max",
      "label": "面板宽度 · 最大宽度 · 216px",
      "controls": {
        "widthBoundary": "max"
      }
    },
    {
      "id": "previewTriggerType-button",
      "label": "触发器类型 · 按钮触发器",
      "controls": {
        "previewTriggerType": "button"
      }
    },
    {
      "id": "previewTriggerType-text",
      "label": "触发器类型 · 文字按钮触发器",
      "controls": {
        "previewTriggerType": "text"
      }
    },
    {
      "id": "previewTriggerType-icon",
      "label": "触发器类型 · 图标按钮触发器",
      "controls": {
        "previewTriggerType": "icon"
      }
    },
    {
      "id": "showBoundaryPanel-true",
      "label": "激活宽度预览 · 开启",
      "controls": {
        "showBoundaryPanel": true
      }
    },
    {
      "id": "showBoundaryPanel-false",
      "label": "激活宽度预览 · 关闭",
      "controls": {
        "showBoundaryPanel": false
      }
    },
    {
      "id": "feedbackPlacement-trigger",
      "label": "回显位置 · 触发器回显",
      "controls": {
        "feedbackPlacement": "trigger"
      }
    },
    {
      "id": "feedbackPlacement-associated",
      "label": "回显位置 · 关联区域回显",
      "controls": {
        "feedbackPlacement": "associated"
      }
    },
    {
      "id": "feedbackPlacement-none",
      "label": "回显位置 · 不回显",
      "controls": {
        "feedbackPlacement": "none"
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：操作与单选、复选配置混合菜单

**不适用**：表单字段选择、异步搜索、嵌套子菜单；未经验证的内部 UI 框架或生产交付

官方来源 SFC：supported。

### 示例：申请显示设置

id：`application-display-options` · portability：`portable` · owner：`wb-dropdown`

单个菜单组合操作、单选模式和复选条件，并由父级持有菜单状态。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchDropdown } from '@workbench/ui-vue3'
const open = ref(false)
const radioValues = ref({ density: 'comfortable' })
const checkboxValues = ref([])
const result = ref('')
const items = [
  { id: 'density-compact', type: 'radio', group: 'density', value: 'compact', label: '紧凑显示' },
  { id: 'density-comfortable', type: 'radio', group: 'density', value: 'comfortable', label: '舒适显示' },
  { id: 'show-owner', type: 'checkbox', label: '显示负责人' },
  { id: 'reset', type: 'action', label: '重置设置' },
]
function updateRadio({ groupId, value }) { radioValues.value = { ...radioValues.value, [groupId]: value } }
function updateChecked({ id, checked }) { checkboxValues.value = checked ? [...checkboxValues.value, id] : checkboxValues.value.filter(value => value !== id) }
function runAction({ id }) { result.value = `已触发：${id}` }
</script>
<template>
  <WorkbenchDropdown v-model:open="open" :items="items" :radio-values="radioValues" :checkbox-values="checkboxValues" aria-label="申请显示设置" @update:radio="updateRadio" @update:checked="updateChecked" @action="runAction">
    <template #trigger>显示设置</template>
  </WorkbenchDropdown>
  <output>{{ result || `密度：${radioValues.density}` }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-DROPDOWN-V1/dropdown?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 下拉菜单 |  | 菜单触发器可访问名称。 |
| checkboxValues | Array | {"kind":"function"} |  | 当前选中菜单项id数组。 |
| disabled | Boolean |  |  | 禁用触发器并关闭菜单。 |
| items * | Array |  |  | 必填菜单项数组；id唯一，type按菜单项语义配置。 |
| open | Boolean | {"kind":"undefined"} |  | 展开状态；传入时受控并响应update:open。 |
| panelWidth | String | auto | auto / min / max | auto、min或max宽度策略。 |
| radioValues | Object | {"kind":"function"} |  | groupId到已选value的对象映射。 |
| size | String | default | small / default / large | small、default或large菜单尺寸。 |
| textIntent | String | drilldown | action / drilldown | 文字触发器的action或drilldown语义。 |
| triggerType | String | button | button / text / icon | button、text或icon入口样式。 |

### Events

- `action`：{ id }，被触发操作项的id。；激活action类型项目后发出。

- `update:radio`：{ groupId, value }。；radio选择值变化时发出；父级更新radioValues。

- `update:checked`：{ id, checked }。；checkbox状态切换时发出；父级更新checkboxValues。

- `update:open`：新的Boolean展开状态。；菜单打开或关闭时发出；受控调用方应同步open。

### Slots

- `trigger`：{ open, selectedItems, summary, toggle, aria }；自定义触发器内部内容；不要在slot中嵌套另一个交互按钮或链接。

### 规则

### 选型边界

id：`wb-dropdown-rule-1` · must / confirmed

操作与单选、复选配置混合菜单；不适用于表单字段选择、异步搜索、嵌套子菜单

**适用条件**：操作与单选、复选配置混合菜单

### 交互与调用合同

id：`wb-dropdown-rule-2` · must / confirmed

`items` 中 id 唯一；type 为 action/radio/checkbox/label/separator，radio 需 group 与 value。业务状态由调用方控制。trigger 插槽接收 open、selectedItems、summary、toggle、aria；调用方可选择在触发器、外部关联区域或完全不回显，Dropdown 不管理外部布局，也不提供回显位置 Prop。方向键、Home/End、Escape与焦点恢复保持菜单合同。

**适用条件**：操作与单选、复选配置混合菜单

### 复用边界

id：`wb-dropdown-rule-3` · must / confirmed

复选标记复用正式 choice/ChoiceMark内部原语及wb-checkbox/wb-radio设计合同。按钮式触发器复用Button secondary。文字式触发器通过textIntent区分action与drilldown，默认drilldown；操作型使用完整Text Action状态链，下钻/披露型依次使用color-text-primary、color-text-action-hover、color-text-action-active与color-text-disabled，展开期间持续使用active色。图标式触发器复用Button icon。各入口focus outline均为2px、偏移2px。

**适用条件**：操作与单选、复选配置混合菜单

### 组件依赖

`wb-button`、`wb-checkbox`、`wb-radio`

### Foundation 引用

`color-border`、`color-border-disabled`、`color-border-focus`、`color-border-hover`、`color-fill-hover`、`color-fill-subtle-default`、`color-fill-subtle-disabled`、`color-icon-active`、`color-icon-disabled`、`color-icon-hover`、`color-icon-primary`、`color-icon-tertiary`、`color-surface-overlay`、`color-text-action`、`color-text-action-hover`、`color-text-action-active`、`color-text-action-disabled`、`color-text-disabled`、`color-text-inverse`、`color-text-primary`、`color-text-secondary`、`font-body-m`、`font-body-s`、`font-caption-m`、`radius-full`、`radius-sm`、`shadow-sm`、`spacing-component-lg`、`spacing-component-md`、`spacing-component-sm`、`spacing-component-xs`

### 菜单结构

items的id必须唯一；type可为action、radio、checkbox、label或separator。radio需要group和值，业务选择状态通过radioValues和checkboxValues由调用方持有。

- action激活后关闭；radio和checkbox关闭时机依交互键而异。

- disabled禁用整个菜单并强制关闭；open传入后成为受控状态。

### 触发器与回显

triggerType支持button、text、icon；textIntent声明操作或下钻语义。trigger插槽负责入口内容，配置摘要也可以由关联区域或完全不回显。

- 菜单边界、尺寸和对齐由组件处理；每类项目使用menu语义及键盘导航。

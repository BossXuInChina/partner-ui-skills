<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 按钮单选组 Button Radio Group — `WorkbenchButtonRadioGroup`

资产：`wb-button-radio-group` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-BUTTON-RADIO-GROUP-V1/button-radio-group?view=preview)

用于在当前上下文内选择一个互斥值，例如筛选条件、显示方式或配置选项。切换关联内容面板时使用Tabs。

公开入口：`@workbench/ui-vue3` → `WorkbenchButtonRadioGroup`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-BUTTON-RADIO-GROUP-V1/button-radio-group?view=variants)

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
      "id": "disabled",
      "label": "含禁用项"
    }
  ],
  "controls": [
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "small",
      "options": [
        {
          "value": "small",
          "label": "小号（默认）"
        },
        {
          "value": "large",
          "label": "大号"
        }
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "small",
      "options": [
        {
          "value": "small",
          "label": "小号（默认）"
        },
        {
          "value": "large",
          "label": "大号"
        }
      ]
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
          "value": "disabled",
          "label": "含禁用项"
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
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "items": [
      {
        "value": "overview",
        "label": "概览"
      },
      {
        "value": "opportunity",
        "label": "商机管理"
      },
      {
        "value": "delivery",
        "label": "项目交付"
      }
    ]
  },
  "dynamicBindings": [
    "small",
    "large",
    "disabledItems"
  ],
  "explicitCaseIds": [],
  "loopExpressions": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：在当前上下文中选择一个互斥值；筛选条件、展示模式或配置选项使用按钮式单选

**不适用**：切换具有关联关系的平级内容面板；选项需要自动收纳为更多菜单；未经验证的内部UI框架生产实现

官方来源 SFC：supported。

### 示例：筛选结果范围

id：`result-filter` · portability：`portable` · owner：`wb-button-radio-group`

受控互斥选项，键盘与点击更新共享的筛选范围值。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchButtonRadioGroup } from '@workbench/ui-vue3'
const scope = ref('all')
const options = [
  { value: 'all', label: '全部' },
  { value: 'mine', label: '我的申请' },
  { value: 'team', label: '团队申请' },
]
function onChange(item) { console.log('筛选范围：', item.value) }
</script>
<template>
  <WorkbenchButtonRadioGroup v-model="scope" :items="options" aria-label="申请范围" @change="onChange" />
  <output>当前范围：{{ scope }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-BUTTON-RADIO-GROUP-V1/button-radio-group?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 单选组 |  | radiogroup可访问名称。 |
| fill | Boolean |  |  |  |
| items * | Array |  |  | 必填选项数组；每项包含唯一value、label，可选disabled。 |
| modelValue * | String \| Number |  |  | 当前选中的String或Number值，必填。 |
| size | String | small | small / large | small或large尺寸。 |

### Events

- `update:modelValue`：新选中的选项value。；选中值改变后发出。

- `change`：被选中的完整item对象。；选择有效项后发出；业务逻辑由调用方执行。

### Slots

- `item`：{ item, selected }；自定义项目内容；保留item.label对应的可访问语义。

### 规则

### 选型边界

id：`wb-button-radio-group-rule-1` · must / confirmed

用于在当前上下文选择一个互斥值；若切换具有关联关系的平级内容面板，使用Tabs。

**适用条件**：互斥选择

### 交互与可访问性

id：`wb-button-radio-group-rule-2` · must / confirmed

使用radiogroup/radio/aria-checked语义和roving tabindex；方向键、Home、End自动选择并跳过禁用项。

**适用条件**：互斥选择

### 溢出边界

id：`wb-button-radio-group-rule-3` · must / confirmed

组件不自动收纳为更多；选项较多、名称较长或需要关联内容面板时重新选择布局或使用Tabs。

**适用条件**：互斥选择

### Foundation 引用

`color-border-focus`、`color-fill-hover`、`color-surface-card-default`、`color-text-disabled`、`color-text-primary`、`color-text-secondary`、`font-body-l`、`font-body-m`、`radius-sm`、`shadow-sm`

### 选项结构

items中每个value唯一，label同时作为可访问名称；disabled项目不能选择。v-model持有唯一选中值。

- 小号适合紧凑上下文，大号适合更醒目的配置选择。

- 选项较多或名称较长时重新选择布局，不会自动折叠为更多菜单。

### 键盘行为

组件使用radiogroup/radio语义和roving tabindex。左右、上下方向键循环切换，Home/End跳至首尾可用项，并跳过disabled项。

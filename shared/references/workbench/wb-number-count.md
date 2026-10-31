<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 数字计数器 NumberCount — `WorkbenchNumberCount`

资产：`wb-number-count` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-INPUT-COUNTER/counter-input?view=preview)

用于有明确步长与上下界的数量录入。数值和业务提交由调用方控制。

公开入口：`@workbench/ui-vue3` → `WorkbenchNumberCount`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-INPUT-COUNTER/counter-input?view=variants)

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
    },
    {
      "id": "hover-left",
      "label": "悬浮左侧"
    },
    {
      "id": "hover-right",
      "label": "悬浮右侧"
    },
    {
      "id": "pressed-left",
      "label": "按下左侧"
    },
    {
      "id": "pressed-right",
      "label": "按下右侧"
    },
    {
      "id": "pressed",
      "label": "按下整体"
    },
    {
      "id": "focus",
      "label": "聚焦"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "left-disabled",
      "label": "左侧禁用"
    }
  ],
  "controls": [],
  "pilotControls": [
    {
      "id": "counterState",
      "type": "select",
      "label": "交互状态",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "hover",
          "label": "悬浮"
        },
        {
          "value": "hover-left",
          "label": "悬浮左侧"
        },
        {
          "value": "hover-right",
          "label": "悬浮右侧"
        },
        {
          "value": "pressed-left",
          "label": "按下左侧"
        },
        {
          "value": "pressed-right",
          "label": "按下右侧"
        },
        {
          "value": "pressed",
          "label": "按下整体"
        },
        {
          "value": "focus",
          "label": "聚焦"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "left-disabled",
          "label": "左侧禁用"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "stepSize",
      "type": "select",
      "label": "增减步长",
      "default": "1",
      "options": [
        {
          "value": "1",
          "label": "整数 · 1"
        },
        {
          "value": "0.5",
          "label": "小数 · 0.5"
        },
        {
          "value": "2",
          "label": "整数 · 2"
        }
      ],
      "group": "状态与内容"
    },
    {
      "id": "initialCount",
      "type": "range",
      "label": "初始数量",
      "default": 1,
      "min": 0,
      "max": 8,
      "step": 0.5,
      "group": "状态与内容",
      "when": {
        "counterState": [
          "default",
          "hover",
          "hover-left",
          "hover-right",
          "pressed-left",
          "pressed-right",
          "pressed",
          "focus",
          "disabled"
        ]
      }
    },
    {
      "id": "previewWidth",
      "label": "预览容器宽度",
      "type": "range",
      "default": 1280,
      "min": 320,
      "max": 1600,
      "step": 1,
      "unit": "px",
      "target": "viewport-width",
      "group": "容器",
      "marks": [
        390,
        768,
        1280,
        1440
      ]
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
    "examples"
  ],
  "explicitCaseIds": [
    "item.id"
  ],
  "loopExpressions": [
    "item in examples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：在明确上下限与步长内录入数量

**不适用**：普通文本、金额格式化、异步校验或高精度计算

官方来源 SFC：supported。

### 示例：申请材料份数

id：`bounded-quantity` · portability：`portable` · owner：`wb-number-count`

受控正整数数量，并把输入变化映射为本地业务反馈。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchNumberCount } from '@workbench/ui-vue3'
const copies = ref(1)
const lastChange = ref('')
function onChange({ value, source }) { lastChange.value = `${source}：${value}` }
</script>
<template>
  <WorkbenchNumberCount v-model="copies" :min="1" :max="20" :step="1" name="copies" aria-label="材料份数" @change="onChange" />
  <output aria-live="polite">{{ copies }} 份；{{ lastChange }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-INPUT-COUNTER/counter-input?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 数量 |  | 控件组名称，默认“数量”。 |
| disabled | Boolean |  |  | 禁用整个计数器。 |
| max | Number | {"kind":"undefined"} |  | 可选最大值。 |
| min | Number | {"kind":"undefined"} |  | 可选最小值。 |
| modelValue | Number | 0 |  | 当前受控数值，默认0。 |
| name | String |  |  | 设置数值输入的原生表单字段名。 |
| step | Number | 1 |  | 每次增减的正步长，默认1；无效时内部回退到1。 |

### Events

- `update:modelValue`：新的Number数值。；有效数值提交并与当前值不同时发出。

- `change`：{ value: Number, source: "input" | "increment" | "decrement" }。；数值通过编辑、增加或减少操作改变时发出。

### 规则

### 受控数值合同

id：`wb-number-count-rule-1` · must / confirmed

modelValue 为受控数值；step 必须大于0，非法step按1处理。加减、ArrowUp/ArrowDown、Enter或失焦提交，结果按step精度计算并夹在可选min/max内；change返回{value,source}。

**适用条件**：录入数量

### 表单与禁用

id：`wb-number-count-rule-2` · must / confirmed

name写入中间spinbutton并参与FormData；达到边界时仅禁用对应操作，整体disabled禁用输入和两侧操作。空值或非法文本在提交时恢复当前受控值。

**适用条件**：表单录入数量

### Foundation 引用

`color-border`、`color-border-disabled`、`color-border-focus`、`color-border-hover`、`color-fill-subtle-default`、`color-fill-subtle-disabled`、`color-icon-disabled`、`color-icon-primary`、`color-icon-secondary`、`color-text-disabled`、`color-text-primary`、`font-body-m`、`radius-sm`

### 数值与边界

modelValue是受控数值；step定义递增幅度，min与max限制最终值。组件按步长精度处理输入并将有效结果约束在边界内。

- 减小、增加按钮及上下方向键改变数值；Enter和失焦提交直接输入。

- 非法或空文本恢复到当前受控值；达到单侧边界时只禁用对应方向。

### 表单与职责

传入name后，中间spinbutton参与FormData。ariaLabel定义控件组名称，内部数值输入会据此构造可访问名称。

- 不用于高精度财务计算、货币格式化或异步校验。

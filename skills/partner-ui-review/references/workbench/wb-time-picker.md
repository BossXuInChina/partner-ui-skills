<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 时间选择 TimePicker — `WorkbenchTimePicker`

资产：`wb-time-picker` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TIME-PICKER-V1/time-picker?view=preview)

用于选择单个时间或时间范围。面板中的修改作为草稿，点击确定后才更新modelValue。

公开入口：`@workbench/ui-vue3` → `WorkbenchTimePicker`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TIME-PICKER-V1/time-picker?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "empty",
      "label": "默认"
    },
    {
      "id": "hover",
      "label": "悬停"
    },
    {
      "id": "focused",
      "label": "选中"
    },
    {
      "id": "selected",
      "label": "已填写"
    },
    {
      "id": "filled-focused",
      "label": "选中 · 已填写"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "disabled-filled",
      "label": "禁用 · 已填写"
    }
  ],
  "controls": [
    {
      "id": "variant",
      "label": "组件类型",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "时分秒选择"
        },
        {
          "value": "12-hour",
          "label": "12小时制"
        },
        {
          "value": "range",
          "label": "时间范围"
        }
      ]
    },
    {
      "id": "showSeconds",
      "label": "显示秒",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showNow",
      "label": "此刻快捷选择",
      "type": "boolean",
      "default": false
    },
    {
      "id": "open",
      "label": "展开面板",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "timeState",
      "type": "select",
      "label": "交互状态",
      "default": "empty",
      "options": [
        {
          "value": "empty",
          "label": "默认"
        },
        {
          "value": "hover",
          "label": "悬停"
        },
        {
          "value": "focused",
          "label": "选中"
        },
        {
          "value": "selected",
          "label": "已填写"
        },
        {
          "value": "filled-focused",
          "label": "选中 · 已填写"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "disabled-filled",
          "label": "禁用 · 已填写"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "variant",
      "label": "组件类型",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "时分秒选择"
        },
        {
          "value": "12-hour",
          "label": "12小时制"
        },
        {
          "value": "range",
          "label": "时间范围"
        }
      ],
      "group": "时间格式"
    },
    {
      "id": "showSeconds",
      "label": "显示秒",
      "type": "boolean",
      "default": true,
      "group": "时间格式"
    },
    {
      "id": "showNow",
      "label": "此刻快捷选择",
      "type": "boolean",
      "default": false,
      "group": "面板"
    },
    {
      "id": "open",
      "label": "初始展开面板",
      "type": "boolean",
      "default": false,
      "group": "面板",
      "when": {
        "timeState": [
          "empty",
          "hover",
          "focused",
          "selected",
          "filled-focused"
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

**适用**：时间选择器 TimePicker相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：确认后提交时间

id：`confirmed-time` · portability：`portable` · owner：`wb-time-picker`

显示已提交值；取消面板不会覆盖当前业务值。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTimePicker } from "@workbench/ui-vue3"
const meetingTime = ref('09:30')
</script>
<template>
  <WorkbenchTimePicker v-model="meetingTime" :show-seconds="false" aria-label="会议时间" />
  <output>已确认：{{ meetingTime }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TIME-PICKER-V1/time-picker?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaDescribedby | String |  |  | 关联辅助说明元素ID。 |
| ariaLabel | String | 选择时间 |  | 控件的可访问名称。 |
| defaultOpen | Boolean |  |  | 默认展开面板，主要用于演示或明确的嵌入交互。 |
| disabled | Boolean |  |  | 禁用选择交互。 |
| invalid | Boolean |  |  | 声明控件存在错误状态。 |
| modelValue | String \| Array |  |  | 受控时间字符串；range模式为起止时间字符串数组。 |
| name | String |  |  | 设置确认后同步的隐藏表单字段名。 |
| placeholder | String | 请选择时间 |  | 未选择时间时显示的提示文案。 |
| previewState | String | default |  | Studio预览状态参数。 |
| range | Boolean |  |  | 启用时间范围选择。 |
| showNow | Boolean |  |  | 是否显示“此刻”快捷操作。 |
| showSeconds | Boolean | true |  | 是否提供秒列；关闭时保留HH:mm格式。 |
| teleportPanel | Boolean |  |  | 将面板传送到body以绕开祖先裁切。 |
| use12Hours | Boolean |  |  | 以12小时制呈现选择列；模型值仍为24小时制。 |

### Events

- `update:modelValue`：已确认的时间字符串或范围数组。；用户点击确定并提交草稿后发出。

- `change`：已提交的时间值。；确认时间选择后发出。

- `cancel`：无。；草稿被取消或关闭并恢复已提交值时发出。

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-button`

### Foundation 引用

`font-body-m`、`radius-sm`、`radius-md`、`color-text-primary`、`color-text-placeholder`、`color-border`、`color-border-focus`、`color-fill-hover`、`color-surface-overlay`

### 选型

预约或配置单个时刻使用单值；需要开始和结束时启用range。

- showSeconds关闭时保持HH:mm兼容格式。

- 需要12小时显示时启用use12Hours；提交模型仍以24小时制表达。

### 设计结构与排版

单选输入宽280px，范围输入宽374px；浮层按小时、分钟及可选秒分列。

- showNow默认关闭；需要快捷当前时间提交时再开启。

- teleportPanel用于被裁切容器内的面板展示；默认不传送。

### 交互与键盘

修改仅写入面板草稿；点击确定后才发出新modelValue和change。

- 取消、Escape、点外或焦点离开会撤销未提交草稿。

- 方向键、PageUp/PageDown、Home/End调整数值；左右键切换时间列。

- 范围先选择开始再选择结束；结束早于开始时禁止确认。

### 使用边界与职责

消费方负责提交时间后续化、时区解释与业务范围校验。

- 隐藏表单字段仅在确认后同步。

- Studio的previewState/defaultOpen用于展示状态，不作为业务状态输入。

- 当前为preview-vue3原型资格；静态设计没有定义范围反向的错误样式。

### 包内关联引用

```json
[
  {
    "label": "时间选择规范",
    "href": "#rules"
  }
]
```

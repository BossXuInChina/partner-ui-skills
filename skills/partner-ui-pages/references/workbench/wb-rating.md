<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 评分 Rating — `WorkbenchRating`

资产：`wb-rating` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-RATING-V1/rating?view=preview)

用于表达等级、满意度或服务反馈。支持整分与半分、数值或文字说明，也可在只读界面展示已有评分。

公开入口：`@workbench/ui-vue3` → `WorkbenchRating`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-RATING-V1/rating?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "empty",
      "label": "未评分"
    },
    {
      "id": "selected",
      "label": "已评分"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [],
  "pilotControls": [
    {
      "id": "descriptionMode",
      "label": "评分说明",
      "type": "select",
      "default": "per-star",
      "options": [
        {
          "value": "per-star",
          "label": "逐星评价标准"
        },
        {
          "value": "text",
          "label": "文字说明"
        },
        {
          "value": "numeric",
          "label": "数值说明"
        },
        {
          "value": "none",
          "label": "无说明"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "descriptionPlacement",
      "label": "说明位置",
      "type": "select",
      "default": "right",
      "options": [
        {
          "value": "right",
          "label": "右侧"
        },
        {
          "value": "bottom",
          "label": "下方"
        }
      ],
      "group": "类型与尺寸",
      "when": {
        "descriptionMode": [
          "text",
          "numeric"
        ]
      }
    },
    {
      "id": "step",
      "label": "评分步长",
      "type": "select",
      "default": "1",
      "options": [
        {
          "value": "1",
          "label": "整星"
        },
        {
          "value": "0.5",
          "label": "半星"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "readOnly",
      "label": "只读评分",
      "type": "boolean",
      "default": false,
      "group": "状态与内容"
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
  "dynamicBindings": [],
  "explicitCaseIds": [],
  "loopExpressions": [
    "state in ['empty', 'selected', 'disabled']"
  ]
}
```

## 使用场景

[在 Studio 中查看](http://localhost:4173/preview/WB-RATING-V1/rating?view=examples)

**适用**：以五级星形表达主观评分

**不适用**：精确数值录入或超过半分精度

官方来源 SFC：supported。

### 示例：可编辑半星评分

id：`editable-half-star` · portability：`portable` · owner：`wb-rating`

受控半星示例，导入、数据和结果显示均完整定义。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchRating } from "@workbench/ui-vue3"

const score = ref(3.5)
const descriptions = ["很差", "较差", "一般", "较好", "很好"]
</script>
<template>
  <WorkbenchRating v-model="score" :max="5" :step="0.5" description-mode="per-star" :descriptions="descriptions" aria-label="服务评分" />
  <output>当前评分：{{ score }}</output>
</template>
```

### 示例：只读评分

id：`readonly-rating` · portability：`portable` · owner：`wb-rating`

详情页中展示已保存的整分评价。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchRating } from "@workbench/ui-vue3"
const savedScore = 4
</script>
<template>
  <WorkbenchRating :model-value="savedScore" read-only description-mode="numeric" aria-label="已保存评分" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-RATING-V1/rating?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaDescribedby | String |  |  | 关联外部说明元素的ID。 |
| ariaLabel | String | 评分 |  | 评分控件的可访问名称。 |
| descriptionMode | String | per-star | none / text / numeric / per-star | 选择无说明、整体文字、数值或逐星说明；numeric模式将传入分值格式化为一位小数。 |
| descriptionPlacement | String | right | right / bottom | 整体说明位于右侧或下方。 |
| descriptions | Array | {"kind":"function"} |  | 逐星标签及文字说明的有序列表；自定义max时应匹配星级。 |
| disabled | Boolean |  |  | 禁用用户操作；同时遵循表单上下文的禁用状态。 |
| invalid | Boolean |  |  | 将控件标记为错误状态。 |
| max | Number | 5 |  | 星级总数，必须为正整数。 |
| modelValue | Number | 0 |  | 当前受控分值；调用方应保持在0到max范围内。用户交互产生的更新会规范到此区间。 |
| name | String |  |  | 有值时为表单加入同名隐藏输入。 |
| readOnly | Boolean |  |  | 阻止用户更改分值但保留评分呈现。 |
| step | Number | 1 |  | 评分增量，仅允许整分或半分。 |

### Events

- `update:modelValue`：新的数字分值。；用户点击星形或在可编辑控件上使用方向键、Home、End改变分值后发出。

### 规则

### 评分与键盘合同

id：`wb-rating-rule-1` · must / confirmed

modelValue为0至max的受控分值；max为正整数，step仅支持1或0.5。点击选择，方向键按step移动，Home清空，End选满，并同步移动焦点。

**适用条件**：星级评分

### 说明与表单

id：`wb-rating-rule-2` · must / confirmed

descriptionMode支持none/text/numeric/per-star，说明位于右侧或下方；name存在时通过隐藏输入参与FormData。disabled阻止选择并使用禁用图标色；readOnly阻止点击和键盘选择但保留正常评分颜色。星形复用WorkbenchIcon收藏实心图标，在13px槽内等比渲染；通过colorSplit接口在单个SVG内以同位置色标沿中心线硬分色，避免独立裁切与叠层在浏览器缩放时产生接缝。

**适用条件**：评分伴随文字或表单提交

### Foundation 引用

`color-border-focus`、`color-icon-disabled`、`color-text-primary`、`color-warning`、`font-body-m`、`radius-sm`、`spacing-component-sm`

### 选型

适合用户以星级表达有序评价的场景。需要精确填写任意数值时使用数字输入；需要解释原因时应另配文本字段。

- 整分评分使用默认步长；需要半星反馈时将步长设为0.5。

- 详情页展示已有评分时使用只读模式；禁用模式用于当前不可操作的控件状态。

### 设计结构与排版

每颗星使用12px已登记原生图标和独立16px交互热区；半星由同一图标内的颜色分界呈现。保持图标原始绘制，不叠放或裁切两个星形。

- descriptionMode支持无说明、整体文字、数值及逐星说明四类；整体说明可放在右侧或下方。

- 逐星说明按评分级别排列；自定义max时，descriptions应提供对应级数的文字。

- 只读评分保留正常评分颜色并声明只读；禁用评分使用禁用色。

### 交互与键盘

点击星形更新受控分值；半星模式根据点击位置选择该星的半分或整分。焦点随当前分值定位。

- 方向键按step增减；Home清零，End设为满分。

- readOnly和disabled均阻止分值变化；readOnly仍可聚焦并保留正常颜色。

### 使用边界与职责

评分值由调用方通过modelValue持有并响应update:modelValue。组件不提供插槽；说明文字通过descriptionMode和descriptions配置。

- max必须为正整数；step仅支持1或0.5。

- name提供时组件加入同名隐藏表单输入；未提供name时不产生FormData字段。

- ariaLabel提供可访问名称；ariaDescribedby可关联外部说明，invalid用于声明错误状态。

- 组件只表达评分，不定义评分提交、业务校验、统计或持久化流程。

### 包内关联引用

```json
[
  {
    "label": "已批准评分规范",
    "href": "#rules"
  }
]
```

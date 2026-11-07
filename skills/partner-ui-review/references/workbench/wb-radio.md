<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 单选框 Radio — `WorkbenchRadio`

资产：`wb-radio` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CHOICE-V1/radio?view=preview)

用于从互斥选项中选择一个值。多个Radio共享name和v-model状态，由调用方提供选项布局。

公开入口：`@workbench/ui-vue3` → `WorkbenchRadio`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-CHOICE-V1/radio?view=variants)

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
      "id": "selected",
      "label": "选中"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [],
  "pilotControls": [
    {
      "id": "previewState",
      "type": "select",
      "label": "外观状态",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "hover",
          "label": "悬停"
        },
        {
          "value": "disabled",
          "label": "禁用"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "initialSelection",
      "type": "select",
      "label": "初始选择",
      "default": "none",
      "options": [
        {
          "value": "none",
          "label": "未选择"
        },
        {
          "value": "email",
          "label": "邮件提醒"
        },
        {
          "value": "workbench",
          "label": "工作台站内消息"
        }
      ],
      "group": "状态与内容",
      "intent": "initial-value"
    },
    {
      "id": "direction",
      "label": "排列方式",
      "type": "select",
      "default": "horizontal",
      "options": [
        {
          "value": "horizontal",
          "label": "横向排列"
        },
        {
          "value": "vertical",
          "label": "纵向排列"
        }
      ],
      "group": "布局"
    },
    {
      "id": "showDescription",
      "type": "boolean",
      "label": "显示辅助说明",
      "default": false,
      "group": "展示选项"
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
    "instanceId",
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

**适用**：互斥选择

**不适用**：未经验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：选择交付方式

id：`delivery-method` · portability：`portable` · owner：`wb-radio`

两个选项共享name与受控值，展示标准的互斥选择关系。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchRadio } from '@workbench/ui-vue3'
const delivery = ref('online')
</script>
<template>
  <fieldset>
    <legend>选择交付方式</legend>
    <WorkbenchRadio v-model="delivery" name="delivery" value="online" label="线上交付" />
    <WorkbenchRadio v-model="delivery" name="delivery" value="onsite" label="现场交付" />
  </fieldset>
  <output>当前选择：{{ delivery }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-CHOICE-V1/radio?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String |  |  | 无可见选项文本时的可访问名称。 |
| description | String |  |  | 显示在选项标签下方的辅助说明。 |
| disabled | Boolean |  |  | 阻止该选项交互。 |
| hover | Boolean |  |  | Studio预览悬浮状态控制。 |
| label | String |  |  | 可见选项文本。 |
| modelValue | String |  |  | 当前组共享的字符串选择值。 |
| name * | String |  |  | 同组Radio共享的原生表单名称，必填。 |
| noWrap | Boolean |  |  | 单行截断长选项文本。 |
| value * | String |  |  | 此项唯一的字符串值，必填。 |

### Events

- `update:modelValue`：被选中的字符串value。；用户选择本项时发出；调用方应更新同组共享值。

### 规则

### 尺寸与状态

id：`wb-radio-rule-1` · must / confirmed

图形16×16px，图文间距8px，默认三级图标色描边，悬浮一级图标色；禁用优先于悬浮。

**适用条件**：互斥选择

### 版本范围

id：`wb-radio-rule-2` · must / confirmed

当前版本视觉参数已批准；新增样式与复杂交互通过后续版本评审，当前不推断支持。

**适用条件**：互斥选择

### 使用约束 1

id：`wb-radio-rule-3` · must / confirmed

同组使用相同name，value唯一，通过v-model共享值；原生Radio支持键盘互斥选择，选中白色内圆7px。

**适用条件**：互斥选择

### 文案与辅助说明

id：`wb-radio-rule-4` · must / confirmed

图形对齐主文本首行；辅助说明左对齐，使用Caption M；noWrap超过20个字符省略且保留全文提示和可访问名称。

**适用条件**：互斥选择

### 选项组排列

id：`wb-radio-rule-5` · must / confirmed

RadioGroup纵向间距8px、横向16px并允许换行；其示例结构和布局规则与CheckboxGroup保持一致。

**适用条件**：互斥选择

### 无可见文字

id：`wb-radio-rule-6` · must / confirmed

不显示文字时必须传入ariaLabel提供可访问名称。

**适用条件**：互斥选择

### Foundation 引用

`color-icon-primary`、`color-icon-tertiary`、`color-icon-disabled`、`color-border-disabled`、`color-fill-subtle-disabled`、`color-fill-subtle-default`、`color-text-primary`、`color-text-inverse`、`color-text-disabled`、`color-border-focus`、`spacing-component-sm`、`spacing-component-lg`、`radius-full`、`radius-sm`、`spacing-component-xs`、`color-text-secondary`

### 分组选项

同组的Radio必须使用相同name，每项使用唯一value，并绑定同一受控值。原生radio键盘行为负责组内移动和选中。

- 使用label提供可见选项名；无可见文本时传ariaLabel。

- disabled保留既有选择状态并阻止操作；辅助文案通过description提供。

### 排版与可访问性

图形与主要文本首行对齐，辅助说明在标题下方左对齐。组方向和项目间距由调用方负责。

- noWrap启用长文案单行省略；名称仍应通过label和ariaLabel清楚表达。

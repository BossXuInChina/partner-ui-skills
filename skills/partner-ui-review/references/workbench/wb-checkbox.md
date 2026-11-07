<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 复选框 Checkbox — `WorkbenchCheckbox`

资产：`wb-checkbox` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CHOICE-V1/checkbox?view=preview)

用于独立的布尔选择；半选状态由父级汇总并传入，组件本身不计算父子关系。

公开入口：`@workbench/ui-vue3` → `WorkbenchCheckbox`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-CHOICE-V1/checkbox?view=variants)

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
    },
    {
      "id": "indeterminate",
      "label": "半选"
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
      "default": "off",
      "options": [
        {
          "value": "off",
          "label": "未选"
        },
        {
          "value": "on",
          "label": "已选"
        },
        {
          "value": "mixed",
          "label": "半选"
        }
      ],
      "group": "状态与内容",
      "description": "控制主选项的初始状态；组合中的其他选项可以独立勾选。",
      "intent": "initial-value"
    },
    {
      "id": "direction",
      "label": "排列方式",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "单个选项"
        },
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
      "id": "textExample",
      "label": "文本示例",
      "type": "select",
      "default": "short",
      "options": [
        {
          "value": "short",
          "label": "默认文本"
        },
        {
          "value": "long",
          "label": "长文本"
        },
        {
          "value": "custom",
          "label": "自定义文本"
        }
      ],
      "group": "内容"
    },
    {
      "id": "label",
      "type": "text",
      "label": "选项文字",
      "default": "接收项目进度提醒",
      "group": "内容",
      "when": {
        "textExample": [
          "custom"
        ]
      }
    },
    {
      "id": "showDescription",
      "type": "boolean",
      "label": "显示辅助说明",
      "default": true,
      "group": "展示选项"
    },
    {
      "id": "noWrap",
      "type": "boolean",
      "label": "单行截断长文字",
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

**适用**：独立多项选择与父级半选状态

**不适用**：未经验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：通知偏好

id：`notification-preference` · portability：`portable` · owner：`wb-checkbox`

单个受控复选项；提交和保存偏好由调用方实现。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchCheckbox } from '@workbench/ui-vue3'
const receiveUpdates = ref(true)
</script>
<template>
  <WorkbenchCheckbox v-model="receiveUpdates" label="接收申请状态变化通知" description="申请审核进度变化时发送工作台通知。" />
  <output>通知{{ receiveUpdates ? '已开启' : '已关闭' }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-CHOICE-V1/checkbox?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String |  |  | 没有可见label时的可访问名称。 |
| description | String |  |  | 标题下方的辅助说明。 |
| disabled | Boolean |  |  | 阻止交互并保留当前选择。 |
| hover | Boolean |  |  | Studio预览悬浮状态控制。 |
| indeterminate | Boolean |  |  | 父级传入的半选显示状态；半选数据由调用方计算。 |
| label | String |  |  | 可见选项文字。 |
| modelValue | Boolean |  |  | 单个复选框当前布尔值。 |
| noWrap | Boolean |  |  | 将标签限制为单行省略。 |

### Events

- `update:modelValue`：新的Boolean选择值。；用户切换复选框时发出。

- `update:indeterminate`：Boolean；用户操作后为false。；用户激活复选框后发出，父级据此清除半选状态。

### 规则

### 尺寸与状态

id：`wb-checkbox-rule-1` · must / confirmed

图形16×16px，图文间距8px，默认三级图标色描边，悬浮一级图标色；禁用优先于悬浮。

**适用条件**：独立多项选择与父级半选状态

### 版本范围

id：`wb-checkbox-rule-2` · must / confirmed

当前版本视觉参数已批准；新增样式与复杂交互通过后续版本评审，当前不推断支持。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 1

id：`wb-checkbox-rule-3` · must / confirmed

半选由父级计算并传入indeterminate；点击半选转为选中并清除半选，禁用阻止操作。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 2

id：`wb-checkbox-rule-4` · must / confirmed

图形对齐主文本首行；辅助说明左对齐，使用Caption M；noWrap超过20个字符省略且保留全文提示和可访问名称。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 3

id：`wb-checkbox-rule-5` · must / confirmed

CheckboxGroup纵向间距8px、横向16px并允许换行。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 4

id：`wb-checkbox-rule-6` · must / confirmed

Select多选复用无交互的ChoiceMark标识；listbox option负责选择语义和键盘操作，不嵌套第二个checkbox输入。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 5

id：`wb-checkbox-rule-7` · must / confirmed

不显示文字时必须传入ariaLabel提供可访问名称。

**适用条件**：独立多项选择与父级半选状态

### Foundation 引用

`color-icon-primary`、`color-icon-tertiary`、`color-icon-disabled`、`color-border-disabled`、`color-fill-subtle-disabled`、`color-fill-subtle-default`、`color-text-primary`、`color-text-inverse`、`color-text-disabled`、`color-border-focus`、`spacing-component-sm`、`spacing-component-lg`、`radius-full`、`radius-sm`、`font-body-m`、`font-caption-m`、`spacing-component-xs`、`color-text-secondary`

### 选择与半选

v-model管理单个布尔值。indeterminate由父级计算；用户激活半选项后转为选中，并发出清除半选状态的更新。

- disabled阻止交互并保留当前状态。

- Select的选项语义由listbox管理，不应在选项内部再嵌套交互Checkbox。

### 文本与可访问性

标签文本位于图形右侧，辅助说明与标题左侧对齐。多项排列由调用方容器决定。

- 没有可见文本时使用ariaLabel。

- noWrap适用于固定单行选项；长文本应保留完整可访问名称。辅助说明仍独占下一行，与标题保持4px间距。

- 多项组合使用CheckboxGroup：横向16px、纵向8px，横向空间不足自然换行。

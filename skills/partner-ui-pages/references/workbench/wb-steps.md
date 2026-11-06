<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 步骤条 Steps — `WorkbenchSteps`

资产：`wb-steps` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-STEPS-V1/steps?view=preview)

用于展示多阶段任务的流程进度，并按业务需要允许回看可导航步骤。

公开入口：`@workbench/ui-vue3` → `WorkbenchSteps`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-STEPS-V1/steps?view=variants)

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
      "id": "error",
      "label": "步骤异常"
    },
    {
      "id": "disabled",
      "label": "含无权限节点"
    },
    {
      "id": "unavailable",
      "label": "含不可操作节点"
    },
    {
      "id": "long",
      "label": "超长文本"
    },
    {
      "id": "overflow",
      "label": "多节点溢出"
    },
    {
      "id": "empty",
      "label": "空列表"
    }
  ],
  "controls": [
    {
      "id": "variant",
      "label": "类型",
      "type": "select",
      "default": "horizontal",
      "options": [
        {
          "value": "horizontal",
          "label": "横向单链型"
        },
        {
          "value": "vertical",
          "label": "纵向单链型"
        },
        {
          "value": "arrow",
          "label": "箭头型"
        }
      ]
    },
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "large",
          "label": "大尺寸"
        },
        {
          "value": "medium",
          "label": "中尺寸"
        },
        {
          "value": "small",
          "label": "小尺寸"
        },
        {
          "value": "mini",
          "label": "迷你尺寸"
        }
      ]
    },
    {
      "id": "nodeType",
      "label": "节点内容",
      "type": "select",
      "default": "number",
      "options": [
        {
          "value": "number",
          "label": "数字"
        },
        {
          "value": "icon",
          "label": "图标"
        }
      ]
    },
    {
      "id": "readonly",
      "label": "不可回溯",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showDescription",
      "label": "辅助文本",
      "type": "boolean",
      "default": true
    },
    {
      "id": "stepCount",
      "label": "节点数量",
      "type": "range",
      "default": 5,
      "min": 2,
      "max": 12,
      "step": 1
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
  "pilotControls": [
    {
      "id": "demoState",
      "type": "select",
      "label": "组件状态",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "error",
          "label": "步骤异常"
        },
        {
          "value": "disabled",
          "label": "含无权限节点"
        },
        {
          "value": "unavailable",
          "label": "含不可操作节点"
        },
        {
          "value": "long",
          "label": "超长文本"
        },
        {
          "value": "overflow",
          "label": "多节点溢出"
        },
        {
          "value": "empty",
          "label": "空列表"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "variant",
      "label": "类型",
      "type": "select",
      "default": "horizontal",
      "options": [
        {
          "value": "horizontal",
          "label": "横向单链型"
        },
        {
          "value": "vertical",
          "label": "纵向单链型"
        },
        {
          "value": "arrow",
          "label": "箭头型"
        }
      ]
    },
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "large",
          "label": "大尺寸"
        },
        {
          "value": "medium",
          "label": "中尺寸"
        },
        {
          "value": "small",
          "label": "小尺寸"
        },
        {
          "value": "mini",
          "label": "迷你尺寸"
        }
      ]
    },
    {
      "id": "nodeType",
      "label": "节点内容",
      "type": "select",
      "default": "number",
      "options": [
        {
          "value": "number",
          "label": "数字"
        },
        {
          "value": "icon",
          "label": "图标"
        }
      ]
    },
    {
      "id": "readonly",
      "label": "不可回溯",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showDescription",
      "label": "辅助文本",
      "type": "boolean",
      "default": true
    },
    {
      "id": "stepCount",
      "label": "节点数量",
      "type": "range",
      "default": 5,
      "min": 2,
      "max": 12,
      "step": 1
    }
  ],
  "presets": [
    {
      "id": "horizontal",
      "label": "横向",
      "controls": {
        "variant": "horizontal",
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "demoState": "default"
      }
    },
    {
      "id": "vertical",
      "label": "纵向",
      "controls": {
        "variant": "vertical",
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "demoState": "default"
      }
    },
    {
      "id": "arrow",
      "label": "箭头",
      "controls": {
        "variant": "arrow",
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "demoState": "default"
      }
    },
    {
      "id": "long",
      "label": "长步骤文案",
      "controls": {
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "variant": "vertical",
        "demoState": "long"
      }
    },
    {
      "id": "overflow",
      "label": "多步骤溢出",
      "controls": {
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 12,
        "variant": "horizontal",
        "demoState": "overflow"
      }
    },
    {
      "id": "error",
      "label": "异常步骤",
      "controls": {
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "variant": "arrow",
        "demoState": "error"
      }
    },
    {
      "id": "disabled",
      "label": "禁用状态",
      "controls": {
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "variant": "vertical",
        "demoState": "disabled"
      }
    },
    {
      "id": "empty",
      "label": "空列表",
      "controls": {
        "size": "small",
        "nodeType": "number",
        "readonly": false,
        "showDescription": true,
        "stepCount": 4,
        "variant": "horizontal",
        "demoState": "empty"
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [
    "samples"
  ],
  "explicitCaseIds": [
    "sample.id",
    "`size-${size}`",
    "node-icon"
  ],
  "loopExpressions": [
    "sample in samples",
    "size in ['large', 'medium', 'small', 'mini']"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：步骤条 Steps相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：申请审核流程

id：`application-review-flow` · portability：`portable` · owner：`wb-steps`

查看流程当前进度，并由调用方处理允许回溯的步骤选择。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchSteps } from '@workbench/ui-vue3'
const selected = ref(1)
const current = ref(2)
const items = [
  { title: '提交申请', status: 'finish' },
  { title: '资料审核', status: 'finish' },
  { title: '结果确认', status: 'process' },
]
function onChange(index, item) { selected.value = index; console.log('查看步骤：', item.title) }
</script>
<template>
  <WorkbenchSteps v-model="selected" :current="current" :items="items" :readonly="false" aria-label="申请审核流程" @change="onChange" />
  <output>流程进度：第{{ current + 1 }}步；正在查看第{{ selected + 1 }}步</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-STEPS-V1/steps?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 流程步骤 |  | 有序步骤列表可访问名称。 |
| current | Number |  |  | 实际流程进度；不传时跟随modelValue。 |
| disabled | Boolean | false |  | 禁用整个步骤条。 |
| items * | Array |  |  | 必填StepItem数组：title必填；可选key、description、status、disabled、clickable。 |
| modelValue | Number | 0 |  | 当前查看索引，0起始；-1可表示无选中。 |
| nodeType | String | number |  | number或icon。 |
| readonly | Boolean | true |  | 默认true；控制步骤导航交互。 |
| size | String | medium |  | large、medium、small或mini。 |
| variant | String | horizontal |  | horizontal、vertical或arrow。 |

### Events

- `update:modelValue`：新选中步骤索引Number。；调用方允许跳转的步骤被选择时发出。

- `change`：(index, item)：新索引与对应StepItem。；用户选择可导航步骤时发出。

### Slots

- `icon`：{ item, index, status }；图标节点为装饰内容，辅助技术名称由步骤标题、状态和描述提供。

- `title`：{ item, index }；自定义步骤标题内容。

- `description`：{ item, index }；自定义步骤辅助说明内容。

### 规则

包内未提供规则；不补写设计结论。

### Foundation 引用

`font-body-m`、`font-body-s`、`radius-full`、`font-headline-xs`、`font-headline-xxs`、`font-body-l`

### 流程模型

items按流程顺序提供title和可选description、status、disabled、clickable。modelValue是当前查看步骤索引，从0开始；current是实际流程进度，可与浏览位置分离。

- 显式status优先于current推导；禁用和不可操作状态不能跳转。

- readonly默认true；只有业务允许回溯时才设为false。

### 类型、键盘与布局

horizontal用于页面顶部短流程，vertical用于长流程侧栏，arrow强调单向阶段推进。尺寸支持large、medium、small、mini；箭头型使用固定高度。

- 可操作步骤支持方向键及Home/End，Enter或Space确认。

- 溢出通过内部横向滚动和翻页控制处理；不会把流程变成卡片列表。

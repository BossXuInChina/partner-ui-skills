<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 滑动条 Slider — `WorkbenchSlider`

资产：`wb-slider` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SLIDER-V1/slider?view=preview)

用于在连续或离散数值范围内调节单值，也支持不交叉的离散区间。

公开入口：`@workbench/ui-vue3` → `WorkbenchSlider`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-SLIDER-V1/slider?view=variants)

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
      "id": "active",
      "label": "已调整"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "sliderType",
      "type": "select",
      "label": "滑动条类型",
      "description": "配置作用于自定义组合；固定示例保留用于对照。",
      "default": "discrete",
      "options": [
        {
          "value": "continuous",
          "label": "连续"
        },
        {
          "value": "discrete",
          "label": "间续"
        }
      ]
    },
    {
      "id": "range",
      "type": "boolean",
      "label": "双滑块区间（仅间续）",
      "default": false
    },
    {
      "id": "showTicks",
      "type": "boolean",
      "label": "显示刻度（仅间续）",
      "default": true
    },
    {
      "id": "showInput",
      "type": "boolean",
      "label": "显示输入框",
      "default": true
    },
    {
      "id": "wideInput",
      "type": "boolean",
      "label": "加宽输入框（长数值）",
      "default": false
    },
    {
      "id": "showUnit",
      "type": "boolean",
      "label": "显示数据单位",
      "default": true
    },
    {
      "id": "showTooltip",
      "type": "boolean",
      "label": "显示交互气泡",
      "default": true
    },
    {
      "id": "showTickText",
      "type": "boolean",
      "label": "显示刻度说明",
      "description": "开启后在刻度值下方显示“最低、建议、最高”等可配置文本。",
      "default": true
    },
    {
      "id": "tickLabelMode",
      "type": "select",
      "label": "刻度值显示",
      "description": "可展示全部刻度值，或仅保留左右两端值。",
      "default": "all",
      "options": [
        {
          "value": "none",
          "label": "不显示刻度值"
        },
        {
          "value": "all",
          "label": "全部刻度值"
        },
        {
          "value": "endpoints",
          "label": "仅两端刻度值"
        }
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "sliderState",
      "type": "select",
      "label": "交互状态",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "active",
          "label": "调整中"
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
      "id": "valuePreset",
      "type": "select",
      "label": "初始数值",
      "default": "normal",
      "options": [
        {
          "value": "normal",
          "label": "常用值"
        },
        {
          "value": "minimum",
          "label": "最小边界"
        },
        {
          "value": "maximum",
          "label": "最大边界"
        }
      ],
      "group": "状态与内容"
    },
    {
      "id": "sliderType",
      "type": "select",
      "label": "滑动条类型",
      "default": "discrete",
      "options": [
        {
          "value": "continuous",
          "label": "连续"
        },
        {
          "value": "discrete",
          "label": "离散"
        }
      ],
      "group": "数值与刻度"
    },
    {
      "id": "range",
      "type": "boolean",
      "label": "双滑块区间（仅离散）",
      "default": false,
      "group": "数值与刻度",
      "when": {
        "sliderType": [
          "discrete"
        ]
      }
    },
    {
      "id": "showTicks",
      "type": "boolean",
      "label": "显示刻度（仅离散）",
      "default": true,
      "group": "数值与刻度",
      "when": {
        "sliderType": [
          "discrete"
        ]
      }
    },
    {
      "id": "showInput",
      "type": "boolean",
      "label": "显示输入框",
      "default": true,
      "group": "附属内容"
    },
    {
      "id": "wideInput",
      "type": "boolean",
      "label": "加宽输入框（长数值）",
      "default": false,
      "group": "附属内容",
      "when": {
        "showInput": [
          true
        ]
      }
    },
    {
      "id": "showUnit",
      "type": "boolean",
      "label": "显示数据单位",
      "default": true,
      "group": "附属内容"
    },
    {
      "id": "showTooltip",
      "type": "boolean",
      "label": "显示交互气泡",
      "default": true,
      "group": "附属内容"
    },
    {
      "id": "showTickText",
      "type": "boolean",
      "label": "显示刻度说明",
      "default": true,
      "group": "数值与刻度",
      "when": {
        "sliderType": [
          "discrete"
        ],
        "showTicks": [
          true
        ],
        "tickLabelMode": [
          "all",
          "endpoints"
        ]
      }
    },
    {
      "id": "tickLabelMode",
      "type": "select",
      "label": "刻度值显示",
      "default": "all",
      "options": [
        {
          "value": "none",
          "label": "不显示刻度值"
        },
        {
          "value": "all",
          "label": "全部刻度值"
        },
        {
          "value": "endpoints",
          "label": "仅两端刻度值"
        }
      ],
      "group": "数值与刻度",
      "when": {
        "sliderType": [
          "discrete"
        ],
        "showTicks": [
          true
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
  "literalData": {
    "tickLabels": [
      {
        "value": 0,
        "text": "最低"
      },
      {
        "value": 40,
        "text": "建议"
      },
      {
        "value": 100,
        "text": "最高"
      }
    ]
  },
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

**适用**：在连续值、离散值或离散区间内快速选择

**不适用**：要求精确键入且范围未知或区间端点可交叉

官方来源 SFC：supported。

### 示例：项目预算范围

id：`budget-range` · portability：`portable` · owner：`wb-slider`

离散区间示例；范围数据由调用方持有并可通过配套数值输入调整。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchSlider } from '@workbench/ui-vue3'
const budget = ref([20, 70])
</script>
<template>
  <WorkbenchSlider v-model="budget" type="discrete" range :min="0" :max="100" :step="5" show-value show-ticks show-input unit="万" aria-label="预算范围" />
  <output>预算范围：{{ budget[0] }}–{{ budget[1] }} 万</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SLIDER-V1/slider?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaDescribedby | String |  |  | 外部说明元素ID。 |
| ariaLabel | String | 滑动条 |  | 滑块可访问名称。 |
| disabled | Boolean |  |  | 禁用滑块和配套输入。 |
| invalid | Boolean |  |  | 声明错误状态。 |
| max | Number | 100 |  | 范围最大值，默认100。 |
| min | Number | 0 |  | 范围最小值，默认0。 |
| modelValue | Number \| Array | 0 |  | 单值Number或range模式下的双端点Array。 |
| name | String |  |  | 原生表单字段名；区间对应name-min/name-max。 |
| range | Boolean |  |  | 在discrete模式下启用区间。 |
| showInput | Boolean |  |  | 显示配套数值输入。 |
| showTickLabels | Boolean |  |  | 显示刻度文本。 |
| showTicks | Boolean |  |  | 显示刻度。 |
| showTooltip | Boolean |  |  | 显示操作提示。 |
| showValue | Boolean |  |  | 显示当前数值。 |
| step | Number | 1 |  | 数值吸附与键盘调整的增量，默认1；continuous和discrete模式均使用该步长。 |
| tickLabelMode | String | all | all / endpoints | all或endpoints标签模式。 |
| tickLabels | Array \| Object | {"kind":"function"} |  | 刻度值到标签的数组或对象映射。 |
| type | String | continuous | continuous / discrete | continuous或discrete。 |
| unit | String |  |  | 显示单位文本，大小写由组件规范化。 |
| wideInput | Boolean |  |  | 加宽配套数值输入。 |

### Events

- `update:modelValue`：单值模式为Number；range模式为[min, max] Number数组。；滑块、轨道或配套输入造成值变化时发出；边界与step规范化由组件执行。

### 规则

### 数值与区间合同

id：`wb-slider-rule-1` · must / confirmed

modelValue为受控数字；type为continuous或discrete。仅discrete结合range形成双端区间，端点不可交叉，轨道点击选择最近端点，数值按step吸附并限制在min/max内。

**适用条件**：滑动选择

### 可选部件与表单

id：`wb-slider-rule-2` · must / confirmed

可配置刻度、刻度说明、输入框、当前值、单位和焦点/拖动提示。单值name直接提交；区间仅在name存在时提交name-min和name-max，未传name不得产生隐式表单字段。

**适用条件**：表单滑动选择

### 交互与禁用

id：`wb-slider-rule-3` · must / confirmed

原生range承载键盘与可访问语义；disabled同时阻止轨道、滑块和配套输入变化。提示只在键盘聚焦或指针操作期间展示。

**适用条件**：键盘或指针操作

### Slider内置数值提示圆角

id：`wb-slider-tooltip-radius-20261025` · must / confirmed

Slider内置数值提示气泡主体使用Foundation radius-sm（4px）；该规则不改变轨道、滑块或配套输入。

**适用条件**：显示Slider数值提示

### 组件依赖

`wb-input`、`wb-popover`

### Foundation 引用

`color-border-disabled`、`color-fill-default`、`color-fill-disabled`、`color-icon-disabled`、`color-icon-primary`、`color-surface-overlay`、`color-text-disabled`、`color-text-placeholder`、`color-text-primary`、`font-body-m`、`font-body-s`、`radius-full`、`radius-md`、`radius-sm`、`shadow-lg`、`spacing-component-md`、`spacing-component-sm`、`spacing-component-xs`

### 数值模型

continuous用于连续单值外观，discrete用于离散单值；两种模式的交互值均按step吸附。range仅在discrete类型下启用双端点，modelValue为[最小端,最大端]。

- 端点不可交叉，轨道点击选择最近端点。

- name使单值参与表单；区间生成name-min和name-max字段。

### 可选组成与可访问性

showTicks、showTickLabels、showInput、showValue和showTooltip分别控制辅助展示部件。tickLabelMode选择全部刻度标签或仅端点。

- disabled同时禁用滑块、轨道和配套输入。

- ariaDescribedby关联说明，invalid声明错误状态。

<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 页签 Tabs — `WorkbenchTabs`

资产：`wb-tabs` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TABS-V1/tabs?view=preview)

用于切换相互关联的平级内容面板。需要互斥设置值但不切换内容面板时使用ButtonRadioGroup。

公开入口：`@workbench/ui-vue3` → `WorkbenchTabs`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TABS-V1/tabs?view=variants)

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
      "id": "addable",
      "label": "允许拓展",
      "type": "boolean",
      "default": false
    },
    {
      "id": "closable",
      "label": "允许关闭基础页签",
      "type": "boolean",
      "default": false
    },
    {
      "id": "composition",
      "label": "预览内容",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "单层页签"
        },
        {
          "value": "nested",
          "label": "嵌套页签"
        }
      ]
    },
    {
      "id": "variant",
      "label": "类型",
      "type": "select",
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础页签"
        },
        {
          "value": "divider",
          "label": "分割线式页签"
        },
        {
          "value": "rail",
          "label": "贯穿线式页签"
        },
        {
          "value": "segment",
          "label": "单选块式页签"
        }
      ]
    },
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
          "value": "disabled",
          "label": "含禁用项"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "addable",
      "label": "允许拓展",
      "type": "boolean",
      "default": false,
      "when": {
        "composition": [
          "single"
        ]
      }
    },
    {
      "id": "closable",
      "label": "允许关闭基础页签",
      "type": "boolean",
      "default": false,
      "when": {
        "composition": [
          "single"
        ]
      }
    },
    {
      "id": "composition",
      "label": "预览内容",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "单层页签"
        },
        {
          "value": "nested",
          "label": "卡片两级嵌套"
        },
        {
          "value": "page-nested",
          "label": "页面三级嵌套"
        },
        {
          "value": "card-nested",
          "label": "卡片三级嵌套"
        }
      ]
    },
    {
      "id": "variant",
      "label": "类型",
      "type": "select",
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础页签"
        },
        {
          "value": "divider",
          "label": "分割线式页签"
        },
        {
          "value": "rail",
          "label": "贯穿线式页签"
        },
        {
          "value": "segment",
          "label": "单选块式页签"
        }
      ],
      "when": {
        "composition": [
          "single"
        ]
      }
    },
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
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "kinds": [
      {
        "id": "basic",
        "label": "基础"
      },
      {
        "id": "divider",
        "label": "分割线"
      },
      {
        "id": "rail",
        "label": "贯穿线"
      },
      {
        "id": "segment",
        "label": "单选块"
      }
    ],
    "nestedCases": [
      {
        "value": "nested",
        "label": "卡片两级 · 基础 → 单选块",
        "shortLabel": "嵌套页签",
        "variant": "basic"
      },
      {
        "value": "page-nested",
        "label": "页面三级 · 基础 → 分割线 → 单选块",
        "shortLabel": "页面三级嵌套",
        "variant": "basic"
      },
      {
        "value": "card-nested",
        "label": "卡片三级 · 贯穿线 → 分割线 → 单选块",
        "shortLabel": "卡片三级嵌套",
        "variant": "rail"
      }
    ],
    "items": [
      {
        "value": "summary",
        "label": "申请摘要"
      },
      {
        "value": "materials",
        "label": "申请材料"
      },
      {
        "value": "history",
        "label": "处理记录"
      }
    ]
  },
  "dynamicBindings": [
    "nestedSelection",
    "sizes",
    "selected"
  ],
  "explicitCaseIds": [
    "'size-' + size"
  ],
  "loopExpressions": [
    "(kind, index) in kinds",
    "(size, index) in ['small', 'large']"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：同一上下文内平级内容切换

**不适用**：站点路由导航、异步加载时直接自动激活；未经验证的内部 UI 框架或生产交付

官方来源 SFC：supported。

### 示例：申请详情页签

id：`application-sections` · portability：`portable` · owner：`wb-tabs`

面板根据当前页签值显示相应平级信息；切换后的业务数据由父级决定。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchTabs } from '@workbench/ui-vue3'
const active = ref('summary')
const tabs = [
  { value: 'summary', label: '申请摘要' },
  { value: 'materials', label: '提交材料' },
  { value: 'history', label: '审核记录' },
]
</script>
<template>
  <WorkbenchTabs v-model="active" :items="tabs" aria-label="申请详情">
    <template #panel="{ item }"><section><h2>{{ item.label }}</h2><p>展示{{ item.label }}对应的申请信息。</p></section></template>
  </WorkbenchTabs>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TABS-V1/tabs?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| addable | Boolean | false |  | 显示可新增页签的入口；只支持basic、divider、rail。 |
| align | String | start | start / center |  |
| ariaLabel | String | 页签 |  | 页签列表可访问名称。 |
| items * | Array |  |  | 必填页签数组；value唯一、label提供可访问名称，可选disabled与closable。 |
| modelValue * | String \| Number |  |  | 当前唯一选中值，必填。 |
| size | String | small | small / large | small或large。 |
| variant | String | basic | basic / divider / rail / segment | basic、divider、rail或segment。 |

### Events

- `update:modelValue`：新选中的String或Number value。；选择启用项后发出。

- `change`：被选中的item对象。；选中值变化后发出。

- `add`：无。；激活新增入口后发出；调用方创建新item并更新items。

- `remove`：请求移除的item对象。；启用且closable的basic页签被关闭时发出；组件保留数据所有权给调用方。

### Slots

- `tab`：{ item, selected }；自定义页签标签；保留可访问标签与选中状态。

- `panel`：{ item }；渲染当前选中项的内容面板；内容数据和草稿由调用方维护。

### 规则

### 选型边界

id：`wb-tabs-rule-1` · must / confirmed

同一上下文内平级内容切换；不适用于站点路由导航、异步加载时直接自动激活

**适用条件**：同一上下文内平级内容切换

### 交互与调用合同

id：`wb-tabs-rule-2` · must / confirmed

`v-model` 必须对应 items 中可用的唯一 value；label 为可访问名称，disabled 项不可选择。tab 插槽接收 item、selected，panel 插槽接收 item；切换后只保留当前 panel 插槽内容，业务草稿由父级托管。溢出项经左右方向键/Home/End 激活后，焦点转移到“更多”菜单按钮；按钮说明包含当前项，tabpanel 直接以当前项命名。更多支持方向键续接、向下打开、Escape 回焦点；离开组件关闭菜单。宽度恢复时焦点从更多恢复到当前页签。

**适用条件**：同一上下文内平级内容切换

### 复用边界

id：`wb-tabs-rule-3` · must / confirmed

页签是带面板关联的自动激活模型，不等同于 Button 或站点导航。更多菜单为该模型内的入口，负责溢出选中项的焦点接续和宽度恢复；首版保留内部结构，复用 Foundation 文字、状态、阴影与圆角。

**适用条件**：同一上下文内平级内容切换

### Foundation 引用

`color-border-focus`、`color-border-separator`、`color-brand`、`color-fill-hover`、`color-surface-card-default`、`color-surface-overlay`、`color-surface-page`、`color-text-disabled`、`color-text-primary`、`color-text-secondary`、`font-body-l`、`font-body-m`、`radius-full`、`radius-sm`、`shadow-sm`、`spacing-component-lg`、`spacing-component-sm`、`spacing-component-xs`

### 样式与嵌套

basic用于卡片或面板内的平级内容；divider用于页面级导航；rail与segment用于有层级依据的嵌套页面。最多三级嵌套，层级顺序根据容器背景选择。

- basic默认且最常用。文本保持单行，调用方为长标签预留宽度。

- 空间不足时尾部自动折叠为更多，仍通过同一个modelValue切换面板。

### 数据与键盘

items的value必须唯一，label为可访问名称；disabled项不可选择。方向键、Home和End按自动激活模型切换，并跳过禁用项。

- panel插槽只呈现当前项内容；面板草稿由父级托管。

- closable仅适用于basic；组件发出remove请求，不会直接修改items。addable显示新增入口，调用方创建并更新项目。

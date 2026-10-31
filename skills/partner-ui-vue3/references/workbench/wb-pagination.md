<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 分页器 Pagination — `WorkbenchPagination`

资产：`wb-pagination` · 类型：`component` · 资产合同版本：`1.0.2`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-PAGINATION-V1/pagination?view=preview)

用于在有明确总量的数据集中切换页码和每页数量。分页控件发出请求意图，数据加载由调用方管理。

公开入口：`@workbench/ui-vue3` → `WorkbenchPagination`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-PAGINATION-V1/pagination?view=variants)

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
      "id": "first-page",
      "label": "第一页"
    },
    {
      "id": "last-page",
      "label": "最后一页"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "empty",
      "label": "空数据"
    }
  ],
  "controls": [
    {
      "id": "variant",
      "label": "表格分页样式",
      "type": "select",
      "default": "full",
      "options": [
        {
          "value": "default",
          "label": "默认样式"
        },
        {
          "value": "full",
          "label": "完整样式"
        },
        {
          "value": "simple",
          "label": "精简样式"
        }
      ]
    },
    {
      "id": "simpleMode",
      "label": "精简样式页码控件",
      "type": "select",
      "default": "click",
      "options": [
        {
          "value": "click",
          "label": "点击翻页"
        },
        {
          "value": "select",
          "label": "下拉选择页面"
        },
        {
          "value": "input",
          "label": "输入页码"
        }
      ]
    },
    {
      "id": "middlePageCount",
      "label": "省略号中间页数",
      "type": "select",
      "default": 3,
      "options": [
        {
          "value": 3,
          "label": "中间保留 3 页"
        },
        {
          "value": 5,
          "label": "中间保留 5 页"
        }
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "variant",
      "label": "表格分页样式",
      "type": "select",
      "default": "full",
      "options": [
        {
          "value": "default",
          "label": "默认样式"
        },
        {
          "value": "full",
          "label": "完整样式"
        },
        {
          "value": "simple",
          "label": "精简样式"
        }
      ]
    },
    {
      "id": "simpleMode",
      "label": "精简样式页码控件",
      "type": "select",
      "default": "click",
      "options": [
        {
          "value": "click",
          "label": "点击翻页"
        },
        {
          "value": "select",
          "label": "下拉选择页面"
        },
        {
          "value": "input",
          "label": "输入页码"
        }
      ],
      "when": {
        "variant": [
          "simple"
        ]
      }
    },
    {
      "id": "middlePageCount",
      "label": "省略号中间页数",
      "type": "select",
      "default": 3,
      "options": [
        {
          "value": 3,
          "label": "中间保留 3 页"
        },
        {
          "value": 5,
          "label": "中间保留 5 页"
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
          "value": "first-page",
          "label": "第一页"
        },
        {
          "value": "last-page",
          "label": "最后一页"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "empty",
          "label": "空数据"
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
    "variants": [
      {
        "id": "default",
        "label": "默认",
        "variant": "default"
      },
      {
        "id": "full",
        "label": "含每页数量",
        "variant": "full"
      },
      {
        "id": "simple",
        "label": "简洁",
        "variant": "simple"
      }
    ]
  },
  "dynamicBindings": [
    "pages",
    "sizes",
    "stateExamples"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "(item, index) in variants",
    "item in stateExamples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：已知总量列表的分页与每页数量切换

**不适用**：未知总量无限加载、服务端请求调度；未经验证的内部 UI 框架或生产交付

官方来源 SFC：supported。

### 示例：申请记录分页

id：`application-pages` · portability：`portable` · owner：`wb-pagination`

父级响应当前页与每页数量事件并展示请求反馈；总数由数据源提供。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchPagination } from '@workbench/ui-vue3'
const page = ref(1)
const pageSize = ref(10)
const request = ref('')
function onPageChange(value) { page.value = value; request.value = `请求第${value}页` }
function onPageSizeChange(value) { pageSize.value = value; page.value = 1; request.value = `每页${value}条` }
</script>
<template>
  <WorkbenchPagination v-model="page" variant="full" :total="128" v-model:page-size="pageSize" @change="onPageChange" @page-size-change="onPageSizeChange" />
  <output aria-live="polite">{{ request || `第${page}页，每页${pageSize}条` }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-PAGINATION-V1/pagination?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 分页 |  | 分页区域可访问名称。 |
| disabled | Boolean | false |  | 禁用分页交互。 |
| middlePageCount | Number | 3 |  | 连续中间页数量及省略号步进，正整数。 |
| modelValue | Number | 1 |  | 当前页码，从1开始。 |
| pageSize | Number | 10 |  | 每页记录数，正整数。 |
| pageSizeOptions | Array | {"kind":"function"} |  | 可选每页数量数组；无效或重复值会被过滤。 |
| simpleEditable | Boolean | false |  | 启用simple输入式页码编辑。 |
| simpleMode | String | click | click / select / input | simple模式页码选择方式：click、select或input。 |
| total * | Number |  |  | 总记录数，必填。 |
| variant | String | default | default / full / simple | default、full或simple。 |

### Events

- `update:modelValue`：新的Number页码。；用户切换页码后发出。

- `update:pageSize`：新的Number每页数量。；用户切换每页数量后发出。

- `change`：新的Number页码。；页码变化时发出，可用于触发数据请求。

- `page-size-change`：新的Number每页数量。；每页数量变化时发出，可用于重置分页数据请求。

### 规则

### 选型边界

id：`wb-pagination-rule-1` · must / confirmed

已知总量列表的分页与每页数量切换；不适用于未知总量无限加载、服务端请求调度

**适用条件**：已知总量列表的分页与每页数量切换

### 交互与调用合同

id：`wb-pagination-rule-2` · must / confirmed

`total` 是有限非负整数；`v-model` 页码从1开始，pageSize 是正整数（无效时显示按10），pageSizeOptions 过滤无效或重复值。`middlePageCount` 是正整数，默认3，决定连续中间页数和省略号单次跳转页数。`update:modelValue` 与 change 发出页码；`update:pageSize` 与 page-size-change 发出数量。调用方负责接收更新、请求数据及错误呈现。simpleMode 默认click，可选select和input；simpleEditable=true等价于simpleMode=input。disabled 默认false。每页菜单 ID 按实例生成，离开焦点或外点关闭，Escape 关闭并恢复焦点。首版不包含 loading 或异步请求竞态管理。

**适用条件**：已知总量列表的分页与每页数量切换

### 复用边界

id：`wb-pagination-rule-3` · must / confirmed

页码、24px箭头、32px每页数量菜单及连续的48+48px跳转组合是 Pagination 内部结构。Dropdown 默认36px菜单项及受控值事件不匹配此32px布局，Input 的完整表单校验结构也不适用于内部页码草稿，首版保留原生语义元素并共享 Foundation 状态 Token。

**适用条件**：已知总量列表的分页与每页数量切换

### 每页数量菜单选中样式

id：`wb-pagination-size-menu-selection` · must / confirmed

文字统一一级文本色；数量触发器使用Select同款固定下箭头及共享180度展开动效，精简页码选择保留Select原生箭头。选中项右侧使用登记完成14px图标，在14px方框垂直居中。菜单行横向内距8px、内部间距4px，行高保留32px。 面板与触发框等宽，仅选中项显示勾选插槽。

**适用条件**：完整分页器的每页数量选择

**包内引用**：["wb-dropdown-rule-2"]

### 组件依赖

`wb-dropdown`、`wb-select`

### Foundation 引用

`color-border`、`color-border-disabled`、`color-border-focus`、`color-border-hover`、`color-fill-hover`、`color-fill-selected`、`color-fill-subtle-default`、`color-surface-card-default`、`color-surface-overlay`、`color-surface-page`、`color-text-disabled`、`color-text-primary`、`color-text-secondary`、`font-body-m`、`radius-sm`、`shadow-sm`、`spacing-component-lg`、`spacing-component-md`、`spacing-component-sm`、`spacing-component-xs`、`color-icon-active`、`color-icon-disabled`

### 页码与数量

total为有限非负整数；v-model页码从1开始。pageSize为每页条数，pageSizeOptions仅保留正整数且去重。

- total为0时控件不可操作。

- 改变每页数量后回到第一页；越界页码会被约束在有效范围内。

### 样式与跳页

default显示页码和跳页；full在前面增加每页数量选择；simple只保留前后翻页与当前页控件。simpleMode选择点击、选择或输入。

- middlePageCount为正整数，默认3，同时决定连续页码数和省略号步进。

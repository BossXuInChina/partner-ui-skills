<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 分页器 Pagination — `WorkbenchPagination`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-pagination`](<../../workbench/wb-pagination.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-pagination",
  "kind": "component",
  "version": "1.0.2",
  "summary": "用于在有明确总量的数据集中切换页码和每页数量。分页控件发出请求意图，数据加载由调用方管理。",
  "useWhen": ["已知总量列表的分页与每页数量切换"],
  "avoidWhen": ["未知总量无限加载、服务端请求调度","未经验证的内部 UI 框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "supported",
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ]
}
```

未声明或为空：unsupported、usageUnsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchPagination"},
  "props": {
    "variant": {"type":"String","default":"default","enum":["default","full","simple"]},
    "total": {"type":"Number","required":true},
    "modelValue": {"type":"Number","default":1},
    "pageSize": {"type":"Number","default":10},
    "pageSizeOptions": {"type":"Array","default":{"kind":"function"}},
    "middlePageCount": {"type":"Number","default":3,"validator":{"kind":"unknown","expression":"(value) => Number.isInteger(value) && value > 0"}},
    "simpleMode": {"type":"String","default":"click","enum":["click","select","input"]},
    "simpleEditable": {"type":"Boolean","default":false},
    "disabled": {"type":"Boolean","default":false},
    "ariaLabel": {"type":"String","default":"分页"}
  },
  "events": ["update:modelValue","update:pageSize","change","page-size-change"],
  "propNotes": {
    "variant": "default、full或simple。",
    "total": "总记录数，必填。",
    "modelValue": "当前页码，从1开始。",
    "pageSize": "每页记录数，正整数。",
    "pageSizeOptions": "可选每页数量数组；无效或重复值会被过滤。",
    "middlePageCount": "连续中间页数量及省略号步进，正整数。",
    "simpleMode": "simple模式页码选择方式：click、select或input。",
    "simpleEditable": "启用simple输入式页码编辑。",
    "disabled": "禁用分页交互。",
    "ariaLabel": "分页区域可访问名称。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的Number页码。","timing":"用户切换页码后发出。"},
    "update:pageSize": {"payload":"新的Number每页数量。","timing":"用户切换每页数量后发出。"},
    "change": {"payload":"新的Number页码。","timing":"页码变化时发出，可用于触发数据请求。"},
    "page-size-change": {"payload":"新的Number每页数量。","timing":"每页数量变化时发出，可用于重置分页数据请求。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-pagination-rule-1","title":"选型边界","text":"已知总量列表的分页与每页数量切换；不适用于未知总量无限加载、服务端请求调度","strength":"must","status":"confirmed","when":["已知总量列表的分页与每页数量切换"],"references":[]},
    {
      "id": "wb-pagination-rule-2",
      "title": "交互与调用合同",
      "text": "`total` 是有限非负整数；`v-model` 页码从1开始，pageSize 是正整数（无效时显示按10），pageSizeOptions 过滤无效或重复值。`middlePageCount` 是正整数，默认3，决定连续中间页数和省略号单次跳转页数。`update:modelValue` 与 change 发出页码；`update:pageSize` 与 page-size-change 发出数量。调用方负责接收更新、请求数据及错误呈现。simpleMode 默认click，可选select和input；simpleEditable=true等价于simpleMode=input。disabled 默认false。每页菜单 ID 按实例生成，离开焦点或外点关闭，Escape 关闭并恢复焦点。首版不包含 loading 或异步请求竞态管理。",
      "strength": "must",
      "status": "confirmed",
      "when": ["已知总量列表的分页与每页数量切换"],
      "references": []
    },
    {
      "id": "wb-pagination-rule-3",
      "title": "复用边界",
      "text": "页码、24px箭头、32px每页数量菜单及连续的48+48px跳转组合是 Pagination 内部结构。Dropdown 默认36px菜单项及受控值事件不匹配此32px布局，Input 的完整表单校验结构也不适用于内部页码草稿，首版保留原生语义元素并共享 Foundation 状态 Token。",
      "strength": "must",
      "status": "confirmed",
      "when": ["已知总量列表的分页与每页数量切换"],
      "references": []
    },
    {
      "id": "wb-pagination-size-menu-selection",
      "title": "每页数量菜单选中样式",
      "text": "文字统一一级文本色；数量触发器使用Select同款固定下箭头及共享180度展开动效，精简页码选择保留Select原生箭头。选中项右侧使用登记完成14px图标，在14px方框垂直居中。菜单行横向内距8px、内部间距4px，行高保留32px。 面板与触发框等宽，仅选中项显示勾选插槽。",
      "strength": "must",
      "status": "confirmed",
      "when": ["完整分页器的每页数量选择"],
      "references": ["wb-dropdown-rule-2"]
    }
  ],
  "dependencies": ["wb-dropdown","wb-select"],
  "foundationKeys": ["color-border","color-border-disabled","color-border-focus","color-border-hover","color-fill-hover","color-fill-selected","color-fill-subtle-default","color-surface-card-default","color-surface-overlay","color-surface-page","color-text-disabled","color-text-primary","color-text-secondary","font-body-m","radius-sm","shadow-sm","spacing-component-lg","spacing-component-md","spacing-component-sm","spacing-component-xs","color-icon-active","color-icon-disabled"],
  "intro": "用于在有明确总量的数据集中切换页码和每页数量。分页控件发出请求意图，数据加载由调用方管理。",
  "sections": [
    {"id":"model","title":"页码与数量","paragraphs":["total为有限非负整数；v-model页码从1开始。pageSize为每页条数，pageSizeOptions仅保留正整数且去重。"],"bullets":["total为0时控件不可操作。","改变每页数量后回到第一页；越界页码会被约束在有效范围内。"]},
    {"id":"variants","title":"样式与跳页","paragraphs":["default显示页码和跳页；full在前面增加每页数量选择；simple只保留前后翻页与当前页控件。simpleMode选择点击、选择或输入。"],"bullets":["middlePageCount为正整数，默认3，同时决定连续页码数和省略号步进。"]}
  ]
}
```

未声明或为空：related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "application-pages",
  "title": "申请记录分页",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-pagination",
    "scenarioId": "pagination",
    "exampleId": "application-pages",
    "codeSha256": "sha256:0efbf312169ed90227eb82be2d0091b6436ec47b622b486bf9f03dcbca232cee"
  },
  "description": "父级响应当前页与每页数量事件并展示请求反馈；总数由数据源提供。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

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

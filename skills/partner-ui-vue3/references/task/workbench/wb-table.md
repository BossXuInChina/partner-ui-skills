<!-- Generated from @workbench/ui-vue3@0.5.1-dev.20261121.1 (651d5bb52c6f91471c6e2269977f854ea3ef706f) — do not edit. -->

# 协议列表 · `WorkbenchTable`

用于协议管理、续签列表和最终客户筛选。以下为任务所需接口，其他用法见[完整 API](<../../workbench/wb-table.md>)与[速查](<../../quick/workbench/wb-table.md>)。样式在宿主应用入口导入一次，参见[接入说明](<../../integration.md>)。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTable"},
  "publicStyles": "@workbench/ui-vue3/styles.css",
  "props": {
    "caption": {"type":"String","default":""},
    "ariaLabel": {"type":"String","default":""},
    "columns": {"type":"Array","required":true},
    "rowKey": {"type":["String","Function"],"required":true},
    "rows": {"type":"Array","default":{"kind":"function"}},
    "page": {"type":"Number","default":1},
    "pageSize": {"type":"Number","default":10},
    "pageSizeOptions": {"type":"Array","default":{"kind":"function"}},
    "total": {"type":"Number","default":null},
    "loading": {"type":"Boolean","default":false},
    "errorMessage": {"type":"String","default":""},
    "emptyKind": {"type":"String","default":"initial","enum":["initial","filtered"]}
  },
  "columns": {
    "type": "Array<Column>",
    "requiredFields": ["key","title"],
    "fields": {
      "key": "nonempty string; identifies sort and cell-${key}",
      "title": "nonempty string",
      "field": "string key or (row) => value; defaults to column.key",
      "align": "start | center | end; left/right aliases are supported",
      "primary": "boolean",
      "fluid": "boolean; explicit true takes priority over unspecified widths and absorbs remaining space",
      "fixed": "left | right | undefined",
      "width": "nonnegative number(px) or CSS px/rem/em/%/ch length",
      "minWidth": "same as width; individual minimum, never copied to other columns",
      "maxWidth": "same lengths as width; caps allocation and resizing; minimum wins inverted range"
    }
  },
  "events": {"update:page":"number","update:pageSize":"number","page-change":"number","page-size-change":"number","retry":"无参数。"},
  "slots": {"empty":{"scope":"kind。","description":"替换空状态内容；kind区分初始无数据和筛选无结果。"},"error":{"scope":"message。","description":"替换错误展示内容；重试逻辑由调用方处理。"}},
  "dynamicSlots": [
    {"name":"header-${column.key}","props":{"column":"Column; only replaces title content, never header controls or semantics"}},
    {"name":"cell-${column.key}","props":{"row":"row record","value":"string cellValue","column":"Column","rowIndex":"zero-based index"}}
  ]
}
```

- 原生表格的标题说明；应与ariaLabel至少提供其一以确保名称可访问。

- 每行稳定唯一键的字段名或取键函数。

- 先按已应用条件筛选，再分页。`rows` 传当前页数据，默认 `[]`。`total` 传筛选后总数，非负时显示分页。默认每页选项为 `[10, 20, 50, 100]`。

- 响应 `update:page` 和 `update:pageSize` 并回传受控值。重置筛选、应用筛选或换每页条数时回到第 1 页。已有选中行由宿主按业务规则清理。

- 在空rows时区分初始暂无数据和筛选无结果。加载状态；首次加载显示骨架，已有行刷新时保留行。非空时显示错误状态并提供retry意图。

最小用法片段，沿用宿主的数据及状态。

```vue
<script setup>
import { WorkbenchTable } from '@workbench/ui-vue3';
const columns = [{ key: 'id', title: '协议编号' }, { key: 'name', title: '协议名称' }];
// 沿用列表状态 page/pageSize、pageRows、filtered 与 hasAppliedFilters。
</script>
<template>
  <WorkbenchTable caption="协议列表" :columns="columns" :rows="pageRows" row-key="id"
    v-model:page="page" :page-size="pageSize" :total="filtered.length"
    :empty-kind="hasAppliedFilters ? 'filtered' : 'initial'"
    @update:page-size="size => { pageSize = size; page = 1; }" />
</template>
```

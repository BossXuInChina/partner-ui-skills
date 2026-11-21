<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 协议列表 · `WorkbenchDraftListFilter`

用于协议管理、续签列表和最终客户筛选。以下为任务所需接口，其他用法见[完整 API](<../../workbench/wb-draft-list-filter.md>)与[速查](<../../quick/workbench/wb-draft-list-filter.md>)。样式在宿主应用入口导入一次，参见[接入说明](<../../integration.md>)。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDraftListFilter"},
  "publicStyles": "@workbench/ui-vue3/styles.css",
  "props": {
    "fieldCount": {"type":"Number","default":1,"validator":{"kind":"unknown","expression":"(value) => Number.isInteger(value) && value >= 1 && value <= 4"}},
    "applyLabel": {"type":"String","default":"查询"},
    "resetLabel": {"type":"String","default":"重置"}
  },
  "events": ["apply","reset"],
  "slots": ["default","actions"]
}
```

- 筛选控件的编辑值与已应用条件分开保存；只有触发查询后才更新结果条件。

- Pattern 发出重置意图；宿主负责清空草稿与已应用条件，并同步结果集和分页。

- 直接使用组件时，`fieldCount` 与 `default` 插槽内的字段数一致（整数 1–4），默认操作区提供查询和重置按钮。使用随包列表模板时，将第三字段放入 `ListFilter` 的 `#extra`，沿用模板的响应式布局。新增字段时同步更新草稿、已应用条件、匹配逻辑和重置。

最小用法片段，沿用宿主的数据及状态。

```vue
<script setup>
import { WorkbenchDraftListFilter, WorkbenchInput } from '@workbench/ui-vue3';
// 沿用 draft、applied、page 以及生成的列表状态。
const apply = () => { Object.assign(applied, draft); page.value = 1; };
const reset = () => { draft.keyword = ''; apply(); };
</script>
<template>
  <WorkbenchDraftListFilter :field-count="1" @apply="apply" @reset="reset">
    <WorkbenchInput v-model="draft.keyword" aria-label="关键词" />
  </WorkbenchDraftListFilter>
</template>
```

<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 表格 Table — `WorkbenchTable`

资产：`wb-table` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TABLE-V1/table?view=preview)

用于伙伴业务管理数据的结构化查看与操作。WorkbenchTable展示调用方提供的行并发出受控意图；WorkbenchDataToolbar负责可复用的表格、列表和卡片操作区。

公开入口：`@workbench/ui-vue3` → `WorkbenchTable`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TABLE-V1/table?view=variants)

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
      "id": "selected",
      "label": "批量选择"
    },
    {
      "id": "loading-initial",
      "label": "初次加载"
    },
    {
      "id": "loading-refresh",
      "label": "刷新加载"
    },
    {
      "id": "empty",
      "label": "暂无数据"
    },
    {
      "id": "filtered-empty",
      "label": "筛选无结果"
    },
    {
      "id": "error",
      "label": "加载错误"
    }
  ],
  "controls": [
    {
      "id": "table-example",
      "type": "select",
      "label": "表格场景",
      "default": "fixed",
      "options": [
        {
          "label": "内容：链接、标签与数字",
          "value": "content"
        },
        {
          "label": "内容：录入控件组合",
          "value": "inputs"
        },
        {
          "label": "内容：图标操作列",
          "value": "icon-actions"
        },
        {
          "label": "标准表格",
          "value": "standard"
        },
        {
          "label": "固定列表格",
          "value": "fixed"
        },
        {
          "label": "展开：只读详情",
          "value": "readonly"
        },
        {
          "label": "展开：业务操作",
          "value": "business"
        },
        {
          "label": "展开：编辑表单",
          "value": "edit"
        },
        {
          "label": "固定列＋展开详情",
          "value": "fixed-expanded"
        }
      ]
    },
    {
      "id": "detail-layout",
      "type": "select",
      "label": "详情字段编排",
      "default": "adaptive",
      "description": "默认按内容宽度1/2/3/4列；六列和跨列为调用方显式12单位示例，需按实际内容验证可读性。",
      "options": [
        {
          "label": "默认自适应（最多四列）",
          "value": "adaptive"
        },
        {
          "label": "显式六列",
          "value": "six"
        },
        {
          "label": "显式跨列",
          "value": "spans"
        }
      ]
    },
    {
      "id": "fixed-mode",
      "type": "select",
      "label": "固定列位置",
      "default": "both",
      "options": [
        {
          "label": "不固定",
          "value": "none"
        },
        {
          "label": "左侧",
          "value": "left"
        },
        {
          "label": "右侧",
          "value": "right"
        },
        {
          "label": "左右两侧",
          "value": "both"
        }
      ]
    },
    {
      "id": "simulate-save-error",
      "type": "boolean",
      "label": "演示保存失败",
      "default": false
    },
    {
      "id": "selectable",
      "type": "boolean",
      "label": "启用勾选",
      "description": "显示当前页选择列与批量操作状态。",
      "default": true
    },
    {
      "id": "striped",
      "type": "boolean",
      "label": "斑马纹",
      "description": "使用表格交替行语义色辅助横向阅读。",
      "default": false
    },
    {
      "id": "show-pagination",
      "type": "boolean",
      "label": "显示分页",
      "description": "组合已批准的完整Pagination。",
      "default": true
    },
    {
      "id": "toolbar-variant",
      "type": "select",
      "label": "操作区结构",
      "description": "切换标题、精简或复杂操作区。",
      "default": "complex",
      "options": [
        {
          "label": "标题",
          "value": "title"
        },
        {
          "label": "精简",
          "value": "compact"
        },
        {
          "label": "复杂",
          "value": "complex"
        }
      ]
    },
    {
      "id": "show-advanced-filter",
      "type": "boolean",
      "label": "显示高级筛选",
      "description": "关闭后，compact 可组合左侧操作和右侧摘要，不渲染高级筛选入口或面板。",
      "default": true
    },
    {
      "id": "resizable",
      "type": "boolean",
      "label": "启用列宽调整",
      "description": "拖动表头分隔线或使用键盘/按钮设置；序号保持固定；重置恢复原列定义。",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "tableState",
      "label": "数据状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "selected",
          "label": "批量选择"
        },
        {
          "value": "loading-initial",
          "label": "初次加载"
        },
        {
          "value": "loading-refresh",
          "label": "刷新加载"
        },
        {
          "value": "empty",
          "label": "暂无数据"
        },
        {
          "value": "filtered-empty",
          "label": "筛选无结果"
        },
        {
          "value": "error",
          "label": "加载错误"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "table-example",
      "type": "select",
      "label": "表格场景",
      "default": "fixed",
      "options": [
        {
          "label": "内容：链接、标签与数字",
          "value": "content"
        },
        {
          "label": "内容：录入控件组合",
          "value": "inputs"
        },
        {
          "label": "内容：图标操作列",
          "value": "icon-actions"
        },
        {
          "label": "标准表格",
          "value": "standard"
        },
        {
          "label": "固定列表格",
          "value": "fixed"
        },
        {
          "label": "展开：只读详情",
          "value": "readonly"
        },
        {
          "label": "展开：业务操作",
          "value": "business"
        },
        {
          "label": "展开：编辑表单",
          "value": "edit"
        },
        {
          "label": "固定列＋展开详情",
          "value": "fixed-expanded"
        }
      ],
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ]
      }
    },
    {
      "id": "detail-layout",
      "type": "select",
      "label": "详情字段编排",
      "default": "adaptive",
      "description": "默认按内容宽度1/2/3/4列；六列和跨列为调用方显式12单位示例，需按实际内容验证可读性。",
      "options": [
        {
          "label": "默认自适应（最多四列）",
          "value": "adaptive"
        },
        {
          "label": "显式六列",
          "value": "six"
        },
        {
          "label": "显式跨列",
          "value": "spans"
        }
      ],
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "readonly",
          "business",
          "edit",
          "fixed-expanded"
        ]
      }
    },
    {
      "id": "fixed-mode",
      "type": "select",
      "label": "固定列位置",
      "default": "both",
      "options": [
        {
          "label": "不固定",
          "value": "none"
        },
        {
          "label": "左侧",
          "value": "left"
        },
        {
          "label": "右侧",
          "value": "right"
        },
        {
          "label": "左右两侧",
          "value": "both"
        }
      ],
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "fixed",
          "fixed-expanded"
        ]
      }
    },
    {
      "id": "simulate-save-error",
      "type": "boolean",
      "label": "演示保存失败",
      "default": false,
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "edit"
        ]
      }
    },
    {
      "id": "selectable",
      "type": "boolean",
      "label": "启用勾选",
      "description": "显示当前页选择列与批量操作状态。",
      "default": true,
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ]
      }
    },
    {
      "id": "striped",
      "type": "boolean",
      "label": "斑马纹",
      "description": "使用表格交替行语义色辅助横向阅读。",
      "default": false,
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ]
      }
    },
    {
      "id": "show-pagination",
      "type": "boolean",
      "label": "显示分页",
      "description": "组合已批准的完整Pagination。",
      "default": true,
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "standard",
          "fixed",
          "readonly",
          "business",
          "edit",
          "fixed-expanded"
        ]
      }
    },
    {
      "id": "toolbar-variant",
      "type": "select",
      "label": "操作区结构",
      "description": "切换标题、精简或复杂操作区。",
      "default": "complex",
      "options": [
        {
          "label": "标题",
          "value": "title"
        },
        {
          "label": "精简",
          "value": "compact"
        },
        {
          "label": "复杂",
          "value": "complex"
        }
      ],
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "standard",
          "fixed",
          "readonly",
          "business",
          "edit",
          "fixed-expanded"
        ]
      }
    },
    {
      "id": "show-advanced-filter",
      "type": "boolean",
      "label": "显示高级筛选",
      "description": "关闭后，compact 可组合左侧操作和右侧摘要，不渲染高级筛选入口或面板。",
      "default": true,
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "standard",
          "fixed",
          "readonly",
          "business",
          "edit",
          "fixed-expanded"
        ],
        "toolbar-variant": [
          "compact",
          "complex"
        ]
      }
    },
    {
      "id": "resizable",
      "type": "boolean",
      "label": "启用列宽调整",
      "description": "拖动表头分隔线或使用键盘/按钮设置；序号保持固定；重置恢复原列定义。",
      "default": false,
      "group": "内容与结构",
      "when": {
        "tableState": [
          "default",
          "selected"
        ],
        "table-example": [
          "standard",
          "fixed",
          "readonly",
          "business",
          "edit",
          "fixed-expanded"
        ]
      }
    },
    {
      "id": "previewWidth",
      "label": "预览容器宽度",
      "type": "range",
      "default": 800,
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
    "descriptions": {
      "content": "保留链接、标签、数字和长内容的实际单元格。",
      "inputs": "保留输入控件组合与行内交互。",
      "icon-actions": "保留图标操作列和反馈。",
      "standard": "基础表格结构、选择和分页。",
      "fixed": "左右固定列随容器横向滚动。",
      "readonly": "展开详情采用只读字段排布。",
      "business": "展开区保留独立业务操作。",
      "edit": "展开编辑保留校验、保存失败和离开保护。",
      "fixed-expanded": "同时检查固定列和展开详情。"
    }
  },
  "dynamicBindings": [
    "examples"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "item in examples",
    "item in manifest.states"
  ]
}
```

## 使用场景

[在 Studio 中查看](http://localhost:4173/preview/WB-TABLE-V1/table?view=examples)

**适用**：展示、选择、排序、筛选或展开伙伴业务管理数据

**不适用**：移动端卡片转换、虚拟滚动、树形表格或需要内置编辑引擎的表格；未经验证的生产目标

官方来源 SFC：supported。

### 示例：受控列表、筛选、排序、分页与展开编辑

id：`controlled-table-and-edit` · portability：`portable` · owner：`wb-table`

完整Vue单文件组件示例。数据过滤、排序、分页切片和编辑保存都由调用方持有；WorkbenchTable只呈现当前页并发出交互意图。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { computed, ref } from "vue"
import { WorkbenchDataToolbar, WorkbenchTable } from "@workbench/ui-vue3"

const sourceRows = ref([
  { id: "P-101", name: "华北伙伴", status: "合作中", amount: 12000 },
  { id: "P-102", name: "华南伙伴", status: "待审核", amount: 8500 },
  { id: "P-103", name: "西部伙伴", status: "合作中", amount: 4200 },
  { id: "P-104", name: "东部伙伴", status: "待审核", amount: 16800 },
])
const columns = [
  { key: "id", title: "伙伴编号", field: "id", width: 140, fixed: "left" },
  { key: "name", title: "伙伴名称", field: "name", primary: true, fluid: true, sortable: true, ellipsis: true },
  { key: "status", title: "状态", field: "status", width: 150, filterable: true, filterOptions: [
    { value: "合作中", label: "合作中" },
    { value: "待审核", label: "待审核" },
  ] },
  { key: "amount", title: "年度金额", field: "amount", width: 140, align: "end", sortable: true },
]
const selectedRowKeys = ref([])
const sort = ref(null)
const page = ref(1)
const pageSize = ref(5)
const expandedRowKeys = ref([])
const columnFilters = ref({})
const columnWidths = ref({})
const editingRowId = ref(null)
const draftName = ref("")
const feedback = ref("准备就绪")
const filteredRows = computed(() => {
  const values = columnFilters.value.status || []
  return sourceRows.value.filter(row => !values.length || values.includes(row.status))
})
const sortedRows = computed(() => {
  const result = [...filteredRows.value]
  if (!sort.value) return result
  const { key, direction } = sort.value
  const factor = direction === "asc" ? 1 : -1
  return result.sort((a, b) => (a[key] > b[key] ? factor : a[key] < b[key] ? -factor : 0))
})
const visibleRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sortedRows.value.slice(start, start + pageSize.value)
})
function updateSort(value) { sort.value = value; page.value = 1 }
function updateFilters(value) {
  columnFilters.value = value
  page.value = 1
  selectedRowKeys.value = []
  const visibleIds = new Set(filteredRows.value.map(row => row.id))
  expandedRowKeys.value = expandedRowKeys.value.filter(id => visibleIds.has(id))
}
function updatePage(value) { page.value = value; expandedRowKeys.value = [] }
function updatePageSize(value) { pageSize.value = value; page.value = 1; expandedRowKeys.value = [] }
function announceSelection(payload) { feedback.value = "已选择 " + payload.selectedRowKeys.length + " 条" }
function beginEdit(row) { editingRowId.value = row.id; draftName.value = row.name }
function saveEdit(row) {
  const name = draftName.value.trim()
  if (!name) { feedback.value = "伙伴名称不能为空"; return }
  const target = sourceRows.value.find(item => item.id === row.id)
  if (target) target.name = name
  editingRowId.value = null
  feedback.value = "已保存本地示例数据"
}
function cancelEdit() { editingRowId.value = null; feedback.value = "已取消编辑" }
</script>
<template>
  <WorkbenchDataToolbar variant="title" title="合作伙伴" />
  <WorkbenchTable
    caption="合作伙伴数据"
    aria-label="合作伙伴数据表格"
    :columns="columns"
    :rows="visibleRows"
    row-key="id"
    :total="sortedRows.length"
    :page="page"
    :page-size="pageSize"
    :page-size-options="[5, 10]"
    :sort="sort"
    :selected-row-keys="selectedRowKeys"
    :column-filters="columnFilters"
    :column-widths="columnWidths"
    :expanded-row-keys="expandedRowKeys"
    selectable
    expandable
    resizable
    @update:sort="updateSort"
    @update:column-filters="updateFilters"
    @update:page="updatePage"
    @update:page-size="updatePageSize"
    @update:selected-row-keys="selectedRowKeys = $event"
    @update:column-widths="columnWidths = $event"
    @update:expanded-row-keys="expandedRowKeys = $event"
    @selection-change="announceSelection"
  >
    <template #cell-amount="{ value }">{{ Number(value).toLocaleString("zh-CN") }}</template>
    <template #expanded-content="{ row }">
      <form @submit.prevent="saveEdit(row)">
        <template v-if="editingRowId === row.id">
          <label>伙伴名称 <input v-model="draftName" /></label>
          <button type="submit">保存</button>
          <button type="button" @click="cancelEdit">取消</button>
        </template>
        <template v-else>
          <dl><dt>伙伴名称</dt><dd>{{ row.name }}</dd><dt>年度金额</dt><dd>{{ row.amount }}</dd></dl>
          <button type="button" @click="beginEdit(row)">编辑详情</button>
        </template>
      </form>
    </template>
  </WorkbenchTable>
  <p role="status">{{ feedback }}</p>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TABLE-V1/table?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actionsFixed | Boolean | false |  | 将操作列固定在右侧。 |
| ariaLabel | String |  |  | 表格的可访问名称。 |
| caption | String |  |  | 原生表格的标题说明；应与ariaLabel至少提供其一以确保名称可访问。 |
| columnFilters | Object | {"kind":"function"} |  | 受控的列筛选值映射；不直接对rows执行筛选。 |
| columnWidths | Object | {"kind":"undefined"} |  | 可选受控宽度映射；省略时组件在实例内维护调整值。 |
| columns * | Array |  |  | 列定义数组，使用稳定key；可按需配置field、sortable、filterable、fixed、primary、fluid、width、minWidth、maxWidth、ellipsis及filterOptions。 |
| emptyKind | String | initial | initial / filtered | 在空rows时区分初始暂无数据和筛选无结果。 |
| errorMessage | String |  |  | 非空时显示错误状态并提供retry意图。 |
| expandable | Boolean | false |  | 开启行详情展开。 |
| expandedRowKeys | Array | {"kind":"function"} |  | 受控展开行键数组。 |
| isRowExpandable | Function | {"kind":"function"} |  | 按行决定是否允许展开。 |
| isRowSelectable | Function | {"kind":"function"} |  | 按行决定是否允许选择。 |
| loading | Boolean | false |  | 加载状态；首次加载显示骨架，已有行刷新时保留行。 |
| page | Number | 1 |  | 受控当前页；组件通过更新事件请求切页。 |
| pageSize | Number | 10 |  | 当前页大小；配合total和调用方计算的rows使用。 |
| pageSizeOptions | Array | {"kind":"function"} |  | 分页器可选每页数量。 |
| resizable | Boolean | false |  | 开启列宽调整控件。 |
| rowActions | Array \| Function | {"kind":"function"} |  | 操作数组或按行生成操作的函数；动作通过row-action事件交给调用方。 |
| rowKey * | String \| Function |  |  | 每行稳定唯一键的字段名或取键函数。 |
| rows | Array | {"kind":"function"} |  | 调用方传入的当前展示数据；组件保持行顺序，不代为搜索、排序、筛选或分页切片。 |
| selectable | Boolean | false |  | 开启行选择。 |
| selectedRowKeys | Array | {"kind":"function"} |  | 当前页受控选择键数组。 |
| selectionFixed | Boolean | false |  | 将选择列固定在左侧。 |
| sort | Object | null |  | 受控排序状态；组件只请求排序变更，不重排rows。 |
| striped | Boolean | false |  | 开启斑马纹。 |
| title | String |  |  | 表格标题；也可由外部WorkbenchDataToolbar提供标题操作区。 |
| total | Number | null |  | 总条数；提供有效非负数量时呈现分页。 |

### Events

- `update:selectedRowKeys`：新的当前页选择键数组。；用户选择或取消选择行、全选或清空选择后发出。

- `selection-change`：对象包含selectedRowKeys、selectedRows及source。；选择结果变化时与更新事件一同发出；source区分行、当前页全选或清空。

- `update:sort`：包含key和direction（asc或desc）的排序对象，或null表示默认顺序。；用户激活sortable列表头时发出。

- `sort-change`：与update:sort相同的排序意图。；排序方向切换后发出；实际重排由调用方完成。

- `column-filter`：对象包含列key、column和source。；用户激活filterable列的筛选入口时发出；调用方可接管筛选面板。

- `update:columnFilters`：按列key索引筛选值数组的对象。；用户在标准筛选面板选择或重置选项后发出。

- `column-filter-change`：对象包含key、column、values、完整columnFilters及source；source为option、reset-column或reset-all。；标准筛选面板的选择或重置操作后发出；不变换rows。

- `update:page`：目标页码。；用户在分页器切换页码后发出。

- `page-change`：目标页码。；切页意图发出时与update:page一同触发。

- `update:pageSize`：目标每页数量。；用户选择新的每页数量后发出。

- `page-size-change`：目标每页数量。；每页数量变更意图发出时与update:pageSize一同触发。

- `update:expandedRowKeys`：包含本次展开或收起结果的目标键数组。；用户切换一行详情时发出。

- `expand-change`：对象包含row、rowKey和expanded。；展开或收起意图发出时触发；调用方可通过受控值接受或拒绝。

- `row-action`：对象包含row、rowKey、action和source。；用户激活直接显示或更多菜单中的行操作后触发。

- `retry`：无参数。；用户激活错误状态中的重试按钮后触发。

- `update:columnWidths`：以列key映射宽度数值的对象。；列宽调整提交或重置后发出。

- `column-width-change`：对象包含key、width、columnWidths及source；重置全部时key和width为null。；指针、键盘、按钮调整或重置提交后触发；取消临时调整不会提交。

### Slots

- `toolbar-leading`：无作用域参数。；放置Table工具栏左侧的调用方内容。

- `toolbar-actions`：无作用域参数。；放置Table工具栏右侧操作。

- `error`：message。；替换错误展示内容；重试逻辑由调用方处理。

- `empty`：kind。；替换空状态内容；kind区分初始无数据和筛选无结果。

- `row-actions`：row、actions、emitAction。；自定义行操作；通过emitAction交回Table发出row-action。

- `expanded-content`：row、rowKey、rowIndex。；提供展开详情内容；数据和编辑状态由调用方管理。

- `expanded-actions`：row、rowKey、rowIndex。；提供详情区域的附加操作。

- `batch-actions`：selectedRowKeys、selectedRows。；在当前页批量选择摘要旁放置调用方批量操作。

### 动态 Slots

- 包内前缀模式：`header-<key>`；原表达式：`` `header-${column.key}` ``

- 包内前缀模式：`cell-<key>`；原表达式：`` `cell-${column.key}` ``

### 实例成员

- `resetColumnWidths(key?: string): void;`

### 同族导出：`WorkbenchDataToolbar`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| advancedFilterExpanded | Boolean | false |  |  |
| filterResultText | String |  |  |  |
| filterTags | Array | {"kind":"function"} |  |  |
| fullscreen | Boolean | false |  |  |
| refreshing | Boolean | false |  |  |
| showAdvancedFilter | Boolean | true |  |  |
| title | String |  |  |  |
| variant | String | compact | title / compact / complex |  |
| viewMode | String | table | table / list / card |  |

### Events

- `update:viewMode`

- `view-change`

- `update:advancedFilterExpanded`

- `filter-confirm`

- `filter-cancel`

- `filter-remove`

- `filter-reset`

- `refresh`

- `settings`

- `fullscreen-change`

### Slots

- `secondary-actions`

- `primary-action`

- `additional-actions`

- `search`

- `advanced-filter-form`

### 规则

### 业务状态由调用方控制

id：`wb-table-controlled-state` · must / confirmed

选择、排序、筛选、分页与展开只发出目标状态和意图，Table不请求或持久化业务数据。

**适用条件**：使用Table

### 行操作保持语义边界

id：`wb-table-action-semantics` · must / confirmed

首个状态操作使用蓝色Text Action链，后续状态操作使用主文字色；导航操作始终使用WorkbenchLink及Link状态链。

**适用条件**：提供行操作

### 筛选计数复用Badge

id：`wb-table-toolbar-badge` · must / confirmed

DataToolbar筛选计数复用17px数字Badge，并提供筛选条件语境的可访问名称。

**适用条件**：显示生效筛选数量

### 固定列滚动适配属于Table

id：`wb-table-overflow-adapter` · must / confirmed

TableScrollArea复用Scrollbar视口并计算固定列之间的轨道几何；动态尺寸仅用于运行时测量结果。

**适用条件**：横向溢出或固定列

### 组件依赖

`wb-badge`、`wb-button`、`wb-button-radio-group`、`wb-checkbox`、`wb-radio`、`wb-dropdown`、`wb-link`、`wb-pagination`、`wb-scrollbar`、`wb-skeleton`、`wb-tag`、`wb-tooltip`、`wb-popover`

### Foundation 引用

`color-border-focus`、`color-border-separator`、`color-border-separator-subtle`、`color-fill-hover`、`color-fill-selected`、`color-icon-active`、`color-icon-disabled`、`color-icon-hover`、`color-icon-primary`、`color-icon-secondary`、`color-scrollbar-thumb-fill-hover`、`color-surface-card-tinted`、`color-surface-container`、`color-table-header-fill-default`、`color-table-header-sticky-fill-default`、`color-table-row-fill-alternating`、`color-text-primary`、`color-text-secondary`、`color-text-action`、`color-text-action-hover`、`color-text-action-active`、`font-body-m`、`font-headline-s`、`radius-full`、`radius-sm`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-component-xl`、`spacing-layout-container-block`、`spacing-layout-container-inline`、`spacing-layout-content-gap`、`color-brand`

### 选型

当用户需要对多列业务数据进行比较、排序、选择、分页或展开查看时使用Table。需要卡片化阅读或移动端卡片转换时，Table本身不负责转换；由调用方选择对应展示方案。

- Table使用原生table、thead、tbody和列标题语义；不要用普通Grid模拟表格结构。

- WorkbenchDataToolbar是可独立复用于Table、列表和卡片视图的正式子能力。标题、精简和复杂三种结构分别承载标题操作、搜索筛选及视图/工具操作。

- 公开导出包括WorkbenchTable和WorkbenchDataToolbar；TableScrollArea是Table内部适配能力，不是独立Catalog block。

### 设计结构与排版

表头和数据行统一40px高，单元格水平留白8px；多选列48px，操作列160px。表格本体不创建卡片圆角，需要卡片表面时由外层WorkbenchCard负责。

- 列使用稳定key和title，可用field指定取值；fixed用于显式固定左右列，primary标记主信息列，fluid指定吸收剩余空间。width、minWidth、maxWidth按列独立配置；普通数据默认单行截断并在真实溢出时显示全文Tooltip，ellipsis保留兼容。

- 列按左固定、普通、右固定稳定分组；选择列、操作列和业务列按其规则分配宽度。窄容器保留横向滚动；固定区只在隐藏内容时显示连续阴影。

- 列标题的排序、筛选与调宽操作使用14px图标，并保留24px交互热区；图标及来源沿用已登记资产，不改绘制属性。

- WorkbenchDataToolbar的title、compact、complex分别组织标题操作、主要操作/搜索/高级筛选，以及视图切换和工具按钮。高级筛选由调用方插槽提供字段；应用条件、标签及徽标由调用方维护。

- 表格底栏与表格保持12px间隔，默认32px高；底栏选择摘要与分页器各自保留对齐关系。筛选字段和已生效条件在工具栏中独占完整行。

- 表头、单元格分隔、固定列、行操作、展开详情、滚动条和列宽的完整数值规则仍以Catalog批准规范为准；此处不重新定义几何参数。

### 交互与键盘

Table只展示rows并发出用户操作意图。排序、筛选、分页、业务选择、展开状态及列宽持久化由调用方响应事件并回传受控值。

- sortable列按升序、降序、默认三态切换；filterable列通过标准面板或调用方的面板接入筛选。标准筛选更新columnFilters，不直接改变rows。

- selectedRowKeys表示当前页选择；全选跳过不可选行。受控页码或每页数量实际改变时，Table会发出清空选择的受控更新。

- total有效时显示分页。Table不请求数据、不排序数据、不保存跨页选择；调用方根据sort、筛选和分页状态计算并传入当前rows。

- 初次加载在表头下显示五行骨架；刷新加载时保留已有行并暴露忙碌状态。错误状态保留工具栏并通过retry请求调用方重试。

- 空数据通过emptyKind区分初始暂无数据和筛选无结果；可用empty和error插槽替换状态内容，业务状态仍由调用方管理。

- 可展开详情通过expandedRowKeys受控；expand-change给出row、rowKey和展开状态。详情不计入条数、选择和斑马纹；展开项处理遵循调用方及已批准规则。

- 行操作最多两个文字操作直接显示，其余进入更多菜单；复杂操作可用row-actions插槽。图标操作示例规则为四个以内直出，更多时显示前三个和更多入口。

- 开启resizable后可以通过拖动或键盘调整列宽；方向键以10px移动，Shift加方向键以1px移动，Home到下限，End到有限上限。Escape或取消操作不提交临时宽度。

- 排序、筛选、列宽和展开控件支持键盘；筛选Escape关闭并恢复触发按钮焦点。详细事件参数由共享API表展示。

### 使用边界与职责

调用方持有rows、排序、筛选、分页、选择及展开等业务状态。Table不负责网络请求、数据变换、跨页选择或持久化。

- 列筛选可以使用filterOptions和columnFilters的标准受控面板；没有选项时，Table发出column-filter意图，由调用方呈现筛选UI。

- 高级筛选应用后如何重置页码、选择或展开项属于业务策略；Studio组合示例的处理不扩展为Table内建数据逻辑。

- 单元格插槽中使用Input、Select、DatePicker、TimePicker时，其值与校验仍归调用方；Table不提供内置单元格编辑引擎。

- 不包含多列排序、跨页选择、列显隐、虚拟滚动、内部纵向滚动、树形表格或移动端卡片转换。

- WorkbenchDataToolbar负责展示筛选条件和发出确认、取消、重置、视图切换、刷新、设置及全屏意图；业务筛选、加载和全屏逻辑由调用方实现。

- 当前交付资格沿用prototype-only；历史审批不等于本轮实现的人工视觉验收。完整设计规则与边界见Catalog原规范。

### 包内关联引用

```json
[
  {
    "label": "完整已批准Table规范",
    "href": "#rules"
  },
  {
    "label": "WorkbenchDataToolbar辅助组件API",
    "href": "#family"
  }
]
```

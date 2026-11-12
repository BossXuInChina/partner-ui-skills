<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 表格 Table — `WorkbenchTable`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-table`](<../../workbench/wb-table.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-table",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于伙伴业务管理数据的结构化查看与操作。WorkbenchTable展示调用方提供的行并发出受控意图；WorkbenchDataToolbar负责可复用的表格、列表和卡片操作区。",
  "useWhen": ["展示、选择、排序、筛选或展开伙伴业务管理数据"],
  "avoidWhen": ["移动端卡片转换、虚拟滚动、树形表格或需要内置编辑引擎的表格","未经验证的生产目标"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTable"},
  "props": {
    "title": {"type":"String","default":""},
    "caption": {"type":"String","default":""},
    "ariaLabel": {"type":"String","default":""},
    "columns": {"type":"Array","required":true},
    "rows": {"type":"Array","default":{"kind":"function"}},
    "rowKey": {"type":["String","Function"],"required":true},
    "selectedRowKeys": {"type":"Array","default":{"kind":"function"}},
    "sort": {"type":"Object","default":null},
    "page": {"type":"Number","default":1},
    "pageSize": {"type":"Number","default":10},
    "pageSizeOptions": {"type":"Array","default":{"kind":"function"}},
    "total": {"type":"Number","default":null},
    "loading": {"type":"Boolean","default":false},
    "errorMessage": {"type":"String","default":""},
    "emptyKind": {"type":"String","default":"initial","enum":["initial","filtered"]},
    "selectable": {"type":"Boolean","default":false},
    "selectionFixed": {"type":"Boolean","default":false},
    "actionsFixed": {"type":"Boolean","default":false},
    "expandable": {"type":"Boolean","default":false},
    "expandedRowKeys": {"type":"Array","default":{"kind":"function"}},
    "isRowExpandable": {"type":"Function","default":{"kind":"function"}},
    "isRowSelectable": {"type":"Function","default":{"kind":"function"}},
    "rowActions": {"type":["Array","Function"],"default":{"kind":"function"}},
    "striped": {"type":"Boolean","default":false},
    "resizable": {"type":"Boolean","default":false},
    "columnWidths": {"type":"Object","default":{"kind":"undefined"}},
    "columnFilters": {"type":"Object","default":{"kind":"function"}}
  },
  "events": ["update:selectedRowKeys","selection-change","update:sort","sort-change","column-filter","update:columnFilters","column-filter-change","update:page","page-change","update:pageSize","page-size-change","update:expandedRowKeys","expand-change","row-action","retry","update:columnWidths","column-width-change"],
  "slots": ["toolbar-leading","toolbar-actions","error","empty","row-actions","expanded-content","expanded-actions","batch-actions"],
  "slotPatterns": [{"kind":"prefix","prefix":"header-","expression":"`header-${column.key}`"},{"kind":"prefix","prefix":"cell-","expression":"`cell-${column.key}`"}],
  "exposed": [{"name":"resetColumnWidths","declaration":"resetColumnWidths(key?: string): void;"}],
  "family": [
    {
      "assetId": "wb-table",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDataToolbar"},
      "props": {
        "variant": {"type":"String","default":"compact","enum":["title","compact","complex"]},
        "title": {"type":"String","default":""},
        "viewMode": {"type":"String","default":"table","enum":["table","list","card"]},
        "filterTags": {"type":"Array","default":{"kind":"function"}},
        "filterResultText": {"type":"String","default":""},
        "advancedFilterExpanded": {"type":"Boolean","default":false},
        "refreshing": {"type":"Boolean","default":false},
        "fullscreen": {"type":"Boolean","default":false},
        "showAdvancedFilter": {"type":"Boolean","default":true},
        "showViewSwitch": {"type":"Boolean","default":true}
      },
      "events": ["update:viewMode","view-change","update:advancedFilterExpanded","filter-confirm","filter-cancel","filter-remove","filter-reset","refresh","settings","fullscreen-change"],
      "slots": ["secondary-actions","primary-action","additional-actions","search","advanced-filter-form"],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "title": "表格标题；也可由外部WorkbenchDataToolbar提供标题操作区。",
    "caption": "原生表格的标题说明；应与ariaLabel至少提供其一以确保名称可访问。",
    "ariaLabel": "表格的可访问名称。",
    "columns": "列定义数组，使用稳定key；可按需配置field、sortable、filterable、fixed、primary、fluid、width、minWidth、maxWidth、ellipsis及filterOptions。",
    "rows": "调用方传入的当前展示数据；组件保持行顺序，不代为搜索、排序、筛选或分页切片。",
    "rowKey": "每行稳定唯一键的字段名或取键函数。",
    "selectedRowKeys": "当前页受控选择键数组。",
    "sort": "受控排序状态；组件只请求排序变更，不重排rows。",
    "page": "受控当前页；组件通过更新事件请求切页。",
    "pageSize": "当前页大小；配合total和调用方计算的rows使用。",
    "pageSizeOptions": "分页器可选每页数量。",
    "total": "总条数；提供有效非负数量时呈现分页。",
    "loading": "加载状态；首次加载显示骨架，已有行刷新时保留行。",
    "errorMessage": "非空时显示错误状态并提供retry意图。",
    "emptyKind": "在空rows时区分初始暂无数据和筛选无结果。",
    "selectable": "开启行选择。",
    "selectionFixed": "将选择列固定在左侧。",
    "actionsFixed": "将操作列固定在右侧。",
    "expandable": "开启行详情展开。",
    "expandedRowKeys": "受控展开行键数组。",
    "isRowExpandable": "按行决定是否允许展开。",
    "isRowSelectable": "按行决定是否允许选择。",
    "rowActions": "操作数组或按行生成操作的函数；动作通过row-action事件交给调用方。",
    "striped": "开启斑马纹。",
    "resizable": "开启列宽调整控件。",
    "columnWidths": "可选受控宽度映射；省略时组件在实例内维护调整值。",
    "columnFilters": "受控的列筛选值映射；不直接对rows执行筛选。"
  },
  "eventNotes": {
    "update:selectedRowKeys": {"payload":"新的当前页选择键数组。","timing":"用户选择或取消选择行、全选或清空选择后发出。"},
    "selection-change": {"payload":"对象包含selectedRowKeys、selectedRows及source。","timing":"选择结果变化时与更新事件一同发出；source区分行、当前页全选或清空。"},
    "update:sort": {"payload":"包含key和direction（asc或desc）的排序对象，或null表示默认顺序。","timing":"用户激活sortable列表头时发出。"},
    "sort-change": {"payload":"与update:sort相同的排序意图。","timing":"排序方向切换后发出；实际重排由调用方完成。"},
    "column-filter": {"payload":"对象包含列key、column和source。","timing":"用户激活filterable列的筛选入口时发出；调用方可接管筛选面板。"},
    "update:columnFilters": {"payload":"按列key索引筛选值数组的对象。","timing":"用户在标准筛选面板选择或重置选项后发出。"},
    "column-filter-change": {"payload":"对象包含key、column、values、完整columnFilters及source；source为option、reset-column或reset-all。","timing":"标准筛选面板的选择或重置操作后发出；不变换rows。"},
    "update:page": {"payload":"目标页码。","timing":"用户在分页器切换页码后发出。"},
    "page-change": {"payload":"目标页码。","timing":"切页意图发出时与update:page一同触发。"},
    "update:pageSize": {"payload":"目标每页数量。","timing":"用户选择新的每页数量后发出。"},
    "page-size-change": {"payload":"目标每页数量。","timing":"每页数量变更意图发出时与update:pageSize一同触发。"},
    "update:expandedRowKeys": {"payload":"包含本次展开或收起结果的目标键数组。","timing":"用户切换一行详情时发出。"},
    "expand-change": {"payload":"对象包含row、rowKey和expanded。","timing":"展开或收起意图发出时触发；调用方可通过受控值接受或拒绝。"},
    "row-action": {"payload":"对象包含row、rowKey、action和source。","timing":"用户激活直接显示或更多菜单中的行操作后触发。"},
    "retry": {"payload":"无参数。","timing":"用户激活错误状态中的重试按钮后触发。"},
    "update:columnWidths": {"payload":"以列key映射宽度数值的对象。","timing":"列宽调整提交或重置后发出。"},
    "column-width-change": {"payload":"对象包含key、width、columnWidths及source；重置全部时key和width为null。","timing":"指针、键盘、按钮调整或重置提交后触发；取消临时调整不会提交。"}
  },
  "slotNotes": {
    "toolbar-leading": {"scope":"无作用域参数。","description":"放置Table工具栏左侧的调用方内容。"},
    "toolbar-actions": {"scope":"无作用域参数。","description":"放置Table工具栏右侧操作。"},
    "header-{column.key}": {"scope":"column。","description":"替换列标题内容；表头单元格本身的排序、筛选和调宽语义仍由Table管理。"},
    "cell-{column.key}": {"scope":"row、value、column、rowIndex。","description":"自定义单元格内容；Table统一处理单行截断与真实溢出提示；组合内容内部需让文字可收缩。录入控件与按钮保留自身提示和交互。"},
    "row-actions": {"scope":"row、actions、emitAction。","description":"自定义行操作；通过emitAction交回Table发出row-action。"},
    "expanded-content": {"scope":"row、rowKey、rowIndex。","description":"提供展开详情内容；数据和编辑状态由调用方管理。"},
    "expanded-actions": {"scope":"row、rowKey、rowIndex。","description":"提供详情区域的附加操作。"},
    "empty": {"scope":"kind。","description":"替换空状态内容；kind区分初始无数据和筛选无结果。"},
    "error": {"scope":"message。","description":"替换错误展示内容；重试逻辑由调用方处理。"},
    "batch-actions": {"scope":"selectedRowKeys、selectedRows。","description":"在当前页批量选择摘要旁放置调用方批量操作。"}
  }
}
```

未声明或为空：eventDetails、slotDetails（不代表支持）

## 来源补充结构

来源：包内 components 契约的 usage 补充（kind=`explicit-source-bound-supplement`）。

```json
{
  "structures": {
    "columns": {
      "type": "Array<Column>",
      "requiredFields": ["key","title"],
      "fields": {
        "key": "nonempty string; identifies sort and cell-${key}",
        "title": "nonempty string",
        "field": "string key or (row) => value; defaults to column.key",
        "group": "optional {key:string,title:string}; adjacent leaf columns form a two-level column group with continuous header/body boundaries; split at fixed boundaries",
        "banded": "optional boolean; apply a subtle column background below hover and selected states",
        "sortable": "boolean",
        "filterable": "boolean",
        "filtered": "boolean; active indication for external filtering without filterOptions",
        "filterOptions": "Array<{value:string|number,label:string,disabled?:boolean}>; enables the optional standard column filter popup",
        "filterMultiple": "boolean, default true; false renders a single-choice radio list",
        "align": "start | center | end; left/right aliases are supported",
        "primary": "boolean",
        "ellipsis": "boolean; compatibility flag, ordinary data cells always truncate on one line and reveal full text only when overflowing",
        "fluid": "boolean; explicit true takes priority over unspecified widths and absorbs remaining space",
        "fixed": "left | right | undefined",
        "width": "nonnegative number(px) or CSS px/rem/em/%/ch length",
        "minWidth": "same as width; individual minimum, never copied to other columns",
        "maxWidth": "same lengths as width; caps allocation and resizing; minimum wins inverted range",
        "resizable": "boolean; false excludes this business column when Table.resizable is enabled"
      }
    },
    "rowKey": "string row property or (row) => key; required; stable unique row identity",
    "rows": "Array<Record>; caller supplies current page rows; Table does not sort or slice them",
    "selectedRowKeys": "Array<rowKey>; controlled; selection disabled when selectable=false",
    "columnFilters": "Record<column.key,Array<string|number>>; controlled, default {}; Table never filters rows",
    "sort": "null | { key: column.key, direction: asc | desc }; controlled",
    "page": "number, default 1; controlled",
    "pageSize": "number, default 10; controlled",
    "total": "finite nonnegative number enables pagination",
    "resizable": "boolean, default false; enables business-column pointer/keyboard/button resizing",
    "columnWidths": "optional Record<column.key,nonnegative pixel number>; supplied is controlled, omitted is instance-local; manual overrides fluid/equal allocation"
  },
  "eventPayloads": {
    "update:selectedRowKeys": "Array<rowKey> filtered to visible rows",
    "selection-change": "{ selectedRowKeys, selectedRows, source: row | page | clear | external-page-change | external-page-size-change }",
    "update:sort": "null | { key, direction: asc | desc }",
    "sort-change": "same as update:sort",
    "update:columnFilters": "Record<column.key,Array<string|number>>; empty/reset keys are omitted",
    "column-filter-change": "{key,column,values,columnFilters,source:option|reset-column|reset-all}",
    "update:page": "number",
    "page-change": "number",
    "update:pageSize": "number",
    "page-size-change": "number",
    "update:columnWidths": "Record<column.key,pixel number> overrides; reset removes override keys",
    "column-width-change": "{ key: string|null, width: number|null, columnWidths, source: pointer|keyboard|button|reset }"
  },
  "controlledState": ["Caller handles updates, sorts the full data and supplies a page slice.","Ordinary text cells and display slots stay on one line with overflow-only full-text Tooltip. Editable controls retain their own feedback and overlays; expanded details may wrap.","Caller resets page and selection when pageSize changes; Table emits pageSize but does not own reset policy.","Changing page or pageSize requests clearing nonempty selection; caller applies update:selectedRowKeys.","columnWidths supplied is controlled; drag previews then commits on release, cancellation discards; resetColumnWidths(key?) restores original column definitions. Omitted map stores local overrides, cleared only for removed keys."],
  "dynamicSlots": [
    {"name":"header-${column.key}","props":{"column":"Column; only replaces title content, never header controls or semantics"}},
    {"name":"cell-${column.key}","props":{"row":"row record","value":"string cellValue","column":"Column","rowIndex":"zero-based index"}}
  ]
}
```

```vue
<WorkbenchTable caption="Technical example" :columns="columns" :rows="visibleRows" row-key="id" selectable v-model:selectedRowKeys="selected" v-model:sort="sort" v-model:page="page" :page-size="pageSize" :total="allRows.length" @update:pageSize="size => { pageSize = size; page = 1; selected = [] }"><template #cell-status="{ value, row }"><span :data-row="row.id">{{ value }}</span></template></WorkbenchTable>
```

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-table-controlled-state","title":"业务状态由调用方控制","text":"选择、排序、筛选、分页与展开只发出目标状态和意图，Table不请求或持久化业务数据。","strength":"must","status":"confirmed","when":["使用Table"],"references":[]},
    {
      "id": "wb-table-action-semantics",
      "title": "行操作保持语义边界",
      "text": "首个状态操作使用蓝色Text Action链，后续状态操作使用主文字色；导航操作始终使用WorkbenchLink及Link状态链。",
      "strength": "must",
      "status": "confirmed",
      "when": ["提供行操作"],
      "references": []
    },
    {"id":"wb-table-toolbar-badge","title":"筛选计数复用Badge","text":"DataToolbar筛选计数复用17px数字Badge，并提供筛选条件语境的可访问名称。","strength":"must","status":"confirmed","when":["显示生效筛选数量"],"references":[]},
    {
      "id": "wb-table-overflow-adapter",
      "title": "固定列滚动适配属于Table",
      "text": "TableScrollArea复用Scrollbar视口并计算固定列之间的轨道几何；动态尺寸仅用于运行时测量结果。",
      "strength": "must",
      "status": "confirmed",
      "when": ["横向溢出或固定列"],
      "references": []
    }
  ],
  "dependencies": ["wb-badge","wb-button","wb-button-radio-group","wb-checkbox","wb-radio","wb-dropdown","wb-link","wb-pagination","wb-scrollbar","wb-skeleton","wb-tag","wb-tooltip","wb-popover"],
  "foundationKeys": ["color-border-focus","color-border-separator","color-border-separator-subtle","color-fill-hover","color-fill-selected","color-icon-active","color-icon-disabled","color-icon-hover","color-icon-primary","color-icon-secondary","color-scrollbar-thumb-fill-hover","color-surface-card-tinted","color-surface-container","color-table-header-fill-default","color-table-header-sticky-fill-default","color-table-row-fill-alternating","color-text-primary","color-text-secondary","color-text-action","color-text-action-hover","color-text-action-active","font-body-m","font-headline-s","radius-full","radius-sm","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","spacing-component-xl","spacing-layout-container-block","spacing-layout-container-inline","spacing-layout-content-gap","color-brand"],
  "intro": "用于伙伴业务管理数据的结构化查看与操作。WorkbenchTable展示调用方提供的行并发出受控意图；WorkbenchDataToolbar负责可复用的表格、列表和卡片操作区。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["当用户需要对多列业务数据进行比较、排序、选择、分页或展开查看时使用Table。需要卡片化阅读或移动端卡片转换时，Table本身不负责转换；由调用方选择对应展示方案。"],
      "bullets": ["Table使用原生table、thead、tbody和列标题语义；不要用普通Grid模拟表格结构。","WorkbenchDataToolbar是可独立复用于Table、列表和卡片视图的正式子能力。标题、精简和复杂三种结构分别承载标题操作、搜索筛选及视图/工具操作。","公开导出包括WorkbenchTable和WorkbenchDataToolbar；TableScrollArea是Table内部适配能力，不是独立Catalog block。"]
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["表头和数据行统一40px高，单元格水平留白8px；多选列48px，操作列160px。表格本体不创建卡片圆角，需要卡片表面时由外层WorkbenchCard负责。"],
      "bullets": ["列使用稳定key和title，可用field指定取值；fixed用于显式固定左右列，primary标记主信息列，fluid指定吸收剩余空间。width、minWidth、maxWidth按列独立配置；普通数据默认单行截断并在真实溢出时显示全文Tooltip，ellipsis保留兼容。","列按左固定、普通、右固定稳定分组；选择列、操作列和业务列按其规则分配宽度。窄容器保留横向滚动；固定区只在隐藏内容时显示连续阴影。","列标题的排序、筛选与调宽操作使用14px图标，并保留24px交互热区；图标及来源沿用已登记资产，不改绘制属性。","WorkbenchDataToolbar的title、compact、complex分别组织标题操作、主要操作/搜索/高级筛选，以及视图切换和工具按钮。高级筛选由调用方插槽提供字段；应用条件、标签及徽标由调用方维护。","表格底栏与表格保持12px间隔，默认32px高；底栏选择摘要与分页器各自保留对齐关系。筛选字段和已生效条件在工具栏中独占完整行。","表头、单元格分隔、固定列、行操作、展开详情、滚动条和列宽的完整数值规则仍以Catalog批准规范为准；此处不重新定义几何参数。"]
    },
    {
      "id": "grouped-table",
      "title": "分组表格的区域与分隔",
      "paragraphs": ["如身份差距表，左侧是跨行维度列；上层为列组表头，下层为组内叶子列表头，下面的对应数据组成表体分组。"],
      "bullets": ["相邻叶子列设置相同的group.key和group.title形成列组；未分组列可形成跨行维度列。","列组边界线贯穿表头和表体；叶子列之间使用组内短分隔线，不与列组边界叠加。","banded只控制数据列的浅色底纹，不改变列组身份或分隔线。窄容器保留表格内部横向滚动。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["Table只展示rows并发出用户操作意图。排序、筛选、分页、业务选择、展开状态及列宽持久化由调用方响应事件并回传受控值。"],
      "bullets": ["sortable列按升序、降序、默认三态切换；filterable列通过标准面板或调用方的面板接入筛选。标准筛选更新columnFilters，不直接改变rows。","selectedRowKeys表示当前页选择；全选跳过不可选行。受控页码或每页数量实际改变时，Table会发出清空选择的受控更新。","total有效时显示分页。Table不请求数据、不排序数据、不保存跨页选择；调用方根据sort、筛选和分页状态计算并传入当前rows。","初次加载在表头下显示五行骨架；刷新加载时保留已有行并暴露忙碌状态。错误状态保留工具栏并通过retry请求调用方重试。","空数据通过emptyKind区分初始暂无数据和筛选无结果；可用empty和error插槽替换状态内容，业务状态仍由调用方管理。","可展开详情通过expandedRowKeys受控；expand-change给出row、rowKey和展开状态。详情不计入条数、选择和斑马纹；展开项处理遵循调用方及已批准规则。","行操作最多两个文字操作直接显示，其余进入更多菜单；复杂操作可用row-actions插槽。图标操作示例规则为四个以内直出，更多时显示前三个和更多入口。","开启resizable后可以通过拖动或键盘调整列宽；方向键以10px移动，Shift加方向键以1px移动，Home到下限，End到有限上限。Escape或取消操作不提交临时宽度。","排序、筛选、列宽和展开控件支持键盘；筛选Escape关闭并恢复触发按钮焦点。详细事件参数由共享API表展示。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["调用方持有rows、排序、筛选、分页、选择及展开等业务状态。Table不负责网络请求、数据变换、跨页选择或持久化。"],
      "bullets": ["列筛选可以使用filterOptions和columnFilters的标准受控面板；没有选项时，Table发出column-filter意图，由调用方呈现筛选UI。","高级筛选应用后如何重置页码、选择或展开项属于业务策略；Studio组合示例的处理不扩展为Table内建数据逻辑。","单元格插槽中使用Input、Select、DatePicker、TimePicker时，其值与校验仍归调用方；Table不提供内置单元格编辑引擎。","不包含多列排序、跨页选择、列显隐、虚拟滚动、内部纵向滚动、树形表格或移动端卡片转换。","WorkbenchDataToolbar负责展示筛选条件和发出确认、取消、重置、视图切换、刷新、设置及全屏意图；业务筛选、加载和全屏逻辑由调用方实现。","当前交付资格沿用prototype-only；历史审批不等于本轮实现的人工视觉验收。完整设计规则与边界见Catalog原规范。"]
    }
  ],
  "related": [{"label":"完整已批准Table规范","href":"#rules"},{"label":"WorkbenchDataToolbar辅助组件API","href":"#family"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-table-and-edit",
  "title": "受控列表、筛选、排序、分页与展开编辑",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-table",
    "scenarioId": "table",
    "exampleId": "controlled-table-and-edit",
    "codeSha256": "sha256:76c44c08c5d062bfc2ea30bcd50fed1c4b24753a9fb5750b8a7bb0f282ade816"
  },
  "description": "完整Vue单文件组件示例。数据过滤、排序、分页切片和编辑保存都由调用方持有；WorkbenchTable只呈现当前页并发出交互意图。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

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

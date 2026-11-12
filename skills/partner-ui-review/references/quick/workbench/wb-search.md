<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 搜索 Search — `WorkbenchSearch`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-search`](<../../workbench/wb-search.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-search",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于提交文本搜索，可组合单侧或双侧单选筛选。搜索文本即时受控；是否执行查询由search事件触发。",
  "useWhen": ["文本搜索及前后缀筛选","多字段条件与关键字组合的综合搜索，字段菜单复用级联选择面板"],
  "avoidWhen": ["本版本范围外的交互或未经验证的内部框架生产实现"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "supported",
  "variantStatus": "supported",
  "caseSemantics": "Studio controls, not public component props"
}
```

未声明或为空：unsupported、usageUnsupported、variantUnsupported（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSearch"},
  "props": {
    "conditions": {"type":"Array","default":{"kind":"function"}},
    "fields": {"type":"Array","default":{"kind":"function"}},
    "wrapConditions": {"type":"Boolean"},
    "helpText": {"type":"String"},
    "modelValue": {"type":"String","default":""},
    "searchIconPosition": {"type":"String","default":"left","enum":["left","right"]},
    "variant": {"type":"String","default":"outlined","enum":["outlined","filled"]},
    "appearance": {"type":"String","default":"standard","enum":["standard","global"]},
    "type": {"type":"String","default":"basic"},
    "placeholder": {"type":"String","default":"请输入搜索内容"},
    "disabled": {"type":"Boolean"},
    "prefixDisabled": {"type":"Boolean"},
    "suffixDisabled": {"type":"Boolean"},
    "showPrefixIcon": {"type":"Boolean","default":true},
    "showSuffixIcon": {"type":"Boolean","default":true},
    "previewState": {"type":"String","default":"default"},
    "filterValue": {"type":"String","default":""},
    "filterOptions": {"type":"Array","default":{"kind":"function"}},
    "prefixValue": {"type":"String","default":""},
    "suffixValue": {"type":"String","default":""},
    "prefixOptions": {"type":"Array","default":{"kind":"function"}},
    "suffixOptions": {"type":"Array","default":{"kind":"function"}},
    "showPanel": {"type":"Boolean"}
  },
  "events": ["update:modelValue","update:filterValue","update:prefixValue","update:suffixValue","search","clear","filter-change","update:conditions","condition-change"],
  "slots": ["prefix-icon","filter-icon","suffix-icon"],
  "propNotes": {
    "modelValue": "受控搜索文本，输入时即时更新。",
    "type": "basic、filter-prefix、filter-suffix或filter-both，决定筛选段布局。",
    "filterValue": "单侧筛选值；双侧模式分别使用prefixValue与suffixValue。",
    "filterOptions": "单侧筛选选项，结构为value、label及可选disabled。",
    "variant": "outlined或filled表面样式。",
    "appearance": "standard或global外观配置。",
    "searchIconPosition": "搜索图标位于左侧或右侧。",
    "prefixDisabled": "单独禁用前缀筛选并关闭其展开面板。",
    "suffixDisabled": "单独禁用后缀筛选并关闭其展开面板。",
    "showPrefixIcon": "控制前缀筛选文字左侧图标。",
    "showSuffixIcon": "控制后缀筛选文字左侧图标。",
    "conditions": "综合搜索结构化条件数组，每项含field、value及可选label。",
    "fields": "综合搜索字段定义；可包含group、disabled及options选项。",
    "wrapConditions": "综合条件标签是否换行展示。",
    "helpText": "综合搜索帮助入口的说明内容。",
    "previewState": "Studio演示状态参数。",
    "prefixValue": "前缀筛选受控值。",
    "suffixValue": "后缀筛选受控值。",
    "prefixOptions": "前缀单选筛选项数组。",
    "suffixOptions": "后缀单选筛选项数组。",
    "showPanel": "Studio演示面板显示控制，不作为业务数据。",
    "disabled": "禁用搜索输入、筛选及清除操作。",
    "placeholder": "搜索输入为空时显示的提示文案。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的搜索文本。","timing":"输入内容变化时实时发出。"},
    "search": {"payload":"普通、筛选及双侧模式为搜索文本；comprehensive模式为{ keyword, conditions }。","timing":"左侧搜索图标模式在输入或组合输入结束时实时发出（清除时发空字符串）；右侧图标模式通过Enter提交；comprehensive模式通过Enter提交。"},
    "clear": {"payload":"无。","timing":"用户激活清除操作后发出，并同步清空文本。"},
    "filter-change": {"payload":"所选筛选项；取消选择时为null。","timing":"选择或取消可用筛选项后发出。"},
    "update:filterValue": {"payload":"新的筛选值。","timing":"单侧筛选选择变化时发出。"},
    "update:prefixValue": {"payload":"新的前缀筛选值。","timing":"前缀筛选变化时发出。"},
    "update:suffixValue": {"payload":"新的后缀筛选值。","timing":"后缀筛选变化时发出。"},
    "update:conditions": {"payload":"新的结构化条件数组。","timing":"综合搜索条件新增、删除或取消时发出。"},
    "condition-change": {"payload":"当前结构化条件数组。","timing":"综合条件发生增删或值变化后发出。"}
  },
  "slotNotes": {"prefix-icon":{"scope":"无插槽参数。","description":"替换前缀筛选图标。"},"suffix-icon":{"scope":"无插槽参数。","description":"替换后缀筛选图标。"},"filter-icon":{"scope":"无插槽参数。","description":"提供筛选图标适配；可用于后续内部图标组件接入。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-search-rule-1",
      "title": "基础搜索默认占4/12或8/24栅格；前后缀共存默认占6/12或12/2",
      "text": "基础搜索默认占4/12或8/24栅格；前后缀共存默认占6/12或12/24栅格；单侧从4/12或8/24起算，按实际内容增跨。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {"id":"wb-search-rule-2","title":"搜索核心最小宽度296px","text":"搜索核心最小宽度296px。所属轨道更宽时，核心随轨道拉伸。","strength":"must","status":"confirmed","when":["文本搜索及前后缀筛选"],"references":[]},
    {
      "id": "wb-search-rule-3",
      "title": "组合的实际最小宽度为“296px核心 + 所有筛选段实际宽度之和”",
      "text": "组合的实际最小宽度为“296px核心 + 所有筛选段实际宽度之和”。默认跨度不足时，`SearchGridItem` 增加跨度，最多占满当前行。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-4",
      "title": "页面负责栅格、位置、断点和组合关系；`WorkbenchSearch` ",
      "text": "页面负责栅格、位置、断点和组合关系；`WorkbenchSearch` 不推断页面布局。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {"id":"wb-search-rule-5","title":"默认占位文案为“请输入搜索内容”","text":"默认占位文案为“请输入搜索内容”。聚焦保持1px描边，仅改变颜色。图标与文字垂直居中。","strength":"must","status":"confirmed","when":["文本搜索及前后缀筛选"],"references":[]},
    {
      "id": "wb-search-rule-6",
      "title": "核心高32px、圆角4px，复用 Select 的默认、Hover、Fo",
      "text": "核心高32px、圆角4px，复用 Select 的默认、Hover、Focus、Disabled Fill 与 Border Token。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {"id":"wb-search-rule-7","title":"搜索图标、清除图标和筛选图标为14px；筛选箭头为10px","text":"搜索图标、清除图标和筛选图标为14px；筛选箭头为10px。","strength":"must","status":"confirmed","when":["文本搜索及前后缀筛选"],"references":[]},
    {
      "id": "wb-search-rule-8",
      "title": "筛选段和搜索核心位于同一个圆角矩形容器内；筛选段没有独立交互描边",
      "text": "筛选段和搜索核心位于同一个圆角矩形容器内；筛选段没有独立交互描边。前缀左右结构为 `12 + 14 + 4 + 文案 + 6 + 10 + 8`；后缀为 `8 + 14 + 4 + 文案 + 6 + 10 + 12`。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-9",
      "title": "默认未选文案为“筛选”，文字与图标使用各自的Secondary Toke",
      "text": "默认未选文案为“筛选”，文字与图标使用各自的Secondary Token。悬浮、点击、聚焦及展开时文字与图标转Primary；已选或预设选项显示选项文案，失焦后文字保留Primary、图标恢复Secondary。展开箭头使用激活色，禁用时使用禁用色。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-10",
      "title": "双侧模式使用 `v-model:prefix-value` / `v-m",
      "text": "双侧模式使用 `v-model:prefix-value` / `v-model:suffix-value` 和 `prefixOptions` / `suffixOptions`，两侧独立。分别通过 `prefix-icon` / `suffix-icon` Slot 注入图标，保留 `filter-icon` 回退。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-11",
      "title": "面板表面、宽度与选中勾",
      "text": "面板距筛选段4px、无描边，使用color-surface-overlay和shadow-base；默认宽120px且不小于筛选段，单选选中勾14px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {"id":"wb-search-rule-12","title":"选项Hover使用弱填充","text":"选项Hover使用弱填充。单选选中项没有背景填充并显示勾；禁用项不可点击。","strength":"must","status":"confirmed","when":["文本搜索及前后缀筛选"],"references":[]},
    {
      "id": "wb-search-rule-13",
      "title": "Tab进入输入框和筛选触发器；Enter执行搜索、展开面板或选择选项；方",
      "text": "Tab进入输入框和筛选触发器；Enter执行搜索、展开面板或选择选项；方向键移动可用选项；Escape关闭面板。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {"id":"wb-search-rule-14","title":"禁用选项会被方向键导航跳过","text":"禁用选项会被方向键导航跳过。","strength":"must","status":"confirmed","when":["文本搜索及前后缀筛选"],"references":[]},
    {
      "id": "wb-search-rule-15",
      "title": "搜索、清除和箭头图标当前由原型提供；筛选业务图标通过 Slot 注入",
      "text": "搜索、清除和箭头图标当前由原型提供；筛选业务图标通过 Slot 注入。公司内部 UI 框架接入时由适配层映射，不改动本规范语义。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {"id":"wb-search-rule-16","title":"本任务不实现搜索建议、远程搜索、历史记录或多选筛选","text":"本任务不实现搜索建议、远程搜索、历史记录或多选筛选。","strength":"must","status":"confirmed","when":["文本搜索及前后缀筛选"],"references":[]},
    {
      "id": "wb-search-rule-17",
      "title": "再次点击已选选项（或键盘Enter）取消该侧筛选，值更新为空字符串，`f",
      "text": "再次点击已选选项（或键盘Enter）取消该侧筛选，值更新为空字符串，`filter-change` 返回 `null`，恢复“筛选”文案并关闭面板；另一侧保持原值。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-18",
      "title": "禁用填充只在整体容器绘制一次，搜索核心和筛选段透明，避免半透明Token",
      "text": "禁用填充只在整体容器绘制一次，搜索核心和筛选段透明，避免半透明Token叠加导致色差。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-19",
      "title": "`showPrefixIcon`、`showSuffixIcon` 默认",
      "text": "`showPrefixIcon`、`showSuffixIcon` 默认为 `true`，分别控制两侧筛选文字左侧图标。关闭时一并移除图标与文字之间的间距，保留文字、箭头和选择行为。预览右侧提供对应独立开关。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-20",
      "title": "`prefixDisabled` / `suffixDisabled` ",
      "text": "`prefixDisabled` / `suffixDisabled` 默认为 `false`，独立禁用该侧筛选并关闭已展开面板，保留选值。文字与图标使用禁用色，Hover不变色，搜索核心与另一侧保持可用。整体 `disabled` 优先。右侧控制项提供对应开关。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-rule-21",
      "title": "筛选图标和文字按默认、展开、选中状态切换颜色",
      "text": "未选择默认态文字和图标均为二级色；展开时两者为一级色；选中后收起时文字保留一级色、图标恢复二级色，即使触发器仍保持焦点。展开箭头使用激活色。",
      "strength": "must",
      "status": "confirmed",
      "when": ["文本搜索及前后缀筛选"],
      "references": []
    },
    {
      "id": "wb-search-affix-panel-radius-20261025",
      "title": "Search前后缀筛选面板圆角",
      "text": "Search前缀与后缀筛选面板主体使用Foundation radius-md（6px）；筛选触发器、搜索核心及选项行保持各自既有圆角。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用Search前缀或后缀筛选"],
      "references": []
    }
  ],
  "dependencies": ["wb-checkbox","wb-tag","wb-popover","wb-tooltip","wb-cascader"],
  "foundationKeys": ["color-border","color-border-hover","color-border-focus","color-border-disabled","color-text-primary","color-text-placeholder","color-text-secondary","color-text-disabled","color-icon-primary","color-icon-secondary","color-icon-placeholder","color-icon-active","color-icon-disabled","color-fill-hover","color-fill-subtle-default","color-fill-subtle-disabled","color-surface-card-default","color-info-primary-subtle","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","spacing-layout-container-inline","radius-sm","radius-lg","shadow-base","font-body-m","font-headline-m","color-surface-overlay","color-fill-default","color-fill-disabled","radius-md"],
  "intro": "用于提交文本搜索，可组合单侧或双侧单选筛选。搜索文本即时受控；是否执行查询由search事件触发。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["基础检索使用type=\"basic\"；条件筛选使用filter-prefix、filter-suffix或filter-both。"],
      "bullets": ["页面的栅格、位置、断点及组合布局由消费方决定，Search不推断页面布局。","正式WorkbenchSearch与Studio综合搜索演示的扩展能力需区分；仅使用公开API。"]
    },
    {"id":"structure","title":"设计结构与排版","paragraphs":["搜索核心最小宽度296px，高32px；筛选段与搜索核心共享整体容器。"],"bullets":["前后缀可分别配置选项、当前值、禁用状态和图标显示。","variant控制outlined或filled表面；appearance与type、搜索图标位置独立配置。"]},
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["搜索文本通过v-model实时更新；search事件表示执行搜索，不代表组件负责请求数据。"],
      "bullets": ["Enter可执行搜索、展开筛选或选择选项；方向键浏览可用项，Escape关闭菜单。","已选筛选再次选择可取消，filter-change以null表示取消；另一侧值保持不变。","clear清空搜索文本；禁用选项不会被点击或方向键选中。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["Search只负责控件交互与事件，不连接远程服务、不维护查询结果或历史记录。"],
      "bullets": ["消费方监听search并执行查询，监听filter-change更新筛选状态。","不提供搜索建议、远程搜索、历史记录或多选筛选。","筛选业务图标可通过命名插槽注入；搜索、清除和箭头图标由组件提供。"]
    }
  ],
  "related": [{"label":"搜索批准规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-search",
  "title": "受控搜索",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-search","scenarioId":"search","exampleId":"controlled-search","codeSha256":"sha256:7cce61c4b1d199fff1b2f51cfbf2d7bb8b40a94764a5b47784f8240f2e6583be"},
  "description": "完整示例由调用方持有搜索词并处理查询事件。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchSearch } from "@workbench/ui-vue3"
const query = ref('')
const submitted = ref('')
function runSearch(value) { submitted.value = value }
</script>
<template>
  <WorkbenchSearch v-model="query" type="basic" @search="runSearch" />
  <p>最近提交：{{ submitted || "尚未搜索" }}</p>
</template>
```

<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 结构树 Tree — `WorkbenchTree`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-tree`](<../../workbench/wb-tree.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-tree",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于展示父子层级内容，支持单选、多选、搜索、展开及可配置的节点操作。",
  "useWhen": ["结构树 Tree相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ],
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTree"},
  "props": {
    "items": {"type":"Array","default":{"kind":"function"}},
    "modelValue": {"type":["String","Number"],"default":{"kind":"undefined"}},
    "expandedKeys": {"type":"Array","default":{"kind":"undefined"}},
    "defaultExpandedKeys": {"type":"Array","default":{"kind":"function"}},
    "checkedKeys": {"type":"Array","default":{"kind":"undefined"}},
    "defaultCheckedKeys": {"type":"Array","default":{"kind":"function"}},
    "title": {"type":"String","default":"主标题"},
    "titleIcon": {"type":"String","default":""},
    "showCount": {"type":"Boolean"},
    "searchable": {"type":"Boolean","default":true},
    "search": {"type":"String","default":{"kind":"undefined"}},
    "placeholder": {"type":"String","default":"请输入搜索内容"},
    "checkable": {"type":"Boolean"},
    "checkStrictly": {"type":"Boolean"},
    "showLine": {"type":"Boolean"},
    "showIcons": {"type":"Boolean"},
    "editable": {"type":"Boolean","default":true},
    "showActions": {"type":"Boolean","default":true},
    "disabled": {"type":"Boolean"},
    "label": {"type":"String","default":"结构树"},
    "emptyText": {"type":"String","default":"暂无数据"}
  },
  "events": [
    "update:modelValue",
    "update:expandedKeys",
    "update:checkedKeys",
    "update:search",
    "select",
    "expand",
    "check",
    "rename",
    "delete",
    "more"
  ],
  "eventDetails": null,
  "slots": ["title-actions","label"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [
    {"name":"focus","declaration":"focus(): Promise<void>;"},
    {"name":"startEdit","declaration":"startEdit(key: string | number): void;"}
  ],
  "family": [],
  "propNotes": {
    "items": "递归节点数据；节点包含key、label和可选children。",
    "modelValue": "当前单选节点key。",
    "expandedKeys": "受控展开节点key数组。",
    "defaultExpandedKeys": "非受控初始展开节点key数组。",
    "checkedKeys": "受控勾选节点key数组。",
    "defaultCheckedKeys": "非受控初始勾选节点key数组。",
    "title": "树标题。",
    "titleIcon": "标题区图标标识。",
    "showCount": "是否显示节点数量。",
    "searchable": "是否显示搜索框。",
    "search": "受控搜索文本；提供后需响应update:search。",
    "checkable": "是否启用节点复选。",
    "checkStrictly": "是否取消父子勾选联动。",
    "showLine": "是否显示层级辅助线。",
    "showIcons": "是否显示节点图标。",
    "editable": "是否允许编辑节点名称。",
    "showActions": "是否显示节点操作入口。",
    "emptyText": "节点为空时显示的文案。",
    "label": "树控件可访问名称。",
    "placeholder": "搜索输入框的提示文案。",
    "disabled": "禁用树节点交互。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"选中的节点key。","timing":"用户选中节点后发出。"},
    "update:expandedKeys": {"payload":"展开节点key数组。","timing":"展开或收起节点后发出。"},
    "update:checkedKeys": {"payload":"勾选节点key数组。","timing":"勾选状态变化后发出。"},
    "update:search": {"payload":"新的搜索文本。","timing":"搜索框文本变化时发出。"},
    "select": {"payload":"节点key及节点数据。","timing":"用户选择节点后发出。"},
    "expand": {"payload":"节点key、是否展开及节点数据。","timing":"节点展开状态变化时发出。"},
    "check": {"payload":"新的勾选key数组及{ key, checked, node }变化上下文。","timing":"用户切换节点勾选后发出。"},
    "rename": {"payload":"节点key、新名称及原节点数据。","timing":"用户确认编辑名称后发出。"},
    "delete": {"payload":"待删除节点key及节点数据。","timing":"用户激活删除操作后发出。"},
    "more": {"payload":"节点key及节点数据。","timing":"用户激活更多操作后发出。"}
  },
  "slotNotes": {
    "title-actions": {"scope":"无插槽参数。","description":"在树标题区域放置消费方操作。"},
    "label": {"scope":"{ node, level }；node为节点数据，level为从1开始的层级。","description":"自定义节点标签展示。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [],
  "dependencies": ["wb-checkbox"],
  "foundationKeys": [
    "color-text-primary",
    "color-text-secondary",
    "color-text-disabled",
    "color-border",
    "color-border-focus",
    "color-border-separator",
    "color-surface-container",
    "color-fill-hover",
    "color-text-placeholder",
    "color-text-action",
    "color-icon-secondary",
    "color-icon-primary",
    "color-error",
    "font-body-m",
    "font-body-s",
    "font-headline-l",
    "radius-sm"
  ],
  "intro": "用于展示父子层级内容，支持单选、多选、搜索、展开及可配置的节点操作。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["用于具有清晰父子关系的结构数据。若主要任务是从多级选项中提交末级值，使用Cascader。"],
      "bullets": ["单选使用modelValue；多选启用checkable并使用checkedKeys。","数据量较大时开启searchable；标题、图标、统计及节点操作可按需呈现。"]
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["items递归描述节点，每个节点使用稳定key和label，可带children、disabled。"],
      "bullets": [
        "title与titleIcon控制树标题；emptyText定义无数据文案。",
        "showLine、showIcons、showCount控制辅助层级线、节点图标及数量。",
        "title-actions插槽用于标题区操作，label插槽用于自定义节点标签。"
      ]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["展开、选择、勾选及节点操作分别发出独立事件。"],
      "bullets": ["多选默认父子联动；checkStrictly=true时父子勾选相互独立。","编辑节点需editable；showActions控制节点操作入口。","搜索受控时监听update:search同步search值。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件负责树内展示和本地交互；消费方负责节点保存、删除确认及权限判断。"],
      "bullets": [
        "modelValue、expandedKeys、checkedKeys与search可受控；default* props提供非受控初值。",
        "rename、delete、more仅发出用户动作，不自行保存后端数据。",
        "节点计数、标题图标能力以正式API为准；Studio隐藏注释不构成新能力。"
      ]
    }
  ],
  "related": [{"label":"结构树规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-tree",
  "title": "受控部门树",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-tree",
    "scenarioId": "tree",
    "exampleId": "controlled-tree",
    "codeSha256": "sha256:895108ec4afcbe60ace1449106cf7db1f4b070e0e66d1a789207ef0990c8c2d5"
  },
  "description": "完整定义树数据及当前选择，由消费方处理选择结果。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTree } from "@workbench/ui-vue3"
const selectedKey = ref('design')
const expandedKeys = ref(['company'])
const items = [{ key: 'company', label: '公司', children: [{ key: 'design', label: '设计部' }, { key: 'product', label: '产品部' }] }]
function selectNode(key) { selectedKey.value = key }
</script>
<template>
  <WorkbenchTree v-model="selectedKey" v-model:expanded-keys="expandedKeys" :items="items" title="组织架构" @select="selectNode" />
  <output>当前节点：{{ selectedKey }}</output>
</template>
```

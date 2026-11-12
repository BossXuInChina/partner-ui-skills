<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 级联选择 Cascader — `WorkbenchCascader`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-cascader`](<../../workbench/wb-cascader.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-cascader",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于从多层级选项中选择末级值；支持单选、末级多选和全层级多选。",
  "useWhen": ["级联选择器 Cascader相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCascader"},
  "props": {
    "options": {"type":"Array","required":true},
    "modelValue": {"type":["String","Number","Array"],"default":{"kind":"undefined"}},
    "defaultValue": {"type":["String","Number","Array"],"default":null},
    "mode": {"type":"String","default":"single","enum":["single","leaf","all"]},
    "size": {"type":"String","default":"medium"},
    "disabled": {"type":"Boolean"},
    "label": {"type":"String","default":"级联选择器"},
    "placeholder": {"type":"String","default":"请选择"},
    "open": {"type":"Boolean","default":{"kind":"undefined"}},
    "defaultOpen": {"type":"Boolean"},
    "defaultExpandedKeys": {"type":"Array","default":{"kind":"function"}},
    "inlinePanel": {"type":"Boolean"},
    "clearable": {"type":"Boolean"},
    "tagRemovable": {"type":"Boolean"}
  },
  "events": ["update:modelValue","update:open","change","expand","remove","clear"],
  "exposed": [{"name":"focus","declaration":"focus(): void;"},{"name":"close","declaration":"close(): void;"}],
  "family": [
    {
      "assetId": "wb-cascader",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCascaderOverflow"},
      "props": {"id":{"type":"String","required":true},"anchor":{"type":"Object","required":true},"items":{"type":"Array","required":true},"removable":{"type":"Boolean"}},
      "events": ["remove","dismiss","focusout"],
      "slots": [],
      "slotPatterns": [],
      "exposed": [{"name":"contains","declaration":"contains(target: Node | null): boolean | undefined;"}]
    },
    {
      "assetId": "wb-cascader",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCascaderPanel"},
      "props": {
        "constrained": {"type":"Boolean"},
        "options": {"type":"Array","required":true},
        "index": {"type":"Map","required":true},
        "selected": {"type":"Array","required":true},
        "mode": {"type":"String","default":"single"},
        "columnSelection": {"type":"Array","default":{"kind":"function"},"enum":["single","multiple","none"]},
        "label": {"type":"String","default":"级联选项"}
      },
      "events": ["expand","choose","toggle","close"],
      "slots": [],
      "slotPatterns": [],
      "exposed": [{"name":"focusFirst","declaration":"focusFirst(): void;"}]
    }
  ],
  "propNotes": {
    "options": "级联节点数组；节点由key/label及可选children组成。",
    "modelValue": "受控值；single模式为叶子key，leaf/all模式为叶子key数组。",
    "defaultValue": "非受控初始选择值。",
    "mode": "single、leaf或all。",
    "size": "选择器尺寸small、medium或large。",
    "open": "受控浮层展开状态；省略时使用内部状态。",
    "defaultOpen": "非受控时的初始展开状态。",
    "defaultExpandedKeys": "默认展开的层级路径key。",
    "inlinePanel": "在当前布局内嵌展示面板。",
    "clearable": "是否允许清除全部选择。",
    "tagRemovable": "是否允许删除已选标签。",
    "disabled": "禁用选择交互并保留当前值。",
    "label": "选择器可访问名称。",
    "placeholder": "尚未选择时的提示文案。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"单值或按模式返回的叶子key数组。","timing":"选择、移除或清空后发出。"},
    "update:open": {"payload":"新的布尔展开状态。","timing":"面板打开或关闭时发出。"},
    "change": {"payload":"新值及对应的完整选中路径数组。","timing":"选择值变化后发出。"},
    "expand": {"payload":"被展开节点key及当前展开路径。","timing":"用户展开或切换级联层级时发出。"},
    "remove": {"payload":"移除的节点key数组。","timing":"用户移除一个或多个已选标签时发出。"},
    "clear": {"payload":"无。","timing":"用户清空全部选择后发出。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-cascader-overlay-radius-20261025",
      "title": "级联面板与+N明细的用户确认圆角",
      "text": "级联主面板主体使用radius-md（6px）；触发器与选项行保持各自既有圆角。+N明细依据tagRemovable区分：可删除时为radius-md（6px）的Popover，静态时为radius-sm（4px）的Tooltip。保留4px标签内容内距与间距、宽度收紧、箭头锚定和删除交互。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Cascader面板或标签溢出明细"],
      "references": []
    }
  ],
  "dependencies": ["wb-select","wb-checkbox","wb-tag","wb-tooltip"],
  "foundationKeys": ["color-text-primary","color-text-secondary","color-text-disabled","color-text-placeholder","color-border","color-border-hover","color-border-focus","color-border-disabled","color-fill-hover","color-fill-disabled","color-surface-overlay","color-icon-primary","color-icon-secondary","color-icon-disabled","font-body-m","font-body-s","radius-sm","radius-md","color-fill-subtle-default","color-fill-subtle-disabled","color-fill-selected","color-border-separator","shadow-base"],
  "intro": "用于从多层级选项中选择末级值；支持单选、末级多选和全层级多选。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["当选项本身具有父子层级且需要逐级定位时使用Cascader。平铺选项使用Select。"],"bullets":["single仅选择末级并存单值；leaf与all均启用多选，分别表达末级或全层级选择。","默认浮层适合常规页面；inlinePanel用于内容区内嵌面板。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["options以key、label及可选children构成树；叶子选择值按mode变化。"],
      "bullets": ["size支持small、medium、large；selected标签过多时折叠为+n，并可展开查看隐藏项。","open可受控；未提供时由defaultOpen初始化内部展开状态。","clearable控制整体清除，tagRemovable控制逐项移除。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["切换父级后级联面板随路径更新；已选路径在重新打开时保留。"],
      "bullets": ["单选只提交末级key；leaf/all模式输出末级key数组，父节点选择会展开为可选叶子。","expand通知当前展开路径；移除标签发出remove，清空发出clear。","禁用节点不可选择；禁用状态保留当前值。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["消费方维护options与受控modelValue，并根据change更新业务筛选或表单值。"],
      "bullets": ["change附带完整层级路径；消费方可用路径构造面包屑或结果描述。","组件不负责远程加载层级；需要异步数据时由消费方更新options。","内置WorkbenchCascaderPanel/Overflow为辅助API，常规场景使用主组件。"]
    }
  ],
  "related": [{"label":"级联选择注册规范","href":"#rules"},{"label":"面板与溢出辅助组件API","href":"#family"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "region-cascader",
  "title": "区域选择",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-cascader",
    "scenarioId": "cascader",
    "exampleId": "region-cascader",
    "codeSha256": "sha256:906086376382cd840e9669a065c995584be57c815540d2ce45d04e26505733cf"
  },
  "description": "受控单选叶子key，层级节点及业务结果完整定义。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchCascader } from "@workbench/ui-vue3"
const region = ref('hz')
const options = [{ key: 'zj', label: '浙江', children: [{ key: 'hz', label: '杭州' }, { key: 'nb', label: '宁波' }] }]
const selectedPath = ref([])
function handleChange(value, paths) { selectedPath.value = paths[0] ?? [] }
</script>
<template>
  <WorkbenchCascader v-model="region" :options="options" mode="single" @change="handleChange" />
  <output>{{ selectedPath.join(" / ") || region }}</output>
</template>
```

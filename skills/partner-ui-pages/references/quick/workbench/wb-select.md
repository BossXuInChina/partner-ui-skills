<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 选择器 Select — `WorkbenchSelect`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-select`](<../../workbench/wb-select.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-select",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于从有限的候选项中选择一个或多个值。正式WorkbenchSelect v1保持已批准的基础合同；搜索、清除、标签删除和尺寸扩展只属于Studio候选验证。",
  "useWhen": ["单选或多选已有选项"],
  "avoidWhen": ["本版本范围外的交互或未经验证的内部框架生产实现"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSelect"},
  "props": {
    "modelValue": {"type":"Array","default":{"kind":"function"}},
    "multiple": {"type":"Boolean"},
    "label": {"type":"String"},
    "required": {"type":"Boolean"},
    "state": {"type":"String","default":"default"},
    "showPanel": {"type":"Boolean"},
    "options": {"type":"Array","required":true},
    "teleportPanel": {"type":"Boolean"},
    "panelClass": {"type":"String","default":""},
    "placeholder": {"type":"String","default":"请选择"}
  },
  "events": ["update:modelValue"],
  "slotPatterns": [{"kind":"unknown","expression":"slotName"}],
  "propNotes": {
    "modelValue": "当前受控选值数组；单选同样使用数组。",
    "multiple": "开启后允许选择多个选项。",
    "label": "裸控件的可访问名称；字段可见标签由WorkbenchFormItem提供。",
    "required": "声明必填语义；字段场景的必填标记由表单项负责。",
    "state": "正式实现中用于disabled状态；focus和hover由用户交互产生。",
    "showPanel": "仅用于Studio预览强制展示面板，不是业务开关。",
    "options": "正式选项数组；每项使用value、label和可选disabled。",
    "teleportPanel": "控制浮层面板是否通过Teleport挂载。",
    "panelClass": "传递给面板的自定义类名。"
  },
  "eventNotes": {"update:modelValue":{"payload":"新的选值数组；单选数组为零或一个值，多选为当前已选值。","timing":"用户选择可用选项后发出。正式WorkbenchSelect没有clear事件。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-select-rule-1",
      "title": "支持单选、多选以及默认、悬浮、聚焦、禁用、已选择状态",
      "text": "支持单选、多选以及默认、悬浮、聚焦、禁用、已选择状态。v-model始终使用值数组；options为{value,label,disabled?}数组。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-2",
      "title": "默认高度32px、默认宽度296px，一般对应4栅格",
      "text": "默认高度32px；独立使用默认宽度296px，296px不是最小宽度。Modal/Drawer内容字段默认填满可用宽度；FormItem沿用字段的自适应宽度，四栅格由Form/Grid父容器决定。字段容器可通过--select-field-width提供宽度，显式width仍优先；工具栏行保留独立默认宽度，内联窄字段显式指定width。组件不自行推断页面位置。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-3",
      "title": "默认文案“请选择”，占位文本色；选中值用主文本色",
      "text": "默认文案“请选择”，占位文本色；选中值用主文本色。默认左右内边距12px，箭头10×10px，默认次级文本色、展开激活色；展开本身不改变描边。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-4",
      "title": "多选标签高24px，在32px容器内垂直居中",
      "text": "多选标签高24px，在32px容器内垂直居中。标签左外边距4px、标签自身左右内边距8px、标签间距8px；首个标签文字距左侧12px，箭头右边距12px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-5",
      "title": "单个标签超过7字符显示前7字符加省略号，悬停显示全文；放不下的末尾标签收",
      "text": "单个标签超过7字符显示前7字符加省略号，悬停显示全文；放不下的末尾标签收起为+N，保持已显示标签宽度。从+N到箭头前的剩余区域作为悬浮热区，在选择器上方用带下指箭头的气泡逐个展示被收起的标签；气泡内标签保留完整填充容器和全文提示。单选及选项长文省略并保留全文提示。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-6",
      "title": "面板距触发器4px、内部间距4px、无描边；选项仅悬浮或键盘聚焦时有弱填",
      "text": "面板距触发器4px、内部间距4px、选项高36px、无描边；选项仅悬浮或键盘聚焦时有弱填充，选中项不叠加背景。单选选中显示勾，多选复用已批准Checkbox的ChoiceMark，图文间距8px，整行只有一个option交互入口。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-7",
      "title": "默认描边color-border，悬浮color-border-hove",
      "text": "可见标签、必填标记、帮助文本和错误反馈统一由FormItem绘制；裸Select的label仅提供可访问名称，搜索筛选可直接使用裸Select。字段内实际combobox同时连接字段标签与完整选值名称，listbox连接字段标签。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-8",
      "title": "支持基本打开关闭、单选多选、方向键与Escape",
      "text": "支持基本打开关闭、单选多选、方向键与Escape。选项级禁用独立于整体禁用，禁用项不响应选择且跳过键盘焦点。完整选值保留可访问名称。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-rule-9",
      "title": "本版本不提供搜索、清空、全选、标签删除、远程选项、浮层翻转等额外能力；新",
      "text": "本版本不提供搜索、清空、全选、标签删除、远程选项、浮层翻转等额外能力；新增交互与样式单独评审。showPanel仅供预览检查，不作为业务交互模式。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单选或多选已有选项"],
      "references": []
    },
    {
      "id": "wb-select-panel-radius-20261025",
      "title": "Select面板与+N明细的用户确认圆角",
      "text": "Select下拉面板主体使用Foundation radius-md（6px）；Select触发器与选项行保持各自既有圆角。正式Select不提供标签删除API，因此正式组件的静态+N明细使用Tooltip及radius-sm（4px）；Studio可删除扩展的+N明细使用Popover及radius-md（6px），不将删除能力加入正式Select API。保留4px标签内容内距与间距、宽度收紧、箭头锚定及扩展已有删除行为。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Select下拉面板或多选标签+N明细"],
      "references": []
    }
  ],
  "dependencies": ["wb-checkbox","wb-tooltip"],
  "foundationKeys": ["color-border","color-border-hover","color-border-focus","color-border-disabled","color-text-primary","color-text-placeholder","color-text-secondary","color-text-disabled","color-icon-disabled","color-fill-default","color-fill-hover","color-fill-subtle-disabled","color-surface-card-default","color-info-primary-subtle","color-text-action","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","radius-sm","radius-md","radius-lg","shadow-sm","font-body-m","font-body-s","font-headline-m","color-surface-overlay","shadow-base"],
  "intro": "用于从有限的候选项中选择一个或多个值。正式WorkbenchSelect v1保持已批准的基础合同；搜索、清除、标签删除和尺寸扩展只属于Studio候选验证。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["选项数量较少且需要直接比较时，优先使用单选框或复选框；候选较多或表单布局需要节省空间时使用Select。"],
      "bullets": ["单选和多选均以数组形式传递modelValue；单选数组最多包含一个值。","正式WorkbenchSelect不提供搜索、清空、全选、标签删除、远程选项或浮层翻转。","WorkbenchSelectExtensions.vue中的defaultValue、searchable、clearable、removable、size、tagsLayout、分组和缩略图等只服务于Studio候选演示，不属于公开WorkbenchSelect API。"]
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["正式选择框默认32px高，独立使用默认宽296px；296px不是最小宽度。Modal和Drawer中的字段填满可用宽度，Form/Grid父容器负责栅格宽度。"],
      "bullets": ["字段标签、必填标记、错误和辅助说明由WorkbenchFormItem负责；裸控件的label用于可访问名称。","选项使用value、label和可选disabled；整行只有一个选项交互入口。多选通过已批准复选标记表达选择。","正式组件按已批准规则收起溢出标签为+N并保留可访问的完整名称；不将Studio候选的多行、可删标签等行为描述为正式能力。","面板和字段沿用已批准的描边、状态色、圆角、阴影及图标规则；页面位置由容器决定，组件不自行推断。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["打开面板后使用方向键移动选项，Enter或Space选择；Escape关闭面板。焦点离开选择器或其字段区域时关闭面板。"],
      "bullets": ["单选选择后提交一个值的数组并关闭；多选选择后更新数组并保持多选流程。","整体禁用或单个选项disabled时不可选择；键盘移动跳过禁用项。","焦点和悬浮状态由真实交互产生；state=\"disabled\"用于禁用，不通过state伪造focus或hover。","showPanel仅供预览检查，不作为业务交互模式。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["WorkbenchSelect只发出modelValue更新意图，不排序或远程加载候选数据，也不承担表单提交和裸控件验证。调用方负责维护候选项、提交和业务校验。"],
      "bullets": ["多选标签删除、搜索、清空等额外交互属于独立Studio候选扩展；不得从正式WorkbenchSelect导入或依赖这些候选属性。","通过WorkbenchFormItem组合字段时由表单项绘制标签和说明；独立使用时提供label作为可访问名称。","WorkbenchSelect没有公开具名插槽；候选扩展也不改变正式Catalog API。"]
    }
  ],
  "related": [{"label":"已批准Select规范","href":"#rules"},{"label":"Studio候选扩展组件","href":"/preview/select?view=examples"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "formal-single",
  "title": "正式API：单选",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-select","scenarioId":"select","exampleId":"formal-single","codeSha256":"sha256:95e270ab0b6115ceddf4c174834c0e4a04b11164f87a5f1877c9e60430feea2b"},
  "description": "可直接运行的受控单选示例；值数组、候选项和显示结果均已定义。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchFormItem, WorkbenchSelect } from "@workbench/ui-vue3"

const category = ref([])
const options = [
  { value: "channel", label: "渠道合作" },
  { value: "service", label: "服务支持" },
  { value: "other", label: "其他", disabled: true },
]
</script>
<template>
  <WorkbenchFormItem label="合作类型">
    <WorkbenchSelect v-model="category" label="合作类型" :options="options" />
  </WorkbenchFormItem>
  <output>已选：{{ category[0] || "未选择" }}</output>
</template>
```

### 其他官方来源条目（未展开代码）

```json
[
  {
    "id": "formal-multiple",
    "portability": "portable",
    "source": {"kind":"studio-official-usage","ownerAssetId":"wb-select","scenarioId":"select","exampleId":"formal-multiple","codeSha256":"sha256:0fe54f02571e09ed68d22586eb3f29f1b32707bbf773dd0ac156e118738659a3"},
    "unsupported": []
  }
]
```

以上条目的详细信息见[完整资料](<../../workbench/wb-select.md>)。

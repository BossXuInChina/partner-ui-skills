<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文字提示 Tooltip — `WorkbenchTooltip`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-tooltip`](<../../workbench/wb-tooltip.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-tooltip",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在控件附近补充简短、非必要的说明文字；不承载交互内容或关键信息。",
  "useWhen": ["悬停或键盘聚焦时显示短文本、溢出内容全文或静态标签。"],
  "avoidWhen": ["需要链接使用Popover；操作确认使用Popconfirm；不要在Tooltip里放可交互元素。","未经验证的公司内部UI框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "supported",
  "variantUnsupported": [],
  "caseSemantics": "Studio controls, not public component props"
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTooltip"},
  "props": {
    "content": {"type":"String","default":""},
    "placement": {
      "type": "String",
      "default": "top",
      "enum": [
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end"
      ]
    },
    "open": {"type":"Boolean","default":{"kind":"undefined"}},
    "disabled": {"type":"Boolean"},
    "overflowOnly": {"type":"Boolean"},
    "showArrow": {"type":"Boolean","default":true}
  },
  "events": ["update:open"],
  "eventDetails": null,
  "slots": ["trigger","content"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "content": "提示文本；可由content插槽替代。",
    "placement": "提示框优先方向及对齐方式。",
    "open": "可选受控显示状态；变化通过update:open通知父级。",
    "disabled": "禁用提示显示。",
    "overflowOnly": "仅当触发内容发生文本溢出时显示。",
    "showArrow": "是否显示指向触发器的箭头。"
  },
  "eventNotes": {"update:open":{"payload":"新的显示状态。","timing":"受控或非受控显示状态发生变化时发出；受控调用方应同步更新open。"}},
  "slotNotes": {
    "trigger": {"scope":"被解释的控件或文字；参数为open与aria对象，其中aria含aria-describedby。","description":"提示不能替代控件可访问名称。"},
    "content": {"scope":"自定义提示文案。","description":"保持简短纯说明；不放链接或交互按钮。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-tooltip-rule-1",
      "title": "用途与边界",
      "text": "悬停或键盘聚焦时显示短文本、溢出内容全文或静态标签。需要链接使用Popover；操作确认使用Popconfirm；不要在Tooltip里放可交互元素。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用文字提示 Tooltip"],
      "references": []
    },
    {
      "id": "wb-tooltip-rule-2",
      "title": "交互与状态",
      "text": "使用Foundation正文排版、浮层背景/阴影、radius-sm（4px圆角）。文字内边距上下4px、左右8px；标签容器四周均4px、标签间距4px。尾巴样式与尺寸继续引用Popover参数。showArrow默认true；关闭后主体与触发对象保持4px间距，不保留尾巴占位。多实例描述ID隔离，弹层不可抢占焦点。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用文字提示 Tooltip"],
      "references": []
    },
    {
      "id": "wb-tooltip-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| content | 纯文本；使用content插槽时可省略 |\n| placement | top（默认）、right、bottom、left及-start/-end，共12方向，非法值回退top |\n| open | 可选受控值，未传内部管理；通过update:open更新 |\n| disabled | 默认false，强制不显示 |\n| overflowOnly | 默认false；true时只在触发内容实际横向/纵向溢出时显示 |\n| showArrow | 默认true；false时隐藏箭头并移除箭头占位，主体与触发对象间距4px |\n\ntrigger插槽收到 {open,aria}；将aria绑定到单一可聚焦触发器。content插槽直接传入静态WorkbenchTag并覆盖content文本；组件提供四周4px内边距、4px标签间距，标签不得设置interactive或add/remove操作。唯一事件update:open(boolean)。content字符串不解析HTML。\n尺寸、内容变化及触发节点替换时重新测量溢出；无溢出即不显示。hover或focus-visible开启，Escape关闭，离开后可重新触发。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用文字提示 Tooltip"],
      "references": []
    }
  ],
  "dependencies": ["wb-popover"],
  "foundationKeys": [
    "color-surface-overlay",
    "color-text-primary",
    "font-body-m",
    "radius-sm",
    "shadow-lg",
    "spacing-component-xs",
    "spacing-component-sm"
  ],
  "intro": "在控件附近补充简短、非必要的说明文字；不承载交互内容或关键信息。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于解释图标按钮或省略文本；说明内容较长、包含链接或必须主动阅读时使用Popover。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["trigger插槽提供被说明对象；content可由字符串属性或content插槽提供。placement选择优先方向，showArrow控制箭头。"],
      "bullets": []
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["悬停或键盘聚焦触发对象时显示；Escape可关闭。overflowOnly仅在触发文本实际溢出时展示提示。"],"bullets":[]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchTooltip（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"文字提示 Tooltip组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "保存筛选提示",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-tooltip",
    "scenarioId": "tooltip",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:40ee6b20a7ccfac7d4e4e6f4c68e34001caddc0c09155c47149db35da92f85a8"
  },
  "description": "保存筛选提示业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchTooltip, WorkbenchButton } from '@workbench/ui-vue3'
</script>
<template><WorkbenchTooltip content="保存当前筛选条件" placement="top"><template #trigger="{ aria }"><WorkbenchButton v-bind="aria" appearance="secondary" aria-label="保存筛选">保存</WorkbenchButton></template></WorkbenchTooltip></template>
```

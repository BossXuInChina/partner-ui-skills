<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 卡片 Card — `WorkbenchCard`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-card`](<../../workbench/wb-card.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-card",
  "kind": "component",
  "version": "1.0.4",
  "summary": "用边界清晰的容器组织相关内容、元信息和操作；展示、运营操作与导航卡片有各自明确语义。",
  "useWhen": ["展示一组独立内容","在卡片内部承载多个独立操作","整张卡片作为单一原生地址跳转入口"],
  "avoidWhen": [
    "在整卡跳转内部嵌套按钮、链接或其他交互控件",
    "把Card尺寸用作非栅格环境中的固定像素宽度",
    "未经验证的内部框架生产实现",
    "使用页面背景色color-surface-page代替灰色卡片的color-surface-card-tinted"
  ],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "partial",
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCard"},
  "props": {
    "variant": {"type":"String","default":"display-white","enum":["display-white","display-tinted","operation","navigation"]},
    "size": {"type":"String","default":"xxxl","enum":["s","m","l","xl","xxl","xxxl"]},
    "href": {"type":"String","default":{"kind":"undefined"}},
    "target": {"type":"String","default":{"kind":"undefined"}},
    "rel": {"type":"String","default":{"kind":"undefined"}}
  },
  "events": [],
  "eventDetails": null,
  "slots": ["header","default","footer","actions"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [
    {
      "assetId": "wb-card",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCardGrid"},
      "props": {"showGrid":{"type":"Boolean","default":false}},
      "events": [],
      "slots": ["default"],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "variant": "display-white、display-tinted用于展示；operation用于包含独立操作；navigation用于整卡链接。",
    "size": "卡片的s至xxxl尺寸档位，影响布局尺寸，不改变内容语义。",
    "href": "navigation卡片的真实目标地址；其他variant不会生成链接。",
    "target": "navigation链接的打开目标。",
    "rel": "navigation链接的关系属性；新窗口使用安全关系值。"
  },
  "eventNotes": {},
  "slotNotes": {
    "header": {"scope":"卡片头部标题或元信息。","description":"需与正文区分层级；右侧异类操作应按规范分组。"},
    "default": {"scope":"卡片主要内容。","description":"由业务组件决定正文、表格或信息结构。"},
    "footer": {"scope":"补充元数据或状态。","description":"与actions独立，可同时存在且排在actions之前；关闭footer不会移除操作按钮。单独使用时保留普通底部间距。"},
    "actions": {"scope":"卡片底部操作。","description":"用于按钮组或文字操作，关闭后保留footer；内容到操作区间距及底部内边距均为24px，导航卡禁止该插槽。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-card-appearance",
      "title": "四种固定外观",
      "text": "display-white为白底无描边无阴影；display-tinted使用color-surface-card-tinted浅灰表面且无描边无阴影；operation为白底1px描边无阴影；navigation为白底无描边并使用交互阴影。页面背景color-surface-page不作为灰色卡片默认背景。",
      "strength": "must",
      "status": "confirmed",
      "when": ["选择Card外观"],
      "references": []
    },
    {
      "id": "wb-card-spacing",
      "title": "统一Card内边距与多卡间距",
      "text": "Card左右内边距24px、顶部20px；无actions时底部20px，有actions时正文到Action及Action到底部均为24px。仅有元数据footer不触发Action间距；多张Card由CardGrid以16px统一间距排列。",
      "strength": "must",
      "status": "confirmed",
      "when": ["展示Card或CardGrid"],
      "references": []
    },
    {
      "id": "wb-card-navigation",
      "title": "整卡跳转使用原生链接",
      "text": "navigation必须提供href并渲染原生a；默认shadow-sm，Hover时替换为shadow-md。Navigation内部不得嵌套按钮、链接或其他交互控件。",
      "strength": "must",
      "status": "confirmed",
      "when": ["整张Card作为唯一跳转入口"],
      "references": []
    },
    {
      "id": "wb-card-operation",
      "title": "卡内多操作不提升Card根节点",
      "text": "operation只提供白底描边容器，操作由内部Button、Link或表单控件独立承担；Card根节点不响应点击或键盘激活。 actions插槽负责底部操作且使用24px正文间距与24px底部内边距；footer元数据不视作actions。 同时提供footer元数据与actions时先显示footer，actions置于底部。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Card内部存在多个操作"],
      "references": []
    },
    {
      "id": "wb-card-size",
      "title": "六档栅格尺寸",
      "text": "s、m、l、xl、xxl、xxxl在24列CardGrid中分别占3、4、6、8、12、24列；12列区间保持目标列数但最大为12列；小于768px统一满宽。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Card位于WorkbenchCardGrid内"],
      "references": []
    },
    {
      "id": "wb-card-grid-visibility",
      "title": "可选栅格覆盖层",
      "text": "CardGrid通过showGrid显示当前实际的1、12或24列轨道；覆盖层不接收指针事件，不改变Card排布与交互。",
      "strength": "must",
      "status": "confirmed",
      "when": ["评审或调试Card栅格跨度"],
      "references": ["wb-card-size"]
    },
    {
      "id": "wb-card-header-slot-groups",
      "title": "Header右侧异类组件分组",
      "text": "Header右侧插槽同时嵌入不同类型组件时，相邻异类组件之间使用1×14px的color-border-separator-subtle竖分隔线，分隔线与左右组件均保持12px间距；单一类型不展示分隔线。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Header右侧插槽包含多种不同类型组件"],
      "references": []
    },
    {
      "id": "wb-card-footer-text-action-align",
      "title": "底部文字按钮视觉左对齐",
      "text": "底部插槽包含文字按钮时，文字按钮容器向左偏移8px以抵消按钮水平留白，使按钮文字与正文视觉左对齐；其他底部内容不应用该偏移。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Card底部插槽包含文字按钮"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-surface-card-default",
    "color-surface-card-tinted",
    "color-border",
    "color-border-focus",
    "color-border-separator-subtle",
    "color-fill-selected",
    "spacing-layout-container-inline",
    "spacing-layout-container-block",
    "spacing-dialog-padding-block-end-with-actions",
    "spacing-layout-action-gap",
    "spacing-layout-card-gap",
    "spacing-component-md",
    "spacing-component-sm",
    "radius-lg",
    "shadow-sm",
    "shadow-md",
    "font-body-s",
    "layout-grid-breakpoint-medium",
    "layout-grid-breakpoint-wide",
    "layout-grid-columns-medium",
    "layout-grid-columns-wide"
  ],
  "intro": "用边界清晰的容器组织相关内容、元信息和操作；展示、运营操作与导航卡片有各自明确语义。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["卡片适合内容分组和摘要入口；需要可点击导航时用navigation并提供真实href；卡片内有多个独立操作时使用operation，避免整卡链接包裹交互控件。"],
      "bullets": []
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": [
        "variant决定展示、浅色展示、操作或导航职责；size决定尺寸落位。header、正文、footer元数据、actions操作区职责不同；Grid负责响应式排列。",
        "footer与actions可同时存在，顺序为正文、底部辅助内容、底部操作区。新版操作卡片中两者独立配置，关闭其中一项不会影响另一项；按钮应放入actions。"
      ],
      "bullets": []
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["只有navigation卡片产生原生链接，可通过键盘激活并显示焦点。Navigation内部禁止嵌套按钮、链接、输入控件或actions插槽。"],
      "bullets": []
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchCard（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    },
    {
      "id": "block-selection",
      "title": "四类 Block 与 Pattern",
      "paragraphs": [
        "数值、信息、图文、快捷应用是四类已登记Block。单行、多行、单列、表面与内容结构是各自配置；四种基础variant继续属于WorkbenchCard Component。四类Block已登记为Catalog资产并通过公共包导出，当前资格仍为prototype-only；人工逐项视觉验收单列。",
        "跨卡片编排、批量操作和导航协同归Pattern：父Grid管理卡片间16px间距，卡片管理内部24/20留白。出现实际重复使用场景后再登记Pattern。"
      ]
    },
    {
      "id": "block-common-api",
      "title": "Block 通用 API",
      "paragraphs": [
        "title:string；信息、图文支持display-white/display-tinted/operation/navigation；数值和快捷应用仅支持display-white。size:s/m/l/xl/xxl/xxxl（默认xxxl）；信息与图文导航使用href、target、rel。headerActions和actions均为Action[]，默认[]；footer为null或metadata/progress对象，默认null。结构顺序固定为header、正文、footer、actions。",
        "Action = { id:string, label:string, appearance?:primary/secondary/text/icon, icon?:已登记图标名, disabled?:boolean }。action事件返回{id,source:header/actions,event:MouseEvent}，业务执行与持久化由调用方负责。",
        "footer = {kind:metadata,text:string} | {kind:progress,value:number,label?:string} | null；进度归一到0至100并提供原生progress语义。辅助内容与动作各自启用，关闭后移除对应容器。",
        "共同slots为header、header-actions、footer、actions。存在内容的slot覆盖同名props；空slot不留下占位。导航模式只渲染数据驱动的被动内容，忽略所有可注入交互的slots与操作数组；缺少href时沿用基础Card的展示降级。"
      ]
    },
    {
      "id": "block-data-api",
      "title": "四类 Block 数据与插槽",
      "bullets": [
        "WorkbenchMetricCard：layout=row/multi/column，items: {id,label,value?:string|number|null,truncate?:boolean}[]。默认row/[]；数值0保留，缺省值显示破折号。icon和item slot取得{item,index}；empty slot用于空列表。",
        "WorkbenchInformationCard：structure=icon/text-action（默认icon），bodySize=14（默认14，正文固定使用Body M），description:string和tags:string[]。icon、content slot定制对应区域；footer进度独立传入。",
        "WorkbenchMediaCard：mediaKind=image/video（默认image），mediaLabel:string，badge:string，bodySize=14（默认14，正文固定使用Body M），description、tags。media和content slot定制封面与正文；header-actions放在正文标题右侧。封面默认204高、卡片最大608宽。",
        "WorkbenchQuickAppCard：layout=row/multi/column，items:{id,label,icon?,href?,target?,rel?,disabled?}[]。默认row/[]；有href为原生a，缺href为原生button，activate返回{item,event}且不阻止链接默认导航。item slot取得{item,index}，不嵌套交互；empty slot定制空内容。"
      ]
    },
    {
      "id": "block-responsive",
      "title": "容器响应式与有意调整",
      "paragraphs": [
        "数值项按图示、间距和标签所需宽度自适应列数，单行最多6列、多行最多4列，窄容器逐步减少至1列；快捷应用继续使用单行6→3列、多行4→2列的容器断点，单列上限218。CardGrid仍使用768/1280容器断点。",
        "图文默认示例不附辅助文字，底部按钮使用actions；辅助内容可按需单独配置。快捷应用新增真实链接、按钮、禁用和键盘焦点。其余默认视觉按冻结原版逐项对照，原版保留独立入口。"
      ]
    }
  ],
  "related": [{"label":"卡片 Card组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`partial`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "operation-footer-actions",
  "title": "辅助信息与操作区共存",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-card",
    "scenarioId": "card",
    "exampleId": "operation-footer-actions",
    "codeSha256": "sha256:c745f98f3695fb6d85dacbf2e5eae38918c8ca073c6ad7e721e6ae38a988a059"
  },
  "description": "进度、更新时间等放入footer；操作按钮放入actions，两者分别按实际内容启用。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchButton, WorkbenchCard } from '@workbench/ui-vue3'
</script>
<template>
  <WorkbenchCard variant="operation" size="xxl">
    <template #header>项目审核</template>
    <p>项目资料已填写，等待提交审核。</p>
    <template #footer><p>更新时间：今天 10:24</p></template>
    <template #actions><WorkbenchButton appearance="primary" size="28">提交审核</WorkbenchButton></template>
  </WorkbenchCard>
</template>
```

### 其他官方来源条目（未展开代码）

```json
[
  {
    "id": "project-summary-card",
    "portability": "portable",
    "source": {
      "kind": "studio-official-usage",
      "ownerAssetId": "wb-card",
      "scenarioId": "card",
      "exampleId": "project-summary-card",
      "codeSha256": "sha256:054a5ca68639018189d9147e2a7de3a23444225b25795b3452857132f5377244"
    },
    "unsupported": []
  },
  {
    "id": "metric-block",
    "portability": "unsupported",
    "source": {
      "kind": "studio-official-usage",
      "ownerAssetId": "wb-card",
      "scenarioId": "card",
      "exampleId": "metric-block",
      "codeSha256": "sha256:3842fbdf1dbcf47b94891d99924307f03161b907890ca7faf2d9a1b438a5cb12"
    },
    "unsupported": [
      {
        "code": "TARGET_NOT_RENDERED",
        "reason": "The official SFC does not statically render the requested public component or a public member of its asset family."
      }
    ]
  },
  {
    "id": "information-block",
    "portability": "unsupported",
    "source": {
      "kind": "studio-official-usage",
      "ownerAssetId": "wb-card",
      "scenarioId": "card",
      "exampleId": "information-block",
      "codeSha256": "sha256:e302bc849eb6dcdc8d36245c487a7357339cae6361d7493a40ddc0e52ad98a8c"
    },
    "unsupported": [
      {
        "code": "TARGET_NOT_RENDERED",
        "reason": "The official SFC does not statically render the requested public component or a public member of its asset family."
      }
    ]
  },
  {
    "id": "media-block",
    "portability": "unsupported",
    "source": {
      "kind": "studio-official-usage",
      "ownerAssetId": "wb-card",
      "scenarioId": "card",
      "exampleId": "media-block",
      "codeSha256": "sha256:e2c8f426da138817945df230331e184f9b9c6f4b61fb5320d6520ef14f9c470f"
    },
    "unsupported": [
      {
        "code": "TARGET_NOT_RENDERED",
        "reason": "The official SFC does not statically render the requested public component or a public member of its asset family."
      }
    ]
  },
  {
    "id": "quick-app-block",
    "portability": "unsupported",
    "source": {
      "kind": "studio-official-usage",
      "ownerAssetId": "wb-card",
      "scenarioId": "card",
      "exampleId": "quick-app-block",
      "codeSha256": "sha256:a780a3462b2c004249b1b37bd8e086f0364cfbaba9ca06ee8b3489514f440bbe"
    },
    "unsupported": [
      {
        "code": "TARGET_NOT_RENDERED",
        "reason": "The official SFC does not statically render the requested public component or a public member of its asset family."
      }
    ]
  }
]
```

以上条目的详细信息见[完整资料](<../../workbench/wb-card.md>)。

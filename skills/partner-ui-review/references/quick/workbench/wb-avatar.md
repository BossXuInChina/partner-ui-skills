<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 头像 Avatar — `WorkbenchAvatar`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-avatar`](<../../workbench/wb-avatar.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-avatar",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于呈现用户或事物身份标识。点击、菜单和导航行为由外围具名按钮或链接负责。",
  "useWhen": ["以文字、图标或图片标识用户和事物","通讯录、表格或顶部导航的头像与头像组"],
  "avoidWhen": ["用头像代替有明确名称的交互按钮","未经生产接入验证直接作为生产包交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchAvatar"},
  "props": {
    "size": {"type":["Number","String"],"default":60},
    "color": {"type":"String","default":"default"},
    "text": {"type":"String","default":"A"},
    "src": {"type":"String","default":""},
    "icon": {"type":"Boolean"},
    "label": {"type":"String","default":""}
  },
  "events": ["error"],
  "slots": ["icon"],
  "family": [
    {
      "assetId": "wb-avatar",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchAvatarGroup"},
      "props": {"items":{"type":"Array","default":{"kind":"function"}},"layout":{"type":"String","default":"row"},"label":{"type":"String","default":"头像组"}},
      "events": [],
      "slots": [],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {"size":"头像尺寸24、40、48、60、80或120，默认60；可传对应数字字符串。","color":"已支持的背景颜色名称。","text":"调用方提供的1–2字素显示文本，默认A。","src":"可选图片地址；加载失败回退显示内容。","icon":"显示内置或插槽人像图形。","label":"完整可访问名称；未传时使用文本或“用户头像”。"},
  "eventNotes": {"error":{"payload":"原生图片加载Event。","timing":"src图片加载失败时发出；组件回退到文本或人像。"}},
  "slotNotes": {"icon":{"scope":"无","description":"替换头像内置人像内容；槽内容应作为装饰图形使用。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed（不代表支持）

## 规则与适用条件

```json
{
  "foundationKeys": ["color-text-inverse","radius-full","font-headline-xxs","font-headline-s","font-headline-xl"],
  "intro": "用于呈现用户或事物身份标识。点击、菜单和导航行为由外围具名按钮或链接负责。",
  "sections": [
    {"id":"identity","title":"身份与图片回退","paragraphs":["有src时优先显示居中裁切头像图；加载失败回退到文本或内置人像。text由调用方提供一个或两个字素，不自动推断姓名缩写。"],"bullets":["label提供完整可访问身份名称。","icon无图片时显示人像；icon槽可替换人像图形。"]},
    {
      "id": "size",
      "title": "尺寸与组合",
      "paragraphs": ["单头像size支持24、40、48、60、80、120；48px为角色卡场景新增尺寸；color支持default、blue、cyan、indigo、green、orange、purple。"],
      "bullets": ["WorkbenchAvatarGroup是同族辅助组件：单行固定24px头像；multiline仅对3或4人启用。","头像仅提供身份语义，不带点击或菜单行为。"]
    }
  ]
}
```

未声明或为空：rules、dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "reviewer-identity",
  "title": "审核人身份",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-avatar","scenarioId":"avatar","exampleId":"reviewer-identity","codeSha256":"sha256:ad4ca2e4f9ee89ea90fc14b5e3c9466a67bcdf2b457d8a32f8109192d7463713"},
  "description": "展示单个审核人头像和多人头像组，交互行为由外部控件提供。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchAvatar, WorkbenchAvatarGroup } from '@workbench/ui-vue3'
const reviewers = [
  { id: 'a', text: '张明', label: '张明' },
  { id: 'b', text: '林悦', label: '林悦', color: 'blue' },
  { id: 'c', text: '陈杰', label: '陈杰', color: 'green' },
]
</script>
<template>
  <WorkbenchAvatar :size="40" text="张明" label="审核人张明" />
  <WorkbenchAvatarGroup :items="reviewers" label="共同审核人" />
</template>
```

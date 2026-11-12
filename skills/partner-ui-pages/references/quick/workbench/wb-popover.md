<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 气泡框 Popover — `WorkbenchPopover`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-popover`](<../../workbench/wb-popover.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-popover",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在触发元素附近展示需要阅读的补充说明，可包含正文链接；不用于操作菜单或确认任务。",
  "useWhen": ["在触发元素附近提供可含链接的补充说明"],
  "avoidWhen": ["仅需纯文本悬停提示","需要点击触发的菜单或确认操作","未经验证的内部 UI 框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchPopover"},
  "props": {
    "placement": {"type":"String","default":"top","enum":["top-start","top","top-end","right-start","right","right-end","bottom-start","bottom","bottom-end","left-start","left","left-end"]},
    "title": {"type":"String","default":""},
    "open": {"type":"Boolean","default":{"kind":"undefined"}},
    "disabled": {"type":"Boolean"},
    "ariaLabel": {"type":"String","default":"说明气泡"}
  },
  "events": ["update:open"],
  "slots": ["trigger","default"],
  "propNotes": {"placement":"首选面板方向及对齐方式；空间不足会翻转或夹紧。","title":"可选说明标题；空字符串表示无标题。","open":"可选受控打开状态；不传时内部管理，传入时响应update:open。","disabled":"禁用并强制关闭气泡。","ariaLabel":"说明面板的可访问名称。"},
  "eventNotes": {"update:open":{"payload":"新的打开状态。","timing":"受控或非受控打开状态发生变化时发出；受控调用方应同步更新open。"}},
  "slotNotes": {"trigger":{"scope":"触发气泡的元素；插槽参数含open与aria。","description":"将aria属性绑定到可操作触发元素以保持关联和状态。"},"default":{"scope":"说明面板正文，可包含内嵌链接。","description":"提供可读说明内容；复杂操作请改用专门交互组件。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-popover-rule-1",
      "title": "内容与视觉合同",
      "text": "正文默认插槽必填，可在其中嵌入正式 WorkbenchLink；title 可选。标题使用 font-headline-s（16/24、500），标题与正文间距8px；无标题时正文使用 color-text-primary，有标题时正文使用 color-text-secondary，正文排版为 font-body-m（14/22、400）。主体使用 color-surface-overlay、radius-md、shadow-lg、16px 内边距，最大宽度452px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["展示气泡说明"],
      "references": []
    },
    {
      "id": "wb-popover-rule-2",
      "title": "方向与尾巴合同",
      "text": "placement 支持 top/right/bottom/left 的 start/center/end 三档。尾巴沿边缘宽12px、外伸8px，仅尖端使用4px圆角，与主体连接的两侧保持直角；start/end 尾巴中心距对应主体边缘16px，center 居中。指定方向空间不足时自动翻转到对侧，横轴或纵轴不足时夹紧于视口。",
      "strength": "must",
      "status": "confirmed",
      "when": ["指定气泡方向"],
      "references": []
    },
    {
      "id": "wb-popover-rule-3",
      "title": "悬停与键盘合同",
      "text": "触发器和面板任一悬停或获得焦点时保持打开；离开二者且焦点不在组合内时关闭。open 未传时内部控制，传入时响应 update:open；disabled 强制关闭。Esc 关闭并将焦点返回触发器。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用 Popover"],
      "references": []
    }
  ],
  "dependencies": ["wb-link"],
  "foundationKeys": ["color-surface-overlay","color-text-primary","color-text-secondary","font-headline-s","font-body-m","radius-md","shadow-lg","spacing-component-lg","spacing-component-sm"],
  "intro": "在触发元素附近展示需要阅读的补充说明，可包含正文链接；不用于操作菜单或确认任务。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["内容较长、需要阅读或包含内嵌链接时用Popover；短文本提示用Tooltip；操作选择用菜单或Popconfirm。"],"bullets":[]},
    {"id":"structure","title":"设计结构与排版","paragraphs":["trigger插槽是触发元素，default插槽是说明面板；title可选。面板按指定方向展示，空间不足会翻转并保持在视口内。"],"bullets":[]},
    {"id":"interaction","title":"交互与键盘","paragraphs":["触发器或面板悬停、聚焦时保持打开；Esc关闭并把焦点还给触发器。面板内链接可正常聚焦与导航。"],"bullets":[]},
    {"id":"responsibility","title":"使用边界与职责","paragraphs":["组件公开入口为 WorkbenchPopover（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],"bullets":[]}
  ],
  "related": [{"label":"气泡框 Popover组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "同步状态说明气泡",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-popover",
    "scenarioId": "popover",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:d1b3da28a97ccbd2a7513c40b6d512fd1f5edce9dfaa4ee29b58475fd7559144"
  },
  "description": "同步状态说明气泡业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchPopover, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
</script>
<template>
  <WorkbenchPopover v-model:open="open" title="同步说明" placement="bottom-start" aria-label="同步状态说明">
    <template #trigger="{ aria }"><WorkbenchButton appearance="secondary" v-bind="aria">同步状态</WorkbenchButton></template>
    <p>最近一次同步于今天 09:30 完成。</p>
  </WorkbenchPopover>
</template>
```

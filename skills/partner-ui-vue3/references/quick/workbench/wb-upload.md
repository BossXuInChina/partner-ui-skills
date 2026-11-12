<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文件上传 Upload — `WorkbenchUpload`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-upload`](<../../workbench/wb-upload.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-upload",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于选择并管理文件记录，支持点击或拖拽入口、文本/精简/卡片列表。上传传输由消费方提供或显式提交。",
  "useWhen": ["文件上传 Upload相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchUpload"},
  "props": {
    "modelValue": {"type":"Array","default":{"kind":"function"}},
    "mode": {"type":"String","default":"click","enum":["click","drag"]},
    "listType": {"type":"String","default":"text","enum":["text","compact","card"]},
    "accept": {"type":"String","default":".doc,.xlsx,.pdf"},
    "maxSize": {"type":"Number","default":{"kind":"unknown","expression":"5 * 1024 * 1024"}},
    "limit": {"type":"Number","default":0},
    "multiple": {"type":"Boolean","default":true},
    "disabled": {"type":"Boolean"},
    "background": {"type":"Boolean"},
    "showTrigger": {"type":"Boolean","default":true},
    "autoUpload": {"type":"Boolean","default":true},
    "customRequest": {"type":"Function","default":{"kind":"undefined"}},
    "beforeUpload": {"type":"Function","default":{"kind":"undefined"}},
    "hint": {"type":"String","default":{"kind":"undefined"}},
    "label": {"type":"String","default":"文件上传"},
    "previewState": {"type":"String","default":"default"}
  },
  "events": ["update:modelValue","change","select","progress","success","error","reject","remove","pause","resume","preview","download"],
  "exposed": [
    {"name":"selectFiles","declaration":"selectFiles(source?: Iterable<File> | ArrayLike<File> | null): Promise<void>;"},
    {"name":"submit","declaration":"submit(): Promise<void[]> | undefined;"},
    {"name":"pause","declaration":"pause(file: {id: string | number; status?: string}): void;"},
    {"name":"resume","declaration":"resume(file: {id: string | number}): void;"},
    {"name":"retry","declaration":"retry(file: {id: string | number}): void;"},
    {"name":"remove","declaration":"remove(file: {id: string | number}): void;"}
  ],
  "family": [
    {
      "assetId": "wb-upload",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchUploadFileItem"},
      "props": {"listType":{"type":"String","default":"text"},"background":{"type":"Boolean"},"disabled":{"type":"Boolean"},"previewState":{"type":"String","default":"default"}},
      "events": ["remove","retry","pause","resume","preview","download"],
      "slots": [],
      "slotPatterns": [],
      "exposed": []
    },
    {
      "assetId": "wb-upload",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchUploadFileList"},
      "props": {
        "files": {"type":"Array","default":{"kind":"function"}},
        "listType": {"type":"String","default":"text"},
        "background": {"type":"Boolean"},
        "disabled": {"type":"Boolean"},
        "previewState": {"type":"String","default":"default"},
        "label": {"type":"String","default":"附件列表"}
      },
      "events": ["remove","retry","pause","resume","preview","download"],
      "slots": [],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "modelValue": "受控文件记录数组；每条记录应提供稳定id。",
    "mode": "click或drag上传入口。",
    "listType": "text、compact或card列表样式。",
    "accept": "文件选择器可接受的扩展名或MIME约束。",
    "maxSize": "单文件最大字节数。",
    "limit": "文件数量上限；0表示不限制。",
    "multiple": "是否允许一次选择多个文件。",
    "autoUpload": "选择后是否自动发起传输。",
    "customRequest": "消费方提供并返回传输结果的异步函数，接收{ file, record, signal, loaded, onProgress }；onProgress可接收百分比数字或{ loaded, total }。无函数时不模拟成功。",
    "beforeUpload": "上传前同步或异步准入判断入口。",
    "previewState": "Studio状态演示参数，不代表业务状态存储。",
    "disabled": "禁用文件选择及文件操作。",
    "background": "是否显示文件组背景。",
    "showTrigger": "是否显示选择文件入口。",
    "hint": "上传入口的辅助说明文案。",
    "label": "上传控件的可访问名称。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的文件记录数组。","timing":"选择、状态更新或移除记录后同步发出。"},
    "select": {"payload":"逐个文件发出规范化记录，包含id、name、size、type、raw、status及percentage。","timing":"每个文件通过校验并加入列表后发出。"},
    "progress": {"payload":"单个更新后的文件记录，percentage字段表示当前进度。","timing":"传输回调报告进度时发出。"},
    "success": {"payload":"(record, result)：上传完成的文件记录及customRequest返回值。","timing":"customRequest成功完成时发出。"},
    "error": {"payload":"(error, record)：传输错误对象及更新为失败状态的文件记录。","timing":"传输失败时发出。"},
    "reject": {"payload":"{ file, reason, message }。","timing":"文件不符合准入规则时发出。"},
    "preview": {"payload":"待预览文件记录。","timing":"用户触发预览操作时发出。"},
    "download": {"payload":"请求下载的文件记录。","timing":"用户激活下载操作时发出。"},
    "change": {"payload":"更新后的文件记录数组。","timing":"文件集合或记录状态变化时发出。"},
    "remove": {"payload":"被移除的文件记录。","timing":"用户移除文件时发出。"},
    "pause": {"payload":"暂停的文件记录。","timing":"上传任务暂停时发出。"},
    "resume": {"payload":"继续上传的文件记录。","timing":"上传任务继续时发出。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "dependencies": ["wb-button"],
  "foundationKeys": ["color-text-primary","color-text-secondary","color-text-disabled","color-text-action","color-border","color-border-focus","color-fill-hover","color-surface-container","color-error","color-success","font-body-m","font-body-s","radius-sm"],
  "intro": "用于选择并管理文件记录，支持点击或拖拽入口、文本/精简/卡片列表。上传传输由消费方提供或显式提交。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["根据页面空间选择click或drag模式，并用listType选择text、compact或card列表。"],"bullets":["需要图片缩略图网格时使用WorkbenchImageUpload。","文件扩展名图形由独立WorkbenchFileIcon资源组件提供。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["WorkbenchUpload管理受控文件数组；单个文件记录包含稳定id、名称、大小、状态等字段。"],
      "bullets": ["drag模式默认展示card列表；compact适合行内附件展示。","limit为0表示不限制数量；展示用文件组数量不构成业务数量规则。","文件行的预览和下载操作由消费方处理。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["无transport时选择文件只产生ready记录并发出select，不模拟上传成功。"],
      "bullets": ["customRequest负责传输；进度通过onProgress反馈。","上传中支持暂停、继续或取消；失败后可重试；删除或卸载会中止请求。","beforeUpload用于上传前校验；拒绝项通过reject事件说明。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["消费方负责服务端上传、鉴权、断点续传以及成功后的预览和下载处理。"],
      "bullets": ["暂停会中止当前请求，继续时重新调用customRequest并传入已传输量；真正断点续传由服务实现。","组件不擅自打开外部预览或下载地址。","WorkbenchUpload、WorkbenchUploadFileItem/List及WorkbenchFileIcon资格和公开入口各自独立，勿以Studio演示替代正式API。"]
    }
  ],
  "related": [{"label":"文件上传批准规范","href":"#rules"},{"label":"文件图标资源","href":"/preview/upload?view=icons"},{"label":"文件行与列表API","href":"#family"}]
}
```

未声明或为空：rules（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "manual-upload",
  "title": "手动提交文件",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-upload","scenarioId":"upload","exampleId":"manual-upload","codeSha256":"sha256:abaf64d4279494c751c6f0accfa8edc6952baf126cdea6e8ef0cff9236582f19"},
  "description": "选择与传输分开：例子保留ready记录，不依赖未定义服务或模拟成功。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchUpload } from "@workbench/ui-vue3"
const files = ref([])
</script>
<template>
  <WorkbenchUpload v-model="files" mode="click" list-type="text" :auto-upload="false" label="附件" />
  <output>{{ files.length }} 个已选择文件</output>
</template>
```

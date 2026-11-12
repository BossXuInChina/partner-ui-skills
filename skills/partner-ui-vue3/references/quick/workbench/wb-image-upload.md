<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 图片上传 ImageUpload — `WorkbenchImageUpload`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-image-upload`](<../../workbench/wb-image-upload.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-image-upload",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于选择与展示图片缩略图，支持多图、数量与大小限制、预览、单张下载及批量下载。",
  "useWhen": ["图片上传 ImageUpload相关交互与状态展示"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchImageUpload"},
  "props": {
    "modelValue": {"type":"Array","default":{"kind":"undefined"}},
    "defaultValue": {"type":"Array","default":{"kind":"function"}},
    "multiple": {"type":"Boolean","default":true},
    "maxCount": {"type":"Number","default":5},
    "maxSize": {"type":"Number","default":{"kind":"unknown","expression":"500 * 1024"}},
    "accept": {"type":"String","default":"image/jpeg,image/png"},
    "disabled": {"type":"Boolean"},
    "showNames": {"type":"Boolean","default":true},
    "downloadable": {"type":"Boolean"},
    "batchDownload": {"type":"Boolean"},
    "hint": {"type":"String","default":{"kind":"undefined"}},
    "label": {"type":"String","default":"图片上传"},
    "uploadRequest": {"type":"Function","default":{"kind":"undefined"}},
    "previewState": {"type":"String","default":"default"}
  },
  "events": ["update:modelValue","change","reject","progress","success","error","cancel","remove","retry","preview","download","batch-download"],
  "exposed": [
    {"name":"selectFiles","declaration":"selectFiles(): void;"},
    {"name":"retry","declaration":"retry(item: {id: string | number}): void;"},
    {"name":"cancel","declaration":"cancel(item: {id: string | number}): void;"}
  ],
  "family": [
    {
      "assetId": "wb-image-upload",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchImageUploadTile"},
      "props": {
        "item": {"type":"Object","required":true},
        "disabled": {"type":"Boolean"},
        "showName": {"type":"Boolean","default":true},
        "downloadable": {"type":"Boolean"},
        "previewState": {"type":"String","default":"default"}
      },
      "events": ["preview","download","remove","retry","cancel"],
      "slots": [],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "modelValue": "受控图片记录数组；省略时组件按本地非受控状态工作。",
    "defaultValue": "非受控模式初始图片记录。",
    "multiple": "是否允许添加多张图片。",
    "maxCount": "允许的图片数量上限。",
    "maxSize": "单张图片最大字节数。",
    "accept": "文件选择器接受的图片类型。",
    "uploadRequest": "消费方提供的异步上传函数，接收(file, { item, signal, onProgress })；item为当前记录快照，onProgress接收0到100的数值。",
    "showNames": "是否显示图片名称。",
    "downloadable": "是否提供单张下载操作。",
    "batchDownload": "是否提供批量下载操作。",
    "previewState": "Studio预览状态参数。",
    "disabled": "禁用文件选择及图片操作。",
    "hint": "上传区域的辅助说明。",
    "label": "图片上传控件的可访问名称。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的图片记录数组。","timing":"选择、上传状态变化或移除图片时发出。"},
    "change": {"payload":"当前图片记录数组。","timing":"图片集合发生变化时发出。"},
    "reject": {"payload":"被拒绝的文件及原因。","timing":"文件类型、大小或数量不符合限制时发出。"},
    "progress": {"payload":"{ id, progress }，图片记录标识及0到100的进度数值。","timing":"uploadRequest报告进度时发出。"},
    "success": {"payload":"{ id, result }，图片记录标识及uploadRequest返回值。","timing":"uploadRequest成功完成时发出。"},
    "error": {"payload":"{ id, error }，图片记录标识及上传错误对象。","timing":"uploadRequest失败时发出。"},
    "cancel": {"payload":"被取消的图片项。","timing":"用户取消上传时发出。"},
    "remove": {"payload":"被移除图片项。","timing":"用户删除图片时发出。"},
    "retry": {"payload":"待重试图片项。","timing":"用户请求重新上传时发出。"},
    "preview": {"payload":"待预览图片项。","timing":"用户请求查看图片时发出。"},
    "download": {"payload":"待下载图片项。","timing":"用户请求下载时发出。"},
    "batch-download": {"payload":"批量下载所选图片项。","timing":"用户触发批量下载时发出。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "dependencies": ["wb-button","wb-modal"],
  "foundationKeys": ["color-text-primary","color-text-secondary","color-text-disabled","color-border","color-border-focus","color-error","font-body-s","font-body-m"],
  "intro": "用于选择与展示图片缩略图，支持多图、数量与大小限制、预览、单张下载及批量下载。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["图片网格上传使用WorkbenchImageUpload；通用附件列表使用WorkbenchUpload。"],"bullets":["默认多选最多5张，单图可设置multiple=false。","需要上传过程时通过uploadRequest接入消费方传输实现。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["图片记录以稳定id标识；成功项可包含url，上传过程携带status和progress。"],
      "bullets": ["showNames控制名称展示；downloadable启用单项下载，batchDownload启用批量操作。","原始图片文件由组件管理预览；不会直接修改调用方传入数组或记录。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["悬浮或键盘聚焦时显示预览、删除等操作；触屏设备持续显示操作入口。"],
      "bullets": ["上传请求可接收AbortSignal和进度回调；取消、删除及卸载会终止当前任务。","禁用状态阻止选择、取消、重试、删除和下载。","超出accept、maxSize或maxCount时通过reject反馈。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["uploadRequest由消费方连接真实服务；组件不提供服务端存储或鉴权。"],
      "bullets": ["modelValue受控；defaultValue仅在非受控用法下初始化。","批量下载需要消费方允许并提供可访问图片URL；下载格式及服务权限由业务负责。","Studio中的previewState只用于状态展示。"]
    }
  ],
  "related": [{"label":"图片上传规范","href":"#rules"},{"label":"图片项辅助组件API","href":"#family"}]
}
```

未声明或为空：rules（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "upload-images",
  "title": "受控图片上传",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-image-upload",
    "scenarioId": "image-upload",
    "exampleId": "upload-images",
    "codeSha256": "sha256:cc17f1c8ecb092edcce0d311dff8c6e4ed650e8b245e8c32ccd83545fd01111c"
  },
  "description": "使用完整本地传输函数签名；示例不依赖远程接口。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchImageUpload } from "@workbench/ui-vue3"
const images = ref([])
async function uploadImage(file, { onProgress, signal }) {
  if (signal.aborted) throw new DOMException("Aborted", "AbortError")
  onProgress(100)
  return { url: URL.createObjectURL(file) }
}
</script>
<template>
  <WorkbenchImageUpload v-model="images" :upload-request="uploadImage" :max-count="5" label="项目图片" />
  <output>{{ images.length }} 张图片</output>
</template>
```

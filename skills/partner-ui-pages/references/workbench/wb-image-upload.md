<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 图片上传 ImageUpload — `WorkbenchImageUpload`

资产：`wb-image-upload` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=preview)

用于选择与展示图片缩略图，支持多图、数量与大小限制、预览、单张下载及批量下载。

公开入口：`@workbench/ui-vue3` → `WorkbenchImageUpload`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 组件状态 | 默认 | demoState-default | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 上传中 | demoState-uploading | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 上传失败 | demoState-error | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 上传成功 | demoState-success | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 悬浮操作 | demoState-hover | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 达到上限 | demoState-limit | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 组件状态 | 超长文件名 | demoState-long | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 多张上传 | 关闭 | multiple-false | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 多张上传 | 开启 | multiple-true | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 图片名称 | 关闭 | showNames-false | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 图片名称 | 开启 | showNames-true | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 单张下载 | 关闭 | downloadable-false | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 单张下载 | 开启 | downloadable-true | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 批量下载 | 关闭 | batchDownload-false | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 批量下载 | 开启 | batchDownload-true | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 首次上传失败演示 | 关闭 | failOnce-false | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 首次上传失败演示 | 开启 | failOnce-true | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 上传上限 | 1 | maxCount-1 | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |
| 上传上限 | 5 | maxCount-5 | [案例](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-default",
    "group": "组件状态",
    "label": "默认",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-uploading",
    "group": "组件状态",
    "label": "上传中",
    "controls": {
      "demoState": "uploading",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-error",
    "group": "组件状态",
    "label": "上传失败",
    "controls": {
      "demoState": "error",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-success",
    "group": "组件状态",
    "label": "上传成功",
    "controls": {
      "demoState": "success",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-hover",
    "group": "组件状态",
    "label": "悬浮操作",
    "controls": {
      "demoState": "hover",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-limit",
    "group": "组件状态",
    "label": "达到上限",
    "controls": {
      "demoState": "limit",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-disabled",
    "group": "组件状态",
    "label": "禁用",
    "controls": {
      "demoState": "disabled",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "demoState-long",
    "group": "组件状态",
    "label": "超长文件名",
    "controls": {
      "demoState": "long",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "multiple-false",
    "group": "多张上传",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "multiple": false,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "multiple-true",
    "group": "多张上传",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "showNames-false",
    "group": "图片名称",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": false,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "showNames-true",
    "group": "图片名称",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "downloadable-false",
    "group": "单张下载",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "downloadable-true",
    "group": "单张下载",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": true,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "batchDownload-false",
    "group": "批量下载",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": true,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "batchDownload-true",
    "group": "批量下载",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": true,
      "batchDownload": true,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "failOnce-false",
    "group": "首次上传失败演示",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "failOnce-true",
    "group": "首次上传失败演示",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": true,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "maxCount-1",
    "group": "上传上限",
    "label": "1",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 1,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  },
  {
    "id": "maxCount-5",
    "group": "上传上限",
    "label": "5",
    "controls": {
      "demoState": "default",
      "multiple": true,
      "showNames": true,
      "downloadable": false,
      "batchDownload": false,
      "failOnce": false,
      "maxCount": 5,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=states"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    },
    {
      "id": "uploading",
      "label": "上传中"
    },
    {
      "id": "error",
      "label": "上传失败"
    },
    {
      "id": "success",
      "label": "上传成功"
    },
    {
      "id": "hover",
      "label": "悬浮操作"
    },
    {
      "id": "limit",
      "label": "达到上限"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "long",
      "label": "超长文件名"
    }
  ],
  "controls": [
    {
      "id": "multiple",
      "label": "多张上传",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showNames",
      "label": "图片名称",
      "type": "boolean",
      "default": true
    },
    {
      "id": "downloadable",
      "label": "单张下载",
      "type": "boolean",
      "default": false
    },
    {
      "id": "batchDownload",
      "label": "批量下载",
      "type": "boolean",
      "default": false
    },
    {
      "id": "failOnce",
      "label": "首次上传失败演示",
      "type": "boolean",
      "default": false
    },
    {
      "id": "maxCount",
      "label": "上传上限",
      "type": "range",
      "default": 5,
      "min": 1,
      "max": 5,
      "step": 1
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 390,
      "max": 1920,
      "step": 1,
      "unit": "px"
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "uploading",
          "label": "上传中"
        },
        {
          "value": "error",
          "label": "上传失败"
        },
        {
          "value": "success",
          "label": "上传成功"
        },
        {
          "value": "hover",
          "label": "悬浮操作"
        },
        {
          "value": "limit",
          "label": "达到上限"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "long",
          "label": "超长文件名"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "multiple",
      "label": "多张上传",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showNames",
      "label": "图片名称",
      "type": "boolean",
      "default": true
    },
    {
      "id": "downloadable",
      "label": "单张下载",
      "type": "boolean",
      "default": false
    },
    {
      "id": "batchDownload",
      "label": "批量下载",
      "type": "boolean",
      "default": false,
      "when": {
        "downloadable": [
          true
        ]
      }
    },
    {
      "id": "failOnce",
      "label": "首次上传失败演示",
      "type": "boolean",
      "default": false
    },
    {
      "id": "maxCount",
      "label": "上传上限",
      "type": "range",
      "default": 5,
      "min": 1,
      "max": 5,
      "step": 1
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 390,
      "max": 1920,
      "step": 1,
      "unit": "px"
    }
  ],
  "presets": [
    {
      "id": "demoState-default",
      "label": "演示状态 · 默认",
      "controls": {
        "demoState": "default"
      }
    },
    {
      "id": "demoState-uploading",
      "label": "演示状态 · 上传中",
      "controls": {
        "demoState": "uploading"
      }
    },
    {
      "id": "demoState-error",
      "label": "演示状态 · 上传失败",
      "controls": {
        "demoState": "error"
      }
    },
    {
      "id": "demoState-success",
      "label": "演示状态 · 上传成功",
      "controls": {
        "demoState": "success"
      }
    },
    {
      "id": "demoState-hover",
      "label": "演示状态 · 悬浮操作",
      "controls": {
        "demoState": "hover"
      }
    },
    {
      "id": "demoState-limit",
      "label": "演示状态 · 达到上限",
      "controls": {
        "demoState": "limit"
      }
    },
    {
      "id": "demoState-disabled",
      "label": "演示状态 · 禁用",
      "controls": {
        "demoState": "disabled"
      }
    },
    {
      "id": "demoState-long",
      "label": "演示状态 · 超长文件名",
      "controls": {
        "demoState": "long"
      }
    },
    {
      "id": "multiple-true",
      "label": "多张上传 · 开启",
      "controls": {
        "multiple": true
      }
    },
    {
      "id": "multiple-false",
      "label": "多张上传 · 关闭",
      "controls": {
        "multiple": false
      }
    },
    {
      "id": "showNames-true",
      "label": "图片名称 · 开启",
      "controls": {
        "showNames": true
      }
    },
    {
      "id": "showNames-false",
      "label": "图片名称 · 关闭",
      "controls": {
        "showNames": false
      }
    },
    {
      "id": "downloadable-true",
      "label": "单张下载 · 开启",
      "controls": {
        "downloadable": true
      }
    },
    {
      "id": "downloadable-false",
      "label": "单张下载 · 关闭",
      "controls": {
        "downloadable": false
      }
    },
    {
      "id": "batchDownload-true",
      "label": "批量下载 · 开启",
      "controls": {
        "batchDownload": true,
        "downloadable": true
      }
    },
    {
      "id": "batchDownload-false",
      "label": "批量下载 · 关闭",
      "controls": {
        "batchDownload": false,
        "downloadable": true
      }
    },
    {
      "id": "failOnce-true",
      "label": "首次上传失败演示 · 开启",
      "controls": {
        "failOnce": true
      }
    },
    {
      "id": "failOnce-false",
      "label": "首次上传失败演示 · 关闭",
      "controls": {
        "failOnce": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：图片上传 ImageUpload相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：受控图片上传

id：`upload-images` · portability：`portable` · owner：`wb-image-upload`

使用完整本地传输函数签名；示例不依赖远程接口。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

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

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-IMAGE-UPLOAD-V1/image-upload?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| accept | String | image/jpeg,image/png |  | 文件选择器接受的图片类型。 |
| batchDownload | Boolean |  |  | 是否提供批量下载操作。 |
| defaultValue | Array | {"kind":"function"} |  | 非受控模式初始图片记录。 |
| disabled | Boolean |  |  | 禁用文件选择及图片操作。 |
| downloadable | Boolean |  |  | 是否提供单张下载操作。 |
| hint | String | {"kind":"undefined"} |  | 上传区域的辅助说明。 |
| label | String | 图片上传 |  | 图片上传控件的可访问名称。 |
| maxCount | Number | 5 |  | 允许的图片数量上限。 |
| maxSize | Number | {"kind":"unknown","expression":"500 * 1024"} |  | 单张图片最大字节数。 |
| modelValue | Array | {"kind":"undefined"} |  | 受控图片记录数组；省略时组件按本地非受控状态工作。 |
| multiple | Boolean | true |  | 是否允许添加多张图片。 |
| previewState | String | default |  | Studio预览状态参数。 |
| showNames | Boolean | true |  | 是否显示图片名称。 |
| uploadRequest | Function | {"kind":"undefined"} |  | 消费方提供的异步上传函数，接收(file, { item, signal, onProgress })；item为当前记录快照，onProgress接收0到100的数值。 |

### Events

- `update:modelValue`：新的图片记录数组。；选择、上传状态变化或移除图片时发出。

- `change`：当前图片记录数组。；图片集合发生变化时发出。

- `reject`：被拒绝的文件及原因。；文件类型、大小或数量不符合限制时发出。

- `progress`：{ id, progress }，图片记录标识及0到100的进度数值。；uploadRequest报告进度时发出。

- `success`：{ id, result }，图片记录标识及uploadRequest返回值。；uploadRequest成功完成时发出。

- `error`：{ id, error }，图片记录标识及上传错误对象。；uploadRequest失败时发出。

- `cancel`：被取消的图片项。；用户取消上传时发出。

- `remove`：被移除图片项。；用户删除图片时发出。

- `retry`：待重试图片项。；用户请求重新上传时发出。

- `preview`：待预览图片项。；用户请求查看图片时发出。

- `download`：待下载图片项。；用户请求下载时发出。

- `batch-download`：批量下载所选图片项。；用户触发批量下载时发出。

### 实例成员

- `selectFiles(): void;`

- `retry(item: {id: string | number}): void;`

- `cancel(item: {id: string | number}): void;`

### 同族导出：`WorkbenchImageUploadTile`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| disabled | Boolean |  |  |  |
| downloadable | Boolean |  |  |  |
| item * | Object |  |  |  |
| previewState | String | default |  |  |
| showName | Boolean | true |  |  |

### Events

- `preview`

- `download`

- `remove`

- `retry`

- `cancel`

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-button`、`wb-modal`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-border`、`color-border-focus`、`color-error`、`font-body-s`、`font-body-m`

### 选型

图片网格上传使用WorkbenchImageUpload；通用附件列表使用WorkbenchUpload。

- 默认多选最多5张，单图可设置multiple=false。

- 需要上传过程时通过uploadRequest接入消费方传输实现。

### 设计结构与排版

图片记录以稳定id标识；成功项可包含url，上传过程携带status和progress。

- showNames控制名称展示；downloadable启用单项下载，batchDownload启用批量操作。

- 原始图片文件由组件管理预览；不会直接修改调用方传入数组或记录。

### 交互与键盘

悬浮或键盘聚焦时显示预览、删除等操作；触屏设备持续显示操作入口。

- 上传请求可接收AbortSignal和进度回调；取消、删除及卸载会终止当前任务。

- 禁用状态阻止选择、取消、重试、删除和下载。

- 超出accept、maxSize或maxCount时通过reject反馈。

### 使用边界与职责

uploadRequest由消费方连接真实服务；组件不提供服务端存储或鉴权。

- modelValue受控；defaultValue仅在非受控用法下初始化。

- 批量下载需要消费方允许并提供可访问图片URL；下载格式及服务权限由业务负责。

- Studio中的previewState只用于状态展示。

### 包内关联引用

```json
[
  {
    "label": "图片上传规范",
    "href": "#rules"
  },
  {
    "label": "图片项辅助组件API",
    "href": "#family"
  }
]
```

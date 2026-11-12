<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 表单 Form — `WorkbenchForm`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-form`](<../../workbench/wb-form.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-form",
  "kind": "component",
  "version": "1.0.2",
  "summary": "用于编排字段、同步校验与提交。业务model始终由调用方持有；WorkbenchFormItem统一负责字段标签、必填语义与反馈。",
  "useWhen": ["需要编排结构化字段、同步校验反馈、只读展示和提交操作的表单。"],
  "avoidWhen": ["异步远程校验、多步骤流程编排或由组件内部持有业务值。"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchForm"},
  "props": {
    "title": {"type":"String","required":true},
    "titleVisible": {"type":"Boolean","default":true},
    "model": {"type":"Object","required":true},
    "density": {"type":"String","default":"comfortable","enum":["comfortable","compact"]},
    "mode": {"type":"String","default":"editable","enum":["readonly","editable","mixed"]},
    "labelPosition": {"type":"String","default":"top","enum":["top","left"]},
    "labelWidth": {"type":"String","default":"var(--wb-asset-wb-form-label-width)"},
    "disabled": {"type":"Boolean"},
    "singleLine": {"type":"Boolean"},
    "showGrid": {"type":"Boolean"}
  },
  "events": ["submit","invalid"],
  "slots": ["default","actions"],
  "exposed": [
    {"name":"validate","declaration":"validate(): Promise<FormValidation>;"},
    {"name":"resetValidation","declaration":"resetValidation(): void;"},
    {"name":"focusFirstInvalid","declaration":"focusFirstInvalid(): void;"},
    {"name":"submit","declaration":"submit(event?: Event): Promise<FormValidation | undefined>;"}
  ],
  "family": [
    {
      "assetId": "wb-form",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchFormGroup"},
      "props": {"label":{"type":"String","default":""},"nested":{"type":"Boolean"}},
      "events": [],
      "slots": ["default"],
      "slotPatterns": [],
      "exposed": []
    },
    {
      "assetId": "wb-form",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchFormItem"},
      "props": {
        "prop": {"type":"String","default":""},
        "modelValue": {"default":{"kind":"undefined"}},
        "required": {"type":"Boolean"},
        "hint": {"type":"String","default":""},
        "labelPosition": {"type":"String","default":"top","enum":["top","left"]},
        "labelWidth": {"type":"String","default":"var(--wb-asset-wb-form-label-width)"},
        "label": {"type":"String","required":true},
        "mode": {"type":"String","default":"","enum":["","readonly","editable"]},
        "size": {"type":"String","default":"","enum":["","s","base","m","l","xl"]},
        "rules": {"type":"Array","default":{"kind":"function"}},
        "validateStatus": {"type":"String","default":"","enum":["","error"]},
        "message": {"type":"String","default":""},
        "formatter": {"type":"Function"}
      },
      "events": [],
      "slots": ["readonly","readonly-actions","default"],
      "slotPatterns": [],
      "exposed": [
        {"name":"validate","declaration":"validate(trigger?: string): {prop: string; status: '' | 'error'; message: string};"},
        {"name":"reset","declaration":"reset(): void;"},
        {"name":"focus","declaration":"focus(): void;"},
        {"name":"status","declaration":"readonly status: '' | 'error';"}
      ]
    }
  ],
  "propNotes": {
    "title": "可选表单标题。",
    "titleVisible": "默认true；设为false时标题仅视觉隐藏，仍为表单提供可访问名称。",
    "model": "由调用方持有的表单数据对象。",
    "density": "comfortable或compact，默认comfortable；仅readonly模式的compact收紧字段行间距，保留32px首行槽、列间距、字体与动作热区。",
    "mode": "editable、readonly或mixed；mixed时由各FormItem决定字段模式。",
    "labelPosition": "字段标签置于top或left；left标签保留字段开头、超长时尾部省略，再将显示内容右对齐，悬浮或键盘聚焦查看全文。",
    "labelWidth": "左右标签使用的标签宽度。",
    "singleLine": "调整字段排列为单行布局。",
    "showGrid": "Studio布局检查辅助项，不是业务视觉功能。",
    "disabled": "禁用表单中的可编辑字段。"
  },
  "eventNotes": {"submit":{"payload":"{ model }，提交时的表单数据对象。","timing":"整组校验通过后发出。"},"invalid":{"payload":"{ valid, errors }，包含验证状态及错误信息。","timing":"整组校验未通过时发出。"}},
  "slotNotes": {"default":{"scope":"无插槽参数。","description":"放置WorkbenchFormItem或WorkbenchFormGroup字段内容。"},"actions":{"scope":"无插槽参数。","description":"放置表单操作；组件不自动创建提交按钮。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-form-rule-1",
      "title": "职责与受控模型",
      "text": "Form编排整组布局、同步校验和提交，model由调用方持有。FormItem可独立配置required/hint/validateStatus/message；位于Form内时必须提供prop点路径并接入model/rules。独立字段不自动获得整表校验。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用表单编排结构化字段"],
      "references": []
    },
    {
      "id": "wb-form-rule-2",
      "title": "校验与提交合同",
      "text": "rules支持required和同步validator，trigger支持blur/change；校验只保留Error状态并阻断提交，聚焦首个可编辑失败项。只读字段不参与提交校验。validateStatus仅支持空值或error，message是外部受控错误反馈并优先实时显示。validator抛错或返回Promise均转为Error结果，Promise不作为通过；本版不执行异步校验。",
      "strength": "must",
      "status": "confirmed",
      "when": ["校验或提交表单"],
      "references": []
    },
    {
      "id": "wb-form-rule-3",
      "title": "公开API、Slots与事件",
      "text": "Form props：title、titleVisible（默认true，false时标题视觉隐藏并保留可访问名称）、model、density(comfortable/compact，仅readonly紧凑行距，默认comfortable)、mode(editable/readonly/mixed)、labelPosition(top/left)、labelWidth、singleLine、showGrid；默认Slot放字段，actions Slot放操作；submit({model})和invalid({valid,errors})事件；ref暴露validate、resetValidation、focusFirstInvalid、submit。FormItem props：label、prop（Form内必填）、modelValue、required、hint、labelPosition、labelWidth、mode、size(s/base/m/l/xl)、rules、validateStatus(仅error或空值)、message、formatter；编辑态默认Slot获得status、message、describedBy、labelledBy、invalid、required；只读态readonly和readonly-actions Slot获得value、displayValue、prop、model，默认显示格式化文本；ref暴露validate、reset、focus和只读status。校验反馈仅错误文案，不显示图标或其他符号。FormGroup props：label、nested，默认Slot放字段。",
      "strength": "must",
      "status": "confirmed",
      "when": ["调用Form、FormItem或FormGroup"],
      "references": []
    },
    {
      "id": "wb-form-rule-4",
      "title": "布局与只读边界",
      "text": "内容区按656/968/1280px容器断点进入2/3/4列；显式size切换12单位跨度2/4/6/8/10。左右标签默认96px并与32px控件槽对齐；FormItem内Select填满控件槽，独立Select保留默认宽度；FormItem内Rating的星星按钮高32px，单行评分字段使用无可见描述形态，独立Rating尺寸不变；单列布局的actions位于末行右侧，顶部标签布局的同排actions对齐控件底边；nested缩进16px。readonly渲染语义文本而非禁用控件，mixed由字段mode选择只读或编辑。showGrid仅用于预览检查。",
      "strength": "must",
      "status": "confirmed",
      "when": ["配置表单布局或只读展示"],
      "references": []
    },
    {
      "id": "wb-form-rule-5",
      "title": "必填星复用8×22px共享SVG",
      "text": "WorkbenchFormItem复用WorkbenchRequiredMark共享SVG；8×22px画布与标签正文行高一致，图形内置纵向光学位置及#E02128颜色。画布在标签行盒中垂直居中并悬挂于文字左侧，不挤压标签或控件对齐。",
      "strength": "must",
      "status": "confirmed",
      "when": ["字段配置required或required校验规则"],
      "references": []
    },
    {
      "id": "wb-form-field-width-20261026",
      "title": "字段可用宽度与整行组合",
      "text": "FormItem内Select与日期选择器填满控件槽，独立使用保留自身默认宽度，日期面板尺寸不随字段变化。需整行的说明字段由父布局跨全部列；xl仍为10/12跨度，不等于整行。预览容器不裁剪左侧必填标记。",
      "strength": "must",
      "status": "confirmed",
      "when": ["FormItem内组合录入控件"],
      "references": []
    }
  ],
  "dependencies": ["wb-tooltip"],
  "foundationKeys": ["color-text-primary","color-text-secondary","color-error","color-border-focus","spacing-component-xs","spacing-component-sm","spacing-component-lg","spacing-layout-content-gap","font-body-s","font-body-m","font-headline-xs","font-headline-s"],
  "intro": "用于编排字段、同步校验与提交。业务model始终由调用方持有；WorkbenchFormItem统一负责字段标签、必填语义与反馈。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["需要整组字段编排、校验和提交时使用WorkbenchForm；独立字段可单独使用WorkbenchFormItem。"],"bullets":["WorkbenchFormGroup用于给一组字段添加可选标题和嵌套缩进。","mixed模式适用于同一表单中部分只读、部分可编辑的场景。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["Form默认插槽放字段，actions插槽放提交等操作；FormItem通过prop点路径读取model值并注册到整组管理。"],
      "bullets": ["默认列数随内容宽度响应；可用FormItem size指定12单位网格跨度。","只读字段显示标签和格式化文本，不以disabled控件模拟。","showGrid仅供Studio检查布局。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["rules使用同步required或validator校验；触发时机可配置为blur、change或二者。"],
      "bullets": ["提交时校验整组字段，失败后聚焦第一个可编辑的无效字段。","验证只保留错误状态；外部validateStatus/message可控反馈并优先于本地规则。","ref可调用validate、resetValidation、focusFirstInvalid与submit。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["调用方负责更新model值；resetValidation只重置校验状态，不会重置业务数据。"],
      "bullets": ["异步校验、数组路径语法、多步骤表单及生产框架适配不在当前能力范围。","同步validator返回空字符串表示通过；字符串或false表示失败，Promise会明确报不支持异步校验。","WorkbenchFormItem独立使用时由调用方提供modelValue或可校验值；不加入整表提交注册。"]
    }
  ],
  "related": [{"label":"字段职责与表单规范","href":"#rules"},{"label":"字段辅助组件API","href":"#family"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "validated-form",
  "title": "同步校验表单",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-form","scenarioId":"form","exampleId":"validated-form","codeSha256":"sha256:908437d53f33e8c49d81f28be9f5e48ae8dac9f2d272de09e3d0fdd86c1dc6cd"},
  "description": "受控数据与同步规则完整定义；提交行为由调用方处理。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { reactive, ref } from "vue"
import { WorkbenchForm, WorkbenchFormItem, WorkbenchInput } from "@workbench/ui-vue3"
const model = reactive({ name: "" })
const notice = ref('')
const rules = [{ required: true, trigger: "blur", message: "请输入姓名" }]
function submitForm({ model }) { notice.value = `已提交：${model.name}` }
function showInvalid({ errors }) { notice.value = `请修正 ${errors.length} 项` }
</script>
<template>
  <WorkbenchForm title="联系人" :model="model" @submit="submitForm" @invalid="showInvalid">
    <WorkbenchFormItem label="姓名" prop="name" :rules="rules">
      <WorkbenchInput v-model="model.name" aria-label="姓名" />
    </WorkbenchFormItem>
  </WorkbenchForm>
  <output>{{ notice }}</output>
</template>
```

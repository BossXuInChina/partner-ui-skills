<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文本输入 Input — `WorkbenchInput`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-input`](<../../workbench/wb-input.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-input",
  "kind": "component",
  "version": "1.0.0",
  "summary": "预览页聚焦一个可切换类型的输入实例，可试填、主动校验并查看事件反馈；变体页按输入类型和交互状态并排比较。",
  "useWhen": ["单行、多行、密码及单位输入"],
  "avoidWhen": ["未经适配验证的内部框架生产实现"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchInput"},
  "props": {
    "modelValue": {"type":"String","default":""},
    "type": {"type":"String","default":"text"},
    "size": {"type":"String","default":"32","enum":["28","32"]},
    "placeholder": {"type":"String","default":"请输入"},
    "resizable": {"type":"Boolean","default":true},
    "required": {"type":"Boolean"},
    "disabled": {"type":"Boolean"},
    "name": {"type":"String"},
    "ariaLabel": {"type":"String"},
    "state": {"type":"String","default":"default"},
    "maxLength": {"type":"Number"},
    "validate": {"type":"Function"},
    "prefixValue": {"type":"String"},
    "prefixPlaceholder": {"type":"String"},
    "prefixOptions": {"type":"Array","default":{"kind":"function"}},
    "prefixDisabled": {"type":"Boolean"},
    "showPrefixIcon": {"type":"Boolean","default":true},
    "suffixDisabled": {"type":"Boolean"},
    "showSuffixIcon": {"type":"Boolean","default":true},
    "unit": {"type":"String"},
    "unitFilterLabel": {"type":"String","default":"筛选"},
    "unitOptions": {"type":"Array","default":{"kind":"function"}},
    "showTrailingIcon": {"type":"Boolean"}
  },
  "events": ["update:modelValue","update:unit","update:prefixValue","validation"],
  "eventDetails": null,
  "slots": ["prefix-icon","trailing-icon","suffix-icon"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [{"name":"validate","declaration":"validate(): boolean;"},{"name":"focus","declaration":"focus(): void;"}],
  "family": [],
  "propNotes": {
    "modelValue": "受控文本值，通过update:modelValue同步更新。",
    "type": "text、textarea或password，分别对应单行、多行和掩码文本。",
    "maxLength": "按Unicode码点计数并参与校验，不设置原生maxlength。",
    "validate": "同步校验函数；应无副作用并返回错误字符串或空字符串。",
    "required": "输入原生必填约束；字段提示与错误展示由FormItem统一负责。",
    "prefixOptions": "前缀单选项；为空时不显示前缀选择段。",
    "unitOptions": "后缀单位单选项；为空时不显示单位选择段。",
    "resizable": "多行文本是否可垂直调整高度，默认开启。",
    "name": "加入同名原生表单字段。",
    "ariaLabel": "控件可访问名称。",
    "placeholder": "输入为空时显示的提示文案。",
    "state": "输入状态展示参数；业务字段校验状态由validate与FormItem管理。",
    "prefixDisabled": "仅禁用前缀选项并关闭其面板。",
    "suffixDisabled": "仅禁用后缀单位选项并关闭其面板。",
    "showTrailingIcon": "是否显示尾随图标；图标内容可由trailing-icon插槽提供。",
    "unit": "当前受控单位值。",
    "unitFilterLabel": "单位选项筛选入口的可访问/显示文案。",
    "disabled": "禁用输入及其内部操作。",
    "prefixValue": "前缀筛选受控值。",
    "showPrefixIcon": "是否显示前缀筛选图标。",
    "showSuffixIcon": "是否显示后缀单位图标。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的文本值。","timing":"用户编辑文本后发出；输入法组合过程中不会提交中间值。"},
    "update:unit": {"payload":"新选择的单位值。","timing":"用户选择或取消单位选项后发出。"},
    "update:prefixValue": {"payload":"新的前缀选择值。","timing":"用户选择或取消前缀选项后发出。"},
    "validation": {"payload":"{ valid, message }，分别表示校验是否通过及当前错误文案。","timing":"同步校验状态发生变化时通知字段层。"}
  },
  "slotNotes": {
    "prefix-icon": {"scope":"无插槽参数。","description":"替换前缀选择文字左侧图标。"},
    "suffix-icon": {"scope":"无插槽参数。","description":"替换后缀选择文字左侧图标。"},
    "trailing-icon": {"scope":"无插槽参数。","description":"提供单行输入的尾随图标。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-input-rule-1",
      "title": "`type`: text / textarea / passwo",
      "text": "`type`: text / textarea / password；`v-model`保存文本；placeholder默认“请输入”。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-2",
      "title": "统一字段职责：Input只提供裸输入和原生required",
      "text": "Input只提供裸输入和原生required；可见label、labelPosition、必填星号、hint和message统一由WorkbenchFormItem配置，搜索筛选可继续使用裸Input。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-3",
      "title": "`showTrailingIcon`与`trailing-ico",
      "text": "`showTrailingIcon`与`trailing-icon` Slot配置单行后置图标。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-4",
      "title": "单行32px，多行88px。正文至少三行；独立滚动区不遮挡右下计",
      "text": "单行32px，多行88px。正文至少三行；独立滚动区不遮挡右下计数器。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-5",
      "title": "`maxLength`仅用于计数和校验，不设置原生maxleng",
      "text": "`maxLength`仅用于计数和校验，不设置原生maxlength；按Unicode码点计数，超出后当前计数标红。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-6",
      "title": "统一字段职责：首次失焦校验；之后随输入重新校验。valid",
      "text": "首次失焦校验；之后随输入重新校验。validate(value)返回错误文案或空字符串；validation事件返回valid及message。位于字段内时反馈交由FormItem，reset清除已触发状态，初始必填不显示错误。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-7",
      "title": "密码默认掩码，按钮切换显示/隐藏；disabled禁止编辑和按钮",
      "text": "密码默认掩码，按钮切换显示/隐藏；disabled禁止编辑和按钮交互。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-8",
      "title": "`unit`显示外部固定单位；`unitOptions`提供单选",
      "text": "`unit`显示外部固定单位；`unitOptions`提供单选单位后缀，通过`update:unit`回传。复用Search筛选：再次选择已选项取消，支持Hover、Focus、禁用、方向键及Escape。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-9",
      "title": "错误色沿用Foundation color-error；正文沿用",
      "text": "错误色沿用Foundation color-error；正文沿用14px/22px，计数使用本组件专属12px/12px；14px图标与已批准Search尺寸一致，复用Search参数。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-10",
      "title": "当前为已批准设计与Vue 3原型验证；内部UI框架通过后续适配层",
      "text": "当前为已批准设计与Vue 3原型验证；内部UI框架通过后续适配层实现以上API语义。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-11",
      "title": "多行顶部内边距4px，与32px单行中的22px正文对齐；计数器",
      "text": "多行顶部内边距4px，与32px单行中的22px正文对齐；计数器固定右下，正文与计数器上下分区，不预留右侧整列空间。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-12",
      "title": "统一字段职责：可见错误提示和必填红星由FormItem统一",
      "text": "可见错误提示和必填红星由FormItem统一绘制；Input不重复提供标签、星号或反馈节点，控件通过共享字段上下文连接label、描述和错误。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-13",
      "title": "统一字段职责：帮助文本由FormItem.hint统一配置",
      "text": "帮助文本由FormItem.hint统一配置，与错误反馈共用字段样式；内容以控件槽宽度为限换行。Input不自绘帮助文本。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-14",
      "title": "统一字段职责：标签、控件与反馈间距统一遵循FormItem",
      "text": "标签、控件与反馈间距统一遵循FormItem现有样式，Input不追加字段padding或反馈间距。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-15",
      "title": "统一字段职责：帮助文本由FormItem.hint配置，未",
      "text": "帮助文本由FormItem.hint配置，未传或为空时不显示、不占空间；预览显示帮助文本开关控制字段hint，错误反馈独立于该开关。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-16",
      "title": "统一字段职责：FormItem使用共享8×22必填星资源",
      "text": "WorkbenchFormItem使用项目内共享WorkbenchRequiredMark SVG资源，原始画布8×22px，保留资源内红色与光学垂直位置；在标签行内垂直居中并挂在文字左侧，不影响标签与输入框左对齐。Input不绘制必填星。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-17",
      "title": "前后缀可独立配置：`prefixOptions` / `unit",
      "text": "前后缀可独立配置：`prefixOptions` / `unitOptions`为空则不显示该侧；`prefixDisabled` / `suffixDisabled`独立禁用，保留选值并关闭面板，不影响正文输入或另一侧。`showPrefixIcon` / `showSuffixIcon`默认true，分别控制筛选文案左侧14px图标，并可用`prefix-icon` / `suffix-icon` Slot替换，默认图标为`文件夹/尺寸=14`。默认未选择时文字和图标为二级色；展开时二者为一级色；选择后收起，文字保留一级色、图标恢复二级色。整体disabled优先。预览右侧提供显示及禁用开关。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-18",
      "title": "`resizable`默认true，多行框通过右下角原生手柄仅垂",
      "text": "`resizable`默认true，多行框通过右下角原生手柄仅垂直调整；初始及最小高度88px，关闭或禁用时不可拖拽。计数器向左避让手柄，宽度仍由父布局决定。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-19",
      "title": "计数器专属豁免：12px字号/12px行高，右侧12px、底部2",
      "text": "计数器专属豁免：12px字号/12px行高，右侧12px、底部2px；正文和计数器上下分区，取消右侧整列预留。垂直滚动条10px轨道，滑块4px、两侧3px，靠容器右边。豁免限定本组件计数器选择器。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-20",
      "title": "滚动条默认填充：浅色#191919/20%，深色#F3F3F3/",
      "text": "滚动条默认填充：浅色#191919/20%，深色#F3F3F3/30%，悬浮使用color-scrollbar-thumb-fill-hover（浅色#AEAEAE）；默认色归wb-scrollbar批准合同，不借用文字或分隔线Token。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-21",
      "title": "滚动条滑块使用radius-full胶囊圆角，长度变化时两端保持",
      "text": "滚动条滑块使用radius-full胶囊圆角，长度变化时两端保持半圆。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-22",
      "title": "支持`name`参与原生FormData；无可见标签时提供`ar",
      "text": "支持`name`参与原生FormData；无可见标签时提供`ariaLabel`。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-23",
      "title": "统一字段职责：validate(value)、requir",
      "text": "validate(value)、required、maxLength及字段错误接入原生setCustomValidity；原生validationMessage与字段当前错误一致，无效时阻止原生表单提交。ref.validate()主动校验并返回布尔值，ref.focus()定位输入。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-24",
      "title": "统一字段职责：外部错误通过FormItem.validat",
      "text": "外部错误通过FormItem.validateStatus/message设置和清除，优先于本地校验与hint，不在输入时擅自清空服务器错误。禁用输入不参与有效性阻断。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-25",
      "title": "compositionstart到compositionend期",
      "text": "compositionstart到compositionend期间不提交中间文本或运行校验；组合结束提交完整文本。自动化覆盖合成组合事件，真实系统输入法仍需人工检查。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-26",
      "title": "同步校验函数必须无副作用并返回字符串。不支持Promise验证、",
      "text": "同步校验函数必须无副作用并返回字符串。不支持Promise验证、原生form.reset自动重置受控值、输入掩码或文件输入；这些能力单独评审。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-27",
      "title": "纵向滚动滑块四边均留3px透明边框，配合padding-box和",
      "text": "纵向滚动滑块四边均留3px透明边框，配合padding-box和radius-full，使可见4px滑块上下端保持半圆，避免仅左右留白产生扁椭圆。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-28",
      "title": "多行正文内容区左右内边距均为12px：左侧由容器提供，右侧由te",
      "text": "多行正文内容区左右内边距均为12px：左侧由容器提供，右侧由实际滚动槽加textarea内边距组成，合计12px，不重复叠加；滚动条继续位于容器右侧，计数器布局不变。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-rule-29",
      "title": "多行正文始终预留滚动槽（scrollbar-gutter: st",
      "text": "多行正文始终预留滚动槽（scrollbar-gutter: stable），出现或消失滚动条时正文可用宽度保持不变，不因滚动条挤压而重新换行；12px正文内边距、独立计数区与靠右滚动条规则保持。",
      "strength": "must",
      "status": "confirmed",
      "when": ["单行、多行、密码及单位输入"],
      "references": []
    },
    {
      "id": "wb-input-affix-panel-radius-20261025",
      "title": "Input前后缀筛选面板圆角",
      "text": "Input前缀与单位后缀筛选面板主体使用Foundation radius-md（6px）；输入框与筛选触发器保持各自既有圆角。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用Input前缀或单位后缀筛选"],
      "references": []
    }
  ],
  "dependencies": ["wb-search","wb-scrollbar"],
  "foundationKeys": [
    "color-border",
    "color-border-hover",
    "color-border-focus",
    "color-border-disabled",
    "color-text-primary",
    "color-text-placeholder",
    "color-text-secondary",
    "color-text-disabled",
    "color-icon-placeholder",
    "color-icon-secondary",
    "color-icon-primary",
    "color-icon-active",
    "color-icon-disabled",
    "color-fill-hover",
    "color-fill-subtle-default",
    "color-fill-subtle-disabled",
    "color-surface-card-default",
    "color-info-primary-subtle",
    "spacing-component-xs",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg",
    "spacing-layout-container-inline",
    "radius-sm",
    "radius-md",
    "radius-lg",
    "shadow-base",
    "font-body-m",
    "font-headline-m",
    "color-error",
    "font-body-s",
    "color-scrollbar-thumb-fill-hover",
    "radius-full"
  ],
  "intro": "预览页聚焦一个可切换类型的输入实例，可试填、主动校验并查看事件反馈；变体页按输入类型和交互状态并排比较。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["短文本使用 text；需要多行内容使用 textarea；敏感文本使用 password。独立筛选或搜索也可使用裸输入控件。"],
      "bullets": ["需要统一标签、必填、说明或错误反馈时，将 Input 放入 WorkbenchFormItem。","成功与警告反馈不属于该输入校验状态。"]
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["单行默认高32px，多行初始高88px；多行正文与右下计数器分区显示，容器宽度由父布局决定。"],
      "bullets": ["maxLength仅供码点计数与校验，不会设置原生maxlength；超出后当前计数标红。","前缀、后缀及单位选项分别配置；对应选项为空时该侧不显示。","多行resizable默认开启，只允许垂直拖动，最小高度为88px。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["密码默认掩码，可通过内置按钮切换显示；disabled会阻止输入及相关按钮操作。"],
      "bullets": [
        "同步validate(value)校验和required、maxLength接入原生约束；ref.validate()可主动校验并返回布尔值。",
        "输入法组合期间不提交中间文本或校验，组合结束后提交完整文本。",
        "前后缀和单位选项使用单选菜单；Escape关闭面板，独立禁用不影响正文输入或另一侧。"
      ]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["WorkbenchInput只提供输入控件；字段标签、必填星、提示及错误文案由WorkbenchFormItem维护。"],
      "bullets": [
        "modelValue由调用方受控；组件不提供异步校验、输入掩码、文件输入或原生form.reset自动更新受控值。",
        "validate(value)必须同步、无副作用并返回字符串；不支持Promise校验。",
        "提供name可将值纳入原生FormData；无可见标签时提供ariaLabel。"
      ]
    }
  ],
  "related": [{"label":"文本输入批准规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-text",
  "title": "受控文本字段",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-input",
    "scenarioId": "input",
    "exampleId": "controlled-text",
    "codeSha256": "sha256:c27f4b066de74c634e90f4a46369b059e7cdf0fa092a5226e535e8bdede011ab"
  },
  "description": "完整展示受控值、同步校验和字段语义；实际表单标签可由外层字段组件提供。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchInput } from "@workbench/ui-vue3"
const account = ref('')
const validateAccount = (value) => value ? "" : "请输入账号"
</script>
<template>
  <WorkbenchInput v-model="account" name="account" aria-label="账号" :max-length="24" :validate="validateAccount" />
  <output>已输入 {{ [...account].length }} 个字符</output>
</template>
```

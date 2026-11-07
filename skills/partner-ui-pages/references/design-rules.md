<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 设计规则

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## [wb-alert](workbench/wb-alert.md)

### 用途与边界

id：`wb-alert-rule-1` · must / confirmed

页面、卡片、对话框、产品区的持续提示；内容留在页面流中。 瞬时操作结果使用 Message；需要显式确认使用 Feedback Dialog。

**适用条件**：使用提示条 Alert

### 交互与状态

id：`wb-alert-rule-2` · must / confirmed

关闭发出受控更新及关闭事件；复选项使用原生键盘操作，链接不关闭提示。

**适用条件**：使用提示条 Alert

### 公开API

id：`wb-alert-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| modelValue | Boolean，默认 true；受控显示，父级消费 update:modelValue |
| type | info（默认）、success、warning、danger、critical、error |
| message / linkLabel / linkHref | 必填正文；链接文案与真实导航地址必须成对提供 |
| showIcon / showClose | Boolean，默认 true |
| checkboxLabel / checkboxChecked | 可选复选文案；受控选中值，默认 false |
| surface | semantic / neutral；未传时 product、global 为 neutral，其他为 semantic |
| placement | page（默认）、product、global、card、dialog |

事件：`update:modelValue(false)`、`close({reason:'button',checkboxChecked})`、`update:checkboxChecked(boolean)`、`link({href})`。链接保留浏览器默认导航，事件只用于埋点或旁路监听。关闭不负责持久化“不再提示”，业务方保存偏好。

**适用条件**：使用提示条 Alert

### 真实导航链接

id：`wb-alert-real-navigation` · must / confirmed

链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。

**适用条件**：提示内容包含导航入口

## [wb-avatar](workbench/wb-avatar.md)

包内未提供规则；不补写设计结论。

## [wb-badge](workbench/wb-badge.md)

### 尺寸与数值

id：`wb-badge-rule-1` · must / confirmed

点状最终外径7px；数字最终高度17px，超过99显示99+，保留完整可访问数值；非正整数或hidden隐藏数字徽标。

**适用条件**：使用徽标 Badge

### 交互边界

id：`wb-badge-rule-2` · must / confirmed

Badge不响应指针操作，点击焦点由宿主负责；非未读数量须通过ariaLabel声明用途。

**适用条件**：使用徽标 Badge

### 定位

id：`wb-badge-rule-3` · must / confirmed

角点数字右边缘固定，额外宽度向左增长；inline位于正常文档流，外部间距由父级负责。

**适用条件**：使用徽标 Badge

## [wb-breadcrumb](workbench/wb-breadcrumb.md)

### 选型边界

id：`wb-breadcrumb-rule-1` · must / confirmed

页面层级路径与祖先导航；不适用于侧栏树导航、业务步骤状态

**适用条件**：页面层级路径与祖先导航

### 交互与调用合同

id：`wb-breadcrumb-rule-2` · must / confirmed

`items` 为 {id,label,href?,disabled?} 数组，id 必须唯一。最后一项是当前页且不交互，祖先有 href 时保留原生链接，隐藏祖先也相同；无 href 时发出 navigate(item,event)。路由调用方可在事件中 preventDefault。collapseThreshold 默认6，最小6，以避免第一项和尾四项重复；每个菜单具有实例唯一 ID。Enter/Space/ArrowDown 打开，方向键/Home/End 移动，Escape 关闭回焦点，焦点离开或外点关闭。

**适用条件**：页面层级路径与祖先导航

### 复用边界

id：`wb-breadcrumb-rule-3` · must / confirmed

保留祖先节点的原生a/button与导航语义，但视觉使用Breadcrumb组件专属的中性层级合同：祖先和折叠入口默认color-text-secondary，Hover使用color-text-primary，当前节点使用color-text-primary，禁用使用color-text-disabled；不套用独立Link或文字按钮的蓝色状态链。

**适用条件**：页面层级路径与祖先导航

## [wb-button](workbench/wb-button.md)

### 32px 默认高度

id：`wb-button-height` · default / confirmed

默认高度32px；填充按钮36px用于全局操作，28px用于复合组件的紧凑操作。尺寸选择与文字字号分别判断。文字按钮另有可选的无容器变体 textLayout=inline，高度随文字行高。

**适用条件**：使用按钮

### 14px 默认文字字号

id：`wb-button-text-size` · default / confirmed

列表、表格操作列及卡片右上角的操作和下钻默认使用14px，不因处于复合组件内部自动缩小。

**适用条件**：使用按钮

### 填充按钮三档最小宽度

id：`wb-button-min-width` · must / confirmed

填充按钮 S、M、L 分别对应28、32、36px高度，最小宽度分别为72、88、96px；内容超过最小宽度时允许按钮自然撑宽。该规则不扩展到文字按钮与图标按钮。

**适用条件**：使用填充按钮

**包内引用**：["wb-button-height"]

### 12px 慎用

id：`wb-button-small-text` · recommendation / confirmed

14px文字按钮用于主要内容区、高频操作和标准卡片。12px仅建议用于高密度、次要辅助区或空间极受限的场景，如空状态轻量引导、极次要全局辅助状态栏；慎用并控制在2–4个汉字，点击区域不小于24×24px。

**适用条件**：使用按钮

### 颜色表达用途

id：`wb-button-intent` · must / confirmed

操作类文字默认蓝色；下钻/披露类默认黑色。两者Hover统一使用color-text-action-hover，Pressed/Expanded统一使用color-text-action-active；操作类禁用使用color-text-action-disabled，下钻/披露类禁用使用color-text-disabled。更多配右箭头、展开配下箭头、收起配上箭头。

**适用条件**：使用按钮

### 主要与次要外观

id：`wb-button-border` · must / confirmed

主要按钮纯色填充且无描边；次要按钮保留描边，主次不通过混用尺寸表达。

**适用条件**：使用按钮

### 填充按钮组合建议同宽

id：`wb-button-equal-width` · recommendation / confirmed

同组填充按钮字数不同时建议按最长内容等宽、同高；由父级布局实现，不靠空格、不要求全站统一宽度。

**适用条件**：使用按钮

### 图文与点击区域

id：`wb-button-icon` · must / confirmed

填充按钮L/M/S前置图标分别14/14/12px，图文间距4px。文字与下拉按钮尾部箭头统一10px、间距6px。纯图标按钮默认无容器，贴合实际图标；导航等需要标准点击区域时使用 iconLayout=container，32/24px容器分别使用20/14px图标；均提供可访问名称。

**适用条件**：使用按钮

### 交互语义

id：`wb-button-semantics` · must / confirmed

状态操作使用按钮，真实地址下钻使用链接或路由语义；保留键盘、可见焦点和禁用行为，展开收起同步aria-expanded。

**适用条件**：使用按钮

### 已定稿的状态与图标映射

id：`wb-button-state-mapping` · must / confirmed

以Pixso组件变体为准：主要按钮Default/Pressed使用color-brand，Hover使用color-brand-hover，Disabled使用color-brand-disabled。次要按钮Hover/Pressed均保持color-fill-subtle-default，并将1px描边改为color-border-hover。图标按钮Hover/Pressed均透明，分别使用color-icon-hover和color-icon-active。操作类文字按钮使用color-text-action、color-text-action-hover、color-text-action-active、color-text-action-disabled；下钻类默认color-text-primary、禁用color-text-disabled，Hover/Pressed沿用文字操作状态链，aria-expanded=true持续使用active色。文字与下拉按钮箭头均10px、间距6px；纯图标按钮默认贴合实际图标，container变体32/24px分别配20/14px图标。

**适用条件**：精确状态色映射；描边粗细；文字图标尺寸

### 本版本未支持的能力

id：`wb-button-async` · must / confirmed

Button提供主要、次要、文字、图标及次要下拉触发入口；下拉入口复用secondary外观、intent=drilldown与方向箭头，展开状态由调用方控制，菜单由独立Dropdown负责。当前版本不提供Loading、异步防重复提交或Danger；Pixso实际组件集中无告警变体，不依据残留标题推断实现。

**适用条件**：加载中按钮；异步提交；危险操作

### Pixso三档左右内边距

id：`wb-button-padding` · must / confirmed

填充按钮L/M/S左右内边距20/16/12px；文字按钮各尺寸均8px，无容器变体 textLayout=inline 为0；图标按钮默认贴合图标，container变体通过固定正方形容器居中。

**适用条件**：使用按钮

**包内引用**：["wb-button-height"]

### 文字下钻入口与点击区域

id：`wb-button-text-drilldown-usage` · recommendation / confirmed

文字按钮默认使用标准容器（32/28px高、左右8px）；卡片或页签头部的操作、下钻入口可显式使用 textLayout=inline，仅占文字行高且无内边距。更多等操作使用 intent=drilldown、drilldown=more，保留键盘和焦点反馈；真实地址跳转使用链接组件。

**适用条件**：卡片或页签头部下钻入口

## [wb-button-radio-group](workbench/wb-button-radio-group.md)

### 选型边界

id：`wb-button-radio-group-rule-1` · must / confirmed

用于在当前上下文选择一个互斥值；若切换具有关联关系的平级内容面板，使用Tabs。

**适用条件**：互斥选择

### 交互与可访问性

id：`wb-button-radio-group-rule-2` · must / confirmed

使用radiogroup/radio/aria-checked语义和roving tabindex；方向键、Home、End自动选择并跳过禁用项。

**适用条件**：互斥选择

### 溢出边界

id：`wb-button-radio-group-rule-3` · must / confirmed

组件不自动收纳为更多；选项较多、名称较长或需要关联内容面板时重新选择布局或使用Tabs。

**适用条件**：互斥选择

## [wb-card](workbench/wb-card.md)

### 四种固定外观

id：`wb-card-appearance` · must / confirmed

display-white为白底无描边无阴影；display-tinted使用color-surface-card-tinted浅灰表面且无描边无阴影；operation为白底1px描边无阴影；navigation为白底无描边并使用交互阴影。页面背景color-surface-page不作为灰色卡片默认背景。

**适用条件**：选择Card外观

### 统一Card内边距与多卡间距

id：`wb-card-spacing` · must / confirmed

Card左右内边距24px、顶部20px；无actions时底部20px，有actions时正文到Action及Action到底部均为24px。仅有元数据footer不触发Action间距；多张Card由CardGrid以16px统一间距排列。

**适用条件**：展示Card或CardGrid

### 整卡跳转使用原生链接

id：`wb-card-navigation` · must / confirmed

navigation必须提供href并渲染原生a；默认shadow-sm，Hover时替换为shadow-md。Navigation内部不得嵌套按钮、链接或其他交互控件。

**适用条件**：整张Card作为唯一跳转入口

### 卡内多操作不提升Card根节点

id：`wb-card-operation` · must / confirmed

operation只提供白底描边容器，操作由内部Button、Link或表单控件独立承担；Card根节点不响应点击或键盘激活。 actions插槽负责底部操作且使用24px正文间距与24px底部内边距；footer元数据不视作actions。 同时提供footer元数据与actions时先显示footer，actions置于底部。

**适用条件**：Card内部存在多个操作

### 六档栅格尺寸

id：`wb-card-size` · must / confirmed

s、m、l、xl、xxl、xxxl在24列CardGrid中分别占3、4、6、8、12、24列；12列区间保持目标列数但最大为12列；小于768px统一满宽。

**适用条件**：Card位于WorkbenchCardGrid内

### 可选栅格覆盖层

id：`wb-card-grid-visibility` · must / confirmed

CardGrid通过showGrid显示当前实际的1、12或24列轨道；覆盖层不接收指针事件，不改变Card排布与交互。

**适用条件**：评审或调试Card栅格跨度

**包内引用**：["wb-card-size"]

### Header右侧异类组件分组

id：`wb-card-header-slot-groups` · must / confirmed

Header右侧插槽同时嵌入不同类型组件时，相邻异类组件之间使用1×14px的color-border-separator-subtle竖分隔线，分隔线与左右组件均保持12px间距；单一类型不展示分隔线。

**适用条件**：Header右侧插槽包含多种不同类型组件

### 底部文字按钮视觉左对齐

id：`wb-card-footer-text-action-align` · must / confirmed

底部插槽包含文字按钮时，文字按钮容器向左偏移8px以抵消按钮水平留白，使按钮文字与正文视觉左对齐；其他底部内容不应用该偏移。

**适用条件**：Card底部插槽包含文字按钮

## [wb-carousel](workbench/wb-carousel.md)

### 使用边界

id：`wb-carousel-rule-1` · must / confirmed

Carousel v1 每次只展示一个内容项，宽度由父页面容器决定，高度由调用方或 slide 内容提供。

**适用条件**：循环展示多个图片或内容容器

### 交互合同

id：`wb-carousel-rule-2` · must / confirmed

v-model 使用零基索引；存在多个内容项时每5秒循环，悬停、焦点、页面不可见和减少动态效果偏好会暂停。箭头、分页点、ArrowLeft、ArrowRight、Home 和 End 均可切换；首尾循环。分页指示器默认叠加在内容区内部，距底部24px；选择 below 变体时位于内容下方，间隔16px；可见标记间距恒为12px。每个轨道恰有一个16×8px选中胶囊，其余为8×8px圆点，因此内容总宽度在切换时不变：三项始终为56px。圆形翻页器定义为低强调导航图形：默认圆底为白色80%，悬停和按下为白色100%，禁用为白色50%；箭头默认使用 color-icon-secondary，悬停和按下使用 color-icon-primary，禁用使用 color-icon-disabled，并采用16px左右箭头图标。

**适用条件**：循环展示多个图片或内容容器

### 调用方内容栅格

id：`wb-carousel-rule-3` · must / confirmed

Carousel 不定义标题或副标题 API，调用方在 slide 内容层中提供业务文案。小于768px时内容层为单列并在两侧各保留80px翻页器避让带；768px起按16px沟槽与32px安全边距建立12列栅格，文案从第2列开始并占8列；1280px起改为24列并占12列。

**适用条件**：slide 包含主标题、副标题或业务文案

## [wb-cascader](workbench/wb-cascader.md)

### 级联面板与+N明细的用户确认圆角

id：`wb-cascader-overlay-radius-20261025` · must / confirmed

级联主面板主体使用radius-md（6px）；触发器与选项行保持各自既有圆角。+N明细依据tagRemovable区分：可删除时为radius-md（6px）的Popover，静态时为radius-sm（4px）的Tooltip。保留4px标签内容内距与间距、宽度收紧、箭头锚定和删除交互。

**适用条件**：Cascader面板或标签溢出明细

## [wb-certification-details](workbench/wb-certification-details.md)

### 只读认证事实

id：`wb-certification-details-structure` · must / confirmed

白色内卡，16px内边距、6px圆角，12px字号；首行为认证类型（alert状态subtle标签）与归属代表处/系统部，第二行为认证开始、结束、能力复核三项日期；宽度不足时自动换行，长文本断行。

**适用条件**：认证详情

## [wb-chart](workbench/wb-chart.md)

### 图表类型与数据合同

id：`wb-chart-rule-1` · must / confirmed

type支持bar/line/area/bar-horizontal/donut/pie/gauge/radar。直角坐标图使用categories+series[{name,data,type?,stack?,axis?,color?}]，同stack堆叠、axis=right使用右轴；环形与饼图使用series[{name,value,color?}]；仪表使用value/min/max，可选segments[{to,color}]分段色带与scaleLabels刻度；雷达使用indicators[{name,max}]与series[{name,data}]。

**适用条件**：看板图表

### 颜色与可访问

id：`wb-chart-rule-2` · must / confirmed

默认系列色按登记调色板循环，仅在业务需要时用series.color覆盖。图表整体为role=img并提供ariaLabel；关键数值同时在页面文字中呈现，悬浮提示不是唯一信息来源。

**适用条件**：看板图表

## [wb-checkbox](workbench/wb-checkbox.md)

### 尺寸与状态

id：`wb-checkbox-rule-1` · must / confirmed

图形16×16px，图文间距8px，默认三级图标色描边，悬浮一级图标色；禁用优先于悬浮。

**适用条件**：独立多项选择与父级半选状态

### 版本范围

id：`wb-checkbox-rule-2` · must / confirmed

当前版本视觉参数已批准；新增样式与复杂交互通过后续版本评审，当前不推断支持。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 1

id：`wb-checkbox-rule-3` · must / confirmed

半选由父级计算并传入indeterminate；点击半选转为选中并清除半选，禁用阻止操作。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 2

id：`wb-checkbox-rule-4` · must / confirmed

图形对齐主文本首行；辅助说明左对齐，使用Caption M；noWrap超过20个字符省略且保留全文提示和可访问名称。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 3

id：`wb-checkbox-rule-5` · must / confirmed

CheckboxGroup纵向间距8px、横向16px并允许换行。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 4

id：`wb-checkbox-rule-6` · must / confirmed

Select多选复用无交互的ChoiceMark标识；listbox option负责选择语义和键盘操作，不嵌套第二个checkbox输入。

**适用条件**：独立多项选择与父级半选状态

### 使用约束 5

id：`wb-checkbox-rule-7` · must / confirmed

不显示文字时必须传入ariaLabel提供可访问名称。

**适用条件**：独立多项选择与父级半选状态

## [wb-collapse](workbench/wb-collapse.md)

### 预览入口 `/preview/WB-COLLAPSE-V1/collapse`。

id：`wb-collapse-rule-2` · must / confirmed

预览入口 `/preview/WB-COLLAPSE-V1/collapse`。本版为已批准 Vue 3 原型资产，多个折叠项互相独立，可同时展开；默认全部收起且不使用展开动画。

**适用条件**：折叠面板首版

### 折叠箭头位于最左侧，显示尺寸12px；箭头到标题组合4px。标题使用 `font

id：`wb-collapse-rule-4` · must / confirmed

主标题触发器按下钻/披露语义使用color-text-primary、color-text-action-hover、color-text-action-active与color-text-disabled，箭头通过currentColor同步。右侧actionLabel是独立操作型，使用完整Text Action状态链且不触发展开。折叠箭头12px，标题图标14px，标题到内容区12px。

**适用条件**：折叠面板首版

### 相邻折叠项之间只绘制一条分割线：收起模块到下方分割线12px，展开模块到下方分割线16px，分割线到下一模块始终12px。首项顶部和末项底部

id：`wb-collapse-rule-6` · must / confirmed

相邻折叠项之间只绘制一条分割线：收起模块到下方分割线12px，展开模块到下方分割线16px，分割线到下一模块始终12px。首项顶部和末项底部不绘制额外分割线。标题过长时单行省略并通过原生 `title` 保留全文，右侧操作保持可见。

**适用条件**：折叠面板首版

### Collapse 内容插槽不规定背景、内边距、高度或滚动方向。实际发生溢出的表格

id：`wb-collapse-rule-8` · must / confirmed

Collapse 内容插槽不规定背景、内边距、高度或滚动方向。实际发生溢出的表格或表单由自身滚动容器复用 `WorkbenchScrollbar`；覆盖式轨道不参与排版，宿主使用固定边缘内边距避免内容与轨道重叠。滚动条出现或消失不能改变面板宽度、标题、操作位置、内容可用宽度、文字换行或表格列宽。

**适用条件**：折叠面板首版

### 本版为 human-approved / prototype-validated

id：`wb-collapse-rule-10` · must / confirmed

本版为 human-approved / prototype-validated / prototype-only。正式实现位于 [internal reference omitted]

**适用条件**：折叠面板首版

### WorkbenchCollapse 提供默认插槽，WorkbenchCollap

id：`wb-collapse-rule-14` · must / confirmed

WorkbenchCollapse 提供默认插槽，WorkbenchCollapseItem 使用独立布尔 v-model，默认 false；支持 title、showIcon（默认false）、actionLabel、actionDisabled，action 事件、icon 与默认内容插槽。内容左边缘与标题对齐，有前缀图标时对齐图标。内容允许嵌套一层 Collapse；第三层及更深折叠项禁用。右侧操作禁用时不响应点击或进入 Tab 导航。

**适用条件**：折叠面板首版

### 收起时销毁内容插槽，重新展开会重新挂载；子组件内部状态、未托管的输入值及滚动位置

id：`wb-collapse-rule-16` · must / confirmed

收起时销毁内容插槽，重新展开会重新挂载；子组件内部状态、未托管的输入值及滚动位置可能重置。需要保留业务草稿时由父级保存数据并通过 v-model 传回；本版不提供 keep-alive 或手风琴模式。收起时不输出 aria-controls；展开时关联真实内容区域，区域名称取完整标题。

**适用条件**：折叠面板首版

### Collapse 不依赖 Scrollbar 实现，滚动由内容插槽自行配置。无动

id：`wb-collapse-rule-18` · must / confirmed

Collapse 不依赖 Scrollbar 实现，滚动由内容插槽自行配置。无动画；Vue 2、公司内部框架及生产交付尚未验证。

**适用条件**：折叠面板首版

## [wb-company-profile-shell](workbench/wb-company-profile-shell.md)

### 外壳与业务内容分离

id：`wb-company-profile-shell-content-ownership` · must / confirmed

Block 提供公司身份、导航、一级／二级页签和内容 Card；页签内容、权限与业务数据由调用方通过插槽和事件提供。

**适用条件**：同一公司下多类资料维护

## [wb-content-section](workbench/wb-content-section.md)

包内未提供规则；不补写设计结论。

## [wb-date-picker](workbench/wb-date-picker.md)

包内未提供规则；不补写设计结论。

## [wb-draft-list-filter](workbench/wb-draft-list-filter.md)

### 草稿显式提交

id：`wb-draft-list-filter-explicit-apply` · must / confirmed

筛选控件的编辑值与已应用条件分开保存；只有触发查询后才更新结果条件。

**适用条件**：手动查询管理列表

### 宿主执行重置

id：`wb-draft-list-filter-reset` · default / confirmed

Pattern 发出重置意图；宿主负责清空草稿与已应用条件，并同步结果集和分页。

**适用条件**：手动查询管理列表

## [wb-drawer](workbench/wb-drawer.md)

### 预览入口 `/preview/WB-DRAWER-V1/drawer`。首版覆盖

id：`wb-drawer-rule-2` · must / confirmed

预览入口 `/preview/WB-DRAWER-V1/drawer`。首版覆盖右侧/底部与模态/非模态四种组合，标题、关闭按钮和内容区始终存在，底部操作区按配置展示。

**适用条件**：Drawer首版

### 右侧最小宽度 296px、底部最小高度 360px 为本轮人工确认的原型参数。面

id：`wb-drawer-rule-4` · must / confirmed

右侧最小宽度 296px、底部最小高度 360px 为本轮人工确认的原型参数。面板尺寸默认按内容自适应，`panelSize` 接受合法 CSS 长度或数字像素值，组件仍以视口作为上限。480px 仅为配置能力的预览示例，不是正式默认值。

**适用条件**：Drawer首版

### 面板统一管理左右 24px、上下 20px 内边距；存在 Action 时底部改

id：`wb-drawer-rule-6` · must / confirmed

面板统一管理左右 24px、上下 20px 内边距；存在 Action 时底部改为 24px。标题到内容区 16px，内容区到 Action 24px，三段之间不使用分割线。标题使用 `font-headline-s`（16px/24px/500），最长占位与 16px 关闭按钮保持 16px 间距；超长标题单行省略并通过 `title` 保留全文。示意表单复用现有 Workbench Input、Select 与 Checkbox，不模拟原生控件外观。

**适用条件**：Drawer首版

### 关闭按钮直接使用 16px 原生图标按钮，不叠加可见外容器，图标右缘与面板保持 

id：`wb-drawer-rule-8` · must / confirmed

关闭按钮直接使用 16px 原生图标按钮，不叠加可见外容器，图标右缘与面板保持 24px。内容区直接复用 `wb-scrollbar`：10px 轨道和 4px 可见滑块贴面板右边缘，通过稳定 gutter 与补偿后的内容内边距保证滚动条出现前后正文宽度不变。

**适用条件**：Drawer首版

### 模态模式使用遮罩、背景 inert、页面滚动锁定与焦点圈定；非模态模式仅允许面板

id：`wb-drawer-rule-10` · must / confirmed

模态模式使用遮罩、背景 inert、页面滚动锁定与焦点圈定；非模态模式仅允许面板自身接收浮层指针事件，面板以外仍由原页面响应。关闭按钮、Escape、遮罩和配置为 `closeOnClick` 的 Action 均经过 `beforeClose`。

**适用条件**：Drawer首版

### 动效时长、缓动和 Preview 层级尚无 Foundation 决策，保留 T

id：`wb-drawer-rule-12` · must / confirmed

动效时长、缓动和 Preview 层级尚无 Foundation 决策，保留 Task-local proposed Candidate；减少动态效果偏好下取消过渡。本版已批准为 prototype-validated / prototype-only，未验证内部框架生产适配。

**适用条件**：Drawer首版

### 正式实现位于[internal reference omitted]

id：`wb-drawer-rule-14` · must / confirmed

正式实现位于[internal reference omitted] `--overlay-layer` 提供层级；正式默认不设置动效，预览动效及层级候选不属于批准规则。模态开启时隔离当前面板与其aria-controls关联浮层以外的背景，关闭或卸载仅释放本实例持有的隔离和滚动锁。关闭状态挂载、非模态模式不修改页面滚动设置。

**适用条件**：Drawer首版

## [wb-dropdown](workbench/wb-dropdown.md)

### 选型边界

id：`wb-dropdown-rule-1` · must / confirmed

操作与单选、复选配置混合菜单；不适用于表单字段选择、异步搜索、嵌套子菜单

**适用条件**：操作与单选、复选配置混合菜单

### 交互与调用合同

id：`wb-dropdown-rule-2` · must / confirmed

`items` 中 id 唯一；type 为 action/radio/checkbox/label/separator，radio 需 group 与 value。业务状态由调用方控制。trigger 插槽接收 open、selectedItems、summary、toggle、aria；调用方可选择在触发器、外部关联区域或完全不回显，Dropdown 不管理外部布局，也不提供回显位置 Prop。方向键、Home/End、Escape与焦点恢复保持菜单合同。

**适用条件**：操作与单选、复选配置混合菜单

### 复用边界

id：`wb-dropdown-rule-3` · must / confirmed

复选标记复用正式 choice/ChoiceMark内部原语及wb-checkbox/wb-radio设计合同。按钮式触发器复用Button secondary。文字式触发器通过textIntent区分action与drilldown，默认drilldown；操作型使用完整Text Action状态链，下钻/披露型依次使用color-text-primary、color-text-action-hover、color-text-action-active与color-text-disabled，展开期间持续使用active色。图标式触发器复用Button icon。各入口focus outline均为2px、偏移2px。

**适用条件**：操作与单选、复选配置混合菜单

## [wb-empty-state](workbench/wb-empty-state.md)

### 层级与结构

id：`wb-empty-state-level` · must / confirmed

local只显示描述及错误内联重试；card与page可选插画、标题、说明、操作。组件不加外层padding或固定内容高度，由父容器负责空间和居中。

**适用条件**：使用空状态；empty state；EmptyState

### 独立原档插画

id：`wb-empty-state-native-illustration` · must / confirmed

复用WorkbenchEmptyIcon独立登记的24个SVG；按语义和64/120/240原档选择，不重绘、不改色、不以另一档缩放替代。auto在card取120、page取240；显式small/default/large取64/120/240。

**适用条件**：使用空状态；empty state；EmptyState

### 请求与忙碌边界

id：`wb-empty-state-request-boundary` · must / confirmed

加载中使用Loading或Skeleton；已有有效内容不被空状态覆盖。重试、创建、返回等业务由消费方处理；busy禁用内建重试及主次操作，自定义actions按插槽busy自行管理。

**适用条件**：使用空状态；empty state；EmptyState

### 默认文案与自定义

id：`wb-empty-state-content` · must / confirmed

8种语义提供中英文默认文案；network-error/load-failed默认末尾有可键盘访问的内联重试。description Prop或插槽替换整段默认内容，不再自动追加默认重试；local不显示按钮组。

**适用条件**：使用空状态；empty state；EmptyState

## [wb-event-calendar](workbench/wb-event-calendar.md)

### 日期面板与当日列表

id：`wb-event-calendar-composition` · must / confirmed

由DatePicker面板模式（inline、fluid、flatInline、showInput=false、dateMarkers、showEmptyMarkers）与当日日程列表组合；有日程日期显示品牌色圆点，其余为灰色圆点；圆点6px、位于日期控件下方4px，上一行圆点到下一行控件12px。

**适用条件**：事件日历

### 收起与日程列表

id：`wb-event-calendar-agenda` · must / confirmed

收起条高32px、距日历8px，文字与箭头居中，阴影只在收起条下方；日程列表距收起条16px，使用组件滚动条和subtle分隔线；每项标题14px regular与分类标签，时间与地点16px图标、14px文字、4px间距。点击日程触发open，业务跳转由宿主处理。 时间使用用户确认的「首页 时间/time」原始16px图标。地点使用「定位/location」原始16px图标。

**适用条件**：事件日历

## [wb-expand-card](workbench/wb-expand-card.md)

### 摘要头与展开内容

id：`wb-expand-card-structure` · must / confirmed

浅灰背景（surface-card-tinted），头部上下8px、左右16px内边距：底座图标（建议PedestalIcon 28px）、标题（headline-xs）、右侧12px下箭头按钮；展开内容同样左右16px，展开/收起使用高度过渡且首帧不跳动，减少动效时关闭过渡。

**适用条件**：展开卡片

## [wb-feedback-dialog](workbench/wb-feedback-dialog.md)

### 用途与边界

id：`wb-feedback-dialog-rule-1` · must / confirmed

需要用户阅读结果并作出明确决定的反馈对话框。 非阻断反馈优先 Message/Notification；一般表单弹窗使用 Modal。

**适用条件**：使用反馈对话框 Feedback Dialog

### 交互与状态

id：`wb-feedback-dialog-rule-2` · must / confirmed

复用 Modal 的焦点隔离、S尺寸、恢复焦点和关闭守卫；禁用遮罩与Escape关闭。确认操作仅发一次意图，异步期间复选框和两个按钮均禁用。

**适用条件**：使用反馈对话框 Feedback Dialog

### 公开API

id：`wb-feedback-dialog-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| modelValue | 默认false，受控显示 |
| title / message | 必填标题和正文 |
| type / showIcon | info（默认）、success、warning、danger、critical、error；图标默认true |
| checkboxLabel / checkboxChecked | 可选复选文案与受控布尔值 |
| primaryAction / secondaryAction | 主操作必填、次操作可选；{id,label,disabled?} |
| pending | 外部异步工作期间禁用按钮与关闭，默认false |
| actionHandler | 可选(action)=>boolean\|void\|Promise；false或抛错保持打开 |
| beforeClose | 可选(reason)=>boolean\|void\|Promise；false阻止关闭 |

事件：update:modelValue、update:checkboxChecked、action(id)、close(reason)、action-error({action,error})、close-error(error)。
action 是点击意图通知，不等待事件监听器返回值。需要等待业务请求请使用 actionHandler，成功后再执行 beforeClose。处理期间防重复，失败保持上下文并交由调用方展示错误。

**适用条件**：使用反馈对话框 Feedback Dialog

## [wb-filter-chips](workbench/wb-filter-chips.md)

### 可点击标签单选

id：`wb-filter-chips-selection` · must / confirmed

以可交互Tag表达单选筛选，选中态使用Tag selected；带数量时显示为“名称(数量)”；选项自动换行，间距8px，不收纳为更多。

**适用条件**：业务筛选

## [wb-floating-button](workbench/wb-floating-button.md)

### 用途与边界

id：`wb-floating-button-rule-1` · must / confirmed

全局辅助入口、帮助、评分和返回顶部。 主业务提交放在页面操作区；不要用此组件替代导航或持久化业务状态。

**适用条件**：使用悬浮按钮 FloatingButton

### 交互与状态

id：`wb-floating-button-rule-2` · must / confirmed

主要点击区域48px，固定右32px/底178px；分组2–6项为已验证范围。返回顶部距离主组24px，滚动最近可滚动祖先。气泡支持hover/focus-visible及Escape；减少动态效果下停止动画和光滑滚动。

**适用条件**：使用悬浮按钮 FloatingButton

### 公开API

id：`wb-floating-button-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| variant | single（默认）/ group；group只有一项时回退圆形single |
| items | 默认[]；每项唯一id、label、disabled?、iconType?、icon?、popoverType?、title?、description? |
| expanded | 未传内部管理，传入后受控update:expanded |
| defaultVisibleCount | 未传显示全部；有限值取整限制0–items.length，非有限值显示全部 |
| showBackToTop | 默认false，独立于按钮数量，group内显示 |
| ratings | 可选{id:score}，受控评分；未传内部管理，分数0–10整数 |
| ariaLabel | 默认悬浮快捷操作 |

事件：update:expanded(boolean)、action(item)、back-to-top()、update:ratings(map)、rating-change({item,score})。
插槽：icon({item})替换图标；以popoverType命名的插槽({item})提供业务弹层，例如greeting/qrcode。内置label、info、rating；业务文案、二维码数据由调用方提供，无内置品牌与下载目标。

评分支持方向键、Home/End和单一Tab入口；ratings可外部初始化、修改、清空。禁用项不打开气泡或触发评分。

**适用条件**：使用悬浮按钮 FloatingButton

## [wb-followup-rows](workbench/wb-followup-rows.md)

包内未提供规则；不补写设计结论。

## [wb-footer](workbench/wb-footer.md)

包内未提供规则；不补写设计结论。

## [wb-form](workbench/wb-form.md)

### 职责与受控模型

id：`wb-form-rule-1` · must / confirmed

Form编排整组布局、同步校验和提交，model由调用方持有。FormItem可独立配置required/hint/validateStatus/message；位于Form内时必须提供prop点路径并接入model/rules。独立字段不自动获得整表校验。

**适用条件**：使用表单编排结构化字段

### 校验与提交合同

id：`wb-form-rule-2` · must / confirmed

rules支持required和同步validator，trigger支持blur/change；校验只保留Error状态并阻断提交，聚焦首个可编辑失败项。只读字段不参与提交校验。validateStatus仅支持空值或error，message是外部受控错误反馈并优先实时显示。validator抛错或返回Promise均转为Error结果，Promise不作为通过；本版不执行异步校验。

**适用条件**：校验或提交表单

### 公开API、Slots与事件

id：`wb-form-rule-3` · must / confirmed

Form props：title、titleVisible（默认true，false时标题视觉隐藏并保留可访问名称）、model、density(comfortable/compact，仅readonly紧凑行距，默认comfortable)、mode(editable/readonly/mixed)、labelPosition(top/left)、labelWidth、singleLine、showGrid；默认Slot放字段，actions Slot放操作；submit({model})和invalid({valid,errors})事件；ref暴露validate、resetValidation、focusFirstInvalid、submit。FormItem props：label、prop（Form内必填）、modelValue、required、hint、labelPosition、labelWidth、mode、size(s/base/m/l/xl)、rules、validateStatus(仅error或空值)、message、formatter；编辑态默认Slot获得status、message、describedBy、labelledBy、invalid、required；只读态readonly和readonly-actions Slot获得value、displayValue、prop、model，默认显示格式化文本；ref暴露validate、reset、focus和只读status。校验反馈仅错误文案，不显示图标或其他符号。FormGroup props：label、nested，默认Slot放字段。

**适用条件**：调用Form、FormItem或FormGroup

### 布局与只读边界

id：`wb-form-rule-4` · must / confirmed

内容区按656/968/1280px容器断点进入2/3/4列；显式size切换12单位跨度2/4/6/8/10。左右标签默认96px并与32px控件槽对齐；FormItem内Select填满控件槽，独立Select保留默认宽度；FormItem内Rating的星星按钮高32px，单行评分字段使用无可见描述形态，独立Rating尺寸不变；单列布局的actions位于末行右侧，顶部标签布局的同排actions对齐控件底边；nested缩进16px。readonly渲染语义文本而非禁用控件，mixed由字段mode选择只读或编辑。showGrid仅用于预览检查。

**适用条件**：配置表单布局或只读展示

### 必填星复用8×22px共享SVG

id：`wb-form-rule-5` · must / confirmed

WorkbenchFormItem复用WorkbenchRequiredMark共享SVG；8×22px画布与标签正文行高一致，图形内置纵向光学位置及#E02128颜色。画布在标签行盒中垂直居中并悬挂于文字左侧，不挤压标签或控件对齐。

**适用条件**：字段配置required或required校验规则

### 字段可用宽度与整行组合

id：`wb-form-field-width-20261026` · must / confirmed

FormItem内Select与日期选择器填满控件槽，独立使用保留自身默认宽度，日期面板尺寸不随字段变化。需整行的说明字段由父布局跨全部列；xl仍为10/12跨度，不等于整行。预览容器不裁剪左侧必填标记。

**适用条件**：FormItem内组合录入控件

## [wb-image-upload](workbench/wb-image-upload.md)

包内未提供规则；不补写设计结论。

## [wb-info-list](workbench/wb-info-list.md)

### 标题/标签/时间三层

id：`wb-info-list-structure` · must / confirmed

每项依次为：标题链接（14px body-m，单行省略）、subtle状态标签（small）、时间行（16px时钟图标+14px文字，间距4px，垂直居中）；三层间距8px，项上下8px，项间subtle分隔线。 时间使用用户确认的「首页 时间/time」原始16px图标。

**适用条件**：信息列表

## [wb-information-card](workbench/wb-information-card.md)

### 固定区域与独立操作

id：`wb-information-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：信息卡片组合

### 原生导航与职责边界

id：`wb-information-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-input](workbench/wb-input.md)

### `type`: text / textarea / passwo

id：`wb-input-rule-1` · must / confirmed

`type`: text / textarea / password；`v-model`保存文本；placeholder默认“请输入”。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：Input只提供裸输入和原生required

id：`wb-input-rule-2` · must / confirmed

Input只提供裸输入和原生required；可见label、labelPosition、必填星号、hint和message统一由WorkbenchFormItem配置，搜索筛选可继续使用裸Input。

**适用条件**：单行、多行、密码及单位输入

### `showTrailingIcon`与`trailing-ico

id：`wb-input-rule-3` · must / confirmed

`showTrailingIcon`与`trailing-icon` Slot配置单行后置图标。

**适用条件**：单行、多行、密码及单位输入

### 单行32px，多行88px。正文至少三行；独立滚动区不遮挡右下计

id：`wb-input-rule-4` · must / confirmed

单行32px，多行88px。正文至少三行；独立滚动区不遮挡右下计数器。

**适用条件**：单行、多行、密码及单位输入

### `maxLength`仅用于计数和校验，不设置原生maxleng

id：`wb-input-rule-5` · must / confirmed

`maxLength`仅用于计数和校验，不设置原生maxlength；按Unicode码点计数，超出后当前计数标红。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：首次失焦校验；之后随输入重新校验。valid

id：`wb-input-rule-6` · must / confirmed

首次失焦校验；之后随输入重新校验。validate(value)返回错误文案或空字符串；validation事件返回valid及message。位于字段内时反馈交由FormItem，reset清除已触发状态，初始必填不显示错误。

**适用条件**：单行、多行、密码及单位输入

### 密码默认掩码，按钮切换显示/隐藏；disabled禁止编辑和按钮

id：`wb-input-rule-7` · must / confirmed

密码默认掩码，按钮切换显示/隐藏；disabled禁止编辑和按钮交互。

**适用条件**：单行、多行、密码及单位输入

### `unit`显示外部固定单位；`unitOptions`提供单选

id：`wb-input-rule-8` · must / confirmed

`unit`显示外部固定单位；`unitOptions`提供单选单位后缀，通过`update:unit`回传。复用Search筛选：再次选择已选项取消，支持Hover、Focus、禁用、方向键及Escape。

**适用条件**：单行、多行、密码及单位输入

### 错误色沿用Foundation color-error；正文沿用

id：`wb-input-rule-9` · must / confirmed

错误色沿用Foundation color-error；正文沿用14px/22px，计数使用本组件专属12px/12px；14px图标与已批准Search尺寸一致，复用Search参数。

**适用条件**：单行、多行、密码及单位输入

### 当前为已批准设计与Vue 3原型验证；内部UI框架通过后续适配层

id：`wb-input-rule-10` · must / confirmed

当前为已批准设计与Vue 3原型验证；内部UI框架通过后续适配层实现以上API语义。

**适用条件**：单行、多行、密码及单位输入

### 多行顶部内边距4px，与32px单行中的22px正文对齐；计数器

id：`wb-input-rule-11` · must / confirmed

多行顶部内边距4px，与32px单行中的22px正文对齐；计数器固定右下，正文与计数器上下分区，不预留右侧整列空间。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：可见错误提示和必填红星由FormItem统一

id：`wb-input-rule-12` · must / confirmed

可见错误提示和必填红星由FormItem统一绘制；Input不重复提供标签、星号或反馈节点，控件通过共享字段上下文连接label、描述和错误。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：帮助文本由FormItem.hint统一配置

id：`wb-input-rule-13` · must / confirmed

帮助文本由FormItem.hint统一配置，与错误反馈共用字段样式；内容以控件槽宽度为限换行。Input不自绘帮助文本。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：标签、控件与反馈间距统一遵循FormItem

id：`wb-input-rule-14` · must / confirmed

标签、控件与反馈间距统一遵循FormItem现有样式，Input不追加字段padding或反馈间距。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：帮助文本由FormItem.hint配置，未

id：`wb-input-rule-15` · must / confirmed

帮助文本由FormItem.hint配置，未传或为空时不显示、不占空间；预览显示帮助文本开关控制字段hint，错误反馈独立于该开关。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：FormItem使用共享8×22必填星资源

id：`wb-input-rule-16` · must / confirmed

WorkbenchFormItem使用项目内共享WorkbenchRequiredMark SVG资源，原始画布8×22px，保留资源内红色与光学垂直位置；在标签行内垂直居中并挂在文字左侧，不影响标签与输入框左对齐。Input不绘制必填星。

**适用条件**：单行、多行、密码及单位输入

### 前后缀可独立配置：`prefixOptions` / `unit

id：`wb-input-rule-17` · must / confirmed

前后缀可独立配置：`prefixOptions` / `unitOptions`为空则不显示该侧；`prefixDisabled` / `suffixDisabled`独立禁用，保留选值并关闭面板，不影响正文输入或另一侧。`showPrefixIcon` / `showSuffixIcon`默认true，分别控制筛选文案左侧14px图标，并可用`prefix-icon` / `suffix-icon` Slot替换，默认图标为`文件夹/尺寸=14`。默认未选择时文字和图标为二级色；展开时二者为一级色；选择后收起，文字保留一级色、图标恢复二级色。整体disabled优先。预览右侧提供显示及禁用开关。

**适用条件**：单行、多行、密码及单位输入

### `resizable`默认true，多行框通过右下角原生手柄仅垂

id：`wb-input-rule-18` · must / confirmed

`resizable`默认true，多行框通过右下角原生手柄仅垂直调整；初始及最小高度88px，关闭或禁用时不可拖拽。计数器向左避让手柄，宽度仍由父布局决定。

**适用条件**：单行、多行、密码及单位输入

### 计数器专属豁免：12px字号/12px行高，右侧12px、底部2

id：`wb-input-rule-19` · must / confirmed

计数器专属豁免：12px字号/12px行高，右侧12px、底部2px；正文和计数器上下分区，取消右侧整列预留。垂直滚动条10px轨道，滑块4px、两侧3px，靠容器右边。豁免限定本组件计数器选择器。

**适用条件**：单行、多行、密码及单位输入

### 滚动条默认填充：浅色#191919/20%，深色#F3F3F3/

id：`wb-input-rule-20` · must / confirmed

滚动条默认填充：浅色#191919/20%，深色#F3F3F3/30%，悬浮使用color-scrollbar-thumb-fill-hover（浅色#AEAEAE）；默认色归wb-scrollbar批准合同，不借用文字或分隔线Token。

**适用条件**：单行、多行、密码及单位输入

### 滚动条滑块使用radius-full胶囊圆角，长度变化时两端保持

id：`wb-input-rule-21` · must / confirmed

滚动条滑块使用radius-full胶囊圆角，长度变化时两端保持半圆。

**适用条件**：单行、多行、密码及单位输入

### 支持`name`参与原生FormData；无可见标签时提供`ar

id：`wb-input-rule-22` · must / confirmed

支持`name`参与原生FormData；无可见标签时提供`ariaLabel`。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：validate(value)、requir

id：`wb-input-rule-23` · must / confirmed

validate(value)、required、maxLength及字段错误接入原生setCustomValidity；原生validationMessage与字段当前错误一致，无效时阻止原生表单提交。ref.validate()主动校验并返回布尔值，ref.focus()定位输入。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：外部错误通过FormItem.validat

id：`wb-input-rule-24` · must / confirmed

外部错误通过FormItem.validateStatus/message设置和清除，优先于本地校验与hint，不在输入时擅自清空服务器错误。禁用输入不参与有效性阻断。

**适用条件**：单行、多行、密码及单位输入

### compositionstart到compositionend期

id：`wb-input-rule-25` · must / confirmed

compositionstart到compositionend期间不提交中间文本或运行校验；组合结束提交完整文本。自动化覆盖合成组合事件，真实系统输入法仍需人工检查。

**适用条件**：单行、多行、密码及单位输入

### 同步校验函数必须无副作用并返回字符串。不支持Promise验证、

id：`wb-input-rule-26` · must / confirmed

同步校验函数必须无副作用并返回字符串。不支持Promise验证、原生form.reset自动重置受控值、输入掩码或文件输入；这些能力单独评审。

**适用条件**：单行、多行、密码及单位输入

### 纵向滚动滑块四边均留3px透明边框，配合padding-box和

id：`wb-input-rule-27` · must / confirmed

纵向滚动滑块四边均留3px透明边框，配合padding-box和radius-full，使可见4px滑块上下端保持半圆，避免仅左右留白产生扁椭圆。

**适用条件**：单行、多行、密码及单位输入

### 多行正文内容区左右内边距均为12px：左侧由容器提供，右侧由te

id：`wb-input-rule-28` · must / confirmed

多行正文内容区左右内边距均为12px：左侧由容器提供，右侧由实际滚动槽加textarea内边距组成，合计12px，不重复叠加；滚动条继续位于容器右侧，计数器布局不变。

**适用条件**：单行、多行、密码及单位输入

### 多行正文始终预留滚动槽（scrollbar-gutter: st

id：`wb-input-rule-29` · must / confirmed

多行正文始终预留滚动槽（scrollbar-gutter: stable），出现或消失滚动条时正文可用宽度保持不变，不因滚动条挤压而重新换行；12px正文内边距、独立计数区与靠右滚动条规则保持。

**适用条件**：单行、多行、密码及单位输入

### Input前后缀筛选面板圆角

id：`wb-input-affix-panel-radius-20261025` · must / confirmed

Input前缀与单位后缀筛选面板主体使用Foundation radius-md（6px）；输入框与筛选触发器保持各自既有圆角。

**适用条件**：使用Input前缀或单位后缀筛选

## [wb-link](workbench/wb-link.md)

### 链接负责真实跳转

id：`wb-link-semantic-boundary` · must / confirmed

页面、资源或地址跳转使用Link；提交、切换、展开收起等状态操作使用Button，不以文字外观混淆两类语义。

**适用条件**：选择Link或Button

### 字号跟随场景上下文

id：`wb-link-context-typography` · must / confirmed

Link不提供尺寸档位，不覆盖字号、行高、字重或字间距；表格、内嵌文本和独立文本中的排版均继承父级上下文。

**适用条件**：使用Link

### 默认无下划线，交互态有下划线

id：`wb-link-state-decoration` · must / confirmed

默认态不带下划线；悬浮、按下、键盘聚焦和禁用态显示1px下划线，下划线偏移2px。默认使用color-link，悬浮使用color-link-hover，按下使用color-link-active，禁用使用color-link-disabled。

**适用条件**：展示Link交互状态

### 左侧图标12px

id：`wb-link-leading-icon` · must / confirmed

Link可配置左侧12px图标，图标无额外安全边距，与文字间距4px，并通过currentColor同步文字颜色。

**适用条件**：Link配置图标

### 禁用链接不可交互

id：`wb-link-disabled` · must / confirmed

禁用Link移除有效href，设置aria-disabled且退出Tab顺序；不得导航或发出click事件。

**适用条件**：Link禁用

## [wb-loading](workbench/wb-loading.md)

### 用途与边界

id：`wb-loading-rule-1` · must / confirmed

已知操作正在处理中，内容结构未知或适合用进度标识时。 已知内容结构优先 Skeleton；不要把 Loading 当作禁用逻辑。

**适用条件**：使用加载 Loading

### 交互与状态

id：`wb-loading-rule-2` · must / confirmed

八个固定轨道圆点与旋转前景弧；减少动态效果偏好下停止动画，状态文案仍保留。

**适用条件**：使用加载 Loading

### 公开API

id：`wb-loading-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| size | 64 / 48 / 24 / 20 / 14 / 12，默认20；非法值回退20 |
| inverse | Boolean，默认 false；强调背景内使用反色 |
| label / ariaLabel | 默认为空；label 优先，有文案时输出 status/polite，无文案时装饰性 aria-hidden |

无业务事件。尺寸语境：64独立加载、48对话框、24大输入框、20默认输入框、14选择器/按钮、12紧凑场景。调用方负责 aria-busy、请求状态、阻止重复提交和超时错误。

**适用条件**：使用加载 Loading

## [wb-management-form-modal](workbench/wb-management-form-modal.md)

### 内容由宿主提供

id：`wb-management-form-modal-slots` · must / confirmed

Block 提供单层大尺寸 Modal、主要内容、可选提醒／补充区和 footer 插槽；字段、校验与提交回调由宿主持有。

**适用条件**：创建或编辑管理记录

### 不持有业务保存

id：`wb-management-form-modal-no-business-save` · must / confirmed

Block 只转发受控开关与关闭事件，不执行持久化，也不隐含成功状态。

**适用条件**：使用管理表单 Modal

## [wb-media-card](workbench/wb-media-card.md)

### 固定区域与独立操作

id：`wb-media-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：图文卡片组合

### 原生导航与职责边界

id：`wb-media-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-message](workbench/wb-message.md)

### 用途与边界

id：`wb-message-rule-1` · must / confirmed

用户操作后的短暂成功、错误或处理中反馈，无标题。 长期内容使用 Alert；右上角多条通知使用 Notification。

**适用条件**：使用全局提示 Message

### 交互与状态

id：`wb-message-rule-2` · must / confirmed

悬停与焦点独立暂停计时，两者都离开才恢复剩余时间；更换消息内容、键、类型或时长重新计时。链接不关闭，卸载清理定时器。

**适用条件**：使用全局提示 Message

### 公开API

id：`wb-message-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| modelValue | Boolean，默认 false；受控显示 |
| type | info（默认）、success、warning、danger、critical、error、loading |
| message / messageKey | 必填正文；可选 String/Number 实例键，相同正文的新键重置完整停留时间 |
| linkLabel / linkHref / showIcon / showClose | 链接文案与真实地址成对提供；图标和关闭按钮默认true |
| checkboxLabel / checkboxChecked | 可选“不再提示”文案；受控选中值，默认false |
| placement | global（默认，Teleport到body）/ dialog（父级相对定位内容内） |
| autoClose | 毫秒；全局默认2000，对话框有关闭2000、无关闭7000；0常驻；loading始终常驻 |

事件：`update:modelValue(false)`、`update:checkboxChecked(boolean)`、`close('timeout'|'button')`、`link({href})`。非法时长回退该布局默认值。

GlobalMessageStack：items 按最新在前，id 必填且唯一；新项进入顶部时短暂保留前一项，使其按 Notification 的 move 动效下移，200ms 后发送 dismiss({id,reason:'replaced'}) 请求退出，稳定态只保留最新一条。条目含 id、message、messageKey、type、linkLabel、linkHref、checkboxLabel、checkboxChecked、showIcon、showClose；autoClose 默认2000，loading常驻。事件 dismiss({id,reason:'timeout'|'button'|'replaced'})、link({id,href})、checkbox({id,checked})。父级必须按id删除或更新受控复选值，不要依赖组件修改数组。

正文默认按内容保持单行，最大宽度452px；空间不足时正文自然换行，链接标签不可拆分，复选框整体换至下一行并与正文起点对齐。图标和关闭按钮始终对齐正文第一行中心。

**适用条件**：使用全局提示 Message

### 真实导航链接

id：`wb-message-real-navigation` · must / confirmed

链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。

**适用条件**：提示内容包含导航入口

## [wb-metric-card](workbench/wb-metric-card.md)

### 固定区域与独立操作

id：`wb-metric-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：数值卡片组合

### 原生导航与职责边界

id：`wb-metric-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-modal](workbench/wb-modal.md)

### 预览入口 `/preview/WB-MODAL-V1/modal`。Modal 

id：`wb-modal-rule-2` · must / confirmed

预览入口 `/preview/WB-MODAL-V1/modal`。Modal 复用 Drawer 已确认的内容结构与间距：左右 24px、上下 20px，有 Action 时底部 24px；标题到内容 16px、内容到 Action 24px，三段之间不使用分割线。标题使用 `font-headline-s`（16px/24px/500），最长占位与 16px 关闭按钮保持 16px 间距；超长标题单行省略并通过 `title` 保留全文。关闭按钮为 16px 图标且不增加可见外容器。

**适用条件**：Modal首版

### S、M、L、XL 分别占 Workbench 固定版心 24 栅格中的 6、8、

id：`wb-modal-rule-4` · must / confirmed

S、M、L、XL 分别占 Workbench 固定版心 24 栅格中的 6、8、12、16 列。按 1856px 版心和 16px gutter 换算，目标宽度分别为 452px、608px、920px、1232px；当视口不足以容纳目标宽度时，面板收敛至 `视口宽度 - 64px`，左右各保留 32px 安全距离。

**适用条件**：Modal首版

### 最大高度为 `视口高度 - 顶部导航高度 - 64px`。顶部导航高度通过 `t

id：`wb-modal-rule-6` · must / confirmed

最大高度为 `视口高度 - 顶部导航高度 - 64px`。顶部导航高度通过 `topNavigationHeight` 配置；Preview 暂用 56px Proposed 示例值，等待真实产品壳层接入时传入实际高度。标题与 Action 固定，仅内容区滚动；滚动条复用 `wb-scrollbar` 并贴合面板右边缘。

**适用条件**：Modal首版

### 面板使用 `color-surface-overlay`、`radius-lg`

id：`wb-modal-rule-8` · must / confirmed

面板使用 `color-surface-overlay`、`radius-lg` 和 Dialog 专属 `shadow-xl`，遮罩使用 `color-scrim-modal`。打开后锁定页面滚动、隔离背景交互、圈定焦点；关闭后恢复触发元素焦点。关闭按钮、Escape、遮罩和配置为 `closeOnClick` 的 Action 均经过 `beforeClose`。

**适用条件**：Modal首版

### 编辑态示例中的“确认”和“取消”均配置 `closeOnClick: true`

id：`wb-modal-rule-10` · must / confirmed

编辑态示例中的“确认”和“取消”均配置 `closeOnClick: true`，业务校验通过后关闭。组件同时提供 `readonly` 布尔属性并将其作为默认插槽参数暴露；只读场景使用语义化标签–值信息组，不用 Disabled 表单控件模拟，并且不渲染底部操作区或 Action 按钮。

**适用条件**：Modal首版

### 动效时长、缓动、层级和 56px 顶部导航示例尚无正式 Foundation 决

id：`wb-modal-rule-12` · must / confirmed

动效时长、缓动、层级和 56px 顶部导航示例尚无正式 Foundation 决策，保留 Task-local Proposed Candidate。本版已批准为 prototype-validated / prototype-only，未验证内部框架生产适配。

**适用条件**：Modal首版

### 正式实现位于[internal reference omitted]

id：`wb-modal-rule-14` · must / confirmed

正式实现位于[internal reference omitted] `--overlay-layer` 提供层级；正式默认不设置动效，预览动效及层级候选不属于批准规则。模态开启时隔离当前面板与其aria-controls关联浮层以外的背景，关闭或卸载仅释放本实例持有的隔离和滚动锁。关闭状态挂载、非模态模式不修改页面滚动设置。

**适用条件**：Modal首版

### `topNavigationHeight` 由宿主传入实际导航高度；默认0表示无

id：`wb-modal-rule-16` · must / confirmed

`topNavigationHeight` 由宿主传入实际导航高度；默认0表示无导航，56px仅保留在Studio预览示例。

**适用条件**：Modal首版

## [wb-more-action](workbench/wb-more-action.md)

### 无容器文字下钻

id：`wb-more-action-style` · must / confirmed

使用Button appearance=text、intent=drilldown、drilldown=more与textLayout=inline：仅占文字行高、无内边距，右侧箭头沿用Button规则；保留悬浮、按下、焦点与禁用状态。

**适用条件**：卡片或页签头部下钻入口

## [wb-nested-confirmation](workbench/wb-nested-confirmation.md)

### 顶层对话框接收关闭意图

id：`wb-nested-confirmation-top-layer` · must / confirmed

子对话框打开时，父对话框忽略 Escape 和遮罩关闭；顶层关闭后的焦点恢复由底层 WorkbenchModal 负责。

**适用条件**：父级对话框打开子级对话框

### 子层结果由宿主暂存

id：`wb-nested-confirmation-staged-result` · must / confirmed

Pattern 只发出子层关闭意图；宿主负责清除取消的子草稿或把确认结果暂存到父层草稿，最终提交仍由父层确认。

**适用条件**：子对话框收集父流程所需信息

## [wb-notification](workbench/wb-notification.md)

### 用途与边界

id：`wb-notification-rule-1` · must / confirmed

右上角非阻断操作通知，可以包含标题、描述和链接。 阻断确认使用 Feedback Dialog；只需短句操作结果使用 Message。

**适用条件**：使用通知提醒 Notification

### 交互与状态

id：`wb-notification-rule-2` · must / confirmed

鼠标和键盘焦点任一位于通知内均暂停，离开后续计剩余时长；无关条目变化不重启计时；删除与卸载清理计时。

**适用条件**：使用通知提醒 Notification

### 公开API

id：`wb-notification-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| items | 默认[]；按新到旧排列，id必填且唯一 |
| 条目 | id、type(info/success/warning/danger/critical/error)、title、description、linkLabel、linkHref；链接文案与真实导航地址成对提供；showIcon/showClose未传视为true |
| surface | default（默认浮层背景）/ subtle（语义浅色） |
| duration | 默认5000毫秒；0常驻，负数或非有限值回退5000 |

事件：`dismiss({id,reason:'button'|'timeout'|'overflow'})`、`link({id,href})`。链接保留浏览器默认导航，事件只用于埋点或旁路监听。最多显示前三条，所有越界条目各发一次 overflow；父级负责移除。id在存续期间代表同一通知，发送新通知请用新id。修改duration对当前可见条目重置完整时长，同时保留悬停/焦点暂停。

**适用条件**：使用通知提醒 Notification

### 真实导航链接

id：`wb-notification-real-navigation` · must / confirmed

链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。

**适用条件**：提示内容包含导航入口

## [wb-number-count](workbench/wb-number-count.md)

### 受控数值合同

id：`wb-number-count-rule-1` · must / confirmed

modelValue 为受控数值；step 必须大于0，非法step按1处理。加减、ArrowUp/ArrowDown、Enter或失焦提交，结果按step精度计算并夹在可选min/max内；change返回{value,source}。

**适用条件**：录入数量

### 表单与禁用

id：`wb-number-count-rule-2` · must / confirmed

name写入中间spinbutton并参与FormData；达到边界时仅禁用对应操作，整体disabled禁用输入和两侧操作。空值或非法文本在提交时恢复当前受控值。

**适用条件**：表单录入数量

## [wb-pagination](workbench/wb-pagination.md)

### 选型边界

id：`wb-pagination-rule-1` · must / confirmed

已知总量列表的分页与每页数量切换；不适用于未知总量无限加载、服务端请求调度

**适用条件**：已知总量列表的分页与每页数量切换

### 交互与调用合同

id：`wb-pagination-rule-2` · must / confirmed

`total` 是有限非负整数；`v-model` 页码从1开始，pageSize 是正整数（无效时显示按10），pageSizeOptions 过滤无效或重复值。`middlePageCount` 是正整数，默认3，决定连续中间页数和省略号单次跳转页数。`update:modelValue` 与 change 发出页码；`update:pageSize` 与 page-size-change 发出数量。调用方负责接收更新、请求数据及错误呈现。simpleMode 默认click，可选select和input；simpleEditable=true等价于simpleMode=input。disabled 默认false。每页菜单 ID 按实例生成，离开焦点或外点关闭，Escape 关闭并恢复焦点。首版不包含 loading 或异步请求竞态管理。

**适用条件**：已知总量列表的分页与每页数量切换

### 复用边界

id：`wb-pagination-rule-3` · must / confirmed

页码、24px箭头、32px每页数量菜单及连续的48+48px跳转组合是 Pagination 内部结构。Dropdown 默认36px菜单项及受控值事件不匹配此32px布局，Input 的完整表单校验结构也不适用于内部页码草稿，首版保留原生语义元素并共享 Foundation 状态 Token。

**适用条件**：已知总量列表的分页与每页数量切换

### 每页数量菜单选中样式

id：`wb-pagination-size-menu-selection` · must / confirmed

文字统一一级文本色；数量触发器使用Select同款固定下箭头及共享180度展开动效，精简页码选择保留Select原生箭头。选中项右侧使用登记完成14px图标，在14px方框垂直居中。菜单行横向内距8px、内部间距4px，行高保留32px。 面板与触发框等宽，仅选中项显示勾选插槽。

**适用条件**：完整分页器的每页数量选择

**包内引用**：["wb-dropdown-rule-2"]

## [wb-pedestal-icon](workbench/wb-pedestal-icon.md)

### 底托图标原档

id：`wb-pedestal-icon-native-artwork` · must / confirmed

使用 WorkbenchPedestalIcon 按登记名称选择完整原图；默认保留原始设计框及导出外溢。用户确认的 size=28 或 48 可适配完整原始画布，不复制资源，不改变 SVG 绘制和颜色。

**适用条件**：底托图标；pedestal icon；WorkbenchPedestalIcon

## [wb-policy-links](workbench/wb-policy-links.md)

### 文档图标+名称+右箭头

id：`wb-policy-links-structure` · must / confirmed

每项为原生链接：14px文件图标、14px文字、12px右箭头，图文间距4px；多项横向排列并换行，行间距8px、项间距24px；整体为带可访问名称的nav。

**适用条件**：政策链接

## [wb-popconfirm](workbench/wb-popconfirm.md)

### 用途与边界

id：`wb-popconfirm-rule-1` · must / confirmed

触发器附近的简单确认，可用一段正文说明影响。 复杂表单、长文本、高风险必须阅读的信息使用 Modal/Feedback Dialog。

**适用条件**：使用气泡确认 Popconfirm

### 交互与状态

id：`wb-popconfirm-rule-2` · must / confirmed

主体和尾巴复用 Popover 正式几何参数；视口不足翻转夹紧；aria-controls关联隔离浮层，支持在Modal内部使用。

**适用条件**：使用气泡确认 Popconfirm

### 公开API

id：`wb-popconfirm-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| open | 未传内部管理，传入后由update:open控制；disabled强制隐藏 |
| placement | top（默认）、right、bottom、left及各自-start/-end，共12方位 |
| type / showIcon | info（默认）、warning、danger、critical、error；图标默认true |
| title / message | 必填标题，可选正文 |
| confirmText / cancelText | 默认确认/取消 |
| showCancel / confirmDisabled / cancelDisabled | 默认true/false/false |
| pending / beforeConfirm | 外部忙碌状态；可选异步确认回调，false或抛错保持打开 |

trigger 插槽收到 {open,aria}，调用方必须将aria绑定到单一可聚焦按钮。事件 update:open(boolean)、confirm()（beforeConfirm成功后）、cancel('cancel'|'outside'|'escape'|'tab')、confirm-error(error)。事件监听器返回的Promise不作为确认守卫。

打开时焦点进入首个可用操作（优先取消）；Escape/取消回到触发器，Tab沿触发器所在页面顺序离开。待处理时禁止重复确认和关闭。关闭受控浮层需父级接受update:open。

**适用条件**：使用气泡确认 Popconfirm

## [wb-popover](workbench/wb-popover.md)

### 内容与视觉合同

id：`wb-popover-rule-1` · must / confirmed

正文默认插槽必填，可在其中嵌入正式 WorkbenchLink；title 可选。标题使用 font-headline-s（16/24、500），标题与正文间距8px；无标题时正文使用 color-text-primary，有标题时正文使用 color-text-secondary，正文排版为 font-body-m（14/22、400）。主体使用 color-surface-overlay、radius-md、shadow-lg、16px 内边距，最大宽度452px。

**适用条件**：展示气泡说明

### 方向与尾巴合同

id：`wb-popover-rule-2` · must / confirmed

placement 支持 top/right/bottom/left 的 start/center/end 三档。尾巴沿边缘宽12px、外伸8px，仅尖端使用4px圆角，与主体连接的两侧保持直角；start/end 尾巴中心距对应主体边缘16px，center 居中。指定方向空间不足时自动翻转到对侧，横轴或纵轴不足时夹紧于视口。

**适用条件**：指定气泡方向

### 悬停与键盘合同

id：`wb-popover-rule-3` · must / confirmed

触发器和面板任一悬停或获得焦点时保持打开；离开二者且焦点不在组合内时关闭。open 未传时内部控制，传入时响应 update:open；disabled 强制关闭。Esc 关闭并将焦点返回触发器。

**适用条件**：使用 Popover

## [wb-quick-app-card](workbench/wb-quick-app-card.md)

### 固定区域与独立操作

id：`wb-quick-app-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：快捷应用卡片组合

### 原生导航与职责边界

id：`wb-quick-app-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-radio](workbench/wb-radio.md)

### 尺寸与状态

id：`wb-radio-rule-1` · must / confirmed

图形16×16px，图文间距8px，默认三级图标色描边，悬浮一级图标色；禁用优先于悬浮。

**适用条件**：互斥选择

### 版本范围

id：`wb-radio-rule-2` · must / confirmed

当前版本视觉参数已批准；新增样式与复杂交互通过后续版本评审，当前不推断支持。

**适用条件**：互斥选择

### 使用约束 1

id：`wb-radio-rule-3` · must / confirmed

同组使用相同name，value唯一，通过v-model共享值；原生Radio支持键盘互斥选择，选中白色内圆7px。

**适用条件**：互斥选择

### 文案与辅助说明

id：`wb-radio-rule-4` · must / confirmed

图形对齐主文本首行；辅助说明左对齐，使用Caption M；noWrap超过20个字符省略且保留全文提示和可访问名称。

**适用条件**：互斥选择

### 选项组排列

id：`wb-radio-rule-5` · must / confirmed

RadioGroup纵向间距8px、横向16px并允许换行；其示例结构和布局规则与CheckboxGroup保持一致。

**适用条件**：互斥选择

### 无可见文字

id：`wb-radio-rule-6` · must / confirmed

不显示文字时必须传入ariaLabel提供可访问名称。

**适用条件**：互斥选择

## [wb-rating](workbench/wb-rating.md)

### 评分与键盘合同

id：`wb-rating-rule-1` · must / confirmed

modelValue为0至max的受控分值；max为正整数，step仅支持1或0.5。点击选择，方向键按step移动，Home清空，End选满，并同步移动焦点。

**适用条件**：星级评分

### 说明与表单

id：`wb-rating-rule-2` · must / confirmed

descriptionMode支持none/text/numeric/per-star，说明位于右侧或下方；name存在时通过隐藏输入参与FormData。disabled阻止选择并使用禁用图标色；readOnly阻止点击和键盘选择但保留正常评分颜色。星形复用WorkbenchIcon收藏实心图标，在13px槽内等比渲染；通过colorSplit接口在单个SVG内以同位置色标沿中心线硬分色，避免独立裁切与叠层在浏览器缩放时产生接缝。

**适用条件**：评分伴随文字或表单提交

## [wb-readonly-fields](workbench/wb-readonly-fields.md)

包内未提供规则；不补写设计结论。

## [wb-scrollbar](workbench/wb-scrollbar.md)

### Small（小尺寸）：轨道10px，默认可见滑块4px、两侧各3px；Hover

id：`wb-scrollbar-rule-1` · must / confirmed

Small（小尺寸）：轨道10px，默认可见滑块4px、两侧各3px；Hover/拖动可见滑块6px、两侧各2px。

**适用条件**：滚动条尺寸选择

### Default（默认尺寸）：轨道14px，默认可见滑块6px、两侧各4px；Ho

id：`wb-scrollbar-rule-2` · must / confirmed

Default（默认尺寸）：轨道14px，默认可见滑块6px、两侧各4px；Hover/拖动可见滑块10px、两侧各2px。

**适用条件**：滚动条尺寸选择

### 小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜

id：`wb-scrollbar-rule-3` · must / confirmed

小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜单、多行输入框、弹出气泡框内的滚动。

**适用条件**：滚动条尺寸选择

### 默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧

id：`wb-scrollbar-rule-4` · must / confirmed

默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧边抽屉等尺寸较大的独立层级，以及用户需要频繁拖拽或观察滚动位置的区域。

**适用条件**：滚动条尺寸选择

### 水平和纵向对称应用，滑块四边等宽透明边框，radius-full，确保可见端部为

id：`wb-scrollbar-rule-5` · must / confirmed

水平和纵向对称应用，滑块四边等宽透明边框，radius-full，确保可见端部为半圆。

**适用条件**：滚动条尺寸选择

### 浅色默认#191919/20%，深色默认#F3F3F3/30%；悬浮及拖动使用c

id：`wb-scrollbar-rule-6` · must / confirmed

默认#DFDFDF；悬浮及拖动使用color-scrollbar-thumb-fill-hover（#AEAEAE）。

**适用条件**：滚动条尺寸选择

### `WorkbenchScrollbar.vue` 提供覆盖式轨道，不参与内容排版

id：`wb-scrollbar-rule-7` · must / confirmed

`WorkbenchScrollbar.vue` 提供覆盖式轨道，不参与内容排版。显隐、Hover与拖动不改变内容可用宽高和宿主面板尺寸；尺寸与内容变化由ResizeObserver重新测量。

**适用条件**：滚动条尺寸选择

### `axis`: vertical（默认）或horizontal；`size`: 

id：`wb-scrollbar-rule-8` · must / confirmed

`axis`: vertical（默认）或horizontal；`size`: small或default（默认）；large保留为default的兼容别名；`label`必填，`describedby`可选；默认Slot为滚动内容。宿主约束尺寸，主内容及页面级使用default，辅助微型区域显式使用small。

**适用条件**：滚动条尺寸选择

### 滚动内容保持浏览器原生滚动，隐藏原生滚动条；覆盖轨道支持Pointer拖动、轨道

id：`wb-scrollbar-rule-9` · must / confirmed

滚动内容保持浏览器原生滚动，隐藏原生滚动条；覆盖轨道支持Pointer拖动、轨道点击、捕获释放。区域可Tab聚焦，支持方向键、PageUp/Down、Home/End，触屏及滚轮使用原生滚动。非溢出时无轨道，滑块长度随可见内容比例变化。

**适用条件**：滚动条尺寸选择

### 宿主在内容边缘安排固定内边距，避免边缘交互控件与轨道重叠，不随滚动条显隐切换内边

id：`wb-scrollbar-rule-10` · must / confirmed

宿主在内容边缘安排固定内边距，避免边缘交互控件与轨道重叠，不随滚动条显隐切换内边距。

**适用条件**：滚动条尺寸选择

### `scrollbar.css`仍供textarea等原生控件使用：wb-scro

id：`wb-scrollbar-rule-11` · must / confirmed

`scrollbar.css`仍供textarea等原生控件使用：wb-scrollbar保留原生小尺寸，wb-scrollbar--large为历史默认尺寸样式类，提供尺寸和Hover；单独使用CSS类不提供覆盖式布局保证，宿主须管理稳定空间。Firefox原生样式只能thin降级，精确尺寸应使用覆盖式组件。

**适用条件**：滚动条尺寸选择

### 预览含默认尺寸水平表格、小尺寸气泡内容滚动、默认尺寸页面视口；演示内容尺寸不是正

id：`wb-scrollbar-rule-12` · must / confirmed

预览含默认尺寸水平表格、小尺寸气泡内容滚动、默认尺寸页面视口；演示内容尺寸不是正式布局Token。

**适用条件**：滚动条尺寸选择

## [wb-search](workbench/wb-search.md)

### 基础搜索默认占4/12或8/24栅格；前后缀共存默认占6/12或12/2

id：`wb-search-rule-1` · must / confirmed

基础搜索默认占4/12或8/24栅格；前后缀共存默认占6/12或12/24栅格；单侧从4/12或8/24起算，按实际内容增跨。

**适用条件**：文本搜索及前后缀筛选

### 搜索核心最小宽度296px

id：`wb-search-rule-2` · must / confirmed

搜索核心最小宽度296px。所属轨道更宽时，核心随轨道拉伸。

**适用条件**：文本搜索及前后缀筛选

### 组合的实际最小宽度为“296px核心 + 所有筛选段实际宽度之和”

id：`wb-search-rule-3` · must / confirmed

组合的实际最小宽度为“296px核心 + 所有筛选段实际宽度之和”。默认跨度不足时，`SearchGridItem` 增加跨度，最多占满当前行。

**适用条件**：文本搜索及前后缀筛选

### 页面负责栅格、位置、断点和组合关系；`WorkbenchSearch` 

id：`wb-search-rule-4` · must / confirmed

页面负责栅格、位置、断点和组合关系；`WorkbenchSearch` 不推断页面布局。

**适用条件**：文本搜索及前后缀筛选

### 默认占位文案为“请输入搜索内容”

id：`wb-search-rule-5` · must / confirmed

默认占位文案为“请输入搜索内容”。聚焦保持1px描边，仅改变颜色。图标与文字垂直居中。

**适用条件**：文本搜索及前后缀筛选

### 核心高32px、圆角4px，复用 Select 的默认、Hover、Fo

id：`wb-search-rule-6` · must / confirmed

核心高32px、圆角4px，复用 Select 的默认、Hover、Focus、Disabled Fill 与 Border Token。

**适用条件**：文本搜索及前后缀筛选

### 搜索图标、清除图标和筛选图标为14px；筛选箭头为10px

id：`wb-search-rule-7` · must / confirmed

搜索图标、清除图标和筛选图标为14px；筛选箭头为10px。

**适用条件**：文本搜索及前后缀筛选

### 筛选段和搜索核心位于同一个圆角矩形容器内；筛选段没有独立交互描边

id：`wb-search-rule-8` · must / confirmed

筛选段和搜索核心位于同一个圆角矩形容器内；筛选段没有独立交互描边。前缀左右结构为 `12 + 14 + 4 + 文案 + 6 + 10 + 8`；后缀为 `8 + 14 + 4 + 文案 + 6 + 10 + 12`。

**适用条件**：文本搜索及前后缀筛选

### 默认未选文案为“筛选”，文字与图标使用各自的Secondary Toke

id：`wb-search-rule-9` · must / confirmed

默认未选文案为“筛选”，文字与图标使用各自的Secondary Token。悬浮、点击、聚焦及展开时文字与图标转Primary；已选或预设选项显示选项文案，失焦后文字保留Primary、图标恢复Secondary。展开箭头使用激活色，禁用时使用禁用色。

**适用条件**：文本搜索及前后缀筛选

### 双侧模式使用 `v-model:prefix-value` / `v-m

id：`wb-search-rule-10` · must / confirmed

双侧模式使用 `v-model:prefix-value` / `v-model:suffix-value` 和 `prefixOptions` / `suffixOptions`，两侧独立。分别通过 `prefix-icon` / `suffix-icon` Slot 注入图标，保留 `filter-icon` 回退。

**适用条件**：文本搜索及前后缀筛选

### 面板表面、宽度与选中勾

id：`wb-search-rule-11` · must / confirmed

面板距筛选段4px、无描边，使用color-surface-overlay和shadow-base；默认宽120px且不小于筛选段，单选选中勾14px。

**适用条件**：文本搜索及前后缀筛选

### 选项Hover使用弱填充

id：`wb-search-rule-12` · must / confirmed

选项Hover使用弱填充。单选选中项没有背景填充并显示勾；禁用项不可点击。

**适用条件**：文本搜索及前后缀筛选

### Tab进入输入框和筛选触发器；Enter执行搜索、展开面板或选择选项；方

id：`wb-search-rule-13` · must / confirmed

Tab进入输入框和筛选触发器；Enter执行搜索、展开面板或选择选项；方向键移动可用选项；Escape关闭面板。

**适用条件**：文本搜索及前后缀筛选

### 禁用选项会被方向键导航跳过

id：`wb-search-rule-14` · must / confirmed

禁用选项会被方向键导航跳过。

**适用条件**：文本搜索及前后缀筛选

### 搜索、清除和箭头图标当前由原型提供；筛选业务图标通过 Slot 注入

id：`wb-search-rule-15` · must / confirmed

搜索、清除和箭头图标当前由原型提供；筛选业务图标通过 Slot 注入。公司内部 UI 框架接入时由适配层映射，不改动本规范语义。

**适用条件**：文本搜索及前后缀筛选

### 本任务不实现搜索建议、远程搜索、历史记录或多选筛选

id：`wb-search-rule-16` · must / confirmed

本任务不实现搜索建议、远程搜索、历史记录或多选筛选。

**适用条件**：文本搜索及前后缀筛选

### 再次点击已选选项（或键盘Enter）取消该侧筛选，值更新为空字符串，`f

id：`wb-search-rule-17` · must / confirmed

再次点击已选选项（或键盘Enter）取消该侧筛选，值更新为空字符串，`filter-change` 返回 `null`，恢复“筛选”文案并关闭面板；另一侧保持原值。

**适用条件**：文本搜索及前后缀筛选

### 禁用填充只在整体容器绘制一次，搜索核心和筛选段透明，避免半透明Token

id：`wb-search-rule-18` · must / confirmed

禁用填充只在整体容器绘制一次，搜索核心和筛选段透明，避免半透明Token叠加导致色差。

**适用条件**：文本搜索及前后缀筛选

### `showPrefixIcon`、`showSuffixIcon` 默认

id：`wb-search-rule-19` · must / confirmed

`showPrefixIcon`、`showSuffixIcon` 默认为 `true`，分别控制两侧筛选文字左侧图标。关闭时一并移除图标与文字之间的间距，保留文字、箭头和选择行为。预览右侧提供对应独立开关。

**适用条件**：文本搜索及前后缀筛选

### `prefixDisabled` / `suffixDisabled` 

id：`wb-search-rule-20` · must / confirmed

`prefixDisabled` / `suffixDisabled` 默认为 `false`，独立禁用该侧筛选并关闭已展开面板，保留选值。文字与图标使用禁用色，Hover不变色，搜索核心与另一侧保持可用。整体 `disabled` 优先。右侧控制项提供对应开关。

**适用条件**：文本搜索及前后缀筛选

### 筛选图标和文字按默认、展开、选中状态切换颜色

id：`wb-search-rule-21` · must / confirmed

未选择默认态文字和图标均为二级色；展开时两者为一级色；选中后收起时文字保留一级色、图标恢复二级色，即使触发器仍保持焦点。展开箭头使用激活色。

**适用条件**：文本搜索及前后缀筛选

### Search前后缀筛选面板圆角

id：`wb-search-affix-panel-radius-20261025` · must / confirmed

Search前缀与后缀筛选面板主体使用Foundation radius-md（6px）；筛选触发器、搜索核心及选项行保持各自既有圆角。

**适用条件**：使用Search前缀或后缀筛选

## [wb-select](workbench/wb-select.md)

### 支持单选、多选以及默认、悬浮、聚焦、禁用、已选择状态

id：`wb-select-rule-1` · must / confirmed

支持单选、多选以及默认、悬浮、聚焦、禁用、已选择状态。v-model始终使用值数组；options为{value,label,disabled?}数组。

**适用条件**：单选或多选已有选项

### 默认高度32px、默认宽度296px，一般对应4栅格

id：`wb-select-rule-2` · must / confirmed

默认高度32px；独立使用默认宽度296px，296px不是最小宽度。Modal/Drawer内容字段默认填满可用宽度；FormItem沿用字段的自适应宽度，四栅格由Form/Grid父容器决定。字段容器可通过--select-field-width提供宽度，显式width仍优先；工具栏行保留独立默认宽度，内联窄字段显式指定width。组件不自行推断页面位置。

**适用条件**：单选或多选已有选项

### 默认文案“请选择”，占位文本色；选中值用主文本色

id：`wb-select-rule-3` · must / confirmed

默认文案“请选择”，占位文本色；选中值用主文本色。默认左右内边距12px，箭头10×10px，默认次级文本色、展开激活色；展开本身不改变描边。

**适用条件**：单选或多选已有选项

### 多选标签高24px，在32px容器内垂直居中

id：`wb-select-rule-4` · must / confirmed

多选标签高24px，在32px容器内垂直居中。标签左外边距4px、标签自身左右内边距8px、标签间距8px；首个标签文字距左侧12px，箭头右边距12px。

**适用条件**：单选或多选已有选项

### 单个标签超过7字符显示前7字符加省略号，悬停显示全文；放不下的末尾标签收

id：`wb-select-rule-5` · must / confirmed

单个标签超过7字符显示前7字符加省略号，悬停显示全文；放不下的末尾标签收起为+N，保持已显示标签宽度。从+N到箭头前的剩余区域作为悬浮热区，在选择器上方用带下指箭头的气泡逐个展示被收起的标签；气泡内标签保留完整填充容器和全文提示。单选及选项长文省略并保留全文提示。

**适用条件**：单选或多选已有选项

### 面板距触发器4px、内部间距4px、无描边；选项仅悬浮或键盘聚焦时有弱填

id：`wb-select-rule-6` · must / confirmed

面板距触发器4px、内部间距4px、选项高36px、无描边；选项仅悬浮或键盘聚焦时有弱填充，选中项不叠加背景。单选选中显示勾，多选复用已批准Checkbox的ChoiceMark，图文间距8px，整行只有一个option交互入口。

**适用条件**：单选或多选已有选项

### 默认描边color-border，悬浮color-border-hove

id：`wb-select-rule-7` · must / confirmed

可见标签、必填标记、帮助文本和错误反馈统一由FormItem绘制；裸Select的label仅提供可访问名称，搜索筛选可直接使用裸Select。字段内实际combobox同时连接字段标签与完整选值名称，listbox连接字段标签。

**适用条件**：单选或多选已有选项

### 支持基本打开关闭、单选多选、方向键与Escape

id：`wb-select-rule-8` · must / confirmed

支持基本打开关闭、单选多选、方向键与Escape。选项级禁用独立于整体禁用，禁用项不响应选择且跳过键盘焦点。完整选值保留可访问名称。

**适用条件**：单选或多选已有选项

### 本版本不提供搜索、清空、全选、标签删除、远程选项、浮层翻转等额外能力；新

id：`wb-select-rule-9` · must / confirmed

本版本不提供搜索、清空、全选、标签删除、远程选项、浮层翻转等额外能力；新增交互与样式单独评审。showPanel仅供预览检查，不作为业务交互模式。

**适用条件**：单选或多选已有选项

### Select面板与+N明细的用户确认圆角

id：`wb-select-panel-radius-20261025` · must / confirmed

Select下拉面板主体使用Foundation radius-md（6px）；Select触发器与选项行保持各自既有圆角。正式Select不提供标签删除API，因此正式组件的静态+N明细使用Tooltip及radius-sm（4px）；Studio可删除扩展的+N明细使用Popover及radius-md（6px），不将删除能力加入正式Select API。保留4px标签内容内距与间距、宽度收紧、箭头锚定及扩展已有删除行为。

**适用条件**：Select下拉面板或多选标签+N明细

## [wb-side-navigation](workbench/wb-side-navigation.md)

### 侧栏基础尺寸

id：`wb-side-navigation-dimensions` · must / confirmed

主菜单与二级菜单固定48px；无标题时首行距顶部12px；标题展示时标题与一级图标左对齐，标题到水平分割线24px，分割线到首个一级菜单4px；内容左右16px、图文和箭头间距12px；一级统一显示16px线性图标，缺省使用宫格图标兜底；二级不显示图标，文字与一级文字对齐。箭头10px、文字font-body-m。默认宽度遵循页面栅格，在24列页面占4栅格，允许width指定更宽尺寸；收起宽48px。右侧纵向分割线默认显示，可用showDivider=false隐藏。

**适用条件**：侧边导航

### 选中和交互状态

id：`wb-side-navigation-states` · must / confirmed

Hover与焦点铺满整行且无圆角；选中使用color-fill-selected灰底。左侧2×12px品牌红胶囊只标识最终选中的叶子页面路径；仅打开带子级的菜单不显示红条，同一时间最多一个侧栏菜单项显示红条。展开态一级图标保持color-icon-primary；仅在整体折叠态，当前选中项及其所属一级菜单图标使用color-brand，其他一级图标保持默认色。箭头采用/ic_arrow_right_line#2:141 SVG。

**适用条件**：侧边导航

### 四级导航与面板

id：`wb-side-navigation-hierarchy` · must / confirmed

前两级在侧栏内展开，第三级及第四级用flyout双列描述面板、popup菜单面板、columns四列搜索面板展示。columns四级菜单默认文字使用color-text-secondary，悬浮时显示灰色底，选中后文字使用brand色；右侧收藏在off线性图标与on面性图标间切换，on使用color-warning。popup提供small/default/large密度；侧栏菜单48px不随密度改变。popup选中文字保持color-text-primary，右侧仅为当前选中项显示完成/尺寸=12图标，不为祖先重复显示勾选。

**适用条件**：侧边导航

### 受控状态与展开历史

id：`wb-side-navigation-state-ownership` · must / confirmed

collapsed、expandedItems、activeItem均受控；整体收起不清除已展开父级及选中叶子。topToggle可选或由宿主调用toggle方法；底部按钮collapsible可选。

**适用条件**：侧边导航

### 边线与阴影边界

id：`wb-side-navigation-decoration` · must / confirmed

基础侧栏无阴影且无圆角，只在内侧右边绘制0.5px color-border-separator线，亮色为DFDFDF。深层面板才使用shadow-r-sm或popup的shadow-base。

**适用条件**：侧边导航

### 键盘与可访问性

id：`wb-side-navigation-keyboard` · must / confirmed

使用nav、ul、button；aria-current与aria-expanded关联真实状态。方向键与Home/End移动同级焦点，Right打开、Left返回，Escape关闭面板并回焦点。

**适用条件**：侧边导航

### 注册与交付资格

id：`wb-side-navigation-eligibility` · must / confirmed

用户授权后正式注册Catalog和Vue3公共导出。交付范围为preview-vue3，Vue2及生产目标未验证。不得宣称生产可用。

**适用条件**：侧边导航

## [wb-skeleton](workbench/wb-skeleton.md)

### 用途与边界

id：`wb-skeleton-rule-1` · must / confirmed

加载前已知内容结构，以稳定骨架占位减少跳动。 未知进度用 Loading；静态布局说明不要被播报为正在加载。

**适用条件**：使用骨架屏 Skeleton

### 交互与状态

id：`wb-skeleton-rule-2` · must / confirmed

整体只播报一次；内部块不重复播报；每个变体复用同一块实现。

**适用条件**：使用骨架屏 Skeleton

### 公开API

id：`wb-skeleton-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| variant | title-text（默认）、text、media-text、item-text、hero-text；非法值回退默认 |
| showTitle | Boolean，默认 true；text 变体始终无标题 |
| lines | 默认3；有限数向下取整并限制1–5，NaN/Infinity回退3 |
| animated | Boolean，默认 true；关闭或 reduced-motion 时不动 |
| label | 默认空，装饰性隐藏；提供文案时单一 status/polite |

同时导出 WorkbenchSkeletonBlock：radius=sm/lg（默认sm，非法值回退sm），animated、label 同上。无业务事件。骨架不切换真实内容，父级负责请求成功、空、错误分支及 aria-busy。

**适用条件**：使用骨架屏 Skeleton

## [wb-slider](workbench/wb-slider.md)

### 数值与区间合同

id：`wb-slider-rule-1` · must / confirmed

modelValue为受控数字；type为continuous或discrete。仅discrete结合range形成双端区间，端点不可交叉，轨道点击选择最近端点，数值按step吸附并限制在min/max内。

**适用条件**：滑动选择

### 可选部件与表单

id：`wb-slider-rule-2` · must / confirmed

可配置刻度、刻度说明、输入框、当前值、单位和焦点/拖动提示。单值name直接提交；区间仅在name存在时提交name-min和name-max，未传name不得产生隐式表单字段。

**适用条件**：表单滑动选择

### 交互与禁用

id：`wb-slider-rule-3` · must / confirmed

原生range承载键盘与可访问语义；disabled同时阻止轨道、滑块和配套输入变化。提示只在键盘聚焦或指针操作期间展示。

**适用条件**：键盘或指针操作

### Slider内置数值提示圆角

id：`wb-slider-tooltip-radius-20261025` · must / confirmed

Slider内置数值提示气泡主体使用Foundation radius-sm（4px）；该规则不改变轨道、滑块或配套输入。

**适用条件**：显示Slider数值提示

## [wb-steps](workbench/wb-steps.md)

包内未提供规则；不补写设计结论。

## [wb-switch](workbench/wb-switch.md)

### 受控布尔合同

id：`wb-switch-rule-1` · must / confirmed

modelValue为受控布尔值，点击或Space通过update:modelValue返回新值。label显示可见名称，显式ariaLabel优先，无可见名称时回退为“开关”。name和value沿用原生checkbox表单语义。

**适用条件**：即时布尔配置

### 禁用与加载

id：`wb-switch-rule-2` · must / confirmed

disabled或loading均阻止切换；loading保留当前开关值、设置aria-busy并在滑块内复用Loading。

**适用条件**：异步切换

## [wb-table](workbench/wb-table.md)

### 业务状态由调用方控制

id：`wb-table-controlled-state` · must / confirmed

选择、排序、筛选、分页与展开只发出目标状态和意图，Table不请求或持久化业务数据。

**适用条件**：使用Table

### 行操作保持语义边界

id：`wb-table-action-semantics` · must / confirmed

首个状态操作使用蓝色Text Action链，后续状态操作使用主文字色；导航操作始终使用WorkbenchLink及Link状态链。

**适用条件**：提供行操作

### 筛选计数复用Badge

id：`wb-table-toolbar-badge` · must / confirmed

DataToolbar筛选计数复用17px数字Badge，并提供筛选条件语境的可访问名称。

**适用条件**：显示生效筛选数量

### 固定列滚动适配属于Table

id：`wb-table-overflow-adapter` · must / confirmed

TableScrollArea复用Scrollbar视口并计算固定列之间的轨道几何；动态尺寸仅用于运行时测量结果。

**适用条件**：横向溢出或固定列

## [wb-table-actions-selection](workbench/wb-table-actions-selection.md)

### 跨页选择使用稳定 ID

id：`wb-table-actions-selection-stable-keys` · must / confirmed

Block 将当前页 Table 选择与宿主持有的稳定 row ID 集合合并；翻页和改每页数量保留其他页选择。

**适用条件**：客户端持有跨页选择集的列表

### 操作语义由调用方决定

id：`wb-table-actions-selection-page-policy` · must / confirmed

Block 传递行操作与批量操作插槽，不定义动作权限、颜色顺序、确认文字或删除结果。筛选及数据集变化后的清选由宿主明确处理。

**适用条件**：表格行操作和批量操作

## [wb-tabs](workbench/wb-tabs.md)

### 选型边界

id：`wb-tabs-rule-1` · must / confirmed

同一上下文内平级内容切换；不适用于站点路由导航、异步加载时直接自动激活

**适用条件**：同一上下文内平级内容切换

### 交互与调用合同

id：`wb-tabs-rule-2` · must / confirmed

`v-model` 必须对应 items 中可用的唯一 value；label 为可访问名称，disabled 项不可选择。tab 插槽接收 item、selected，panel 插槽接收 item；切换后只保留当前 panel 插槽内容，业务草稿由父级托管。溢出项经左右方向键/Home/End 激活后，焦点转移到“更多”菜单按钮；按钮说明包含当前项，tabpanel 直接以当前项命名。更多支持方向键续接、向下打开、Escape 回焦点；离开组件关闭菜单。宽度恢复时焦点从更多恢复到当前页签。

**适用条件**：同一上下文内平级内容切换

### 复用边界

id：`wb-tabs-rule-3` · must / confirmed

页签是带面板关联的自动激活模型，不等同于 Button 或站点导航。更多菜单为该模型内的入口，负责溢出选中项的焦点接续和宽度恢复；首版保留内部结构，复用 Foundation 文字、状态、阴影与圆角。

**适用条件**：同一上下文内平级内容切换

## [wb-tabs-header](workbench/wb-tabs-header.md)

### 贯穿线页签与右侧操作

id：`wb-tabs-header-structure` · must / confirmed

使用Tabs的rail（贯穿线）变体，size为large（一级）或small（卡片内二级）；数量角标以Badge corner放在页签文字右上角；右侧extra插槽放文字下钻等操作，垂直居中，不占用页签宽度。

**适用条件**：卡片页签头

## [wb-tag](workbench/wb-tag.md)

### 展示类归属

id：`wb-tag-display-category` · must / confirmed

Tag属于展示类组件；表格、徽标、结构树、时间轴和头像在后续正式入库时也归入展示类。

**适用条件**：组织Workbench组件资产

### 六种标签类型

id：`wb-tag-types` · must / confirmed

支持基础、Subtle状态、点状状态、分类、角标和Primary状态六种类型。

**适用条件**：使用Tag

### 操作由父级受控

id：`wb-tag-controlled-actions` · must / confirmed

添加、删除和选择只发出事件，Tag不维护业务标签集合。

**适用条件**：使用可操作Tag

### 七字符截断

id：`wb-tag-truncation` · must / confirmed

超过7个用户可见字符时显示前7个字符加省略号，复用WorkbenchTooltip显示全文提示并绑定可访问描述；不使用原生title或伪元素提示。

**适用条件**：标签文本过长

### 独立主题颜色矩阵

id：`wb-tag-theme` · must / confirmed

Light与Dark使用本资产批准的颜色矩阵；Selected描边始终引用color-border-focus。

**适用条件**：展示Tag颜色与状态

## [wb-time-picker](workbench/wb-time-picker.md)

包内未提供规则；不补写设计结论。

## [wb-timeline](workbench/wb-timeline.md)

包内未提供规则；不补写设计结论。

## [wb-tooltip](workbench/wb-tooltip.md)

### 用途与边界

id：`wb-tooltip-rule-1` · must / confirmed

悬停或键盘聚焦时显示短文本、溢出内容全文或静态标签。需要链接使用Popover；操作确认使用Popconfirm；不要在Tooltip里放可交互元素。

**适用条件**：使用文字提示 Tooltip

### 交互与状态

id：`wb-tooltip-rule-2` · must / confirmed

使用Foundation正文排版、浮层背景/阴影、radius-sm（4px圆角）。文字内边距上下4px、左右8px；标签容器四周均4px、标签间距4px。尾巴样式与尺寸继续引用Popover参数。showArrow默认true；关闭后主体与触发对象保持4px间距，不保留尾巴占位。多实例描述ID隔离，弹层不可抢占焦点。

**适用条件**：使用文字提示 Tooltip

### 公开API

id：`wb-tooltip-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| content | 纯文本；使用content插槽时可省略 |
| placement | top（默认）、right、bottom、left及-start/-end，共12方向，非法值回退top |
| open | 可选受控值，未传内部管理；通过update:open更新 |
| disabled | 默认false，强制不显示 |
| overflowOnly | 默认false；true时只在触发内容实际横向/纵向溢出时显示 |
| showArrow | 默认true；false时隐藏箭头并移除箭头占位，主体与触发对象间距4px |

trigger插槽收到 {open,aria}；将aria绑定到单一可聚焦触发器。content插槽直接传入静态WorkbenchTag并覆盖content文本；组件提供四周4px内边距、4px标签间距，标签不得设置interactive或add/remove操作。唯一事件update:open(boolean)。content字符串不解析HTML。
尺寸、内容变化及触发节点替换时重新测量溢出；无溢出即不显示。hover或focus-visible开启，Escape关闭，离开后可重新触发。

**适用条件**：使用文字提示 Tooltip

## [wb-top-nav](workbench/wb-top-nav.md)

### 真实导航与旁路事件

id：`wb-top-nav-navigation` · must / confirmed

tabs、sites 与 tabMenus 条目的 href 为可选真实地址。提供 href 时渲染 a 并保留浏览器默认导航，同时发出 navigate({kind,value,href,...})；未提供 href 时保留受控选择事件。

**适用条件**：导航项带 href

### 披露与动作边界

id：`wb-top-nav-disclosure` · must / confirmed

站点、语言、账户、搜索、通知及移动菜单入口使用 button；它们仅披露面板或发出动作事件，不承担页面导航。

**适用条件**：使用顶部导航

### 人工批准的导航字体例外

id：`wb-top-nav-typography-exceptions` · must / confirmed

品牌标题和移动菜单标题以 font-headline-m（18/500/0em）为基准，并保留本资产 brand-title-line-height=28px；Mega 大标题以 font-display-s（500/0em）为基准，并保留本资产 mega-heading-font-size=32px、mega-heading-line-height=48px。子业务标题完整使用 font-headline-s（16/24/500/0em）。

**适用条件**：渲染顶部导航标题

### Top Navigation普通与Mega菜单圆角

id：`wb-top-nav-menu-radius-20261025` · must / confirmed

Top Navigation普通菜单主体与Mega菜单主体统一使用Foundation radius-md（6px）；站点切换面板及站点条目保持原值，菜单触发器保持原值。

**适用条件**：显示Top Navigation语言、账户、更多或Mega菜单

## [wb-transaction-stage-progress](workbench/wb-transaction-stage-progress.md)

包内未提供规则；不补写设计结论。

## [wb-transfer](workbench/wb-transfer.md)

包内未提供规则；不补写设计结论。

## [wb-tree](workbench/wb-tree.md)

包内未提供规则；不补写设计结论。

## [wb-upload](workbench/wb-upload.md)

包内未提供规则；不补写设计结论。

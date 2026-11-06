<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# Blocks 与 Patterns

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

以下分类和组合规则直接来自包内组件元数据。

## [wb-certification-details](workbench/wb-certification-details.md)

类型：`block` · 导出：`WorkbenchCertificationDetails`

身份达标等状态卡片底部展示认证类型、归属与关键日期的只读信息

### 只读认证事实

id：`wb-certification-details-structure` · must / confirmed

白色内卡，16px内边距、6px圆角，12px字号；首行为认证类型（alert状态subtle标签）与归属代表处/系统部，第二行为认证开始、结束、能力复核三项日期；宽度不足时自动换行，长文本断行。

**适用条件**：认证详情

## [wb-company-profile-shell](workbench/wb-company-profile-shell.md)

类型：`block` · 导出：`WorkbenchCompanyProfileShell`

同一业务对象下的资料维护页共享身份区和两级栏目导航

### 外壳与业务内容分离

id：`wb-company-profile-shell-content-ownership` · must / confirmed

Block 提供公司身份、导航、一级／二级页签和内容 Card；页签内容、权限与业务数据由调用方通过插槽和事件提供。

**适用条件**：同一公司下多类资料维护

## [wb-content-section](workbench/wb-content-section.md)

类型：`block` · 导出：`WorkbenchContentSection`

内容分区的受控业务组合

包内未提供规则；不补写设计结论。

## [wb-draft-list-filter](workbench/wb-draft-list-filter.md)

类型：`pattern` · 导出：`WorkbenchDraftListFilter`

管理列表提供显式查询按钮，用户先编辑筛选草稿再提交

### 草稿显式提交

id：`wb-draft-list-filter-explicit-apply` · must / confirmed

筛选控件的编辑值与已应用条件分开保存；只有触发查询后才更新结果条件。

**适用条件**：手动查询管理列表

### 宿主执行重置

id：`wb-draft-list-filter-reset` · default / confirmed

Pattern 发出重置意图；宿主负责清空草稿与已应用条件，并同步结果集和分页。

**适用条件**：手动查询管理列表

## [wb-event-calendar](workbench/wb-event-calendar.md)

类型：`block` · 导出：`WorkbenchEventCalendar`

工作台侧栏按日期查看活动、日程或待办，并需要日期事件标记与当日列表联动

### 日期面板与当日列表

id：`wb-event-calendar-composition` · must / confirmed

由DatePicker面板模式（inline、fluid、flatInline、showInput=false、dateMarkers、showEmptyMarkers）与当日日程列表组合；有日程日期显示品牌色圆点，其余为灰色圆点；圆点6px、位于日期控件下方4px，上一行圆点到下一行控件12px。

**适用条件**：事件日历

### 收起与日程列表

id：`wb-event-calendar-agenda` · must / confirmed

收起条高32px、距日历8px，文字与箭头居中，阴影只在收起条下方；日程列表距收起条16px，使用组件滚动条和subtle分隔线；每项标题14px regular与分类标签，时间与地点16px图标、14px文字、4px间距。点击日程触发open，业务跳转由宿主处理。 时间使用用户确认的「首页 时间/time」原始16px图标。地点使用「定位/location」原始16px图标。

**适用条件**：事件日历

## [wb-expand-card](workbench/wb-expand-card.md)

类型：`block` · 导出：`WorkbenchExpandCard`

列表中的每项需要以图标与摘要标题呈现，并通过右侧箭头展开详情（如伙伴身份差距）

### 摘要头与展开内容

id：`wb-expand-card-structure` · must / confirmed

浅灰背景（surface-card-tinted），头部上下8px、左右16px内边距：底座图标（建议PedestalIcon 28px）、标题（headline-xs）、右侧12px下箭头按钮；展开内容同样左右16px，展开/收起使用高度过渡且首帧不跳动，减少动效时关闭过渡。

**适用条件**：展开卡片

## [wb-filter-chips](workbench/wb-filter-chips.md)

类型：`block` · 导出：`WorkbenchFilterChips`

列表上方需要十项以上的单选业务筛选，并希望一眼看到全部选项与数量

### 可点击标签单选

id：`wb-filter-chips-selection` · must / confirmed

以可交互Tag表达单选筛选，选中态使用Tag selected；带数量时显示为“名称(数量)”；选项自动换行，间距8px，不收纳为更多。

**适用条件**：业务筛选

## [wb-followup-rows](workbench/wb-followup-rows.md)

类型：`block` · 导出：`WorkbenchFollowupRows`

遗留任务行的受控业务组合

包内未提供规则；不补写设计结论。

## [wb-info-list](workbench/wb-info-list.md)

类型：`block` · 导出：`WorkbenchInfoList`

公告、资讯等信息流需要标题、状态标签与发布时间三层展示

### 标题/标签/时间三层

id：`wb-info-list-structure` · must / confirmed

每项依次为：标题链接（14px body-m，单行省略）、subtle状态标签（small）、时间行（16px时钟图标+14px文字，间距4px，垂直居中）；三层间距8px，项上下8px，项间subtle分隔线。 时间使用用户确认的「首页 时间/time」原始16px图标。

**适用条件**：信息列表

## [wb-information-card](workbench/wb-information-card.md)

类型：`block` · 导出：`WorkbenchInformationCard`

需要以稳定数据接口复用信息卡片结构、布局和独立底部区域

### 固定区域与独立操作

id：`wb-information-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：信息卡片组合

### 原生导航与职责边界

id：`wb-information-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-management-form-modal](workbench/wb-management-form-modal.md)

类型：`block` · 导出：`WorkbenchManagementFormModal`

管理资料以单层 Modal 承载字段表单并需要稳定的提醒、补充内容和操作区插槽

### 内容由宿主提供

id：`wb-management-form-modal-slots` · must / confirmed

Block 提供单层大尺寸 Modal、主要内容、可选提醒／补充区和 footer 插槽；字段、校验与提交回调由宿主持有。

**适用条件**：创建或编辑管理记录

### 不持有业务保存

id：`wb-management-form-modal-no-business-save` · must / confirmed

Block 只转发受控开关与关闭事件，不执行持久化，也不隐含成功状态。

**适用条件**：使用管理表单 Modal

## [wb-media-card](workbench/wb-media-card.md)

类型：`block` · 导出：`WorkbenchMediaCard`

需要以稳定数据接口复用图文卡片结构、布局和独立底部区域

### 固定区域与独立操作

id：`wb-media-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：图文卡片组合

### 原生导航与职责边界

id：`wb-media-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-metric-card](workbench/wb-metric-card.md)

类型：`block` · 导出：`WorkbenchMetricCard`

需要以稳定数据接口复用数值卡片结构、布局和独立底部区域

### 固定区域与独立操作

id：`wb-metric-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：数值卡片组合

### 原生导航与职责边界

id：`wb-metric-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-more-action](workbench/wb-more-action.md)

类型：`block` · 导出：`WorkbenchMoreAction`

卡片标题或页签头右侧的“更多”“查看历史”等下钻入口

### 无容器文字下钻

id：`wb-more-action-style` · must / confirmed

使用Button appearance=text、intent=drilldown、drilldown=more与textLayout=inline：仅占文字行高、无内边距，右侧箭头沿用Button规则；保留悬浮、按下、焦点与禁用状态。

**适用条件**：卡片或页签头部下钻入口

## [wb-nested-confirmation](workbench/wb-nested-confirmation.md)

类型：`pattern` · 导出：`WorkbenchNestedConfirmation`

父级确认流程需要在子对话框收集补充信息，且子层结果先回填父层草稿

### 顶层对话框接收关闭意图

id：`wb-nested-confirmation-top-layer` · must / confirmed

子对话框打开时，父对话框忽略 Escape 和遮罩关闭；顶层关闭后的焦点恢复由底层 WorkbenchModal 负责。

**适用条件**：父级对话框打开子级对话框

### 子层结果由宿主暂存

id：`wb-nested-confirmation-staged-result` · must / confirmed

Pattern 只发出子层关闭意图；宿主负责清除取消的子草稿或把确认结果暂存到父层草稿，最终提交仍由父层确认。

**适用条件**：子对话框收集父流程所需信息

## [wb-policy-links](workbench/wb-policy-links.md)

类型：`block` · 导出：`WorkbenchPolicyLinks`

页签下方列出与当前分类相关的规则、政策或评估文档链接

### 文档图标+名称+右箭头

id：`wb-policy-links-structure` · must / confirmed

每项为原生链接：14px文件图标、14px文字、12px右箭头，图文间距4px；多项横向排列并换行，行间距8px、项间距24px；整体为带可访问名称的nav。

**适用条件**：政策链接

## [wb-quick-app-card](workbench/wb-quick-app-card.md)

类型：`block` · 导出：`WorkbenchQuickAppCard`

需要以稳定数据接口复用快捷应用卡片结构、布局和独立底部区域

### 固定区域与独立操作

id：`wb-quick-app-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：快捷应用卡片组合

### 原生导航与职责边界

id：`wb-quick-app-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

## [wb-readonly-fields](workbench/wb-readonly-fields.md)

类型：`block` · 导出：`WorkbenchReadonlyFields`

静态字段组的受控业务组合

包内未提供规则；不补写设计结论。

## [wb-table-actions-selection](workbench/wb-table-actions-selection.md)

类型：`block` · 导出：`WorkbenchTableActionsSelection`

表格需将稳定行 ID 的选择状态保留跨页，并由页面提供批量操作和行操作处理

### 跨页选择使用稳定 ID

id：`wb-table-actions-selection-stable-keys` · must / confirmed

Block 将当前页 Table 选择与宿主持有的稳定 row ID 集合合并；翻页和改每页数量保留其他页选择。

**适用条件**：客户端持有跨页选择集的列表

### 操作语义由调用方决定

id：`wb-table-actions-selection-page-policy` · must / confirmed

Block 传递行操作与批量操作插槽，不定义动作权限、颜色顺序、确认文字或删除结果。筛选及数据集变化后的清选由宿主明确处理。

**适用条件**：表格行操作和批量操作

## [wb-tabs-header](workbench/wb-tabs-header.md)

类型：`block` · 导出：`WorkbenchTabsHeader`

卡片内一级页签需要贯穿线样式、页签数量角标或右侧下钻操作

### 贯穿线页签与右侧操作

id：`wb-tabs-header-structure` · must / confirmed

使用Tabs的rail（贯穿线）变体，size为large（一级）或small（卡片内二级）；数量角标以Badge corner放在页签文字右上角；右侧extra插槽放文字下钻等操作，垂直居中，不占用页签宽度。

**适用条件**：卡片页签头

## [wb-transaction-stage-progress](workbench/wb-transaction-stage-progress.md)

类型：`block` · 导出：`WorkbenchTransactionStageProgress`

交易阶段进度的受控业务组合

包内未提供规则；不补写设计结论。

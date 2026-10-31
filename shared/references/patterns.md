<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# Blocks 与 Patterns

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

以下分类和组合规则直接来自包内组件元数据。

## [wb-company-profile-shell](workbench/wb-company-profile-shell.md)

类型：`block` · 导出：`WorkbenchCompanyProfileShell`

同一业务对象下的资料维护页共享身份区和两级栏目导航

### 外壳与业务内容分离

id：`wb-company-profile-shell-content-ownership` · must / confirmed

Block 提供公司身份、导航、一级／二级页签和内容 Card；页签内容、权限与业务数据由调用方通过插槽和事件提供。

**适用条件**：同一公司下多类资料维护

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

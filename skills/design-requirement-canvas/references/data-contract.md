# 需求数据契约

用于新建规范化数据，或为旧画布做导出适配。不强制现有项目重写相同语义的字段。固定语义 ID 与用户范围是关键，字段名可适配。

## 建议结构

根对象：`schemaVersion: "design-evidence/1"`、`sources`、`assets`、`pages`、`workItems`、`generationPlan`；画布另用 `canvas`、`edges`，可选 `meta` 记录范围原则、组件包版本和已知缺口。

- `sources[]`：`id`、`path`、`width`、`height`，尺寸为实际原图像素。建议加 hash 与时间；原图不随包交付时说明引用方式，勿用失效绝对路径冒充随附资源。
- `assets[]`：`id`、`version`、`contractSource`；建议补公开导出与资格。只登记查证过的资产；未确认能力存入 workItems，不假装现有资产。
- `pages[]`：固定 `id`、`title`、`role`；`crop: {sourceId, x, y, width, height}` 用原图像素；`image` 为相对 manifest 的裁剪图路径（`crop_pages.py` 写入，构建画布时内嵌）；`sections[]` 使用固定区块 ID。
- `sections[]`：`id`、`title`、`evidence: {sourceId, region?}`，region 为裁剪截图内的 `[left, top, width, height]` 百分比；辅助定位注明大致范围。可加 `evidencePrecision` 区分整区/组件参考，不能标成精确已验收。
- 事实 `facts[]`、字段 `fields[]`、截图状态 `referenceState`、样例 `referenceDisplayData`、`unknowns[]`、`acceptance[]`。样例与业务数据模型分开，单位和排序保留。
- `actions[]`：固定 `id`、`label`（图形按钮可加 icon）、`visibleInReference`、`evidenceSourceId`、`targetPageId`（不明为 null）、`targetStatus: confirmed | unknown`；建议补打开方式、参数、返回和选中行为的已知/未知。无连线不等于没有可见动作。
- `mappings[]`：固定实例 `id`、`assetId`、证据、`configurationStatus: candidate | partial | verified`、确定的 `props/slots`、事件到 action 的 `actionIds`。必填/默认/枚举来自可追溯的契约，不能手猜。所有角色/页面通过 ID 关联，勿以数组位置关联证据。

## 工作项与生成边界

`workItems[]` 每项包括：

```json
{
  "id": "home-calendar-events",
  "sectionId": "home-calendar",
  "lane": "component-work",
  "workKind": "existing-adaptation",
  "baseAssetIds": ["date-picker"],
  "priority": 1,
  "inPageRestoration": true,
  "pageGeneration": "after-component-verification",
  "reason": "需要在已有日期能力上扩展事件标记及日程联动",
  "implementation": "先核对日期组件扩展点，验证后供首页消费",
  "acceptance": ["事件与选中日关联；公开接口可消费"]
}
```

路径约束：

| lane | inPageRestoration | pageGeneration | 其他要求 |
|---|---|---|---|
| reuse | true | use-existing-components | `baseAssetIds` 指向实证资产；纯内容布局可用 `layoutContentOnly: true` |
| component-work | true | after-component-verification | priority=1；workKind=primitive-gap 或 existing-adaptation，后者须有基础资产 |
| review | false | exclude | 明确理由，保留评审参考；不作为页面生成任务 |

`generationPlan` 是 ID 索引：`included` 指向所有 reuse/component-work；`excludedPendingReview` 指向所有 review。混合区块为多个 workItem；排除只影响指定全新视觉部分，基础组件承载的数据仍可独立纳入。

可选 `capabilities[]` 声明跨工作项的能力，使用唯一 `id`、名称、状态和资格说明；工作项的 `capabilityRefs[]` 必须引用已声明 ID。`unknowns`、`acceptance` 与 `acceptanceStatus` 保留业务和验证边界。导出交接时同步能力目录、工作项引用和这些字段；未声明能力的历史数据仍按原格式兼容。候选状态不代表锁包或生产可用。

可执行验收与原图事实分开：例如“原图有金字塔”是事实；“用既有 Steps 呈现阶段，金字塔排除”才是本次执行指令。

完整的合成示例见 [manifest-example.json](manifest-example.json)：两个页面、一条入口级连线、三类工作项与页面摘要，原样通过 `validate_canvas_contract.py`（由单测固定）。它仅说明数据关联，不含截图，不能直接构建画布，也不代表任何实际项目或业务；不要沿用其中的 ID、版本或组件名。

## 校验与限制

```bash
python3 scripts/validate_canvas_contract.py /absolute/path/manifest.json   # 制作画布/交接：结构 + 画布合同，一次跑完
python3 scripts/validate_manifest.py /absolute/path/manifest.json          # 只出报告、不建画布时的结构校验
```

`validate_canvas_contract.py` 已包含 `validate_manifest.py` 的全部结构校验，制作画布时只跑前者；结构不通过时它先只返回结构错误，修完再出现画布合同错误，属正常分层。结构校验覆盖固定 ID、引用、裁剪范围、区域范围、动作目标、资产映射、工作项与生成索引。不识别图像、不证明资产样式/能力、不证明原图覆盖完整。旧格式先适配到该结构，不应将格式不符称为业务不完整。

## 用于交互画布的页面摘要

画布的每个页面（含 dialogue/modal 节点）都要有 `requirementSummary`，五个键缺一不可：

```json
"requirementSummary": {
  "facts": ["本页原图可读的具体事实、字段与默认状态"],
  "componentWork": [{"workItemId": "adapt-calendar", "lane": "component-work", "reason": "与该工作项一致的具体理由"}],
  "unknowns": ["图和契约都无法确定的事项"],
  "acceptance": ["可观察的还原结果"],
  "scopeWorkItemIds": ["reuse-navigation", "adapt-calendar", "review-graphic"]
}
```

- `scopeWorkItemIds`：恰好是 `sectionId` 属于本页区块的全部工作项 ID，不重复、不含他页；本页没有工作项时写 `[]`。
- `componentWork`：本页每个 `component-work` 与 `review` 工作项各一条，`lane` 与工作项一致；`reuse` 不列入。没有时写 `[]`。
- `facts/unknowns/acceptance`：数组，元素为非空字符串；确实没有时可为 `[]`，校验会给出警告，面板显示“未登记”，不代表完整。
- 可选 `scopeCounts: {"reuse": n, "component-work": n, "review": n}` 只是缓存，必须与工作项一致，建议省略。
- `assets[].publicExport` 填实际公开组件符号（如 `WorkbenchTable`），不能填包名或路径；未查证的资产不要登记。

各组内容的写法见 [页面面板与场景交付模板](canvas-template.md) 的“内容与计数”。`scripts/validate_canvas_contract.py` 在结构校验之上检查摘要遗漏、跨页引用、范围类型不一致及缓存计数错误。它不能识别泛化占位内容是否偷懒，不能证明摘要已在页面中渲染，仍需原图审查和浏览器验证。

## 完整右栏的呈现数据

所有区块使用统一 inspector；`fields/referenceState/referenceDisplayData/actions/mappings/unknowns/acceptance` 分别呈现，缺失显示待补。`mappings` 可登记 `bindings/events/evidence.region`，`assets` 登记 `publicExport/version/qualification/contractSource`。未知配置留空并说明，不填伪值。面板展示全部字段不等于这些信息已完成审查。

连接通过根级 `edges[]: {id, from, to, label, evidence}` 和 confirmed 动作目标索引；相同起终点与触点去重，来去两向都可定位。未画明触点时 evidence 明示不确定性，未知动作保留 null 目标。完整右栏只消费该数据，不另写一套报告专用事实。

资产的 `publicContract: {props, events, slots}` 可保存已查证的公开 API 索引（名称、类型/枚举/必填及权威定位）。旧首页契约索引通过适配器迁入此处。它与 mapping.props/slots/bindings/events 的实例配置分开展示；缺失时明确待补，不能复制未查证组件的 API。

## 画布视图与连线

```json
"canvas": {
  "title": "伙伴工作台 · 证书中心",
  "scopeBanner": "还原基准：已有组件样式 · 能力缺失优先 · 全新组合待评审",
  "views": [{"id": "sales", "title": "经销商 · 销售", "groups": [
    {"id": "sales-entry", "title": "首页入口", "pageIds": ["sales-home"]},
    {"id": "sales-targets", "title": "关联页面与状态", "pageIds": ["sales-learning", "sales-certs"]}]}]
},
"edges": [{"id": "sales-home--sales-learning", "from": "sales-home", "to": "sales-learning",
  "label": "我的学习", "fromSectionId": "sales-home-learning", "strength": "explicit", "evidence": "原图箭头"}]
```

- 每个页面至少出现在一个视图分组中；页面可出现在多个视图。省略 `canvas.views` 时按 `role` 自动分组。
- `strength`: `explicit`（原图明确连线）或 `origin-only`（只确定起点区块，触点待核，画为虚线）。`fromSectionId` 必须属于 `from` 页面，用于连线起点定位。
- confirmed 动作目标会自动并入连线，无需重复登记。

`validate_canvas_contract.py` 会检查以上引用，并以 `placeholderLint` 警告提示空泛文字（如“以原图为准”“同上”）和既无 `fields` 也无 `referenceDisplayData` 的区块。

## 生成交接（design-handoff/1）

`export_handoff.py` 从同一 manifest 派生，不另写事实：`pages[].sections[].generation` 为 `use-existing-components`、`after-component-verification`、`exclude` 或 `unscoped`；`preconditions` 为全部 component-work，`exclusions` 为全部 review。交接中 review 项只出现在 `excludedParts/exclusions`，不会进入可生成的 `workItems`。

## 入口锚点（同页截图坐标）

- `actions[].evidence.region: [left, top, width, height]` 为触发入口在当前页面裁剪图中的百分比矩形；不能从另一截图或滚动位置复制坐标。实际入口在滚动区外时补充对应截图状态，不能把隐藏入口猜到可见图上。
- confirmed 动作可用 `targetActionId`、`targetSectionId`、`targetRegion` 指定目标页面内部的落点。没有明确目标入口时保持页级目标；打开说明、草稿等本地行为可记录效果，不能伪造跨页关系。
- 根 `edges[]` 用 `fromActionId/toActionId` 引用两端入口，或用 `fromRegion/toRegion` 明确指定两端截图区域；保留 `fromSectionId/toSectionId` 表达区块归属。引用必须属于对应端点页面，且与区块一致。
- 定位优先级：显式端点 region → action.evidence.region → section.evidence.region → 页面边框。降级分别显示 entry / section / page，未知入口不猜坐标。连线默认在页面卡片下层，数学端点仍落在入口区域朝向连线的边缘，双端高亮辅助确认入口。
- 同一页面之间的多个入口即使同名也各自保留，按动作 ID 和区域区分；显式 edge 引用 `fromActionId` 时与对应自动动作连线合并。无入口 ID 的历史数据继续可用，但不宣称入口级定位。
- 浏览器验收需检查实际 SVG 端点与图片入口矩形的偏差，覆盖缩放、重新布局、同页多个入口、返回连线及旧格式回退，不能只校验坐标字段存在。

`actions[].effect` 可记录已知的本地状态变化；没有跨页目标时不伪造目标页面，交接保留 effect 与入口证据。

## 关系渐进展示

`canvas.mainPathEdgeIds` 是真实根 edge ID 或 confirmed action ID 的有序清单，仅用于总览主线。不能用页面数组顺序或自动最短路径猜主流程；未登记主线时总览不画线，提示选择页面。`canvas.defaultViewId` 可选定首屏视图，须引用已声明视图。

默认“主线 / 当前页”：未选择时仅画主线；选择后仅画直接去向，可勾选“包含来自”。“全部关系”显示当前视图内完整边集，详情与导出始终保留全部事实。每节点分支数量含跨视图目标，跨视图关系仍可从右栏导航。关系栏显示当前/当前视图总数；悬停或键盘聚焦一条关系时淡化其他线并高亮两端，箭头按钮定位目标。共享浏览器测试应覆盖这些模式，不把隐藏分支误报为缺数据。

证据从属关系以 `edges[].kind: evidence` 显式区分，原页面为 `from`、同页滚动截图或规则说明为 `to`；无箭头点线及连接文案必须表明非业务跳转。证据视图可设置 `showEvidence: true` 默认展示从属线，业务动作与证据关系都保留在导出数据中，不得将证据线当作路由。

## 同页对话节点（可选扩展，兼容旧数据）

`pages[]` 继续作为画布节点集合：

- `nodeType`: `page`（真实业务页面）、`dialogue`（同页问题/回答）、`modal`（弹窗）、`reference`（资料说明）。不填写时按历史页面节点处理。
- `ownerPageId`: dialogue/modal 必填，引用一个 nodeType=page 的宿主页；不得引用自身或另一个回答卡。它是所属关系，不是可点击的业务跳转。
- `description`: 说明此状态的业务含义；`context` 可记录上一个话题、已选项目等上下文。实际动作的 `condition` 记录分支条件，不能把条件省略为无条件关系。
- `capture`: `{mode: "expanded-scroll" | "content-crop" | "viewport", viewport: {width, height}, expandedSelectors: [...], note: "..."}`。完整展开捕获须记录具体滚动容器及原视口，不能声称产品本身无限高。

对话卡的截图包括当前问题和完整回答；属于回答的表格、按钮必须保留，公共导航和左侧工作区只在宿主页显示。不同回答的截图尺寸可不同，所有 region 均以各自图像测量。行动与连接仍按已确认的 action/edge 登记，ownerPageId 不自动生成一条业务线。导出保留上述字段。

全景视图可设置 `relationMode: all`，进入时自动显示视图内全部已确认连接；以所有节点各出现一次的分组组成。主题视图可设置 `relationMode: focus` 恢复按需展开。全景仍支持单线追踪、缩放和导出，不能因默认过滤误称全量关系。

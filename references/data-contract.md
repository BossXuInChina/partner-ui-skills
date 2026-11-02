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

可执行验收与原图事实分开：例如“原图有金字塔”是事实；“用既有 Steps 呈现阶段，金字塔排除”才是本次执行指令。

完整的合成示例见 [manifest-example.json](manifest-example.json)，仅说明数据关联，不代表任何实际项目或业务。

## 校验与限制

```bash
python3 scripts/validate_manifest.py /absolute/path/manifest.json
```

校验固定 ID、引用、裁剪范围、区域范围、动作目标、资产映射、工作项与生成索引。不识别图像、不证明资产样式/能力、不证明原图覆盖完整。旧格式先适配到该结构，不应将格式不符称为业务不完整。

## 用于交互画布的页面摘要

画布还需按 [页面面板与场景交付模板](canvas-template.md) 的 `requirementSummary` 记录四组内容及本页工作项引用。`scripts/validate_canvas_contract.py` 在结构校验之上检查摘要遗漏、跨页引用、范围类型不一致及缓存计数错误。它不能识别泛化占位内容是否偷懒，不能证明摘要已在页面中渲染，仍需原图审查和浏览器验证。

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

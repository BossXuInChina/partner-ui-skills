---
name: design-requirement-canvas
description: 将设计大图、页面关系图、截图集或 HTML 交互原型拆解为可追溯的页面、对话状态、交互关系与组件映射，制作或审查可供 Agent 消费的交互需求画布，并导出页面生成交接。适用于查漏、组件适配、旧页面改造范围、还原输入整理及多场景批量处理；普通单页编码或单点视觉修改无需启用完整流程。
---

# 设计需求画布审查

目标：让用户和后续 Agent 看清“原图有什么、证据在哪里、已有组件如何承载、什么优先补齐、什么暂不实现”。画布是证据与执行范围的交接材料；图里有内容并不等于它已获得实现授权。

## 流水线总览

一个场景 = 一个目录：`manifest.json`（唯一数据源）+ `crops/` + `review-log.md`；`dist/` 只放可重建产物。所有命令在 Skill 根目录执行，路径用绝对路径。

| 步骤 | 产出 | 工具 | 通过条件 |
|---|---|---|---|
| 0 定产物 | 范围、角色、组件包版本、输出方式 | 读工程规则与锁定包 | 用户已确定的边界写入 `meta` |
| 1 建场景 | 目录骨架、来源尺寸与 hash | `scripts/new_scenario.py --root R --name N --source id=path` | 骨架**故意不通过**校验 |
| 2 页面清单与裁剪 | `pages[].crop`、`crops/<pageId>.jpg` | `scripts/crop_pages.py manifest.json`（需 Pillow）；HTML 原型/滚动/对话先读[专门说明](references/prototype-and-dialogue.md) | 每页 `image` 可读，长表尾部/弹层完整 |
| 3 语义记录 | 区块、字段、状态、样例值、动作、连线 | 人工看原图 | 见“从原图建立语义记录” |
| 4 组件与范围 | mappings、workItems、generationPlan | 组件消费 Skill / 锁包参考 | 见“以已有组件划定实施范围” |
| 5 校验与画布 | 单文件离线 HTML | `validate_canvas_contract.py` → `build_canvas.py` | 校验无 error；占位提示逐条处理或说明 |
| 6 三类复核 | `review-log.md` | `test_canvas_browser.mjs`、`test_inspector.mjs --manifest` + 回看原图 | 见“审查与完成条件” |
| 7 交接 | `dist/handoff/generation-brief.{json,md}` | `scripts/export_handoff.py manifest.json` | review 项只出现在排除清单 |

只审查时交付带定位的发现，不擅自重建画布；只需报告时不强制生成 JSON 或网页。要求更新时改 `manifest.json` 再重建，不在生成的 HTML 上补文字，否则重建会丢失。

### 环境与降级

| 能力 | 需要 | 不可用时 |
|---|---|---|
| 校验、构建、交接、批量索引 | Python 3.9+，仅标准库 | 无法继续，说明原因 |
| 裁剪 | Pillow | 用其他工具按同一矩形裁剪并手填 `page.image`，在 `review-log.md` 记录方式 |
| `test_inspector.mjs` | Node 20+；在 Skill 目录 `npm install`（happy-dom），或 `--dom-module` 指向已有安装 | 记为未执行 |
| `test_canvas_browser.mjs`、`test_entry_anchors.mjs` | Playwright + Chromium（当前目录、Skill 目录或全局可解析） | 记为未执行；在浏览器打开画布人工核对并写明核对范围 |

需要联网安装依赖或改系统配置时先征得用户同意，不为让测试变绿而绕过。未执行的验证逐项写入 `review-log.md` 和最终报告，不写“通过”。

## 0. 先确定这次的产物

沿用用户指定的场景、角色、项目、组件消费版本和输出方式。用户要求先打样时先完成指定角色与关联目标，未审查场景不能借样板结论宣称通过。

先检查当地工程规则、现有产物和锁定包。使用实际 Catalog、公开入口、类型、实现及既有调用核对能力；区分“源码有”“锁包有”“消费接口可用”“页面已验证”。不要复制示例或旧样板的版本、数量或目录作为以后真值。

若适用且可用，加载目标设计系统的组件消费 Skill：Workbench / 伙伴 AI UI 用 `partner-ui-pages` 或 `partner-ui-vue3` 的 `references/workbench/index.md`、`references/ai-ui.md`（旧称 `workbench-component-usage`）；该 Skill 带 `scripts/assets.mjs` 时先用 `node <该 Skill 根>/scripts/assets.mjs search --query "关键词"` 和 `show --id <id>` 查资产与公开契约，零结果不代表资产不存在，再查上述索引；没有时依据本项目官方资产与接口。该依赖只用于对应系统，不阻塞通用截图审查。

已有用户确认的样板时，先实际打开它，把要保留的能力（详情面板、联动、导出、目录结构）写成简短对照表，改完逐项实测。样板用于能力基准，不能直接复制其业务内容、数量或组件结论。

## 1–2. 建场景、页面清单与裁剪

```bash
python3 scripts/new_scenario.py --root /abs/场景 --name 证书中心 --source board=/abs/大图.jpg
python3 scripts/crop_pages.py /abs/场景/证书中心/manifest.json
```

脚手架记录来源尺寸与 hash。随后在 `pages[]` 为每个页面登记固定 `id`、`title`、`role` 和 `crop: {sourceId, x, y, width, height}`（原图像素，`sourceId` 写在 crop 内），再运行裁剪；矩形越界或缺字段时脚本逐条报错且不写任何文件。裁剪后逐张打开 `crops/` 回看边界、长表尾部和弹层。

数据形状以[数据契约](references/data-contract.md)和可原样通过校验的[合成示例](references/manifest-example.json)为准，不凭记忆拼字段；示例里的 ID、版本和组件名不是真值。

**输入是可运行 HTML 原型，或页面带滚动容器、同页对话回答、弹窗状态时，先读[原型、滚动页面与对话输入](references/prototype-and-dialogue.md)再建页面清单**：它规定完整展开捕获、`dialogue`/`modal` 节点、分支覆盖清单和入口坐标重测。纯截图或设计大图跳过。

## 3. 从原图建立语义记录

1. 用原始分辨率查看、分区裁剪。OCR 只能辅助识别，回看图片验证文字、连线和状态。检查长表尾部、分页、页脚及弹层是否完整；`sources` 记录原图尺寸与 hash，`crop` 记录原图像素矩形。截图像素宽度不自动等于设计视口。
2. 按页面/角色 → 区块 → 字段、操作、状态建立记录，使用固定语义 ID（如 `sales-learning`、`sales-learning-tabs`），**不用数组位置关联**。各角色共享部分显式引用，差异独立记录；不可依靠“与上一页一样”省掉映射。
3. 已定位的具体入口必须记录 `actions[].evidence.region`（相对本页截图百分比），连线从入口边缘出发；目标有明确落点时用 `targetActionId/targetSectionId/targetRegion`，箭头指向该落点。仅缺少入口证据时才降级为区块或整页，并明确标示定位精度。不得把所有箭头统一接到页面边框。详见[数据契约](references/data-contract.md)的入口锚点。每个可见入口都登记为 `action`，包括更多、查看历史、设置齿轮、政策链接、下载/预览和折叠控件。有箭头的关系进 `edges`（触点不清用 `strength: origin-only`，能定位区块时填 `fromSectionId`）；无箭头但可见的入口保留 `targetStatus: unknown`，不得省略或猜成路由。箭头不证明 URL、打开方式、参数、权限或返回策略。
4. 可读的样例值、单位、角标、页码、选中项和展开项存入 `referenceDisplayData` / `referenceState`。区分视觉参考样例与演示交互数据；统计口径、接口和计算规则另记未知。不要向用户索取原图已清晰给出的信息，也不要将看不清的字猜成事实——看不清就写明“无法辨认”及位置。
5. 图中灰色/“暂无新版”先按图例或用户说明解释。旧页面未改造不等于业务 disabled；截图本身的 disabled、空态和遮罩需分别识别。

每条说明区分：**原图事实**、**资产事实**、**实施建议**、**待确认**。文字不确定、触点不清、截图间命名或数值冲突保留原文差异与证据（例如附件 10M/5M 冲突两者都留）。

“缺省/缺漏”可能指漏掉的内容、组合能力，也可能指截图默认状态。根据对话区分并检查三者，不只展示组件的空态样式。

## 4. 以已有组件划定实施范围

默认沿用用户在本工作流确定的组件优先边界；有新的明确指令时以用户为准。

| 路径 | 判定 | 页面处理 |
|---|---|---|
| `reuse` | 现有基础组件、公开变体及常规内容组合能承载 | 纳入还原；采用已有样式，宿主负责布局、内容和业务状态 |
| `component-work` | 基础能力缺失，或已有组件需拓展使用场景 | 第一优先；先验证/补齐组件能力，再让页面消费公开接口 |
| `review` | 与现有资产差距大、需要全新视觉组合或新图形系统 | 待评审，排除出本次页面生成；保留截图与评审理由 |

混合区块逐项划分为多个 workItem。不能仅因为用了 Card、Tabs 等名字就声称全新组合可还原，也不能把普通图文布局都升级为缺失组件。

- 日历：先查日期网格、选择、月份切换等既有能力；事件标记和日程联动作为场景改造。现有接口不足先补接口，不从页面修改组件内部 DOM/CSS。
- 进度、复杂表头：核实锁定版本，分清“能力待核”和“已证实缺失”。能力工作优先，页面接入依赖验证结果。
- 定制插画角色卡、特殊学习大卡、金字塔等若缺少可复用基础，定制视觉列待评审；其中能用既有表格/步骤/选择器呈现的信息可单独纳入。

组件映射区分 API 索引（`assets[].publicContract`）与实例配置（`mappings[].props/slots/bindings/events`）：名称清单不是完整契约。未确认配置保持 `candidate` 并写明缺项，不填伪值。禁止靠覆盖内部样式强追原图。全局“优先复用”提醒不能抵消局部“自行绘制/实现”指令，须消除冲突；`review` 项不能通过“按原图完全还原”这类验收重新进入执行。

## 5. 画布交付

数据结构见 [数据契约](references/data-contract.md)（每页必填的 `requirementSummary` 五个键也在其中）；面板与交互合同见 [页面面板模板](references/canvas-template.md) 和 [画布交付](references/canvas-delivery.md)。

画布一律由 `scripts/build_canvas.py manifest.json` 生成：它内联 `assets/page-review.js`、`inspector.js`、`canvas-host.js` 及样式和全部裁剪图，输出双击可用、CSP 禁止网络请求的单文件 HTML。**不要为单个场景手写画布或右栏**；需要新能力时改共享资源并跑全部测试，让所有场景一起受益。用户明确选择其他框架时才偏离，并说明不再受共享回归保护。

场景作者只登记数据；布局自动计算（列 = 分组、长分组自动换列），连线由宿主绘制为直连曲线，可从其他卡片下方穿过，属预期，不要为“避让”改数据或样式（走线规则见[画布交付](references/canvas-delivery.md)）。

- 视图与分组写在 `canvas.views`。需要全局关系预览时增加包含全部节点的全景视图并设 `relationMode: all`；主题视图继续按需展开，高密度图用子视图阅读。
- 主线用 `canvas.mainPathEdgeIds` 明确引用真实 edge/action ID，不自动猜业务顺序。默认仅展示已登记主线；选择页面时展开其直接去向，可单独包含来源；“全部关系”保留完整关系，不因隐藏连线删除数据。悬停/聚焦一条关系时追踪单线并高亮双端入口。
- 滚动状态截图及规则索引不是独立业务页面；若为定位需要保留节点，须用 `kind: evidence` 的无箭头点线表达所属页面，并标注非业务跳转，可通过 `view.showEvidence` 在证据视图默认显示。

## 6. 审查与完成条件

按 [审查方法与常见漏项](references/review-method.md) 做互相独立的三类核对并写入 `review-log.md`：原图内容/关系、组件能力/范围、交付数据/实际交互。多次重复跑同一脚本不算新一轮。

必跑（共享资源修改另运行 `python3 -m unittest discover -s scripts -p 'test_*.py'`、合成场景浏览器测试及 `node scripts/test_entry_anchors.mjs`）：

```bash
python3 scripts/validate_canvas_contract.py <scenario>/manifest.json
python3 scripts/build_canvas.py <scenario>/manifest.json
node scripts/test_inspector.mjs --manifest <scenario>/manifest.json
node scripts/test_canvas_browser.mjs --html <scenario>/dist/<name>-画布.html --manifest <scenario>/manifest.json
```

校验输出的 `placeholderLint` 列出空泛文字和“无字段/无样例值”的区块：回看原图补齐，或明确写“无法辨认/不适用”及原因，不能置之不理。

**记录数相同、所有字段非空、组件名存在、测试全绿均不能证明识别完整或适配正确。** 回看原图核实遗漏与错误；报告实际检查的场景和仍待确认的部分。环境禁止某项验证时记录具体限制和未验证行为，不绕过、不宣布全部完成，继续完成不依赖它的工作。

完成时给产物链接和影响还原的主要发现，分别说明内容审查、交互测试、人工视觉接受与真实系统联调；不替用户作生产批准。除用户要求外，不改额外配置或历史记录。

## 7. 交接给页面生成

`scripts/export_handoff.py manifest.json` 生成 `design-handoff/1`：按页列出可直接生成的区块（`use-existing-components`）、等待组件前置的区块、组件前置清单、待评审排除清单、组件实例配置及其状态、样例值、动作与待确认项。它是 `partner-ui-pages` / `partner-ui-vue3` 或产品团队自有流水线的输入；截图通过 `image` 路径引用，交付时与场景 `crops/` 或画布 HTML 一起提供。下游 Agent 读 `generation-brief.json`（`.md` 供人阅读）：只生成 `generation` 为 `use-existing-components` 的区块，`after-component-verification` 等 `preconditions` 验证后再做，区块内 `excludedParts` 与全局 `exclusions` 不绘制也不近似实现。

## 规模化（多场景）

- 每个场景独立目录、独立可转交；顶层只放导航。`python3 scripts/build_index.py <root> --build` 校验全部场景、重建画布与交接并写 `index.html/json`；失败场景会列出，不静默跳过。
- 固定一次的东西：范围原则、组件包版本、ID 命名规则、lane 判定口径。每批开始前把它们写进各场景 `meta`，批内保持一致。
- 先用一个场景走完 0–7 并让用户确认，再批量推进；批量时仍按场景做三类复核，抽检不能代替逐场景的原图核对。
- 旧格式先适配：首页样板用 `node scripts/adapters/legacy_home_v3.mjs --input <旧目录> --out <新场景>`。适配器只搬运已有记录、一次性生成固定 ID，并把旧格式表达不了的缺口写成待确认；迁移后以 manifest 为准继续补齐。

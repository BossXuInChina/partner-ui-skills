# 上下文速查候选：实现边界与 Claude 复评入口

## 对比对象与范围

- 基线提交：`1961e3de8bec14c824ba9a21beb3510cfe2fb68f`。
- 候选分支：`feat/skill-context-quick-reference`。这是一次增量优化，不是完整优化路线的全部实现。
- Pages / Vue3 / Review 增加同源生成的消费速查与独立轻量查询；Canvas 不改，不增加兄弟 Skill 依赖。
- 来源锁、组件版本、组件运行时、旧完整参考、旧 Pages `catalog.mjs` 与 `loadKit()` 保持不变。Skill 发布版本也未晋升；请用分支/提交区分本次候选，尚非正式 Release。

## 具体改动

1. [生成器](../shared/format/index.mjs)从锁包的完整 contract + usage 生成 `references/quick/`，不从有损旧 catalog 猜补。
2. 速查保留公开 API、必填/枚举、同族导出、动态 slots、事件细节、规则及适用条件、来源资格和未知项；去除 Studio controls/cases。仅展开首个有代码的官方 portable 示例，列出其余条目及完整资料路径。没有官方示例就明确缺失。
3. [轻量查询](../shared/catalog/assets.mjs)生成到三个 Skill 的 `scripts/assets.mjs`。只依赖 Node 内置模块和本包参考，不读 runtime、不加载 compiler、不安装依赖、不联网。原 `catalog.mjs` 原样保留，包括旧输出形状和行为。
4. `search` 显式要求关键词，默认最多 5 项、最多 50 项，支持 package/kind/offset；返回总数、下一页、匹配理由与 `matchMode`。空格分隔的多个词须全部命中（AND），每词按精确 ID/导出 > 名称/标签/维护者别名 > 摘要/适用场景排序。无结果且含中文时退回两字片段的宽松匹配（`matchMode: partial`，至少 2 个片段命中）；仍为 0 时返回 `hint`。别名来自 [search-aliases.json](../shared/catalog/search-aliases.json)，只进入 `quick/index.json`，不是组件契约；失效键使生成失败。默认条目只给 id/package/name/label/kind/summary/avoidWhen/exampleStatus/matchedBy（useWhen 仅在与 summary 不同时给出），路径需 `--paths`。它是确定性字符串检索，不是语义搜索；查询失败不证明库里没有适用资产。
5. `show` 精确按 ID 查询，默认完整速查正文，`--view full` 返回原完整正文；多包同 ID 要求明确 package。show 未命中、无效参数、坏索引与越界路径非零退出；search 未命中则正常返回 total=0 和空 items，不冒充工具失败。查资料不等于运行时或项目锁通过验证。
6. 原有完整文档的路径和字节由回归测试固定；新增消费速查也进入漂移检查，手改、缺失和额外伪造文件被拒绝。

## 使用和安装

GitHub Download ZIP 是维护源码，不是直接可导入的“总 Skill”。在新 checkout 中：

```sh
pnpm install --frozen-lockfile
pnpm verify:lock
pnpm build
```

在客户端分别选择 `dist/partner-ui-pages/`、`dist/partner-ui-vue3/`、`dist/partner-ui-review/`（直接含 `SKILL.md` 的目录）；需要 Canvas 时再加载其独立包。不要把这些目录的文件合并。客户端是否支持这些加载路径需要实际验证。

在对应 Skill 根运行：

```sh
node scripts/assets.mjs search --query "数值" --kind block --limit 5
node scripts/assets.mjs show --id wb-metric-card
node scripts/assets.mjs show --id wb-metric-card --view full
node scripts/assets.mjs search --query Workbench --limit 5 --offset 5
```

从别的工作目录调用请使用脚本绝对路径。search 加 `--paths` 时返回的 reference 路径以该 Skill 的 `references/` 为基准；show 直接输出正文，内部相对链接仍以原参考文件位置为基准，并非当前 shell 目录。需要完整变体、更多示例时显式展开 full，不要从 Studio controls 推导 props。

## 测量：字节，不是 token 或成功率

复现：

```sh
node build/measure-context.mjs > context-measurements.json
```

[测量脚本](../build/measure-context.mjs)记录 UTF-8 字节、Unicode code points、逐文件 SHA-256、来源锁哈希及全部 91 个资产。不给字符数套一个随意比例冒充 tokenizer。

实际包的 91 个资产正文：

| 项目 | 原 full | 新 quick |
| --- | ---: | ---: |
| UTF-8 总字节 | 1,030,828 | 646,778 |

合计减少 **37.26%**（首版候选为 683,474 / 33.70%；本轮在 quick 中新增 wb-table 来源补充结构约 5KB 后，再去除空字段、重复包身份与重复 useWhen）。仍有 **17 个 quick 大于或等于 full**（首版 21 个），均为原文很短的 Block/Pattern，不能说所有资产都更短：结构化 API、明确缺口与必要边界有固定开销。未为达标删减契约数据。文件复制增加磁盘体积，并非模型读取量。

固定检索＋正文阅读路径（两侧采用同一个新 search 返回，以隔离正文差异，不是历史 Agent 轨迹）：

| 查询资产 | search + full 字节 | search + quick 字节 |
| --- | ---: | ---: |
| 数值卡片 | 16,642 | 5,484 |
| 事件日历 | 4,311 | 5,058 |
| 表格 | 35,539 | 32,635 |
| AI 摘要卡片 | 5,291 | 3,080 |

表格 quick 比首版大，是因为新增了包内 `usage` 补充结构（Column 字段、`sort` 形状、事件载荷、受控状态、动态 slots 与示例）；首版 quick 和 full 都缺这部分，Agent 只能猜 `{ key, direction }`。full 页面本轮不变（字节固定测试仍通过）。

自然措辞检索（期望资产出现在前 5 项；仅命中率，不是 Agent 成功率；`naturalJourneys` 记录每条位置与字节）：

| 版本 | 命中 / 查询 |
| --- | ---: |
| 首版候选 `cf2ee7b` | 7 / 14 |
| 本轮 | 14 / 14 |

首版未命中：指标、KPI、metric card、数值 卡片、经营数值卡片、弹窗、摘要。`search --query 卡片 --limit 5` 输出由 4,414 字节降为 2,764 字节。

事件日历是明确的反向案例，应在复评中检查“多出的内容是否提高契约可靠性，是否值得默认读”。当前不宣称真实会话 token、费用、延迟或生成质量改善。format 测试使用不同 Studio base URL，打印的 full 字节会与真实包不同；本节以实际生成包测量为准。

## 本地验证记录

环境：macOS arm64；冻结安装使用 DSH 捆绑 Node 24.21.0 / 项目 pnpm 11.22.0；需要原生 Vite 模块的测试使用本机已有标准 Node 26.0.0。

- 来源锁校验通过。
- 初次既有测试（不含 formatter 和新增查询测试）：226 pass、1 skip、0 fail；skip 是未安装独立 harness 工具时的既有条件分支。
- 最终主测试套件：258 pass、0 skip、0 fail（标准 Node；设置 `PARTNER_HARNESS_VITE_ROOT` 指向已冻结安装依赖的消费 harness）。
- 最终定向套件（formatter / asset-query / build）：39 pass、0 skip、0 fail；覆盖新工具、真实三消费包的隔离查询、契约保真与生成漂移。
- 六份 HTML 模板测试全部 exit 0。
- 真实 Vite guard：5 pass、0 skip、0 fail（标准 Node）。
- 生成一致性校验与最终打包通过，四个独立 ZIP 均生成。
- 从最终三个消费 ZIP 各自提取真实查询脚本和参考到维护仓外中文/空格路径，且不提供 runtime/node_modules：search、quick show、full show 均通过，正文与 ZIP 原始字节一致。
- 测量完整数据见 [context-measurements.json](context-measurements.json)，可以用脚本重新计算核对。

失败与修复记录：独立查询测试暴露 macOS `/var` 与 `/private/var` 别名导致主入口判断不执行，已改为真实路径比较并兼容 stdin import；一次测试在生成尚未完成时命中旧 CLI 副本，之后串行生成再验证。初始未安装 harness 依赖导致 3 个 real-Vite guard 用例失败；安装后，DSH 捆绑 Node 因 macOS 原生模块 Team ID 签名限制无法加载 Rollup。未修改安全设置、依赖锁或测试断言；另用本机现有标准 Node 执行相同测试后通过。

构建运行时边界：恢复后的复跑发现标准 Node 26.0.0 构建触发 `GENERATED_DRIFT`。只读诊断定位到 18 个现有组件 `.pack.gz` 产物及其 `internal/resources.json`、`manifest.json`，没有 quick/full 参考差异、没有删除文件、清单键顺序也相同。本轮未修改这些组件打包器，不通过重写组件资源或更新来源锁消除差异；构建与生成请使用本轮已验证的 Node 24.21.0。此问题不代表速查 CLI 只能在 Node 24 使用，也不能将 Node 26 主测试通过宣称为跨版本构建字节一致。

复现无 skip 的主套件前，先冻结安装 `dist/partner-ui-vue3/assets/harness` 的依赖，并将 `PARTNER_HARNESS_VITE_ROOT` 设为它的绝对路径。再次执行 build 会重建 dist 并移除其中已安装依赖；需要时重新安装，不能把这种环境缺失当作查询功能回归。未执行完整 `verify:harness`、Canvas 专项套件或业务视觉验收。

## 请 Claude 独立评估，而非复述实现说明

### A. 静态审查和回归

```sh
git diff 1961e3de8bec14c824ba9a21beb3510cfe2fb68f...HEAD --stat
pnpm install --frozen-lockfile
pnpm verify:lock
pnpm check:generated
node --test tests/format.test.mjs tests/asset-query.test.mjs tests/build.test.mjs
pnpm test
pnpm test:templates
node build/measure-context.mjs > context-measurements.json
pnpm build
```

重点查：

- quick 是否真的保留 source contract，而不是只压缩视觉描述？
- `WorkbenchMetricCard.variant` 是否仍只接受来源声明的值，而不是混入 Studio controls？
- `WorkbenchEventCalendar` 缺少官方示例时，Agent 是否明确记录缺口而不编造官方调用？
- AI eventDetails/slotDetails、unknown/null、条件规则是否仍可见？
- 旧完整资料和 CLI 是否保持兼容？查询是否独立于 runtime？
- search 无匹配、错误参数、分页、同 ID 多包是否被正确区分？
- 三个 Skill 独立安装、从不同 cwd、中文/空格路径调用能否工作？
- 默认 quick 的结构化 JSON 是否可读？哪些资产应继续分层或调整正文组织？

### B. 同模型、独立新会话的 A/B 任务

将基线与候选分别构建到独立目录；不要在同一会话先看完 A 的资料再做 B。固定同一模型版本、工具权限、客户端、prompt、组件锁和测试数据；可交换顺序以减少顺序偏差。每个任务首轮至少 3 次，仍仅小样本。

1. 新建伙伴经营概览：包含经营数值卡片、伙伴表格与筛选。优先复用适用的已有 Block，不修改组件内部样式。交付可编辑源码与离线页面，验证筛选与窄屏。
2. 给现有页面增加事件日历和当日活动。明确核对 required props 与事件契约，不把缺失的官方示例描述为已提供，不实现真实服务端能力。
3. 修改已有 Vue 列表页的查询行为与跨页选择；只读取相关模块，但最终验证完整修改范围。
4. 复查上述页面的资产使用和布局；必须区分静态检查、浏览器行为、人工视觉接受，不能仅凭 import 判为复用成功。

记录实际工具调用、读入资料/输出字节、模型输入与缓存 token（客户端能提供才记录）、重复读取、错误 API、返工轮次、可复用资产是否真正使用、业务行为和视觉问题。不要把本次工具命令预先强塞进 A 组提示；让各分支的 Skill 引导起作用。

### C. 交付评估结论

请分别报告：确认收益、质量回退、无结论项、下一轮最值得做的 1–3 个改进。对问题给文件位置、最小复现和证据；只有实际运行才写“通过”。不要自动合并、发布或升级组件来源锁。

## 明确未完成

- 公司定制客户端发现/调用和 Claude 实际 A/B 尚未执行。
- 本轮未做完整业务页面人工视觉验收，也未验证真实公司 API。
- 没有实现全套 doctor、复用映射强制检查、工具报告摘要化和跨阶段交接失效检测；这些属于后续优化。
- 未改变组件生产资格。分支优化不能作为生产批准。

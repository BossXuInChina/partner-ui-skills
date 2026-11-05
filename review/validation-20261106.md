# Partner UI Review 候选验证 · 2026-11-06

新增 `partner-ui-review@0.1.0`，Vue Skill 更新为 `0.1.1`，pages 保持 `0.1.0`。静态引擎从 `shared/static/` 单源分发到 Vue/review，不需要另一 Skill 同时安装。生成副本由构建工具维护。

已验证：`verify:lock`（原锁）、`generate`、`check:generated`、模板测试、独立消费者 harness 15 项、`build`、`package:release`。新 review 测试 25/25，包括真实浏览器布局、R1–R8 正反例、渐变 Token、路由发现、真实 pageerror/Vue warning 和图标有限映射。

原完整测试首次为 182 pass / 1 条既有条件 skip。之后提供已安装的独立 harness toolchain，单独补跑该测试文件 8/8；补充渐变检查后最终完整套件为 **184 pass / 0 fail / 0 skip**，结果见证据 `logs/skills-test-final-complete.log`。没有删除断言、添加 skip 或降低阈值。

最终 review ZIP 解压至维护仓外，在解压根冻结安装依赖，从 `/tmp` 对不带 node_modules 的消费 fixture 运行静态/浏览器工具，证明不依赖维护仓或旁边的 Vue Skill。独立 fixture 的早期 String modelValue 触发 Vue warning，已按真实 API 改为 Array 并重跑；错误证据保留，不作为通过样本。

Demo 基线 9 errors / 10 warnings，最终 1 / 2。94 路由、双宽共 188 组前后截图，182 组像素一致；6 组差异只来自恢复 Timeline 默认宽度。全部六项 Demo 测试通过。详见兄弟仓库 [试跑报告](../../partner-workbench-scenarios/review/ui-review-trial-20261105.md)。

## 未完成的来源锁升级

目标 Workbench `0.2.0-prototype.20261104.5` 包真实元数据为 `sourceHasLocalChanges=true`，因此现有 `build/verify-lock.mjs` 拒绝，错误为 `SOURCE_LOCK_INVALID: clean committed release identity required @workbench/ui-vue3`。该包不满足当前 Skill 来源规则；未篡改元数据、图标表或校验器。

正式 `source.lock.json` 保持字节不变：Workbench `0.2.0-prototype.20261031.1`，AI UI `0.3.1-dev.20261031.1`。这保留一个已知新图标静态错误；Demo 的 `check:ui` / `verify` 正确失败。收到合格包后才能更新锁、重新生成资料并清除此阻塞。

三 ZIP 与 manifest 只在本地 `dist/` 生成，没有发布、创建 PR 或修改 main。截图、采样、独立 fixture、日志与失败探针统一放在 [仓外证据目录](../../.artifacts/astra-ui-review-20261106/)。通用 Skill 源码不含机器绝对路径。

提交前 diff 检查在 5 个新分发的公开生成资料中提示 10 处行尾空格；这些资料与原 Vue Skill 同名文件逐字节一致，保留来源文本，未手工修改生成副本。手写代码/文档没有 whitespace 错误，生成一致性检查通过。

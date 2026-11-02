# 更新记录

## 1.1.0 · 2026-11-02

面向多场景复用的稳定化。

- **共享画布宿主** `assets/canvas-host.{js,css}`：视图/目录、按分组自动布局（长分组换列，按裁剪比例预排，避免节点重叠）、正交连线与虚线触点待核、指针锚定缩放、空白拖动、键盘平移缩放、原图浮层与焦点返回、导出、手机抽屉。各场景不再手写 app.js。
- **构建** `scripts/build_canvas.py`：从 manifest 与 crops 生成单文件离线 HTML，内嵌全部资源，CSP 禁止网络请求；校验失败拒绝构建。
- **脚手架与裁剪** `scripts/new_scenario.py`、`scripts/crop_pages.py`：来源尺寸与 hash、裁剪矩形可追溯（对应首页审核 P2-02）。
- **生成交接** `scripts/export_handoff.py`：`design-handoff/1`，区分可直接生成、等待组件前置、待评审排除，供页面生成或产品团队流水线消费。
- **批量** `scripts/build_index.py`：校验、重建所有场景并生成导航索引。
- **旧样板适配器** `scripts/adapters/legacy_home_v3.mjs`：首页样板一次性迁移为固定 ID 的 design-evidence/1（对应审核 P2-03），旧格式缺失的信息写为待确认。
- **校验增强**：`canvas.views`、`edges`、`page.image` 引用检查；`placeholderLint` 提示空泛文字及无字段/样例值的区块。
- **修复**：inspector 在无高亮时鼠标移出非标签元素会抛错。
- **测试**：`npm test` 汇总 Python 单测、DOM 回归（happy-dom 改为 devDependency 自动解析）和新的浏览器回归 `scripts/test_canvas_browser.mjs`。
- SKILL.md 改为按步骤的流水线与规模化说明；组件消费 Skill 指向 `partner-ui-pages` / `partner-ui-vue3`。

## 1.0.0

初始版本：方法、数据契约、统一右侧面板与结构校验。

# partner-ui-pages

让 AI 助手（或人工）用伙伴工作台的两套 UI 消费包——`@workbench/ui-vue3` 与 `huawei-partner-ai-ui`——制作**双击即可打开**的 HTML 页面：新页面/演示原型、PRD 需求页，或把已有静态原型换成真实组件样式。

- 入口说明：`SKILL.md`（给 AI 读的完整流程与规则）
- 运行时：`assets/runtime/`（Vue 3.5.13 + 两个包的全部组件，无需 npm/构建/联网）
- 参考：`references/workbench/index.md`、`references/ai-ui.md`（已锁定发布包的参考与缺口；当前未提供独立组件图库）
- 模板：`assets/templates/`（列表、详情、工作台、AI 助手工作台、AI 问答、空白）

## 安装

| 工具 | 做法 |
| --- | --- |
| Claude（claude.ai / Claude Code） | 把整个文件夹作为 Skill 上传或放入 `~/.claude/skills/partner-ui-pages/` |
| 其它 AI 编程助手（Codex、Cursor、Copilot、Cline…） | 把文件夹放进项目（如 `tools/partner-ui-pages/`），在 AGENTS.md / 规则文件里写：“做伙伴工作台页面时，先阅读 tools/partner-ui-pages/SKILL.md 并按其流程执行” |
| 人工使用 | `python3 scripts/new_page.py --template workbench-list --out ./my-page`，然后编辑 `my-page/index.html` |

## 版本

见 `assets/runtime/versions.json` 与 `source.lock.json`。独立安装包安装随附维护依赖后运行 `node maintainer/build.mjs`；工作区使用根构建入口。生产 Vue 模块交接使用 `partner-ui-vue3`，包资格以随包 release 元数据为准。

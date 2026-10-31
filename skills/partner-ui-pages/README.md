# partner-ui-pages

让 AI 助手（或人工）用伙伴工作台的两套 UI 消费包——`@workbench/ui-vue3` 与 `huawei-partner-ai-ui`——制作**双击即可打开**的 HTML 页面：新页面/演示原型、PRD 需求页，或把已有静态原型换成真实组件样式。

- 入口说明：`SKILL.md`（给 AI 读的完整流程与规则）
- 运行时：`assets/runtime/`（Vue 3.5.13 + 两个包的全部组件，无需 npm/构建/联网）
- 参考：`references/workbench/index.md`、`references/ai-ui.md`（已锁定发布包参考；图库见下方入口）
- 模板：`assets/templates/`（列表、详情、工作台、AI 助手工作台、AI 问答、空白）

## 安装

| 工具                                               | 做法                                                                                                                                                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude（claude.ai / Claude Code）                  | 把整个文件夹作为 Skill 上传或放入 `~/.claude/skills/partner-ui-pages/`                                                                                     |
| 其它 AI 编程助手（Codex、Cursor、Copilot、Cline…） | 把文件夹放进项目（如 `tools/partner-ui-pages/`），在 AGENTS.md / 规则文件里写：“做伙伴工作台页面时，先阅读 tools/partner-ui-pages/SKILL.md 并按其流程执行” |
| 人工使用                                           | `python3 scripts/new_page.py --template workbench-list --out ./my-page`，然后编辑 `my-page/index.html`                                                     |

## 版本

见 `assets/runtime/versions.json` 与 `source.lock.json`。独立安装包安装随附维护依赖后运行 `node maintainer/build.mjs`；工作区使用根构建入口。生产 Vue 模块交接使用 `partner-ui-vue3`，包资格以随包 release 元数据为准。

## 组件图库

图库条目从本批锁定包的公开元数据生成；以四节浏览组件预览、变体与状态、使用场景及使用规范与API。每条保留两包版本、完整来源提交、构建日期、资格和 Open in Studio。可移植官方 SFC 在构建时预编译；未提供可安全预览的条目明确回到 Studio。controls 不冒充 props，未知信息保留原因。

在生成或解压后的完整 Skill 根目录运行：

```sh
node scripts/serve_gallery.mjs
```

访问打印出的本地地址（默认 http://127.0.0.1:4190/）。图库使用模块及延迟资源，需要 HTTP 服务；无需安装依赖或编译。静态入口为 `assets/gallery/index.html`，内部演示不构成生产批准。

## Skill 交付版本与维护

本独立 Skill 为 `0.1.0`，以 [skill.json](skill.json) 为准；组件包与原型运行时版本另见 source.lock.json 和公开元数据。升级、三项新会话试验及本地归档流程见 [维护说明](references/maintenance.md)，变更见 [CHANGELOG](CHANGELOG.md)。发布频率由用户决定。

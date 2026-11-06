# Partner UI Review

消费页面复查：共享静态检查、路由截图、真实 DOM 测量、设计图并排对照。使用入口和命令见 [SKILL.md](SKILL.md)。

0.1.4 区分正式组件内部与页面业务组合：前者按自身契约核对，后者严格按布局规范检查。新增 R9 角色/Token/真实区域间距契约，修正 logical auto 和嵌套 AI 组件归属误报；规范配置见 [组合间距](references/composition.md)。自动发现相邻页签/工具栏/表格的外部间距（含 0px），候选经确认后写入项目契约；未提供布局契约不能称语义间距已验证。

浏览器工具优先使用目标工程 Playwright，也支持在解压 Skill 根执行 `pnpm install --frozen-lockfile`、`pnpm exec playwright install chromium`。Python 图像对照需 `python3 -m pip install -r scripts/requirements.txt`（建议使用虚拟环境）。所有参数使用当前工程路径，不要求固定机器目录。

测量退出码只代表硬错误：console/page/Vue 错误、页面横向溢出、明确的 R9 布局及 textContracts 字体/可读性契约违反导致非零；其余候选和未验证项写入 `measure.json`，必须人工复核。静态检查任何 error 均非零，版本漂移不会自动豁免图标错误。

2026-11-06 本地候选：Skill 保持 Workbench `0.2.0-prototype.20261031.1`、AI UI `0.3.1-dev.20261031.1` 的原有合格锁。指定的 Workbench `20261104.5` 包 `sourceHasLocalChanges=true`，不满足 `verify:lock`，升级尚未完成。本技能能报告消费项目版本差异，但不修改或伪造包来源，不替换旧资料制造静态零错误。

独立组件复查使用 `--config` 指定组件样本，再在独立 fixture 页面运行测量生成 `component-samples.json`，传给宿主页的 `--baseline`。两边必须声明相同包版本、props、state、theme 并实际使用相同容器宽度；差异先输出待复核，需定位生效规则才能判为必须修复。配置示例见 [规则](references/rules.md)。

0.1.4 增加独立展开态采样，以及完整字阶/字体族/文本行数/所属项目边界契约。见 [文字与响应式检查](references/text-layout.md)。

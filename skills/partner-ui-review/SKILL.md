---
name: partner-ui-review
description: 复查使用 Workbench 与 Huawei Partner AI UI 的消费页面、Vue 功能模块及转换原型，结合静态规则、浏览器测量和设计稿局部对照提供可追溯问题。仅在用户要求修复时修改页面；AI UI 库内部问题交给 partner-ai-ui-global-review，单点明确微调不启用整套流程。
---

# 伙伴页面复查

面向消费工程，覆盖公开包的组合边界与页面效果。包源码、Catalog、审批和发布资格属于维护方；审查结果不授予生产资格。

## 工作流

1. 读取目标工程约定和用户范围，记录 HEAD、dirty 文件、实际锁文件及安装包版本、Skill 的 `source.lock.json`。先核对锁文件和 `node_modules` 一致性；`static.mjs` 输出声明/安装/Skill pin 与项目锁哈希，完整锁解析按宿主包管理器完成。版本不一致时明确资料可能陈旧，不把宿主新包冒充 Skill 已批准锁包。
2. 执行 `node scripts/static.mjs <project> --json`，分别保存 stdout 原始检查结果与 stderr 基线。规则来自共享生成器，不能手改生成的 `check_vue.mjs` 或图标表。
3. 根据用户范围、router 或 manifest 选择路由。manifest 必须显式传 `--scenario`，不能把中文目录猜成路由 ID；传入工程的 legacy 表，跳过 legacy 与 navigation-only。用户指定路由优先，不扩大到无关页面。
4. 用工程自己的命令在空闲端口启动 dev 服务，保留进程句柄，结束只关闭自己启动的服务。不要修改全局 Node、杀通配进程或占用已有预览。
5. 执行截图与测量。默认 1920×1080，可指定额外宽度。持续请求、流式生成的页面用 `--ready-selector` 指定生成结束后才出现的元素，按就绪条件拆分批次；networkidle 不代表流式内容完成。等待字体和图片就绪，保留 console/page error/Vue warning，失败不能作为空白的成功报告。

```sh
node scripts/shots.mjs --project <project> --url <dev-url> --out <evidence>/shots --widths 1920,1185 home/admin
node scripts/measure.mjs --project <project> --url <dev-url> --out <evidence>/measure --widths 1920,1185 --card-selector '.section-card' home/admin
# 可用 --manifest <manifest.json> --scenario home --legacy <legacyPages.json> 替代手填路由
```

6. 按 [测量规则](references/rules.md) 核对 findings。包内部排除、页面插槽、无法读取的样式、未提供的组件独立样本必须出现在未验证清单。类名搜索只是源码候选，不猜唯一行号。
7. 存在设计图时执行对照，逐段查看头部、筛选、卡片、表格与弹层。差异标为布局/间距/字体/颜色/组件选择/缺失/多余/内容。相邻图像不等于自动视觉通过。

```sh
python3 scripts/compare.py <crop> <shot> <comparison.png> [y0 y1] --design-width 1920
```

设计逻辑宽度需由输入确认。窄屏截图保持原像素宽度，不拉伸到桌面宽度；窄屏主要检查重排、可达性和溢出。Pillow 依赖见 `scripts/requirements.txt`，按宿主环境安装。

8. 对真实交互补检查：页签、筛选、展开、弹层/tooltip、键盘及焦点。首屏截图不会证明这些状态。只运行和本次修改相关的既有测试；涉及共享组件消费时枚举所有受影响路由。
9. 出现 `.partner-ai` 时，本技能检查宿主尺寸、可达性、横向溢出、挂载边界和错误日志；按 [AI 交接](references/ai-handoff.md) 提交库问题。技能不可用时保留交接材料与未验证状态，不虚称已调用。
10. 按 [报告模板](references/report.md) 分类：must-fix / should-fix / component gap / accepted；自动测量的 needs-review 是待复核证据，不能计作已经确认的缺陷。接受项必须有来源或解释；异常清单不绕过静态门禁。
11. 用户要求修复时，仅修改授权页面层，使用公开 API 与自有容器；补相应截图与行为验证。组件缺口不通过 deep CSS、内部类、`!important`、自绘图标或降低断言修补。

## 依赖与分发

- `check_vue.mjs`、`tooling.mjs` 由 `shared/static/` 单一源码生成并分别分发给 Vue 与 review Skill；本技能无需旁边另装 Vue Skill。
- 静态检查需要本地 TypeScript、Vue compiler；浏览器使用项目或本技能安装的 Playwright/Chromium。解压后的包根有维护依赖，缺失时给出明确错误，不从维护源码仓找补。
- 输出放在用户指定的证据目录，截图/采样可能含业务内容；不自动上传或发布。
- 版本、来源和锁升级限制见本技能 README；本地候选 ZIP 不代表来源锁升级完成。

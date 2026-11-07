# T3 验证简报

本次按修订后的独立 Skill 流程复跑，并校验 Skill、锁、tarball、源码和宿主工具来源。协议查询已按现有 Pinia、Axios、路由、别名和中文文案约定接入。首页源码及既有两个单测、一个浏览器断言保持原样；共享访问记录可在路由往返后保留。依赖锁、Vue 与 packageManager 未变。

安装树、构建可见模块和浏览器应用报告 Vue 3.5.13；预编译内嵌 runtime 无法独立归因，单实例结论保留未知。

本次检查、命令、UTC 时间与耗时见 receipt.json；逐项日志在 checks/，双尺寸 smoke 在 smoke/receipt.json。复跑入口（Node ≥22.13）：`node verify.mjs`，先核验本地锁与当前 Skill 锁并复制 vendor，再冻结安装并准备 Playwright Chromium headless shell，生成清单：`node make-delivery.mjs`。原始基线见 baseline-files.json 和 baseline-checks/receipt.json。

真实接口、鉴权、目标平台、人工视觉验收和生产资格尚未验证；测试使用外部只读 QA 网络桩。Node 26 执行，当前 engines 与 pnpm 最低版本声明不一致待后续处理。构建有大 chunk 提示。详见 delivery.json 和 DELIVERY.md。

全新临时副本未复用 node_modules、vendor 或 dist，已完成 vendor 准备、冻结安装与来源校验；记录见 clean-replay-receipt.json。

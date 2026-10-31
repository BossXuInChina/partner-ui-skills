# T2 试验简报

- 输入：partner-ui-pages 的 workbench-list 与 ai-assistant-workspace 原型及随包 runtime；唯一技术入口为 partner-ui-vue3 随包内容。
- 实际运行两次 convert_prototype，产出 4 / 8 个复核项的 guarded 草稿。最终从相应 Skill 预迁移模板构造模块，对照原型、提取稿和手工映射核验；保留草稿，最终功能无 guard。
- 冻结安装 pnpm 11.22，Node 26，Vue 3.5.13。完整 `pnpm run verify` 为 21.997 秒，包含 strict type、lint、format、静态规则、85 项单测、production build 与六路双视口外部 QA smoke。具体检查和交互证据见 delivery.json。
- 独立视觉对照同字体两视口，保留 1440 原始、最终、并排及差异图；1280 只保留结果。工程检查非用户验收。
- 转换器如文档所述仅输出带 guard 的提取稿；闭包、助手 helper、状态与 API 仍需手工处理。更换 harness 路由源码后，默认 route-chunks 固定匹配原模板路径导致构建失败，通过 Vite 配置传入实际 facade 后通过，分析器本身保持不变；并行 fixture 临时文件曾被 format 检查扫到，顺序运行后通过。两项均未更改公共 Skill。
- 真实 API、鉴权和平台契约未知；mock 不进入生产图，包资格不等于生产批准。没有用户视觉批准。

- 使用修订后当前 Skill 文档重新核对路由配置、串行 fixture、交付路径和转换映射，并重跑完整 verify（21.997 秒）及断言式交互（5.687 秒）；源码锁和原型资产均按 `source-pins.json` 校验。

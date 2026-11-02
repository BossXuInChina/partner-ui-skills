# 设计需求画布审查 Skill

将设计大图、页面关系图和截图集整理为可追溯的页面需求、组件映射与交互画布，并导出页面生成交接，供设计审查、组件补齐和后续页面生成使用。

- [Skill 指令](./SKILL.md)
- [数据契约](./references/data-contract.md)
- [画布面板模板](./references/canvas-template.md)
- [画布交付与交互](./references/canvas-delivery.md)
- [审查方法](./references/review-method.md)
- [更新记录](./CHANGELOG.md)

## 安装

将本仓库内容放到 Agent 的 `skills/design-requirement-canvas/` 目录，在对话中调用 `design-requirement-canvas`。按任务所用设计系统，还需要相应的组件消费 Skill 或组件契约（Workbench 为 `partner-ui-pages` / `partner-ui-vue3`）。

需要 Python 3.9+、Node 20+。裁剪需要 Pillow；DOM 测试需要 `npm install`（happy-dom）；浏览器测试需要 Playwright + Chromium。

## 单场景流水线

```bash
python3 scripts/new_scenario.py --root /abs/场景 --name 证书中心 --source board=/abs/大图.jpg
#   在 manifest.json 中登记 pages[].crop 后：
python3 scripts/crop_pages.py /abs/场景/证书中心/manifest.json
#   补齐区块、动作、映射、工作项与页面摘要后：
python3 scripts/validate_canvas_contract.py /abs/场景/证书中心/manifest.json
python3 scripts/build_canvas.py /abs/场景/证书中心/manifest.json
node scripts/test_canvas_browser.mjs --html /abs/场景/证书中心/dist/证书中心-画布.html --manifest /abs/场景/证书中心/manifest.json
python3 scripts/export_handoff.py /abs/场景/证书中心/manifest.json
```

多场景：`python3 scripts/build_index.py /abs/场景 --build`。旧首页样板迁移：`node scripts/adapters/legacy_home_v3.mjs --input <旧目录> --out <新场景>`。

## 目录

- `assets/`：共享画布宿主、右侧面板、页级摘要与合成示例数据。
- `scripts/`：脚手架、裁剪、校验、构建、交接、批量索引、适配器与测试。
- `tests/fixtures/demo-scenario/`：合成测试场景，不是业务数据。

## 自测

```bash
npm install
npm test   # Python 单测 + DOM 回归 + 浏览器回归
```

# 设计需求画布审查 Skill

将设计大图、页面关系图和截图集整理为可追溯的页面需求、组件映射与交互画布，供设计审查和后续页面生成使用。

- [Skill 指令](./SKILL.md)
- [数据契约](./references/data-contract.md)
- [画布面板模板](./references/canvas-template.md)
- [画布交付与交互](./references/canvas-delivery.md)
- [审查方法](./references/review-method.md)

## 使用

将本仓库内容放到 Codex 的 `skills/design-requirement-canvas/` 目录，在对话中调用 `design-requirement-canvas`。按任务所用设计系统，Skill 可能还需要相应的组件消费 Skill 或组件契约。

`assets/` 包含画布面板资源，`scripts/` 包含结构校验和交互回归工具；使用说明与完成条件见 `SKILL.md`。

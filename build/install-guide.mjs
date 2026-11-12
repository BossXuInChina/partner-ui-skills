const requirements = {
  'partner-ui-pages': '基本使用需 Node.js 22.13 或更高版本；新建和导出离线原型无需 npm install。使用 Python 页面脚手架时还需 Python 3。',
  'partner-ui-vue3': '生成器需 Node.js 22.13 或更高版本；完整 harness 验证还需 pnpm、安装依赖以及 Playwright Chromium。业务宿主依赖按宿主工程说明安装。',
  'partner-ui-review': '需 Node.js 22.13 或更高版本；静态复查使用目标工程或 Skill 内安装的 TypeScript 和 Vue，浏览器检查需要 Playwright Chromium。图片对照需要 Python 3 和 Pillow。',
  'design-requirement-canvas': '需 Python 3.9+ 和 Node.js 20+。校验、画布生成和交接使用 Python 标准库；图片裁剪需要 Pillow，DOM 和浏览器检查需要相应 Node 依赖及 Playwright Chromium。',
};

export function installGuide(name, version) {
  if (!requirements[name]) throw new Error(`Unknown skill: ${name}`);
  return `# ${name} ${version} 安装说明\n\n本包是独立 Skill，不需要维护仓库或同级 Skill。解压后，将直接包含 SKILL.md 的 ${name} 文件夹放入所用 AI 客户端的 Skill 目录，再按客户端要求重新加载。不要只复制 SKILL.md。\n\n## 环境\n\n${requirements[name]}\n\nmacOS 通常使用 python3；Windows 可使用 python 或 py -3 运行文档中的 Python 命令。路径包含空格或中文时请加引号。联网安装依赖及浏览器仅在相关功能需要时进行。\n\n详见 SKILL.md、README.md 与 references/。画布对特定设计系统的组件映射还需要对应的组件契约；通用画布功能不要求安装其他 Skill。\n\n本包为预览候选，校验和来源以同批 release-manifest.json 和 SHA256SUMS 为准；通过基础冒烟检查不代表真实项目、人工视觉或生产资格已验收。\n`;
}

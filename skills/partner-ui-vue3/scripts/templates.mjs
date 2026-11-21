#!/usr/bin/env node
import { existsSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { FEATURE_TEMPLATES } from './new_feature.mjs';

const listId = 'workbench-list';
const listPhrases = ['协议管理', '协议列表', '续签列表', '管理列表', '查询列表', '列表筛选'];
const explicitList = /协议列表|续签列表|管理列表|查询列表|列表(?:追加|筛选)/u;
const anotherPage = /详情页|(?:创建|编辑)报备|报备(?:页|详情|表单)|分区编辑/u;

export function queryTemplates(query) {
  const definition = FEATURE_TEMPLATES[listId];
  if (!definition) throw new Error(`TEMPLATE_QUERY: missing generator registration for ${listId}`);
  const text = query.normalize('NFKC').trim().toLowerCase();
  const businessText = text.replace(/[\s\p{P}]/gu, '');
  const listAt = businessText.search(explicitList);
  const otherPageAt = businessText.search(anotherPage);
  const targetsAnotherPage = otherPageAt !== -1 && (listAt === -1 || otherPageAt < listAt);
  const listExtension =
    businessText.includes('列表') &&
    businessText.includes('最终客户') &&
    businessText.includes('筛选');
  const match =
    text === listId ||
    (!targetsAnotherPage &&
      (['续签', '列表'].includes(businessText) ||
        listExtension ||
        listPhrases.some((phrase) => businessText.includes(phrase))));
  const items = match
    ? [
        {
          id: listId,
          useWhen: '协议管理、续签、显式查询的管理列表，以及追加列或筛选项。',
          avoidWhen: '详情、分区编辑或交易报备。',
          generate: `node scripts/new_feature.mjs agreements --template ${listId} --out "<消费工程绝对路径>/agreements"`,
          generateFrom:
            '在 Skill 根运行。替换 --out 的路径，父目录须已存在，目标目录须是新的。已有列表直接修改原模块。',
          host: {
            standalone: 'createFeatureRoutes(api)',
            existingHost:
              'createFeatureRoutes(api, { shell: \'host\' }) 或 <Page :api="api" shell="host" />。导航、滚动和唯一页脚由宿主负责。',
          },
          extend: `已有列表直接修改现有模块。见 assets/templates/${listId}/README.md，生成后同一说明在 pages/${listId}/README.md。`,
          businessApi: `${definition.api} · pages/${listId}/api.ts`,
          taskApi: [
            'node scripts/assets.mjs show --id wb-table --view task',
            'node scripts/assets.mjs show --id wb-draft-list-filter --view task',
          ],
        },
      ]
    : [];
  return {
    total: items.length,
    items,
    ...(match
      ? {}
      : {
          hint: '此入口覆盖管理列表。其他页面查看 SKILL.md 的 Vue3 起点，局部控件使用 scripts/assets.mjs search。',
        }),
  };
}

function main(args) {
  if (!args.length || (args.length === 1 && ['--help', '-h'].includes(args[0]))) {
    process.stdout.write('node scripts/templates.mjs --query <页面需求或模板 ID>\n');
    return;
  }
  if (args.length !== 2 || args[0] !== '--query' || !args[1].trim() || args[1].startsWith('--'))
    throw new Error('TEMPLATE_QUERY: expected --query <页面需求或模板 ID>');
  process.stdout.write(JSON.stringify(queryTemplates(args[1]), null, 2) + '\n');
}

if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))
) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

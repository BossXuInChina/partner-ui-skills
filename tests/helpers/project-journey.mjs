import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export async function journey(page, output, { single, evidenceDirectory }) {
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  await page.goto(pathToFileURL(output).href);
  await page.getByRole('heading', { name: '经营概览', exact: true }).waitFor();
  const cards = await page.locator('.demo-metrics > div').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()));
  assert.equal(cards.length, 3); assert.equal(cards[0].y, cards[1].y); assert.ok(cards[1].x > cards[0].x);
  await page.getByRole('button', { name: '管理伙伴', exact: true }).click();
  await page.getByRole('heading', { name: '伙伴管理', exact: true }).waitFor();
  await page.getByRole('textbox', { name: '筛选伙伴名称', exact: true }).fill('不存在');
  await page.getByRole('button', { name: '查询', exact: true }).click();
  await page.getByRole('link', { name: '示范伙伴一', exact: true }).waitFor({ state: 'hidden' });
  await page.getByRole('button', { name: '重置', exact: true }).click();
  await page.getByRole('link', { name: '示范伙伴一', exact: true }).click();
  await page.getByRole('textbox', { name: '编辑伙伴名称', exact: true }).fill('已修改伙伴');
  await page.getByRole('link', { name: '经营概览', exact: true }).click();
  await page.getByRole('heading', { name: '经营概览', exact: true }).waitFor();
  await page.goBack();
  await page.getByRole('heading', { name: '伙伴详情', exact: true }).waitFor();
  assert.equal(await page.getByRole('textbox', { name: '编辑伙伴名称', exact: true }).inputValue(), '已修改伙伴');
  await page.getByRole('button', { name: '保存修改', exact: true }).click();
  await page.getByRole('button', { name: '取消', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.getByRole('button', { name: '保存修改', exact: true }).click();
  await page.getByRole('button', { name: '确认保存', exact: true }).click();
  await page.getByText('已保存到本地演示数据', { exact: true }).waitFor();
  await page.getByRole('button', { name: '返回伙伴列表', exact: true }).click();
  await page.getByRole('link', { name: '已修改伙伴', exact: true }).waitFor();
  await page.getByRole('button', { name: '打开 AI 助手', exact: true }).click();
  const input = page.getByRole('textbox', { name: '输入问题', exact: true });
  await input.fill('模拟错误'); await input.press('Enter');
  await page.getByText('演示错误，可点击重试', { exact: true }).waitFor();
  await page.getByRole('button', { name: '重试', exact: true }).click();
  await page.getByText(/当前共管理 3 家伙伴/).waitFor();
  await page.getByRole('button', { name: '收起 AI 助手', exact: true }).click();
  await page.getByRole('link', { name: '经营概览', exact: true }).click();
  await page.getByRole('heading', { name: '经营概览', exact: true }).waitFor();
  await page.getByRole('button', { name: '打开 AI 助手', exact: true }).click();
  assert.match(await page.locator('.demo-assistant').innerText(), /当前共管理 3 家伙伴/);
  // Hold the responder timer while exercising cancellation, independent of CI/browser scheduling.
  // Keep the real send/stop UI and the aborted-message assertion; do not race a 250 ms response.
  await page.clock.pauseAt(new Date('2026-01-02T00:00:00Z'));
  await input.fill('中止这次回答'); await input.press('Enter');
  await page.getByRole('button', { name: '停止生成', exact: true }).click();
  await page.clock.runFor(1);
  await page.getByText(/已停止|已中断/).last().waitFor();
  await page.clock.resume();
  await page.setViewportSize({ width: 820, height: 900 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  const evidence = evidenceDirectory ?? resolve(root, '.artifacts/project-verification'); mkdirSync(evidence, { recursive: true });
  await page.screenshot({ path: resolve(evidence, (single ? 'single' : 'shared') + '-820.png'), fullPage: true });
  await page.goto(pathToFileURL(output).href + '#/detail?id=P-002');
  await page.getByRole('textbox', { name: '编辑伙伴名称', exact: true }).waitFor();
  assert.equal(await page.getByRole('textbox', { name: '编辑伙伴名称', exact: true }).inputValue(), '示范伙伴二');
  await page.goto(pathToFileURL(output).href + '#/%bad');
  await page.getByRole('heading', { name: '经营概览', exact: true }).waitFor();
  assert.deepEqual(errors, []); assert.deepEqual(requests, []);
}


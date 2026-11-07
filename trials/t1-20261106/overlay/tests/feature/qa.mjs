import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';
const port = 4281;
const server = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  { stdio: 'ignore' },
);
let browser;
try {
  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}`)).ok) break;
    } catch {
      /* server is still starting */
    }
    await delay(250);
  }
  browser = await chromium.launch({ headless: true });
  const row = (id) => ({
    id,
    name: '协议' + id,
    partner: '伙伴',
    owner: '负责人',
    status: '生效中',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  });
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1280, height: 800 },
  ]) {
    const page = await browser.newPage({ viewport });
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    let calls = 0;
    let listFailures = 0;
    const queries = [];
    await page.route('**/api/**', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname === '/api/assistant') {
        calls++;
        if (calls === 1) return route.fulfill({ status: 500 });
        if (calls === 3) {
          await delay(3000);
          return route.fulfill({ status: 500 }).catch(() => {});
        }
        return route.fulfill({
          status: 200,
          contentType: 'text/event-stream',
          body: 'data: {"kind":"text","text":"协议回答"}\n\ndata: [DONE]\n\n',
        });
      }
      if (url.pathname === '/api/agreements') {
        const keyword = url.searchParams.get('keyword');
        const status = url.searchParams.get('status');
        const pageNumber = url.searchParams.get('page');
        queries.push(Object.fromEntries(url.searchParams));
        if (keyword === '失败' && listFailures++ === 0) return route.fulfill({ status: 500 });
        if (keyword === '无') return route.fulfill({ json: { items: [], total: 0 } });
        if (status === '待续签')
          return route.fulfill({
            json: {
              items: [{ ...row(pageNumber === '2' ? 'C' : 'P'), status: '待续签' }],
              total: 22,
            },
          });
        return route.fulfill({
          json: { items: [row('A'), row('B')], total: 22 },
        });
      }
      if (url.pathname.endsWith('/A')) await delay(500);
      if (url.pathname.includes('/agreements/'))
        return route.fulfill({ json: row(url.pathname.split('/').pop()) }).catch(() => {});
      return route.fulfill({ status: 500, body: 'error' });
    });
    await page.goto(`http://127.0.0.1:${port}/agreements`);
    await page.getByText('协议A').waitFor();
    const search = page.getByLabel('名称或编号');
    await search.fill('无');
    await page.getByRole('button', { name: '搜索' }).click();
    await page.getByText('暂无协议').waitFor();
    await search.fill('失败');
    await page.getByRole('button', { name: '搜索' }).click();
    await page.getByText('加载失败').waitFor();
    await page.getByRole('button', { name: '重试' }).click();
    await page.getByText('协议A').waitFor();
    await page.getByRole('button', { name: '状态 全部' }).click();
    await page.getByRole('option', { name: '待续签' }).click();
    await page.getByRole('button', { name: '搜索' }).click();
    await page.getByText('协议P').waitFor();
    assert.equal(queries.at(-1).status, '待续签');
    await page.getByRole('button', { name: '第 2 页' }).click();
    await page.getByText('协议C').waitFor();
    assert.equal(queries.at(-1).page, '2');
    assert.equal(queries.at(-1).status, '待续签');
    await page.getByRole('button', { name: '重置' }).click();
    await page.getByText('协议A').waitFor();
    assert.equal(queries.at(-1).status, 'all');
    assert.equal(queries.at(-1).page, '1');
    assert.equal(queries.at(-1).keyword, '');
    await page.getByText('协议A').click();
    await page.waitForURL('**/agreements/A');
    await page.evaluate(() => history.pushState({}, '', '/agreements/B'));
    await page.evaluate(() => window.dispatchEvent(new PopStateEvent('popstate')));
    await page.getByText('协议B', { exact: true }).waitFor();
    await delay(700);
    assert.equal(await page.getByText('协议B', { exact: true }).count(), 1);
    await page.getByRole('button', { name: '返回列表' }).click();
    await page.getByText('协议A').waitFor();
    await page.getByRole('button', { name: '打开协议助手' }).click();
    await page.locator('.assistant').waitFor();
    const close = page.getByRole('button', { name: /收起 AI 助手/ }).last();
    await close.waitFor();
    const input = page.getByRole('textbox', { name: '输入问题' });
    await input.fill('协议草稿');
    await close.click();
    await page.getByRole('button', { name: '打开协议助手' }).click();
    assert.equal(await input.innerText(), '协议草稿');
    await page.getByRole('button', { name: '发送消息' }).click();
    await page.getByRole('button', { name: '重试' }).waitFor();
    await page.getByRole('button', { name: '重试' }).click();
    await page.getByText('协议回答', { exact: true }).waitFor();
    await input.fill('停止测试');
    await page.getByRole('button', { name: '发送消息' }).click();
    await page.getByRole('button', { name: /停止/ }).click();
    await page
      .getByText(/已停止|已中断/)
      .first()
      .waitFor();
    await close.click();
    console.log('closed', viewport.width);
    assert.equal(
      await page
        .getByRole('button', { name: '打开协议助手' })
        .evaluate((el) => el === document.activeElement),
      true,
    );
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('PASS: two viewport list/detail, stale-ID protection, assistant close/focus');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}

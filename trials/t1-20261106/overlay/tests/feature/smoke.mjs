import { runSmoke } from '../../../skill/scripts/smoke.mjs';
const row = {
  id: 'A',
  name: '协议A',
  partner: '伙伴',
  owner: '负责人',
  status: '生效中',
  startDate: '2026-01-01',
  endDate: '2026-12-31',
};
const result = await runSmoke({
  project: process.cwd(),
  routes: [{ path: '/agreements' }, { path: '/agreements/A' }],
  setupPage: async (page) => {
    await page.route('**/api/**', (route) =>
      route.fulfill({
        json: route.request().url().includes('/agreements/A') ? row : { items: [row], total: 1 },
      }),
    );
  },
});
console.log(result.status, result.receipt);

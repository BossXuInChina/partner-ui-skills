import { expect, test } from '@playwright/test';

test('blank deep link renders through the browser router without runtime errors', async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await page.goto('/blank');

  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { name: '空白页面', level: 1 })).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: '页面导航' }).getByRole('link'),
  ).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('#app')).toHaveCSS(
    'min-height',
    `${await page.evaluate(() => innerHeight)}px`,
  );
  expect(runtimeErrors).toEqual([]);
});

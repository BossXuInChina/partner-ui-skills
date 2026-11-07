import { test, expect } from "@playwright/test";
test("existing home and Pinia behavior remain usable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "经营工作台" })).toBeVisible();
  await page.getByRole("button", { name: "记录访问" }).click();
  await expect(page.getByRole("status")).toHaveText("本次记录：1");
});

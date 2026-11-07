import { writeFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

test("filters, paging, retry, cancellation and route state", async ({
  page,
}) => {
  let fail = false;
  const requests: URL[] = [];
  await page.route("**/api/agreements?*", async (route) => {
    const url = new URL(route.request().url());
    requests.push(url);
    if (url.searchParams.get("name") === "slow") {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await route
        .fulfill({
          json: {
            items: [
              {
                id: "old",
                name: "旧结果",
                partner: "伙伴",
                status: "生效中",
                endDate: "2027-01-01",
              },
            ],
            total: 1,
          },
        })
        .catch(() => {});
      return;
    }
    if (fail) {
      fail = false;
      await route.fulfill({ status: 500, body: "error" });
      return;
    }
    const name = url.searchParams.get("name") || "协议";
    const current = Number(url.searchParams.get("page"));
    await route.fulfill({
      json: {
        items:
          name === "无结果"
            ? []
            : [
                {
                  id: String(current),
                  name: `${name}-${current}`,
                  partner: "伙伴",
                  status: "生效中",
                  endDate: "2027-01-01",
                },
              ],
        total: name === "无结果" ? 0 : 12,
      },
    });
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "经营工作台" })).toBeVisible();
  const vue = await page.evaluate(() => {
    const element = document.querySelector("#app") as
      (HTMLElement & { __vue_app__?: { version: string } }) | null;
    return { appVersion: element?.__vue_app__?.version ?? null };
  });
  expect(vue.appVersion).toBe("3.5.42");
  writeFileSync("../browser-vue.json", JSON.stringify(vue, null, 2) + "\n");
  await page.getByRole("button", { name: "记录访问" }).click();
  await page.getByRole("link", { name: "协议查询" }).click();
  await expect(page.getByText("协议-1")).toBeVisible();
  await page.getByRole("textbox", { name: "协议名称" }).fill("测试");
  await page.getByRole("button", { name: "查询" }).click();
  await expect(page.getByText("测试-1")).toBeVisible();
  await page.getByRole("button", { name: "第 2 页", exact: true }).click();
  await expect(page.getByText("测试-2")).toBeVisible();
  await page.getByRole("link", { name: "工作台首页" }).click();
  await expect(page.getByRole("status")).toHaveText("本次记录：1");
  await page.getByRole("link", { name: "协议查询" }).click();
  await expect(page.getByRole("textbox", { name: "协议名称" })).toHaveValue(
    "测试",
  );
  await expect(page.getByText("测试-2")).toBeVisible();
  await page.getByRole("combobox", { name: /协议状态/ }).click();
  await page.getByText("待续签", { exact: true }).click();
  await page.getByRole("button", { name: "查询" }).click();
  await expect
    .poll(() => requests.at(-1)?.searchParams.get("status"))
    .toBe("待续签");
  await page.getByRole("link", { name: "工作台首页" }).click();
  await page.getByRole("link", { name: "协议查询" }).click();
  await expect(page.getByRole("combobox", { name: /协议状态/ })).toContainText(
    "待续签",
  );
  await expect
    .poll(() => requests.at(-1)?.searchParams.get("status"))
    .toBe("待续签");
  await expect(page.getByText("测试-1")).toBeVisible();
  fail = true;
  await page.getByRole("button", { name: "查询" }).click();
  await expect(page.getByText("协议加载失败").first()).toBeVisible();
  await page.getByRole("button", { name: "重试" }).click();
  await expect(page.getByText("测试-1")).toBeVisible();
  await page.getByRole("textbox", { name: "协议名称" }).fill("slow");
  await page.getByRole("button", { name: "查询" }).click();
  await page.getByRole("textbox", { name: "协议名称" }).fill("新");
  await page.getByRole("button", { name: "查询" }).click();
  await expect(page.getByText("新-1")).toBeVisible();
  await page.waitForTimeout(1400);
  await expect(page.getByText("旧结果")).toHaveCount(0);
  await page.getByRole("textbox", { name: "协议名称" }).fill("无结果");
  await page.getByRole("button", { name: "查询" }).click();
  await expect(page.getByText("新-1")).toHaveCount(0);
  await expect(page.getByText("没有符合条件的数据")).toBeVisible();
  await page.getByRole("button", { name: "重置" }).click();
  await expect(page.getByText("协议-1")).toBeVisible();
  await page.getByRole("textbox", { name: "协议名称" }).fill("slow");
  const cancelled = page.waitForEvent("requestfailed", {
    predicate: (request) => request.url().includes("name=slow"),
  });
  const pending = page.waitForRequest((request) =>
    request.url().includes("name=slow"),
  );
  await page.getByRole("button", { name: "查询" }).click();
  await pending;
  await page.getByRole("link", { name: "工作台首页" }).click();
  await cancelled;
  await expect(page.getByRole("status")).toHaveText("本次记录：1");
  expect(
    requests.some(
      (url) =>
        url.searchParams.get("page") === "2" &&
        url.searchParams.get("name") === "测试",
    ),
  ).toBeTruthy();
});

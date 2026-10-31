import { runSmoke } from "../../../../dist/partner-ui-vue3/scripts/smoke.mjs";
const result = await runSmoke({
  project: process.cwd(),
  out: "../smoke",
  routes: [
    { path: "/", readySelector: "h2" },
    { path: "/agreements", readySelector: "table" },
  ],
  setupPage: async (page) => {
    await page.route("**/api/agreements?*", (route) =>
      route.fulfill({
        json: {
          items: [
            {
              id: "A1",
              name: "示例协议",
              partner: "示例伙伴",
              status: "生效中",
              endDate: "2027-01-01",
            },
          ],
          total: 1,
        },
      }),
    );
  },
});
if (result.status !== "PASS") process.exitCode = 1;

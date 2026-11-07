import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { startGalleryServer } from "../gallery/serve.mjs";
import { chromium } from "playwright";
import { loadPinnedPackages } from "../build/verify-lock.mjs";
import { buildGallery } from "../build/build-gallery.mjs";
const root = resolve(import.meta.dirname, "..");

test("gallery uses locked metadata, preserves case semantics and renders official example", async () => {
  const { lock, packages } = loadPinnedPackages(root);
  const outDir = mkdtempSync(resolve(tmpdir(), "partner-gallery-"));
  try {
    await assert.rejects(
      buildGallery({
        root,
        lock: { ...lock, buildDate: "2000-01-01" },
        packages,
        outDir,
      }),
      /GALLERY_LOCK_IDENTITY_MISMATCH/,
    );
    const result = await buildGallery({ root, lock, packages, outDir });
    assert.equal(
      result.metrics.entries,
      packages.reduce(
        (n, p) => n + Object.keys(p.metadata.components.assets).length,
        0,
      ),
    );
    assert.ok(result.metrics.previews > 0);
    assert.equal(
      result.metrics.initialBytes + result.metrics.dynamicBytes,
      result.metrics.totalBytes,
    );
    assert.match(
      readFileSync(resolve(outDir, "index.html"), "utf8"),
      /组件图库|Partner UI 图库/,
    );
    const server = await startGalleryServer({ root: outDir, port: 0 });
    assert.equal(result.metrics.runtime.version, "3.5.42");
    assert.equal(result.metrics.runtime.vueCopies, 1);
    const baseURL = `http://127.0.0.1:${server.address().port}/`;
    assert.equal((await fetch(new URL("/missing-file", baseURL))).status, 404);
    assert.equal(
      (await fetch(new URL("/index.html", baseURL), { method: "POST" })).status,
      405,
    );
    let browser;
    try {
      browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
      page.on("console", (m) => {
        if (["error", "warning"].includes(m.type()))
          errors.push(m.type() + ": " + m.text());
      });
      page.on("response", (r) => {
        if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`);
      });
      await page.goto(`http://127.0.0.1:${server.address().port}/`);
      await page.getByText("付款方式将在本月底失效。").first().waitFor();
      assert.match(await page.locator(".count").innerText(), /91 \/ 91 条资产/);
      assert.equal(
        await page
          .getByRole("link", { name: "Open in Studio ↗" })
          .getAttribute("href"),
        "http://localhost:4173/preview/WB-ALERT-V1/alert?view=preview",
      );
      const ids = await page
        .locator("nav button")
        .evaluateAll((nodes) => nodes.map((n) => n.dataset.assetId));
      let previews = 0;
      for (const id of ids) {
        await page.locator(`nav button[data-asset-id="${id}"]`).click();
        if (await page.locator(".stage").count()) {
          previews++;
          await page.locator('.stage[data-preview-state="ready"]').waitFor();
          await page.waitForTimeout(150);
          const broken = await page
            .locator(".stage img")
            .evaluateAll((nodes) =>
              nodes
                .filter((n) => !n.complete || n.naturalWidth === 0)
                .map((n) => n.currentSrc),
            );
          assert.deepEqual(broken, [], `broken images in ${id}`);
        }
      }
      assert.equal(previews, result.metrics.previews);
      assert.deepEqual(errors, []);
      await page.locator('nav button[data-asset-id="wb-alert"]').click();
      await page.getByRole("tab", { name: "变体与状态" }).click();
      assert.equal(
        await page.evaluate(() => document.activeElement?.getAttribute("role")),
        "tab",
      );
      assert.equal(
        await page.locator("[role=tabpanel]").getAttribute("aria-labelledby"),
        await page.getByRole("tab", { name: "变体与状态" }).getAttribute("id"),
      );
      assert.match(await page.locator(".panel").innerText(), /案例未知：包内未声明/);
      await page.getByRole("tab", { name: "使用规范与API" }).focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await page.evaluate(() => document.activeElement?.textContent),
        "使用规范与API",
      );
      assert.match(await page.locator(".panel").innerText(), /message/);
      assert.equal(await page.locator("table caption").count(), 1);
      assert.equal(await page.locator("table th[scope=col]").count(), 4);
      await page.locator("input[type=search]").fill("checkboxChecked");
      assert.equal(
        await page
          .locator("nav button[aria-current=true]")
          .getAttribute("data-asset-id"),
        "wb-alert",
      );
      assert.equal(
        await page
          .getByRole("tab", { name: "使用规范与API" })
          .getAttribute("aria-selected"),
        "true",
      );
      await page.locator("input[type=search]").fill("update:checkboxChecked");
      assert.ok(await page.locator("nav button").count());
      await page.locator("input[type=search]").fill("不存在的资源999");
      assert.match(await page.locator("main").innerText(), /没有匹配/);
      await page.locator("input[type=search]").fill("");
      await page.locator("select").first().selectOption("huawei-partner-ai-ui");
      assert.match(
        await page
          .getByRole("link", { name: "Open in Studio ↗" })
          .getAttribute("href"),
        /^http:\/\/localhost:4178\/overview\.html/,
      );
      assert.match(await page.locator(".main").innerText(), /未知|未声明/);
    } finally {
      await browser?.close();
      await new Promise((r) => server.close(r));
    }
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});

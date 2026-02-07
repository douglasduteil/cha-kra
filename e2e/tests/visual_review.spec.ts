import { test } from "@playwright/test";

/**
 * Visual Review - Screenshot tests for manual visual inspection
 * These are NOT committed to CI; run locally with:
 *   PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/chromium bun run test --grep visual
 */

const pages = [
  { name: "home", path: "/" },
  { name: "breathing", path: "/breathing" },
  { name: "movement", path: "/movement" },
  { name: "mantra", path: "/mantra" },
  { name: "guided", path: "/guided" },
  { name: "tampura", path: "/tampura" },
  { name: "white-noise", path: "/white-noise" },
  { name: "inspiration", path: "/inspiration" },
  { name: "settings", path: "/settings" },
];

test.describe("Visual review - desktop 1280x720", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const pg of pages) {
    test(`screenshot ${pg.name} - dark mode`, async ({ page }) => {
      // Default is dark mode
      await page.goto(pg.path);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `test-results/visual/${pg.name}-dark-desktop.png`,
        fullPage: true,
      });
    });

    test(`screenshot ${pg.name} - light mode`, async ({ page }) => {
      await page.goto(pg.path);
      await page.waitForLoadState("networkidle");
      // Switch to light mode
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      });
      await page.waitForTimeout(100);
      await page.screenshot({
        path: `test-results/visual/${pg.name}-light-desktop.png`,
        fullPage: true,
      });
    });
  }
});

test.describe("Visual review - mobile 375x667", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const pg of pages) {
    test(`screenshot ${pg.name} - dark mobile`, async ({ page }) => {
      await page.goto(pg.path);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `test-results/visual/${pg.name}-dark-mobile.png`,
        fullPage: true,
      });
    });

    test(`screenshot ${pg.name} - light mobile`, async ({ page }) => {
      await page.goto(pg.path);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      });
      await page.waitForTimeout(100);
      await page.screenshot({
        path: `test-results/visual/${pg.name}-light-mobile.png`,
        fullPage: true,
      });
    });
  }
});

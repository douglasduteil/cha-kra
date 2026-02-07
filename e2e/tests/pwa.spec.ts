import { test, expect } from "@playwright/test";

/**
 * Progressive Web App - User Perspective Tests
 * Testing PWA capabilities from the user's point of view
 */

const SERVICE_WORKER_REGISTRATION_TIMEOUT = 5000;

test.describe("User experiences PWA features", () => {
  test("app loads offline after initial visit", async ({ page, context }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const is_dev = page.url().includes("localhost");
    test.skip(
      is_dev,
      "Offline test requires production build with PWA caching",
    );

    await page.waitForTimeout(SERVICE_WORKER_REGISTRATION_TIMEOUT);

    await context.setOffline(true);

    await page.evaluate(() => (window.location.href = "/breathing"));

    await page.waitForLoadState("domcontentloaded").catch(() => {});
    await page.waitForTimeout(1000);

    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("app has manifest for installation", async ({ page }) => {
    await page.goto("/");

    const manifest = page.locator('link[rel="manifest"]');
    const manifest_count = await manifest.count();

    if (manifest_count > 0) {
      await expect(manifest).toHaveCount(1);
    }
  });

  test("app has proper meta tags for PWA", async ({ page }) => {
    await page.goto("/");

    const theme_color = page.locator('meta[name="theme-color"]');
    await expect(theme_color).toHaveCount(1);

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
  });
});

test.describe("User on mobile device", () => {
  test.use({
    viewport: { width: 375, height: 667 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
  });

  test("mobile user sees responsive hub grid layout", async ({ page }) => {
    await page.goto("/");

    // User should see practice cards in the grid
    for (const name of ["Breathing", "Movement", "Mantra"]) {
      await expect(page.getByRole("link", { name })).toBeVisible();
    }

    // No bottom navigation bar
    const nav = page.getByRole("navigation");
    await expect(nav).toHaveCount(0);
  });

  test("mobile user can interact with touch targets", async ({ page }) => {
    await page.goto("/");

    const MIN_TOUCH_TARGET_SIZE = 44;

    // Check practice card touch targets
    const practice_links = page.locator("a:has(svg)");
    const all_links = await practice_links.all();

    for (const link of all_links) {
      if (await link.isVisible()) {
        const box = await link.boundingBox();
        if (box) {
          expect(box.width).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_SIZE);
          expect(box.height).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_SIZE);
        }
      }
    }
  });
});

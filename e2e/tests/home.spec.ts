import { user_clicks_link } from "../helpers/user-actions";
import { test, expect } from "@playwright/test";

/**
 * Home Page - User Perspective Tests
 * Testing the hub grid navigation and top bar
 */

test.describe("User visits the home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("user sees the top bar with app name", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Cha-Kra" })).toBeVisible();
  });

  test("user sees the settings gear icon in top bar", async ({ page }) => {
    const settings_link = page.getByRole("link", { name: /settings/i });
    await expect(settings_link).toBeVisible();
  });

  test("user sees all 7 practice cards in the grid", async ({ page }) => {
    for (const name of [
      "Breathing",
      "Movement",
      "Mantra",
      "Guided",
      "Tampura",
      "White Noise",
      "Inspiration",
    ]) {
      await expect(page.getByRole("link", { name })).toBeVisible();
    }
  });

  test("practice cards contain SVG icons", async ({ page }) => {
    // Each practice card should contain an SVG element (Lucide icon)
    const practice_cards = page.locator("a:has(svg)");
    // 7 practice cards + settings gear = 8 links with SVGs
    await expect(practice_cards).toHaveCount(8);
  });

  test("no bottom navigation bar exists", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toHaveCount(0);
  });
});

test.describe("User navigates between pages", () => {
  test("user can go to breathing exercise", async ({ page }) => {
    await page.goto("/");
    await user_clicks_link(page, /breathing/i);
    await expect(page).toHaveURL(/\/breathing/);
  });

  test("user can go to movement practice", async ({ page }) => {
    await page.goto("/");
    await user_clicks_link(page, /movement/i);
    await expect(page).toHaveURL(/\/movement/);
  });

  test("user can go to mantra meditation", async ({ page }) => {
    await page.goto("/");
    await user_clicks_link(page, /mantra/i);
    await expect(page).toHaveURL(/\/mantra/);
  });

  test("user can go to settings via gear icon", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /settings/i }).click();
    await expect(page).toHaveURL(/\/settings/);
  });
});

test.describe("Accessibility", () => {
  test("user can navigate using keyboard only", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");

    const focused_element = page.locator(":focus");
    await expect(focused_element).toBeVisible();
  });

  test("practice cards have accessible link roles", async ({ page }) => {
    await page.goto("/");

    // All practice cards should be proper links
    for (const name of [
      "Breathing",
      "Movement",
      "Mantra",
      "Guided",
      "Tampura",
      "White Noise",
      "Inspiration",
    ]) {
      const link = page.getByRole("link", { name });
      await expect(link).toBeVisible();
    }
  });
});

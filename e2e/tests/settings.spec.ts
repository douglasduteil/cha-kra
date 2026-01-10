import { test, expect } from "@playwright/test";

/**
 * Settings Page - User Perspective Tests
 * Testing how users customize their meditation experience
 */

test.describe("User manages settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/settings");
  });

  test("user sees settings page", async ({ page }) => {
    // User should see the settings heading
    const heading = page.getByRole("heading", { name: /settings/i });
    await expect(heading).toBeVisible();
  });

  test("user can toggle dark mode from settings", async ({ page }) => {
    // User should see theme heading
    const theme_heading = page.getByRole("heading", { name: /theme/i });
    await expect(theme_heading).toBeVisible();

    // User clicks Dark theme button
    const dark_button = page.getByRole("button", { name: /dark/i });
    await expect(dark_button).toBeVisible();
    await dark_button.click();

    // Dark class should be applied
    const html_element = page.locator("html");
    await expect(html_element).toHaveClass(/dark/);

    // User clicks Light theme button
    const light_button = page.getByRole("button", { name: /light/i });
    await light_button.click();

    // Light class should be applied
    await expect(html_element).toHaveClass(/light/);
  });

  test("user preferences persist across page reloads", async ({ page }) => {
    // User sets dark theme
    const dark_button = page.getByRole("button", { name: /dark/i });
    await dark_button.click();

    const html_element = page.locator("html");
    await expect(html_element).toHaveClass(/dark/);

    // User reloads page
    await page.reload();

    // Dark theme should persist
    await expect(html_element).toHaveClass(/dark/);
  });

  test("user can navigate back from settings", async ({ page }) => {
    // User should be able to go back
    const back_button = page.getByRole("link", { name: /back|home/i });

    if (await back_button.isVisible()) {
      await back_button.click();
      await expect(page).toHaveURL("/");
    }
  });
});

test.describe("Settings accessibility", () => {
  test("settings controls are keyboard accessible", async ({ page }) => {
    await page.goto("/settings");

    // User should be able to navigate all controls with keyboard
    await page.keyboard.press("Tab");

    const focused_element = page.locator(":focus");
    await expect(focused_element).toBeVisible();

    // User should be able to activate focused control
    await page.keyboard.press("Enter");
  });

  test("settings have clear labels", async ({ page }) => {
    await page.goto("/settings");

    // All interactive controls should have accessible names
    const buttons = page.getByRole("button");
    const button_count = await buttons.count();

    for (let i = 0; i < button_count; i++) {
      const button = buttons.nth(i);
      const accessible_name = await button.getAttribute("aria-label");
      const text_content = await button.textContent();

      // Button should have either aria-label or text content
      expect(accessible_name || text_content).toBeTruthy();
    }
  });
});

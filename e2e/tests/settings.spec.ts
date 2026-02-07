import { test, expect } from "@playwright/test";

/**
 * Settings Page - User Perspective Tests
 * Testing dark mode toggle, chakra selection, and back navigation
 */

test.describe("User manages settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/settings");
  });

  test("user sees settings page", async ({ page }) => {
    const heading = page.getByText("Settings", { exact: true });
    await expect(heading).toBeVisible();
  });

  test("user can toggle dark mode", async ({ page }) => {
    // Theme heading should be visible
    const theme_heading = page.getByRole("heading", { name: /appearance/i });
    await expect(theme_heading).toBeVisible();

    // User clicks Dark theme button
    const dark_button = page.getByRole("button", { name: /dark/i });
    await expect(dark_button).toBeVisible();
    await dark_button.click();

    const html_element = page.locator("html");
    await expect(html_element).toHaveClass(/dark/);

    // User clicks Light theme button
    const light_button = page.getByRole("button", { name: /light/i });
    await light_button.click();
    await expect(html_element).toHaveClass(/light/);
  });

  test("user can select a chakra color", async ({ page }) => {
    // User should see energy center section
    const energy_heading = page.getByRole("heading", {
      name: /energy center/i,
    });
    await expect(energy_heading).toBeVisible();

    // User clicks on Heart chakra
    const heart_button = page.getByRole("button", { name: /anahata/i });
    await expect(heart_button).toBeVisible();
    await heart_button.click();

    // data-chakra attribute should update on html
    const html_element = page.locator("html");
    await expect(html_element).toHaveAttribute("data-chakra", "heart");
  });

  test("user preferences persist across page reloads", async ({ page }) => {
    const dark_button = page.getByRole("button", { name: /dark/i });
    await dark_button.click();

    const html_element = page.locator("html");
    await expect(html_element).toHaveClass(/dark/);

    await page.reload();
    await expect(html_element).toHaveClass(/dark/);
  });

  test("user can navigate back to home", async ({ page }) => {
    const back_link = page.getByRole("link", { name: /back to home/i });
    await expect(back_link).toBeVisible();
    await back_link.click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Settings accessibility", () => {
  test("settings controls are keyboard accessible", async ({ page }) => {
    await page.goto("/settings");

    await page.keyboard.press("Tab");

    const focused_element = page.locator(":focus");
    await expect(focused_element).toBeVisible();
  });

  test("settings have clear labels", async ({ page }) => {
    await page.goto("/settings");

    const buttons = page.getByRole("button");
    const button_count = await buttons.count();

    for (let i = 0; i < button_count; i++) {
      const button = buttons.nth(i);
      const accessible_name = await button.getAttribute("aria-label");
      const text_content = await button.textContent();

      expect(accessible_name || text_content).toBeTruthy();
    }
  });
});

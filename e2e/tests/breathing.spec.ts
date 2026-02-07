import { test, expect } from "@playwright/test";

/**
 * Breathing Exercise - User Perspective Tests
 * Testing the canvas layout and back navigation
 */

test.describe("User uses breathing exercise", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/breathing");
  });

  test("user sees the breathing canvas with exercise name", async ({
    page,
  }) => {
    // User should see the centered breathing circle with an exercise name
    await expect(
      page.getByRole("paragraph").filter({ hasText: "4-7-8 Breathing" }),
    ).toBeVisible();
  });

  test("user sees exercise list below the canvas", async ({ page }) => {
    // Secondary exercise list
    await expect(
      page.getByRole("button", { name: /box breathing/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /alternate nostril/i }),
    ).toBeVisible();
  });

  test("user can select a different exercise", async ({ page }) => {
    await page.getByRole("button", { name: /box breathing/i }).click();
    // The canvas should update to show Box Breathing
    await expect(
      page.locator(".rounded-full").getByText("Box Breathing"),
    ).toBeVisible();
  });

  test("user can navigate back to home via back arrow", async ({ page }) => {
    const back_link = page.getByRole("link", { name: /back to home/i });
    await expect(back_link).toBeVisible();
    await back_link.click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Breathing exercise accessibility", () => {
  test("breathing canvas respects reduced motion", async ({
    page,
    context,
  }) => {
    await context.addInitScript(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
          matches: query.includes("prefers-reduced-motion: reduce"),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });

    await page.goto("/breathing");

    // The breathing circle should not have animation class
    const circle = page.locator(".rounded-full").first();
    const classes = await circle.getAttribute("class");
    expect(classes).not.toContain("animate-");
  });

  test("back arrow is keyboard accessible", async ({ page }) => {
    await page.goto("/breathing");

    // Tab through top bar (Cha-Kra link, Settings link) to reach back arrow
    await page.keyboard.press("Tab"); // Cha-Kra link
    await page.keyboard.press("Tab"); // Settings link
    await page.keyboard.press("Tab"); // Back arrow

    const focused_element = page.locator(":focus");
    await expect(focused_element).toHaveAttribute("aria-label", "Back to home");
  });
});

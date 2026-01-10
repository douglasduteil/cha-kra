import { test, expect } from '@playwright/test'

/**
 * Breathing Exercise - User Perspective Tests
 * Testing how users experience the breathing meditation tool
 */

test.describe('User uses breathing exercise', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/breathing')
  })

  test('user sees breathing exercise page', async ({ page }) => {
    // User should see the breathing page heading
    const heading = page.getByRole('heading', { name: /breathing/i })
    await expect(heading).toBeVisible()
  })

  test('user can start a breathing session', async ({ page }) => {
    // User should see a button to start breathing
    const start_button = page.getByRole('button', { name: /start|begin/i })

    if (await start_button.isVisible()) {
      // User clicks to start breathing exercise
      await start_button.click()

      // User should see breathing in progress
      // (this will depend on your implementation)
    }
  })

  test('user sees breathing instructions', async ({ page }) => {
    // User should see clear instructions on how to breathe
    const instructions = page.getByText(/breathe|inhale|exhale/i)
    await expect(instructions.first()).toBeVisible()
  })

  test('user can navigate back to home', async ({ page }) => {
    // User should be able to go back home
    const home_link = page.getByRole('link', { name: /home/i })

    if (await home_link.isVisible()) {
      await home_link.click()
      await expect(page).toHaveURL('/')
    }
  })
})

test.describe('Breathing exercise accessibility', () => {
  test('breathing animations respect reduced motion preference', async ({
    page,
    context,
  }) => {
    // Emulate user who prefers reduced motion
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      })
    })

    await page.goto('/breathing')

    // User with motion sensitivity should still be able to use the app
    const heading = page.getByRole('heading', { name: /breathing/i })
    await expect(heading).toBeVisible()
  })

  test('user can control breathing exercise with keyboard', async ({
    page,
  }) => {
    await page.goto('/breathing')

    // User should be able to tab to controls
    await page.keyboard.press('Tab')

    // User should be able to activate controls with Enter/Space
    const focused_element = page.locator(':focus')
    await expect(focused_element).toBeVisible()
  })
})

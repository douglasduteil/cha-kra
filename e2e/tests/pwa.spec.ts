import { test, expect } from '@playwright/test'

/**
 * Progressive Web App - User Perspective Tests
 * Testing PWA capabilities from the user's point of view
 */

test.describe('User experiences PWA features', () => {
  test('app loads offline after initial visit', async ({ page, context }) => {
    // User visits the app online first
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for service worker to be registered
    await page.waitForTimeout(2000)

    // User goes offline
    await context.setOffline(true)

    // User tries to reload the app
    await page.reload()

    // User should still see the app
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('app has manifest for installation', async ({ page }) => {
    await page.goto('/')

    // Check if manifest is linked
    const manifest = page.locator('link[rel="manifest"]')
    await expect(manifest).toHaveCount(1)
  })

  test('app has proper meta tags for PWA', async ({ page }) => {
    await page.goto('/')

    // Check for theme color
    const themeColor = page.locator('meta[name="theme-color"]')
    await expect(themeColor).toHaveCount(1)

    // Check for viewport
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveCount(1)
  })
})

test.describe('User on mobile device', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  })

  test('mobile user sees responsive layout', async ({ page }) => {
    await page.goto('/')

    // User should see mobile-optimized layout
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    // Navigation should be accessible on mobile
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()
  })

  test('mobile user can interact with touch targets', async ({ page }) => {
    await page.goto('/')

    // All interactive elements should be at least 44x44px (touch target size)
    const buttons = page.getByRole('button')
    const links = page.getByRole('link')

    const allInteractive = await buttons.all()
    const allLinks = await links.all()

    for (const element of [...allInteractive, ...allLinks]) {
      if (await element.isVisible()) {
        const box = await element.boundingBox()
        if (box) {
          // Touch targets should be at least 44x44px
          expect(box.width).toBeGreaterThanOrEqual(40) // slight tolerance
          expect(box.height).toBeGreaterThanOrEqual(40)
        }
      }
    }
  })
})

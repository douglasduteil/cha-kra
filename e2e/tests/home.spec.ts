import { test, expect } from '@playwright/test'
import {
  findHeading,
  findNavLink,
  userClicksLink,
  userSeesText,
} from '../helpers/user-actions'

/**
 * Home Page - User Perspective Tests
 * Testing how users experience the meditation app landing page
 */

test.describe('User visits the home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('user sees the welcome message', async ({ page }) => {
    // User should see the main heading
    const heading = await findHeading(page, 1, /cha-kra/i)
    await expect(heading).toBeVisible()
  })

  test('user sees navigation to all meditation practices', async ({ page }) => {
    // User should be able to navigate to different meditation tools
    const breathingLink = page.getByRole('link', { name: /breathing/i })
    const movementLink = page.getByRole('link', { name: /movement/i })
    const mantraLink = page.getByRole('link', { name: /mantra/i })

    await expect(breathingLink).toBeVisible()
    await expect(movementLink).toBeVisible()
    await expect(mantraLink).toBeVisible()
  })

  test('user can toggle dark mode', async ({ page }) => {
    // User should be able to switch between light and dark themes
    const darkModeToggle = page.getByRole('button', { name: /dark mode|theme/i })

    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click()

      // Check if dark mode class is applied
      const htmlElement = page.locator('html')
      await expect(htmlElement).toHaveClass(/dark/)
    }
  })

  test('user can access settings', async ({ page }) => {
    // User should be able to open settings
    const settingsLink = page.getByRole('link', { name: /settings/i })
    await expect(settingsLink).toBeVisible()
  })
})

test.describe('User navigates between pages', () => {
  test('user can go to breathing exercise', async ({ page }) => {
    await page.goto('/')

    // User clicks on breathing practice
    await userClicksLink(page, /breathing/i)

    // User should see breathing page content
    await expect(page).toHaveURL(/\/breathing/)
  })

  test('user can go to movement practice', async ({ page }) => {
    await page.goto('/')

    // User clicks on movement practice
    await userClicksLink(page, /movement/i)

    // User should see movement page
    await expect(page).toHaveURL(/\/movement/)
  })

  test('user can go to mantra meditation', async ({ page }) => {
    await page.goto('/')

    // User clicks on mantra meditation
    await userClicksLink(page, /mantra/i)

    // User should see mantra page
    await expect(page).toHaveURL(/\/mantra/)
  })
})

test.describe('Accessibility', () => {
  test('user can navigate using keyboard only', async ({ page }) => {
    await page.goto('/')

    // User should be able to tab through interactive elements
    await page.keyboard.press('Tab')

    // First focusable element should have visible focus
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/')

    // Page should have at least one h1 heading
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toHaveCount(1)
  })
})

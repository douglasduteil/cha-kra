import { test, expect } from '@playwright/test'
import { find_heading, user_clicks_link } from '../helpers/user-actions'

/**
 * Home Page - User Perspective Tests
 * Testing how users experience the meditation app landing page
 */

test.describe('User visits the home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('user sees the welcome message', async ({ page }) => {
    // User should see the welcome heading
    await expect(page.getByRole('heading', { name: /welcome to balance/i })).toBeVisible()
  })

  test('user sees the app branding', async ({ page }) => {
    // User should see the Cha-Kra branding
    const cha_heading = await find_heading(page, 1, /cha/i)
    await expect(cha_heading).toBeVisible()
  })

  test('user sees navigation to all meditation practices', async ({ page }) => {
    // User should be able to navigate to different meditation tools
    const breathing_link = page.getByRole('link', { name: /breathing/i })
    const movement_link = page.getByRole('link', { name: /movement/i })
    const mantra_link = page.getByRole('link', { name: /mantra/i })

    await expect(breathing_link).toBeVisible()
    await expect(movement_link).toBeVisible()
    await expect(mantra_link).toBeVisible()
  })

  test.skip('user can toggle dark mode', async ({ page }) => {
    // User should be able to switch between light and dark themes
    const dark_mode_toggle = page.getByRole('button', {
      name: /dark mode|theme/i,
    })

    if (await dark_mode_toggle.isVisible()) {
      await dark_mode_toggle.click()

      // Check if dark mode class is applied
      const html_element = page.locator('html')
      await expect(html_element).toHaveClass(/dark/)
    }
  })

  test('user can access settings', async ({ page }) => {
    // User should be able to open settings
    const settings_link = page.getByRole('link', { name: /settings/i })
    await expect(settings_link).toBeVisible()
  })
})

test.describe('User navigates between pages', () => {
  test('user can go to breathing exercise', async ({ page }) => {
    await page.goto('/')

    // User clicks on breathing practice
    await user_clicks_link(page, /breathing/i)

    // User should see breathing page content
    await expect(page).toHaveURL(/\/breathing/)
  })

  test('user can go to movement practice', async ({ page }) => {
    await page.goto('/')

    // User clicks on movement practice
    await user_clicks_link(page, /movement/i)

    // User should see movement page
    await expect(page).toHaveURL(/\/movement/)
  })

  test('user can go to mantra meditation', async ({ page }) => {
    await page.goto('/')

    // User clicks on mantra meditation
    await user_clicks_link(page, /mantra/i)

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
    const focused_element = page.locator(':focus')
    await expect(focused_element).toBeVisible()
  })

  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/')

    // Page should have h1 headings (Cha-Kra logo uses two h1s)
    const main_headings = page.getByRole('heading', { level: 1 })
    await expect(main_headings.first()).toBeVisible()
  })
})

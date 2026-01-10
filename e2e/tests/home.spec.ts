import { test, expect } from '@playwright/test'
import { find_heading, user_clicks_link } from '../helpers/user-actions'

/**
 * Home Page - User Perspective Tests
 * Testing how users experience the meditation app landing page
 */

test.describe('User visits the home page', () => {
  test.beforeEach(async ({ page }) => {
    // Set up console listeners BEFORE navigation
    page.on('console', (msg) => {
      console.log(`[CONSOLE ${msg.type()}]`, msg.text())
    })

    page.on('pageerror', (error) => {
      console.log('[PAGE ERROR]', error.message)
    })

    // Log failed requests
    page.on('requestfailed', (request) => {
      console.log('[REQUEST FAILED]', request.url(), request.failure()?.errorText)
    })

    // Log all responses with errors
    page.on('response', (response) => {
      if (!response.ok() || response.status() >= 400) {
        console.log(`[RESPONSE ${response.status()}]`, response.url())
      }
    })

    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('user sees the home page loads', async ({ page }) => {
    await expect(page).toHaveURL('/')

    // Get full page HTML to debug
    const full_html = await page.content()
    console.log('Full HTML length:', full_html.length)
    console.log('HTML head:', full_html.substring(0, 500))

    // Check script tags
    const scripts = await page.locator('script').count()
    console.log('Number of script tags:', scripts)

    for (let i = 0; i < Math.min(scripts, 5); i++) {
      const src = await page.locator('script').nth(i).getAttribute('src')
      const type = await page.locator('script').nth(i).getAttribute('type')
      console.log(`Script ${i}: src="${src}" type="${type}"`)
    }

    // Wait a moment for JS to execute
    await page.waitForTimeout(1000)

    // Wait for #root to have content
    const root_div = page.locator('#root')
    const root_html = await root_div.innerHTML()
    console.log('Root HTML after wait:', root_html.substring(0, 300))

    // Try waiting for any element to appear in root
    await expect(root_div.locator('*').first()).toBeVisible({ timeout: 10000 })
  })

  test.skip('user sees the welcome message', async ({ page }) => {
    // User should see the main heading
    const heading = await find_heading(page, 1, /cha-kra/i)
    await expect(heading).toBeVisible()
  })

  test.skip('user sees navigation to all meditation practices', async ({ page }) => {
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

  test.skip('user can access settings', async ({ page }) => {
    // User should be able to open settings
    const settings_link = page.getByRole('link', { name: /settings/i })
    await expect(settings_link).toBeVisible()
  })
})

test.describe.skip('User navigates between pages', () => {
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

test.describe.skip('Accessibility', () => {
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

    // Page should have at least one h1 heading
    const main_heading = page.getByRole('heading', { level: 1 })
    await expect(main_heading).toHaveCount(1)
  })
})

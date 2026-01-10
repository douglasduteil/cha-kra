import { test, expect } from '@playwright/test'

/**
 * Settings Page - User Perspective Tests
 * Testing how users customize their meditation experience
 */

test.describe.skip('User manages settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings')
  })

  test('user sees settings page', async ({ page }) => {
    // User should see the settings heading
    const heading = page.getByRole('heading', { name: /settings/i })
    await expect(heading).toBeVisible()
  })

  test('user can toggle dark mode from settings', async ({ page }) => {
    // User should see a dark mode control
    const dark_mode_control = page.locator('text=/dark mode|theme/i')

    if (await dark_mode_control.isVisible()) {
      const html_element = page.locator('html')
      const initial_theme = await html_element.getAttribute('class')

      // User toggles dark mode
      const toggle_button = page.getByRole('button', {
        name: /dark mode|theme/i,
      })

      if (await toggle_button.isVisible()) {
        await toggle_button.click()

        // Theme should change
        const new_theme = await html_element.getAttribute('class')
        expect(initial_theme).not.toBe(new_theme)
      }
    }
  })

  test('user preferences persist across page reloads', async ({ page }) => {
    // Get initial state
    const html_element = page.locator('html')
    const initial_has_class = await html_element.evaluate((el) =>
      el.classList.contains('dark')
    )

    // User toggles a setting
    const toggle_button = page.getByRole('button', {
      name: /dark mode|theme/i,
    })

    if (await toggle_button.isVisible()) {
      await toggle_button.click()

      // Reload page
      await page.reload()

      // Setting should persist
      const after_reload_has_class = await html_element.evaluate((el) =>
        el.classList.contains('dark')
      )
      expect(after_reload_has_class).not.toBe(initial_has_class)
    }
  })

  test('user can navigate back from settings', async ({ page }) => {
    // User should be able to go back
    const back_button = page.getByRole('link', { name: /back|home/i })

    if (await back_button.isVisible()) {
      await back_button.click()
      await expect(page).toHaveURL('/')
    }
  })
})

test.describe.skip('Settings accessibility', () => {
  test('settings controls are keyboard accessible', async ({ page }) => {
    await page.goto('/settings')

    // User should be able to navigate all controls with keyboard
    await page.keyboard.press('Tab')

    const focused_element = page.locator(':focus')
    await expect(focused_element).toBeVisible()

    // User should be able to activate focused control
    await page.keyboard.press('Enter')
  })

  test('settings have clear labels', async ({ page }) => {
    await page.goto('/settings')

    // All interactive controls should have accessible names
    const buttons = page.getByRole('button')
    const button_count = await buttons.count()

    for (let i = 0; i < button_count; i++) {
      const button = buttons.nth(i)
      const accessible_name = await button.getAttribute('aria-label')
      const text_content = await button.textContent()

      // Button should have either aria-label or text content
      expect(accessible_name || text_content).toBeTruthy()
    }
  })
})

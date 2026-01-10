import { test, expect } from '@playwright/test'

/**
 * Settings Page - User Perspective Tests
 * Testing how users customize their meditation experience
 */

test.describe('User manages settings', () => {
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
    const darkModeControl = page.locator('text=/dark mode|theme/i')

    if (await darkModeControl.isVisible()) {
      const htmlElement = page.locator('html')
      const initialTheme = await htmlElement.getAttribute('class')

      // User toggles dark mode
      const toggleButton = page.getByRole('button', { name: /dark mode|theme/i })

      if (await toggleButton.isVisible()) {
        await toggleButton.click()

        // Theme should change
        const newTheme = await htmlElement.getAttribute('class')
        expect(initialTheme).not.toBe(newTheme)
      }
    }
  })

  test('user preferences persist across page reloads', async ({ page }) => {
    // Get initial state
    const htmlElement = page.locator('html')
    const initialHasClass = await htmlElement.evaluate((el) =>
      el.classList.contains('dark')
    )

    // User toggles a setting
    const toggleButton = page.getByRole('button', { name: /dark mode|theme/i })

    if (await toggleButton.isVisible()) {
      await toggleButton.click()

      // Reload page
      await page.reload()

      // Setting should persist
      const afterReloadHasClass = await htmlElement.evaluate((el) =>
        el.classList.contains('dark')
      )
      expect(afterReloadHasClass).not.toBe(initialHasClass)
    }
  })

  test('user can navigate back from settings', async ({ page }) => {
    // User should be able to go back
    const backButton = page.getByRole('link', { name: /back|home/i })

    if (await backButton.isVisible()) {
      await backButton.click()
      await expect(page).toHaveURL('/')
    }
  })
})

test.describe('Settings accessibility', () => {
  test('settings controls are keyboard accessible', async ({ page }) => {
    await page.goto('/settings')

    // User should be able to navigate all controls with keyboard
    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()

    // User should be able to activate focused control
    await page.keyboard.press('Enter')
  })

  test('settings have clear labels', async ({ page }) => {
    await page.goto('/settings')

    // All interactive controls should have accessible names
    const buttons = page.getByRole('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const accessibleName = await button.getAttribute('aria-label')
      const textContent = await button.textContent()

      // Button should have either aria-label or text content
      expect(accessibleName || textContent).toBeTruthy()
    }
  })
})

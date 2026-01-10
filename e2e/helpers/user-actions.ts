import type { Page, Locator } from '@playwright/test'

/**
 * User-centric helper utilities for accessibility-first selectors
 * Inspired by Testing Library's philosophy: test how users interact with the app
 *
 * NAMING: All functions use snake_case per project constitution
 */

/**
 * Find element by its accessible role (button, link, heading, etc.)
 * This is how screen reader users navigate
 */
export async function find_by_role(
  page: Page,
  role: string,
  options?: { name?: string | RegExp }
) {
  const selector = options?.name
    ? `role=${role}[name="${options.name}"]`
    : `role=${role}`
  return page.locator(selector)
}

/**
 * Find element by label text (for form inputs)
 * This is how users identify form fields
 */
export async function find_by_label(page: Page, text: string | RegExp) {
  return page.getByLabel(text)
}

/**
 * Find element by visible text content
 * This is how users identify content on the page
 */
export async function find_by_text(page: Page, text: string | RegExp) {
  return page.getByText(text)
}

/**
 * Find navigation link by its accessible name
 */
export async function find_nav_link(page: Page, name: string | RegExp) {
  return page.getByRole('link', { name })
}

/**
 * Find button by its accessible name
 */
export async function find_button(page: Page, name: string | RegExp) {
  return page.getByRole('button', { name })
}

/**
 * Find heading by level and optional name
 */
export async function find_heading(
  page: Page,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  name?: string | RegExp
) {
  return page.getByRole('heading', { level, name })
}

/**
 * Wait for user to see specific content
 */
export async function user_sees_text(page: Page, text: string | RegExp) {
  await page.getByText(text).waitFor({ state: 'visible' })
}

/**
 * User clicks on a button
 */
export async function user_clicks_button(page: Page, name: string | RegExp) {
  await page.getByRole('button', { name }).click()
}

/**
 * User navigates using a link
 */
export async function user_clicks_link(page: Page, name: string | RegExp) {
  await page.getByRole('link', { name }).click()
}

/**
 * Check if element is visible to the user
 */
export async function is_visible_to_user(locator: Locator) {
  return await locator.isVisible()
}

/**
 * Check if user can interact with element (enabled and visible)
 */
export async function can_user_interact(locator: Locator) {
  return (await locator.isVisible()) && (await locator.isEnabled())
}

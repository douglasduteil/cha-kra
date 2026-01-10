import { Page, Locator } from '@playwright/test'
import { getByRole, getByLabelText, getByText } from '@testing-library/dom'

/**
 * User-centric helper utilities for accessibility-first selectors
 * Inspired by Testing Library's philosophy: test how users interact with the app
 */

/**
 * Find element by its accessible role (button, link, heading, etc.)
 * This is how screen reader users navigate
 */
export async function findByRole(
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
export async function findByLabel(page: Page, text: string | RegExp) {
  return page.getByLabel(text)
}

/**
 * Find element by visible text content
 * This is how users identify content on the page
 */
export async function findByText(page: Page, text: string | RegExp) {
  return page.getByText(text)
}

/**
 * Find navigation link by its accessible name
 */
export async function findNavLink(page: Page, name: string | RegExp) {
  return page.getByRole('link', { name })
}

/**
 * Find button by its accessible name
 */
export async function findButton(page: Page, name: string | RegExp) {
  return page.getByRole('button', { name })
}

/**
 * Find heading by level and optional name
 */
export async function findHeading(
  page: Page,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  name?: string | RegExp
) {
  return page.getByRole('heading', { level, name })
}

/**
 * Wait for user to see specific content
 */
export async function userSeesText(page: Page, text: string | RegExp) {
  await page.getByText(text).waitFor({ state: 'visible' })
}

/**
 * User clicks on a button
 */
export async function userClicksButton(page: Page, name: string | RegExp) {
  await page.getByRole('button', { name }).click()
}

/**
 * User navigates using a link
 */
export async function userClicksLink(page: Page, name: string | RegExp) {
  await page.getByRole('link', { name }).click()
}

/**
 * Check if element is visible to the user
 */
export async function isVisibleToUser(locator: Locator) {
  return await locator.isVisible()
}

/**
 * Check if user can interact with element (enabled and visible)
 */
export async function canUserInteract(locator: Locator) {
  return (await locator.isVisible()) && (await locator.isEnabled())
}

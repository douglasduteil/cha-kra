# E2E Testing: Constitution

> User-centric testing principles for the Cha-Kra meditation PWA. This constitution extends and follows all rules from the root [CLAUDE.md](../CLAUDE.md).

## Inheritance

**CRITICAL**: This e2e testing suite **SHALL** follow ALL principles and standards from the root `../CLAUDE.md`, including:

- Code Quality standards
- Accessibility First requirements
- TypeScript Standards
- Naming Conventions (snake_case for variables/functions)
- Security requirements
- Simplicity Over Complexity

## Additional E2E-Specific Principles

### User-Centric Testing Philosophy

- **SHALL** write tests from the user's perspective, never from technical implementation
- **SHALL** use accessible selectors (roles, labels, text) that reflect how real users interact
- **MUST** avoid CSS selectors, IDs, or test-specific attributes
- **SHALL** write test descriptions that any human can understand
- **MUST NOT** use Gherkin or BDD abstraction layers

### Accessibility-First Selectors

- **SHALL** prioritize `getByRole()` for interactive elements
- **SHALL** use `getByLabel()` for form inputs
- **SHALL** use `getByText()` for content verification
- **MUST NOT** use fragile selectors like CSS classes or XPath
- **SHALL** validate keyboard navigation in every test suite
- **SHALL** test for screen reader compatibility

### Test Organization

- **SHALL** group tests by user scenarios, not by components
- **SHALL** use descriptive test names: "user can [action]" or "user sees [content]"
- **MUST** include accessibility tests in every feature suite
- **SHALL** test mobile and desktop viewports
- **SHALL** test with reduced motion preferences

### Naming Conventions (from root)

- **SHALL** use snake_case for all variable names
- **SHALL** use snake_case for all function names
- **SHALL** use PascalCase for type definitions
- **SHALL** use UPPER_SNAKE_CASE for constants

### Code Quality

- **MUST** use strictest TypeScript mode
- **SHALL** provide clear return types for helper functions
- **MUST NOT** leave commented-out code or TODOs
- **SHALL** keep test files focused and readable
- **MUST** clean up test data after each test

### Test Isolation

- **SHALL** ensure tests can run independently in any order
- **MUST** reset state between tests using `beforeEach` hooks
- **SHALL** use Playwright's isolated browser contexts
- **MUST NOT** rely on state from previous tests

## Testing Standards

### What to Test

Focus on user-facing behavior:

- ✅ Can user navigate to pages?
- ✅ Can user interact with controls?
- ✅ Does user see expected content?
- ✅ Can user complete tasks with keyboard only?
- ✅ Do preferences persist across sessions?
- ✅ Does app work offline (PWA)?
- ✅ Does app respect accessibility preferences?

### What NOT to Test

Avoid testing implementation details:

- ❌ Internal state management
- ❌ Component props or methods
- ❌ CSS class names or styles
- ❌ Framework-specific internals
- ❌ Third-party library behavior

### Test Structure

```typescript
test.describe('User [does something]', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Navigate to starting point
    await page.goto('/path')
  })

  test('user can [specific action]', async ({ page }) => {
    // Act: User performs action
    const button = page.getByRole('button', { name: 'Start' })
    await button.click()

    // Assert: User sees result
    await expect(page.getByText('In Progress')).toBeVisible()
  })
})
```

### Helper Functions

- **SHALL** create reusable helpers for common user actions
- **SHALL** name helpers from user perspective: `user_clicks_button()`, `user_sees_text()`
- **MUST** use snake_case for helper function names
- **SHALL** keep helpers simple and focused
- **MUST NOT** create overly abstract helper utilities

Example:

```typescript
// ✅ Good: Clear, user-centric helper with snake_case
async function user_toggles_dark_mode(page: Page) {
  const toggle_button = page.getByRole('button', { name: /dark mode/i })
  await toggle_button.click()
}

// ❌ Bad: Technical, camelCase (violates naming convention)
async function clickDarkModeButton(page: Page) {
  await page.locator('.dark-mode-btn').click()
}
```

## Browser Coverage

### Required Testing

- **SHALL** test on Chromium (Chrome/Edge)
- **SHALL** test on Firefox
- **SHALL** test on WebKit (Safari)
- **SHALL** test on mobile Chrome (Android)
- **SHALL** test on mobile Safari (iOS)

### Viewport Testing

- **SHALL** test desktop viewport (1920x1080)
- **SHALL** test mobile viewport (375x667 minimum)
- **SHALL** verify touch targets ≥ 44x44px on mobile
- **SHALL** ensure responsive layout works correctly

## Accessibility Requirements

Every test suite **MUST** include:

1. **Keyboard Navigation Test**
   - Can user tab through interactive elements?
   - Are focus indicators visible?
   - Can user activate controls with Enter/Space?

2. **Screen Reader Test**
   - Do interactive elements have accessible names?
   - Are headings properly structured (h1 → h2 → h3)?
   - Are form inputs properly labeled?

3. **Reduced Motion Test**
   - Does app respect `prefers-reduced-motion`?
   - Are animations disabled or simplified?

4. **Color Contrast** (manual verification)
   - Does dark mode meet WCAG AA standards?
   - Are focus indicators clearly visible?

## PWA Testing

- **SHALL** test offline functionality
- **SHALL** verify service worker registration
- **SHALL** test manifest.json presence
- **SHALL** verify installability
- **SHALL** test theme color meta tags

## Performance Considerations

- **SHALL** use `page.waitForLoadState('networkidle')` sparingly
- **SHALL** prefer specific element waits over arbitrary timeouts
- **MUST NOT** use `page.waitForTimeout()` except for service worker registration
- **SHALL** run tests in parallel when possible
- **SHALL** use Playwright's auto-waiting capabilities

## Continuous Integration

### Build Artifact Sharing

- **SHALL** build app once in dedicated job
- **SHALL** upload build artifacts for e2e tests
- **SHALL** run e2e tests in separate job with `needs: [build]`
- **MUST NOT** rebuild app in e2e test job

### CI Configuration

```yaml
jobs:
  build:
    - Build production app
    - Upload dist/ as artifact

  e2e:
    needs: [build]
    - Download build artifact
    - Install e2e dependencies
    - Run Playwright tests
    - Upload test report on failure
```

### Failure Handling

- **SHALL** capture screenshots on failure
- **SHALL** record traces on first retry
- **SHALL** generate HTML report
- **SHALL** upload report as artifact
- **SHALL** retry failed tests up to 2 times in CI

## Test Maintenance

### When to Update Tests

- **SHALL** update tests when user-facing behavior changes
- **MUST NOT** update tests for internal refactoring
- **SHALL** add tests for new user-facing features
- **SHALL** remove tests for deprecated features

### Test Readability

- **SHALL** use clear, descriptive variable names (snake_case)
- **SHALL** write self-documenting test code
- **MUST NOT** add unnecessary comments
- **SHALL** keep tests under 30 lines when possible
- **SHALL** extract complex logic to helper functions

## Examples

### ✅ Good Test (Following Constitution)

```typescript
test('user can start breathing meditation and see instructions', async ({ page }) => {
  await page.goto('/breathing')

  // User sees the breathing page
  const heading = page.getByRole('heading', { name: /breathing/i })
  await expect(heading).toBeVisible()

  // User starts meditation
  const start_button = page.getByRole('button', { name: /start/i })
  await start_button.click()

  // User sees breathing instructions
  const instruction = page.getByText(/breathe in/i)
  await expect(instruction).toBeVisible()
})
```

### ❌ Bad Test (Violates Constitution)

```typescript
// ❌ Technical perspective, camelCase, fragile selectors
test('breathing component renders', async ({ page }) => {
  await page.goto('/breathing')

  const breathingDiv = page.locator('.breathing-container')
  await breathingDiv.click()

  // TODO: add more assertions
  const button = page.locator('#start-btn')
  await button.click()
})
```

## Quick Reference

### User Actions Pattern

```typescript
// Navigation
await page.getByRole('link', { name: 'Home' }).click()

// Button interaction
await page.getByRole('button', { name: 'Start' }).click()

// Form input
await page.getByLabel('Email').fill('user@example.com')

// Verification
await expect(page.getByText('Welcome')).toBeVisible()

// Keyboard navigation
await page.keyboard.press('Tab')
await page.keyboard.press('Enter')
```

### Naming Examples

```typescript
// ✅ Variables: snake_case
const dark_mode_toggle = page.getByRole('button', { name: /dark mode/i })
const is_offline = await context.isOffline()
const start_button = page.getByRole('button', { name: /start/i })

// ✅ Functions: snake_case
async function user_clicks_start_button(page: Page) { }
async function verify_page_is_accessible(page: Page) { }
async function toggle_dark_mode(page: Page) { }

// ✅ Types: PascalCase
interface UserPreferences { }
type NavigationState = 'home' | 'breathing' | 'settings'

// ✅ Constants: UPPER_SNAKE_CASE
const DEFAULT_TIMEOUT = 5000
const MOBILE_VIEWPORT = { width: 375, height: 667 }
```

## Enforcement

All e2e tests **SHALL** be reviewed for:

1. ✅ Adherence to root CLAUDE.md principles
2. ✅ User-centric perspective and language
3. ✅ Accessible selectors usage
4. ✅ snake_case naming convention
5. ✅ Accessibility test coverage
6. ✅ Clear, readable test descriptions
7. ✅ No implementation detail testing

**Violations of this constitution are unacceptable and must be corrected before merge.**

---

**Last Updated**: 2026-01-10
**Version**: 1.0
**Extends**: [../CLAUDE.md](../CLAUDE.md)

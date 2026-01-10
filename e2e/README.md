# Cha-Kra E2E Tests

User-centric end-to-end testing for the Cha-Kra meditation PWA.

## Philosophy

Inspired by [UUV (User-centric Usecases Validator)](https://e2e-test-quest.github.io/uuv/docs/intro/), these tests focus on:

1. **User Perspective**: Tests describe what users do, not technical implementation
2. **Accessibility First**: Use accessible selectors (roles, labels) like screen readers do
3. **Readable**: Anyone should understand what's being tested
4. **No Gherkin**: Simple, direct TypeScript tests without BDD abstraction layer

## Core Principles

### Test from the User's Point of View

```typescript
// ❌ Technical perspective
await page.locator("#submit-btn").click();

// ✅ User perspective
await page.getByRole("button", { name: "Submit" }).click();
```

### Use Accessible Selectors

```typescript
// ❌ Fragile CSS selectors
await page.locator(".nav-link-3").click();

// ✅ Accessible selectors (how users find elements)
await page.getByRole("link", { name: "Breathing" }).click();
```

### Write Descriptive Test Names

```typescript
// ❌ Technical
test('clicking button changes state', ...)

// ✅ User-centric
test('user can toggle dark mode', ...)
```

## Getting Started

### Installation

```bash
cd e2e
npm install
```

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run with UI (interactive mode)
npm run test:ui

# Run with browser visible
npm run test:headed

# Debug tests step by step
npm run test:debug

# View last test report
npm run report
```

### From Root Directory

```bash
# Run e2e tests from project root
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

## Test Structure

```
e2e/
├── helpers/
│   └── user-actions.ts    # User-centric helper functions
├── tests/
│   ├── home.spec.ts       # Home page user flows
│   ├── breathing.spec.ts  # Breathing exercise tests
│   ├── settings.spec.ts   # Settings page tests
│   └── pwa.spec.ts        # PWA capabilities tests
├── playwright.config.ts   # Test configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## Writing Tests

### Use Helper Functions

The `helpers/user-actions.ts` file provides user-centric utilities:

```typescript
import {
  findButton,
  userClicksButton,
  userSeesText,
} from "../helpers/user-actions";

test("user starts meditation", async ({ page }) => {
  await page.goto("/breathing");

  // User sees the page
  await userSeesText(page, "Breathing Exercise");

  // User clicks start button
  await userClicksButton(page, "Start");

  // User sees meditation in progress
  await userSeesText(page, "Breathe in");
});
```

### Playwright's Built-in Accessibility Selectors

Playwright provides excellent built-in methods:

```typescript
// Find by role (best for interactive elements)
page.getByRole("button", { name: "Start" });
page.getByRole("link", { name: "Home" });
page.getByRole("heading", { level: 1 });

// Find by label (best for form inputs)
page.getByLabel("Email address");

// Find by text (best for content)
page.getByText("Welcome to Cha-Kra");

// Find by placeholder
page.getByPlaceholder("Enter your name");
```

### Test Organization

Group tests by user scenarios:

```typescript
test.describe("User manages meditation settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/settings");
  });

  test("user can enable dark mode", async ({ page }) => {
    // Test implementation
  });

  test("user preferences persist after reload", async ({ page }) => {
    // Test implementation
  });
});
```

## Best Practices

### 1. Think Like a User

Ask: "What would a real person do?"

```typescript
// User's mental model: "I want to start meditating"
test("user starts breathing meditation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Breathing" }).click();
  await page.getByRole("button", { name: "Start" }).click();
});
```

### 2. Test Accessibility

```typescript
test("user can navigate with keyboard only", async ({ page }) => {
  await page.goto("/");

  // Tab through interactive elements
  await page.keyboard.press("Tab");

  const focusedElement = page.locator(":focus");
  await expect(focusedElement).toBeVisible();
});
```

### 3. Test for All Users

```typescript
test("respects reduced motion preference", async ({ page, context }) => {
  // Emulate user who prefers reduced motion
  await context.addInitScript(() => {
    Object.defineProperty(window, "matchMedia", {
      value: (query: string) => ({
        matches: query.includes("prefers-reduced-motion: reduce"),
        // ... implementation
      }),
    });
  });

  await page.goto("/breathing");
  // Animations should be reduced or removed
});
```

### 4. Test PWA Features

```typescript
test("app works offline", async ({ page, context }) => {
  // Visit online first
  await page.goto("/");

  // Go offline
  await context.setOffline(true);

  // Should still work
  await page.reload();
  await expect(page.getByRole("heading")).toBeVisible();
});
```

## Browser Coverage

Tests run on:

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)

## Continuous Integration

Tests run automatically in CI with:

- 2 retries on failure
- Screenshots on failure
- Trace recording on first retry
- HTML report generation

## Adding New Tests

1. Create a new file in `tests/` (e.g., `mantra.spec.ts`)
2. Describe user scenarios with `test.describe()`
3. Use accessible selectors (`getByRole`, `getByLabel`, etc.)
4. Write test names from user perspective
5. Run tests to verify

Example:

```typescript
import { test, expect } from "@playwright/test";

test.describe("User practices mantra meditation", () => {
  test("user can play mantra audio", async ({ page }) => {
    await page.goto("/mantra");

    const playButton = page.getByRole("button", { name: /play/i });
    await playButton.click();

    // Audio should start playing
    const pauseButton = page.getByRole("button", { name: /pause/i });
    await expect(pauseButton).toBeVisible();
  });
});
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Testing Library Principles](https://testing-library.com/docs/queries/about)
- [UUV Framework](https://e2e-test-quest.github.io/uuv/docs/intro/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Philosophy Summary

> "Tests should read like user stories, use accessible selectors, and work for everyone."

Instead of testing implementation details, we test user experiences:

- Can users find what they need?
- Can users complete their tasks?
- Does it work for all users (keyboard, screen readers, reduced motion)?
- Does it work offline as a PWA?

This approach ensures our tests are both meaningful and maintainable.

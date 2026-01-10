import { defineConfig, devices } from '@playwright/test'

/**
 * User-centric E2E testing configuration
 * Inspired by UUV's accessibility-first approach
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: process.env.CI
    ? {
        command: 'cd .. && npx vite preview --port 5173',
        url: 'http://localhost:5173',
        reuseExistingServer: false,
      }
    : {
        command: 'cd .. && npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
      },
})

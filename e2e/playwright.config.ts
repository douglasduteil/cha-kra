import { defineConfig, devices } from '@playwright/test'

/**
 * User-centric E2E testing configuration
 * Inspired by UUV's accessibility-first approach
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 10000,

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
        command: 'npx serve ../dist -l 5173',
        url: 'http://localhost:5173',
        reuseExistingServer: false,
      }
    : {
        command: 'cd .. && npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
      },
})

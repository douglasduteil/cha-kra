import { defineConfig, devices } from "@playwright/test";

const is_ci = !!process.env["CI"];
const port = is_ci ? 3000 : 5173;

/**
 * User-centric E2E testing configuration
 * Inspired by UUV's accessibility-first approach
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: is_ci,
  retries: 0,
  ...(is_ci && { workers: 1 }),
  reporter: [["html", { open: "never" }]],
  timeout: 10000,

  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 2000,
    navigationTimeout: 5000,
  },

  expect: { timeout: 2000 },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  webServer: {
    // CI: serve pre-built dist/ folder, Dev: run vite dev server
    command: is_ci ? "npx serve ../dist -l 3000 -s" : "cd .. && npm run dev",
    url: `http://localhost:${port}`,
    reuseExistingServer: !is_ci,
  },
});

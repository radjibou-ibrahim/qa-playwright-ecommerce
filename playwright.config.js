// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  // Exécution parallèle des tests
  fullyParallel: true,

  // Empêche test.only() sur CI
  forbidOnly: !!process.env.CI,

  // Retry uniquement sur CI
  retries: process.env.CI ? 2 : 0,

  // Un seul worker sur CI, exécution parallèle en local
  workers: process.env.CI ? 1 : undefined,

  // Rapport HTML Playwright
  reporter: [
    [
      "html",
      {
        open: "never",
      },
    ],
  ],

  // Configuration commune à tous les tests
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Navigateurs utilisés pour les tests
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});

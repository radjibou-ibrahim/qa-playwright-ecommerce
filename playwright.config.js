// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Configuration Playwright
 */
export default defineConfig({
  testDir: "./tests",

  /* Exécution parallèle */
  fullyParallel: true,

  /* Échec du build CI si test.only est présent */
  forbidOnly: !!process.env.CI,

  /* Retry uniquement sur CI */
  retries: process.env.CI ? 2 : 0,

  /* Un seul worker sur CI */
  workers: process.env.CI ? 1 : undefined,

  /* Rapport HTML */
  reporter: "html",

  /* Configuration commune */
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Projets */
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.spec\.js/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
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

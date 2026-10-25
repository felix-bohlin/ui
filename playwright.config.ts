import { defineConfig, devices } from "@playwright/test"

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE

const chromium = {
  ...devices["Desktop Chrome"],
  launchOptions: executablePath ? { executablePath } : {},
}

const crossBrowser =
  /(anatomy|contrast|css-js|engines|interaction|stress|stress-data-display|stress-overlays|stress-overlays-a11y|theming)\.spec\.ts/

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixels: 100,
      scale: "css",
      threshold: 0.05,
    },
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: "light",
      use: { ...chromium, colorScheme: "light" },
    },
    {
      name: "dark",
      testMatch: /(a11y|themes|visual)\.spec\.ts/,
      use: { ...chromium, colorScheme: "dark" },
    },
    {
      name: "firefox",
      testMatch: crossBrowser,
      use: {
        ...devices["Desktop Firefox"],
        actionTimeout: 10_000,
        colorScheme: "light",
      },
    },
    {
      name: "webkit",
      testMatch: crossBrowser,
      use: {
        ...devices["Desktop Safari"],
        actionTimeout: 10_000,
        colorScheme: "light",
      },
    },
  ],
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  retries: 0,
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  testDir: "tests/e2e",
  use: {
    baseURL: "http://localhost:4322",
    trace: "retain-on-failure",
  },
  webServer: {
    command: process.env.E2E_PREBUILT
      ? "pnpm test:e2e:preview"
      : "pnpm test:e2e:serve",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    url: "http://localhost:4322/html/test/button/",
  },
  workers: process.env.CI ? "100%" : undefined,
})

import { defineConfig, devices } from "@playwright/test"
import { APPS, appDir } from "./apps.ts"

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: APPS.map((app) => ({
    name: app.name,
    use: {
      ...devices["Desktop Chrome"],
      baseURL: `http://localhost:${app.port}`,
      launchOptions: executablePath ? { executablePath } : {},
    },
  })),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  retries: 0,
  testMatch: "apps.spec.ts",
  use: { trace: "retain-on-failure" },
  webServer: APPS.map((app) => ({
    command: app.start,
    cwd: appDir(app),
    env: { PORT: String(app.port) },
    reuseExistingServer: false,
    timeout: 60_000,
    url: `http://localhost:${app.port}/button`,
  })),
  workers: process.env.CI ? "100%" : undefined,
})

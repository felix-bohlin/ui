import { defineConfig, devices } from "@playwright/test"
import { APPS, appDir, portOf } from "./apps.ts"

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: APPS.map((app) => ({
    name: app.name,
    use: {
      ...devices["Desktop Chrome"],
      baseURL: `http://localhost:${portOf(app)}`,
      launchOptions: executablePath ? { executablePath } : {},
    },
  })),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  retries: 0,
  testDir: "spec",
  use: { trace: "retain-on-failure" },
  webServer: APPS.map((app) => ({
    command: app.start,
    cwd: appDir(app),
    env: { HOST: "localhost", PORT: String(portOf(app)) },
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    url: `http://localhost:${portOf(app)}/settings`,
  })),
  workers: process.env.CI ? "100%" : undefined,
})

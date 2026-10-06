import { existsSync, readdirSync } from "node:fs"
import type { Page } from "@playwright/test"

const examplesDir = new URL("../../src/component-examples/", import.meta.url)

const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
)

export const FRAMEWORKS = ["astro", "html", "vue"] as const

export type Framework = (typeof FRAMEWORKS)[number]

export const COMPONENTS = readdirSync(examplesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

export const STRESS_TESTS = readdirSync(
  new URL("../../src/stress-tests/", import.meta.url),
)
  .filter((file) => file.endsWith(".html"))
  .map((file) => `stress/${file.replace(/\.html$/, "")}`)
  .toSorted()

export const FIXTURES = [...COMPONENTS, ...STRESS_TESTS, "theming"].toSorted()

export const hasExample = (
  framework: Framework,
  component: string,
  name: string,
) => existsSync(new URL(`${component}/${name}.${framework}`, examplesDir))

export const openFixture = async (
  page: Page,
  framework: Framework,
  component: string,
) => {
  await page.route(
    (url) => url.hostname !== "localhost",
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ body: PIXEL, contentType: "image/png" })
        : route.abort(),
  )
  await page.goto(
    component.startsWith("stress/")
      ? `/tests/${component.slice("stress/".length)}/`
      : `/${framework}/test/${component}/`,
  )
  if (framework === "vue") {
    await page.waitForFunction(() =>
      [...document.querySelectorAll("[data-vue-example]")].every(
        (el) => "__vue_app__" in el,
      ),
    )
  }
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((image) => {
        image.loading = "eager"
        return image.complete
          ? undefined
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true })
              image.addEventListener("error", () => resolve(), { once: true })
            })
      }),
    ),
  )
  await page.waitForLoadState("networkidle")
  await page.screenshot({ fullPage: true })
}

import { existsSync, readdirSync } from "node:fs"
import type { Page } from "@playwright/test"

const examplesDir = new URL("../../src/component-examples/", import.meta.url)

export const FRAMEWORKS = ["astro", "html", "vue"] as const

export type Framework = (typeof FRAMEWORKS)[number]

export const COMPONENTS = readdirSync(examplesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

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
    (route) => route.abort(),
  )
  await page.goto(`/${framework}/test/${component}/`)
  if (framework === "vue") {
    await page.waitForFunction(() =>
      [...document.querySelectorAll("[data-vue-example]")].every(
        (el) => "__vue_app__" in el,
      ),
    )
  }
  await page.evaluate(() => document.fonts.ready)
  await page.waitForLoadState("networkidle")
}

import { expect, type Page, test } from "@playwright/test"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import {
  examplesMounted,
  instantScrolling,
  stubExternalHosts,
} from "./fixtures"

const THEME_KEY = "opui-theme"

const FRAMEWORKS = FRAMEWORK_IDS.filter((id) => id !== "astro")

test.beforeEach(async ({ page }) => {
  await instantScrolling(page)
  await stubExternalHosts(page)
})

const icons = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll("svg[data-icon]")].map(
      (svg) => svg.outerHTML,
    ),
  )

const viewBoxes = (page: Page) =>
  page.evaluate(() => [
    ...new Set(
      [...document.querySelectorAll("svg[data-icon]")].map((svg) =>
        svg.getAttribute("viewBox"),
      ),
    ),
  ])

const setPreset = (page: Page, preset: string | null) =>
  page.evaluate(
    ([key, preset]) => {
      if (preset === null) localStorage.removeItem(key!)
      else {
        localStorage.setItem(
          key!,
          JSON.stringify({ css: "", preset, tokens: {} }),
        )
      }
      window.dispatchEvent(new StorageEvent("storage", { key }))
    },
    [THEME_KEY, preset] as const,
  )

for (const framework of FRAMEWORKS) {
  test(`the ${framework} examples draw their icons from the theme's icon set`, async ({
    page,
  }) => {
    await page.goto(`/${framework}/components/button/`)
    await examplesMounted(page, framework)
    await expect(
      page.locator("svg[data-icon]").first(),
      "the examples show icons",
    ).toBeVisible()
    const fluent = await icons(page)
    expect(fluent.length).toBeGreaterThan(0)

    for (const preset of ["brutalist", "shadcn"]) {
      await setPreset(page, preset)
      await expect
        .poll(() => page.locator("svg[data-icon]:not(.lucide)").count(), {
          message: `${preset} shows Lucide icons`,
        })
        .toBe(0)
    }

    await setPreset(page, "m3")
    await expect
      .poll(() => viewBoxes(page), {
        message: "m3 shows Material Symbols icons",
      })
      .toEqual(["0 -960 960 960"])

    await setPreset(page, "govuk")
    await expect
      .poll(() => icons(page), {
        message: "a theme without an icon set shows the icons as written",
      })
      .toEqual(fluent)
  })

  test(`the ${framework} examples load with the icons of a stored theme`, async ({
    page,
  }) => {
    await page.addInitScript((key) => {
      localStorage.setItem(
        key,
        JSON.stringify({ css: "", preset: "shadcn", tokens: {} }),
      )
    }, THEME_KEY)
    await page.goto(`/${framework}/components/button/`)
    await expect(page.locator("svg[data-icon].lucide").first()).toBeVisible()
    await expect
      .poll(() => page.locator("svg[data-icon]:not(.lucide)").count())
      .toBe(0)
  })
}

test("a block preview draws its icons from the stored theme's icon set", async ({
  page,
}) => {
  await page.goto("/blocks/inbox/preview/")
  const fluent = await icons(page)
  expect(fluent.length).toBeGreaterThan(0)

  await setPreset(page, "shadcn")
  await expect
    .poll(() => page.locator("svg[data-icon]:not(.lucide)").count(), {
      message: "shadcn shows Lucide icons",
    })
    .toBe(0)

  await setPreset(page, null)
  await expect
    .poll(() => icons(page), {
      message: "the default theme shows the icons as written",
    })
    .toEqual(fluent)
})

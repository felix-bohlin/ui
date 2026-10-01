import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { openFixture } from "./fixtures"

const example = (page: Page, name: string) =>
  page.locator(`[data-example="${name}"]`)

const style = (locator: Locator, property: string) =>
  locator.evaluate(
    (element, name) => getComputedStyle(element).getPropertyValue(name),
    property,
  )

const lightDark = (value: string) => {
  const [, light, dark] = value.match(/^light-dark\((.*?),\s*(.*)\)$/) ?? []
  return { dark, light }
}

test.beforeEach(async ({ page }) => {
  await openFixture(page, "html", "theming")
})

test("a .ui-dark subtree renders dark", async ({ page }) => {
  const scope = example(page, "DarkSubtree").locator(".scope")
  const card = scope.locator(".ui-card")
  const reference = example(page, "Default").locator(".ui-card")

  expect(await style(scope, "color-scheme")).toBe("dark")
  expect(await style(scope, "background-color")).toBe(
    lightDark(await style(scope, "--surface-default")).dark,
  )
  expect(await style(card, "background-color")).not.toBe(
    await style(reference, "background-color"),
  )
})

test("a .ui-light subtree renders light", async ({ page }) => {
  const scope = example(page, "LightSubtree").locator(".scope")

  expect(await style(scope, "color-scheme")).toBe("light")
  expect(await style(scope, "background-color")).toBe(
    lightDark(await style(scope, "--surface-default")).light,
  )
})

test("a .ui-palette subtree re-derives its colors", async ({ page }) => {
  const scope = example(page, "Palette").locator(".scope")
  const button = scope.locator(".ui-button.ui-primary")
  const reference = example(page, "Default").locator(".ui-button.ui-primary")

  expect(await style(button, "background-color")).toMatch(/ 120\)$/)
  expect(await style(button, "background-color")).not.toBe(
    await style(reference, "background-color"),
  )
  expect(await style(scope, "--primary")).toMatch(/ 120\)$/)
})

test(".ui-motion-off removes transitions", async ({ page }) => {
  const button = example(page, "MotionOff").locator(".ui-button")
  const reference = example(page, "Default").locator(".ui-button").first()

  expect(await style(reference, "transition-duration")).not.toMatch(/^0s/)
  for (const duration of (await style(button, "transition-duration")).split(
    ", ",
  )) {
    expect(duration).toBe("0s")
  }
})

test("prefers-reduced-motion sets --motion to 0", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  expect(await style(page.locator("html"), "--motion")).toBe("0")
  await page.emulateMedia({ reducedMotion: "no-preference" })
  expect(await style(page.locator("html"), "--motion")).toBe("1")
})

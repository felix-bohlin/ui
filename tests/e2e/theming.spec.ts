import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import { computed, openFixture, resolveColor } from "./fixtures"

const example = (page: Page, name: string) =>
  page.locator(`[data-example="${name}"]`)

test.beforeEach(async ({ page }) => {
  await openFixture(page, "html", "stress/theming")
})

test("a .ui-dark subtree renders dark", async ({ page }) => {
  const scope = example(page, "DarkSubtree").locator(".scope")
  const card = scope.locator(".ui-card")
  const reference = example(page, "Default").locator(".ui-card")

  expect(await computed(scope, "color-scheme")).toBe("dark")
  expect(await computed(scope, "background-color")).toBe(
    await resolveColor(scope, "var(--ui-surface)", "dark"),
  )
  expect(await computed(scope, "background-color")).not.toBe(
    await resolveColor(scope, "var(--ui-surface)", "light"),
  )
  expect(await computed(card, "background-color")).not.toBe(
    await computed(reference, "background-color"),
  )
})

test("a .ui-light subtree renders light", async ({ page }) => {
  const scope = example(page, "LightSubtree").locator(".scope")

  expect(await computed(scope, "color-scheme")).toBe("light")
  expect(await computed(scope, "background-color")).toBe(
    await resolveColor(scope, "var(--ui-surface)", "light"),
  )
  expect(await computed(scope, "background-color")).not.toBe(
    await resolveColor(scope, "var(--ui-surface)", "dark"),
  )
})

test("a .ui-palette subtree re-derives its colors", async ({ page }) => {
  const scope = example(page, "Palette").locator(".scope")
  const button = scope.locator(".ui-button.ui-primary")
  const reference = example(page, "Default").locator(".ui-button.ui-primary")

  expect(await computed(button, "background-color")).toMatch(/ 120\)$/)
  expect(await computed(button, "background-color")).not.toBe(
    await computed(reference, "background-color"),
  )
  expect(await resolveColor(scope, "var(--ui-primary)")).toMatch(/ 120\)$/)
})

test(".ui-motion-off removes transitions", async ({ page }) => {
  const button = example(page, "MotionOff").locator(".ui-button")
  const reference = example(page, "Default").locator(".ui-button").first()

  expect(await computed(reference, "transition-duration")).not.toMatch(/^0s/)
  for (const duration of (await computed(button, "transition-duration")).split(
    ", ",
  )) {
    expect(duration).toBe("0s")
  }
})

test("prefers-reduced-motion sets --ui-motion to 0", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  expect(await computed(page.locator("html"), "--ui-motion")).toBe("0")
  await page.emulateMedia({ reducedMotion: "no-preference" })
  expect(await computed(page.locator("html"), "--ui-motion")).toBe("1")
})

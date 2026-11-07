import { readdirSync } from "node:fs"
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

const THEMES = [
  "default",
  ...readdirSync(new URL("../../packages/opui/themes/", import.meta.url))
    .filter((file) => file.endsWith(".css"))
    .map((file) => file.replace(/\.css$/, ""))
    .toSorted(),
]

for (const theme of THEMES) {
  test(`a severity class keeps its palette on a .ui-palette or .ui-contrast-more element (${theme})`, async ({
    page,
  }) => {
    if (theme !== "default") {
      await openFixture(page, "html", "stress/theming", `?theme=${theme}`)
    }
    const severities = ["critical", "info", "neutral", "success", "warning"]
    const scopes = ["ui-contrast-more", "ui-palette"]
    await page.evaluate(
      ([severities, scopes]) => {
        for (const scope of scopes) {
          for (const severity of severities) {
            const parent = document.createElement("div")
            parent.className = scope
            parent.innerHTML = `<span class="ui-chip ui-${severity}" data-severity="child"></span><span class="${scope} ui-chip ui-${severity}" data-severity="same"></span>`
            parent.dataset.severityScope = `${scope} ${severity}`
            document.body.append(parent)
          }
        }
      },
      [severities, scopes],
    )
    for (const scope of scopes) {
      for (const severity of severities) {
        const parent = page.locator(
          `[data-severity-scope="${scope} ${severity}"]`,
        )
        for (const token of [
          "--ui-color-9",
          "--ui-palette-accent",
          "--ui-palette-tint-subtle",
        ]) {
          const color = `var(${token}, transparent)`
          const child = await resolveColor(
            parent.locator('[data-severity="child"]'),
            color,
          )
          expect(child).not.toBe("rgba(0, 0, 0, 0)")
          expect(
            await resolveColor(parent.locator('[data-severity="same"]'), color),
            `${token} on .${scope}.ui-${severity}`,
          ).toBe(child)
        }
      }
    }
  })
}

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

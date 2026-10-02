import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-button-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > .ui-toggle-button",
  ":scope > .ui-toggle-group",
].join(", ")

test("form controls of one size share one height", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  const rows = await page.locator("[data-size]").evaluateAll(
    (elements, selector) =>
      elements.map((row) => {
        const size = row.getAttribute("data-size")!
        const token =
          size === "default" ? "--control-size" : `--control-size-${size}`
        const expected = getComputedStyle(row).getPropertyValue(token).trim()
        const controls = [...row.querySelectorAll<HTMLElement>(selector)]
        return {
          controls: controls.map((control) => ({
            control: `${control.parentElement!.className} > ${control.className}`,
            height: `${control.getBoundingClientRect().height}px`,
          })),
          expected,
          row: `${row.closest("[data-example]")!.getAttribute("data-example")} ${size}`,
        }
      }),
    CONTROLS,
  )

  expect(rows.length).toBeGreaterThan(0)
  for (const { controls, expected, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter(({ height }) => height !== expected),
      `${row} should be ${expected}`,
    ).toEqual([])
  }
})

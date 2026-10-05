import { expect, type Page, test } from "@playwright/test"
import { openFixture } from "./fixtures"

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-button-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > :is(.ui-select, .ui-text-field):not(:has(> .ui-label))",
  ":scope > .ui-toggle-button",
  ":scope > .ui-toggle-group",
].join(", ")

const measureRows = (page: Page) =>
  page.locator("[data-size]").evaluateAll(
    (elements, selector) =>
      elements.map((row) => {
        const size = row.getAttribute("data-size")!
        const token =
          size === "default" ? "--control-size" : `--control-size-${size}`
        const probe = document.createElement("div")
        probe.style.blockSize = `var(${token})`
        probe.style.position = "absolute"
        row.append(probe)
        const expected = `${probe.getBoundingClientRect().height}px`
        probe.remove()
        const controls = [...row.querySelectorAll<HTMLElement>(selector)]
        return {
          controls: controls.map((control) => ({
            control: `${control.parentElement!.className} > ${control.className}`,
            height: `${control.getBoundingClientRect().height}px`,
          })),
          expected,
          row: `${row.closest("[data-example]")!.getAttribute("data-example")} ${size}`,
          size,
        }
      }),
    CONTROLS,
  )

const expectSharedHeights = (rows: Awaited<ReturnType<typeof measureRows>>) => {
  expect(rows.length).toBeGreaterThan(0)
  for (const { controls, expected, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter(({ height }) => height !== expected),
      `${row} should be ${expected}`,
    ).toEqual([])
  }
}

test("form controls of one size share one height", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  expectSharedHeights(await measureRows(page))
})

test("form controls keep their height in high contrast mode", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/contrast")

  expectSharedHeights(await measureRows(page))
})

const DENSITIES = {
  "0.875": {
    default: "35px",
    large: "40.25px",
    small: "28px",
    "x-small": "24.5px",
  },
  "1.125": {
    default: "45px",
    large: "51.75px",
    small: "36px",
    "x-small": "31.5px",
  },
}

for (const [density, heights] of Object.entries(DENSITIES)) {
  test(`form controls scale with --density: ${density}`, async ({ page }) => {
    await openFixture(page, "html", "stress/forms")
    await page.evaluate(
      (value) => document.documentElement.style.setProperty("--density", value),
      density,
    )

    const rows = await measureRows(page)
    for (const { expected, row, size } of rows) {
      expect(expected, row).toBe(heights[size as keyof typeof heights])
    }
    expectSharedHeights(rows)
  })
}

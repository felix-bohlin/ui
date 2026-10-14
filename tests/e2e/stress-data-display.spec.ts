import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"

const CONTROLS = ".ui-button, .ui-checkbox, .ui-field, .ui-switch"

test("inline editing controls fit their table row", async ({ page }) => {
  await openFixture(page, "html", "stress/data-display")

  const rows = await page
    .locator('[data-example="TableInlineEditing"] tbody tr')
    .evaluateAll(
      (elements, selector) =>
        elements.map((row) => {
          const table = row.closest("table")!
          const density =
            ["ui-dense", "ui-spacious"].find((name) =>
              table.classList.contains(name),
            ) ?? "default"
          const cells = [...row.querySelectorAll<HTMLElement>(":scope > td")]
          const content = cells.map((cell) => {
            const style = getComputedStyle(cell)
            const rect = cell.getBoundingClientRect()
            return {
              bottom:
                rect.bottom -
                parseFloat(style.paddingBlockEnd) -
                parseFloat(style.borderBlockEndWidth),
              chrome:
                parseFloat(style.paddingBlockStart) +
                parseFloat(style.paddingBlockEnd) +
                parseFloat(style.borderBlockStartWidth) +
                parseFloat(style.borderBlockEndWidth),
              lineHeight: parseFloat(style.lineHeight),
              top:
                rect.top +
                parseFloat(style.paddingBlockStart) +
                parseFloat(style.borderBlockStartWidth),
            }
          })
          const controls = [...row.querySelectorAll<HTMLElement>(selector)].map(
            (control) => {
              const rect = control.getBoundingClientRect()
              const box = content[cells.indexOf(control.closest("td")!)]
              return {
                control: control.className,
                fits:
                  rect.top >= box.top - 0.5 && rect.bottom <= box.bottom + 0.5,
                height: rect.height,
              }
            },
          )
          const tallest = Math.max(
            ...controls.map(({ height }) => height),
            ...content.map(({ lineHeight }) => lineHeight),
          )
          return {
            controls,
            expected:
              tallest + Math.max(...content.map(({ chrome }) => chrome)),
            height: row.getBoundingClientRect().height,
            row: `${density} ${cells[0].textContent!.trim()}`,
          }
        }),
      CONTROLS,
    )

  expect(rows.length).toBe(9)
  for (const { controls, expected, height, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter(({ fits }) => !fits),
      `${row} controls should fit the cell`,
    ).toEqual([])
    expect(
      height,
      `${row} should be as tall as its tallest control`,
    ).toBeCloseTo(expected, 0)
  }
})

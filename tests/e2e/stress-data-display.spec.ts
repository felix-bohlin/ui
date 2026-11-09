import { expect, test } from "@playwright/test"
import { THEMES, contrast, layerContrast, openFixture } from "./fixtures"

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

test.describe("the current page in a button group", () => {
  for (const theme of THEMES) {
    for (const colorScheme of ["light", "dark"] as const) {
      test(`stands out and stays readable in the ${theme} theme in ${colorScheme} mode`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme })
        await openFixture(
          page,
          "html",
          "stress/data-display",
          theme === "default" ? undefined : `?theme=${theme}`,
        )
        const navs = page.locator('[data-example="ButtonGroupCurrent"] nav')
        for (const nav of await navs.all()) {
          const name = await nav.getAttribute("aria-label")
          const current = nav.locator('[aria-current="page"]')
          const sibling = nav.locator(".ui-button:not([aria-current])").first()
          const [look, siblingLook] = await Promise.all(
            [current, sibling].map((button) =>
              button.evaluate((element) => {
                const style = getComputedStyle(element)
                return {
                  background: style.backgroundColor,
                  color: style.color,
                }
              }),
            ),
          )
          expect
            .soft(
              await layerContrast(
                current,
                [look.background],
                [siblingLook.background],
              ),
              `${name}: the current page stands out from the other pages`,
            )
            .toBeGreaterThanOrEqual(1.1)
          expect
            .soft(
              await contrast(current, look.color, look.background),
              `${name}: the text of the current page`,
            )
            .toBeGreaterThanOrEqual(4.5)
        }
      })
    }
  }
})

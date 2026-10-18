import { expect, type Page } from "@playwright/test"

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-button-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > :is(.ui-select, .ui-text-field):not(:has(> .ui-label))",
  ":scope > .ui-toggle-button",
  ":scope > .ui-toggle-group",
].join(", ")

export const measure = (page: Page) =>
  page.locator("[data-size]").evaluateAll((elements, selector) => {
    const SIZES = ["x-small", "small", "default", "large"]
    const probe = (row: Element, token: string, size: string) => {
      const element = document.createElement("div")
      element.style.blockSize = `var(${size === "default" ? token : `${token}-${size}`})`
      element.style.position = "absolute"
      row.append(element)
      const height = `${element.getBoundingClientRect().height}px`
      element.remove()
      return height
    }
    const rows = elements.map((row) => {
      const size = row.getAttribute("data-size")!
      return {
        controlHeight: probe(row, "--control-size", size),
        example: row.closest("[data-example]")!.getAttribute("data-example"),
        row,
        size,
      }
    })
    return {
      chips: rows.flatMap(({ controlHeight, example, row, size }) =>
        [...row.querySelectorAll<HTMLElement>(":scope > .ui-chip")].map(
          (chip) => {
            const chipSize =
              SIZES.find((name) => chip.classList.contains(`ui-${name}`)) ??
              "default"
            return {
              chip: `${example} ${size} > ${chip.className} "${chip.textContent!.trim()}"`,
              controlHeight,
              expected: probe(row, "--chip-size", chipSize),
              height: `${chip.getBoundingClientRect().height}px`,
              matchesControl:
                SIZES.indexOf(chipSize) === SIZES.indexOf(size) + 1,
              size,
            }
          },
        ),
      ),
      rows: rows.map(({ controlHeight, example, row, size }) => ({
        controls: [...row.querySelectorAll<HTMLElement>(selector)].map(
          (control) => ({
            control: `${control.parentElement!.className} > ${control.className}`,
            height: `${control.getBoundingClientRect().height}px`,
          }),
        ),
        expected: controlHeight,
        row: `${example} ${size}`,
        size,
      })),
    }
  }, CONTROLS)

type Measured = Awaited<ReturnType<typeof measure>>

export const expectSharedHeights = (rows: Measured["rows"]) => {
  expect(rows.length).toBeGreaterThan(0)
  for (const { controls, expected, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter(({ height }) => height !== expected),
      `${row} should be ${expected}`,
    ).toEqual([])
  }
}

export const expectChipHeights = (chips: Measured["chips"]) => {
  expect(
    chips.filter(({ expected, height }) => height !== expected),
    "chips should match their chip size token",
  ).toEqual([])
  expect(
    chips.filter(
      ({ controlHeight, height, matchesControl }) =>
        matchesControl && height !== controlHeight,
    ),
    "chips one size step up should match the row's control size",
  ).toEqual([])
}

export const expectSizedRows = async (page: Page) => {
  const { chips, rows } = await measure(page)
  expectSharedHeights(rows)
  expectChipHeights(chips)
}

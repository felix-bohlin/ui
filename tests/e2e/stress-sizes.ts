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

export const measureRows = (page: Page) =>
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

export const measureChips = (page: Page) =>
  page.locator("[data-size]").evaluateAll((elements) => {
    const SIZES = ["x-small", "small", "default", "large"]
    const measure = (row: Element, token: string) => {
      const probe = document.createElement("div")
      probe.style.blockSize = `var(${token})`
      probe.style.position = "absolute"
      row.append(probe)
      const height = `${probe.getBoundingClientRect().height}px`
      probe.remove()
      return height
    }
    return elements.flatMap((row) => {
      const size = row.getAttribute("data-size")!
      const controlHeight = measure(
        row,
        size === "default" ? "--control-size" : `--control-size-${size}`,
      )
      const example = row
        .closest("[data-example]")!
        .getAttribute("data-example")
      return [...row.querySelectorAll<HTMLElement>(":scope > .ui-chip")].map(
        (chip) => {
          const chipSize =
            SIZES.find((name) => chip.classList.contains(`ui-${name}`)) ??
            "default"
          return {
            chip: `${example} ${size} > ${chip.className} "${chip.textContent!.trim()}"`,
            controlHeight,
            expected: measure(
              row,
              chipSize === "default"
                ? "--chip-size"
                : `--chip-size-${chipSize}`,
            ),
            height: `${chip.getBoundingClientRect().height}px`,
            matchesControl: SIZES.indexOf(chipSize) === SIZES.indexOf(size) + 1,
            size,
          }
        },
      )
    })
  })

export const expectSharedHeights = (
  rows: Awaited<ReturnType<typeof measureRows>>,
) => {
  expect(rows.length).toBeGreaterThan(0)
  for (const { controls, expected, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter(({ height }) => height !== expected),
      `${row} should be ${expected}`,
    ).toEqual([])
  }
}

export const expectChipHeights = (
  chips: Awaited<ReturnType<typeof measureChips>>,
) => {
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
  expectSharedHeights(await measureRows(page))
  expectChipHeights(await measureChips(page))
}

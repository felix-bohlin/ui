import { readFileSync } from "node:fs"
import { expect, type Page, test } from "@playwright/test"
import { openFixture, STRESS_TESTS } from "./fixtures"

const SIZED = STRESS_TESTS.filter((fixture) =>
  readFileSync(
    new URL(
      `../../src/stress-tests/${fixture.slice("stress/".length)}.html`,
      import.meta.url,
    ),
    "utf-8",
  ).includes("data-size="),
)

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-button-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > :is(.ui-select, .ui-text-field):not(:has(> .ui-label))",
  ":scope > .ui-toggle-button",
  ":scope > .ui-toggle-group",
].join(", ")

const measure = (page: Page) =>
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

const expectSharedHeights = (rows: Measured["rows"]) => {
  expect(rows.length).toBeGreaterThan(0)
  for (const { controls, expected, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter(({ height }) => height !== expected),
      `${row} should be ${expected}`,
    ).toEqual([])
  }
}

const expectChipHeights = (chips: Measured["chips"]) => {
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

const expectSizedRows = async (page: Page) => {
  const { chips, rows } = await measure(page)
  expectSharedHeights(rows)
  expectChipHeights(chips)
}

for (const fixture of SIZED) {
  test(`${fixture} controls of one size share one height`, async ({ page }) => {
    await openFixture(page, "html", fixture)

    await expectSizedRows(page)
  })

  test(`${fixture} controls keep their height in forced colors mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: "active" })
    await openFixture(page, "html", fixture)

    await expectSizedRows(page)
  })
}

test("chips one size step up match the control size", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  const { chips } = await measure(page)
  expect(
    [
      ...new Set(
        chips
          .filter(({ matchesControl }) => matchesControl)
          .map(({ size }) => size),
      ),
    ].toSorted(),
  ).toEqual(["default", "small", "x-small"])
  expectChipHeights(chips)
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

    const { rows } = await measure(page)
    for (const { expected, row, size } of rows) {
      expect(expected, row).toBe(heights[size as keyof typeof heights])
    }
    expectSharedHeights(rows)
  })
}

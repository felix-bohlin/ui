import { expect, type Page, test } from "@playwright/test"
import { openFixture } from "./fixtures"

const TOGGLE_GROUP = ":scope > .ui-toggle-group"

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-button-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > :is(.ui-select, .ui-text-field):not(:has(> .ui-label))",
  ":scope > .ui-toggle-button",
  TOGGLE_GROUP,
]

const measureRows = (page: Page, controls = CONTROLS) =>
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
    controls.join(", "),
  )

const measureChips = (page: Page) =>
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

const expectChipHeights = (chips: Awaited<ReturnType<typeof measureChips>>) => {
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
  expectSharedHeights(await measureRows(page))
  expectChipHeights(await measureChips(page))
}

test("form controls of one size share one height", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  await expectSizedRows(page)
})

test("chips one size step up match the control size", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  const chips = await measureChips(page)
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

test("form controls keep their height in high contrast mode", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/contrast")

  await expectSizedRows(page)
})

test("busy controls keep their height", async ({ page }) => {
  await openFixture(page, "html", "stress/data-display")

  await expectSizedRows(page)
})

for (const fixture of ["contrast", "forms"]) {
  test(`${fixture} controls keep their height in forced colors mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: "active" })
    await openFixture(page, "html", `stress/${fixture}`)

    expectSharedHeights(
      await measureRows(
        page,
        CONTROLS.filter((control) => control !== TOGGLE_GROUP),
      ),
    )
    expectChipHeights(await measureChips(page))
  })

  test(`${fixture} toggle groups keep their height in forced colors mode`, async ({
    page,
  }) => {
    test.fail(
      true,
      "toggle-group.css pulls each toggle button up by the border width in forced colors, so groups are one border width short",
    )
    await page.emulateMedia({ forcedColors: "active" })
    await openFixture(page, "html", `stress/${fixture}`)

    expectSharedHeights(
      (await measureRows(page, [TOGGLE_GROUP])).filter(
        ({ controls }) => controls.length > 0,
      ),
    )
  })
}

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

import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"
import {
  expectChipHeights,
  expectSharedHeights,
  expectSizedRows,
  measureChips,
  measureRows,
} from "./stress-sizes"

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

    await expectSizedRows(page)
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

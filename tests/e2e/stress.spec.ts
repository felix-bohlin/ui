import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"
import { openFixture, STRESS_TESTS } from "./fixtures"
import {
  expectChipHeights,
  expectSharedHeights,
  expectSizedRows,
  measure,
} from "./stress-sizes"

const SIZED = STRESS_TESTS.filter((fixture) =>
  readFileSync(
    new URL(
      `../../src/stress-tests/${fixture.slice("stress/".length)}.html`,
      import.meta.url,
    ),
    "utf-8",
  ).includes("data-size="),
)

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
    large: "42px",
    small: "28px",
    "x-small": "24.5px",
  },
  "1.125": {
    default: "45px",
    large: "54px",
    small: "36px",
    "x-small": "31.5px",
  },
}

for (const [density, heights] of Object.entries(DENSITIES)) {
  test(`form controls scale with --ui-density: ${density}`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/forms")
    await page.evaluate(
      (value) =>
        document.documentElement.style.setProperty("--ui-density", value),
      density,
    )

    const { rows } = await measure(page)
    for (const { expected, row, size } of rows) {
      expect(expected, row).toBe(heights[size as keyof typeof heights])
    }
    expectSharedHeights(rows)
  })
}

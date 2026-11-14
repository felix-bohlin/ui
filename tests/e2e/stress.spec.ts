import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"
import { openFixture, STRESS_TESTS } from "./fixtures"
import {
  expectAffixes,
  expectChipHeights,
  expectSharedHeights,
  expectSizedRows,
  measure,
  measureAffixes,
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

test("affixes center on the control's line at every size", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  const { affixes } = await measure(page)
  expect(
    [...new Set(affixes.map(({ affix }) => affix.split(" ")[1]))].toSorted(),
  ).toEqual(["default", "large", "small", "x-small"])
  expect(
    [...new Set(affixes.flatMap(({ holds }) => holds))].toSorted(),
  ).toEqual(["#text", "button", "span", "svg"])
  expectAffixes(affixes)
})

test("fields with a button keep their size at every size", async ({ page }) => {
  await openFixture(page, "html", "stress/forms")

  const { rows } = await measure(page)
  expect(
    [
      ...new Set(
        rows
          .filter(({ controls }) => controls.some(({ button }) => button))
          .map(({ size }) => size),
      ),
    ].toSorted(),
  ).toEqual(["default", "large", "small", "x-small"])
  expectSharedHeights(rows)
})

test("content taller than a field's button keeps the button's inset", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/forms")

  const affixes = await measureAffixes(
    page.locator("[data-tall-affixes] .ui-field > :is(.ui-start, .ui-end)"),
  )
  expect(
    affixes.map(({ affix }) => affix.replace(/^TallAffixes > /, "")),
  ).toEqual(
    Array.from({ length: 4 }, () => [
      "ui-text-field ui-start",
      "ui-textarea ui-start",
    ]).flat(),
  )
  expect(affixes.filter(({ inset }) => inset >= 3)).not.toEqual([])
  expectAffixes(affixes)
})

for (const root of ["ui-text-field", "ui-textarea"]) {
  test(`Tab follows the order a ${root}'s parts are drawn in`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/forms")
    const control =
      root === "ui-textarea"
        ? '<textarea id="order-control"></textarea>'
        : '<input id="order-control" />'
    await page.locator("main").evaluate(
      (main, markup) => {
        main.insertAdjacentHTML("afterbegin", markup)
      },
      `<button id="order-before" type="button">Before</button>
      <div class="${root}">
        <label class="ui-label" for="order-control">Order</label>
        <span class="ui-field">${control}<span class="ui-start"
            ><button aria-label="Start" class="ui-button" id="order-start" type="button">S</button></span
          ><span class="ui-end"
            ><button aria-label="End" class="ui-button" id="order-end" type="button">E</button></span
          ><span class="ui-top"
            ><button class="ui-button" id="order-top" type="button">Top</button></span
          ><span class="ui-bottom"
            ><button class="ui-button" id="order-bottom" type="button">Bottom</button></span
        ></span>
      </div>`,
    )
    await page.locator("#order-before").focus()
    const order = []
    for (let step = 0; step < 5; step++) {
      await page.keyboard.press("Tab")
      order.push(await page.evaluate(() => document.activeElement?.id))
    }
    expect(order).toEqual([
      "order-top",
      "order-start",
      "order-control",
      "order-end",
      "order-bottom",
    ])
  })
}

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

    const { affixes, rows } = await measure(page)
    for (const { expected, row, size } of rows) {
      expect(expected, row).toBe(heights[size as keyof typeof heights])
    }
    expectSharedHeights(rows)
    expectAffixes(affixes)
  })
}

import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"
import { needs, openFixture, STRESS_TESTS } from "./fixtures"
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

test("a control that wraps in a control group starts its row without a divider, except after a field with a visible label", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/forms")
  await needs(page, "gap decorations", () => CSS.supports("row-rule: none"))
  test.info().annotations.push({
    description:
      "a gap rule runs the full height of the row and would show beside a visible label, so that group keeps start borders, and CSS can't tell that a button is first in its row",
    type: "known limit",
  })

  expect(
    await page
      .locator('[data-example="WrappedControlGroup"] .ui-control-group')
      .evaluateAll((groups) => {
        const probe = new OffscreenCanvas(1, 1).getContext("2d")!
        const paints = (color: string) => {
          probe.clearRect(0, 0, 1, 1)
          probe.fillStyle = color
          probe.fillRect(0, 0, 1, 1)
          return probe.getImageData(0, 0, 1, 1).data[3] > 0
        }
        return groups.map((group) => {
          const controls = [...group.children]
          return {
            dividers: [
              ...new Set(
                controls.flatMap((control, index) => {
                  if (index === 0) return []
                  const previous = controls[index - 1].getBoundingClientRect()
                  if (
                    control.getBoundingClientRect().top <
                    previous.bottom - 1
                  ) {
                    return []
                  }
                  const style = getComputedStyle(control)
                  return [
                    parseFloat(style.borderInlineStartWidth) > 0 &&
                      paints(style.borderInlineStartColor),
                  ]
                }),
              ),
            ],
            group: group.getAttribute("aria-label"),
          }
        })
      }),
    "whether the first control of each wrapped row starts with a divider",
  ).toEqual([
    { dividers: [false], group: "Message" },
    { dividers: [true], group: "Invite by email" },
    { dividers: [false], group: "Invite" },
  ])
})

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
    page.locator(
      "[data-tall-affixes] .ui-field-container > :is(.ui-start, .ui-end)",
    ),
  )
  expect(
    affixes.map(({ affix }) => affix.replace(/^TallAffixes > /, "")),
  ).toEqual(
    Array.from({ length: 4 }, () => [
      "ui-field input ui-start",
      "ui-field textarea ui-start",
    ]).flat(),
  )
  expect(affixes.filter(({ inset }) => inset >= 3)).not.toEqual([])
  expectAffixes(affixes)
})

const ORDER_PARTS = {
  bottom:
    '<span class="ui-bottom"><button class="ui-button" id="order-bottom" type="button">Bottom</button></span>',
  end: '<span class="ui-end"><button aria-label="End" class="ui-button" id="order-end" type="button">E</button></span>',
  start:
    '<span class="ui-start"><button aria-label="Start" class="ui-button" id="order-start" type="button">S</button></span>',
  top: '<span class="ui-top"><button class="ui-button" id="order-top" type="button">Top</button></span>',
}

const MARKUP_ORDERS = [
  {
    markup: ["top", "start", "control", "end", "bottom"],
    title: (control: string) =>
      `Tab follows the order the parts of a field with a ${control} are drawn in`,
  },
  {
    markup: ["control", "start", "end", "top", "bottom"],
    readingFlow: true,
    title: (control: string) =>
      `Tab follows the order the parts of a field with a ${control} are drawn in when the markup puts the control first`,
  },
]

for (const control of ["input", "textarea"]) {
  for (const { markup, readingFlow, title } of MARKUP_ORDERS) {
    test(title(control), async ({ page }) => {
      await openFixture(page, "html", "stress/forms")
      if (readingFlow) {
        await needs(page, "reading-flow", () =>
          CSS.supports("reading-flow", "grid-rows"),
        )
      }
      const parts = {
        ...ORDER_PARTS,
        control:
          control === "textarea"
            ? '<textarea id="order-control"></textarea>'
            : '<input id="order-control" />',
      }
      await page.locator("main").evaluate(
        (main, html) => {
          main.insertAdjacentHTML("afterbegin", html)
        },
        `<button id="order-before" type="button">Before</button>
        <div class="ui-field">
          <label class="ui-label" for="order-control">Order</label>
          <span class="ui-field-container">${markup.map((part) => parts[part as keyof typeof parts]).join("")}</span>
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
}

test("a field in a linked card takes a click anywhere in it", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/layout")

  const root = page.locator(
    "#stress-layout-card-links .ui-field:has(> .ui-field-container > input)",
  )
  await root.scrollIntoViewIfNeeded()
  const hits = await root.evaluate((field) =>
    [".ui-end", ".ui-end-text"].map((part) => {
      const box = field.querySelector(part)!.getBoundingClientRect()
      return field.contains(
        document.elementFromPoint(
          box.left + box.width / 2,
          box.top + box.height / 2,
        ),
      )
    }),
  )
  expect(hits, "the affix and the end text").toEqual([true, true])
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

    const { affixes, rows } = await measure(page)
    for (const { expected, row, size } of rows) {
      expect(expected, row).toBe(heights[size as keyof typeof heights])
    }
    expectSharedHeights(rows)
    expectAffixes(affixes)
  })
}

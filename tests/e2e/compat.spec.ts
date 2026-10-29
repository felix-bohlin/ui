import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"

const APPLIES: Record<string, string[]> = {
  chromium: [],
  firefox: ["not (corner-shape: squircle)", "not selector(: interest-source)"],
  webkit: ["not selector(: interest-source)"],
}

test.beforeEach(async ({ page }) => {
  await openFixture(page, "html", "avatar")
})

test("the compat layer loads by default and applies only the expected fallbacks", async ({
  browserName,
  page,
}) => {
  const conditions = await page.evaluate(() => {
    const found = new Set<string>()
    const walk = (rules: CSSRuleList, compat: boolean) => {
      for (const rule of rules) {
        const inside =
          compat ||
          (rule instanceof CSSLayerBlockRule &&
            rule.name === "components.compat")
        if (inside && rule instanceof CSSSupportsRule) {
          found.add(rule.conditionText)
        }
        if ("cssRules" in rule) walk((rule as CSSGroupingRule).cssRules, inside)
      }
    }
    for (const sheet of document.styleSheets) walk(sheet.cssRules, false)
    return [...found].toSorted()
  })
  expect(conditions.length).toBeGreaterThan(0)
  const applies = await page.evaluate(
    (list) => list.filter((condition) => CSS.supports(condition)),
    conditions,
  )
  expect(
    applies.map((condition) => condition.replace(/\s*:\s*/g, ": ")),
  ).toEqual(APPLIES[browserName])
})

test("a squircle avatar is a rounded square without corner-shape", async ({
  page,
}) => {
  const { circle, squircle, supported } = await page.evaluate(() => {
    const example = document.querySelector('[data-example="Shapes"]')!
    const probe = document.createElement("div")
    probe.className = "ui-avatar"
    example.append(probe)
    return {
      circle: getComputedStyle(probe).borderStartStartRadius,
      squircle: getComputedStyle(example.querySelector(".ui-squircle")!)
        .borderStartStartRadius,
      supported: CSS.supports("(corner-shape: squircle)"),
    }
  })
  expect(squircle === circle).toBe(supported)
})

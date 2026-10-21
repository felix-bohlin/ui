import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { axeNodes, openFixture } from "./fixtures"
import { SCENARIOS, id, isOpen, opened, run } from "./stress-overlays"

const CHECKED = [
  "block-start drawer",
  "dialog",
  "dialog over dialog",
  "drawer over dialog",
  "end aligned menu in drawer header",
  "filled default split button menu",
  "menu at top start",
  "menu in dialog",
  "row menu right below a sticky header",
  "second level submenu",
  "split button menu in dialog footer",
  "submenu in dialog",
  "tooltip in dialog",
  "tooltip on an aria-disabled button",
  "tooltip on the close button at the drawer edge",
  "tooltip over an open menu in the same toolbar",
]

test("every checked overlay scenario exists", () => {
  expect(
    CHECKED.filter(
      (name) => !SCENARIOS.some((scenario) => scenario.name === name),
    ),
  ).toEqual([])
})

for (const { name, steps, unreachableIn } of SCENARIOS.filter((scenario) =>
  CHECKED.includes(scenario.name),
)) {
  test(`open ${name} has no axe violations`, async ({ browserName, page }) => {
    const engineBug = unreachableIn?.[browserName as "firefox" | "webkit"]
    test.fail(!!engineBug, engineBug)
    await openFixture(page, "html", "stress/overlays")
    for (const step of steps) await run(page, step)
    await page.evaluate(() =>
      Promise.allSettled(
        document.getAnimations().map((animation) => animation.finished),
      ),
    )
    for (const overlay of opened(steps)) {
      expect(await isOpen(page, id(overlay)), overlay).toBe(true)
    }

    const builder = new AxeBuilder({ page }).exclude('iframe[src*="youtube"]')
    for (const overlay of opened(steps)) builder.include(id(overlay))
    const { violations } = await builder.analyze()
    expect(axeNodes(violations)).toEqual([])
  })
}

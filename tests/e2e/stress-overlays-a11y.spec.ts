import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"
import { SCENARIOS, id, opened, run } from "./stress-overlays"

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

const CRITICAL_ITEM =
  "the critical menu item text has a 4.17:1 contrast against the dark elevated menu surface"

const FAILING: Record<string, Record<string, string>> = {
  "menu in dialog": { dark: CRITICAL_ITEM },
  "submenu in dialog": { dark: CRITICAL_ITEM },
}

const isCarousel = (html: string) =>
  /^<[^>]*\bclass="[^"]*\bui-carousel\b/.test(html)

test("every checked overlay scenario exists", () => {
  expect(
    CHECKED.filter(
      (name) => !SCENARIOS.some((scenario) => scenario.name === name),
    ),
  ).toEqual([])
})

for (const { name, steps } of SCENARIOS.filter((scenario) =>
  CHECKED.includes(scenario.name),
)) {
  test(`open ${name} has no axe violations`, async ({ page }, testInfo) => {
    const failing = FAILING[name]?.[testInfo.project.name]
    test.fail(!!failing, failing)
    await openFixture(page, "html", "stress/overlays")
    for (const step of steps) await run(page, step)
    await page.evaluate(() =>
      Promise.all(
        document.getAnimations().map((animation) => animation.finished),
      ),
    )

    const builder = new AxeBuilder({ page }).exclude('iframe[src*="youtube"]')
    for (const overlay of opened(steps)) builder.include(id(overlay))
    const { violations } = await builder.analyze()
    expect(
      violations.flatMap((violation) =>
        violation.nodes
          .filter(
            (node) =>
              violation.id !== "scrollable-region-focusable" ||
              !isCarousel(node.html),
          )
          .map((node) => ({
            help: violation.help,
            id: violation.id,
            target: node.target.join(" "),
          })),
      ),
    ).toEqual([])
  })
}

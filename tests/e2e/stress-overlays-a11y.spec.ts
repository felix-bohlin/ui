import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { failsIn } from "./engine-bugs"
import { axeNodes, computed, openFixture } from "./fixtures"
import {
  SCENARIOS,
  id,
  isOpen,
  needsSelect,
  opened,
  run,
} from "./stress-overlays"

for (const { name, skipAxe, steps, unreachableIn } of SCENARIOS) {
  test(`open ${name} has no axe violations`, async ({ browserName, page }) => {
    test.skip(skipAxe !== undefined, skipAxe)
    failsIn(browserName, unreachableIn)
    await openFixture(page, "html", "stress/overlays")
    await needsSelect(page, steps)
    for (const step of steps) await run(page, step)
    await page.evaluate(() =>
      Promise.allSettled(
        document.getAnimations().map((animation) => animation.finished),
      ),
    )
    const overlays = []
    for (const overlay of opened(steps)) {
      if (await isOpen(page, id(overlay))) overlays.push(overlay)
    }
    expect(overlays, "the last overlay is open").toContain(opened(steps).at(-1))
    for (const overlay of overlays) {
      await expect
        .poll(() => computed(page.locator(id(overlay)), "opacity"), overlay)
        .toBe("1")
    }

    const builder = new AxeBuilder({ page }).exclude('iframe[src*="youtube"]')
    for (const overlay of overlays) builder.include(id(overlay))
    const { violations } = await builder.analyze()
    const contrast = violations
      .filter((violation) => violation.id === "color-contrast")
      .flatMap((violation) =>
        violation.nodes.map((node) => ({
          target: node.target,
          ...node.any[0]?.data,
        })),
      )
    expect(axeNodes(violations), JSON.stringify(contrast)).toEqual([])
  })
}

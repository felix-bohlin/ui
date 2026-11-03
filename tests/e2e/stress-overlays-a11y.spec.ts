import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { failsIn } from "./engine-bugs"
import { axeNodes, openFixture } from "./fixtures"
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

    const builder = new AxeBuilder({ page }).exclude('iframe[src*="youtube"]')
    for (const overlay of overlays) builder.include(id(overlay))
    const { violations } = await builder.analyze()
    const contrast = []
    for (const node of violations
      .filter((violation) => violation.id === "color-contrast")
      .flatMap((violation) => violation.nodes)) {
      contrast.push({
        target: node.target,
        ...node.any[0]?.data,
        element: await page
          .locator(String(node.target[0]))
          .evaluate((element) => {
            const style = getComputedStyle(element)
            const rect = element.getBoundingClientRect()
            return {
              animations: element
                .getAnimations()
                .map(
                  (animation) =>
                    `${(animation as CSSTransition).transitionProperty} ${animation.playState} ${animation.currentTime}`,
                ),
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              rect: [rect.left, rect.top, rect.width, rect.height].map(
                Math.round,
              ),
              stack: document
                .elementsFromPoint(
                  rect.left + rect.width / 2,
                  rect.top + rect.height / 2,
                )
                .slice(0, 4)
                .map(
                  (hit) =>
                    `${hit.tagName.toLowerCase()}${hit.id ? `#${hit.id}` : ""} ${getComputedStyle(hit).backgroundColor} ${getComputedStyle(hit).opacity}`,
                ),
            }
          }),
      })
    }
    expect(axeNodes(violations), JSON.stringify(contrast)).toEqual([])
  })
}

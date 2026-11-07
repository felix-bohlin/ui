import { expect, test } from "@playwright/test"
import { FIREFOX_SELF_RTL, failsIn } from "./engine-bugs"
import { openFixture } from "./fixtures"
import {
  SCENARIOS,
  id,
  isOpen,
  needsSelect,
  problems,
  run,
} from "./stress-overlays"

for (const {
  failing,
  failingIn,
  name,
  steps,
  stillOpen = [],
  top,
} of SCENARIOS) {
  test(`${name} is on top and inside the viewport`, async ({
    browserName,
    page,
  }) => {
    test.fail(!!failing, failing)
    failsIn(browserName, failingIn)
    test.skip(
      browserName !== "chromium" && steps.some((step) => "container" in step),
      "needs scrollIntoView({ container })",
    )
    await openFixture(page, "html", "stress/overlays")
    await needsSelect(page, steps)
    for (const step of steps) await run(page, step)
    await expect.poll(() => problems(page, top), name).toEqual([])
    for (const overlay of stillOpen)
      expect(await isOpen(page, id(overlay)), `${overlay} stays open`).toBe(
        true,
      )
  })
}

test("a menu in a right-to-left part of the page opens from its trigger's right edge", async ({
  browserName,
  page,
}) => {
  failsIn(browserName, { firefox: FIREFOX_SELF_RTL })
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "rtl-menu" })
  const edges = () =>
    page.evaluate(() => {
      const menu = document
        .getElementById("stress-overlays-rtl-menu")!
        .getBoundingClientRect()
      const trigger = document
        .querySelector('[commandfor="stress-overlays-rtl-menu"]')!
        .getBoundingClientRect()
      return Math.round(menu.right - trigger.right)
    })
  await expect.poll(edges).toBe(0)
})

import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"
import {
  FIREFOX_SELF_RTL,
  SCENARIOS,
  id,
  isOpen,
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
    const engineBug = failingIn?.[browserName as "firefox" | "webkit"]
    test.fail(!!(failing ?? engineBug), failing ?? engineBug)
    test.skip(
      browserName !== "chromium" && steps.some((step) => "container" in step),
      "needs scrollIntoView({ container })",
    )
    await openFixture(page, "html", "stress/overlays")
    if (steps.some((step) => "select" in step)) {
      test.skip(
        !(await page.evaluate(() => CSS.supports("appearance", "base-select"))),
        "needs customizable select",
      )
    }
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
  test.fail(browserName === "firefox", FIREFOX_SELF_RTL)
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

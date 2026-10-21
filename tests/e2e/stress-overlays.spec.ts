import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"
import { SCENARIOS, id, isOpen, problems, run } from "./stress-overlays"

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

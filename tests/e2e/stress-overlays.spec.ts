import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"
import { SCENARIOS, id, isOpen, problems, run } from "./stress-overlays"

for (const { failing, name, steps, stillOpen = [], top } of SCENARIOS) {
  test(`${name} is on top and inside the viewport`, async ({ page }) => {
    test.fail(!!failing, failing)
    await openFixture(page, "html", "stress/overlays")
    for (const step of steps) await run(page, step)
    await expect.poll(() => problems(page, top), name).toEqual([])
    for (const overlay of stillOpen)
      expect(await isOpen(page, id(overlay)), `${overlay} stays open`).toBe(
        true,
      )
  })
}

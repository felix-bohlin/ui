import { expect, test } from "@playwright/test"
import { FIXTURES, openFixture } from "./fixtures"

for (const component of FIXTURES) {
  test(`${component} looks the same`, async ({ page }) => {
    await openFixture(page, "html", component)

    const examples = page.locator("[data-example]")
    const count = await examples.count()
    test.skip(count === 0, "no HTML examples")

    for (let index = 0; index < count; index++) {
      const example = examples.nth(index)
      const name = await example.getAttribute("data-example")
      await expect.soft(example).toHaveScreenshot(`${component}/${name}.png`, {
        mask: [example.locator("img"), example.locator("video")],
      })
    }
  })
}

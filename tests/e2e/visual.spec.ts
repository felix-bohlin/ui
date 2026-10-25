import { expect, test } from "@playwright/test"
import { BLOCKS, FIXTURES, openFixture } from "./fixtures"

for (const component of FIXTURES) {
  test(`${component} looks the same`, async ({ page }) => {
    test.setTimeout(180_000)
    await openFixture(page, "html", component)
    await page.screenshot({ fullPage: true })

    const examples = page.locator("[data-example]")
    const count = await examples.count()

    for (let index = 0; index < count; index++) {
      const example = examples.nth(index)
      const name = await example.getAttribute("data-example")
      await expect.soft(example).toHaveScreenshot(`${component}/${name}.png`, {
        mask: [example.locator("img"), example.locator("video")],
      })
    }
  })
}

for (const block of BLOCKS) {
  for (const width of [390, 768, 1280]) {
    test(`${block} looks the same at ${width}px`, async ({ page }) => {
      test.setTimeout(180_000)
      await page.setViewportSize({ height: 900, width })
      await openFixture(page, "html", block)
      const preview = page.locator(".block-preview")
      await expect.soft(preview).toHaveScreenshot(`${block}/${width}.png`, {
        mask: [preview.locator("img"), preview.locator("video")],
      })
    })
  }
}

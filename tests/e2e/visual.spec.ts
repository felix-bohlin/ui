import { expect, test } from "@playwright/test"
import { COMPONENTS, openFixture } from "./fixtures"

for (const component of COMPONENTS) {
  test(`${component} looks the same`, async ({ page }) => {
    await openFixture(page, "html", component)

    if (component === "typography") {
      const probe = (label: string) =>
        page.evaluate((label) => {
          const example = document.querySelector('[data-example="Default"]')!
          const kids = [...example.querySelectorAll("article > *")]
          return JSON.stringify({
            label,
            viewport: [innerWidth, innerHeight],
            height: example.getBoundingClientRect().height,
            kids: kids.map((kid) => [
              kid.tagName,
              kid.textContent?.trim().slice(0, 20),
              Math.round(kid.getBoundingClientRect().height),
            ]),
          })
        }, label)
      const lines = [await probe("initial")]
      await page.locator('[data-example="Default"]').screenshot()
      await page.waitForTimeout(500)
      lines.push(await probe("after-screenshot"))
      await page.locator('[data-example="Default"]').screenshot()
      await page.waitForTimeout(500)
      lines.push(await probe("after-screenshot-2"))
      const { appendFileSync } = await import("node:fs")
      appendFileSync("diag.txt", lines.join("\n") + "\n")
    }
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

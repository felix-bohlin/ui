import { expect, test } from "@playwright/test"
import { instantScrolling } from "./fixtures"

test.describe("checklist pages", () => {
  test.beforeEach(async ({ page }) => {
    await instantScrolling(page)
    await page.addInitScript(() => {
      navigator.clipboard.writeText = async (text) => {
        document.documentElement.dataset.copied = text
      }
    })
  })

  test("copies checks, comments and new items for the file", async ({
    page,
  }) => {
    await page.goto("/checklist/")
    const item = page.locator(".checks-item:not([data-check-done])").first()
    const line = await item.getAttribute("data-check-line")
    const section = item.locator("xpath=ancestor::section[1]")
    const title = await section.getAttribute("data-check-section")

    await item.locator(".checks-done input").check({ force: true })
    await expect(item.locator(".checks-changed")).toBeVisible()
    await expect(page.locator("#checks-progress")).toContainText(
      "1 not in the file yet",
    )

    await item.locator("textarea").fill("Merge the first two")
    await section.locator("[data-check-add] input").fill("Write the notes")
    await section.locator("[data-check-add] button[type=submit]").click()
    await expect(section.locator(".checks-new")).toContainText(
      "Write the notes",
    )

    await page.locator("#checks-copy").click()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.copied))
      .toBe(
        [
          "docs/releases/6.0.0-checklist.md with my comments",
          "",
          `## ${title}`,
          "",
          line!.replace("- [ ]", "- [x]"),
          "  > Merge the first two",
          "- [ ] Write the notes",
          "  > New item",
        ].join("\n"),
      )

    await page.reload()
    await expect(item.locator(".checks-done input")).toBeChecked()
    await expect(section.locator(".checks-new")).toHaveCount(1)
  })

  test("starts from the file and keeps checks saved as a list", async ({
    page,
  }) => {
    await page.goto("/checks/")
    const done = page.locator(".checks-item[data-check-done]")
    test.skip((await done.count()) === 0, "no check is done in the file")
    const open = page.locator(".checks-item:not([data-check-done])").first()
    const key = await open.getAttribute("data-check-key")

    await page.evaluate((key) => {
      localStorage.setItem("opui-checks-done", JSON.stringify([key]))
    }, key)
    await page.reload()

    await expect(open.locator(".checks-done input")).toBeChecked()
    await expect(done.first().locator(".checks-done input")).toBeChecked()

    await done.first().locator(".checks-done input").uncheck({ force: true })
    page.once("dialog", (dialog) => dialog.accept())
    await page.locator("#checks-reset").click()
    await expect(done.first().locator(".checks-done input")).toBeChecked()
    await expect(open.locator(".checks-done input")).not.toBeChecked()
    await expect(page.locator("#checks-status")).toHaveText(
      "Checks reset to the file.",
    )
  })
})

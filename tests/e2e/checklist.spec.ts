import { expect, test, type Locator } from "@playwright/test"
import { instantScrolling } from "./fixtures"

const center = (locator: Locator) =>
  locator.evaluate((element) => element.scrollIntoView({ block: "center" }))

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
    test.setTimeout(60_000)
    await page.goto("/checklist/")
    const item = page.locator(".checks-item:not([data-check-done])").first()
    const line = await item.getAttribute("data-check-line")
    const key = await item.getAttribute("data-check-key")
    const section = item.locator("xpath=ancestor::section[1]")
    const title = await section.getAttribute("data-check-section")

    await center(item)
    await item.locator(".checks-done input").check({ force: true })
    await expect(item.locator(".checks-changed")).toBeVisible()
    await expect(page.locator("#checks-progress")).toContainText(
      "1 change not in the file yet",
    )
    await expect(
      page.locator(`.checks-map-sidebar [data-map-key="${key}"]`),
    ).toHaveAttribute("data-stage", "done")

    await item.locator(".checks-toggle").click()
    await expect(item.locator(".checks-toggle")).toHaveAttribute(
      "aria-expanded",
      "true",
    )
    await item.locator("textarea").fill("Merge the first two")
    await section.locator("[data-add-open]").click()
    await section.locator("[data-check-add] input").fill("Write the notes")
    await section.locator("[data-check-add] button[type=submit]").click()
    await expect(section.locator(".checks-new")).toContainText(
      "Write the notes",
    )

    const expected = [
      "docs/releases/6.0.0-checklist.md with my comments",
      "",
      `## ${title}`,
      "",
      line!.replace("- [ ]", "- [x]"),
      "  > Merge the first two",
      "- [ ] Write the notes",
      "  > New item",
    ].join("\n")

    await page.locator("#checks-review-open").click()
    await expect(page.locator("#checks-review-text")).toHaveText(expected)
    await page.locator("#checks-copy-review").click()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.copied))
      .toBe(expected)
    await expect(page.locator("#checks-review-status")).toHaveText(
      "Copied 2 changes. Paste them to an agent.",
    )

    await page.reload()
    await expect(item.locator(".checks-done input")).toBeChecked()
    await expect(item.locator("[data-comment-preview]")).toHaveText(
      "Merge the first two",
    )
    await expect(section.locator(".checks-new")).toHaveCount(1)
  })

  test("filters by status and text, and replies in one click", async ({
    page,
  }) => {
    test.setTimeout(60_000)
    await page.goto("/checklist/")
    const items = page.locator(".checks-item")
    const total = await items.count()

    await page.locator("input[data-stage-filter=done]").uncheck({ force: true })
    await expect(page.locator(".checks-item:visible")).not.toHaveCount(total)
    expect(
      await page
        .locator(".checks-item:visible")
        .evaluateAll((list) => list.map((item) => item.dataset.stage)),
    ).not.toContain("done")

    await page.reload()
    await expect(
      page.locator("input[data-stage-filter=done]"),
    ).not.toBeChecked()

    await page.locator("#checks-search").fill("safari")
    for (const text of await page
      .locator(".checks-item:visible")
      .evaluateAll((list) => list.map((item) => item.textContent ?? ""))) {
      expect(text.toLowerCase()).toContain("safari")
    }

    await page.locator("#checks-search").fill("no item says this")
    await expect(page.locator("#checks-empty")).toBeVisible()
    await page.locator("#checks-show-all").click()
    await expect(page.locator(".checks-item:visible")).toHaveCount(total)

    const item = page.locator(".checks-item:not([data-check-done])").first()
    await center(item)
    await item.locator(".checks-toggle").click()
    const reply = item.locator("[data-quick-reply]").first()
    const text = await reply.getAttribute("data-quick-reply")
    await reply.click()
    await expect(item.locator("textarea")).toHaveValue(text!)
    await expect(reply).toHaveAttribute("aria-pressed", "true")
    await reply.click()
    await expect(item.locator("textarea")).toHaveValue("")
    await expect(reply).toHaveAttribute("aria-pressed", "false")
  })

  test("works through the items with the keyboard", async ({ page }) => {
    await page.goto("/checks/")
    const first = page.locator(".checks-item:visible").first()
    const second = page.locator(".checks-item:visible").nth(1)

    await page.keyboard.press("j")
    await expect(first.locator(".checks-toggle")).toBeFocused()
    await page.keyboard.press("j")
    await expect(second.locator(".checks-toggle")).toBeFocused()
    await page.keyboard.press("k")
    await expect(first.locator(".checks-toggle")).toBeFocused()

    const checked = await first.locator(".checks-done input").isChecked()
    await page.keyboard.press("x")
    await expect(first.locator(".checks-done input")).toBeChecked({
      checked: !checked,
    })

    await page.keyboard.press("1")
    await expect(first.locator(".checks-toggle")).toHaveAttribute(
      "aria-expanded",
      "true",
    )
    await expect(first.locator("textarea")).toHaveValue(
      (await first.locator("[data-quick-reply]").first().textContent())!.trim(),
    )

    await page.keyboard.press("c")
    await expect(first.locator("textarea")).toBeFocused()
    await page.keyboard.press("Escape")
    await expect(first.locator(".checks-toggle")).toBeFocused()
    await page.keyboard.press("e")
    await expect(first.locator(".checks-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    )
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

    await center(done.first())
    await done.first().locator(".checks-done input").uncheck({ force: true })
    await page.locator("#checks-review-open").click()
    page.once("dialog", (dialog) => dialog.accept())
    await page.locator("#checks-reset").click()
    await expect(done.first().locator(".checks-done input")).toBeChecked()
    await expect(open.locator(".checks-done input")).not.toBeChecked()
    await expect(page.locator("#checks-review-status")).toHaveText(
      "Checks reset to the file.",
    )
  })
})

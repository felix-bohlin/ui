import { expect, test } from "@playwright/test"
import { instantScrolling } from "./fixtures"

test.describe("todo page", () => {
  test.describe.configure({ timeout: 60_000 })

  test.beforeEach(async ({ page }) => {
    await instantScrolling(page)
    await page.addInitScript(() => {
      navigator.clipboard.writeText = async (text) => {
        document.documentElement.dataset.copied = text
      }
    })
    await page.goto("/dev/todo/")
  })

  test("filters by section and status and keeps them in the URL", async ({
    page,
  }) => {
    const sections = page.locator("section[data-todo-section]")
    const slug = await sections.first().getAttribute("data-todo-section-slug")
    await page.locator("#todo-filter-section").selectOption(slug!)

    await expect(page).toHaveURL(new RegExp(`section=${slug}`))
    await expect(sections.first()).toBeVisible()
    await expect(sections.filter({ visible: true })).toHaveCount(1)

    await page.locator("#todo-filter-section").selectOption("")
    await page.locator("input[data-stage-filter=open]").uncheck({ force: true })
    await expect(page).toHaveURL(/status=/)
    await expect(
      page.locator('.todo-item:visible[data-stage="open"]'),
    ).toHaveCount(0)

    await page.reload()
    await expect(
      page.locator("input[data-stage-filter=open]"),
    ).not.toBeChecked()
    await expect(
      page.locator('.todo-item:visible[data-stage="open"]'),
    ).toHaveCount(0)

    await page.locator("#todo-search").fill("no todo says this")
    await expect(page.locator("#todo-empty")).toBeVisible()
    await page.locator("#todo-show-all").click()
    await expect(page.locator(".todo-item:visible")).toHaveCount(
      await page.locator(".todo-item").count(),
    )
    await expect(page).not.toHaveURL(/status=/)
  })

  test("accepts the recommendation from the row and copies it", async ({
    page,
  }) => {
    const item = page.locator(".todo-item[data-todo-recommended]").first()
    test.skip((await item.count()) === 0, "no recommended todo")
    const recommended = await item.getAttribute("data-todo-recommended")
    const accept = item.locator("[data-accept]")

    await accept.click()

    await expect(
      item.locator(`.todo-action input[value="${recommended}"]`),
    ).toBeChecked()
    await expect(accept).toHaveAttribute("aria-pressed", "true")
    await expect(item).toHaveAttribute("data-stage", "answered")
    await expect(item.locator("[data-answer-preview]")).toHaveText(recommended!)
    await expect(page.locator("#todo-status")).toContainText("Accepted")
    await expect(page.locator("#todo-count")).toContainText(
      "1 answer not in TODO.md yet",
    )

    await page.locator("#todo-review-open").click()
    await expect(page.locator("#todo-review-text")).toContainText(
      `\n  > ${recommended}`,
    )
    await page.locator("#todo-copy-review").click()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.copied))
      .toContain(`\n  > ${recommended}`)
    await page.locator("#todo-review [command=close]").click()

    await accept.click()
    await expect(item.locator('.todo-action input[value="None"]')).toBeChecked()
    await expect(accept).toHaveAttribute("aria-pressed", "false")
  })

  test("carries answers saved under an older headline over", async ({
    page,
  }) => {
    const item = page.locator(".todo-item").first()
    const key = await item.getAttribute("data-todo-key")
    const old = `${key}-src-utils-todo-ts-1-2`

    await page.evaluate((old) => {
      localStorage.setItem(
        "opui-todo-actions",
        JSON.stringify({ [old]: "Remove issue" }),
      )
      localStorage.setItem(
        "opui-todo-comments",
        JSON.stringify({ [old]: "Saved before" }),
      )
    }, old)
    await page.reload()

    await expect(item.locator("textarea")).toHaveValue("Saved before")
    await expect(
      item.locator('.todo-action input[value="Remove issue"]'),
    ).toBeChecked()
    await expect(item.locator("[data-answer-preview]")).toHaveText(
      "Remove issue: Saved before",
    )
    expect(
      await page.evaluate(() => [
        JSON.parse(localStorage.getItem("opui-todo-actions")!),
        JSON.parse(localStorage.getItem("opui-todo-comments")!),
      ]),
    ).toEqual([{ [key!]: "Remove issue" }, { [key!]: "Saved before" }])
  })

  test("moves to the next unanswered todo and opens it", async ({ page }) => {
    const unanswered = page.locator(
      '.todo-item:not([hidden]):not([data-todo-state="waiting"])',
    )
    const keys = await unanswered.evaluateAll((items) =>
      items.slice(0, 2).map((item) => (item as HTMLElement).dataset.todoKey),
    )
    test.skip(keys.length < 2, "fewer than two unanswered todos")
    const activeKey = () =>
      page.evaluate(
        () =>
          (document.activeElement?.closest(".todo-item") as HTMLElement | null)
            ?.dataset.todoKey,
      )
    const toggleOf = (key: string) =>
      page.locator(`.todo-item[data-todo-key="${key}"] .todo-toggle`)

    await page.locator("#todo-next").click()
    expect(await activeKey()).toBe(keys[0])
    await expect(toggleOf(keys[0]!)).toHaveAttribute("aria-expanded", "true")
    await page.locator("#todo-next").click()
    expect(await activeKey()).toBe(keys[1])
    await expect(toggleOf(keys[1]!)).toHaveAttribute("aria-expanded", "true")
    await expect(toggleOf(keys[0]!)).toHaveAttribute("aria-expanded", "false")
  })

  test("answers with the keyboard", async ({ page }) => {
    const first = page.locator(".todo-item:visible").first()
    const toggle = first.locator(".todo-toggle")

    await page.keyboard.press("j")
    await expect(toggle).toBeFocused()

    await page.keyboard.press("2")
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
    const second = first.locator(".todo-action-row .todo-action input").nth(1)
    await expect(second).toBeChecked()
    await expect(first).toHaveAttribute("data-stage", "answered")

    await page.keyboard.press("c")
    await expect(first.locator("textarea")).toBeFocused()
    await page.keyboard.type("Keep it short")
    await page.keyboard.press("Escape")
    await expect(toggle).toBeFocused()
    await page.keyboard.press("e")
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await expect(first.locator("[data-answer-preview]")).toHaveText(
      `${await second.getAttribute("value")}: Keep it short`,
    )
  })
})

import { expect, test } from "@playwright/test"

test.describe("todo page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      navigator.clipboard.writeText = async (text) => {
        document.documentElement.dataset.copied = text
      }
    })
    await page.goto("/todo/")
  })

  test("filters by section and keeps it in the URL", async ({ page }) => {
    const sections = page.locator("section[data-todo-section]")
    const slug = await sections.first().getAttribute("data-todo-section-slug")
    await page.locator("#todo-filter-section").selectOption(slug!)

    await expect(page).toHaveURL(new RegExp(`section=${slug}`))
    await expect(sections.first()).toBeVisible()
    await expect(sections.filter({ visible: true })).toHaveCount(1)
    await expect(page.locator("#todo-count")).toContainText("hidden")
  })

  test("accepts the recommendation and copies it", async ({ page }) => {
    const item = page.locator(".todo-item[data-todo-recommended]").first()
    test.skip((await item.count()) === 0, "no recommended todo")
    const recommended = await item.getAttribute("data-todo-recommended")

    await item.locator("[data-accept]").click()

    await expect(
      item.locator(`.todo-action input[value="${recommended}"]`),
    ).toBeChecked()
    await expect(page.locator("#todo-status")).toContainText("Accepted")

    await page.locator("#todo-copy").click()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.copied))
      .toContain(`\n  > ${recommended}`)
  })

  test("moves to the next unanswered todo", async ({ page }) => {
    const unanswered = page.locator(".todo-item:not([hidden])")
    const keys = await unanswered.evaluateAll((items) =>
      items.slice(0, 2).map((item) => (item as HTMLElement).dataset.todoKey),
    )
    const activeKey = () =>
      page.evaluate(
        () =>
          (document.activeElement?.closest(".todo-item") as HTMLElement | null)
            ?.dataset.todoKey,
      )

    await page.locator("#todo-next").click()
    expect(await activeKey()).toBe(keys[0])
    await page.locator("#todo-next").click()
    expect(await activeKey()).toBe(keys[1])
  })
})

import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { FRAMEWORKS, openFixture } from "./fixtures"
import type { Framework } from "./fixtures"

const example = async (
  page: Page,
  framework: Framework,
  component: string,
  name: string,
) => {
  await openFixture(page, framework, component)
  const locator = page.locator(`[data-example="${name}"]`)
  test.skip((await locator.count()) === 0, `no ${framework} ${name} example`)
  return locator
}

const expectFocusWithin = (locator: Locator) =>
  expect
    .poll(() => locator.evaluate((el) => el.contains(document.activeElement)))
    .toBe(true)

for (const framework of FRAMEWORKS) {
  test.describe(framework, () => {
    test("accordion toggles with click and keyboard", async ({ page }) => {
      const root = await example(page, framework, "accordion", "Basics")
      const details = root.locator("details").first()
      const summary = details.locator("summary")

      await summary.click()
      await expect(details).toHaveAttribute("open")
      await summary.press("Enter")
      await expect(details).not.toHaveAttribute("open")
      await summary.press("Space")
      await expect(details).toHaveAttribute("open")
    })

    test("accordion group keeps one item open", async ({ page }) => {
      const root = await example(page, framework, "accordion", "GroupSingle")
      const items = root.locator("details")

      await items.nth(0).locator("summary").click()
      await items.nth(1).locator("summary").click()
      await expect(items.nth(1)).toHaveAttribute("open")
      await expect(items.nth(0)).not.toHaveAttribute("open")
    })

    test("dialog opens, traps focus and closes with Escape", async ({
      page,
    }) => {
      const root = await example(page, framework, "dialog", "Usage")
      const trigger = root.getByRole("button", { name: "Open dialog" })
      const dialog = root.locator("dialog")

      await trigger.click()
      await expect(dialog).toBeVisible()
      await expectFocusWithin(dialog)
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")
      await expectFocusWithin(dialog)

      await page.keyboard.press("Escape")
      await expect(dialog).toBeHidden()
      await expect(trigger).toBeFocused()
    })

    test("dialog closes from its actions", async ({ page }) => {
      const root = await example(page, framework, "dialog", "Usage")
      const dialog = root.locator("dialog")

      await root.getByRole("button", { name: "Open dialog" }).click()
      await dialog.getByRole("button", { name: "Cancel" }).click()
      await expect(dialog).toBeHidden()
    })

    test("drawer opens and closes with Escape", async ({ page }) => {
      const root = await example(page, framework, "drawer", "Usage")
      const trigger = root.getByRole("button", { name: "Inline Start" })

      await trigger.click()
      const drawer = root.locator("dialog[open]")
      await expect(drawer).toBeVisible()
      await expectFocusWithin(drawer)

      await page.keyboard.press("Escape")
      await expect(drawer).toHaveCount(0)
      await expect(trigger).toBeFocused()
    })

    test("select picks an option with the keyboard", async ({ page }) => {
      const root = await example(page, framework, "select", "Variants")
      const select = root.locator("select").first()

      await select.focus()
      await page.keyboard.press("Space")
      await expect
        .poll(() => select.evaluate((el) => el.matches(":open")))
        .toBe(true)
      const before = await select.inputValue()
      await page.keyboard.press("ArrowDown")
      await page.keyboard.press("Enter")
      await expect.poll(() => select.inputValue()).not.toBe(before)
      await expect
        .poll(() => select.evaluate((el) => el.matches(":open")))
        .toBe(false)
    })

    test("tabs switch panels with click and arrow keys", async ({ page }) => {
      const root = await example(page, framework, "tabs", "Basics")
      const tabs = root.getByRole("tab")
      const panels = root.locator('[role="tabpanel"]')

      await expect(panels.nth(0)).toBeVisible()
      await expect(panels.nth(1)).toBeHidden()

      await tabs.nth(1).click()
      await expect(panels.nth(1)).toBeVisible()
      await expect(panels.nth(0)).toBeHidden()

      await page.keyboard.press("ArrowRight")
      await expect(panels.nth(2)).toBeVisible()
      await expect(panels.nth(1)).toBeHidden()
    })

    test("toast shows and can be dismissed", async ({ page }) => {
      const root = await example(page, framework, "toast", "HTML")

      await root.getByRole("button", { name: "Show Default Toast" }).click()
      const toast = page.locator("#toast-manager .ui-toast")
      await expect(toast).toHaveCount(1)
      await expect(toast).toContainText("Default Notification")

      await toast.getByRole("button", { name: "Close" }).click()
      await expect(toast).toHaveCount(0)
    })

    test("tooltip shows on hover and toggles on click", async ({ page }) => {
      const root = await example(page, framework, "tooltip", "Basics")
      const trigger = root.getByRole("button", { name: "Save" })
      const tooltip = root.getByText("Save your changes")

      const supportsInterest = await page.evaluate(
        () => "interestForElement" in HTMLButtonElement.prototype,
      )

      await expect(tooltip).toBeHidden()
      if (supportsInterest) {
        await trigger.hover()
        await expect(tooltip).toBeVisible()
        await page.mouse.move(0, 0)
        await expect(tooltip).toBeHidden()
      }

      await trigger.click()
      await expect(tooltip).toBeVisible()
    })
  })
}

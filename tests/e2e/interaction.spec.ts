import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { FRAMEWORKS, hasExample, openFixture } from "./fixtures"
import type { Framework } from "./fixtures"

type Interaction = (context: {
  framework: Framework
  page: Page
  root: Locator
}) => Promise<void>

const interaction = (
  component: string,
  name: string,
  title: string,
  run: Interaction,
  frameworks: readonly Framework[] = FRAMEWORKS,
) => {
  const available = frameworks.filter((framework) =>
    hasExample(framework, component, name),
  )
  if (available.length === 0) {
    throw new Error(`no ${component}/${name} example in any framework`)
  }
  for (const framework of available) {
    test(`${framework} ${title}`, async ({ page }) => {
      await openFixture(page, framework, component)
      const root = page.locator(`[data-example="${name}"]`)
      await expect(root, `${framework} ${component}/${name}`).toHaveCount(1)
      await run({ framework, page, root })
    })
  }
}

const expectFocusWithin = (locator: Locator) =>
  expect
    .poll(() => locator.evaluate((el) => el.contains(document.activeElement)))
    .toBe(true)

interaction(
  "accordion",
  "Basics",
  "accordion toggles with click and keyboard",
  async ({ root }) => {
    const details = root.locator("details").first()
    const summary = details.locator("summary")

    await summary.click()
    await expect(details).toHaveAttribute("open")
    await summary.press("Enter")
    await expect(details).not.toHaveAttribute("open")
    await summary.press("Space")
    await expect(details).toHaveAttribute("open")
  },
)

interaction(
  "accordion",
  "GroupSingle",
  "accordion group keeps one item open",
  async ({ root }) => {
    const items = root.locator("details")

    await items.nth(0).locator("summary").click()
    await items.nth(1).locator("summary").click()
    await expect(items.nth(1)).toHaveAttribute("open")
    await expect(items.nth(0)).not.toHaveAttribute("open")
  },
)

interaction(
  "combobox",
  "Basics",
  "combobox shows the checked option in the field",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Fruit" })
    const list = root.locator(".ui-list")

    await trigger.click()
    await expect(list).toBeVisible()
    await list.getByText("Cherry").click()
    await expect(root.getByRole("radio", { name: "Cherry" })).toBeChecked()

    await page.keyboard.press("Escape")
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAccessibleName("Fruit Cherry")
    await expect(root.getByText("Cherry")).toBeVisible()
    await expect(root.getByText("Apple")).toBeHidden()
    await expect(root.getByText("Pick a fruit")).toBeHidden()
  },
)

interaction(
  "combobox",
  "Basics",
  "combobox picks an option with the keyboard",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Fruit" })

    await trigger.focus()
    await page.keyboard.press("Enter")
    await page.keyboard.press("Tab")
    await expect(root.getByRole("radio", { name: "Apple" })).toBeFocused()
    await page.keyboard.press("ArrowDown")
    await expect(root.getByRole("radio", { name: "Banana" })).toBeChecked()

    await page.keyboard.press("Escape")
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAccessibleName("Fruit Banana")
    await page.keyboard.press("Tab")
    await expect
      .poll(() => root.evaluate((el) => el.contains(document.activeElement)))
      .toBe(false)
  },
)

interaction(
  "combobox",
  "Multiple",
  "combobox checks several options",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Toppings" })

    await expect(trigger).toHaveAccessibleName("Toppings Basil Mozzarella")
    await trigger.click()
    await root.getByText("Olives").click()
    await root.getByText("Basil").click()
    await expect(root.getByRole("checkbox", { checked: true })).toHaveCount(2)

    await page.keyboard.press("Escape")
    await expect(trigger).toHaveAccessibleName("Toppings Mozzarella Olives")
    await expect(root.getByText("Mushrooms")).toBeHidden()
  },
)

interaction(
  "dialog",
  "Usage",
  "dialog opens, traps focus and closes with Escape",
  async ({ page, root }) => {
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
  },
)

interaction(
  "dialog",
  "Usage",
  "dialog closes from its actions",
  async ({ root }) => {
    const dialog = root.locator("dialog")

    await root.getByRole("button", { name: "Open dialog" }).click()
    await dialog.getByRole("button", { name: "Cancel" }).click()
    await expect(dialog).toBeHidden()
  },
)

interaction(
  "drawer",
  "Usage",
  "drawer opens and closes with Escape",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Inline Start" })

    await trigger.click()
    const drawer = root.locator("dialog[open]")
    await expect(drawer).toBeVisible()
    await expectFocusWithin(drawer)

    await page.keyboard.press("Escape")
    await expect(drawer).toHaveCount(0)
    await expect(trigger).toBeFocused()
  },
)

interaction(
  "range",
  "Value",
  "range moves with the keyboard and shows its value",
  async ({ framework, page, root }) => {
    const slider = root.locator('input[type="range"]')
    const before = Number(await slider.inputValue())

    await slider.focus()
    await page.keyboard.press("ArrowRight")
    await expect(slider).toHaveValue(String(before + 1))
    if (framework !== "html") {
      await expect(root.locator("output")).toHaveText(`${before + 1}°`)
    }
  },
)

interaction(
  "select",
  "Variants",
  "select picks an option with the keyboard",
  async ({ page, root }) => {
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
  },
)

interaction(
  "tabs",
  "Basics",
  "tabs switch panels with click and arrow keys",
  async ({ page, root }) => {
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
  },
)

interaction(
  "toast",
  "HTML",
  "toast shows and can be dismissed",
  async ({ page, root }) => {
    await root.getByRole("button", { name: "Show Default Toast" }).click()
    const toast = page.locator("#toast-manager .ui-toast")
    await expect(toast).toHaveCount(1)
    await expect(toast).toContainText("Default Notification")

    await toast.getByRole("button", { name: "Close" }).click()
    await expect(toast).toHaveCount(0)
  },
)

interaction(
  "toggle",
  "Interactive",
  "toggle group selects one option at a time",
  async ({ page, root }) => {
    const options = root.getByRole("radio")

    await expect(options.nth(0)).toBeChecked()
    await root.getByText("Cycling").click()
    await expect(options.nth(1)).toBeChecked()
    await expect(options.nth(0)).not.toBeChecked()

    await page.keyboard.press("ArrowRight")
    await expect(options.nth(2)).toBeChecked()
    await expect(options.nth(1)).not.toBeChecked()
  },
)

interaction(
  "toggle",
  "MultiSelect",
  "toggle group presses several options",
  async ({ root }) => {
    const options = root.getByRole("checkbox")

    await root.getByText("B").click()
    await root.getByText("I").click()
    await expect(options.nth(0)).toBeChecked()
    await expect(options.nth(1)).toBeChecked()
    await expect(options.nth(2)).not.toBeChecked()

    await root.getByText("B").click()
    await expect(options.nth(0)).not.toBeChecked()
  },
)

interaction(
  "tooltip",
  "Basics",
  "tooltip shows on hover and toggles on click",
  async ({ page, root }) => {
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
  },
)

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
  "anchor",
  "RepoCard",
  "hover card shows on hover",
  async ({ page, root }) => {
    const trigger = root.getByRole("link", { name: "felix-bohlin/ui" })
    const card = root.getByText("Public repository")

    const supportsInterest = await page.evaluate(
      () => "interestForElement" in HTMLAnchorElement.prototype,
    )
    test.skip(!supportsInterest, "needs interest invokers")

    await expect(card).toBeHidden()
    await trigger.hover()
    await expect(card).toBeVisible()
    await page.mouse.move(0, 0)
    await expect(card).toBeHidden()
  },
)

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
  "checkbox",
  "FieldGroupBinding",
  "checkbox group binds the checked values",
  async ({ root }) => {
    const apples = root.getByRole("checkbox", { name: "Apples" })
    const bananas = root.getByRole("checkbox", { name: "Bananas" })
    const selection = root.getByText(/Selected:/)

    await expect(apples).toBeChecked()
    await expect(selection).toHaveText("Selected: apples")
    await root.getByText("Bananas", { exact: true }).click()
    await expect(bananas).toBeChecked()
    await expect(selection).toHaveText("Selected: apples, bananas")
    await root.getByText("Apples", { exact: true }).click()
    await expect(apples).not.toBeChecked()
    await expect(selection).toHaveText("Selected: bananas")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(apples).toBeChecked()
    await expect(bananas).not.toBeChecked()
    await expect(selection).toHaveText("Selected: apples")
  },
)

interaction(
  "dialog",
  "Basics",
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
  "Basics",
  "dialog closes from its actions",
  async ({ root }) => {
    const dialog = root.locator("dialog")

    await root.getByRole("button", { name: "Open dialog" }).click()
    await dialog.getByRole("button", { name: "Not now" }).click()
    await expect(dialog).toBeHidden()
  },
)

interaction(
  "drawer",
  "Basics",
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
  "radio",
  "FieldGroupBinding",
  "radio group binds the selected value and resets",
  async ({ root }) => {
    const free = root.getByRole("radio", { name: "Free" })
    const pro = root.getByRole("radio", { name: "Pro" })
    const selection = root.getByText(/Selected:/)

    await expect(free).toBeChecked()
    await root.getByText("Pro", { exact: true }).click()
    await expect(pro).toBeChecked()
    await expect(selection).toHaveText("Selected: pro")
    await root.getByText("Free", { exact: true }).click()
    await expect(free).toBeChecked()
    await expect(selection).toHaveText("Selected: free")
    await root.getByText("Pro", { exact: true }).click()
    await expect(pro).toBeChecked()

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(free).toBeChecked()
    await expect(pro).not.toBeChecked()
    await expect(selection).toHaveText("Selected: free")
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
    test.skip(
      test.info().project.name === "firefox" &&
        !(await page.evaluate(() => CSS.supports("appearance", "base-select"))),
      "Firefox's native select picker ignores synthesized keys",
    )
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
  "select",
  "Variants",
  "select keeps its padding when a script adds the button",
  async ({ root }) => {
    const padding = await root
      .locator("select")
      .first()
      .evaluate((select) => {
        if (!select.querySelector("button")) {
          select.prepend(document.createElement("button"))
        }
        const text = CSS.supports("appearance", "base-select")
          ? select.querySelector("button")!
          : select
        return getComputedStyle(text).paddingInlineStart
      })
    expect(padding).not.toBe("0px")
  },
  ["html"],
)

interaction(
  "list",
  "EndSwitch",
  "a size class on a switch in a list row wins over the list size",
  async ({ root }) => {
    const label = root.locator("label.ui-switch").first()
    const width = () =>
      label
        .locator("input")
        .evaluate((input) => input.getBoundingClientRect().width)
    const small = await width()
    await label.evaluate((element) => element.classList.add("ui-large"))
    expect(await width()).toBeGreaterThan(small)
  },
  ["html"],
)

interaction(
  "switch",
  "FieldGroupBinding",
  "switch group binds the checked values",
  async ({ root }) => {
    const email = root.getByRole("switch", { name: "Email" })
    const push = root.getByRole("switch", { name: "Push" })
    const selection = root.getByText(/Selected:/)

    await expect(email).toBeChecked()
    await expect(selection).toHaveText("Selected: email")
    await root.getByText("Push", { exact: true }).click()
    await expect(push).toBeChecked()
    await expect(selection).toHaveText("Selected: email, push")
    await root.getByText("Email", { exact: true }).click()
    await expect(email).not.toBeChecked()
    await expect(selection).toHaveText("Selected: push")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(email).toBeChecked()
    await expect(push).not.toBeChecked()
    await expect(selection).toHaveText("Selected: email")
  },
)

interaction(
  "tabs",
  "Basics",
  "tabs switch panels with click and arrow keys",
  async ({ page, root }) => {
    const tabs = root.locator(".ui-tab-label")
    const panels = root.locator(".ui-tab-panel")

    await expect(panels.nth(0)).toBeVisible()
    await expect(panels.nth(1)).toBeHidden()

    await tabs.nth(1).click()
    await expect(root.getByRole("radio", { name: "Settings" })).toBeChecked()
    await expect(panels.nth(1)).toBeVisible()
    await expect(panels.nth(0)).toBeHidden()

    await page.keyboard.press("ArrowRight")
    await expect(panels.nth(2)).toBeVisible()
    await expect(panels.nth(1)).toBeHidden()
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
  "tooltip shows on hover",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Save" })
    const tooltip = root.getByText("Save your changes")

    const supportsInterest = await page.evaluate(
      () => "interestForElement" in HTMLButtonElement.prototype,
    )
    test.skip(!supportsInterest, "needs interest invokers")

    await expect(tooltip).toBeHidden()
    await trigger.hover()
    await expect(tooltip).toBeVisible()
    await page.mouse.move(0, 0)
    await expect(tooltip).toBeHidden()
  },
)

interaction(
  "tooltip",
  "Basics",
  "tooltip toggles on click",
  async ({ root }) => {
    const trigger = root.getByRole("button", { name: "Save" })
    const tooltip = root.getByText("Save your changes")

    await expect(tooltip).toBeHidden()
    await trigger.click()
    await expect(tooltip).toBeVisible()
  },
)

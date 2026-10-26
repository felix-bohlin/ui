import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import {
  computed,
  FRAMEWORKS,
  hasExample,
  openFixture,
  resolveColor,
} from "./fixtures"
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
  "checkbox",
  "Indeterminate",
  "a select all checkbox is indeterminate while some children are checked",
  async ({ root }) => {
    const all = root.getByRole("checkbox", { name: "Select all" })
    const children = root.locator(".ui-field-group").getByRole("checkbox")
    const indeterminate = () =>
      all.evaluate((input) => (input as HTMLInputElement).indeterminate)

    await expect.poll(indeterminate).toBe(true)
    await expect(all).not.toBeChecked()

    await root.getByText("Select all", { exact: true }).click()
    await expect.poll(indeterminate).toBe(false)
    await expect(all).toBeChecked()
    for (const child of await children.all()) await expect(child).toBeChecked()

    await root.getByText("Bananas", { exact: true }).click()
    await expect.poll(indeterminate).toBe(true)
    await expect(all).not.toBeChecked()

    await root.getByText("Bananas", { exact: true }).click()
    await expect.poll(indeterminate).toBe(false)
    await expect(all).toBeChecked()
  },
)

interaction(
  "checkbox",
  "Validation",
  "a required checkbox only looks invalid once the user unchecks it",
  async ({ page, root }) => {
    const input = root.getByRole("checkbox").first()
    const border = () => computed(input, "border-block-start-color")
    const invalid = await resolveColor(input, "var(--ui-invalid)")

    await expect(input).toHaveAttribute("required")
    expect(await border()).not.toBe(invalid)
    await input.focus()
    await page.keyboard.press("Space")
    await expect(input).toBeChecked()
    await page.keyboard.press("Space")
    await expect(input).not.toBeChecked()
    await expect.poll(border).toBe(invalid)
  },
)

interaction(
  "dialog",
  "Basics",
  "dialog keeps Tab off the page behind it and closes with Escape",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Open dialog" })
    const dialog = root.locator("dialog")

    await trigger.click()
    await expect(dialog).toBeVisible()
    await expectFocusWithin(dialog)

    const buttons = dialog.getByRole("button")
    const count = await buttons.count()
    for (let press = 1; press <= 2 * (count + 1); press++) {
      await page.keyboard.press("Tab")
      const behind = await dialog.evaluate((element) => {
        const active = document.activeElement
        return active !== document.body && !element.contains(active)
      })
      expect(behind, `Tab ${press} lands behind the dialog`).toBe(false)
    }

    await buttons.first().focus()
    for (let index = 1; index < count; index++) {
      await page.keyboard.press("Tab")
      await expect(
        buttons.nth(index),
        "Tab moves to the next button",
      ).toBeFocused()
    }

    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  },
)

interaction(
  "dialog",
  "Basics",
  "dialog closes from its actions and returns focus",
  async ({ root }) => {
    const trigger = root.getByRole("button", { name: "Open dialog" })
    const dialog = root.locator("dialog")

    await trigger.click()
    await dialog.getByRole("button", { name: "Not now" }).click()
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
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

const clickBackdrop = async (page: Page, dialog: Locator) => {
  const box = (await dialog.boundingBox())!
  const { height, width } = page.viewportSize()!
  await page.mouse.click(
    box.x > width / 2 ? 5 : width - 5,
    Math.min(height - 5, box.y + box.height / 2),
  )
}

for (const component of ["dialog", "drawer"]) {
  interaction(
    component,
    "CloseBehaviors",
    `${component} closes the way its closedby says`,
    async ({ page, root }) => {
      test.fail(
        !(await page.evaluate(() => "closedBy" in HTMLDialogElement.prototype)),
        "needs the closedby attribute on dialog",
      )
      const trigger = root.getByRole("button", { name: /^Open / })
      const dialog = root.locator("dialog")
      const open = async (closedby: string) => {
        await trigger.click()
        await expect(dialog).toBeVisible()
        await dialog.getByText(closedby, { exact: true }).click()
        await expect(dialog).toHaveAttribute("closedby", closedby)
      }

      await open("any")
      await page.keyboard.press("Escape")
      await expect(dialog).toBeHidden()
      await open("any")
      await clickBackdrop(page, dialog)
      await expect(dialog).toBeHidden()

      await open("closerequest")
      await clickBackdrop(page, dialog)
      await expect(dialog).toBeVisible()
      await page.keyboard.press("Escape")
      await expect(dialog).toBeHidden()

      await open("none")
      await clickBackdrop(page, dialog)
      await page.keyboard.press("Escape")
      await expect(dialog).toBeVisible()
      await dialog.getByRole("button", { name: "Close manually" }).click()
      await expect(dialog).toBeHidden()
    },
  )
}

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
  "radio",
  "FieldGroupControlled",
  "checked-driven radios follow the state and reset",
  async ({ root }) => {
    const standard = root.getByRole("radio", { name: "Standard" })
    const express = root.getByRole("radio", { name: "Express" })
    const selection = root.getByText(/Selected:/)

    await expect(standard).toBeChecked()
    for (const name of ["Express", "Standard", "Express"]) {
      await root.getByText(name, { exact: true }).click()
    }
    await expect(express).toBeChecked()
    await expect(standard).not.toBeChecked()
    await expect(selection).toHaveText("Selected: express")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(standard).toBeChecked()
    await expect(express).not.toBeChecked()
    await expect(selection).toHaveText("Selected: standard")
  },
)

interaction(
  "range",
  "Value",
  "range moves with the keyboard and shows its value",
  async ({ page, root }) => {
    const slider = root.locator('input[type="range"]')
    const before = Number(await slider.inputValue())

    await expect(root.locator("output")).toHaveAttribute("aria-live", "off")
    await expect(slider).toHaveAttribute("aria-valuetext", `${before}°`)
    await slider.focus()
    await page.keyboard.press("ArrowRight")
    await expect(slider).toHaveValue(String(before + 1))
    await expect(root.locator("output")).toHaveText(`${before + 1}°`)
    await expect(slider).toHaveAttribute("aria-valuetext", `${before + 1}°`)
  },
)

interaction(
  "range",
  "Value",
  "range shows its value again after a form reset",
  async ({ page, root }) => {
    const slider = root.locator('input[type="range"]')
    const output = root.locator("output")
    const before = await slider.inputValue()

    await slider.focus()
    await page.keyboard.press("End")
    await expect(output).toHaveText("360°")
    await root.getByRole("button", { name: "Reset" }).click()
    await expect(slider).toHaveValue(before)
    await expect(output).toHaveText(`${before}°`)
    await expect(slider).toHaveAttribute("aria-valuetext", `${before}°`)
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
    const { expected, padding } = await root
      .locator("select")
      .first()
      .evaluate((select) => {
        if (!select.querySelector("button")) {
          select.prepend(document.createElement("button"))
        }
        const text = CSS.supports("appearance", "base-select")
          ? select.querySelector("button")!
          : select
        const probe = document.createElement("div")
        probe.style.paddingInlineStart = "var(--_field-padding-inline)"
        select.parentElement!.append(probe)
        const expected = getComputedStyle(probe).paddingInlineStart
        probe.remove()
        return { expected, padding: getComputedStyle(text).paddingInlineStart }
      })
    expect(expected).not.toBe("0px")
    expect(padding).toBe(expected)
  },
  ["html"],
)

interaction(
  "select",
  "Preselected",
  "select starts on its preselected option and follows a new pick",
  async ({ root }) => {
    const role = root.locator("select").nth(0)
    const team = root.locator("select").nth(1)

    await expect(role).toHaveValue("developer")
    await expect(team).toHaveValue("engineering")
    await role.selectOption("manager")
    await expect(role).toHaveValue("manager")
  },
)

interaction(
  "select",
  "Binding",
  "select binds its value and resets",
  async ({ root }) => {
    const select = root.locator("select")
    const text = root.locator(".select-binding-text")

    await expect(select).toHaveValue("apples")
    await expect(text).toHaveText("Selected: apples")
    await select.selectOption("cherries")
    await expect(text).toHaveText("Selected: cherries")
    await expect(select).toHaveValue("cherries")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(select).toHaveValue("apples")
    await expect(text).toHaveText("Selected: apples")
  },
)

interaction(
  "avatar",
  "Sizes",
  "a small avatar on a span keeps its own font size",
  async ({ root }) => {
    const sizes = await root
      .locator(".ui-avatar.ui-small")
      .first()
      .evaluate((avatar) => {
        const span = document.createElement("span")
        span.className = avatar.className
        span.textContent = avatar.textContent
        avatar.after(span)
        const sizes = [avatar, span].map(
          (element) => getComputedStyle(element).fontSize,
        )
        span.remove()
        return sizes
      })
    expect(sizes[1]).toBe(sizes[0])
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
    const tabs = root.locator(".ui-tabs > .ui-label")
    const panels = root.locator(".ui-tabs > .ui-panel")

    await expect(panels.nth(0)).toBeVisible()
    await expect(panels.nth(1)).toBeHidden()

    await tabs.nth(1).click()
    await expect(root.getByRole("radio", { name: "Settings" })).toBeChecked()
    await expect(panels.nth(1)).toBeVisible()
    await expect(panels.nth(0)).toBeHidden()

    await page.keyboard.press("ArrowRight")
    await expect(panels.nth(2)).toBeVisible()
    await expect(panels.nth(1)).toBeHidden()

    await page.keyboard.press("ArrowRight")
    await expect(root.getByRole("radio", { name: "Profile" })).toBeChecked()
    await expect(panels.nth(0)).toBeVisible()
    await expect(panels.nth(2)).toBeHidden()

    await page.keyboard.press("ArrowLeft")
    await expect(
      root.getByRole("radio", { name: "Notifications" }),
    ).toBeChecked()
    await expect(panels.nth(2)).toBeVisible()
    await expect(panels.nth(0)).toBeHidden()
  },
)

interaction(
  "tabs",
  "Overflow",
  "overflow tabs scroll the focused tab into view",
  async ({ page, root }) => {
    test.skip(
      !(await page.evaluate(() => CSS.supports("order", "sibling-index()"))),
      "needs sibling-index()",
    )
    const tabs = root.locator(".ui-tabs")
    const inputs = tabs.locator(":scope > .ui-input")
    const labels = tabs.locator(":scope > .ui-label")
    const count = await labels.count()

    await tabs.evaluate((element) => (element.style.inlineSize = "16rem"))
    expect(
      await tabs.evaluate(
        (element) => element.scrollWidth > element.clientWidth,
      ),
    ).toBe(true)

    await labels.first().click()
    for (let index = 1; index < count; index++) {
      await page.keyboard.press("ArrowRight")
    }
    await expect(inputs.last()).toBeFocused()
    await expect
      .poll(() =>
        tabs.evaluate((element) => {
          const box = element.getBoundingClientRect()
          const last = [...element.querySelectorAll(":scope > .ui-label")]
            .at(-1)!
            .getBoundingClientRect()
          return last.left >= box.left - 1 && last.right <= box.right + 1
        }),
      )
      .toBe(true)
  },
)

interaction(
  "tabs",
  "Binding",
  "bound tabs report the selected tab and reset",
  async ({ root }) => {
    const profile = root.getByRole("radio", { name: "Profile" })
    const settings = root.getByRole("radio", { name: "Settings" })
    const selection = root.getByText(/Selected:/)

    await expect(settings).toBeChecked()
    await expect(selection).toHaveText("Selected: settings")
    await root.getByText("Profile", { exact: true }).click()
    await expect(profile).toBeChecked()
    await expect(settings).not.toBeChecked()
    await expect(selection).toHaveText("Selected: profile")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(settings).toBeChecked()
    await expect(profile).not.toBeChecked()
    await expect(selection).toHaveText("Selected: settings")
  },
)

interaction(
  "text-field",
  "Binding",
  "text field binds its value and resets",
  async ({ root }) => {
    const input = root.getByRole("textbox", { name: "Name" })
    const text = root.locator(".text-field-binding-text")

    await expect(input).toHaveValue("Ada")
    await expect(text).toHaveText("Hello, Ada.")
    await input.fill("Grace")
    await expect(text).toHaveText("Hello, Grace.")
    await input.fill("")
    await expect(text).toHaveText("Hello, stranger.")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(input).toHaveValue("Ada")
    await expect(text).toHaveText("Hello, Ada.")
  },
)

interaction(
  "text-field",
  "Validation",
  "a required text field only looks invalid once the user leaves it empty",
  async ({ page, root }) => {
    const textField = root
      .locator(".ui-text-field")
      .filter({ hasText: "I'm required" })
    const input = textField.getByRole("textbox")
    const field = textField.locator(".ui-field")
    const border = () => computed(field, "border-block-end-color")
    const invalid = await resolveColor(field, "var(--ui-invalid)")
    const initial = await border()

    await expect(input).toHaveAttribute("required")
    expect(initial).not.toBe(invalid)
    await input.focus()
    await page.keyboard.type("a")
    await page.keyboard.press("Backspace")
    await page.keyboard.press("Tab")
    await expect.poll(border).toBe(invalid)

    await input.focus()
    await page.keyboard.type("Ada")
    await page.keyboard.press("Tab")
    await expect.poll(border).toBe(initial)
  },
)

interaction(
  "textarea",
  "Binding",
  "textarea binds its value and resets",
  async ({ root }) => {
    const textarea = root.getByRole("textbox", { name: "Message" })
    const text = root.locator(".textarea-binding-text")

    await expect(textarea).toHaveValue("Thanks for the update.")
    await expect(text).toHaveText("22 characters")
    await textarea.fill("Hi")
    await expect(text).toHaveText("2 characters")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(textarea).toHaveValue("Thanks for the update.")
    await expect(text).toHaveText("22 characters")
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
  "toggle",
  "Binding",
  "toggle groups bind their values and reset",
  async ({ root }) => {
    const text = root.locator(".toggle-binding-text")

    await expect(text).toHaveText("View: week. Format: bold.")
    await root.getByText("Month", { exact: true }).click()
    await expect(text).toHaveText("View: month. Format: bold.")
    await root.getByText("Italic", { exact: true }).click()
    await expect(text).toHaveText("View: month. Format: bold, italic.")
    await root.getByText("Bold", { exact: true }).click()
    await expect(text).toHaveText("View: month. Format: italic.")

    await root.getByRole("button", { name: "Reset" }).click()
    await expect(text).toHaveText("View: week. Format: bold.")
    await expect(root.getByRole("radio", { name: "Week" })).toBeChecked()
    await expect(root.getByRole("checkbox", { name: "Bold" })).toBeChecked()
    await expect(
      root.getByRole("checkbox", { name: "Italic" }),
    ).not.toBeChecked()
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
  "tooltip toggles on click without hover",
  async ({ root }) => {
    const trigger = root.getByRole("button", { name: "Save" })
    const tooltip = root.getByText("Save your changes")

    await expect(tooltip).toBeHidden()
    await trigger.dispatchEvent("click")
    await expect(tooltip).toBeVisible()
    await trigger.dispatchEvent("click")
    await expect(tooltip).toBeHidden()
  },
)

interaction(
  "badge",
  "Indicator",
  "the badge label is only for screen readers",
  async ({ root }) => {
    const label = root.locator(".ui-sr-only").first()

    await expect(label).toHaveText("5 unread messages")
    const box = await label.boundingBox()
    expect(box?.width).toBeLessThanOrEqual(1)
    expect(box?.height).toBeLessThanOrEqual(1)
  },
)

interaction(
  "button-group",
  "SplitButton",
  "split button opens its menu",
  async ({ root }) => {
    const menu = root.locator("menu.ui-menu")

    await expect(menu).toBeHidden()
    await root.getByRole("button", { name: "More save options" }).click()
    await expect(menu).toBeVisible()
    await menu.getByRole("button", { name: "Save as draft" }).click()
    await expect(menu).toBeHidden()
  },
)

interaction(
  "carousel",
  "Basics",
  "the next button scrolls the carousel",
  async ({ page, root }) => {
    const carousel = root.locator(".ui-carousel")

    const supportsScrollButtons = await page.evaluate(() =>
      CSS.supports("selector(::scroll-button(*))"),
    )
    test.skip(!supportsScrollButtons, "needs ::scroll-button()")

    await carousel.scrollIntoViewIfNeeded()
    const point = await carousel.evaluate((element) => {
      const style = getComputedStyle(element, "::scroll-button(inline-end)")
      let block = element.parentElement
      while (block && getComputedStyle(block).position === "static") {
        block = block.parentElement
      }
      const edge = (block ?? document.documentElement).getBoundingClientRect()
      const box = element.getBoundingClientRect()
      return {
        x: edge.right - parseFloat(style.right) - parseFloat(style.width) / 2,
        y: box.top + box.height / 2,
      }
    })
    await page.mouse.click(point.x, point.y)
    await expect
      .poll(() => carousel.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0)
  },
)

const markerPoint = (carousel: Locator, index: number) =>
  carousel.evaluate((element, index) => {
    const style = getComputedStyle(element)
    const group = getComputedStyle(element, "::scroll-marker-group")
    const marker = getComputedStyle(element.children[0], "::scroll-marker")
    const box = element.getBoundingClientRect()
    const start = box.left + parseFloat(style.marginInlineStart)
    const end = box.right - parseFloat(style.marginInlineEnd)
    const size = parseFloat(marker.inlineSize)
    const gap = parseFloat(group.columnGap) || 0
    const count = element.children.length
    const row = count * size + (count - 1) * gap
    return {
      x: (start + end) / 2 - row / 2 + index * (size + gap) + size / 2,
      y:
        box.bottom +
        parseFloat(group.marginBlockStart) +
        parseFloat(marker.blockSize) / 2,
    }
  }, index)

const currentMarker = (carousel: Locator) =>
  carousel.evaluate((element) => {
    const colors = [...element.children].map(
      (item) => getComputedStyle(item, "::scroll-marker").backgroundColor,
    )
    return colors.findIndex(
      (color) => colors.filter((other) => other === color).length === 1,
    )
  })

interaction(
  "carousel",
  "Basics",
  "a marker scrolls to its item and shows as current",
  async ({ page, root }) => {
    const carousel = root.locator(".ui-carousel")

    const supportsMarkers = await page.evaluate(() =>
      CSS.supports("selector(::scroll-marker)"),
    )
    test.skip(!supportsMarkers, "needs ::scroll-marker")

    await carousel.scrollIntoViewIfNeeded()
    expect(await currentMarker(carousel)).toBe(0)
    const point = await markerPoint(carousel, 2)
    await page.mouse.click(point.x, point.y)
    await expect.poll(() => currentMarker(carousel)).toBe(2)
    await expect
      .poll(() =>
        carousel.evaluate((element) => {
          const box = element.getBoundingClientRect()
          const item = element.children[2].getBoundingClientRect()
          return item.left >= box.left && item.left < box.left + box.width / 2
        }),
      )
      .toBe(true)
  },
)

interaction(
  "carousel",
  "Basics",
  "a carousel jumps instead of scrolling smoothly when motion is off",
  async ({ page, root }) => {
    const carousel = root.locator(".ui-carousel")

    const supportsMarkers = await page.evaluate(() =>
      CSS.supports("selector(::scroll-marker)"),
    )
    test.skip(!supportsMarkers, "needs ::scroll-marker")

    expect(await computed(carousel, "scroll-behavior")).toBe("smooth")
    await page.emulateMedia({ reducedMotion: "reduce" })
    await expect.poll(() => computed(carousel, "scroll-behavior")).toBe("auto")
    await page.emulateMedia({ reducedMotion: "no-preference" })
    await expect
      .poll(() => computed(carousel, "scroll-behavior"))
      .toBe("smooth")

    await carousel.evaluate((element) => element.classList.add("ui-motion-off"))
    expect(await computed(carousel, "scroll-behavior")).toBe("auto")
    await carousel.scrollIntoViewIfNeeded()
    const point = await markerPoint(carousel, 4)
    await page.mouse.click(point.x, point.y)
    const left = await carousel.evaluate((element) => element.scrollLeft)
    expect(left).toBeGreaterThan(0)
    await page.waitForTimeout(300)
    expect(await carousel.evaluate((element) => element.scrollLeft)).toBe(left)
  },
)

interaction(
  "chip",
  "Disabled",
  "a disabled link chip has no href",
  async ({ root }) => {
    const chip = root.locator("a.ui-chip")

    await expect(chip).toHaveText("Tonal link")
    await expect(chip).toHaveAttribute("aria-disabled", "true")
    await expect(chip).not.toHaveAttribute("href")
  },
)

interaction(
  "form",
  "FieldsetRequired",
  "a fieldset with a required field shows the required mark",
  async ({ root }) => {
    const legend = root.locator("legend, .ui-legend").first()

    await expect(legend).toHaveText("Pet info")
    expect(await computed(legend, "content", "::after")).toContain('"*"')
  },
)

interaction(
  "menu",
  "Basics",
  "menu opens from its trigger and closes on an item",
  async ({ root }) => {
    const trigger = root.getByRole("button", { name: "Options" })
    const menu = root.locator("menu.ui-menu")

    await expect(menu).toBeHidden()
    await trigger.click()
    await expect(menu).toBeVisible()
    await menu.getByRole("button", { name: "Delete" }).click()
    await expect(menu).toBeHidden()
  },
)

interaction(
  "menu",
  "Basics",
  "menu closes with Escape and returns focus to the trigger",
  async ({ page, root }) => {
    const trigger = root.getByRole("button", { name: "Options" })
    const menu = root.locator("menu.ui-menu")

    await trigger.focus()
    await page.keyboard.press("Enter")
    await expect(menu).toBeVisible()
    await page.keyboard.press("Tab")
    await expectFocusWithin(menu)
    await page.keyboard.press("Escape")
    await expect(menu).toBeHidden()
    await expect(trigger).toBeFocused()
  },
)

interaction(
  "menu",
  "Basics",
  "menu closes on an outside click",
  async ({ page, root }) => {
    const menu = root.locator("menu.ui-menu")

    await root.getByRole("button", { name: "Options" }).click()
    await expect(menu).toBeVisible()
    await expect(menu.getByRole("button", { name: "Archive" })).toBeDisabled()
    await page.mouse.click(1, 1)
    await expect(menu).toBeHidden()
  },
)

interaction(
  "menu",
  "Manual",
  "a manual menu stays open until Done",
  async ({ page, root }) => {
    const menu = root.locator("menu.ui-menu")

    await root.getByRole("button", { name: "View" }).click()
    await expect(menu).toBeVisible()
    await page.keyboard.press("Escape")
    await page.mouse.click(1, 1)
    await menu.getByRole("button", { name: "Zoom in" }).click()
    await expect(menu).toBeVisible()

    await menu.getByRole("button", { name: "Done" }).click()
    await expect(menu).toBeHidden()
  },
)

interaction(
  "menu",
  "Submenu",
  "submenu opens from its item and an item in it closes both",
  async ({ root }) => {
    const menu = root.locator("menu.ui-menu").first()
    const submenu = menu.locator("menu.ui-menu")

    await root.getByRole("button", { name: "File" }).click()
    await expect(menu).toBeVisible()
    await expect(submenu).toBeHidden()
    await menu.getByRole("button", { name: "Export" }).click()
    await expect(submenu).toBeVisible()
    await submenu.getByRole("button", { name: "PDF" }).click()
    await expect(submenu).toBeHidden()
    await expect(menu).toBeHidden()
  },
)

interaction(
  "table",
  "StickyHeader",
  "the sticky header stays while the body scrolls",
  async ({ root }) => {
    const region = root.locator('[role="region"]')
    const header = region.locator("th").first()
    const cell = region.locator("td").first()

    await region.evaluate((element) => {
      element.scrollTop = element.scrollHeight
    })
    await expect
      .poll(() => region.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0)
    const [regionBox, headerBox, cellBox] = await Promise.all([
      region.boundingBox(),
      header.boundingBox(),
      cell.boundingBox(),
    ])
    expect(Math.abs((headerBox?.y ?? 0) - (regionBox?.y ?? 0))).toBeLessThan(2)
    expect(cellBox?.y).toBeLessThan(regionBox?.y ?? 0)
  },
)

interaction(
  "text-field",
  "Autosuggest",
  "autosuggest lists its options",
  async ({ root }) => {
    const input = root.locator("input[list]").first()

    expect(
      await input.evaluate((element: HTMLInputElement) =>
        [...(element.list?.options ?? [])].map((option) => option.value),
      ),
    ).toEqual(["Jonny Greenwood", "Marika Hackman", "Ray Manzarek"])
  },
)

import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { openFixture } from "./fixtures"

const focusByKeyboard = async (page: Page, locator: Locator) => {
  await page.keyboard.press("Tab")
  await locator.focus()
  await expect(locator).toBeFocused()
}

const choiceBox = (input: Locator) =>
  input.evaluate((element) => {
    const style = getComputedStyle(element)
    const mark = getComputedStyle(element, "::after")
    return {
      border: parseFloat(style.borderTopWidth),
      dotRadius: style.getPropertyValue("--_dot-radius").trim(),
      mark: element.clientWidth - 2 * parseFloat(mark.insetBlockStart),
    }
  })

for (const kind of ["checkbox", "radio"]) {
  test(`--ui-focus-border-width thickens a focused x-small ${kind} and keeps its mark`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/forms", "?theme=govuk")
    const input = page.locator(`label.ui-${kind}.ui-x-small input`).first()
    const before = await choiceBox(input)
    await focusByKeyboard(page, input)
    const focused = await choiceBox(input)

    expect(before.border).toBe(2)
    expect(focused.border).toBe(4)
    expect(focused.dotRadius).toBe(before.dotRadius)
    if (kind === "checkbox") {
      expect(before.mark).toBeGreaterThan(0)
      expect(focused.mark).toBe(before.mark)
    }

    await page.emulateMedia({ forcedColors: "active" })
    expect((await choiceBox(input)).border).toBe(4)
  })

  test(`a focused ${kind} keeps its border width when the theme leaves --ui-focus-border-width unset`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/forms")
    const input = page.locator(`label.ui-${kind}.ui-x-small input`).first()
    const before = await choiceBox(input)
    await focusByKeyboard(page, input)

    expect(await choiceBox(input)).toEqual(before)
  })
}

import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { openFixture, resolveColor, settle } from "./fixtures"

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

const PROBE = `<div id="probe">
  <div class="ui-rich-text" style="inline-size: 10ch; line-height: var(--ui-line-height-tight)">
    <p><a href="#wrapped" id="wrapped">a link long enough to wrap over lines</a></p>
    <p><mark><a href="#marked" id="marked">marked</a></mark></p>
    <p style="writing-mode: vertical-rl"><a href="#vertical" id="vertical">vertical</a></p>
  </div>
  <button class="ui-button ui-filled" id="filled" type="button">Save</button>
  <button class="ui-button ui-filled" aria-disabled="true" id="disabled" type="button">Disabled</button>
</div>`

const openProbe = async (page: Page, search = "") => {
  await openFixture(page, "html", "stress/typography", search)
  await page.evaluate((html) => {
    document.querySelector("main")!.insertAdjacentHTML("afterbegin", html)
  }, PROBE)
}

const focusStyle = async (locator: Locator) => {
  await settle(locator)
  return locator.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      background: style.backgroundColor,
      barBlockEnd: style.borderBlockEndWidth,
      barBottom: style.borderBottomWidth,
      barColor: style.borderBlockEndColor,
      border: style.borderTopColor,
      color: style.color,
      decoration: style.textDecorationLine,
      outline: style.outlineColor,
      outlineWidth: style.outlineWidth,
    }
  })
}

const TRANSPARENT = "rgba(0, 0, 0, 0)"

test("--ui-link-focus: highlight fills a focused link and draws a bar under it", async ({
  page,
}) => {
  await openProbe(page, "?theme=govuk")
  const highlight = await resolveColor(
    page.locator("#probe"),
    "var(--ui-focus-highlight)",
  )
  const onHighlight = await resolveColor(
    page.locator("#probe"),
    "var(--ui-on-focus-highlight)",
  )
  expect(highlight).not.toBe(onHighlight)

  for (const id of ["wrapped", "marked"]) {
    const link = page.locator(`#${id}`)
    await focusByKeyboard(page, link)
    const style = await focusStyle(link)
    expect(style.background, id).toBe(highlight)
    expect(style.color, id).toBe(onHighlight)
    expect(style.barColor, id).toBe(onHighlight)
    expect(style.barBlockEnd, id).toBe("4px")
    expect(style.decoration, id).toBe("none")
    expect(style.outline, id).toBe(TRANSPARENT)
  }
  expect(
    await page
      .locator("#wrapped")
      .evaluate((link) => link.getClientRects().length),
  ).toBeGreaterThan(1)

  const vertical = page.locator("#vertical")
  await focusByKeyboard(page, vertical)
  const style = await focusStyle(vertical)
  expect(style.barBlockEnd).toBe("4px")
  expect(style.barBottom).toBe("0px")
})

test("--ui-button-focus: highlight fills a focused button, and an aria-disabled one keeps the ring", async ({
  page,
}) => {
  await openProbe(page, "?theme=govuk")
  const highlight = await resolveColor(
    page.locator("#probe"),
    "var(--ui-focus-highlight)",
  )

  const filled = page.locator("#filled")
  await focusByKeyboard(page, filled)
  const style = await focusStyle(filled)
  expect(style.background).toBe(highlight)
  expect(style.border).toBe(highlight)
  expect(style.color).toBe(
    await resolveColor(filled, "var(--ui-on-focus-highlight)"),
  )
  expect(style.outline).toBe(TRANSPARENT)

  const disabled = page.locator("#disabled")
  await focusByKeyboard(page, disabled)
  const ring = await focusStyle(disabled)
  expect(ring.background).not.toBe(highlight)
  expect(ring.outline).not.toBe(TRANSPARENT)
})

test("forced colors draw the ring on a link and a button that highlight", async ({
  page,
}) => {
  await openProbe(page, "?theme=govuk")
  await page.emulateMedia({ forcedColors: "active" })
  test.skip(
    !(await page.evaluate(() => matchMedia("(forced-colors: active)").matches)),
    "this engine doesn't emulate forced colors",
  )
  for (const id of ["wrapped", "filled"]) {
    const element = page.locator(`#${id}`)
    await focusByKeyboard(page, element)
    const style = await focusStyle(element)
    expect(style.outline, id).not.toBe(TRANSPARENT)
    expect(parseFloat(style.outlineWidth), id).toBeGreaterThan(0)
  }
})

test("more contrast turns the highlight black or white with readable text", async ({
  page,
}) => {
  await openProbe(page, "?theme=govuk")
  await page.evaluate(() =>
    document.documentElement.classList.add("ui-contrast-more"),
  )
  const link = page.locator("#wrapped")
  await focusByKeyboard(page, link)
  const style = await focusStyle(link)
  expect(style.background).toMatch(/^oklch\([01] 0 0\)$/)
  expect(style.color).toMatch(/^oklch\([01] 0 0\)$/)
  expect(style.color).not.toBe(style.background)
})

test("links and buttons keep the ring when the theme leaves the focus modes unset", async ({
  page,
}) => {
  await openProbe(page)
  for (const id of ["wrapped", "filled"]) {
    const element = page.locator(`#${id}`)
    await focusByKeyboard(page, element)
    const style = await focusStyle(element)
    expect(style.outline, id).not.toBe(TRANSPARENT)
    expect(style.decoration === "none" && id === "wrapped", id).toBe(false)
  }
})

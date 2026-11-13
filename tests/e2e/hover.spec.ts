import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { openFixture, resolveColor, settle } from "./fixtures"

const PROBE = `<div id="probe">
  <button class="ui-button ui-filled" id="filled" type="button">Save</button>
  <button class="ui-button ui-outlined" id="outlined" type="button">Edit</button>
  <button class="ui-button ui-tonal" id="tonal" type="button">Cancel</button>
  <button class="ui-button ui-primary ui-tonal" id="primary-tonal" type="button">Share</button>
</div>`

const openProbe = async (page: Page, search = "") => {
  await openFixture(page, "html", "stress/typography", search)
  await page.evaluate((html) => {
    document.querySelector("main")!.insertAdjacentHTML("afterbegin", html)
  }, PROBE)
}

const lightness = (color: string) => {
  const match = /^oklch\(([\d.]+)/.exec(color)
  expect(match, color).not.toBeNull()
  return Number(match![1])
}

const look = async (locator: Locator) => {
  await settle(locator)
  return locator.evaluate((element) => {
    const style = getComputedStyle(element)
    return { background: style.backgroundColor, color: style.color }
  })
}

const states = async (page: Page, locator: Locator) => {
  await page.mouse.move(0, 0)
  const rest = await look(locator)
  await locator.hover()
  const hover = await look(locator)
  await page.mouse.down()
  const active = await look(locator)
  await page.mouse.up()
  await page.mouse.move(0, 0)
  return { active, hover, rest }
}

const setHover = (page: Page, value: string) =>
  page
    .locator("#probe")
    .evaluate(
      (element, mode) => element.style.setProperty("--ui-button-hover", mode),
      value,
    )

for (const scheme of ["light", "dark"] as const) {
  test(`--ui-button-hover: shade-all shades a tonal button away from the page in ${scheme} mode, a step further when pressed`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await openProbe(page, "?theme=govuk")
    const tonal = page.locator("#tonal")
    const { active, hover, rest } = await states(page, tonal)
    const surface = lightness(
      await resolveColor(page.locator("#probe"), "var(--ui-surface)"),
    )
    const distance = (color: string) => Math.abs(lightness(color) - surface)

    expect(hover.background).toBe(
      await resolveColor(tonal, "var(--ui-surface-tonal-hover)"),
    )
    expect(distance(hover.background)).toBeGreaterThan(
      distance(rest.background),
    )
    expect(distance(active.background)).toBeGreaterThan(
      distance(hover.background),
    )
    expect(hover.color).toBe(rest.color)
    expect(active.color).toBe(rest.color)
  })
}

test("--ui-button-hover: shade-all shades a primary tonal button from its own fill", async ({
  page,
}) => {
  await openProbe(page, "?theme=govuk")
  const button = page.locator("#primary-tonal")
  const { active, hover, rest } = await states(page, button)

  expect(lightness(hover.background)).toBeLessThan(lightness(rest.background))
  expect(lightness(active.background)).toBeLessThan(lightness(hover.background))
  expect(hover.color).toBe(rest.color)
})

test("--ui-button-hover: shade-all shades filled and outlined buttons as when unset", async ({
  page,
}) => {
  await openProbe(page, "?theme=govuk")
  for (const id of ["filled", "outlined"]) {
    const button = page.locator(`#${id}`)
    await setHover(page, "shade-all")
    const shadeAll = await states(page, button)
    await setHover(page, "shade")
    const shade = await states(page, button)

    expect(shadeAll, id).toEqual(shade)
    expect(shadeAll.hover.background, id).not.toBe(shadeAll.rest.background)
  }
  const filled = await states(page, page.locator("#filled"))
  expect(lightness(filled.hover.background)).toBeLessThan(
    lightness(filled.rest.background),
  )
})

test("a tonal button fills with the accent on hover when the theme leaves --ui-button-hover unset", async ({
  page,
}) => {
  await openProbe(page)
  const tonal = page.locator("#tonal")
  const { hover } = await states(page, tonal)

  expect(hover.background).toBe(
    await resolveColor(tonal, "var(--_accent-filled)"),
  )
})

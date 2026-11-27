import { expect, test, type Page } from "@playwright/test"
import { instantScrolling, settle, supports } from "./fixtures"

const PAGE = "/html/components/button/"

const asVisitor = (page: Page) =>
  page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false })
  })

const seed = (
  page: Page,
  stored: { colorScroll?: string; preset?: string | null },
) =>
  page.addInitScript(
    ({ colorScroll, preset }) => {
      if (sessionStorage.getItem("seeded")) return
      sessionStorage.setItem("seeded", "true")
      localStorage.setItem("opui-theme-session", String(Date.now()))
      localStorage.setItem(
        "opui-theme",
        JSON.stringify({ css: "", preset, tokens: {} }),
      )
      if (colorScroll) localStorage.setItem("color-scroll", colorScroll)
    },
    { colorScroll: stored.colorScroll ?? null, preset: stored.preset ?? null },
  )

const visit = async (page: Page) => {
  await instantScrolling(page)
  await page.goto(PAGE)
}

const scrollTo = (page: Page, fraction: number) =>
  page.evaluate(async (part) => {
    const root = document.documentElement
    root.scrollTop = (root.scrollHeight - innerHeight) * part
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)
  }, fraction)

const colors = (page: Page) =>
  page.evaluate(() => {
    const resolve = (value: string, className = "") => {
      const probe = document.createElement("div")
      probe.className = className
      probe.style.color = value
      document.body.append(probe)
      const color = getComputedStyle(probe).color
      probe.remove()
      return color
    }
    return {
      critical: resolve("var(--ui-palette-accent)", "ui-critical"),
      primary: resolve("var(--ui-primary)"),
    }
  })

const hueOf = (color: string) =>
  Number(color.match(/oklch\([^ ]+ [^ ]+ ([^ )]+)/)?.[1])

const turn = (from: string, to: string) =>
  (((hueOf(to) - hueOf(from)) % 360) + 360) % 360

const turnAtMiddle = async (page: Page) => {
  await scrollTo(page, 0)
  const top = await colors(page)
  await scrollTo(page, 0.5)
  return turn(top.primary, (await colors(page)).primary)
}

const hasScrollTimelines = (page: Page) =>
  supports(page, "scroll-driven animations", () =>
    CSS.supports("animation-timeline", "scroll()"),
  )

const openDrawer = async (page: Page) => {
  await page.getByRole("button", { name: "Theme" }).click()
  const drawer = page.locator("#theme-configurator-drawer")
  await expect(drawer).toHaveAttribute("open")
  await settle(drawer)
  return drawer
}

const closeDrawer = async (page: Page) => {
  await page.keyboard.press("Escape")
  await expect(page.locator("#theme-configurator-drawer")).not.toHaveAttribute(
    "open",
  )
}

test.describe("a visitor", () => {
  test.beforeEach(async ({ page }) => {
    await asVisitor(page)
  })

  test("sees the brand hue turn once round the wheel over the page", async ({
    page,
  }) => {
    await seed(page, {})
    await visit(page)
    const top = await colors(page)
    await scrollTo(page, 0.5)
    const middle = await colors(page)

    if (await hasScrollTimelines(page)) {
      expect(turn(top.primary, middle.primary)).toBeCloseTo(180, -1)
    } else {
      expect(middle.primary).toBe(top.primary)
    }
    expect(middle.critical, "status colors keep their hue").toBe(top.critical)
  })

  test("turns color scroll off in the theme drawer and keeps the choice", async ({
    page,
  }) => {
    await seed(page, {})
    await visit(page)
    const drawer = await openDrawer(page)
    const toggle = drawer.getByRole("switch", { name: "Color scroll" })

    if (!(await hasScrollTimelines(page))) {
      await expect(toggle).toHaveCount(0)
      return
    }

    await expect(toggle).toBeChecked()
    await toggle.click()
    await expect(toggle).not.toBeChecked()
    await closeDrawer(page)
    expect(await turnAtMiddle(page)).toBe(0)

    await page.reload()
    expect(await turnAtMiddle(page)).toBe(0)
    expect(
      await page.evaluate(() => localStorage.getItem("color-scroll")),
    ).toBe("off")
  })

  test("who prefers reduced motion starts without color scroll and can turn it on", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await seed(page, {})
    await visit(page)
    expect(await turnAtMiddle(page)).toBe(0)

    await scrollTo(page, 0)
    const drawer = await openDrawer(page)
    const toggle = drawer.getByRole("switch", { name: "Color scroll" })
    if (!(await hasScrollTimelines(page))) return

    await expect(toggle).not.toBeChecked()
    await toggle.click()
    await closeDrawer(page)
    expect(await turnAtMiddle(page)).toBeCloseTo(180, -1)
  })

  test("on the Vice City theme starts without color scroll and can turn it on", async ({
    page,
  }) => {
    await seed(page, { preset: "vice-city" })
    await visit(page)
    expect(await turnAtMiddle(page)).toBe(0)

    await scrollTo(page, 0)
    const drawer = await openDrawer(page)
    const toggle = drawer.getByRole("switch", { name: "Color scroll" })
    if (!(await hasScrollTimelines(page))) return

    await expect(toggle).not.toBeChecked()
    await toggle.click()
    await closeDrawer(page)
    expect(await turnAtMiddle(page)).toBeCloseTo(180, -1)
  })

  test("who starts from Vice City in the drawer sees color scroll turn off", async ({
    page,
  }) => {
    await seed(page, {})
    await visit(page)
    const drawer = await openDrawer(page)
    const toggle = drawer.getByRole("switch", { name: "Color scroll" })
    if (!(await hasScrollTimelines(page))) return

    await expect(toggle).toBeChecked()
    await drawer.getByLabel("Start from").selectOption("vice-city")
    await expect(toggle).not.toBeChecked()
    await closeDrawer(page)
    expect(await turnAtMiddle(page)).toBe(0)
  })
})

test("an automated browser starts without color scroll so screenshots stay put", async ({
  page,
}) => {
  await visit(page)
  expect(await turnAtMiddle(page)).toBe(0)
})

test("a stored choice wins over the automated browser default", async ({
  page,
}) => {
  await seed(page, { colorScroll: "on" })
  await visit(page)
  expect(await turnAtMiddle(page)).toBeCloseTo(
    (await hasScrollTimelines(page)) ? 180 : 0,
    -1,
  )
})

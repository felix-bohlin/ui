import { expect, test, type Page } from "@playwright/test"
import { instantScrolling, settle, supports } from "./fixtures"

const PAGE = "/html/components/button/"

const asVisitor = (page: Page) =>
  page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false })
  })

const storeDrift = (page: Page, value: string) =>
  page.addInitScript((drift) => {
    if (sessionStorage.getItem("seeded")) return
    sessionStorage.setItem("seeded", "true")
    localStorage.setItem("drift", drift)
  }, value)

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

test.describe("a visitor", () => {
  test.beforeEach(async ({ page }) => {
    await asVisitor(page)
  })

  test("sees the brand hue turn once round the wheel over the page", async ({
    page,
  }) => {
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

  test("turns color drift off in the theme drawer and keeps the choice", async ({
    page,
  }) => {
    await visit(page)
    const drawer = await openDrawer(page)
    const toggle = drawer.getByRole("switch", { name: "Color drift" })

    if (!(await hasScrollTimelines(page))) {
      await expect(toggle).toHaveCount(0)
      return
    }

    await expect(toggle).toBeChecked()
    await toggle.click()
    await expect(toggle).not.toBeChecked()
    await page.keyboard.press("Escape")

    const top = await colors(page)
    await scrollTo(page, 0.5)
    expect((await colors(page)).primary).toBe(top.primary)

    await page.reload()
    await scrollTo(page, 0.5)
    expect((await colors(page)).primary).toBe(top.primary)
    expect(await page.evaluate(() => localStorage.getItem("drift"))).toBe("off")
  })

  test("who prefers reduced motion starts without drift and can turn it on", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await visit(page)
    const top = await colors(page)
    await scrollTo(page, 0.5)
    expect((await colors(page)).primary).toBe(top.primary)

    await scrollTo(page, 0)
    const drawer = await openDrawer(page)
    const toggle = drawer.getByRole("switch", { name: "Color drift" })
    if (!(await hasScrollTimelines(page))) return

    await expect(toggle).not.toBeChecked()
    await toggle.click()
    await page.keyboard.press("Escape")
    await scrollTo(page, 0.5)
    expect(turn(top.primary, (await colors(page)).primary)).toBeCloseTo(180, -1)
  })
})

test("an automated browser starts without drift so screenshots stay put", async ({
  page,
}) => {
  await visit(page)
  const top = await colors(page)
  await scrollTo(page, 0.5)
  expect((await colors(page)).primary).toBe(top.primary)
})

test("a stored choice wins over the automated browser default", async ({
  page,
}) => {
  await storeDrift(page, "on")
  await visit(page)
  const top = await colors(page)
  await scrollTo(page, 0.5)
  const turned = turn(top.primary, (await colors(page)).primary)
  expect(turned).toBeCloseTo((await hasScrollTimelines(page)) ? 180 : 0, -1)
})

import { expect, test, type Page } from "@playwright/test"
import { instantScrolling } from "./fixtures"

const THEME_KEY = "opui-theme"
const SESSION_KEY = "opui-theme-session"
const HOUR = 60 * 60 * 1000

const asVisitor = (page: Page) =>
  page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false })
  })

const visit = async (
  page: Page,
  stored: { preset: string | null; tokens?: Record<string, string> },
  sinceLastView: number,
) => {
  await instantScrolling(page)
  await page.goto("/html/")
  await page.evaluate(
    ({ keys, preset, since, tokens }) => {
      localStorage.setItem(
        keys.theme,
        JSON.stringify({ css: "", preset, tokens }),
      )
      localStorage.setItem(keys.session, String(Date.now() - since))
    },
    {
      keys: { session: SESSION_KEY, theme: THEME_KEY },
      preset: stored.preset,
      since: sinceLastView,
      tokens: stored.tokens ?? {},
    },
  )
  await page.reload()
}

const storedTheme = (page: Page) =>
  page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key) ?? "null"),
    THEME_KEY,
  )

const shownPreset = (page: Page) =>
  page.evaluate(() => document.documentElement.dataset.exampleTheme ?? null)

test.describe("a visitor", () => {
  test.beforeEach(async ({ page }) => {
    await asVisitor(page)
  })

  test("gets another example theme in a new session", async ({ page }) => {
    await visit(page, { preset: "m3" }, HOUR)
    const theme = await storedTheme(page)
    expect(theme.preset).not.toBe("m3")
    expect(theme.tokens).toEqual({})
    expect(await shownPreset(page)).toBe(theme.preset)
  })

  test("keeps the theme within a session", async ({ page }) => {
    await visit(page, { preset: "m3" }, 60_000)
    expect((await storedTheme(page)).preset).toBe("m3")
    expect(await shownPreset(page)).toBe("m3")
  })

  test("keeps a theme with changes of their own in a new session", async ({
    page,
  }) => {
    await visit(page, { preset: "m3", tokens: { "--ui-radius": "0" } }, HOUR)
    expect(await storedTheme(page)).toEqual({
      css: "",
      preset: "m3",
      tokens: { "--ui-radius": "0" },
    })
    expect(await shownPreset(page)).toBe("m3")
  })

  test("starts a session on the first page view", async ({ page }) => {
    await instantScrolling(page)
    const before = Date.now()
    await page.goto("/html/")
    const session = await page.evaluate(
      (key) => Number(localStorage.getItem(key)),
      SESSION_KEY,
    )
    expect(session).toBeGreaterThanOrEqual(before)
    expect(await shownPreset(page)).toBe((await storedTheme(page)).preset)
  })
})

test("an automated browser keeps the default theme", async ({ page }) => {
  await instantScrolling(page)
  await page.goto("/html/")
  expect(
    await page.evaluate((key) => localStorage.getItem(key), SESSION_KEY),
  ).toBeNull()
  expect(await shownPreset(page)).toBeNull()
})

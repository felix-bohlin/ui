import { NOTIFICATIONS } from "../shared/data.ts"
import { SCREENS } from "../shared/screens.ts"
import {
  PHONE_DEVICE,
  axeViolations,
  clientNavigationMarker,
  expect,
  expectNoAxeViolations,
  open,
  screen,
  test,
} from "./fixtures.ts"
import { ANCHORS_VISIBLE, KNOWN } from "./known.ts"

for (const { id, label, path } of SCREENS) {
  test(`${label} renders in the shell and passes axe`, async ({ page }) => {
    await open(page, path)
    await expect(screen(page)).toHaveAttribute("data-screen", id)
    await expect(page).toHaveTitle(
      id === "profile" ? "Sam Rivera | Reference" : `${label} | Reference`,
    )
    const nav = page.getByRole("navigation", { name: "Main" })
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute(
      "aria-current",
      "page",
    )
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1)
    await expectNoAxeViolations(page)
  })
}

for (const { label, path } of [
  ...SCREENS,
  { label: "Another profile", path: "/u/ada" },
]) {
  test(`${label} marks only its nav link as the current page`, async ({
    page,
  }) => {
    await open(page, path)
    const current = page.locator(
      '[aria-current="page"]:not(#nav-drawer *, nav[aria-label="Conversations"] *)',
    )
    const expected = path === "/u/ada" ? [] : [label]
    await expect(current).toHaveText(expected)
    if (expected.length) {
      await expect(current).toHaveAttribute("href", path)
    }
  })
}

test("the skip link is the first tab stop and moves focus to main", async ({
  page,
}) => {
  await open(page, "/settings")
  const skip = page.getByRole("link", { name: "Skip to content" })
  await expect(skip).not.toBeInViewport()
  await page.keyboard.press("Tab")
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press("Enter")
  await expect(page.locator("main")).toBeFocused()
})

test("the header doesn't move when the skip link takes focus", async ({
  page,
}) => {
  test.fail(true, KNOWN.skipLink)
  await open(page, "/settings")
  const header = page.locator(".app-header")
  const before = await header.boundingBox()
  await page.keyboard.press("Tab")
  expect(await header.boundingBox()).toEqual(before)
})

test("the nav links navigate on the client", async ({ page }) => {
  await open(page, "/")
  const stillLoaded = await clientNavigationMarker(page)
  const nav = page.getByRole("navigation", { name: "Main" })
  for (const { id, label, path } of [...SCREENS].reverse()) {
    await nav.getByRole("link", { name: label }).click()
    await expect(page).toHaveURL(path)
    await expect(screen(page)).toHaveAttribute("data-screen", id)
  }
  expect(await stillLoaded()).toBe(true)
})

test("the theme menu switches and keeps the theme", async ({ page }) => {
  await open(page, "/")
  const hue = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ui-palette-hue")
        .trim(),
    )
  const before = await hue()
  await page.getByRole("button", { name: "Theme" }).click()
  const menu = page.locator("#theme-menu")
  await expect(menu).toBeVisible()
  await menu.getByRole("button", { name: "Sunset" }).click()
  await expect(menu).toBeHidden()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "sunset")
  expect(await hue()).not.toBe(before)
  await expectNoAxeViolations(page)

  await page.reload()
  await expect(page.locator("html[data-hydrated]")).toBeAttached()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "sunset")

  await page.getByRole("button", { name: "Theme" }).click()
  await menu.getByRole("button", { name: "Default" }).click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "default")
  expect(await hue()).toBe(before)
})

test("a saved theme is on <html> before any script runs", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: true })
  await context.addInitScript(() => {
    localStorage.setItem("reference-theme", "sunset")
  })
  const page = await context.newPage()
  await page.route(/\.(m?js)(\?.*)?$/, (route) => route.abort())
  await page.goto("/settings")
  await expect(page.locator("html")).toHaveAttribute("data-theme", "sunset")
  await context.close()
})

test("the notifications menu lists every notification", async ({ page }) => {
  await open(page, "/")
  const unread = NOTIFICATIONS.filter((item) => !item.read).length
  const button = page.getByRole("button", { name: "Notifications" })
  await expect(page.locator(".ui-badge .ui-indicator")).toContainText(
    String(unread),
  )
  await expect(page.locator(".ui-badge")).toContainText(
    `${unread} unread notifications`,
  )
  await button.click()
  const menu = page.locator("#notifications-menu")
  await expect(menu.getByRole("link")).toHaveText(
    NOTIFICATIONS.map((item) => item.text),
  )
  await menu.getByRole("link", { name: NOTIFICATIONS[0]!.text }).click()
  await expect(page).toHaveURL(NOTIFICATIONS[0]!.href)
  await expect(menu).toBeHidden()
})

test("the profile avatar links to your profile", async ({ page }) => {
  await open(page, "/")
  await page.getByRole("link", { name: "Your profile" }).click()
  await expect(page).toHaveURL("/u/sam")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sam Rivera")
})

test("an unknown profile is a 404 in the shell", async ({ page, problems }) => {
  const response = await page.goto("/u/nobody")
  expect(response?.status()).toBe(404)
  expect(problems).toEqual([
    "error: Failed to load resource: the server responded with a status of 404 (Not Found)",
  ])
  problems.length = 0
  await expect(screen(page)).toHaveAttribute("data-screen", "not-found")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Not found")
  await expect(page.locator(".app-header")).toBeVisible()
})

test.describe("on a phone", () => {
  test.use(PHONE_DEVICE)

  test("the nav drawer opens and closes when a link navigates", async ({
    page,
  }) => {
    await open(page, "/")
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden()
    const stillLoaded = await clientNavigationMarker(page)
    await page.getByRole("button", { name: "Menu" }).click()
    const drawer = page.getByRole("dialog", { name: "Navigate" })
    await expect(drawer).toBeVisible()
    await expect(drawer.getByRole("link", { name: "Feed" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    await expectNoAxeViolations(page)
    await drawer.getByRole("link", { name: "Chat" }).click()
    await expect(page).toHaveURL("/chat")
    await expect(drawer).toBeHidden()
    await expect(screen(page)).toHaveAttribute("data-screen", "chat")
    expect(await stillLoaded()).toBe(true)

    await page.getByRole("button", { name: "Menu" }).click()
    await expect(drawer.getByRole("link", { name: "Chat" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  test("the nav drawer closes when a link only changes the query", async ({
    page,
  }) => {
    await open(page, "/chat?with=kinga")
    await page.getByRole("button", { name: "Menu" }).click()
    const drawer = page.getByRole("dialog", { name: "Navigate" })
    await expect(drawer).toBeVisible()
    await drawer.getByRole("link", { name: "Chat" }).click()
    await expect(page).toHaveURL("/chat")
    await expect(page.locator("#chat-title")).toHaveText("Scott Humbucker")
    await expect(drawer).toBeHidden({ timeout: 2000 })
  })

  for (const { label, path } of SCREENS) {
    test(`${label} has no horizontal scroll`, async ({ page }) => {
      await open(page, path)
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true)
    })
  }
})

test(`known: ${ANCHORS_VISIBLE.reason}`, async ({ page }) => {
  const messages: string[] = []
  page.on("console", (message) => messages.push(message.text()))
  await open(page, "/")
  await axeViolations(page)
  const takesSingular = await page.evaluate(() =>
    CSS.supports("position-visibility", "anchor-visible"),
  )
  await expect
    .poll(() => messages.some((text) => ANCHORS_VISIBLE.message.test(text)))
    .toBe(takesSingular)
})

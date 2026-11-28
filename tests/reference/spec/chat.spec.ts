import {
  clientNavigationMarker,
  expect,
  expectNoAxeViolations,
  open,
  test,
} from "./fixtures.ts"

const conversations = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Conversations" })

test("/chat opens the first conversation", async ({ page }) => {
  await open(page, "/chat")
  await expect(page.locator("#chat-title")).toHaveText("Scott Humbucker")
  const messages = page.getByRole("list", {
    name: "Messages with Scott Humbucker",
  })
  await expect(messages.locator("li.ui-divider")).toHaveText([
    "Yesterday",
    "Today",
  ])
  await expect(messages.locator("li.ui-message")).toHaveCount(4)
  await expect(messages.locator("li.ui-message.ui-outgoing")).toHaveCount(1)
  await expect(
    conversations(page).getByRole("link", { name: /Scott Humbucker/ }),
  ).toHaveAttribute("aria-current", "page")
  await expect(
    conversations(page).getByRole("link", { name: /Scott Humbucker/ }),
  ).toContainText("1 unread")
  await expectNoAxeViolations(page)
})

test("a conversation link opens it on the client", async ({ page }) => {
  await open(page, "/chat")
  const stillLoaded = await clientNavigationMarker(page)
  await conversations(page)
    .getByRole("link", { name: /Kinga Headstock/ })
    .click()
  await expect(page).toHaveURL("/chat?with=kinga")
  await expect(page.locator("#chat-title")).toHaveText("Kinga Headstock")
  await expect(
    conversations(page).getByRole("link", { name: /Kinga Headstock/ }),
  ).toHaveAttribute("aria-current", "page")
  await expect(
    conversations(page).locator('[aria-current="page"]'),
  ).toHaveCount(1)
  expect(await stillLoaded()).toBe(true)
})

test("an unknown handle opens the first conversation", async ({ page }) => {
  await open(page, "/chat?with=nobody")
  await expect(page.locator("#chat-title")).toHaveText("Scott Humbucker")
})

test("sending appends a message and keeps it per conversation", async ({
  page,
}) => {
  await open(page, "/chat?with=adam")
  const messages = page.getByRole("list", {
    name: "Messages with Adam Groove",
  })
  await expect(messages.locator("li.ui-message")).toHaveCount(2)
  const field = page.getByRole("textbox", { name: "Message" })
  await field.fill("See you Thursday")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(messages.locator("li.ui-message")).toHaveCount(3)
  const last = messages.locator("li.ui-message").last()
  await expect(last).toHaveClass(/ui-outgoing/)
  await expect(last).toContainText("See you Thursday")
  await expect(last.locator("time")).toHaveAttribute(
    "datetime",
    "2026-11-19T12:00",
  )
  await expect(field).toHaveValue("")

  await conversations(page)
    .getByRole("link", { name: /Kinga Headstock/ })
    .click()
  await expect(page.locator("#chat-title")).toHaveText("Kinga Headstock")
  await expect(page.getByText("See you Thursday")).toHaveCount(0)
  await conversations(page)
    .getByRole("link", { name: /Adam Groove/ })
    .click()
  await expect(messages.locator("li.ui-message")).toHaveCount(3)
})

test("an empty message doesn't send", async ({ page }) => {
  await open(page, "/chat")
  const messages = page.locator(".ui-message-list li.ui-message")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(messages).toHaveCount(4)
})

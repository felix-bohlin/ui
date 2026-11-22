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
  await expect(page.locator("#chat-title")).toHaveText("Holly Humbucker")
  const messages = page.getByRole("list", {
    name: "Messages with Holly Humbucker",
  })
  await expect(messages.locator("li.ui-divider")).toHaveText([
    "Yesterday",
    "Today",
  ])
  await expect(messages.locator("li.ui-message")).toHaveCount(4)
  await expect(messages.locator("li.ui-message.ui-outgoing")).toHaveCount(1)
  await expect(
    conversations(page).getByRole("link", { name: /Holly Humbucker/ }),
  ).toHaveAttribute("aria-current", "page")
  await expect(
    conversations(page).getByRole("link", { name: /Holly Humbucker/ }),
  ).toContainText("1 unread")
  await expectNoAxeViolations(page)
})

test("a conversation link opens it on the client", async ({ page }) => {
  await open(page, "/chat")
  const stillLoaded = await clientNavigationMarker(page)
  await conversations(page)
    .getByRole("link", { name: /Lou Headstock/ })
    .click()
  await expect(page).toHaveURL("/chat?with=lou")
  await expect(page.locator("#chat-title")).toHaveText("Lou Headstock")
  await expect(
    conversations(page).getByRole("link", { name: /Lou Headstock/ }),
  ).toHaveAttribute("aria-current", "page")
  await expect(
    conversations(page).locator('[aria-current="page"]'),
  ).toHaveCount(1)
  expect(await stillLoaded()).toBe(true)
})

test("an unknown handle opens the first conversation", async ({ page }) => {
  await open(page, "/chat?with=nobody")
  await expect(page.locator("#chat-title")).toHaveText("Holly Humbucker")
})

test("sending appends a message and keeps it per conversation", async ({
  page,
}) => {
  await open(page, "/chat?with=percy")
  const messages = page.getByRole("list", {
    name: "Messages with Percy Groove",
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
    .getByRole("link", { name: /Lou Headstock/ })
    .click()
  await expect(page.locator("#chat-title")).toHaveText("Lou Headstock")
  await expect(page.getByText("See you Thursday")).toHaveCount(0)
  await conversations(page)
    .getByRole("link", { name: /Percy Groove/ })
    .click()
  await expect(messages.locator("li.ui-message")).toHaveCount(3)
})

test("an empty message doesn't send", async ({ page }) => {
  await open(page, "/chat")
  const messages = page.locator(".ui-message-list li.ui-message")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(messages).toHaveCount(4)
})

import { expect, expectNoAxeViolations, open, test } from "./fixtures.ts"

test.beforeEach(async ({ page }) => {
  await open(page, "/settings")
})

test("the settings form starts with the saved values", async ({ page }) => {
  const form = page.getByRole("form", { name: "Settings" })
  await expect(form.getByRole("textbox", { name: "Display name" })).toHaveValue(
    "Sam Rivera",
  )
  await expect(form.getByRole("textbox", { name: "Email" })).toHaveValue(
    "sam@example.com",
  )
  await expect(form.getByRole("combobox", { name: "Language" })).toHaveValue(
    "en",
  )
  await expect(form.getByRole("radio", { name: "Friends" })).toBeChecked()
  await expect(
    form.getByRole("switch", { name: "Email notifications" }),
  ).toBeChecked()
  await expect(
    form.getByRole("switch", { name: "Push notifications" }),
  ).not.toBeChecked()
  await expect(form.getByRole("group", { name: "Account" })).toBeVisible()
  await expect(
    form.getByRole("group", { name: "Who can see your posts" }),
  ).toBeVisible()
})

test("Save shows a status, and an invalid email blocks it", async ({
  page,
}) => {
  const status = page.locator("#settings-status")
  await expect(status).toHaveRole("status")
  await expect(status).toBeEmpty()
  const email = page.getByRole("textbox", { name: "Email" })
  await email.fill("not an email")
  await page.getByRole("button", { name: "Save" }).click()
  await expect(status).toBeEmpty()
  expect(
    await email.evaluate((input: HTMLInputElement) => input.validity.valid),
  ).toBe(false)
  await email.fill("sam@example.org")
  await page.getByRole("radio", { name: "Only me" }).check()
  await page.getByRole("switch", { name: "Push notifications" }).check()
  await page.getByRole("combobox", { name: "Language" }).selectOption("sv")
  await page.getByRole("button", { name: "Save" }).click()
  await expect(status).toHaveText("Settings saved.")
  await expect(status.locator(".ui-callout.ui-success")).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Language" })).toHaveValue(
    "sv",
  )
  await expectNoAxeViolations(page)
})

test("two-factor sign-in checks the code", async ({ page }) => {
  const section = page.getByRole("region", { name: "Two-factor sign-in" })
  const code = section.getByRole("textbox", { name: "Code from your app" })
  await code.fill("111111")
  await section.getByRole("button", { name: "Verify" }).click()
  await expect(code).toHaveAttribute("aria-invalid", "true")
  await expect(section.locator(".ui-end-text")).toHaveText(
    "That code didn't work. Try again.",
  )
  await expect(code).toHaveAccessibleDescription(
    /That code didn't work. Try again./,
  )
  await code.fill("123456")
  await section.getByRole("button", { name: "Verify" }).click()
  await expect(section.getByRole("status")).toHaveText(
    "Two-factor sign-in is on.",
  )
  await expect(code).not.toHaveAttribute("aria-invalid", "true")
})

test("Delete account asks first", async ({ page }) => {
  const status = page.locator("#settings-status")
  await page.getByRole("button", { name: "Delete account" }).click()
  const dialog = page.getByRole("dialog", { name: "Delete your account?" })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText("This removes your posts and photos.")
  await expectNoAxeViolations(page)
  await dialog.getByRole("button", { name: "Cancel" }).click()
  await expect(dialog).toBeHidden()
  await expect(status).toBeEmpty()
  await page.getByRole("button", { name: "Delete account" }).click()
  await dialog.getByRole("button", { name: "Delete" }).click()
  await expect(dialog).toBeHidden()
  await expect(status).toHaveText(
    "Account deleted (not really, this is a test app).",
  )
})

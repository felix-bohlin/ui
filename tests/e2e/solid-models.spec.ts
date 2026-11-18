import { expect, test } from "@playwright/test"
import { instantScrolling, pageErrors } from "./fixtures"

test.beforeEach(async ({ page }) => {
  await instantScrolling(page)
  await page.goto("/dev/fixtures/solid-models/")
  await expect(page.getByLabel("City")).toBeVisible()
})

test("a Solid control keeps what the user entered when another prop changes", async ({
  page,
}) => {
  const errors = pageErrors(page)
  const city = page.getByLabel("City")
  await city.fill("Malmo")
  await page.getByLabel("Newsletter").check()
  await page.getByLabel("Size").selectOption("large")
  await page.getByRole("button", { name: "Toggle error" }).click()

  await expect(city).toHaveAttribute("aria-invalid", "true")
  await expect(city).toHaveValue("Malmo")
  await expect(page.getByLabel("Newsletter")).toBeChecked()
  await expect(page.getByLabel("Size")).toHaveValue("large")
  expect(errors).toEqual([])
})

test("a Solid select picks the child option its defaultValue names", async ({
  page,
}) => {
  await expect(page.getByLabel("Color")).toHaveValue("blue")
  await expect(page.getByLabel("Size")).toHaveValue("small")
})

test("a Solid control follows its value when it changes, and a reset returns to the first value", async ({
  page,
}) => {
  const name = page.getByLabel("Name")
  await name.fill("Edsger")
  await page.getByRole("button", { name: "Set values" }).click()
  await expect(name).toHaveValue("Grace")
  await expect(page.getByLabel("Plan")).toHaveValue("paid")

  await page.getByRole("button", { name: "Reset" }).click()
  await expect(name).toHaveValue("Ada")
  await expect(page.getByLabel("City")).toHaveValue("Lund")
})

test("a Solid group with a value puts the selection back when the change isn't stored", async ({
  page,
}) => {
  const errors = pageErrors(page)
  await page.getByText("Billing", { exact: true }).click()
  await expect(page.getByRole("radio", { name: "Profile" })).toBeChecked()
  await expect(page.getByRole("radio", { name: "Billing" })).not.toBeChecked()

  await page.getByText("Rows", { exact: true }).click()
  await expect(page.getByRole("radio", { name: "Grid" })).toBeChecked()
  await expect(page.getByRole("radio", { name: "Rows" })).not.toBeChecked()

  await page.getByText("Italic", { exact: true }).click()
  await page.getByText("Bold", { exact: true }).click()
  await expect(page.getByRole("checkbox", { name: "Bold" })).toBeChecked()
  await expect(page.getByRole("checkbox", { name: "Italic" })).not.toBeChecked()

  await page.getByRole("radio", { name: "4 stars" }).click({ force: true })
  await expect(page.getByRole("radio", { name: "2 stars" })).toBeChecked()

  await page.getByText("Right", { exact: true }).click()
  await expect(page.getByRole("radio", { name: "Right" })).toBeChecked()
  await page.getByText("Roomy", { exact: true }).click()
  await expect(page.getByRole("radio", { name: "Roomy" })).toBeChecked()
  expect(errors).toEqual([])
})

test("a Solid list keeps its rows when its items are replaced by new objects", async ({
  page,
}) => {
  const errors = pageErrors(page)
  await page.evaluate(() =>
    document.getElementById("solid-models-menu")!.showPopover(),
  )
  const refresh = page.getByRole("button", { name: "Refresh", exact: true })
  await refresh.click()
  await expect(page.getByRole("button", { name: "Round 1" })).toBeVisible()
  await expect(refresh).toBeFocused()
  await page.evaluate(() =>
    document.getElementById("solid-models-menu")!.hidePopover(),
  )

  const fruit = page.getByLabel("Fruit")
  await fruit.selectOption("cherry")
  await page.getByRole("button", { name: "Refresh fruits" }).click()
  await expect(fruit.locator("option").first()).toHaveText("apple 1")
  await expect(fruit).toHaveValue("cherry")

  const account = page.getByRole("link", { name: "Account 0" })
  await account.focus()
  await page.evaluate(() => document.dispatchEvent(new Event("refresh-steps")))
  const updated = page.getByRole("link", { name: "Account 1" })
  await expect(updated).toBeVisible()
  await expect(updated).toBeFocused()
  expect(errors).toEqual([])
})

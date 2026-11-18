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

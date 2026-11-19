import { expect, test } from "@playwright/test"
import { FRAMEWORKS, isHydratedFramework } from "../../src/utils/framework"
import { instantScrolling, pageErrors } from "./fixtures"

const ONE_WAY: Partial<Record<string, string>> = {
  solid:
    "Solid writes a checked prop only when it changes, so a choice the parent doesn't store stays on screen, as on a native input",
  svelte:
    "a value passed without bind: is a starting value: the group keeps the selection itself until the parent passes another",
  vue: "a model-value passed without a listener is a starting value: the group keeps the selection itself until the parent passes another",
}

for (const { id, label } of FRAMEWORKS) {
  if (!isHydratedFramework(id)) continue
  const refuses = !ONE_WAY[id]
  const explain = (...reasons: (string | undefined)[]) =>
    test
      .info()
      .annotations.push(
        ...reasons.flatMap((description) =>
          description ? [{ description, type: `${label} differs` }] : [],
        ),
      )

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await instantScrolling(page)
      await page.goto(`/dev/fixtures/${id}-models/`)
      await expect(page.getByLabel("City")).toBeVisible()
    })

    test("a control keeps what the user entered when another prop changes", async ({
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

    test("a select picks the child option its defaultValue names", async ({
      page,
    }) => {
      await expect(page.getByLabel("Color")).toHaveValue("blue")
      await expect(page.getByLabel("Size")).toHaveValue("small")
    })

    test("a control follows its value when it changes, and a reset returns an unbound control to its default", async ({
      page,
    }) => {
      const name = page.getByLabel("Name")
      const fruit = page.getByLabel("Fruit")
      await name.fill("Edsger")
      await page.getByRole("button", { name: "Set values" }).click()
      await expect(name).toHaveValue("Grace")
      await expect(page.getByLabel("Plan")).toHaveValue("paid")
      await page.getByLabel("City").fill("Malmo")
      await fruit.selectOption("cherry")

      await page.getByRole("button", { name: "Reset" }).click()
      await expect(page.getByLabel("City")).toHaveValue("Lund")
      await expect(fruit).toHaveValue("apple")

      await page.getByRole("button", { name: "Toggle error" }).click()
      await expect(page.getByLabel("City")).toHaveAttribute(
        "aria-invalid",
        "true",
      )
      await expect(page.getByLabel("City")).toHaveValue("Lund")
    })

    test(`a group with a one-way value ${refuses ? "puts the selection back" : "keeps the selection"} when the change isn't stored`, async ({
      page,
    }) => {
      explain(ONE_WAY[id])
      const errors = pageErrors(page)
      await page.getByText("Billing", { exact: true }).click()
      await expect(page.getByRole("radio", { name: "Profile" })).toBeChecked({
        checked: refuses,
      })
      await expect(page.getByRole("radio", { name: "Billing" })).toBeChecked({
        checked: !refuses,
      })

      await page.getByText("Rows", { exact: true }).click()
      await expect(page.getByRole("radio", { name: "Grid" })).toBeChecked({
        checked: refuses,
      })
      await expect(page.getByRole("radio", { name: "Rows" })).toBeChecked({
        checked: !refuses,
      })

      await page.getByText("Italic", { exact: true }).click()
      await page.getByText("Bold", { exact: true }).click()
      await expect(page.getByRole("checkbox", { name: "Bold" })).toBeChecked({
        checked: refuses,
      })
      await expect(page.getByRole("checkbox", { name: "Italic" })).toBeChecked({
        checked: !refuses,
      })

      await page.getByRole("radio", { name: "4 stars" }).click({ force: true })
      await expect(
        page.getByRole("radio", { name: refuses ? "2 stars" : "4 stars" }),
      ).toBeChecked()

      await page.getByText("Right", { exact: true }).click()
      await expect(page.getByRole("radio", { name: "Right" })).toBeChecked()
      await page.getByText("Roomy", { exact: true }).click()
      await expect(page.getByRole("radio", { name: "Roomy" })).toBeChecked()
      expect(errors).toEqual([])
    })

    test("a list keeps its rows when its items are replaced by new objects", async ({
      page,
    }) => {
      const errors = pageErrors(page)
      await page.evaluate(() =>
        document.getElementById("models-menu")!.showPopover(),
      )
      const refresh = page.getByRole("button", { name: "Refresh", exact: true })
      await refresh.click()
      await expect(page.getByRole("button", { name: "Round 1" })).toBeVisible()
      await expect(refresh).toBeFocused()
      await page.evaluate(() =>
        document.getElementById("models-menu")!.hidePopover(),
      )

      const fruit = page.getByLabel("Fruit")
      await fruit.selectOption("cherry")
      await page.getByRole("button", { name: "Refresh fruits" }).click()
      await expect(fruit.locator("option").first()).toHaveText("apple 1")
      await expect(fruit).toHaveValue("cherry")

      const account = page.getByRole("link", { name: "Account 0" })
      await account.focus()
      await page.evaluate(() =>
        document.dispatchEvent(new Event("refresh-steps")),
      )
      const updated = page.getByRole("link", { name: "Account 1" })
      await expect(updated).toBeVisible()
      await expect(updated).toBeFocused()
      expect(errors).toEqual([])
    })
  })
}

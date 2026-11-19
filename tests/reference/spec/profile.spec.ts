import { photosBy, postsBy } from "../shared/fake-api.ts"
import {
  expect,
  expectNoAxeViolations,
  open,
  settled,
  test,
} from "./fixtures.ts"
import { KNOWN } from "./known.ts"

test("a profile shows the details, stats and tabs", async ({ page }) => {
  await open(page, "/u/ada")
  await expect(page).toHaveTitle("Ada Okafor | Reference")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ada Okafor")
  const nav = page.getByRole("navigation", { name: "Main" })
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(0)
  const details = page.locator(".ui-description-list")
  await expect(details.locator("dt")).toHaveText(["Location", "Joined"])
  await expect(details.locator("dd")).toHaveText(["Lisbon", "August 2025"])
  await expect(page.locator(".ui-stat .ui-label")).toHaveText([
    "Posts",
    "Photos",
  ])
  await expect(page.locator(".ui-stat .ui-value")).toHaveText([
    String(postsBy("ada").length),
    String(photosBy("ada").length),
  ])
  const tabs = page.locator(".ui-tabs")
  await expect(tabs.getByRole("radio", { name: "Posts" })).toBeChecked()
  await expect(tabs.locator(".ui-panel:visible article")).toHaveCount(
    postsBy("ada").length,
  )
  await tabs.getByText("Photos", { exact: true }).click()
  await expect(tabs.getByRole("radio", { name: "Photos" })).toBeChecked()
  await expect(tabs.locator(".ui-panel:visible img")).toHaveCount(
    photosBy("ada").length,
  )
  await expectNoAxeViolations(page)
})

test("an empty tab says so", async ({ page }) => {
  await open(page, "/u/holly")
  await page.locator(".ui-tabs").getByText("Photos", { exact: true }).click()
  await expect(page.getByText("No photos yet.")).toBeVisible()
})

test("Send message opens the chat with that person", async ({ page }) => {
  await open(page, "/u/lou")
  await expect(page.getByRole("button", { name: "Edit profile" })).toHaveCount(
    0,
  )
  await page.getByRole("link", { name: "Send message" }).click()
  await expect(page).toHaveURL("/chat?with=lou")
  await expect(page.locator("#chat-title")).toHaveText("Lou Headstock")
})

test.describe("Edit profile", () => {
  const dialog = (page: import("@playwright/test").Page) =>
    page.getByRole("dialog", { name: "Edit profile" })

  test.beforeEach(async ({ page }) => {
    await open(page, "/u/sam")
    await page.getByRole("button", { name: "Edit profile" }).click()
    await expect(dialog(page)).toBeVisible()
    await settled(dialog(page))
  })

  test("the dialog passes axe", async ({ page }) => {
    await expectNoAxeViolations(page)
  })

  test("the form keeps the dialog's layout", async ({ page }) => {
    test.fail(true, KNOWN.dialogForm)
    const box = (await dialog(page).boundingBox())!
    const header = (await dialog(page).locator(".ui-header").boundingBox())!
    const content = (await dialog(page).locator(".ui-content").boundingBox())!
    const footer = (await dialog(page).locator(".ui-footer").boundingBox())!
    expect(header.y).toBeLessThan(content.y)
    expect(content.y + content.height).toBeLessThanOrEqual(footer.y + 1)
    expect(footer.y + footer.height).toBeLessThanOrEqual(box.y + box.height + 1)
    for (const part of [header, content, footer]) {
      expect(part.width).toBeCloseTo(
        (await dialog(page).locator(".ui-header").boundingBox())!.width,
        0,
      )
    }
    const cancel = (await dialog(page)
      .getByRole("button", { name: "Cancel" })
      .boundingBox())!
    const save = (await dialog(page)
      .getByRole("button", { name: "Save" })
      .boundingBox())!
    expect(cancel.y).toBeCloseTo(save.y, 0)
    expect(cancel.x).toBeLessThan(save.x)
    expect(save.x + save.width).toBeGreaterThan(box.x + box.width * 0.75)
  })

  test("Save updates the name and bio", async ({ page }) => {
    await dialog(page).getByRole("textbox", { name: "Name" }).fill("Sam R.")
    await dialog(page)
      .getByRole("textbox", { name: "Bio" })
      .fill("Plays the triangle.")
    await dialog(page).getByRole("button", { name: "Save" }).click()
    await expect(dialog(page)).toBeHidden()
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sam R.")
    await expect(page.getByText("Plays the triangle.")).toBeVisible()
    await expect(page).toHaveTitle("Sam R. | Reference")

    await page.getByRole("button", { name: "Edit profile" }).click()
    await expect(
      dialog(page).getByRole("textbox", { name: "Name" }),
    ).toHaveValue("Sam R.")
  })

  test("an empty name doesn't save", async ({ page }) => {
    await dialog(page).getByRole("textbox", { name: "Name" }).fill("")
    await dialog(page).getByRole("button", { name: "Save" }).click()
    await expect(dialog(page)).toBeVisible()
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sam Rivera",
    )
  })

  test("Cancel and Escape keep the profile as it was", async ({ page }) => {
    await dialog(page).getByRole("textbox", { name: "Name" }).fill("Nope")
    await dialog(page).getByRole("button", { name: "Cancel" }).click()
    await expect(dialog(page)).toBeHidden()
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sam Rivera",
    )
    await page.getByRole("button", { name: "Edit profile" }).click()
    await dialog(page).getByRole("textbox", { name: "Name" }).fill("Nope")
    await page.keyboard.press("Escape")
    await expect(dialog(page)).toBeHidden()
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sam Rivera",
    )
  })
})

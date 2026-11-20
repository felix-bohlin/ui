import { PHOTOS } from "../shared/data.ts"
import {
  PHONE,
  PHONE_DEVICE,
  expect,
  expectNoAxeViolations,
  open,
  settled,
  test,
} from "./fixtures.ts"

const viewer = (page: import("@playwright/test").Page) =>
  page.getByRole("dialog", { name: "Photo viewer" })

test("the grid has a button per photo, named by the photo", async ({
  page,
}) => {
  await open(page, "/photos")
  const grid = page.getByRole("list", { name: "Photos" })
  await expect(grid.getByRole("button")).toHaveText(PHOTOS.map(() => ""))
  for (const { alt } of PHOTOS) {
    await expect(grid.getByRole("button", { name: alt })).toBeVisible()
  }
})

test("the viewer steps through the photos and wraps around", async ({
  page,
}) => {
  await open(page, "/photos")
  await page.getByRole("button", { name: PHOTOS[1]!.alt }).click()
  const dialog = viewer(page)
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText(`Photo 2 of ${PHOTOS.length}`)
  await expect(dialog.getByRole("img")).toHaveAttribute("alt", PHOTOS[1]!.alt)
  await expectNoAxeViolations(page)

  await dialog.getByRole("button", { name: "Next" }).click()
  await expect(dialog).toContainText(`Photo 3 of ${PHOTOS.length}`)
  await dialog.getByRole("button", { name: "Previous" }).click()
  await dialog.getByRole("button", { name: "Previous" }).click()
  await dialog.getByRole("button", { name: "Previous" }).click()
  await expect(dialog).toContainText(
    `Photo ${PHOTOS.length} of ${PHOTOS.length}`,
  )
  await dialog.getByRole("button", { name: "Next" }).click()
  await expect(dialog).toContainText(`Photo 1 of ${PHOTOS.length}`)

  await page.keyboard.press("ArrowRight")
  await expect(dialog).toContainText(`Photo 2 of ${PHOTOS.length}`)
  await page.keyboard.press("ArrowLeft")
  await page.keyboard.press("ArrowLeft")
  await expect(dialog).toContainText(
    `Photo ${PHOTOS.length} of ${PHOTOS.length}`,
  )
})

test("closing the viewer returns focus to the photo that opened it", async ({
  page,
}) => {
  await open(page, "/photos")
  const opener = page.getByRole("button", { name: PHOTOS[3]!.alt })
  await opener.click()
  await expect(viewer(page)).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(viewer(page)).toBeHidden()
  await expect(opener).toBeFocused()

  await opener.click()
  await viewer(page).getByRole("button", { name: "Close" }).click()
  await expect(viewer(page)).toBeHidden()
  await expect(opener).toBeFocused()
})

test.describe("on a phone", () => {
  test.use(PHONE_DEVICE)

  test("the viewer fills the screen and the photo fits in it", async ({
    page,
  }) => {
    await open(page, "/photos")
    await page.getByRole("button", { name: PHOTOS[0]!.alt }).click()
    const dialog = viewer(page)
    await expect(dialog).toBeVisible()
    await settled(dialog)
    const box = await dialog.boundingBox()
    expect(box).toEqual({
      height: PHONE.height,
      width: PHONE.width,
      x: 0,
      y: 0,
    })
    const footer = await dialog.locator(".ui-footer").boundingBox()
    expect(footer!.y + footer!.height).toBeLessThanOrEqual(PHONE.height)
    const image = await dialog.getByRole("img").boundingBox()
    expect(image!.y + image!.height).toBeLessThanOrEqual(footer!.y)
  })
})

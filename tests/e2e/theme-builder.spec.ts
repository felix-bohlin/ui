import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"
import { axeNodes } from "./fixtures"

const open = async (page: Page, width = 1440) => {
  await page.setViewportSize({ height: 900, width })
  await page.goto("/theme-builder/")
  await expect(page.locator("[data-contrast-text]")).not.toHaveText(
    "Checking contrast",
  )
}

const changes = (page: Page) => page.locator("[data-change-count]")

const toast = (page: Page) => page.locator("[data-toast-text]")

const room = (page: Page, id: string) => page.locator(`[data-room="${id}"]`)

const group = (page: Page, id: string) => page.locator(`[data-group="${id}"]`)

test("opens on Start with the preset cards and no changes", async ({
  page,
}) => {
  await open(page)
  await expect(room(page, "brand")).toHaveAttribute("aria-current", "true")
  await expect(group(page, "brand")).toBeVisible()
  await expect(group(page, "corners")).toBeHidden()
  await expect(
    page.locator('[data-presets] input[name="builder-preset"]'),
  ).toHaveCount(5)
  await expect(
    page.locator('[data-presets] input[name="builder-preset"]:checked'),
  ).toHaveValue("")
  await expect(changes(page)).toHaveText("No changes")
  await expect(page.locator("[data-contrast-text]")).toHaveText(
    "Contrast passes",
  )
})

test("the rail switches rooms and remembers the last one", async ({ page }) => {
  await open(page)
  await room(page, "typography").click()
  await expect(group(page, "typography")).toBeVisible()
  await expect(group(page, "brand")).toBeHidden()
  await expect(room(page, "typography")).toHaveAttribute("aria-current", "true")
  await expect(group(page, "typography").locator("h3")).toBeFocused()
  await page.reload()
  await expect(group(page, "typography")).toBeVisible()
  await expect(group(page, "brand")).toBeHidden()
})

test("search lists matching settings from every room", async ({ page }) => {
  await open(page)
  const search = page.locator('input[name="builder-search"]')
  await search.fill("radius")
  await expect(page.locator("[data-search-summary]")).toContainText(
    'settings match "radius"',
  )
  await expect(page.locator('[data-control="chip-radius"]')).toBeVisible()
  await expect(page.locator('[data-control="font-body"]')).toBeHidden()
  await expect(page.locator("[data-presets]")).toBeHidden()
  await search.fill("zzzz")
  await expect(page.locator("[data-search-summary]")).toHaveText(
    'No settings match "zzzz".',
  )
  await search.press("Escape")
  await expect(page.locator("[data-search-summary]")).toBeHidden()
  await expect(group(page, "brand")).toBeVisible()
  await expect(page.locator("[data-presets]")).toBeVisible()
})

test("a preset card switches the starting point", async ({ page }) => {
  await open(page)
  await page.locator(".preset-card", { hasText: "M3" }).click()
  await expect(page.locator("[data-preset-name]")).toHaveText("M3")
  await expect(toast(page)).toHaveText(
    "Starting from M3. Your changes are kept.",
  )
  await expect(
    page.locator('[data-presets] input[name="builder-preset"]:checked'),
  ).toHaveValue("m3")
})

test("a mood applies a bundle of changes that Undo or a second press takes back", async ({
  page,
}) => {
  await open(page)
  await expect(page.locator('[data-mood="playful"]')).toHaveAttribute(
    "aria-pressed",
    "false",
  )
  await page.locator('[data-mood="playful"]').click()
  await expect(toast(page)).toHaveText("Playful applied.")
  await expect(page.locator('[data-mood="playful"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await expect(page.locator('[data-mood="minimal"]')).toHaveAttribute(
    "aria-pressed",
    "false",
  )
  await expect(changes(page)).not.toHaveText("No changes")
  await expect(page.locator('[data-room-count="corners"]')).toBeVisible()
  await expect(
    page.locator('[data-control="corners"] .builder-control-origin'),
  ).toHaveText("Changed")
  await page.locator("[data-undo]").click()
  await expect(toast(page)).toHaveText("Undone.")
  await expect(changes(page)).toHaveText("No changes")
  await expect(page.locator('[data-mood="playful"]')).toHaveAttribute(
    "aria-pressed",
    "false",
  )
  await expect(page.locator('[data-mood="playful"]')).toBeFocused()
  await page.locator('[data-mood="playful"]').click()
  await expect(toast(page)).toHaveText("Playful applied.")
  await page.locator('[data-mood="playful"]').click()
  await expect(toast(page)).toHaveText("Playful removed.")
  await expect(page.locator('[data-mood="playful"]')).toHaveAttribute(
    "aria-pressed",
    "false",
  )
  await expect(changes(page)).toHaveText("No changes")
})

test("shuffle skips locked rooms", async ({ page }) => {
  await open(page)
  await expect(page.locator('[data-lock="status"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.locator("[data-shuffle]").click()
  await expect(toast(page)).toHaveText("Shuffled the unlocked settings.")
  await expect(changes(page)).not.toHaveText("No changes")
  await expect(page.locator('[data-room-count="status"]')).toBeHidden()
  await page.locator("[data-reset-all]").click()
  await expect(changes(page)).toHaveText("No changes")
  for (const lock of await page.locator("[data-lock]").all()) {
    if ((await lock.getAttribute("aria-pressed")) !== "true") await lock.click()
  }
  await page.locator("[data-shuffle]").click()
  await expect(toast(page)).toHaveText("Shuffled the unlocked settings.")
  await expect(changes(page)).toHaveText("No changes")
  await page.reload()
  await expect(page.locator('[data-lock][aria-pressed="true"]')).toHaveCount(
    await page.locator("[data-lock]").count(),
  )
})

test("the contrast drawer links a check to its setting", async ({ page }) => {
  await open(page)
  await page.locator("[data-contrast]").click()
  const drawer = page.locator("#builder-contrast")
  await expect(drawer).toHaveAttribute("open")
  await expect(drawer.locator("[data-summary='success']")).toContainText(
    "checks pass",
  )
  expect(
    await drawer.evaluate((dialog) => [
      dialog.scrollHeight > dialog.clientHeight,
      getComputedStyle(document.documentElement).overflow,
    ]),
  ).toEqual([false, "clip"])
  await drawer.locator('[data-go="critical"]').click()
  await expect(drawer).not.toHaveAttribute("open")
  await expect(group(page, "status")).toBeVisible()
  await expect(
    page.locator('[data-control="critical"] .oklch-trigger').first(),
  ).toBeFocused()
})

test("the export drawer holds the CSS", async ({ page }) => {
  await open(page)
  await page.locator('[data-mood="minimal"]').click()
  await page.getByRole("button", { name: "Export CSS" }).click()
  const drawer = page.locator("#builder-export")
  await expect(drawer).toHaveAttribute("open")
  await expect(drawer.locator("[data-css]")).toContainText(
    "@layer theme.custom",
  )
  await expect(drawer.locator("[data-css]")).toContainText("--ui-radius: 0;")
  await drawer.locator("[data-css-copy]").click()
  await expect(drawer.locator("[data-css-status]")).toHaveText(
    /Copied theme\.css\.|Could not copy\./,
  )
})

test("on a phone the preview opens as a sheet", async ({ page }) => {
  await open(page, 390)
  await expect(page.locator(".preview-strip")).toBeVisible()
  await expect(page.locator("[data-canvas-home] .builder-preview")).toHaveCount(
    1,
  )
  await page.locator("[data-open-preview]").click()
  const sheet = page.locator("#builder-preview-drawer")
  await expect(sheet).toHaveAttribute("open")
  await expect(sheet.locator(".builder-preview")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(sheet).not.toHaveAttribute("open")
  await expect(page.locator("[data-canvas-home] .builder-preview")).toHaveCount(
    1,
  )
})

test("has no axe violations, with the drawers open too", async ({ page }) => {
  await open(page)
  const check = async (label: string) => {
    const { violations } = await new AxeBuilder({ page })
      .exclude("iframe")
      .analyze()
    expect(axeNodes(violations), label).toEqual([])
  }
  await check("start")
  await page.locator("[data-contrast]").click()
  await check("contrast drawer")
  await page.keyboard.press("Escape")
  await page.getByRole("button", { name: "Export CSS" }).click()
  await check("export drawer")
})

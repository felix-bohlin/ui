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
    /^All \d+ contrast checks pass$/,
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
  await expect(page.locator("[data-redo-history]")).toBeFocused()
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
    "false",
  )
  await page.locator('[data-lock="status"]').click()
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
  await page.locator("button[data-contrast]").click()
  const drawer = page.locator("#builder-contrast")
  await expect(drawer).toHaveAttribute("open")
  await expect(drawer.locator("[data-summary='success']")).toContainText(
    "checks pass",
  )
  expect(
    await drawer.evaluate((dialog) => {
      dialog.scrollTop = 50
      return [
        dialog.scrollTop,
        getComputedStyle(dialog).overflowY,
        getComputedStyle(document.documentElement).overflow,
      ]
    }),
  ).toEqual([0, "clip", "clip"])
  await drawer.locator('[data-go="critical"]').click()
  await expect(drawer).not.toHaveAttribute("open")
  await expect(group(page, "status")).toBeVisible()
  await expect(
    page
      .locator('[data-control="critical"] button[command="toggle-popover"]')
      .first(),
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
  await page.locator("button[data-contrast]").click()
  await check("contrast drawer")
  await page.keyboard.press("Escape")
  await page.getByRole("button", { name: "Export CSS" }).click()
  await check("export drawer")
})

test("pasting a color, a theme.css or an image sets the theme", async ({
  page,
}) => {
  await open(page)
  const paste = page.locator('input[name="builder-paste"]')
  await paste.fill("#ff6600")
  await paste.dispatchEvent("change")
  await expect(toast(page)).toContainText("Brand color set to oklch(")
  await expect(changes(page)).toHaveText("2 changes")
  await paste.fill("nothing useful")
  await paste.dispatchEvent("change")
  await expect(toast(page)).toHaveText(
    "Nothing to use there. Paste a color, a theme.css or an image.",
  )
  await paste.fill(`@layer theme.custom {
    :where(html, .ui-palette, .ui-contrast-more) {
      --ui-radius: 1rem;
      --ui-density: 0.875;
    }
  }`)
  await paste.dispatchEvent("change")
  await expect(toast(page)).toHaveText(
    "Loaded Default with 2 tokens from the CSS.",
  )
  await expect(
    page.locator('[data-control="corners"] .builder-control-origin'),
  ).toHaveText("Changed")
  await page.evaluate(() => {
    const box = document.createElement("div")
    box.id = "swatch"
    box.style.cssText =
      "position: fixed; inset: 0; z-index: 99999; background: rgb(30, 90, 220)"
    document.body.append(box)
  })
  const png = await page.screenshot({
    clip: { height: 32, width: 32, x: 0, y: 0 },
  })
  await page.evaluate(() => document.getElementById("swatch")?.remove())
  await page
    .locator("[data-paste-file]")
    .setInputFiles({ buffer: png, mimeType: "image/png", name: "blue.png" })
  await expect(toast(page)).toContainText("from the image.")
  await expect(
    page.locator('[data-control="brand"] [data-caption]').first(),
  ).toContainText(/ 2[5-7]\d/)
})

test("undo and redo walk the history, also from the keyboard", async ({
  page,
}) => {
  await open(page)
  await expect(page.locator("[data-undo-history]")).toBeDisabled()
  await page.locator('[data-mood="corporate"]').click()
  await expect(toast(page)).toHaveText("Corporate applied.")
  await page.locator('[data-mood="playful"]').click()
  await expect(toast(page)).toHaveText("Playful applied.")
  await page.locator("[data-undo-history]").click()
  await expect(toast(page)).toHaveText("Undone.")
  await expect(page.locator('[data-mood="corporate"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.locator("[data-redo-history]").click()
  await expect(toast(page)).toHaveText("Redone.")
  await expect(page.locator('[data-mood="playful"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.locator(".builder-title").click()
  await page.keyboard.press("Control+z")
  await expect(toast(page)).toHaveText("Undone.")
  await page.keyboard.press("Control+z")
  await expect(changes(page)).toHaveText("No changes")
  await expect(page.locator("[data-redo-history]")).toBeEnabled()
})

test("saved themes load, compare and delete, and the gallery loads", async ({
  page,
}) => {
  await open(page)
  await page.locator('[data-mood="minimal"]').click()
  await page.locator("[data-saved]").click()
  const drawer = page.locator("#builder-saved")
  await expect(drawer).toHaveAttribute("open")
  await drawer.locator('input[name="snapshot-name"]').fill("Mono")
  await drawer.locator("[data-save-form] button[type=submit]").click()
  await expect(drawer.locator("[data-saved-status]")).toHaveText("Saved Mono.")
  await expect(drawer.locator("[data-snapshots] li")).toHaveCount(1)
  await drawer.locator("[data-snapshots] [data-compare]").click()
  await expect(drawer).not.toHaveAttribute("open")
  await expect(
    page.locator('input[name="preview-tab"][value="compare"]'),
  ).toBeChecked()
  await expect(page.locator("#preview-compare-other")).toHaveText("Mono")
  await expect(page.locator("#preview-compare-yours")).toHaveText("Yours")
  await page.locator("[data-reset-all]").click()
  await expect(changes(page)).toHaveText("No changes")
  await page.locator("[data-saved]").click()
  await drawer.locator("[data-snapshots] [data-load]").click()
  await expect(toast(page)).toHaveText("Loaded Mono.")
  await expect(page.locator('[data-mood="minimal"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.locator("[data-saved]").click()
  await drawer.locator('[data-gallery="paper"] [data-gallery-use]').click()
  await expect(toast(page)).toHaveText("Using Paper from the gallery.")
  await expect(changes(page)).not.toHaveText("No changes")
  await page.locator("[data-saved]").click()
  await drawer.locator("[data-snapshots] [data-delete]").click()
  await expect(drawer.locator("[data-snapshots] li")).toHaveCount(0)
  await expect(drawer.locator("[data-snapshots-empty]")).toBeVisible()
})

test("the States tab shows forced states and Show me spotlights the canvas", async ({
  page,
}) => {
  await open(page)
  await page.locator(".preview-tabs label", { hasText: "States" }).click()
  await expect(
    page.locator('[data-tab="states"] button[disabled]').first(),
  ).toBeVisible()
  await expect(
    page.locator('[data-tab="states"] [aria-invalid="true"]').first(),
  ).toBeAttached()
  await room(page, "corners").click()
  await page.locator('[data-control="corners"] [data-spot]').click()
  await expect(
    page.locator('input[name="preview-tab"][value="components"]'),
  ).toBeChecked()
  await expect(page.locator(".is-spotlit").first()).toBeVisible()
  await expect(page.locator(".is-spotlit")).toHaveCount(0, { timeout: 5000 })
})

test("the All tokens room resolves every token and takes a value", async ({
  page,
}) => {
  await open(page)
  await room(page, "tokens").click()
  await expect(group(page, "tokens")).toBeVisible()
  await expect(
    page.locator('[data-token="--ui-radius"] [data-light] [data-text]'),
  ).toHaveText(/^0?\.5rem$/)
  await expect(
    page.locator('[data-token="--ui-primary"] [data-dark] [data-text]'),
  ).toContainText("oklch(")
  const field = page.locator('input[name="token-ui-space-7"]')
  await field.fill("9rem")
  await field.dispatchEvent("change")
  await expect(changes(page)).toHaveText("1 change")
  await expect(page.locator('[data-room-count="tokens"]')).toHaveText("1")
  await field.fill("url(evil)")
  await field.dispatchEvent("change")
  await expect(toast(page)).toContainText(
    "is not a value --ui-space-7 can take",
  )
  await expect(field).toHaveValue("9rem")
  await page.locator('input[name="builder-search"]').fill("space-7")
  await expect(page.locator("[data-search-summary]")).toHaveText(
    '1 setting matches "space-7".',
  )
  await expect(page.locator("[data-token]:visible")).toHaveCount(1)
})

test("a web font loads on the site and the export imports it", async ({
  page,
}) => {
  await page.route("**/fontsource/css/**", (route) =>
    route.fulfill({ body: "", contentType: "text/css" }),
  )
  await open(page)
  await room(page, "typography").click()
  await page.locator('[data-control="font-body"] select').selectOption("Lora")
  await expect(page.locator('link[href*="fontsource/css/lora"]')).toHaveCount(4)
  await page.getByRole("button", { name: "Export CSS" }).click()
  await expect(page.locator("#builder-export [data-css]")).toContainText(
    '@import url("https://cdn.jsdelivr.net/fontsource/css/lora@latest/400.css");',
  )
  await expect(page.locator("#builder-export [data-font-text]")).toContainText(
    "loads Lora from the Fontsource CDN",
  )
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("[data-json-download]").click(),
  ])
  expect(download.suggestedFilename()).toBe("tokens.json")
})

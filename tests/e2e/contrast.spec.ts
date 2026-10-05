import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { COMPONENTS, openFixture } from "./fixtures"

const style = (locator: Locator, property: string, pseudo?: string) =>
  locator.evaluate(
    (element, [name, pseudoElement]) =>
      getComputedStyle(element, pseudoElement).getPropertyValue(name).trim(),
    [property, pseudo ?? null] as const,
  )

const resolve = (locator: Locator, color: string) =>
  locator.evaluate((element, value) => {
    const probe = document.createElement("div")
    probe.style.color = value
    element.append(probe)
    const resolved = getComputedStyle(probe).color
    probe.remove()
    return resolved
  }, color)

const contrast = (locator: Locator, foreground: string, background: string) =>
  locator.evaluate(
    (element, [fg, bg]) => {
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const context = canvas.getContext("2d", { willReadFrequently: true })!
      const toRgb = (value: string) => {
        const probe = document.createElement("div")
        probe.style.color = value
        element.append(probe)
        context.fillStyle = getComputedStyle(probe).color
        probe.remove()
        context.fillRect(0, 0, 1, 1)
        return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3)
      }
      const luminance = (rgb: number[]) => {
        const [r, g, b] = rgb.map((channel) => {
          const value = channel / 255
          return value <= 0.03928
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const a = luminance(toRgb(fg))
      const b = luminance(toRgb(bg))
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
    },
    [foreground, background] as const,
  )

const setContrast = (page: Page, value: "more" | "no-preference") =>
  page.emulateMedia({ contrast: value })

test.describe("prefers-contrast", () => {
  test.beforeEach(async ({ page }) => {
    await openFixture(page, "html", "theming")
  })

  test("sets --contrast to more", async ({ page }) => {
    const html = page.locator("html")
    expect(await style(html, "--contrast")).toBe("normal")
    await setContrast(page, "more")
    expect(await style(html, "--contrast")).toBe("more")
  })

  test(".ui-contrast-normal on html ignores the preference", async ({
    page,
  }) => {
    await setContrast(page, "more")
    const body = page.locator("body")
    const raised = await resolve(body, "var(--border-color)")
    await page.evaluate(() =>
      document.documentElement.classList.add("ui-contrast-normal"),
    )
    expect(await style(page.locator("html"), "--contrast")).toBe("normal")
    expect(await resolve(body, "var(--border-color)")).not.toBe(raised)
  })

  for (const scheme of ["light", "dark"] as const) {
    test(`raises token contrast in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, contrast: "more" })
      const main = page.locator("main")
      const surface = "var(--surface-default)"
      expect(
        await contrast(main, "var(--text-muted)", surface),
      ).toBeGreaterThan(7)
      expect(
        await contrast(main, "var(--field-border-color)", surface),
      ).toBeGreaterThan(4.5)
      expect(
        await contrast(main, "var(--border-color)", surface),
      ).toBeGreaterThan(3)
      expect(await contrast(main, "var(--primary)", surface)).toBeGreaterThan(7)
      expect(
        await contrast(main, "var(--primary-contrast)", "var(--primary)"),
      ).toBeGreaterThan(7)
    })
  }

  test("a .ui-contrast-more subtree raises contrast", async ({ page }) => {
    const scope = page.locator('[data-example="Default"]')
    const child = scope.locator(".example-row")
    const outside = page.locator('[data-example="Palette"] .example-row')
    const before = await resolve(child, "var(--border-color)")
    await scope.evaluate((element) => element.classList.add("ui-contrast-more"))
    expect(await resolve(child, "var(--border-color)")).not.toBe(before)
    expect(await resolve(outside, "var(--border-color)")).toBe(before)
  })
})

test.describe("forced-colors", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" })
  })

  test("the selected tab uses SelectedItem", async ({ page }) => {
    await openFixture(page, "html", "tabs")
    const label = page.locator(".ui-tab-input:checked + .ui-tab-label").first()
    expect(await style(label, "background-color", "::before")).toBe(
      await resolve(label, "SelectedItem"),
    )
    expect(await style(label, "color")).toBe(
      await resolve(label, "SelectedItemText"),
    )
  })

  test("a checked toggle button uses SelectedItem", async ({ page }) => {
    await openFixture(page, "html", "toggle")
    const button = page.locator(".ui-toggle-button:has(input:checked)").first()
    expect(await style(button, "background-color")).toBe(
      await resolve(button, "SelectedItem"),
    )
  })

  test("an unchecked switch keeps its dot", async ({ page }) => {
    await openFixture(page, "html", "switch")
    const input = page.locator("[role=switch]:not(:checked)").first()
    expect(await style(input, "background-color", "::after")).toBe(
      await resolve(input, "CanvasText"),
    )
  })

  test("a focused field gets an outline", async ({ page }) => {
    await openFixture(page, "html", "text-field")
    const field = page.locator(".ui-text-field .ui-field").first()
    await field.locator("input").first().focus()
    expect(await style(field, "outline-style")).toBe("solid")
    expect(await style(field, "outline-color")).toBe(
      await resolve(field, "Highlight"),
    )
  })

  test("a divider stays visible", async ({ page }) => {
    await openFixture(page, "html", "divider")
    const divider = page.locator(".ui-divider").first()
    expect(await style(divider, "border-block-start-style")).toBe("solid")
  })
})

test("stress/contrast has no AAA contrast violations inside .ui-contrast-more", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/contrast")
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme })
    const { violations } = await new AxeBuilder({ page })
      .include(".ui-contrast-more")
      .withRules(["color-contrast-enhanced"])
      .analyze()
    expect(
      violations.flatMap((violation) =>
        violation.nodes.map((node) => `${colorScheme}: ${node.target}`),
      ),
    ).toEqual([])
  }
})

for (const component of COMPONENTS) {
  test(`html/${component} has no AAA contrast violations with prefers-contrast: more`, async ({
    page,
  }) => {
    await openFixture(page, "html", component)
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme, contrast: "more" })
      const { violations } = await new AxeBuilder({ page })
        .include("main")
        .exclude(".ui-not-rich-text a:not([class])")
        .withRules(["color-contrast-enhanced"])
        .analyze()
      expect(
        violations.flatMap((violation) =>
          violation.nodes.map((node) => `${colorScheme}: ${node.target}`),
        ),
      ).toEqual([])
    }
  })
}

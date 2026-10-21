import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { themeTokenPromises } from "../../src/utils/theme-token-promises"
import { COMPONENTS, computed, openFixture, resolveColor } from "./fixtures"

const contrast = async (
  locator: Locator,
  foreground: string,
  background: string,
) => {
  const colors = await Promise.all([
    resolveColor(locator, foreground),
    resolveColor(locator, background),
  ])
  return locator.page().evaluate((values) => {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const context = canvas.getContext("2d", { willReadFrequently: true })!
    const luminance = (color: string) => {
      context.fillStyle = color
      context.fillRect(0, 0, 1, 1)
      const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data]
        .slice(0, 3)
        .map((channel) => {
          const value = channel / 255
          return value <= 0.03928
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4
        })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const [a, b] = values.map(luminance)
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  }, colors)
}

const setContrast = (page: Page, value: "more" | "no-preference") =>
  page.emulateMedia({ contrast: value })

test.describe("prefers-contrast", () => {
  test.beforeEach(async ({ page }) => {
    await openFixture(page, "html", "stress/theming")
  })

  test("sets --ui-contrast to more", async ({ page }) => {
    const html = page.locator("html")
    expect(await computed(html, "--ui-contrast")).toBe("normal")
    await setContrast(page, "more")
    expect(await computed(html, "--ui-contrast")).toBe("more")
  })

  test(".ui-contrast-normal on html ignores the preference", async ({
    page,
  }) => {
    await setContrast(page, "more")
    const body = page.locator("body")
    const raised = await resolveColor(body, "var(--ui-border-color)")
    await page.evaluate(() =>
      document.documentElement.classList.add("ui-contrast-normal"),
    )
    expect(await computed(page.locator("html"), "--ui-contrast")).toBe("normal")
    expect(await resolveColor(body, "var(--ui-border-color)")).not.toBe(raised)
  })

  for (const scheme of ["light", "dark"] as const) {
    test(`raises token contrast in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, contrast: "more" })
      const main = page.locator("main")
      const surface = "var(--ui-surface-default)"
      expect(
        await contrast(main, "var(--ui-text-muted)", surface),
      ).toBeGreaterThan(7)
      expect(
        await contrast(main, "var(--ui-field-border-color)", surface),
      ).toBeGreaterThan(4.5)
      expect(
        await contrast(main, "var(--ui-border-color)", surface),
      ).toBeGreaterThan(3)
      expect(
        await contrast(main, "var(--ui-primary)", surface),
      ).toBeGreaterThan(7)
      expect(
        await contrast(main, "var(--ui-on-primary)", "var(--ui-primary)"),
      ).toBeGreaterThan(7)
    })
  }

  test("a .ui-contrast-more subtree raises contrast", async ({ page }) => {
    const scope = page.locator('[data-example="Default"]')
    const child = scope.locator(".example-row")
    const outside = page.locator('[data-example="Palette"] .example-row')
    const before = await resolveColor(child, "var(--ui-border-color)")
    await scope.evaluate((element) => element.classList.add("ui-contrast-more"))
    expect(await resolveColor(child, "var(--ui-border-color)")).not.toBe(before)
    expect(await resolveColor(outside, "var(--ui-border-color)")).toBe(before)
  })
})

test.describe("token promises", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    for (const preference of ["no-preference", "more"] as const) {
      test(`hold in ${colorScheme} mode with contrast ${preference}`, async ({
        page,
      }) => {
        await openFixture(page, "html", "stress/theming")
        await page.emulateMedia({ colorScheme, contrast: preference })
        const main = page.locator("main")
        for (const [name, { against, ratio }] of Object.entries(
          themeTokenPromises,
        )) {
          expect
            .soft(
              await contrast(main, `var(${name})`, `var(${against})`),
              `${name} against ${against}`,
            )
            .toBeGreaterThanOrEqual(ratio)
        }
      })
    }
  }
})

test.describe("forced-colors", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" })
  })

  test("the selected tab uses SelectedItem", async ({ page }) => {
    await openFixture(page, "html", "tabs")
    const label = page.locator(".ui-tab-input:checked + .ui-tab-label").first()
    expect(await computed(label, "background-color", "::before")).toBe(
      await resolveColor(label, "SelectedItem"),
    )
    expect(await computed(label, "color")).toBe(
      await resolveColor(label, "SelectedItemText"),
    )
  })

  test("a checked toggle button uses SelectedItem", async ({ page }) => {
    await openFixture(page, "html", "toggle")
    const button = page.locator(".ui-toggle-button:has(input:checked)").first()
    expect(await computed(button, "background-color")).toBe(
      await resolveColor(button, "SelectedItem"),
    )
  })

  test("an unchecked switch keeps its dot", async ({ page }) => {
    await openFixture(page, "html", "switch")
    const input = page.locator("[role=switch]:not(:checked)").first()
    expect(await computed(input, "background-color", "::after")).toBe(
      await resolveColor(input, "CanvasText"),
    )
  })

  test("a focused field gets an outline", async ({ page }) => {
    await openFixture(page, "html", "text-field")
    const field = page.locator(".ui-text-field .ui-field").first()
    await field.locator("input").first().focus()
    expect(await computed(field, "outline-style")).toBe("solid")
    expect(await computed(field, "outline-color")).toBe(
      await resolveColor(field, "Highlight"),
    )
  })

  test("a divider stays visible", async ({ page }) => {
    await openFixture(page, "html", "divider")
    const divider = page.locator("hr.ui-divider").first()
    expect(await computed(divider, "border-block-start-style")).toBe("solid")
  })

  test("a divider with content keeps its lines", async ({ page }) => {
    await openFixture(page, "html", "divider")
    const divider = page.locator(".ui-divider:not(:empty)").first()
    expect(
      await computed(divider, "border-block-start-style", "::before"),
    ).toBe("solid")
    expect(await computed(divider, "border-block-start-style", "::after")).toBe(
      "solid",
    )
  })
})

const enhancedContrastViolations = async (page: Page, selector: string) => {
  const violations = []
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" })
    const result = await new AxeBuilder({ page })
      .include(selector)
      .withRules(["color-contrast-enhanced"])
      .analyze()
    violations.push(
      ...result.violations.flatMap((violation) =>
        violation.nodes.map((node) => `${colorScheme}: ${node.target}`),
      ),
    )
  }
  return violations
}

test("stress/contrast has no AAA contrast violations inside .ui-contrast-more", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/contrast")
  expect(await enhancedContrastViolations(page, ".ui-contrast-more")).toEqual(
    [],
  )
})

for (const id of ["contrast-overlays-menu", "contrast-overlays-tooltip"]) {
  test(`stress/contrast #${id} has no AAA contrast violations when open`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/contrast")
    const popover = page.locator(`#${id}`)
    await page.locator(`[commandfor="${id}"][command="toggle-popover"]`).click()
    await expect(popover).toBeVisible()
    expect(
      await popover.evaluate((element) => element.matches(":popover-open")),
    ).toBe(true)
    expect(
      await popover.evaluate((element) =>
        Boolean(element.closest(".ui-contrast-more")),
      ),
    ).toBe(true)
    expect(await enhancedContrastViolations(page, `#${id}`)).toEqual([])
  })
}

for (const component of COMPONENTS) {
  test(`html/${component} has no AAA contrast violations with prefers-contrast: more`, async ({
    page,
  }) => {
    await openFixture(page, "html", component)
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({
        colorScheme,
        contrast: "more",
        reducedMotion: "reduce",
      })
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

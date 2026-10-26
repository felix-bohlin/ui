import { describe, expect, test } from "vitest"
import { colorToOklch } from "../../src/utils/color-utils"
import { exampleTheme } from "../../src/utils/example-themes"
import {
  BRAND_SWATCHES,
  CORNER_TOKENS,
  LAYERS,
  PLACEHOLDER_CSS,
  cornersOf,
  cornersTokens,
  cornersUpdate,
  customCss,
  exportCss,
  migrateLegacy,
  normalizeTheme,
  presetBrand,
} from "../../src/utils/theme"

describe("customCss", () => {
  test("is empty without tokens", () => {
    expect(customCss({})).toBe("")
  })

  test("writes sorted tokens to every scope in the theme.custom layer", () => {
    expect(customCss({ "--ui-radius": "1rem", "--ui-density": "0.9" }))
      .toBe(`@layer theme.custom {
  :where(html, .ui-palette, .ui-contrast-more) {
    --ui-density: 0.9;
    --ui-radius: 1rem;
  }
}
`)
  })

  test("hands contrast-sensitive roles back under more contrast", () => {
    const css = customCss({
      "--ui-radius": "1rem",
      "--ui-text-subtle": "oklch(0.68 0 0)",
    })
    expect(css).toContain("@media (prefers-contrast: more)")
    expect(css).toContain(
      ":where(.ui-contrast-more, .ui-contrast-more .ui-palette) {\n    --ui-text-subtle: revert-layer;\n  }",
    )
    expect(css.match(/--ui-radius/g)).toHaveLength(1)
  })

  test("keeps a user's focus ring width under more contrast", () => {
    expect(customCss({ "--ui-focus-ring-width": "5px" })).not.toContain(
      "revert-layer",
    )
  })
})

describe("exportCss", () => {
  test("gives a placeholder for the default theme", () => {
    expect(exportCss({ preset: null, tokens: {} })).toBe(PLACEHOLDER_CSS)
  })

  test("starts with the layer order without a preset", () => {
    expect(exportCss({ preset: null, tokens: { "--ui-radius": "0" } })).toMatch(
      new RegExp(`^${LAYERS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    )
  })

  test("puts the user tokens after the preset", () => {
    const css = exportCss({ preset: "m3", tokens: { "--ui-radius": "0" } })
    expect(css.startsWith(exampleTheme("m3")!.css.trimEnd())).toBe(true)
    expect(css.trimEnd().endsWith("--ui-radius: 0;\n  }\n}")).toBe(true)
  })
})

describe("normalizeTheme", () => {
  test("drops unknown presets and anything that is not a --ui- token", () => {
    expect(
      normalizeTheme({
        preset: "nope",
        tokens: { "--ui-radius": "1rem", "--x": "1", "--ui-empty": " " },
      }),
    ).toEqual({ preset: null, tokens: { "--ui-radius": "1rem" } })
    expect(normalizeTheme("junk")).toEqual({ preset: null, tokens: {} })
  })

  test("drops values that could break out of the generated rule", () => {
    expect(
      normalizeTheme({
        preset: null,
        tokens: {
          "--ui-radius": "1rem",
          "--ui-surface": "red; } body { color: red",
          "--ui-text": "url(https://example.com)",
          "--ui-font-body": '"DM Sans", sans-serif',
          "--ui-shadow-control": "var(--x",
        },
      }).tokens,
    ).toEqual({
      "--ui-font-body": '"DM Sans", sans-serif',
      "--ui-radius": "1rem",
    })
  })
})

describe("migrateLegacy", () => {
  const storage =
    (values: Record<string, unknown>) =>
    (key: string): unknown =>
      values[key] ?? null

  test("returns null when nothing was stored", () => {
    expect(migrateLegacy(storage({}))).toBeNull()
  })

  test("keeps the preset and turns the palette knobs into a source", () => {
    expect(
      migrateLegacy(
        storage({
          "opui-custom-theme-light": {
            "--ui-palette-chroma": "0.5",
            "--ui-palette-hue": "20",
            "--ui-radius": "0",
            "enable-grays": "false",
          },
          "opui-example-theme": "m3",
        }),
      ),
    ).toEqual({
      preset: "m3",
      tokens: {
        "--ui-palette-source": "oklch(58% 0.105 20)",
        "--ui-primary-source":
          "light-dark(var(--ui-color-9), var(--ui-color-6))",
        "--ui-radius": "0",
      },
    })
  })
})

describe("migrateLegacy fallbacks", () => {
  test("reads a dark-only config and maps old size tokens to rem", () => {
    expect(
      migrateLegacy((key) =>
        key === "opui-custom-theme-dark"
          ? { "--ui-button-radius": "var(--radius-2)", "--ui-radius": "1rem" }
          : null,
      ),
    ).toEqual({
      preset: null,
      tokens: { "--ui-button-radius": "0.5rem", "--ui-radius": "1rem" },
    })
  })
})

describe("corners", () => {
  test("round-trips every option and reports the preset and custom states", () => {
    expect(cornersOf({})).toBeNull()
    const tokens = Object.fromEntries(
      Object.entries(cornersTokens("1rem")).filter(
        (entry): entry is [string, string] => entry[1] !== null,
      ),
    )
    expect(Object.keys(tokens)).toEqual(CORNER_TOKENS)
    expect(cornersOf(tokens)).toBe("1rem")
    expect(cornersOf({ ...tokens, "--ui-button-radius": "2rem" })).toBe(
      "custom",
    )
    expect(
      Object.values(cornersTokens(null)).every((value) => value === null),
    ).toBe(true)
  })
})

describe("cornersUpdate", () => {
  test("keeps component radii the user set to their own value", () => {
    const update = cornersUpdate(
      { "--ui-button-radius": "var(--ui-radius)", "--ui-chip-radius": "2rem" },
      "0",
    )
    expect(update["--ui-radius"]).toBe("0")
    expect(update["--ui-button-radius"]).toBe("var(--ui-radius)")
    expect("--ui-chip-radius" in update).toBe(false)
  })
})

describe("brand", () => {
  test("swatches run in ascending hue", () => {
    const hues = BRAND_SWATCHES.map((swatch) => colorToOklch(swatch.value)!.H)
    expect(hues).toEqual(hues.toSorted((a, b) => a - b))
  })

  test("presetBrand reads the example theme's brand", () => {
    expect(presetBrand(null)).toBeUndefined()
    expect(presetBrand("bootstrap")).toBe("oklch(0.578 0.228 260)")
    expect(presetBrand("m3")).toBe(
      "light-dark(oklch(0.496 0.13 294), oklch(0.835 0.095 298))",
    )
    expect(presetBrand("shadcn")).toBe(
      "light-dark(oklch(0.205 0 0), oklch(0.922 0 0))",
    )
  })
})

import { describe, expect, test } from "vitest"
import { exampleTheme } from "../../src/utils/example-themes"
import {
  CORNER_TOKENS,
  LAYERS,
  PLACEHOLDER_CSS,
  cornersOf,
  cornersTokens,
  customCss,
  exportCss,
  migrateLegacy,
  normalizeTheme,
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
      "--ui-text-subtle": "#999",
    })
    expect(css).toContain("@media (prefers-contrast: more)")
    expect(css).toContain(
      ":where(.ui-contrast-more, .ui-contrast-more .ui-palette) {\n    --ui-text-subtle: revert-layer;\n  }",
    )
    expect(css.match(/--ui-radius/g)).toHaveLength(1)
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

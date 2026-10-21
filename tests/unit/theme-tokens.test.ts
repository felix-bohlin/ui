import { existsSync } from "node:fs"
import paletteSource from "@opui/core/palette.css?raw"
import themeSource from "@opui/css/theme.css?raw"
import { describe, expect, test } from "vitest"
import { cssVarRows, stylesheets } from "../../src/component-api/rows"
import type { ComponentApi } from "../../src/component-api/types"
import {
  generateCss,
  PLACEHOLDER_CSS,
} from "../../src/components/ThemeGenerator/generateCss"
import { TOKENS, tokenDefaults } from "../../src/utils/theme-store"
import { themeTokenDescriptions } from "../../src/utils/theme-token-descriptions"
import { themeTokenPromises } from "../../src/utils/theme-token-promises"
import {
  parseThemeTokens,
  setThemeToken,
  themeTokens,
} from "../../src/utils/theme-tokens"

const sections = parseThemeTokens()
const tokens = themeTokens()
const find = (name: string) => tokens.find((token) => token.name === name)

const selectorList = (selector: string) => {
  const list = selector.trim().replace(/^:where\(([\s\S]*)\)$/, "$1")
  const parts = [""]
  let depth = 0
  for (const char of list) {
    if (char === "(") depth++
    if (char === ")") depth--
    if (char === "," && depth === 0) parts.push("")
    else parts[parts.length - 1] += char
  }
  return parts.map((part) => part.replaceAll(/\s+/g, ""))
}

const paletteSourceScopes = (css: string) =>
  [...css.replaceAll(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, , body]) => /--ui-palette-source\s*:/.test(body))
    .map(([, selector, body]) => ({ body, selectors: selectorList(selector) }))

describe("theme tokens", () => {
  test("sections follow the headers in theme.css", () => {
    expect(
      sections
        .filter((section) => section.tokens.length > 0)
        .map((section) => section.title),
    ).toEqual([
      "Palette",
      "Palette roles",
      "Named colors (no severity meaning)",
      "Intent tokens",
      "Primary",
      "Text",
      "Surfaces",
      "Borders",
      "Field / input",
      "Focus ring",
      "Typography",
      "Spacing",
      "Control sizes",
      "Button",
      "Divider",
      "Motion",
      "Contrast",
      "State",
      "Icons",
      "Choice controls",
      "Elevation",
      "Overlays",
    ])
  })

  test("every token is declared once", () => {
    const names = tokens.map((token) => token.name)
    expect(new Set(names).size).toBe(names.length)
    expect(find("--ui-border-color")).toBeDefined()
    expect(find("--ui-radius")).toBeDefined()
  })

  test("dark overrides are read from the dark rules", () => {
    expect(find("--ui-palette-hue")).toEqual({
      dark: "var(--hue-blue)",
      name: "--ui-palette-hue",
      value: "var(--hue-green)",
    })
    expect(find("--ui-motion")?.value).toBe("1")
    expect(find("--ui-motion")?.dark).toBeUndefined()
    expect(find("--ui-palette-hue-rotate-by")?.value).toBe("0")
    expect(find("--ui-palette-source")?.optional).toBe(true)
    expect(find("--ui-focus-ring-color")?.optional).toBeUndefined()
    expect(find("--ui-color-scheme")).toBeUndefined()
  })

  test("every token has a description and no description is stale", () => {
    const names = tokens.map((token) => token.name)
    for (const name of names) {
      expect(themeTokenDescriptions[name], name).toBeTruthy()
    }
    for (const name of Object.keys(themeTokenDescriptions)) {
      expect(names, name).toContain(name)
    }
    expect(Object.keys(themeTokenDescriptions)).toEqual(
      Object.keys(themeTokenDescriptions).toSorted(),
    )
  })

  test("every promise names declared tokens and is sorted", () => {
    for (const [name, promise] of Object.entries(themeTokenPromises)) {
      expect(find(name), name).toBeDefined()
      expect(find(promise.against), promise.against).toBeDefined()
    }
    expect(Object.keys(themeTokenPromises)).toEqual(
      Object.keys(themeTokenPromises).toSorted(),
    )
  })

  test("every store token exists in theme.css", () => {
    for (const token of TOKENS) expect(find(token)).toBeDefined()
    expect(tokenDefaults("light")["--ui-palette-hue"]).toBe("145")
    expect(tokenDefaults("dark")["--ui-palette-hue"]).toBe("240")
    expect(tokenDefaults("light")["--ui-radius"]).toBe("var(--size-2)")
  })

  test("contrast overrides also set the tokens derived from them", () => {
    const block = themeSource.slice(
      themeSource.indexOf("@container style(--ui-contrast: more)"),
    )
    const overridden = new Set(
      [...block.matchAll(/^\s*(--[\w-]+):/gm)].map((match) => match[1]),
    )
    expect(overridden.size).toBeGreaterThan(0)
    for (const token of tokens.filter((candidate) => !candidate.optional)) {
      const references = [
        ...`${token.value} ${token.dark ?? ""}`.matchAll(/var\((--[\w-]+)/g),
      ].map((match) => match[1])
      if (references.some((name) => overridden.has(name))) {
        expect(overridden, token.name).toContain(token.name)
      }
    }
  })

  test("every scope that sets --ui-palette-source re-derives the palette", () => {
    const derived = paletteSourceScopes(paletteSource).find(({ body }) =>
      /--ui-color-1\s*:/.test(body),
    )?.selectors
    const scopes = paletteSourceScopes(themeSource).flatMap(
      ({ selectors }) => selectors,
    )
    expect(scopes).toContain(".ui-warning")
    for (const scope of scopes) expect(derived, scope).toContain(scope)
  })

  test("setThemeToken replaces the light declaration only", () => {
    const css = setThemeToken(
      "html {\n  --x: 1;\n}\nhtml.ui-dark {\n  --x: 2;\n}\n",
      "--x",
      "3",
    )
    expect(css).toBe("html {\n  --x: 3;\n}\nhtml.ui-dark {\n  --x: 2;\n}\n")
    expect(() => setThemeToken(css, "--missing", "1")).toThrow()
  })
})

describe("generateCss", () => {
  test("lists only the changed tokens in the theme.custom layer", () => {
    const css = generateCss({
      dark: {
        "--ui-radius": "var(--radius-3)",
        "--ui-palette-hue": "200",
      },
      light: {
        "--ui-radius": "var(--radius-3)",
        "--ui-palette-hue": "30",
      },
    })
    expect(css)
      .toBe(`@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
@layer theme.palette, theme.base, theme.custom;

@layer theme.custom {
  :where(html) {
    --ui-palette-hue: 30;
    --ui-radius: var(--radius-3);
  }

  :where(html.ui-dark) {
    --ui-palette-hue: 200;
  }

  @media (prefers-color-scheme: dark) {
    :where(html:not(.ui-light)) {
      --ui-palette-hue: 200;
    }
  }
}
`)
  })

  test("leaves out dark values that the light block and defaults already give", () => {
    const css = generateCss({
      dark: { "--ui-radius": "0", "--ui-palette-hue": "240" },
      light: { "--ui-radius": "0" },
    })
    expect(css).toContain("--ui-radius: 0;")
    expect(css).not.toContain("--ui-palette-hue")
    expect(css).not.toContain("ui-dark")
  })

  test("starts from an example theme and adds the changes on top", () => {
    const css = generateCss({
      dark: { "--ui-radius": "0", "--ui-palette-hue": "200" },
      light: { "--ui-radius": "0", "--ui-palette-hue": "280" },
      example: {
        "--ui-radius": "var(--size-1)",
        "--ui-density": "0.875",
        "--ui-palette-hue": "280",
      },
    })
    expect(css).toContain(`  :where(html) {
    --ui-radius: 0;
    --ui-density: 0.875;
    --ui-palette-hue: 280;
  }`)
    expect(css).toMatch(
      /:where\(html\.ui-dark\) \{\n {4}--ui-palette-hue: 200;\n {2}\}/,
    )
    expect(
      generateCss({
        dark: {},
        light: {},
        example: { "--ui-density": "0.875" },
      }),
    ).toContain("--ui-density: 0.875;")
  })

  test("returns the placeholder without changes", () => {
    expect(generateCss({ dark: {}, light: {} })).toBe(PLACEHOLDER_CSS)
  })

  test("swaps grays for palette steps when grays are disabled", () => {
    const css = generateCss({
      dark: { "enable-grays": "false" },
      light: { "enable-grays": "false" },
    })
    expect(css).toContain(":where(html, .ui-palette) {")
    expect(css).toContain(
      "--ui-surface-default: light-dark(var(--ui-color-1), var(--ui-color-14));",
    )
    expect(css).toContain("--ui-neutral: var(--ui-color-9);")
  })

  test("mixes gray and palette steps when only one mode disables grays", () => {
    const css = generateCss({ dark: {}, light: { "enable-grays": "false" } })
    expect(css).toContain(
      "--ui-surface-default: light-dark(var(--ui-color-1), var(--ui-gray-13));",
    )
    expect(css).toContain(
      "--ui-neutral: light-dark(var(--ui-color-9), var(--ui-gray-9));",
    )
  })
})

describe("component css variables", () => {
  const apis = Object.values(
    import.meta.glob<{ default: ComponentApi }>(
      "../../src/component-api/*/api.ts",
      { eager: true },
    ),
  ).map((module) => module.default)

  test("every api maps to existing stylesheets", () => {
    for (const api of apis) {
      for (const file of stylesheets(api)) {
        expect(existsSync(file), `${api.component}: ${file}`).toBe(true)
      }
    }
  })

  test("button reads its size and radius tokens", () => {
    const button = apis.find((api) => api.component === "Button")!
    const names = cssVarRows(button).map((row) => row.name)
    expect(names).toContain("--ui-button-radius")
    expect(names).toContain("--ui-button-size")
    expect(names).toContain("--ui-disabled-opacity")
    expect(names).toEqual(names.toSorted())
  })
})

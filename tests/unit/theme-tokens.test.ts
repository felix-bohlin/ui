import { existsSync } from "node:fs"
import themeSource from "@opui/css/theme.css?raw"
import { describe, expect, test } from "vitest"
import { cssVarRows, stylesheets } from "../../src/component-api/rows"
import type { ComponentApi } from "../../src/component-api/types"
import { generateCss } from "../../src/components/ThemeGenerator/generateCss"
import { TOKENS, tokenDefaults } from "../../src/utils/theme-store"
import { themeTokenDescriptions } from "../../src/utils/theme-token-descriptions"
import {
  parseThemeTokens,
  setThemeToken,
  themeTokens,
} from "../../src/utils/theme-tokens"

const sections = parseThemeTokens()
const tokens = themeTokens()
const find = (name: string) => tokens.find((token) => token.name === name)

describe("theme tokens", () => {
  test("sections follow the headers in theme.css", () => {
    expect(
      sections
        .filter((section) => section.tokens.length > 0)
        .map((section) => section.title),
    ).toEqual([
      "Palette",
      "Named colors (no severity meaning)",
      "Intent tokens",
      "Primary",
      "Text",
      "Surfaces",
      "Borders",
      "Field / input",
      "Focus ring",
      "Typography",
      "Control sizes",
      "Button",
      "Divider",
      "Motion",
      "Contrast",
      "State",
      "Icons",
      "Choice controls",
      "Overlays",
    ])
  })

  test("every token is declared once", () => {
    const names = tokens.map((token) => token.name)
    expect(new Set(names).size).toBe(names.length)
    expect(find("--border-color")).toBeDefined()
    expect(find("--border-radius")).toBeDefined()
  })

  test("dark overrides are read from the dark rules", () => {
    expect(find("--palette-hue")).toEqual({
      dark: "var(--hue-blue)",
      name: "--palette-hue",
      value: "var(--hue-green)",
    })
    expect(find("--motion")?.value).toBe("1")
    expect(find("--motion")?.dark).toBeUndefined()
    expect(find("--palette-hue-rotate-by")?.value).toBe("0")
    expect(find("--palette-source")?.optional).toBe(true)
    expect(find("--focus-ring-color")?.optional).toBe(true)
    expect(find("--color-scheme")).toBeUndefined()
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

  test("every store token exists in theme.css", () => {
    for (const token of TOKENS) expect(find(token)).toBeDefined()
    expect(tokenDefaults("light")["--palette-hue"]).toBe("145")
    expect(tokenDefaults("dark")["--palette-hue"]).toBe("240")
    expect(tokenDefaults("light")["--border-radius"]).toBe("var(--size-2)")
  })

  test("contrast overrides also set the tokens derived from them", () => {
    const block = themeSource.slice(
      themeSource.indexOf("@container style(--contrast: more)"),
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
  test("substitutes the configured values into theme.css", () => {
    const css = generateCss({
      dark: { "--border-radius": "var(--radius-3)", "--palette-hue": "200" },
      light: { "--border-radius": "var(--radius-3)", "--palette-hue": "30" },
    })
    expect(css).toContain("--palette-hue: 30;")
    expect(css).toContain("--palette-hue: 200;")
    expect(css).toContain("--border-radius: var(--radius-3);")
    expect(css).toMatch(
      /:where\(html\.ui-dark\) \{\n {4}--palette-hue: 200;\n {2}\}/,
    )
    expect(css).not.toMatch(/light-dark\(\s*\d/)
    expect(parseThemeTokens(css).length).toBe(sections.length)
  })

  test("swaps grays for palette steps when grays are disabled", () => {
    const css = generateCss({
      dark: { "enable-grays": "false" },
      light: { "enable-grays": "false" },
    })
    expect(css).toContain(
      "--surface-default: light-dark(var(--color-1), var(--color-14));",
    )
    expect(css).toContain("--neutral: var(--color-9);")
  })

  test("mixes gray and palette steps when only one mode disables grays", () => {
    const css = generateCss({ dark: {}, light: { "enable-grays": "false" } })
    expect(css).toContain(
      "--surface-default: light-dark(var(--color-1), var(--gray-13));",
    )
    expect(css).toContain(
      "--neutral: light-dark(var(--color-9), var(--gray-9));",
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
    expect(names).toContain("--button-border-radius")
    expect(names).toContain("--button-size")
    expect(names).toContain("--disabled-opacity")
    expect(names).toEqual(names.toSorted())
  })
})

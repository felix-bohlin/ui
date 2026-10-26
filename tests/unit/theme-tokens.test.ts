import { existsSync, readFileSync, readdirSync } from "node:fs"
import paletteSource from "@opui/core/palette.css?raw"
import themeSource from "@opui/css/theme.css?raw"
import { describe, expect, test } from "vitest"
import { cssVarRows, stylesheets } from "../../src/component-api/rows"
import type { ComponentApi } from "../../src/component-api/types"
import { BRAND_TOKENS, CORNER_TOKENS, FONT_TOKENS } from "../../src/utils/theme"
import { paletteSteps } from "../../src/utils/palette-steps"
import { themeTokenDescriptions } from "../../src/utils/theme-token-descriptions"
import { themeTokenPromises } from "../../src/utils/theme-token-promises"
import { themeTokenTiers } from "../../src/utils/theme-token-tiers"
import {
  INSTANCE_INPUTS,
  OVERRIDE_HOOKS,
  parseThemeTokens,
  setThemeToken,
  themeTokenSections,
  themeTokens,
  tokenTier,
} from "../../src/utils/theme-tokens"
import { tokenType, tokensJson } from "../../src/utils/tokens-json"

const sections = parseThemeTokens()
const tokens = themeTokens()
const find = (name: string) => tokens.find((token) => token.name === name)
const steps = new Set(paletteSteps().map((step) => step.name))

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

const componentCss = [
  ...readdirSync("packages/opui/css/components").map(
    (file) => `packages/opui/css/components/${file}`,
  ),
  ...readdirSync("packages/opui/core").map(
    (file) => `packages/opui/core/${file}`,
  ),
]
  .filter((file) => file.endsWith(".css"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n")
  .replaceAll(/\s+/g, " ")
  .replaceAll(/\( /g, "(")

const fallbacksOf = (name: string) => {
  const fallbacks = new Set<string>()
  const needle = `var(${name},`
  let from = componentCss.indexOf(needle)
  while (from >= 0) {
    let depth = 1
    let index = from + needle.length
    for (; depth > 0 && index < componentCss.length; index++) {
      if (componentCss[index] === "(") depth++
      if (componentCss[index] === ")") depth--
    }
    fallbacks.add(
      componentCss
        .slice(from + needle.length, index - 1)
        .replaceAll(/\s+/g, " ")
        .trim(),
    )
    from = componentCss.indexOf(needle, index)
  }
  return [...fallbacks]
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
      "Color scheme",
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
      "Code",
      "Spacing",
      "Controls",
      "Control sizes",
      "Button",
      "Tabs",
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

  test("the table adds the palette steps and the instance inputs", () => {
    const titles = themeTokenSections().map((section) => section.title)
    expect(titles.indexOf("Palette steps")).toBe(titles.indexOf("Palette") + 1)
    expect(titles.at(-1)).toBe("Instance inputs")
    const names = (title: string) =>
      themeTokenSections()
        .find((section) => section.title === title)!
        .tokens.map((token) => token.name)
    expect(names("Palette steps")).toEqual(
      ["color", "gray"].flatMap((family) =>
        Array.from({ length: 16 }, (_, index) => `--ui-${family}-${index + 1}`),
      ),
    )
    expect(names("Palette steps").every((name) => find(name))).toBe(true)
    expect(names("Instance inputs")).toEqual(
      INSTANCE_INPUTS.map((token) => token.name),
    )
    expect(names("Instance inputs").some((name) => find(name))).toBe(false)
  })

  test("every token a stylesheet reads is a theme token or an instance input", () => {
    const reads = new Set(
      [...componentCss.matchAll(/var\((--ui-[\w-]+)/g)].map(
        (match) => match[1],
      ),
    )
    const inputs = INSTANCE_INPUTS.map((token) => token.name)
    expect(
      [...reads].filter((name) => !find(name) && !inputs.includes(name)),
    ).toEqual([])
    for (const name of inputs) {
      expect(reads, name).toContain(name)
      expect(themeSource, name).not.toContain(`${name}:`)
    }
  })

  test("every token is declared once", () => {
    const names = tokens.map((token) => token.name)
    expect(new Set(names).size).toBe(names.length)
    expect(find("--ui-border-color")).toBeDefined()
    expect(find("--ui-radius")).toBeDefined()
  })

  test("the parser reads light, dark, more-contrast and optional values", () => {
    const parsed = parseThemeTokens(`@layer theme.base {
  :where(html) {
    /* Text - text colors */
    --x-text: var(--x-ink);
    /* --x-source: red; */
    --x-shadow:
      0 1px red,
      0 2px blue;

    /* Motion */
    --x-motion: 1;
  }

  :where(html.ui-dark) {
    --x-text: white;
    --x-dark-only: 1;
  }

  @media (prefers-color-scheme: dark) {
    :where(html:not(.ui-light)) {
      --x-text: white;
    }
  }

  .ui-card {
    --x-card: 1;
  }

  @container style(--ui-contrast: more) {
    :where(*) {
      --x-text: black;
    }
  }
}
`)
    expect(parsed).toEqual([
      {
        note: "text colors",
        title: "Text",
        tokens: [
          {
            dark: "white",
            moreContrast: "black",
            name: "--x-text",
            value: "var(--x-ink)",
          },
          { name: "--x-source", optional: true, value: "red" },
          { name: "--x-shadow", value: "0 1px red, 0 2px blue" },
        ],
      },
      {
        note: undefined,
        title: "Motion",
        tokens: [{ name: "--x-motion", value: "1" }],
      },
    ])
  })

  test("theme.css has dark and more-contrast overrides, and optional tokens", () => {
    expect(tokens.filter((token) => token.dark).length).toBeGreaterThan(0)
    expect(tokens.filter((token) => token.moreContrast).length).toBeGreaterThan(
      0,
    )
    expect(tokens.filter((token) => token.optional).length).toBeGreaterThan(0)
  })

  test("every token has a design token type, unless the format has none for it", () => {
    expect(
      tokens
        .filter((token) => !tokenType(token.name))
        .map((token) => token.name)
        .toSorted(),
    ).toEqual([
      "--ui-button-hover",
      "--ui-button-hover-translate",
      "--ui-color-scheme",
      "--ui-contrast",
    ])
  })

  test("every token has a description and no description is stale", () => {
    const names = themeTokenSections()
      .flatMap((section) => section.tokens)
      .map((token) => token.name)
    for (const name of names) {
      expect(themeTokenDescriptions[name], name).toBeTruthy()
      expect(themeTokenDescriptions[name], name).not.toContain("undefined")
    }
    for (const name of Object.keys(themeTokenDescriptions)) {
      expect(names, name).toContain(name)
    }
    const written = Object.keys(themeTokenDescriptions).filter(
      (name) => !steps.has(name),
    )
    expect(written).toEqual(written.toSorted())
  })

  test("every promise names declared tokens and is sorted", () => {
    for (const [name, promise] of Object.entries(themeTokenPromises)) {
      expect(find(name), name).toBeDefined()
      for (const against of promise.against) {
        for (const read of against.match(/--ui-[\w-]+/g) ?? [])
          expect(find(read), read).toBeDefined()
      }
    }
    expect(Object.keys(themeTokenPromises)).toEqual(
      Object.keys(themeTokenPromises).toSorted(),
    )
  })

  test("every token the quick theme controls write exists in theme.css", () => {
    for (const token of [...BRAND_TOKENS, ...CORNER_TOKENS, ...FONT_TOKENS]) {
      expect(find(token)).toBeDefined()
    }
  })

  test("the knob block reads no other token, so knobs inherit into every scope", () => {
    const start = themeSource.indexOf(":where(html) {")
    const end = themeSource.indexOf("\n  }\n", start)
    const block = themeSource.slice(start, end)
    const reads = [
      ...block.matchAll(/^\s*(--ui-[\w-]+):[^;]*var\(--(?:ui-|_)[^;]*;/gm),
    ].map((match) => match[1])
    expect(reads).toEqual([])
  })

  test("the contrast rules set knobs only, and both set the same ones", () => {
    const bodies = [
      ...themeSource.matchAll(
        /:where\((?:html:not\(\.ui-contrast-normal\)|\.ui-contrast-more)\) \{([^}]*)\}/g,
      ),
    ].map((match) => match[1].replaceAll(/\s+/g, " ").trim())
    expect(bodies).toHaveLength(2)
    expect(bodies[0]).toBe(bodies[1])
    expect(bodies[0]).not.toMatch(/var\(--(?:ui-|_)/)
  })

  test("an optional token has one fallback, unless it is a hook with a default per component", () => {
    const optional = tokens.filter((token) => token.optional)
    for (const token of optional) {
      const fallbacks = fallbacksOf(token.name)
      if (tokenTier(token.name) === "hook") {
        expect(fallbacks.length, token.name).toBeGreaterThan(1)
      } else {
        expect(fallbacks.length, token.name).toBeLessThanOrEqual(1)
      }
    }
    for (const name of OVERRIDE_HOOKS) {
      expect(find(name)?.optional, name).toBe(true)
    }
    expect([...OVERRIDE_HOOKS]).toEqual([...OVERRIDE_HOOKS].toSorted())
  })

  test("every token has a tier, declared beside the hooks, and no tier is stale", () => {
    const names = new Set(tokens.map((token) => token.name))
    for (const name of Object.keys(themeTokenTiers)) {
      expect(names, name).toContain(name)
      expect(OVERRIDE_HOOKS, name).not.toContain(name)
    }
    for (const tier of ["component", "knob", "primitive"]) {
      const names = Object.entries(themeTokenTiers)
        .filter(([name, candidate]) => candidate === tier && !steps.has(name))
        .map(([name]) => name)
      expect(names, tier).toEqual(names.toSorted())
    }
    expect(tokenTier("--ui-palette-hue")).toBe("knob")
    expect(tokenTier("--ui-font-size-300")).toBe("primitive")
    for (const name of steps) expect(tokenTier(name), name).toBe("primitive")
    expect(tokenTier("--ui-anchor-position-area")).toBe("input")
    expect(tokenTier("--ui-primary")).toBe("role")
    expect(tokenTier("--ui-selected")).toBe("hook")
    expect(tokenTier("--ui-button-size")).toBe("component")
    expect(tokenTier("--ui-code-bg-color")).toBe("component")
    expect(tokenTier("--ui-backdrop-bg-color")).toBe("role")
    expect(tokenTier("--ui-control-size")).toBe("role")
    const knobBlock = themeSource.slice(
      themeSource.indexOf(":where(html) {"),
      themeSource.indexOf("\n  }\n", themeSource.indexOf(":where(html) {")),
    )
    for (const token of tokens) {
      if (tokenTier(token.name) !== "knob") continue
      expect(
        knobBlock.includes(`${token.name}:`) ||
          token.name === "--ui-primary-source",
        token.name,
      ).toBe(true)
    }
  })

  test("a declared token is read without a fallback", () => {
    const declared = tokens.filter((token) => !token.optional)
    const withFallback = declared
      .filter((token) => fallbacksOf(token.name).length > 0)
      .map((token) => token.name)
    expect(withFallback).toEqual([])
  })

  test("tokens.json holds native values where the CSS allows and the CSS beside them", () => {
    const json = tokensJson()
    expect(json.contrast["ui-text-max-lightness"]).toMatchObject({
      $type: "number",
      $value: 0.41,
    })
    expect(
      json.contrast["ui-text-max-lightness"].$extensions.opui,
    ).toMatchObject({ css: "0.41", modes: { "more-contrast": "0.3" } })
    expect(json.borders["ui-border-width"]).toMatchObject({
      $type: "dimension",
      $value: { unit: "px", value: 1 },
    })
    expect(json.typography["ui-font-size-caption"]).toMatchObject({
      $type: "dimension",
      $value: "{typography.ui-font-size-100}",
    })
    expect(json.contrast["ui-text-strength-light"]).toMatchObject({
      $value: "87%",
    })
    expect(
      json.contrast["ui-text-strength-light"].$extensions.opui.css,
    ).toBeUndefined()
    expect(json.state["ui-selected"]).toMatchObject({
      $extensions: { opui: { optional: true, tier: "hook" } },
    })
    expect(json.state["ui-selected"].$value).toBeUndefined()
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

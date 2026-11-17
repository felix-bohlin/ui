import { readFileSync } from "node:fs"
import { existsSync } from "node:fs"
import { describe, expect, test } from "vitest"
import sets from "../../src/utils/icon-sets.json"
import { customCss } from "../../src/utils/theme"
import {
  ICON_OPTIONS,
  libraryDefaults,
  matchOption,
} from "../../src/utils/theme-builder-controls"
import {
  ICON_TOKENS,
  iconCredit,
  iconExport,
  iconLibraryOf,
  iconTokensOf,
} from "../../src/utils/theme-icons"
import { parsePaste } from "../../src/utils/theme-import"
import { decodeTheme, encodeTheme } from "../../src/utils/theme-share"

const lucide = iconTokensOf("lucide")!
const defaults = libraryDefaults(
  readFileSync("packages/opui/css/theme.css", "utf8"),
)
const payload = (encoded: string) =>
  JSON.parse(
    Buffer.from(
      encoded.replaceAll("-", "+").replaceAll("_", "/"),
      "base64",
    ).toString(),
  )

describe("iconLibraryOf", () => {
  test("names the library whose 17 tokens all match", () => {
    expect(iconLibraryOf({ ...lucide, "--ui-radius": "1rem" })).toBe("lucide")
  })

  test("names none when one token differs", () => {
    expect(
      iconLibraryOf({
        ...lucide,
        "--ui-icon-close": iconTokensOf("tabler")!["--ui-icon-close"]!,
      }),
    ).toBeNull()
  })
})

describe("iconCredit", () => {
  test("names the library, its licence, SVG package and official components", () => {
    expect(iconCredit("lucide")).toBe(
      `Icons: Lucide ${sets.lucide.version} (ISC), ${sets.lucide.copyright}, https://lucide.dev\nSVG files: lucide-static. Components: lucide-react (React), @lucide/svelte (Svelte), @lucide/vue (Vue).\nStylesheet: opui-css/icons/lucide.css sets the same tokens.`,
    )
  })

  test("says what the package is when it isn't the library's own, and lists no components it doesn't have", () => {
    expect(iconCredit("material-symbols")).toBe(
      `Icons: Material Symbols ${sets["material-symbols"].version} (Apache-2.0), Copyright Google LLC, https://github.com/google/material-design-icons\nSVG files: @material-symbols/svg-400, a community copy of Google's files.\nStylesheet: opui-css/icons/material-symbols.css sets the same tokens.`,
    )
  })
})

describe("the stylesheet a credit names", () => {
  test.each(Object.keys(sets))("exists for %s", (id) => {
    const [, path] = /Stylesheet: opui-css\/(\S+) /.exec(iconCredit(id))!
    expect(existsSync(`packages/opui/${path}`), path).toBe(true)
  })
})

describe("export", () => {
  test("writes a library's icon tokens in their own rule after its credit", () => {
    const css = customCss(
      { ...lucide, "--ui-radius": "1rem" },
      iconExport(lucide),
    )
    expect(css).toContain(
      `  :where(html, .ui-palette, .ui-contrast-more) {\n    --ui-radius: 1rem;\n  }\n\n  /*\n   * Icons: Lucide`,
    )
    expect(css.indexOf("--ui-icon-check")).toBeGreaterThan(css.indexOf("*/"))
  })

  test("keeps icon tokens that match no library with the others", () => {
    const tokens = {
      ...lucide,
      "--ui-icon-close": 'url("data:image/svg+xml,x")',
    }
    expect(iconExport(tokens)).toBeNull()
    expect(customCss(tokens, iconExport(tokens))).not.toContain("/*")
  })
})

describe("share links", () => {
  test("store the library's name instead of its 17 images", () => {
    const encoded = encodeTheme({
      preset: null,
      tokens: { ...lucide, "--ui-radius": "1rem" },
    })
    expect(payload(encoded)).toEqual({
      icons: "lucide",
      preset: null,
      tokens: { "--ui-radius": "1rem" },
    })
    expect(decodeTheme(encoded)?.tokens).toEqual({
      ...lucide,
      "--ui-radius": "1rem",
    })
  })

  test("store the images of icons that match no library", () => {
    const tokens = {
      ...lucide,
      "--ui-icon-close": iconTokensOf("tabler")!["--ui-icon-close"]!,
    }
    expect(payload(encodeTheme({ preset: null, tokens })).tokens).toEqual(
      tokens,
    )
  })

  test("ignore a library they don't know", () => {
    const encoded = Buffer.from(
      JSON.stringify({ icons: "nope", preset: null, tokens: {} }),
    ).toString("base64url")
    expect(decodeTheme(encoded)).toEqual({ preset: null, tokens: {} })
  })
})

describe("the Icons control", () => {
  test("offers every library, sorted by name", () => {
    expect(ICON_OPTIONS.map((option) => option.value).toSorted()).toEqual(
      Object.keys(sets).toSorted(),
    )
    expect(ICON_OPTIONS.map((option) => option.label)).toEqual(
      ICON_OPTIONS.map((option) => option.label).toSorted(),
    )
    for (const option of ICON_OPTIONS) {
      expect(Object.keys(option.tokens)).toEqual(ICON_TOKENS)
      expect(option.preview).toHaveLength(3)
    }
  })

  test("selects Fluent for the library defaults", () => {
    expect(matchOption(ICON_OPTIONS, () => undefined, defaults)?.value).toBe(
      "fluent",
    )
  })

  test("selects the library of an imported export, or none when an icon changed", () => {
    const pasted = parsePaste(customCss(lucide, iconExport(lucide)))
    expect(pasted.kind).toBe("css")
    const tokens = pasted.kind === "css" ? pasted.theme.tokens : {}
    expect(
      matchOption(ICON_OPTIONS, (token) => tokens[token], defaults)?.value,
    ).toBe("lucide")
    const changed: Record<string, string> = {
      ...tokens,
      "--ui-icon-close": iconTokensOf("tabler")!["--ui-icon-close"]!,
    }
    expect(
      matchOption(ICON_OPTIONS, (token) => changed[token], defaults),
    ).toBeNull()
  })
})

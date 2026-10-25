import { describe, expect, test } from "vitest"
import {
  SHARE_PARAM,
  decodeTheme,
  encodeTheme,
  shareUrl,
} from "../../src/utils/theme-share"

const theme = {
  preset: "m3",
  tokens: {
    "--ui-font-body": '"DM Sans", Avenir, sans-serif',
    "--ui-palette-source": "#ff3e00",
    "--ui-primary-source": "light-dark(#ff3e00, oklch(0.8 0.1 34))",
    "--ui-radius": "0.25rem",
  },
}

const raw = (text: string) =>
  btoa(text).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "")

const encode = (value: unknown) => raw(JSON.stringify(value))

describe("encodeTheme and decodeTheme", () => {
  test("round trip a theme", () => {
    expect(decodeTheme(encodeTheme(theme))).toEqual(theme)
  })

  test("round trip the default theme", () => {
    expect(decodeTheme(encodeTheme({ preset: null, tokens: {} }))).toEqual({
      preset: null,
      tokens: {},
    })
  })

  test("round trip text outside ASCII", () => {
    const tokens = { "--ui-font-body": '"Ålö Sans", sans-serif' }
    expect(decodeTheme(encodeTheme({ preset: null, tokens }))?.tokens).toEqual(
      tokens,
    )
  })

  test("write URL-safe text", () => {
    expect(encodeTheme(theme)).toMatch(/^[\w-]+$/)
  })

  test("drop an unknown preset", () => {
    expect(decodeTheme(encode({ preset: "nope", tokens: {} }))).toEqual({
      preset: null,
      tokens: {},
    })
  })

  test.each([
    ["nothing", null],
    ["an empty string", ""],
    ["text that is not base64url", "not a theme!"],
    ["base64 of text that is not JSON", raw("hello")],
    ["broken UTF-8", raw("\u00ff\u00fe")],
    ["a JSON array", encode([])],
    ["a JSON string", encode("theme")],
    ["a missing tokens object", encode({ preset: null })],
    ["tokens as an array", encode({ preset: null, tokens: [] })],
    ["a preset that is not a string", encode({ preset: 3, tokens: {} })],
    [
      "a token that is not a string",
      encode({ preset: null, tokens: { "--ui-radius": 1 } }),
    ],
    [
      "a name outside the theme tokens",
      encode({ preset: null, tokens: { color: "red" } }),
    ],
    [
      "a value that closes the rule",
      encode({
        preset: null,
        tokens: { "--ui-radius": "0; } body { display: none" },
      }),
    ],
    [
      "a value that loads a URL",
      encode({
        preset: null,
        tokens: { "--ui-surface": "url(https://example.com/x.png)" },
      }),
    ],
    ["a value that is too long", "a".repeat(20000)],
  ])("return null for %s", (_, value) => {
    expect(decodeTheme(value)).toBeNull()
  })
})

describe("shareUrl", () => {
  test("links to the builder with the theme", () => {
    const url = new URL(shareUrl(theme, "https://example.com/html/"))
    expect(url.pathname).toBe("/theme-builder/")
    expect(decodeTheme(url.searchParams.get(SHARE_PARAM))).toEqual(theme)
  })
})

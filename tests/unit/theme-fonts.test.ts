import { describe, expect, test } from "vitest"
import {
  BUNDLED_FONTS,
  WEB_FONTS,
  fontImports,
  fontStack,
  webFontIds,
  webFontOf,
} from "../../src/utils/theme-fonts"

describe("WEB_FONTS", () => {
  test("are sorted by family with unique ids", () => {
    const families = WEB_FONTS.map((font) => font.family)
    expect(families).toEqual([...families].toSorted())
    expect(new Set(WEB_FONTS.map((font) => font.id)).size).toBe(
      WEB_FONTS.length,
    )
    for (const id of BUNDLED_FONTS) {
      expect(
        WEB_FONTS.some((font) => font.id === id),
        id,
      ).toBe(true)
    }
  })

  test("ids are npm style", () => {
    for (const font of WEB_FONTS)
      expect(font.id).toMatch(/^[a-z\d]+(-[a-z\d]+)*$/)
  })
})

describe("fontStack and webFontOf", () => {
  test("quotes families with spaces and adds the category fallback", () => {
    const inter = WEB_FONTS.find((font) => font.id === "inter")!
    const plex = WEB_FONTS.find((font) => font.id === "ibm-plex-mono")!
    expect(fontStack(inter)).toMatch(/^Inter, /)
    expect(fontStack(plex)).toMatch(/^"IBM Plex Mono", ui-monospace/)
    expect(webFontOf(fontStack(plex))?.id).toBe("ibm-plex-mono")
    expect(webFontOf("system-ui, sans-serif")).toBeUndefined()
    expect(webFontOf(undefined)).toBeUndefined()
  })
})

describe("webFontIds and fontImports", () => {
  test("list the ids once, sorted, and write one import per weight", () => {
    expect(
      webFontIds([
        '"Lora", Georgia, serif',
        "Inter, sans-serif",
        "Inter",
        undefined,
      ]),
    ).toEqual(["inter", "lora"])
    const imports = fontImports(["lora"])
    expect(imports.split("\n")).toHaveLength(4)
    expect(imports).toContain(
      '@import url("https://cdn.jsdelivr.net/fontsource/css/lora@latest/400.css");',
    )
    expect(fontImports([])).toBe("")
  })
})

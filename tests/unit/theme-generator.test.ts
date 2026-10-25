import { describe, expect, test } from "vitest"
import { generateCss } from "../../src/components/ThemeGenerator/generateCss"
import { paletteKnobs } from "../../src/utils/color-utils"
import { exampleTheme } from "../../src/utils/example-themes"

describe("paletteKnobs", () => {
  test("reads hex, hsl and oklch source colors", () => {
    expect(paletteKnobs("#6750a4")).toEqual({
      "--ui-palette-chroma": "0.62",
      "--ui-palette-hue": "294",
    })
    expect(paletteKnobs("hsl(217 100% 66%)")).toEqual({
      "--ui-palette-chroma": "0.82",
      "--ui-palette-hue": "260",
    })
    expect(paletteKnobs("oklch(0.58 0.105 240)")).toEqual({
      "--ui-palette-chroma": "0.5",
      "--ui-palette-hue": "240",
    })
    expect(paletteKnobs("light-dark(#fff, #000)")).toBeUndefined()
  })
})

describe("generateCss with an example theme", () => {
  const m3 = exampleTheme("m3")!

  test("keeps the theme's sources without palette knobs", () => {
    const css = generateCss({
      dark: {},
      example: m3.tokens,
      knobs: m3.knobs,
      light: { "--ui-radius": "0" },
    })
    expect(css).toContain("--ui-primary-source:")
    expect(css).not.toContain("--ui-palette-hue:")
  })

  test("drops the theme's sources once a palette knob is set", () => {
    const css = generateCss({
      dark: {},
      example: m3.tokens,
      knobs: m3.knobs,
      light: { "--ui-palette-chroma": "0.62", "--ui-palette-hue": "140" },
    })
    expect(css).not.toContain("--ui-palette-source:")
    expect(css).not.toContain("--ui-primary-source:")
    expect(css).toContain("--ui-palette-chroma: 0.62;")
    expect(css).toContain("--ui-palette-hue: 140;")
    expect(css).toContain("--ui-palette-hue: 294;")
  })
})

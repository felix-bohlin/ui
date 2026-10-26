import { describe, expect, test } from "vitest"
import {
  colorToOklch,
  formatOklch,
  oklchGamut,
  parseOklch,
} from "../../src/utils/color-utils"

describe("parseOklch", () => {
  test("reads numbers, percentages, degrees and alpha", () => {
    expect(parseOklch("oklch(0.627966 0.257704 29.2346)")).toEqual({
      C: 0.257704,
      H: 29.2346,
      L: 0.627966,
      alpha: 1,
    })
    expect(parseOklch("oklch(62.8% 50% 29deg / 50%)")).toEqual({
      C: 0.2,
      H: 29,
      L: 0.628,
      alpha: 0.5,
    })
    expect(parseOklch("oklch(0.5 0.1 250 / 0.25)")?.alpha).toBe(0.25)
  })

  test("reads a missing hue as 0 and wraps hues into one turn", () => {
    expect(parseOklch("oklch(1 0 none)")?.H).toBe(0)
    expect(parseOklch("oklch(0.5 0.1 -30)")?.H).toBe(330)
    expect(parseOklch("oklch(0.5 0.1 390)")?.H).toBe(30)
  })

  test("rejects other color syntaxes", () => {
    expect(parseOklch("#ff3e00")).toBeNull()
    expect(parseOklch("oklab(0.5 0.1 0.1)")).toBeNull()
    expect(parseOklch("oklch(from red l c h)")).toBeNull()
    expect(parseOklch("oklch(var(--l) 0.1 250)")).toBeNull()
  })
})

describe("colorToOklch", () => {
  test("reads hex and oklch", () => {
    expect(colorToOklch("#ffffff")?.L).toBeCloseTo(1, 3)
    expect(colorToOklch("oklch(0.6 0.2 250)")).toEqual({
      C: 0.2,
      H: 250,
      L: 0.6,
    })
  })

  test("rejects anything else", () => {
    expect(colorToOklch("red")).toBeNull()
    expect(colorToOklch("light-dark(#fff, #000)")).toBeNull()
  })
})

describe("formatOklch", () => {
  test("rounds and drops the hue of a gray", () => {
    expect(formatOklch({ C: 0.193_412, H: 23.04, L: 0.626_15 })).toBe(
      "oklch(0.626 0.193 23)",
    )
    expect(formatOklch({ C: 0.000_1, H: 89, L: 1 })).toBe("oklch(1 0 0)")
  })

  test("writes alpha below 1", () => {
    expect(formatOklch({ C: 0, H: 0, L: 1 }, 0.1)).toBe("oklch(1 0 0 / 0.1)")
    expect(formatOklch({ C: 0, H: 0, L: 1 }, 1)).toBe("oklch(1 0 0)")
  })
})

describe("oklchGamut", () => {
  test("sorts colors into sRGB, Display P3 and wider", () => {
    expect(oklchGamut(0.6, 0.1, 250)).toBe("srgb")
    expect(oklchGamut(0.65, 0.25, 30)).toBe("p3")
    expect(oklchGamut(0.7, 0.36, 150)).toBe("wide")
  })

  test("keeps the sRGB corners in sRGB", () => {
    const red = colorToOklch("#ff0000")!
    expect(oklchGamut(red.L, red.C, red.H)).toBe("srgb")
  })
})

import { describe, expect, test } from "vitest"
import {
  COLOR_SPACES,
  formatColor,
  fromSpace,
  gamutMap,
  parseColor,
  toSpace,
} from "../../packages/opui/elements/color-field.js"
import { COLOR_SPACES as COMPONENT_SPACES } from "../../packages/opui/components/ColorField/channels"

const BLUE: [number, number, number] = [0.6, 0.15, 250]

const near = (
  actual: readonly number[],
  expected: readonly number[],
  digits = 3,
) =>
  actual.forEach((value, index) =>
    expect(value).toBeCloseTo(expected[index], digits),
  )

describe("color spaces", () => {
  test("the components offer the spaces the element converts, in order", () => {
    expect(COMPONENT_SPACES).toEqual(COLOR_SPACES)
    expect([...COLOR_SPACES].sort()).toEqual(COLOR_SPACES)
  })

  test("convert oklch into each space like colorjs.io", () => {
    const expected = {
      "a98-rgb": [0.3172, 0.5116, 0.8217],
      "display-p3": [0.2664, 0.5086, 0.8121],
      hsl: [208.2124, 68.7801, 49.5546],
      hwb: [208.2124, 15.4709, 16.3616],
      lab: [52.8659, -4.5064, -50.4063],
      lch: [52.8659, 50.6073, 264.8913],
      oklab: [0.6, -0.0513, -0.141],
      "prophoto-rgb": [0.3862, 0.4321, 0.7563],
      rgb: [39.45, 131.55, 213.28],
      "srgb-linear": [0.0207, 0.229, 0.6673],
      "xyz-d50": [0.1927, 0.2092, 0.4991],
      "xyz-d65": [0.2109, 0.2164, 0.662],
    } as const
    for (const [space, coords] of Object.entries(expected)) {
      const digits = Math.max(...coords.map(Math.abs)) > 2 ? 1 : 3
      near(toSpace(space as keyof typeof expected, BLUE), coords, digits)
    }
  })

  test("come back to the same oklch from every space", () => {
    for (const space of COLOR_SPACES) {
      near(fromSpace(space, toSpace(space, BLUE)), BLUE, 4)
    }
  })

  test("map a color that doesn't fit into the gamut with the CSS Color 4 algorithm", () => {
    const wide: [number, number, number] = [0.7, 0.35, 150]
    near(gamutMap("srgb", wide), [0.7091, 0.2104, 147.0649])
    near(toSpace("rgb", wide), [0, 193.97, 71.61], 1)
    expect(gamutMap("srgb", BLUE)).toEqual(BLUE)
  })

  test("keep the hue of a gray from the previous coordinates", () => {
    expect(toSpace("hsl", [0.5, 0, 0], [120, 50, 50])[0]).toBe(120)
    expect(toSpace("oklch", [0.5, 0, 200])[2]).toBe(200)
  })

  test("format each syntax", () => {
    expect(formatColor("hex", [255, 0, 0])).toBe("#ff0000")
    expect(formatColor("hex", [255, 0, 0], 0.5)).toBe("#ff000080")
    expect(formatColor("rgb", toSpace("rgb", BLUE), 0.5)).toBe(
      "rgb(39 132 213 / 0.5)",
    )
    expect(formatColor("hsl", [208.21, 68.78, 49.56])).toBe(
      "hsl(208.21 68.8% 49.6%)",
    )
    expect(formatColor("display-p3", toSpace("display-p3", BLUE))).toBe(
      "color(display-p3 0.2664 0.5086 0.8121)",
    )
    expect(formatColor("oklch", BLUE)).toBe("oklch(0.6 0.15 250)")
  })

  test("parse the syntaxes into their space", () => {
    expect(parseColor("#f00")).toEqual({
      alpha: 1,
      coords: [255, 0, 0],
      space: "hex",
    })
    expect(parseColor("rgba(255, 0, 0, 0.5)")).toEqual({
      alpha: 0.5,
      coords: [255, 0, 0],
      space: "rgb",
    })
    expect(parseColor("hsl(0.5turn 50% 50%)")?.coords).toEqual([180, 50, 50])
    expect(parseColor("lch(50% 50% 120)")?.coords).toEqual([50, 75, 120])
    expect(parseColor("color(display-p3 1 0 0 / 50%)")).toEqual({
      alpha: 0.5,
      coords: [1, 0, 0],
      space: "display-p3",
    })
    expect(parseColor("color(srgb 1 0 0)")?.space).toBe("rgb")
    expect(parseColor("red")).toBeNull()
    expect(parseColor("rgb(from red r g b)")).toBeNull()
    expect(parseColor("rgb(1 2)")).toBeNull()
  })
})

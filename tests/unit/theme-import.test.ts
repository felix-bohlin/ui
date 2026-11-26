import { describe, expect, test } from "vitest"
import { exampleTheme } from "../../src/utils/example-themes"
import { exportCss } from "../../src/utils/theme"
import { imageColor, parsePaste } from "../../src/utils/theme-import"

describe("parsePaste", () => {
  test("is nothing for empty or plain text", () => {
    expect(parsePaste("")).toEqual({ kind: "none" })
    expect(parsePaste("hello there")).toEqual({ kind: "none" })
  })

  test("reads hex, rgb and oklch colors in order, once each", () => {
    expect(
      parsePaste(
        "Brand #0af, then rgb(10, 20, 30) and oklch(0.6 0.1 200) #0af",
      ),
    ).toEqual({
      colors: ["#00aaff", "rgb(10, 20, 30)", "oklch(0.6 0.1 200)"],
      kind: "colors",
    })
  })

  test("reads the tokens of a theme.css and keeps unsafe ones out", () => {
    const paste = parsePaste(`
      @layer theme.custom {
        :where(html, .ui-palette, .ui-contrast-more) {
          --ui-radius: 1rem;
          --ui-font-body: "DM Sans", sans-serif;
          --ui-shadow-elevated: url(evil);
          --not-ours: 1;
        }
      }`)
    expect(paste).toEqual({
      kind: "css",
      theme: {
        preset: null,
        tokens: {
          "--ui-font-body": '"DM Sans", sans-serif',
          "--ui-radius": "1rem",
        },
      },
    })
  })

  test("recognizes an export built on a preset", () => {
    const paste = parsePaste(
      exportCss({ preset: "m3", tokens: { "--ui-radius": "0" } }),
    )
    expect(paste).toEqual({
      kind: "css",
      theme: { preset: "m3", tokens: { "--ui-radius": "0" } },
    })
    expect(parsePaste(exampleTheme("shadcn")!.css)).toEqual({
      kind: "css",
      theme: { preset: "shadcn", tokens: {} },
    })
  })
})

describe("imageColor", () => {
  const pixels = (colors: [number, number, number][], each = 1) =>
    colors.flatMap((rgb) =>
      Array(each)
        .fill([...rgb, 255])
        .flat(),
    )

  test("takes the dominant saturated hue and ignores grays", () => {
    const color = imageColor(
      pixels([[200, 200, 200]], 50).concat(
        pixels([[30, 90, 220]], 10),
        pixels([[220, 40, 40]], 3),
      ),
    )
    expect(color).toMatch(/^oklch\(0\.\d+ 0\.\d+ 2[5-7]\d(\.\d+)?\)$/)
  })

  test("is null for a gray image", () => {
    expect(imageColor(pixels([[128, 128, 128]], 20))).toBeNull()
  })

  test("skips transparent pixels", () => {
    const data = [220, 40, 40, 0, 30, 90, 220, 255]
    expect(imageColor(data)).toMatch(/ 2[5-7]\d(\.\d+)?\)$/)
  })
})

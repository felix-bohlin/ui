import { describe, expect, test } from "vitest"
import { exampleTheme } from "../../src/utils/example-themes"
import { cornersTokens } from "../../src/utils/theme"
import {
  CONTROLS,
  MONOCHROME_PRIMARY,
  changeCount,
  isChanged,
  isFollow,
  ownTokens,
} from "../../src/utils/theme-builder-controls"

const control = (id: string) => CONTROLS.find((entry) => entry.id === id)!

const corners = Object.fromEntries(
  Object.entries(cornersTokens("1rem")).filter(
    (entry): entry is [string, string] => entry[1] !== null,
  ),
)

const m3 = exampleTheme("m3")!.tokens

describe("isFollow", () => {
  test("matches the corners value however it is spaced", () => {
    expect(isFollow("var( --ui-radius )")).toBe(true)
    expect(isFollow("1rem")).toBe(false)
    expect(isFollow(undefined)).toBe(false)
  })
})

describe("ownTokens", () => {
  test("give the brand color its accent while it follows the brand", () => {
    expect(
      ownTokens(control("brand"), {
        "--ui-primary-source": "light-dark(oklch(0.6 0.1 160), #41b883)",
      }),
    ).toEqual(["--ui-palette-source", "--ui-primary-source"])
  })

  test("leave a balanced or black and white accent to the accent control", () => {
    expect(
      ownTokens(control("brand"), {
        "--ui-primary-source": MONOCHROME_PRIMARY,
      }),
    ).toEqual(["--ui-palette-source"])
  })
})

describe("isChanged", () => {
  test("an accent alone does not change the brand color", () => {
    const tokens = { "--ui-primary-source": MONOCHROME_PRIMARY }
    expect(isChanged(control("brand"), tokens, {})).toBe(false)
    expect(isChanged(control("primary-tone"), tokens, {})).toBe(true)
  })

  test("a radius that follows the corners is not a change", () => {
    expect(isChanged(control("dialog-radius"), corners, {})).toBe(false)
  })

  test("a radius that follows the corners over a preset value is a change", () => {
    expect(isChanged(control("dialog-radius"), corners, m3)).toBe(true)
    expect(isChanged(control("button-shape"), corners, m3)).toBe(true)
  })

  test("the corners count once", () => {
    expect(isChanged(control("corners"), corners, {})).toBe(true)
    expect(
      isChanged(control("corners"), { "--ui-chip-radius": "1rem" }, {}),
    ).toBe(false)
  })
})

describe("changeCount", () => {
  test("counts settings, not tokens", () => {
    expect(changeCount({ preset: null, tokens: {} })).toBe(0)
    expect(changeCount({ preset: null, tokens: corners })).toBe(1)
  })

  test("counts the preset radii the corners replace", () => {
    expect(changeCount({ preset: "m3", tokens: corners })).toBe(6)
  })

  test("counts tokens no setting shows", () => {
    expect(
      changeCount({
        preset: null,
        tokens: { "--ui-palette-hue-rotate-by": "10", "--ui-radius": "0" },
      }),
    ).toBe(2)
  })
})

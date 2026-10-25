import { describe, expect, test } from "vitest"
import {
  CONTRAST_LABELS,
  CONTRAST_MODES,
  colorLabel,
  composite,
  evaluatePair,
  exceptionFor,
  formatRatio,
  modeLabel,
  pairContrast,
  parseSrgb,
  promisePairs,
  summarize,
  summaryText,
} from "../../src/utils/contrast"
import type { ContrastRow, Rgba } from "../../src/utils/contrast"
import {
  THEME_EXCEPTIONS,
  themeTokenPromises,
} from "../../src/utils/theme-token-promises"

const WHITE: Rgba = [1, 1, 1, 1]
const BLACK: Rgba = [0, 0, 0, 1]

describe("parseSrgb", () => {
  test("reads the channels of an opaque color", () => {
    expect(parseSrgb("color(srgb 0.129 0.145 0.161)")).toEqual([
      0.129, 0.145, 0.161, 1,
    ])
  })

  test("keeps the closing parenthesis out of the last channel", () => {
    expect(parseSrgb("color(srgb 1 0.5 0)")?.[2]).toBe(0)
    expect(parseSrgb("color(srgb 1 0.5 0 / 0.25)")).toEqual([1, 0.5, 0, 0.25])
  })

  test("clips out-of-gamut channels", () => {
    expect(parseSrgb("color(srgb -0.0467 0.181 1.2)")).toEqual([0, 0.181, 1, 1])
  })

  test("returns null for anything else", () => {
    expect(parseSrgb("rgb(1, 2, 3)")).toBeNull()
    expect(parseSrgb("color(srgb none 0 0)")).toBeNull()
    expect(parseSrgb("oklch(0.5 0.1 250)")).toBeNull()
  })

  test("returns null for the inherited sentinel color", () => {
    expect(parseSrgb(`color(srgb ${1 / 255} ${2 / 255} ${3 / 255})`)).toBeNull()
  })
})

describe("ratio math", () => {
  test("black on white is 21:1 and white on white is 1:1", () => {
    expect(pairContrast(BLACK, WHITE, WHITE).value).toBeCloseTo(21, 5)
    expect(pairContrast(WHITE, WHITE, WHITE).value).toBe(1)
  })

  test("matches the WCAG value for #767676 on white", () => {
    const gray = 0x76 / 255
    expect(pairContrast([gray, gray, gray, 1], WHITE, WHITE).value).toBeCloseTo(
      4.54,
      2,
    )
  })

  test("composites a translucent foreground over the background", () => {
    expect(composite([0, 0, 0, 0.5], WHITE)).toEqual([0.5, 0.5, 0.5, 1])
    const { fore, value } = pairContrast([0, 0, 0, 0.5], WHITE, WHITE)
    expect(fore).toEqual([0.5, 0.5, 0.5, 1])
    expect(value).toBeCloseTo(3.98, 2)
  })

  test("puts a translucent background on the page surface", () => {
    const { back } = pairContrast(BLACK, [1, 1, 1, 0.5], BLACK)
    expect(back).toEqual([0.5, 0.5, 0.5, 1])
  })

  test("floors the displayed ratio, so 4.499 never reads as 4.50", () => {
    expect(formatRatio(4.499)).toBe("4.49")
    expect(formatRatio(21)).toBe("21.00")
    expect(formatRatio(null)).toBe("n/a")
  })
})

describe("promisePairs", () => {
  const pairs = promisePairs()

  test("has one pair per promised background", () => {
    expect(pairs).toHaveLength(
      Object.values(themeTokenPromises).reduce(
        (sum, { against }) => sum + against.length,
        0,
      ),
    )
    expect(pairs).toHaveLength(62)
  })

  test("reads the fallback when the token is optional", () => {
    expect(
      pairs.find((pair) => pair.token === "--ui-choice-border-color"),
    ).toEqual({
      against: "--ui-surface",
      bg: "var(--ui-surface)",
      fg: "var(--ui-choice-border-color, var(--ui-field-border-color))",
      ratio: 3,
      token: "--ui-choice-border-color",
    })
  })

  test("keeps raw color expressions as the background", () => {
    expect(
      pairs
        .filter((pair) => pair.token === "--ui-on-accent")
        .map((pair) => pair.bg),
    ).toEqual(themeTokenPromises["--ui-on-accent"].against)
  })

  test("every color in a pair has a plain label", () => {
    for (const { against, token } of pairs) {
      expect(CONTRAST_LABELS[token], token).toBeDefined()
      expect(colorLabel(against), against).not.toMatch(/^--/)
    }
  })

  test("labels are sorted", () => {
    expect(Object.keys(CONTRAST_LABELS)).toEqual(
      Object.keys(CONTRAST_LABELS).toSorted(),
    )
  })
})

describe("exceptions", () => {
  const light = CONTRAST_MODES[0]
  const lightMore = CONTRAST_MODES[2]
  const token = "--ui-field-border-color"

  test("are sorted", () => {
    const presets = Object.keys(THEME_EXCEPTIONS)
    expect(presets).toEqual(presets.toSorted())
    for (const schemes of Object.values(THEME_EXCEPTIONS)) {
      expect(Object.keys(schemes)).toEqual(Object.keys(schemes).toSorted())
      for (const tokens of Object.values(schemes)) {
        expect(Object.keys(tokens)).toEqual(Object.keys(tokens).toSorted())
      }
    }
  })

  test("apply to the matching preset at normal contrast", () => {
    expect(exceptionFor({ preset: "shadcn", tokens: {} }, light, token)).toBe(
      THEME_EXCEPTIONS.shadcn.light?.[token],
    )
  })

  test("never apply with more contrast, another preset or an overridden token", () => {
    expect(
      exceptionFor({ preset: "shadcn", tokens: {} }, lightMore, token),
    ).toBeUndefined()
    expect(exceptionFor({ preset: "m3", tokens: {} }, light, token)).toBe(
      undefined,
    )
    expect(exceptionFor({ preset: null, tokens: {} }, light, token)).toBe(
      undefined,
    )
    expect(
      exceptionFor(
        { preset: "shadcn", tokens: { [token]: "red" } },
        light,
        token,
      ),
    ).toBeUndefined()
  })
})

describe("evaluatePair and summarize", () => {
  const pair = promisePairs().find(
    (candidate) => candidate.token === "--ui-field-border-color",
  )!
  const colors = (fg: Rgba) =>
    new Map<string, Rgba | null>([
      ["Canvas", WHITE],
      ["var(--ui-surface)", WHITE],
      [pair.fg, fg],
    ])
  const faint: Rgba = [0.9, 0.9, 0.9, 1]
  const shadcn = { preset: "shadcn", tokens: {} }
  const plain = { preset: null, tokens: {} }

  test("passes on the raw ratio", () => {
    expect(
      evaluatePair(pair, colors(BLACK), CONTRAST_MODES[0], plain),
    ).toMatchObject({ status: "pass" })
    expect(
      evaluatePair(pair, colors(faint), CONTRAST_MODES[0], plain),
    ).toMatchObject({ status: "fail" })
  })

  test("marks a failing preset original instead of failing it", () => {
    expect(
      evaluatePair(pair, colors(faint), CONTRAST_MODES[0], shadcn),
    ).toMatchObject({ status: "preset" })
    expect(
      evaluatePair(pair, colors(faint), CONTRAST_MODES[2], shadcn),
    ).toMatchObject({ status: "fail" })
  })

  test("fails a color it cannot resolve", () => {
    expect(
      evaluatePair(
        pair,
        new Map([["var(--ui-surface)", WHITE]]),
        CONTRAST_MODES[0],
        plain,
      ),
    ).toMatchObject({ status: "fail", value: null })
  })

  test("counts each pair once and each mode separately", () => {
    const row = (statuses: string[]) =>
      ({
        ...pair,
        results: statuses.map((status) => ({ status })),
      }) as ContrastRow
    expect(
      summarize([
        row(["pass", "pass", "pass", "pass"]),
        row(["fail", "fail", "pass", "pass"]),
        row(["pass", "fail", "pass", "pass"]),
        row(["preset", "pass", "pass", "pass"]),
      ]),
    ).toEqual({
      checks: 4,
      failing: 2,
      failingByMode: [1, 2, 0, 0],
      preset: 1,
    })
  })
})

test("the summary reads as one sentence", () => {
  const text = (counts: Parameters<typeof summaryText>[0]) => {
    const { detail, title } = summaryText(counts)
    return title + detail
  }
  const counts = { checks: 62, failing: 0, failingByMode: [0, 0, 0, 0] }
  expect(text({ ...counts, preset: 0 })).toBe(
    "All 62 checks pass in every mode.",
  )
  expect(text({ ...counts, preset: 2 })).toBe(
    "60 of 62 checks pass. The other 2 keep the preset's original colors on purpose.",
  )
  expect(text({ ...counts, preset: 1 })).toBe(
    "61 of 62 checks pass. The other one keeps the preset's original colors on purpose.",
  )
  expect(
    text({ checks: 62, failing: 3, failingByMode: [2, 0, 0, 1], preset: 0 }),
  ).toBe("3 of 62 checks fail: 2 in Light, 1 in Dark with more contrast.")
  expect(
    text({ checks: 62, failing: 1, failingByMode: [0, 1, 0, 0], preset: 0 }),
  ).toBe("1 of 62 checks fails: 1 in Dark.")
})

test("mode labels read plainly", () => {
  expect(CONTRAST_MODES.map(modeLabel)).toEqual([
    "Light",
    "Dark",
    "Light with more contrast",
    "Dark with more contrast",
  ])
})

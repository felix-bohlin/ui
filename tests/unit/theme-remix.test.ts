import { describe, expect, test } from "vitest"
import { CORNERS } from "../../src/utils/theme"
import {
  CONTROLS,
  GROUPS,
  changeCount,
  controlTokens,
  type ChoiceControl,
} from "../../src/utils/theme-builder-controls"
import {
  HARMONIES,
  LOCKED_BY_DEFAULT,
  MOODS,
  STATUS_HUES,
  grayFromBrand,
  moodRemix,
  optionTokens,
  randomBrand,
  shuffleRemix,
  statusFromBrand,
} from "../../src/utils/theme-remix"

const control = (id: string) => CONTROLS.find((entry) => entry.id === id)!

const sequence = (values: number[]) => {
  let index = 0
  return () => values[index++ % values.length]
}

const applied = (parts: { tokens: Record<string, string | null> }[]) =>
  Object.fromEntries(
    parts
      .flatMap((part) => Object.entries(part.tokens))
      .filter((entry): entry is [string, string] => entry[1] !== null),
  )

describe("MOODS", () => {
  test("are sorted by label", () => {
    const labels = MOODS.map((mood) => mood.label)
    expect(labels).toEqual([...labels].toSorted())
  })

  test("name only choice controls and options that exist", () => {
    for (const mood of MOODS) {
      expect(CORNERS.map((corner) => corner.value)).toContain(mood.corners)
      for (const [id, value] of Object.entries(mood.choices)) {
        const entry = control(id) as ChoiceControl
        expect(entry?.kind, `${mood.id} names ${id}`).toBe("choice")
        expect(
          entry.options.map((option) => option.value),
          `${mood.id} sets ${id} to ${value}`,
        ).toContain(value)
      }
    }
  })

  test("never rely on a dynamic option", () => {
    for (const mood of MOODS) {
      for (const [id, value] of Object.entries(mood.choices)) {
        expect(
          Object.keys(optionTokens(id, value)).length,
          `${mood.id}: ${id} ${value}`,
        ).toBeGreaterThan(0)
        const option = (control(id) as ChoiceControl).options.find(
          (entry) => entry.value === value,
        )!
        expect(Object.keys(option.tokens).length).toBeGreaterThan(0)
      }
    }
  })
})

describe("optionTokens", () => {
  test("writes every token of the control, unset ones as null", () => {
    expect(optionTokens("tonal", "neutral")).toEqual({
      "--ui-on-primary-tonal": "var(--ui-text-strong)",
      "--ui-primary-tonal": "var(--ui-surface-tonal)",
    })
    expect(optionTokens("button-shape", "pill")).toEqual({
      "--ui-button-radius": "var(--ui-radius-round)",
    })
  })

  test("throws on an unknown option", () => {
    expect(() => optionTokens("tonal", "glossy")).toThrow("tonal has no glossy")
  })
})

describe("moodRemix", () => {
  test("sets the corners and one part per choice, sorted", () => {
    const mood = MOODS.find((entry) => entry.id === "playful")!
    const remix = moodRemix(mood, {})
    expect(remix.brand).toBeNull()
    expect(remix.parts.map((part) => part.control)).toEqual([
      "corners",
      ...Object.keys(mood.choices).toSorted(),
    ])
    expect(remix.parts[0].tokens["--ui-radius"]).toBe("1rem")
    expect(applied(remix.parts)["--ui-button-radius"]).toBe(
      "var(--ui-radius-round)",
    )
  })

  test("keeps a component radius the theme already sets", () => {
    const mood = MOODS.find((entry) => entry.id === "corporate")!
    const remix = moodRemix(mood, { "--ui-chip-radius": "0" })
    expect(remix.parts[0].tokens).not.toHaveProperty("--ui-chip-radius")
  })

  test("counts as changes on the default theme", () => {
    for (const mood of MOODS) {
      const tokens = applied(moodRemix(mood, {}).parts)
      expect(changeCount({ preset: null, tokens }), mood.id).toBeGreaterThan(3)
    }
  })
})

describe("randomBrand", () => {
  test("stays in a mid lightness and chroma band", () => {
    expect(randomBrand(sequence([0]))).toBe("oklch(0.55 0.120 0)")
    expect(randomBrand(sequence([0.999]))).toBe("oklch(0.65 0.200 360)")
  })
})

describe("shuffleRemix", () => {
  const basic = (groupId: string) =>
    GROUPS.find((group) => group.id === groupId)!.controls.filter(
      (entry) => entry.tier === "basic",
    )

  test("locks nothing by default", () => {
    expect(LOCKED_BY_DEFAULT).toEqual([])
  })

  test("touches only basic controls in unlocked rooms, status from the brand", () => {
    const remix = shuffleRemix(LOCKED_BY_DEFAULT, {}, sequence([0.5]))
    const ids = remix.parts.map((part) => part.control)
    expect(remix.brand).toMatch(/^oklch\(/)
    expect(ids).not.toContain("border-color")
    expect(ids).not.toContain("focus-ring-color")
    for (const id of ids) {
      expect(control(id).tier, id).toBe("basic")
    }
    expect(ids).toEqual(
      GROUPS.flatMap((group) =>
        basic(group.id)
          .filter(
            (entry) =>
              entry.kind !== "brand" &&
              (entry.kind !== "color" || group.id === "status"),
          )
          .map((entry) => entry.id),
      ),
    )
    const status = applied(
      remix.parts.filter((part) => part.control === "critical"),
    )
    expect(status["--ui-critical"]).toEqual(
      statusFromBrand(remix.brand!)["--ui-critical"],
    )
  })

  test("keeps the current brand for the status colors when Start is locked", () => {
    const remix = shuffleRemix(
      ["brand"],
      { "--ui-palette-source": "oklch(0.6 0.15 200)" },
      sequence([0.5]),
    )
    expect(remix.brand).toBeNull()
    expect(
      remix.parts.find((part) => part.control === "info")!.tokens["--ui-info"],
    ).toBe(statusFromBrand("oklch(0.6 0.15 200)")["--ui-info"])
  })

  test("sets the gray tint from a harmony with the brand", () => {
    const remix = shuffleRemix([], {}, sequence([0.5]))
    const gray = remix.parts.find((part) => part.control === "gray-tint")!
    expect(Object.keys(gray.tokens).toSorted()).toEqual([
      "--ui-gray-chroma",
      "--ui-gray-hue",
    ])
  })

  test("respects every lock", () => {
    const remix = shuffleRemix(
      GROUPS.map((group) => group.id),
      {},
      sequence([0.5]),
    )
    expect(remix).toEqual({ brand: null, parts: [] })
  })

  test("picks real options and stays within the ranges", () => {
    for (const seed of [0, 0.3, 0.7, 0.999]) {
      const remix = shuffleRemix([], {}, sequence([seed]))
      for (const part of remix.parts) {
        const entry = control(part.control)
        if (entry.kind === "choice") {
          const match = entry.options.find((option) =>
            Object.entries(option.tokens).every(
              ([token, value]) => part.tokens[token] === value,
            ),
          )
          expect(match, `${part.control} at ${seed}`).toBeTruthy()
          expect(Object.keys(part.tokens).toSorted()).toEqual(
            controlTokens(entry),
          )
        } else if (entry.kind === "range") {
          const value = parseFloat(
            part.tokens[entry.token]!.replace(/^calc\(/, ""),
          )
          expect(value).toBeGreaterThanOrEqual(entry.min)
          expect(value).toBeLessThanOrEqual(entry.max)
        } else if (entry.kind === "corners") {
          expect(CORNERS.map((corner) => corner.value)).toContain(
            part.tokens["--ui-radius"],
          )
        }
      }
    }
  })

  test("keeps the spacing shuffle in a narrow band", () => {
    for (const seed of [0, 0.999]) {
      const part = shuffleRemix([], {}, sequence([seed])).parts.find(
        (entry) => entry.control === "space-scale",
      )!
      const value = Number(part.tokens["--ui-space-scale"])
      expect(value).toBeGreaterThanOrEqual(0.9)
      expect(value).toBeLessThanOrEqual(1.15)
    }
  })
})

describe("statusFromBrand", () => {
  test("keeps each status on its own hue, nudged toward the brand", () => {
    const status = statusFromBrand("oklch(0.6 0.18 40)")
    expect(Object.keys(status).toSorted()).toEqual(Object.keys(STATUS_HUES))
    expect(status["--ui-critical"]).toBe("oklch(0.53 0.18 37)")
    expect(status["--ui-success"]).toBe("oklch(0.53 0.18 133)")
    expect(status["--ui-info"]).toMatch(/ 252\)$/)
    expect(status["--ui-warning"]).toMatch(/^oklch\(0\.66 0\.17 /)
  })

  test("is empty for a color it cannot read", () => {
    expect(statusFromBrand("#ff0000")).toEqual({})
  })
})

describe("grayFromBrand", () => {
  test("follows the harmony", () => {
    expect(HARMONIES).toEqual([...HARMONIES].toSorted())
    expect(grayFromBrand("oklch(0.6 0.15 350)", "analogous")).toEqual({
      "--ui-gray-chroma": "0.012",
      "--ui-gray-hue": "20",
    })
    expect(grayFromBrand("oklch(0.6 0.15 10)", "complementary")).toEqual({
      "--ui-gray-chroma": "0.008",
      "--ui-gray-hue": "190",
    })
    expect(grayFromBrand("oklch(0.6 0.15 10)", "brand")["--ui-gray-hue"]).toBe(
      "10",
    )
    expect(grayFromBrand("oklch(0.6 0.15 10)", "pure")).toEqual({
      "--ui-gray-chroma": "0",
      "--ui-gray-hue": "0",
    })
  })
})

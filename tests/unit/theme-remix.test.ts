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
  LOCKED_BY_DEFAULT,
  MOODS,
  moodRemix,
  optionTokens,
  randomBrand,
  shuffleRemix,
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

  test("locks the status colors by default", () => {
    expect(LOCKED_BY_DEFAULT).toEqual(["status"])
  })

  test("touches only basic controls in unlocked rooms, never colors", () => {
    const remix = shuffleRemix(LOCKED_BY_DEFAULT, {}, sequence([0.5]))
    const ids = remix.parts.map((part) => part.control)
    expect(remix.brand).toMatch(/^oklch\(/)
    expect(ids).not.toContain("critical")
    expect(ids).not.toContain("border-color")
    expect(ids).not.toContain("focus-ring-color")
    for (const id of ids) {
      expect(control(id).tier, id).toBe("basic")
    }
    expect(ids).toEqual(
      GROUPS.filter((group) => group.id !== "status").flatMap((group) =>
        basic(group.id)
          .filter((entry) => !["brand", "color"].includes(entry.kind))
          .map((entry) => entry.id),
      ),
    )
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

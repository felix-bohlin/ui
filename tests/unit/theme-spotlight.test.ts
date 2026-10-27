import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import { CONTROLS } from "../../src/utils/theme-builder-controls"
import { spotlightFor } from "../../src/utils/theme-spotlight"

const specimen = readFileSync(
  new URL(
    "../../src/components/ThemeBuilder/PreviewSpecimen.astro",
    import.meta.url,
  ),
  "utf8",
)

const classesIn = (selector: string) =>
  [...selector.matchAll(/\.([\w-]+)/g)].map((match) => match[1])

describe("spotlightFor", () => {
  test("gives every control a selector", () => {
    for (const control of CONTROLS) {
      expect(spotlightFor(control.id), control.id).not.toBe("")
    }
    expect(spotlightFor("nope")).toBe("")
  })

  test("only names classes the specimen or the library renders", () => {
    for (const control of CONTROLS) {
      for (const name of classesIn(spotlightFor(control.id))) {
        expect(
          name.startsWith("ui-") || specimen.includes(name),
          `${control.id}: .${name}`,
        ).toBe(true)
      }
    }
  })
})

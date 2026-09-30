import { readFileSync, writeFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { COMPONENTS, FRAMEWORKS, openFixture } from "./fixtures"

const KNOWN_VIOLATIONS_FILE = new URL(
  "./a11y-known-violations.json",
  import.meta.url,
)
const RECORD = !!process.env.A11Y_RECORD

const known: Record<string, string[]> = JSON.parse(
  readFileSync(KNOWN_VIOLATIONS_FILE, "utf-8"),
)
const recorded: Record<string, string[]> = {}

for (const framework of FRAMEWORKS) {
  for (const component of COMPONENTS) {
    const key = `${framework}/${component}`

    test(`${key} has no new axe violations`, async ({ page }) => {
      await openFixture(page, framework, component)

      const { violations } = await new AxeBuilder({ page })
        .include("main")
        .exclude("iframe")
        .analyze()
      const ruleIds = [...new Set(violations.map((v) => v.id))].toSorted()

      if (RECORD) {
        if (ruleIds.length > 0) recorded[key] = ruleIds
        return
      }

      const allowed = known[key] ?? []
      const unexpected = violations.filter((v) => !allowed.includes(v.id))
      expect(
        unexpected.map((v) => ({
          help: v.help,
          id: v.id,
          targets: v.nodes.map((node) => node.target.join(" ")),
        })),
      ).toEqual([])

      const fixed = allowed.filter((id) => !ruleIds.includes(id))
      expect(
        fixed,
        `fixed violations; remove them from a11y-known-violations.json`,
      ).toEqual([])
    })
  }
}

test.afterAll(() => {
  if (!RECORD) return
  const sorted = Object.fromEntries(
    Object.keys(recorded)
      .toSorted()
      .map((key) => [key, recorded[key]]),
  )
  writeFileSync(KNOWN_VIOLATIONS_FILE, JSON.stringify(sorted, null, 2) + "\n")
})

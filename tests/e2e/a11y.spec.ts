import { readFileSync, writeFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import {
  BLOCKS,
  COMPONENTS,
  STRESS_TESTS,
  axeNodes,
  openFixture,
} from "./fixtures"

const KNOWN_VIOLATIONS_FILE = new URL(
  "./a11y-known-violations.json",
  import.meta.url,
)
const RECORD = !!process.env.A11Y_RECORD

const readKnown = (): Record<string, string[]> =>
  JSON.parse(readFileSync(KNOWN_VIOLATIONS_FILE, "utf-8"))

const known = readKnown()
const recorded: Record<string, string[]> = {}
const ran = new Set<string>()

const within = (key: string, prefix: string) =>
  key === prefix || key.startsWith(`${prefix}/`)

if (RECORD) test.describe.configure({ mode: "serial" })

const TARGETS = [...BLOCKS, ...COMPONENTS, ...STRESS_TESTS].toSorted()

for (const component of TARGETS) {
  test(`html/${component} has no new axe violations`, async ({
    page,
  }, testInfo) => {
    if (RECORD) {
      expect(
        testInfo.config.workers,
        "recording the ledger needs --workers=1",
      ).toBe(1)
    }
    const prefix = `${testInfo.project.name}/html/${component}`
    await openFixture(page, "html", component)

    const { violations } = await new AxeBuilder({ page })
      .include(component.startsWith("blocks/") ? "body" : "main")
      .exclude('iframe[src*="youtube"]')
      .analyze()
    const nodes = axeNodes(violations)
    const examples = await page.evaluate(
      (targets) =>
        targets.map((target) => {
          try {
            return (
              document
                .querySelector(target)
                ?.closest("[data-example]")
                ?.getAttribute("data-example") ?? ""
            )
          } catch {
            return ""
          }
        }),
      nodes.map((node) => node.target),
    )
    const keyOf = (index: number) =>
      examples[index] ? `${prefix}/${examples[index]}` : prefix
    const present = new Set([
      prefix,
      ...(
        await page
          .locator("[data-example]")
          .evaluateAll((elements) =>
            elements.map((element) => element.getAttribute("data-example")),
          )
      ).map((name) => `${prefix}/${name}`),
    ])

    const found = new Map<string, Set<string>>()
    nodes.forEach((node, index) => {
      const key = keyOf(index)
      if (!found.has(key)) found.set(key, new Set())
      found.get(key)!.add(node.id)
    })

    if (RECORD) {
      ran.add(prefix)
      for (const [key, rules] of found) {
        recorded[key] = [
          ...new Set([...(recorded[key] ?? []), ...rules]),
        ].toSorted()
      }
      return
    }

    const unexpected = nodes.filter(
      (node, index) => !(known[keyOf(index)] ?? []).includes(node.id),
    )
    expect(
      unexpected.map((node) => ({
        example: keyOf(nodes.indexOf(node)),
        help: node.help,
        id: node.id,
        target: node.target,
      })),
    ).toEqual([])

    const fixed = Object.entries(known)
      .filter(([key]) => present.has(key))
      .flatMap(([key, rules]) =>
        rules
          .filter((rule) => !found.get(key)?.has(rule))
          .map((rule) => `${key}: ${rule}`),
      )
    expect(
      fixed,
      `fixed violations; remove them from a11y-known-violations.json`,
    ).toEqual([])

    const stale = Object.keys(known).filter(
      (key) => within(key, prefix) && !present.has(key),
    )
    expect(
      stale,
      `examples that no longer exist; remove them from a11y-known-violations.json`,
    ).toEqual([])
  })
}

test("a11y-known-violations.json only lists pages that exist", () => {
  const scheme = test.info().project.name
  const prefixes = TARGETS.map((target) => `${scheme}/html/${target}`)
  expect(
    Object.keys(known).filter(
      (key) =>
        key.startsWith(`${scheme}/`) &&
        !prefixes.some((prefix) => within(key, prefix)),
    ),
  ).toEqual([])
})

test.afterAll(() => {
  if (!RECORD || ran.size === 0) return
  const merged = Object.fromEntries(
    Object.entries(readKnown()).filter(
      ([key]) => ![...ran].some((prefix) => within(key, prefix)),
    ),
  )
  Object.assign(merged, recorded)
  const sorted = Object.fromEntries(
    Object.keys(merged)
      .toSorted()
      .map((key) => [key, merged[key]]),
  )
  writeFileSync(KNOWN_VIOLATIONS_FILE, JSON.stringify(sorted, null, 2) + "\n")
})

import { existsSync, readdirSync } from "node:fs"
import { expect, test } from "@playwright/test"
import { slotProp } from "../../src/component-api/frameworks"
import type { ComponentApi } from "../../src/component-api/types"
import type {
  UpdateSlot,
  UpdatesWindow,
  UpdateState,
} from "../../src/fixtures/updates"
import {
  casesOf,
  partCasesOf,
  propName,
  TEXT,
  type Case,
} from "../unit/case-table"
import { expectation, expectStill } from "../expectations"
import { instantScrolling, pageErrors } from "./fixtures"

const UPDATED = ["react", "solid", "svelte", "vue"] as const

type Updated = (typeof UPDATED)[number]

const NATIVE_ATTRIBUTES = {
  "aria-describedby": "external-hint",
  "data-update": TEXT,
  placeholder: TEXT,
  title: TEXT,
}

const NESTING_WARNING = /^In HTML, (%s|text nodes) cannot be a child of/

const apiRoot = new URL("../../src/component-api/", import.meta.url)

const apis = (
  await Promise.all(
    readdirSync(apiRoot, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          existsSync(new URL(`${entry.name}/api.ts`, apiRoot)),
      )
      .map(
        async (entry) =>
          (
            (await import(new URL(`${entry.name}/api.ts`, apiRoot).href)) as {
              default: ComponentApi
            }
          ).default,
      ),
  )
).toSorted((a, b) => a.component.localeCompare(b.component, "en"))

const casesByComponent = Map.groupBy(
  apis.flatMap((api) => {
    const cases = [...casesOf(api), ...partCasesOf(api, apis)]
    const components = [...new Set(cases.map(({ component }) => component))]
    return [
      ...cases,
      ...components.map((component) => ({
        ...cases.find((entry) => entry.component === component)!,
        name: "native attributes",
        props: NATIVE_ATTRIBUTES,
        slots: [],
      })),
    ]
  }),
  ({ component }) => component,
)

const stateOf = (
  framework: Updated,
  { props, slots, types }: Case,
): UpdateState => ({
  props: Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      propName(framework, key),
      value,
    ]),
  ),
  slots: slots
    .filter(
      (slot) =>
        framework === "vue" ||
        slot === "default" ||
        types[framework].has(slotProp(slot)),
    )
    .map((slot): UpdateSlot => ({
      fn:
        framework !== "vue" &&
        Boolean(types[framework].get(slotProp(slot))?.includes("=>")),
      prop: slotProp(slot),
      slot,
    })),
})

for (const framework of UPDATED) {
  for (const [component, cases] of casesByComponent) {
    test(`${framework}/${component} renders the same after an update as on a fresh render`, async ({
      page,
    }) => {
      const errors = pageErrors(page)
      await page.route(`**/${TEXT}`, (route) =>
        route.fulfill({ body: "", status: 204 }),
      )
      await instantScrolling(page)
      await page.goto(`/dev/fixtures/${framework}-updates/`)
      await page.waitForFunction(
        () => (window as unknown as UpdatesWindow).opuiUpdates !== undefined,
      )

      const empty = stateOf(framework, { ...cases[0], props: {}, slots: [] })
      for (const entry of cases.filter(({ name }) => name !== "nothing")) {
        const state = stateOf(framework, entry)
        const [fresh, added, cleared, freshEmpty] = await page.evaluate(
          ([framework, component, empty, state]) => {
            const { render } = (window as unknown as UpdatesWindow).opuiUpdates
            return Promise.all([
              render(framework, component, state),
              render(framework, component, empty, state),
              render(framework, component, state, empty),
              render(framework, component, empty),
            ])
          },
          [framework, component, empty, state] as const,
        )
        if (fresh === undefined) continue
        const check = (aspect: string, actual?: string, expected?: string) => {
          const where = {
            aspect,
            check: "updates",
            component,
            framework,
          } as const
          const known = expectation(where)
          if (known) {
            expectStill(expect, actual !== expected, known, where)
          } else {
            expect.soft(actual, `${component} ${aspect}`).toBe(expected)
          }
        }
        check(`with ${entry.name}, set after a render without it`, added, fresh)
        check(
          `without ${entry.name}, unset after a render with it`,
          cleared,
          freshEmpty,
        )
      }
      expect(
        errors.filter((error) => !NESTING_WARNING.test(error)),
        "page errors",
      ).toEqual([])
    })
  }
}

import { describe, expect, test } from "vitest"
import {
  type ComponentFramework,
  frameworks,
} from "../../src/component-api/frameworks"
import { render } from "./renderers"

const modules = import.meta.glob<{ default: unknown } | unknown>(
  [
    "../../packages/opui/components/Dialog/Dialog.*",
    "../../packages/opui/components/Field/Field.*",
    "../../packages/opui/components/Fieldset/Fieldset.*",
    "../../packages/opui/components/NumberField/NumberField.*",
    "../../packages/opui/components/OneTimeCode/OneTimeCode.*",
    "../../packages/opui/components/Range/Range.*",
  ],
  { eager: true },
)

const componentOf = (name: string, framework: ComponentFramework) => {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${frameworks[framework].component(name)}`),
  )?.[1]
  return entry && typeof entry === "object" && "default" in entry
    ? entry.default
    : entry
}

const CASES: [string, Record<string, unknown>][] = [
  ["Dialog", {}],
  ["Field", { endText: "Hint", label: "Name", startText: "From" }],
  ["Fieldset", { as: "div" }],
  ["NumberField", { endText: "Hint", label: "Count", startText: "From" }],
  ["OneTimeCode", { endText: "Hint", label: "Code" }],
  ["Range", { endText: "Hint", label: "Volume", valueSuffix: "%" }],
]

const ID_ATTRIBUTES =
  /\s(id|for|list|aria-labelledby|aria-describedby|aria-controls|commandfor)="([^"]*)"/g

const partsOfEmpty = (html: string) =>
  [...html.matchAll(ID_ATTRIBUTES)].filter(([, , value]) =>
    value.split(/\s+/).some((token) => token.startsWith("-")),
  )

describe("an empty id is no id", () => {
  test.each(
    CASES.flatMap(([name, props]) =>
      (Object.keys(render) as ComponentFramework[]).map(
        (framework) => [name, framework, props] as const,
      ),
    ),
  )(
    "%s in %s generates its part ids instead of ids that start with -",
    async (name, framework, props) => {
      const html = await render[framework](componentOf(name, framework), {
        ...props,
        id: "",
      })
      expect(partsOfEmpty(html).map(([attribute]) => attribute.trim())).toEqual(
        [],
      )
    },
  )

  test("a sample the check must flag: a part id built on an empty id", () => {
    expect(partsOfEmpty('<label id="-label" for="x"></label>')).toHaveLength(1)
    expect(partsOfEmpty('<input aria-describedby="a -end-text">')).toHaveLength(
      1,
    )
    expect(partsOfEmpty('<input id="text-field-1-label">')).toHaveLength(0)
  })
})

import { describe, expect, test } from "vitest"
import type { ComponentFramework } from "../../src/component-api/frameworks"
import { render } from "./renderers"

const modules = import.meta.glob<{ default: unknown } | unknown>(
  [
    "../../packages/opui/components/Dialog/Dialog.*",
    "../../packages/opui/components/Fieldset/Fieldset.*",
    "../../packages/opui/components/NumberField/NumberField.*",
    "../../packages/opui/components/Range/Range.*",
    "../../packages/opui/components/Select/Select.*",
    "../../packages/opui/components/TextField/TextField.*",
  ],
  { eager: true },
)

const EXTENSIONS: Record<ComponentFramework, string> = {
  astro: ".astro",
  react: ".react.tsx",
  svelte: ".svelte",
  vue: ".vue",
}

const componentOf = (name: string, framework: ComponentFramework) => {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${name}${EXTENSIONS[framework]}`),
  )?.[1]
  return entry && typeof entry === "object" && "default" in entry
    ? entry.default
    : entry
}

const CASES: [string, Record<string, unknown>][] = [
  ["Dialog", {}],
  ["Fieldset", { as: "div" }],
  ["NumberField", { endText: "Hint", label: "Count", startText: "From" }],
  ["Range", { endText: "Hint", label: "Volume", valueSuffix: "%" }],
  [
    "Select",
    { endText: "Hint", items: [{ label: "A", value: "a" }], label: "Pick" },
  ],
  ["TextField", { endText: "Hint", label: "Name", startText: "From" }],
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
      (["astro", "react", "svelte", "vue"] as const).map(
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

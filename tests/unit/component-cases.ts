import type { ComponentApi } from "../../src/component-api/types"
import { frameworkProps, splitUnion } from "../../src/utils/component-source"

export const TEXT = "Text"

export const FRAMEWORKS = ["astro", "react", "solid", "svelte", "vue"] as const

export type Framework = (typeof FRAMEWORKS)[number]

export const SAMPLES: Record<string, unknown> = {
  "MenuItem[]": [{ label: "A", value: "a" }],
  "RangeItem[]": [{ label: "A", value: 1 }],
  "SelectItem[]": [{ label: "A", value: "a" }],
  HTMLInputTypeAttribute: "text",
  boolean: true,
  number: 2,
  string: TEXT,
}

export const REACT_NAMES: Record<string, string> = {
  checked: "defaultChecked",
  class: "className",
  for: "htmlFor",
  value: "defaultValue",
}

export const SLOT_TYPE = /\b(Element|ReactNode|Snippet)\b/

export const valuesOf = (type: string) =>
  [
    ...new Set(
      splitUnion(type).flatMap((member) => {
        const literal = /^"(.*)"$/.exec(member)
        if (literal) return [literal[1]]
        if (member === "true") return [true]
        return member in SAMPLES ? [SAMPLES[member]] : []
      }),
    ),
  ].slice(0, 6)

export const slotsOf = (api: ComponentApi) =>
  [
    ...new Set([
      ...(api.slots ?? []).map(({ name }) => name),
      ...api.parts.flatMap((part) => part.slots ?? []),
    ]),
  ].toSorted()

export const propName = (framework: Framework, name: string) =>
  framework === "react" ? (REACT_NAMES[name] ?? name) : name

export type Case = {
  beforeSpread?: boolean
  component: string
  name: string
  plain?: Omit<Case, "plain">
  props: Record<string, unknown>
  reactNames?: Record<string, string>
  slots: string[]
  types: Record<Framework, Map<string, string>>
}

export const casesOf = (api: ComponentApi): Case[] => {
  const types = Object.fromEntries(
    FRAMEWORKS.map((framework) => [framework, frameworkProps(api, framework)]),
  ) as Record<Framework, Map<string, string>>
  const shared = [...types.astro]
    .filter(
      ([name, type]) =>
        !SLOT_TYPE.test(type) &&
        FRAMEWORKS.every((framework) => {
          const own = types[framework].get(propName(framework, name))
          return own !== undefined && !SLOT_TYPE.test(own)
        }),
    )
    .toSorted(([a], [b]) => a.localeCompare(b, "en"))
  const slots = slotsOf(api)
  const base = { component: api.component, types }
  return [
    { ...base, name: "nothing", props: {}, slots: [] },
    { ...base, name: "every slot", props: {}, slots },
    { ...base, name: 'class="Text"', props: { class: TEXT }, slots },
    ...shared.flatMap(([name, type]) =>
      valuesOf(type).map((value) => ({
        ...base,
        name: `${name}=${JSON.stringify(value)}`,
        props: { [name]: value },
        slots,
      })),
    ),
  ]
}

export const partCasesOf = (api: ComponentApi, apis: ComponentApi[]): Case[] =>
  api.parts
    .filter(
      (part) =>
        part.component &&
        !apis.some((other) => other.component === part.component),
    )
    .flatMap((part) => {
      const slots = (part.slots ?? ["default"]).toSorted()
      const base = {
        component: part.component!,
        types: Object.fromEntries(
          FRAMEWORKS.map((framework) => [framework, new Map()]),
        ) as Record<Framework, Map<string, string>>,
      }
      return [
        { ...base, name: "nothing", props: {}, slots: [] },
        { ...base, name: "every slot", props: {}, slots },
        { ...base, name: 'class="Text"', props: { class: TEXT }, slots },
      ]
    })

import { slotProp } from "../../src/component-api/frameworks"
import type { ComponentApi } from "../../src/component-api/types"
import { frameworkProps, splitUnion } from "../../src/utils/component-source"
import {
  PACKAGE_FRAMEWORK_IDS,
  type PackageFrameworkId,
} from "../../src/utils/framework"
import { TEXT } from "./renderers"

export const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)

export const FRAMEWORKS = PACKAGE_FRAMEWORK_IDS

export type Framework = PackageFrameworkId

const SAMPLES: Record<string, unknown> = {
  "MenuItem[]": [{ label: "A", value: "a" }],
  "RangeItem[]": [{ label: "A", value: 1 }],
  "SelectItem[]": [{ label: "A", value: "a" }],
  HTMLInputTypeAttribute: "text",
  boolean: true,
  number: 2,
  string: TEXT,
}

const REACT_NAMES: Record<string, string> = {
  autocomplete: "autoComplete",
  checked: "defaultChecked",
  class: "className",
  for: "htmlFor",
  value: "defaultValue",
}

const SLOT_TYPE = /\b(Element|ReactNode|Snippet)\b/

const valuesOf = (type: string) =>
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

const slotsOf = (api: ComponentApi) =>
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

export const partCasesOf = (api: ComponentApi): Case[] =>
  api.parts
    .filter(
      (part) =>
        part.component &&
        !Object.values(apis).some(
          (other) => other.component === part.component,
        ),
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

export const reactProps = (
  { props, reactNames, slots, types }: Case,
  nodes: () => unknown,
) => ({
  ...Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      reactNames?.[key] ?? propName("react", key),
      value,
    ]),
  ),
  ...Object.fromEntries(
    slots
      .filter((slot) => slot === "default" || types.react.has(slotProp(slot)))
      .map((slot) => [
        slotProp(slot),
        types.react.get(slotProp(slot))?.includes("=>") ? nodes : nodes(),
      ]),
  ),
})

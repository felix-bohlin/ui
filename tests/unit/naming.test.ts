import { expect, test } from "vitest"
import type { ApiOption, ComponentApi } from "../../src/component-api/types"
import allowlistJson from "./naming-allowlist.json"

const allowlist: string[] = allowlistJson

const apis = Object.values(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
)

const itemTypes = Object.values(
  import.meta.glob<string>("../../packages/opui/components/*/types.ts", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
).flatMap((source) =>
  [
    ...source.matchAll(
      /export type (\w+Item) =([\s\S]*?)(?=\nexport |(?![\s\S]))/g,
    ),
  ].map(([, name, body]) => ({
    keys: [...body.matchAll(/(\w+)\??:/g)].map(([, key]) => key),
    name,
  })),
)

const vocabulary: Record<string, { group: string; values: string[] }> = {
  align: { group: "Alignment", values: ["center", "end", "start"] },
  color: {
    group: "Colors",
    values: ["critical", "info", "neutral", "primary", "success", "warning"],
  },
  corner: {
    group: "Position",
    values: ["end-end", "end-start", "start-end", "start-start"],
  },
  density: { group: "Density", values: ["dense", "normal", "spacious"] },
  orientation: {
    group: "Orientation",
    values: ["auto", "horizontal", "vertical"],
  },
  overflow: { group: "Overflow", values: ["scroll", "shrink", "wrap"] },
  severity: {
    group: "Severities",
    values: ["critical", "info", "neutral", "success", "warning"],
  },
  shape: {
    group: "Shape",
    values: ["circle", "rounded", "squared", "squircle"],
  },
  side: {
    group: "Position",
    values: ["block-end", "block-start", "inline-end", "inline-start"],
  },
  size: { group: "Sizes", values: ["large", "medium", "small", "x-small"] },
  variant: {
    group: "Variants",
    values: [
      "elevated",
      "filled",
      "line",
      "outlined",
      "plain",
      "tonal",
      "transparent",
    ],
  },
}

const replaced: Record<string, string> = {
  alignment: "corner or positionArea",
  closeOnClick: "keepOpen",
  direction: "orientation",
  gutterless: "flush",
  headline: "label",
  iconOnly: "aria-label",
  inline: "orientation",
  options: "items",
  perView: "itemsPerView",
  placement: "side",
  pressed: "checked",
  scrollable: "overflow",
  selection: "multiple",
  shrink: "overflow",
  srLabel: "hideLabel or aria-label",
  stack: "orientation",
  text: "label",
  title: "label",
}

const optionalModifiers = new Set([
  "as",
  "bordered",
  "color",
  "severity",
  "trigger",
  "type",
])
const prefixed = new Set(["align", "overflow"])
const booleanDefaults = new Set(["false", "true"])
const groups = new Set([
  "Alignment",
  "Behavior",
  "Borders",
  "Colors",
  "Density",
  "Group",
  "Label",
  "Layout",
  "Orientation",
  "Overflow",
  "Position",
  "Severities",
  "Shape",
  "Sizes",
  "State",
  "Validation",
  "Variants",
])

const parts = new Set([
  ".ui-actions",
  ".ui-bottom",
  ".ui-content",
  ".ui-description",
  ".ui-end",
  ".ui-end-text",
  ".ui-field",
  ".ui-floating",
  ".ui-footer",
  ".ui-header",
  ".ui-heading",
  ".ui-icon-checked",
  ".ui-icon-unchecked",
  ".ui-indicator",
  ".ui-input",
  ".ui-label",
  ".ui-legend",
  ".ui-marker",
  ".ui-panel",
  ".ui-start",
  ".ui-start-text",
  ".ui-text",
  ".ui-top",
  ".ui-value",
])
const partExceptions = new Set([".ui-card-link"])
const slots = new Set([
  "bottom",
  "datalist",
  "default",
  "description",
  "end",
  "end-text",
  "icon-checked",
  "icon-unchecked",
  "indicator",
  "label",
  "marker",
  "start",
  "start-text",
  "submenu",
  "top",
  "value-text",
])
const roots = new Set(
  apis.flatMap((api) => api.root.selector.match(/\.ui-[a-z0-9-]+/g) ?? []),
)

const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
const sentence = (name: string) => {
  const words = kebab(name).replaceAll("-", " ")
  return words[0].toUpperCase() + words.slice(1)
}
const isProp = (option: ApiOption) =>
  !option.frameworks || option.frameworks.some((name) => name !== "html")
const defaultValue = (option: ApiOption) =>
  option.default?.match(/^"(.*)"$/)?.[1]

const problems = apis.flatMap((api) => {
  const found: string[] = []
  const report = (option: ApiOption, message: string) =>
    found.push(`${api.component} ${option.prop}: ${message}`)
  const props = api.options.filter(isProp)

  for (const option of api.options) {
    if (
      option.group &&
      !groups.has(option.group) &&
      option.group !== sentence(option.prop)
    ) {
      report(option, `group "${option.group}" is not in the group list`)
    }
  }

  for (const option of props) {
    if (api.source && replaced[option.prop]) {
      report(option, `use ${replaced[option.prop]}`)
    }
    if (option.prop === "open" && !option.inherited) {
      report(option, "use checked")
    }
    if (/^(no|non|un)[A-Z]/.test(option.prop) || option.prop.endsWith("less")) {
      report(option, "names what turning it on turns off")
    }
    if (option.default === "true") {
      report(option, "a boolean is off when it's left out")
    }
    if (/^(hide|sr|visually)[A-Z]/.test(option.prop)) {
      if (option.prop !== "hideLabel") report(option, "use hideLabel")
      else if (option.class !== ".ui-sr-only" || !option.part) {
        report(option, "renders no .ui-sr-only on a part")
      }
    }

    const concept = vocabulary[option.prop]
    if (concept && option.values) {
      for (const value of Object.keys(option.values)) {
        if (!concept.values.includes(value)) {
          report(option, `"${value}" is not a ${option.prop} value`)
        }
      }
      if (option.group !== concept.group) {
        report(option, `group is not "${concept.group}"`)
      }
    }

    if (option.values && option.prop !== "as" && option.prop !== "type") {
      for (const [value, modifier] of Object.entries(option.values)) {
        if (!modifier || !/^\.ui-[a-z0-9-]+$/.test(modifier)) continue
        const shape =
          concept && !prefixed.has(option.prop)
            ? `.ui-${value}`
            : `.ui-${kebab(option.prop)}-${value}`
        if ((concept || api.source) && modifier !== shape) {
          report(option, `"${value}" renders ${modifier}, not ${shape}`)
        }
      }
    }

    if (
      option.values &&
      !optionalModifiers.has(option.prop) &&
      !booleanDefaults.has(option.default ?? "") &&
      (concept || api.source)
    ) {
      const name = defaultValue(option)
      if (!name || !(name in option.values)) {
        report(option, "names no default value")
      } else if (concept && option.values[name] !== null) {
        report(option, `the default "${name}" adds a class`)
      }
    }

    if (
      !option.values &&
      option.class &&
      option.prop !== "hideLabel" &&
      booleanDefaults.has(option.default ?? "") &&
      !option.class.includes(`.ui-${kebab(option.prop)}`)
    ) {
      report(option, `renders ${option.class}, not .ui-${kebab(option.prop)}`)
    }
  }

  for (const part of api.parts) {
    const last = part.selector.split(/\s*[>+~\s]\s*/).at(-1) ?? ""
    const name = last.match(/\.ui-[a-z0-9-]+/g)?.at(-1)
    if (
      name &&
      !parts.has(name) &&
      !roots.has(name) &&
      !partExceptions.has(name)
    ) {
      found.push(
        `${api.component} ${part.selector}: ${name} is not a part name`,
      )
    }
  }

  for (const slot of [
    ...(api.slots ?? []).map((slot) => slot.name),
    ...api.parts.flatMap((part) => part.slots ?? []),
  ]) {
    if (!slots.has(slot)) {
      found.push(`${api.component} ${slot}: not in the slot list`)
    }
  }

  const names = new Set(props.map((option) => option.prop))
  if (names.has("dense") && names.has("density")) {
    found.push(`${api.component}: has both dense and density`)
  }
  return found
})

test("component props follow the naming model", () => {
  expect(
    problems.filter((problem) => !allowlist.includes(problem)),
    "new naming problems",
  ).toEqual([])
})

test("item keys follow the naming model", () => {
  expect(itemTypes.map(({ name }) => name)).toEqual(
    expect.arrayContaining(["MenuItem", "RangeItem", "SelectItem"]),
  )
  expect(
    itemTypes.flatMap(({ keys, name }) =>
      keys
        .filter((key) => replaced[key])
        .map((key) => `${name} ${key}: use ${replaced[key]}`),
    ),
    "item keys",
  ).toEqual([])
})

test("the naming allowlist only lists open problems", () => {
  expect(
    allowlist.filter((problem) => !problems.includes(problem)),
    "fixed, remove from tests/unit/naming-allowlist.json",
  ).toEqual([])
  expect(allowlist).toEqual(allowlist.toSorted())
})

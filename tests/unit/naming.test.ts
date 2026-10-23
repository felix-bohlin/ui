import { expect, test } from "vitest"
import type { ApiOption, ComponentApi } from "../../src/component-api/types"
import allowlist from "./naming-allowlist.json"

const apis = Object.values(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
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
  direction: "orientation",
  placement: "side",
  pressed: "checked",
}

const optionalModifiers = new Set(["as", "color", "severity", "type"])
const booleanDefaults = new Set(["false", "true"])

const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
const isProp = (option: ApiOption) =>
  !option.frameworks || option.frameworks.some((name) => name !== "html")
const defaultValue = (option: ApiOption) =>
  option.default?.match(/^"(.*)"$/)?.[1]

const problems = apis.flatMap((api) => {
  const found: string[] = []
  const report = (option: ApiOption, message: string) =>
    found.push(`${api.component} ${option.prop}: ${message}`)
  const props = api.options.filter(isProp)

  for (const option of props) {
    if (replaced[option.prop]) {
      report(option, `use ${replaced[option.prop]}`)
    }
    if (option.prop === "open" && !option.inherited) {
      report(option, "use checked")
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
      booleanDefaults.has(option.default ?? "") &&
      !option.class.includes(`.ui-${kebab(option.prop)}`)
    ) {
      report(option, `renders ${option.class}, not .ui-${kebab(option.prop)}`)
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

test("the naming allowlist only lists open problems", () => {
  expect(
    allowlist.filter((problem) => !problems.includes(problem)),
    "fixed, remove from tests/unit/naming-allowlist.json",
  ).toEqual([])
  expect(allowlist).toEqual(allowlist.toSorted())
})

import { describe, frameworkProps, slotNames } from "../utils/component-source"
import {
  frameworks,
  type ComponentFramework,
  type Framework,
} from "./frameworks"
import type { ApiOption, ApiPart, ComponentApi } from "./types"

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name)

const on = (option: ApiOption, modifier: string | null) =>
  modifier && option.part ? `${option.part}${modifier}` : modifier

export const modifiers = (option: ApiOption) => {
  const values = option.values
    ? Object.values(option.values).map((modifier) => on(option, modifier))
    : [option.class ?? option.attribute].flatMap((modifier) =>
        modifier ? [on(option, modifier)] : [],
      )
  return [
    ...values.sort((a, b) => (a ?? "").localeCompare(b ?? "")),
    ...(option.cssVar ? [option.cssVar] : []),
  ]
}

export const htmlDefault = (option: ApiOption) => {
  const value = option.default?.replace(/^"(.*)"$/, "$1")
  if (value === undefined) return undefined
  if (option.values) {
    return value in option.values ? on(option, option.values[value]) : undefined
  }
  return option.cssVar ? value : undefined
}

export const htmlRows = (api: ComponentApi) =>
  api.options
    .filter(
      (option) => !option.frameworks || option.frameworks.includes("html"),
    )
    .flatMap((option) => {
      const list = modifiers(option)
      return list.length > 0
        ? [
            {
              default: htmlDefault(option),
              description: option.description,
              modifiers: list,
              name: option.group ?? option.prop,
            },
          ]
        : []
    })
    .sort(byName)

export const propRows = (api: ComponentApi, framework: ComponentFramework) => {
  const props = frameworkProps(api.source, framework)
  const option = (name: string) =>
    api.options.find((option) => option.prop === name)
  const scoped = api.options
    .filter((option) => option.frameworks?.includes(framework))
    .filter((option) => !props.has(option.prop))
    .map((option) => [option.prop, option.type ?? ""] as const)
  const model = frameworks[framework].model
  return [
    ...[...props, ...scoped].map(([name, type]) => ({
      default: option(name)?.default,
      description: describe(api, name, framework, "prop") ?? "-",
      name,
      type: option(name)?.type ?? type,
    })),
    ...(model && api.model
      ? [
          {
            default: undefined,
            description: api.model.description,
            name: model(api.model.prop),
            type: api.model.type,
          },
        ]
      : []),
  ].sort(byName)
}

export const slotRows = (api: ComponentApi, framework: ComponentFramework) =>
  slotNames(api.source, framework)
    .map((name) => ({
      description: describe(api, name, framework, "slot") ?? "-",
      name,
    }))
    .sort(byName)

export const partLabel = (
  api: ComponentApi,
  part: ApiPart,
  framework: Framework,
  root = false,
) => {
  const fallback = part.code ?? part.selector
  if (framework === "html") return fallback
  if (root) return `<${api.component}>`

  const syntax = frameworks[framework]
  const handles = [
    ...(part.slots?.length ? part.slots.map(syntax.slot) : (part.props ?? [])),
    ...(part.model && api.model && syntax.model
      ? [syntax.model(api.model.prop)]
      : []),
  ]
  return handles.length > 0 ? handles.join(" · ") : fallback
}

import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import {
  describe,
  frameworkProps,
  modelsFor,
  slotNames,
  snippetNames,
} from "../utils/component-source"
import { themeTokenDescriptions } from "../utils/theme-token-descriptions"
import { themeTokens } from "../utils/theme-tokens"
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
  const values = [
    ...[option.class ?? option.attribute].flatMap((modifier) =>
      modifier ? [on(option, modifier)] : [],
    ),
    ...Object.values(option.values ?? {}).map((modifier) =>
      on(option, modifier ?? null),
    ),
  ]
  return [
    ...values.sort((a, b) => (a ?? "").localeCompare(b ?? "")),
    ...(option.cssVar ? [option.cssVar] : []),
  ]
}

export const htmlDefault = (option: ApiOption) => {
  if (option.htmlDefault !== undefined) return option.htmlDefault ?? undefined
  const value = option.default?.replace(/^"(.*)"$/, "$1")
  if (value === undefined) return undefined
  if (option.values) {
    return value in option.values
      ? on(option, option.values[value] ?? null)
      : undefined
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
              description: option.htmlDescription ?? option.description,
              modifiers: list,
              name: option.group ?? option.prop,
            },
          ]
        : []
    })
    .sort(byName)

export const propRows = (api: ComponentApi, framework: ComponentFramework) => {
  const props = frameworkProps(api, framework)
  const option = (name: string) =>
    api.options.find((option) => option.prop === name)
  const scoped = api.options
    .filter((option) => option.frameworks?.includes(framework))
    .filter((option) => !props.has(option.prop))
    .map((option) => [option.prop, option.type ?? ""] as const)
  const { model, modelIsProp } = frameworks[framework]
  const bound = new Set(
    modelIsProp ? modelsFor(api, framework).map((entry) => entry.prop) : [],
  )
  const snippets = snippetNames(api, framework)
    .filter((name) => !props.has(name) && !bound.has(name))
    .map((name) => [name, "Snippet"] as const)
  return [
    ...[...props, ...scoped, ...snippets]
      .filter(([name]) => !bound.has(name))
      .map(([name, type]) => ({
        default: option(name)?.default,
        description: describe(api, name, framework, "prop") ?? "-",
        name,
        type: option(name)?.type ?? type,
      })),
    ...(model
      ? modelsFor(api, framework).map((entry) => ({
          default: undefined,
          description: entry.description,
          name: model(entry.prop),
          type: entry.type,
        }))
      : []),
  ].sort(byName)
}

export const hydrationRows = (
  api: ComponentApi,
  framework: ComponentFramework,
) => {
  const model = frameworks[framework].model
  return [
    ...(api.hydration?.[framework] ?? []),
    ...(model
      ? modelsFor(api, framework).map((entry) => ({
          description:
            "The bound value only updates on the client. The native control still changes and submits with its form.",
          fallback: "Read the value from the form instead.",
          prop: model(entry.prop),
        }))
      : []),
  ].sort((a, b) => a.prop.localeCompare(b.prop))
}

export const slotRows = (api: ComponentApi, framework: ComponentFramework) =>
  slotNames(api, framework)
    .map((name) => ({
      description: describe(api, name, framework, "slot") ?? "-",
      name,
    }))
    .sort(byName)

const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

const THEME_TOKENS = themeTokens()

export const stylesheets = (api: ComponentApi) =>
  (api.css ?? (api.source ? [kebab(api.source)] : [])).map((file) =>
    path.resolve("packages/opui/css/components", `${file}.css`),
  )

export const cssVarRows = (api: ComponentApi) => {
  const reads = new Set(
    stylesheets(api).flatMap((file) =>
      existsSync(file)
        ? [
            ...readFileSync(file, "utf8").matchAll(/var\(\s*(--[a-z][\w-]*)/g),
          ].map((match) => match[1])
        : [],
    ),
  )
  return THEME_TOKENS.filter((token) => reads.has(token.name))
    .map((token) => ({
      dark: token.dark,
      default: token.optional ? undefined : token.value,
      description: themeTokenDescriptions[token.name] ?? "",
      name: token.name,
    }))
    .sort(byName)
}

export const partLabel = (
  api: ComponentApi,
  part: ApiPart,
  framework: Framework,
  root = false,
) => {
  const fallback = part.code ?? part.selector
  if (framework === "html" || !api.source) return fallback
  if (root) return `<${part.component?.[framework] ?? api.component}>`
  if (part.component?.[framework]) return `<${part.component[framework]}>`

  const syntax = frameworks[framework]
  const handles = [
    ...(syntax.slotsAreProps && part.snippets
      ? [...(part.props ?? []), ...part.snippets]
      : part.slots?.length
        ? part.slots.map(syntax.slot)
        : (part.props ?? [])),
    ...(part.model && syntax.model
      ? modelsFor(api, framework).map((entry) => syntax.model!(entry.prop))
      : []),
  ]
  return handles.length > 0 ? handles.join(" · ") : fallback
}

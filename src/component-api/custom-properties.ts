import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import type { ComponentApi, CustomProperties } from "./types"

const modules = import.meta.glob<{ default: CustomProperties }>(
  "./custom-properties/*.ts",
  { eager: true },
)

export const customProperties: Record<string, CustomProperties> =
  Object.fromEntries(
    Object.entries(modules).map(([file, module]) => [
      path.basename(file, ".ts"),
      module.default,
    ]),
  )

const apis = import.meta.glob<ComponentApi>("./*/api.ts", {
  eager: true,
  import: "default",
})

const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

export const stylesheetPath = (stylesheet: string) =>
  path.resolve("packages/opui/css/components", `${stylesheet}.css`)

export const pageStylesheets = (slug: string) => {
  const declared = Object.entries(apis)
    .filter(([file, api]) => (api.page ?? file.split("/")[1]) === slug)
    .flatMap(([, api]) => api.css ?? (api.source ? [kebab(api.source)] : []))
    .filter((stylesheet) => existsSync(stylesheetPath(stylesheet)))
  if (declared.length > 0) return [...new Set(declared)].toSorted()
  return existsSync(stylesheetPath(slug)) ? [slug] : []
}

export const declaredCustomProperties = (stylesheet: string) =>
  [
    ...new Set(
      [
        ...readFileSync(stylesheetPath(stylesheet), "utf8").matchAll(
          /^\s*(--_[\w-]+)\s*:/gm,
        ),
      ].map((match) => match[1]),
    ),
  ].toSorted()

export const customPropertyRows = (stylesheet: string) =>
  Object.entries(customProperties[stylesheet] ?? {})
    .map(([name, property]) => ({ name, ...property }))
    .toSorted((a, b) => a.name.localeCompare(b.name))

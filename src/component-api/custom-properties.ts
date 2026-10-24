import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import type { CustomProperties } from "./types"

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

const PAGE_STYLESHEETS: Record<string, string[]> = {
  checkbox: ["checkbox", "choice"],
  dialog: ["card", "dialog"],
  menu: ["list", "menu"],
  radio: ["choice", "radio"],
  select: ["select", "text-field"],
  textarea: ["text-field", "textarea"],
  toggle: ["toggle-button", "toggle-group"],
  typography: ["link", "typography"],
}

export const stylesheetPath = (stylesheet: string) =>
  path.resolve("packages/opui/css/components", `${stylesheet}.css`)

export const pageStylesheets = (slug: string) =>
  PAGE_STYLESHEETS[slug] ?? (existsSync(stylesheetPath(slug)) ? [slug] : [])

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

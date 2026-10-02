import type { ComponentFramework, Framework } from "./frameworks"

export type ApiPart = {
  anchorName?: string
  code?: string
  component?: Partial<Record<ComponentFramework, string>>
  description: string
  legacy?: { props?: string[]; slots?: string[] }
  model?: boolean
  props?: string[]
  selector: string
  slots?: string[]
}

export type ApiOption = {
  attribute?: string
  class?: string
  cssVar?: string
  default?: string
  description: string
  frameworks?: Framework[]
  group?: string
  part?: string
  prop: string
  type?: string
  values?: Partial<Record<string, string | null>>
}

export type ComponentApi = {
  component: string
  css?: string[]
  file?: string
  model?: { description: string; prop: string; type: string }
  notes?: Partial<Record<Framework, string>>
  options: ApiOption[]
  page?: string
  parts: ApiPart[]
  root: Pick<
    ApiPart,
    "anchorName" | "code" | "component" | "description" | "selector"
  >
  slots?: { description: string; name: string }[]
  source?: string
}

import type { ComponentFramework, Framework } from "./frameworks"

export type ApiPart = {
  anchorName?: string
  code?: string
  component?: string
  description: string
  legacy?: { props?: string[]; slots?: string[] }
  model?: boolean
  props?: string[]
  selector: string
  slots?: string[]
  snippets?: string[]
}

export type ApiHydration = {
  description: string
  fallback?: string
  prop: string
}

export type ApiOption = {
  attribute?: string
  class?: string
  cssVar?: string
  default?: string
  description: string
  frameworks?: Framework[]
  group?: string
  htmlDefault?: string | null
  htmlDescription?: string
  part?: string
  prop: string
  values?: Partial<Record<string, string | null>>
} & ({ inherited: true; type: string } | { inherited?: never; type?: string })

export type ApiModel = { description: string; prop: string; type: string }

export type CustomProperties = Record<
  string,
  { description: string; kind: "input" | "output" }
>

export type ComponentApi = {
  component: string
  css?: string[]
  hydration?: Partial<
    Record<Exclude<ComponentFramework, "astro"> | "default", ApiHydration[]>
  >
  model?: ApiModel & {
    frameworks?: Partial<Record<ComponentFramework, ApiModel[]>>
  }
  notes?: Partial<Record<Framework | "default", string>>
  options: ApiOption[]
  page?: string
  parts: ApiPart[]
  root: Pick<ApiPart, "anchorName" | "code" | "description" | "selector">
  slots?: { description: string; name: string }[]
  source?: string
}

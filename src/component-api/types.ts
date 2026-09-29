import type { Framework } from "./frameworks"

export type ApiPart = {
  code?: string
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
  default?: string
  description: string
  frameworks?: Framework[]
  group?: string
  prop: string
  type?: string
}

export type ComponentApi = {
  component: string
  model?: { description: string; prop: string; type: string }
  notes?: Partial<Record<Framework, string>>
  options: ApiOption[]
  parts: ApiPart[]
  root: { description: string; selector: string }
  slots?: { description: string; name: string }[]
  source: string
}

import type { InjectionKey } from "vue"

export const ToggleGroupKey = Symbol() as InjectionKey<{
  change: (input: HTMLInputElement) => void
  groupName: string
  inputType: "checkbox" | "radio"
  value?: string | string[]
}>

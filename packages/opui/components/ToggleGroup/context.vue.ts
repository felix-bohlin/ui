import type { InjectionKey } from "vue"

export const ToggleGroupKey = Symbol() as InjectionKey<{
  groupName: string
  inputType: "checkbox" | "radio"
}>

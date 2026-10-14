import type { InjectionKey } from "vue"

export const AnchorKey = Symbol() as InjectionKey<{
  floatingId?: string
  popover?: "hint"
}>

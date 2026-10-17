import type { InjectionKey } from "vue"

export const MenuKey = Symbol() as InjectionKey<{
  rootId?: string
}>

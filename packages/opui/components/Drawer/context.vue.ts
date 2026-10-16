import type { InjectionKey } from "vue"

export const DrawerKey = Symbol() as InjectionKey<{
  id: string
  titleId?: string
}>

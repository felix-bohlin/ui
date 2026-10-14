import type { InjectionKey } from "vue"

export const TabsKey = Symbol() as InjectionKey<{
  groupName?: string
  tabId?: string
}>

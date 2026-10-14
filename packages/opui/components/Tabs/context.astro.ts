import { createContext } from "../context.astro"

export const tabsContext = createContext<{
  groupName?: string
  tabId?: string
}>()

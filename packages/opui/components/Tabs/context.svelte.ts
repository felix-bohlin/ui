import { getContext, setContext } from "svelte"

export type TabsContext = {
  groupName?: string
  panelId?: string
  tabId?: string
}

const key = Symbol("tabs")

export const getTabsContext = () => getContext<TabsContext | undefined>(key)
export const setTabsContext = (context: TabsContext) => setContext(key, context)

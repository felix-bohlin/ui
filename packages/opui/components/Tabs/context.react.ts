"use client"

import { createContext, useContext } from "react"

export type TabsContextValue = {
  groupName?: string
  tabId?: string
}

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
)

export const useTabsContext = () => useContext(TabsContext)

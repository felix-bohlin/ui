import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const TabsContext = createContext<Context | null>(null)

export const useTabsContext = () => useContext(TabsContext)

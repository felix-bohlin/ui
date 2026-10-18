"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const TabsContext = createContext<Context | undefined>(undefined)

export const useTabsContext = () => useContext(TabsContext)

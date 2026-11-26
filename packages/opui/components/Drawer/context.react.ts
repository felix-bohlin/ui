"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const DrawerContext = createContext<Context | undefined>(undefined)

export const useDrawerContext = () => useContext(DrawerContext)

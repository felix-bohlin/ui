"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const ToggleGroupContext = createContext<Context | undefined>(undefined)

export const useToggleGroupContext = () => useContext(ToggleGroupContext)

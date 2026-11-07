"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const AnchorContext = createContext<Context | undefined>(undefined)

export const useAnchorContext = () => useContext(AnchorContext)

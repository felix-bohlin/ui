"use client"

import { createContext, useContext } from "react"

export type AnchorContextValue = {
  floatingId?: string
  popover?: "hint"
}

export const AnchorContext = createContext<AnchorContextValue | undefined>(
  undefined,
)

export const useAnchorContext = () => useContext(AnchorContext)

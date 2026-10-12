"use client"

import { createContext, useContext } from "react"

export type DrawerContextValue = {
  headingId: string
  id: string
}

export const DrawerContext = createContext<DrawerContextValue | undefined>(
  undefined,
)

export const useDrawerContext = () => useContext(DrawerContext)

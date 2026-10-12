"use client"

import { createContext, useContext } from "react"

export type ToggleGroupContextValue = {
  groupName: string
  inputType: "checkbox" | "radio"
}

export const ToggleGroupContext = createContext<
  ToggleGroupContextValue | undefined
>(undefined)

export const useToggleGroupContext = () => useContext(ToggleGroupContext)

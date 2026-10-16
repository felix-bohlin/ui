"use client"

import { createContext, useContext } from "react"

export type ToggleGroupContextValue = {
  change: (input: HTMLInputElement) => void
  groupName: string
  inputType: "checkbox" | "radio"
  value?: string | string[]
}

export const ToggleGroupContext = createContext<
  ToggleGroupContextValue | undefined
>(undefined)

export const useToggleGroupContext = () => useContext(ToggleGroupContext)

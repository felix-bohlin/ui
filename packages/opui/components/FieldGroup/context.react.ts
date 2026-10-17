"use client"

import { createContext, useContext } from "react"

export type FieldContextValue = {
  name?: string
}

export const FieldContext = createContext<FieldContextValue | undefined>(
  undefined,
)

export const useFieldContext = () => useContext(FieldContext)

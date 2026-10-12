"use client"

import { createContext, useContext } from "react"

export type FieldRootValue = {
  describedBy?: string
  endTextId: string
  invalid?: boolean
}

export const FieldRootContext = createContext<FieldRootValue | undefined>(
  undefined,
)

export const useFieldRoot = () => useContext(FieldRootContext)

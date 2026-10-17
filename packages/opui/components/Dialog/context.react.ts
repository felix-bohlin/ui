"use client"

import { createContext, useContext } from "react"

export type DialogContextValue = {
  headerId?: string
}

export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined,
)

export const useDialogContext = () => useContext(DialogContext)

"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const DialogContext = createContext<Context | undefined>(undefined)

export const useDialogContext = () => useContext(DialogContext)

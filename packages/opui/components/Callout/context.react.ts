"use client"

import { createContext, useContext } from "react"
import type { Props } from "./types"

export type CalloutContextValue = Pick<Props, "severity">

export const CalloutContext = createContext<CalloutContextValue | undefined>(
  undefined,
)

export const useCalloutContext = () => useContext(CalloutContext)

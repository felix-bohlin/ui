"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const PopoverContext = createContext<Context | undefined>(undefined)

export const usePopoverContext = () => useContext(PopoverContext)

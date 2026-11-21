"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const FieldsetContext = createContext<Context | undefined>(undefined)

export const useFieldsetContext = () => useContext(FieldsetContext)

"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const FieldGroupContext = createContext<Context | undefined>(undefined)

export const useFieldGroupContext = () => useContext(FieldGroupContext)

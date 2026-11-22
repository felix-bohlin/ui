"use client"

import { createContext, useContext } from "react"
import type { Context } from "./types"

export const MenuContext = createContext<Context | undefined>(undefined)

export const useMenuContext = () => useContext(MenuContext)

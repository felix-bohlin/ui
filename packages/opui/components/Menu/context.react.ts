"use client"

import { createContext, useContext } from "react"

export type MenuContextValue = {
  rootId?: string
}

export const MenuContext = createContext<MenuContextValue | undefined>(
  undefined,
)

export const useMenuContext = () => useContext(MenuContext)

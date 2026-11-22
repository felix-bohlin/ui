import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const MenuContext = createContext<Context | null>(null)

export const useMenuContext = () => useContext(MenuContext)

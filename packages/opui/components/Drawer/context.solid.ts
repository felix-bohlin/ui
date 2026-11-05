import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const DrawerContext = createContext<Context | null>(null)

export const useDrawerContext = () => useContext(DrawerContext)

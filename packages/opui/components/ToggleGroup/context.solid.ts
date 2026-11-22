import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const ToggleGroupContext = createContext<Context | null>(null)

export const useToggleGroupContext = () => useContext(ToggleGroupContext)

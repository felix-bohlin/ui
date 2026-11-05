import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const AnchorContext = createContext<Context | null>(null)

export const useAnchorContext = () => useContext(AnchorContext)

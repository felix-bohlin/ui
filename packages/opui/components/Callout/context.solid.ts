import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const CalloutContext = createContext<Context | null>(null)

export const useCalloutContext = () => useContext(CalloutContext)

import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const FieldsetContext = createContext<Context | null>(null)

export const useFieldsetContext = () => useContext(FieldsetContext)

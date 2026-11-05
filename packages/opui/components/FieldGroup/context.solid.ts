import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const FieldGroupContext = createContext<Context | null>(null)

export const useFieldGroupContext = () => useContext(FieldGroupContext)

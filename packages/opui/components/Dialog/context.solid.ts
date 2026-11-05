import { createContext, useContext } from "solid-js"
import type { Context } from "./types"

export const DialogContext = createContext<Context | null>(null)

export const useDialogContext = () => useContext(DialogContext)

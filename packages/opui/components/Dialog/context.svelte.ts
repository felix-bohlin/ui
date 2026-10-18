import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getDialogContext = () => getContext<Context | undefined>(key)
export const setDialogContext = (context: Context) => setContext(key, context)

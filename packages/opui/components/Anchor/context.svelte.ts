import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getAnchorContext = () => getContext<Context | undefined>(key)
export const setAnchorContext = (context: Context) => setContext(key, context)

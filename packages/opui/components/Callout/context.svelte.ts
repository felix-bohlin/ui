import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getCalloutContext = () => getContext<Context | undefined>(key)
export const setCalloutContext = (context: Context) => setContext(key, context)

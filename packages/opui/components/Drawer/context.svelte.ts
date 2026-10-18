import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getDrawerContext = () => getContext<Context | undefined>(key)
export const setDrawerContext = (context: Context) => setContext(key, context)

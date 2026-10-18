import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getMenuContext = () => getContext<Context | undefined>(key)
export const setMenuContext = (context: Context) => setContext(key, context)

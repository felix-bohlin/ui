import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getTabsContext = () => getContext<Context | undefined>(key)
export const setTabsContext = (context: Context) => setContext(key, context)

/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getTabsContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setTabsContext = (context) => setContext(key, context)

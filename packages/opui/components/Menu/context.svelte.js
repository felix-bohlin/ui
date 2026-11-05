/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getMenuContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setMenuContext = (context) => setContext(key, context)

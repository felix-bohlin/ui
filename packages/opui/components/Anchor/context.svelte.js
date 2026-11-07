/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getAnchorContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setAnchorContext = (context) => setContext(key, context)

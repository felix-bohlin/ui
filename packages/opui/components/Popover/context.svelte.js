/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getPopoverContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setPopoverContext = (context) => setContext(key, context)

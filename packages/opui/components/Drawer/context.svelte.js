/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getDrawerContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setDrawerContext = (context) => setContext(key, context)

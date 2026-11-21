/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getToggleGroupContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setToggleGroupContext = (context) => setContext(key, context)

/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getFieldsetContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setFieldsetContext = (context) => setContext(key, context)

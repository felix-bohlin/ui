/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getFieldGroupContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setFieldGroupContext = (context) => setContext(key, context)

/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getDialogContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setDialogContext = (context) => setContext(key, context)

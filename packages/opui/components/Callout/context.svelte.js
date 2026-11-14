/** @import { Context } from "./types" */
import { getContext, setContext } from "svelte"

const key = Symbol()

/** @type {() => Context | undefined} */
export const getCalloutContext = () => getContext(key)
/** @type {(context: Context) => Context} */
export const setCalloutContext = (context) => setContext(key, context)

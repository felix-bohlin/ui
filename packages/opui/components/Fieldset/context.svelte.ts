import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getFieldsetContext = () => getContext<Context | undefined>(key)
export const setFieldsetContext = (context: Context) => setContext(key, context)

import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getFieldGroupContext = () => getContext<Context | undefined>(key)
export const setFieldGroupContext = (context: Context) =>
  setContext(key, context)

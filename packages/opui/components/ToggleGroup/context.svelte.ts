import { getContext, setContext } from "svelte"
import type { Context } from "./types"

const key = Symbol()

export const getToggleGroupContext = () => getContext<Context | undefined>(key)
export const setToggleGroupContext = (context: Context) =>
  setContext(key, context)

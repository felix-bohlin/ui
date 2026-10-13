import { getContext, setContext } from "svelte"

export type AnchorContext = {
  floatingId?: string
  popover?: "hint"
}

const key = Symbol()

export const getAnchorContext = () => getContext<AnchorContext | undefined>(key)
export const setAnchorContext = (context: AnchorContext) =>
  setContext(key, context)

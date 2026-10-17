import { getContext, setContext } from "svelte"
import type { Props } from "./types"

export type CalloutContext = Pick<Props, "severity">

const key = Symbol()

export const getCalloutContext = () =>
  getContext<CalloutContext | undefined>(key)
export const setCalloutContext = (context: CalloutContext) =>
  setContext(key, context)

import { getContext, setContext } from "svelte"

export type DialogContext = {
  headerId?: string
}

const key = Symbol()

export const getDialogContext = () => getContext<DialogContext | undefined>(key)
export const setDialogContext = (context: DialogContext) =>
  setContext(key, context)

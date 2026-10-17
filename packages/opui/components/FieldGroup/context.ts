import { getContext, setContext } from "svelte"

export type FieldContext = {
  name?: string
}

const key = Symbol()

export const getFieldContext = () => getContext<FieldContext | undefined>(key)
export const setFieldContext = (context: FieldContext) =>
  setContext(key, context)

import { getContext, setContext } from "svelte"

export type FieldRoot = {
  readonly describedBy?: string
  endTextId: string
  readonly invalid?: boolean
  register: (part: "end-text") => () => void
}

const key = Symbol()

export const getFieldRoot = () => getContext<FieldRoot | undefined>(key)
export const setFieldRoot = (root: FieldRoot) => setContext(key, root)

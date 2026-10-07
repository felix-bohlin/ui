import { getContext, setContext } from "svelte"

export type ToggleGroupContext = {
  groupName: string
  inputType: "checkbox" | "radio"
}

const key = Symbol()

export const getToggleGroupContext = () =>
  getContext<ToggleGroupContext | undefined>(key)
export const setToggleGroupContext = (context: ToggleGroupContext) =>
  setContext(key, context)

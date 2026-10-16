import { getContext, setContext } from "svelte"

export type ToggleGroupContext = {
  change: (input: HTMLInputElement) => void
  groupName: string
  inputType: "checkbox" | "radio"
  value?: string | string[]
}

const key = Symbol()

export const getToggleGroupContext = () =>
  getContext<ToggleGroupContext | undefined>(key)
export const setToggleGroupContext = (context: ToggleGroupContext) =>
  setContext(key, context)

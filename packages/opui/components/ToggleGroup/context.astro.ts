import { createContext } from "../context.astro"

export const toggleGroupContext = createContext<{
  groupName: string
  inputType: "checkbox" | "radio"
}>()

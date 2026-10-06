import { createContext } from "solid-js"

export const ToggleGroupContext = createContext<{
  name?: string
  type?: "checkbox" | "radio"
}>({})

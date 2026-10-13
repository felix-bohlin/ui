import { createContext } from "../context.astro"

export const anchorContext = createContext<{
  floatingId?: string
  popover?: "hint"
}>()

import { createContext } from "../context.astro"

export const menuContext = createContext<{
  rootId?: string
}>()

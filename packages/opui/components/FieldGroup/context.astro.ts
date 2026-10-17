import { createContext } from "../context.astro"

export const fieldContext = createContext<{ name?: string }>()

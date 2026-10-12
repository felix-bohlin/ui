import { createContext } from "../context.astro"

export const dialogContext = createContext<{ headerId: string }>()

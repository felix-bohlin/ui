import { createContext } from "../context.astro"

export const drawerContext = createContext<{ id: string; titleId?: string }>()

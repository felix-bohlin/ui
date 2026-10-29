import { createContext } from "../context.astro"
import type { Context } from "./types"

export const drawerContext = createContext<Context>()

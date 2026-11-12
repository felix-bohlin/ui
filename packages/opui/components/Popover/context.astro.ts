import { createContext } from "../context.astro"
import type { Context } from "./types"

export const popoverContext = createContext<Context>()

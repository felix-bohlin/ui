import { createContext } from "../context.astro"
import type { Context } from "./types"

export const fieldGroupContext = createContext<Context>()

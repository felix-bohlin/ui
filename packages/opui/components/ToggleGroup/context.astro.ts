import { createContext } from "../context.astro"
import type { Context } from "./types"

export const toggleGroupContext =
  createContext<Pick<Context, "groupName" | "inputType">>()

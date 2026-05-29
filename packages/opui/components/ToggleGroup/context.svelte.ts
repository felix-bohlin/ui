import { createContext } from "svelte"
import type { ToggleContext } from "./types.ts"
export type { ToggleContext } from "./types.ts"

export const [getToggleContext, setToggleContext] =
  createContext<ToggleContext>()

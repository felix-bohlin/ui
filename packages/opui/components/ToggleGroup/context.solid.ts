import { createContext } from "solid-js"
import type { ToggleContext } from "./types"

export const ToggleGroupContext = createContext<ToggleContext | null>(null)

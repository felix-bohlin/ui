import { createContext } from "../context.astro"
import type { Props } from "./types"

export const calloutContext = createContext<Pick<Props, "severity">>()

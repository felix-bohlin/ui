import type { ChatLine } from "reference-shared"
import { createContext } from "svelte"

export const [getSent, setSent] = createContext<Record<string, ChatLine[]>>()

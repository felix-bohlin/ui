import { createContext } from "../context.astro"

export type FieldRoot = {
  describedByToken: string
  endTextId: string
  invalid?: boolean
  parts: Set<"end-text" | "label">
}

export const fieldContext = createContext<FieldRoot>()

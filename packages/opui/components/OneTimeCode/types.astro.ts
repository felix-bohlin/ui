import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  // Unique component props
  Base.Props &
    // Input attributes
    Omit<HTMLAttributes<"input">, "maxlength" | "size" | "type">

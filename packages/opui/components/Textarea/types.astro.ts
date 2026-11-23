import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  // Unique component props
  Base.Props &
    // All html label attributes
    HTMLAttributes<"label"> &
    // Some input attributes for spreading
    Pick<HTMLAttributes<"textarea">, Base.TextareaProps>

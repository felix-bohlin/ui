import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

type InputProps = {
  type?: HTMLAttributes<"input">["type"] | "numeric"
}

export type Props =
  // Unique component props
  Base.Props &
    // All html label attributes
    HTMLAttributes<"label"> &
    // Some input attributes for spreading
    Pick<HTMLAttributes<"input">, Base.InputProps> &
    // Special input type attribute with 'numeric'
    InputProps

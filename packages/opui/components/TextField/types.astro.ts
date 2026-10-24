import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

type InputProps = {
  // Add 'numeric' as valid input type
  type?: HTMLAttributes<"input">["type"] | "numeric"
} &
  // include the rest
  Omit<HTMLAttributes<"input">, "size" | "type">

export type Props =
  // Unique component props
  Base.Props &
    // Input attributes
    InputProps

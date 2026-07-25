import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

type InputProps = {
  type?: HTMLAttributes<"input">["type"] | "numeric"
} & Pick<HTMLAttributes<"input">, Exclude<Base.InputProps, "type">>

export type Props =
  // Unique component props
  Base.Props &
    // All html label attributes
    HTMLAttributes<"label"> &
    // Input attributes
    InputProps

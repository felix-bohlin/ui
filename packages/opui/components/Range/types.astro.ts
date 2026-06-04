import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type RangeProps = Base.RangeProps &
  HTMLAttributes<"label"> &
  HTMLAttributes<"input">

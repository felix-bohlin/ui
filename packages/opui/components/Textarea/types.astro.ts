import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  // Unique component props
  Base.Props &
    // Root attributes
    HTMLAttributes<"div">

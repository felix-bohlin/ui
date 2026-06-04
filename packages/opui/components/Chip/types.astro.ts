import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  (
    | ({ as?: "a" } & HTMLAttributes<"a">)
    | ({ as?: "button" } & HTMLAttributes<"button">)
    | ({ as?: "div" } & HTMLAttributes<"div">)
  )

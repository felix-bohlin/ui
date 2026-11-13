import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  (
    | ({ as: "ol" } & HTMLAttributes<"ol">)
    | ({ as?: "ul" } & HTMLAttributes<"ul">)
  )

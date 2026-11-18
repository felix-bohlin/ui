import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props &
  (
    | ({ as: "ol" } & ComponentProps<"ol">)
    | ({ as?: "ul" } & ComponentProps<"ul">)
  )

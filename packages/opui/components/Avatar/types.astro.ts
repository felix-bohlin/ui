import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  Pick<HTMLAttributes<"img">, Base.ImageProps> &
  (
    | ({ as?: "div" } & HTMLAttributes<"div">)
    | ({ as?: "button" } & HTMLAttributes<"button">)
    | ({ as?: "a" } & HTMLAttributes<"a">)
  )

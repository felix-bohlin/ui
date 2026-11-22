import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  (
    | ({ as?: "div"; href?: never } & HTMLAttributes<"div">)
    | ({ as: "button" } & HTMLAttributes<"button"> & Base.Named)
    | ({ as?: "a" } & HTMLAttributes<"a"> & Base.Named)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & HTMLAttributes<"div">

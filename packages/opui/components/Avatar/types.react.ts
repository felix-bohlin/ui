import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props &
  (
    | ({ as?: "div"; href?: never } & ComponentProps<"div">)
    | ({ as: "button" } & ComponentProps<"button"> & Base.Named)
    | ({ as?: "a" } & ComponentProps<"a"> & Base.Named)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

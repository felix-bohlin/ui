import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props &
  (
    | ({ as?: "div" } & ComponentProps<"div">)
    | ({ as: "button" } & ComponentProps<"button">)
    | ({ as?: "a" } & ComponentProps<"a">)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

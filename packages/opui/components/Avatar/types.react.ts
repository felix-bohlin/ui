import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props &
  Base.Slots<ReactNode> &
  (
    | ({ as?: "div" } & ComponentProps<"div">)
    | ({ as: "button" } & ComponentProps<"button">)
    | ({ as?: "a" } & ComponentProps<"a">)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

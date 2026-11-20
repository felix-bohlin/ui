import type * as Base from "./types"
import type { ComponentProps, ComponentType } from "react"

export type Props = Base.Props<ComponentType<any>> &
  (
    | ({ as?: "div"; href?: never } & ComponentProps<"div">)
    | ({ as: "button" } & ComponentProps<"button"> & Base.Named)
    | ({ as?: "a" | ComponentType<any> } & ComponentProps<"a"> & Base.Named)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

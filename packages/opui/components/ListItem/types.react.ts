import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

// prettier-ignore
export type Props =
  Base.Props &
  Base.Slots<ReactNode> &
  (
    | ({ as?: never; href?: never } & ComponentProps<"li">)
    | ({ as?: "a"; href: string } & ComponentProps<"a">)
    | ({ as: "button" } & ComponentProps<"button">)
    | ({ as: "div" } & ComponentProps<"div">)
  )

import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type WithoutFor<T> = T extends unknown ? Omit<T, "for"> : never

// prettier-ignore
export type Props =
  WithoutFor<Base.Props> &
  { htmlFor?: string } &
  Base.Slots<ReactNode> &
  (
    | ({ as?: never; href?: never } & ComponentProps<"li">)
    | ({ as?: "a"; href: string } & ComponentProps<"a">)
    | ({ as: "button" } & ComponentProps<"button">)
    | ({ as: "div" } & ComponentProps<"div">)
  )

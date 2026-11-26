import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props =
  | (Base.Props &
      Base.Slots<ReactNode> & {
        as?: "button"
        href?: never
      } & ComponentProps<"button">)
  | (Base.Props &
      Base.Slots<ReactNode> & { as?: "a"; href: string } & ComponentProps<"a">)

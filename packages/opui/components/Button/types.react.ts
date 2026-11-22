import type * as Base from "./types"
import type { ComponentProps, ComponentType, ReactNode } from "react"

export type Props =
  | (Base.Props<ComponentType<any>> &
      Base.Slots<ReactNode> & {
        as?: "button"
        href?: never
      } & ComponentProps<"button">)
  | (Base.Props<ComponentType<any>> &
      Base.Slots<ReactNode> & {
        as?: "a" | ComponentType<any>
        href: string
      } & ComponentProps<"a">)

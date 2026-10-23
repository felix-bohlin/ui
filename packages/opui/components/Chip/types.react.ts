import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

type WithoutLabel<T> = T extends unknown ? Omit<T, "label"> : never

// prettier-ignore
export type Props = WithoutLabel<Base.Props> &
  Slots &
  (
    | ({ as?: "a" } & Omit<ComponentProps<"a">, "children">)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "children">)
    | ({ as?: "div" } & Omit<ComponentProps<"div">, "children">)
  )

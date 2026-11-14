import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "label"> &
  Base.Slots<ReactNode> &
  (
    | ({ as?: "a" } & Omit<ComponentProps<"a">, "children">)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "children">)
    | ({ as?: "div" } & Omit<ComponentProps<"div">, "children">)
    | ({ as: "span" } & Omit<ComponentProps<"span">, "children">)
  )

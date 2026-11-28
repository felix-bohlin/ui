import type * as Base from "./types"
import type { ComponentProps, ComponentType, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<
  Base.Props<ComponentType<any>>,
  "description" | "for" | "label"
> & { htmlFor?: Base.Props["for"] } & Base.Slots<ReactNode> &
  (
    | ({ as?: never; href?: never } & ComponentProps<"li">)
    | ({ as?: "a" | ComponentType<any>; href: string } & Omit<
        ComponentProps<"a">,
        "type"
      >)
    | ({ as: "button" } & ComponentProps<"button">)
  )

import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "description" | "for" | "label"> & {
  htmlFor?: Base.Props["for"]
} & Base.Slots<ReactNode> &
  (
    | ({ as?: never; href?: never } & ComponentProps<"li">)
    | ({ as?: "a"; href: string } & ComponentProps<"a">)
    | ({ as: "button" } & ComponentProps<"button">)
  )

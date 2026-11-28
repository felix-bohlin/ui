import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "endText" | "for" | "label"> & {
  htmlFor: Base.Props["for"]
} & Base.Slots<ReactNode> &
  ComponentProps<"div">

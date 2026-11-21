import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props =
  // Unique component props
  Without<
    Base.Props,
    | "bottom"
    | "end"
    | "endText"
    | "for"
    | "label"
    | "start"
    | "startText"
    | "top"
  > & { htmlFor: Base.Props["for"] } & Base.Slots<ReactNode> &
    // Root attributes
    // include the rest
    ComponentProps<"div">

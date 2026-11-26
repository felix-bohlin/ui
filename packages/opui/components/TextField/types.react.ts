import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props =
  // Unique component props
  Without<
    Base.Props,
    "bottom" | "end" | "endText" | "label" | "start" | "startText" | "top"
  > &
    Base.Slots<ReactNode> &
    // Input attributes
    {
      // Add 'numeric' as valid input type
      type?: ComponentProps<"input">["type"] | "numeric"
    } &
    // include the rest
    Omit<ComponentProps<"input">, "size" | "type">

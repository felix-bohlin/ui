import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props =
  // Unique component props
  Without<
    Base.Props,
    "bottom" | "end" | "endText" | "label" | "start" | "startText" | "top"
  > &
    Base.Slots<JSX.Element> &
    // Root attributes
    // include the rest
    ComponentProps<"div">

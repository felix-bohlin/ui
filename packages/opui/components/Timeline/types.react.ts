import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Base.Props & ComponentProps<"ol">

export type TimelineItemProps = Without<Base.TimelineItemProps, "label"> &
  Base.TimelineItemSlots<ReactNode> &
  ComponentProps<"li">

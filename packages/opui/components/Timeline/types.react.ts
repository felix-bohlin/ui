import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type TimelineItemSlots = Base.TimelineItemSlots<ReactNode>

export type Props = Base.Props & ComponentProps<"ol">

export type TimelineItemProps = Omit<
  Base.TimelineItemProps,
  keyof TimelineItemSlots
> &
  TimelineItemSlots &
  ComponentProps<"li">

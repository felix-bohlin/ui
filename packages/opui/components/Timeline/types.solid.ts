import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Base.Props & ComponentProps<"ol">

export type TimelineItemProps = Without<Base.TimelineItemProps, "label"> &
  Base.TimelineItemSlots<JSX.Element> &
  ComponentProps<"li">

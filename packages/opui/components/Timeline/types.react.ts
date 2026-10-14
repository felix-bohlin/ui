import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

export type Props = Base.Props & Omit<ComponentProps<"ol">, keyof Base.Props>

export type TimelineItemProps = Base.TimelineItemProps &
  Slots &
  Omit<ComponentProps<"li">, keyof Base.TimelineItemProps | keyof Slots>

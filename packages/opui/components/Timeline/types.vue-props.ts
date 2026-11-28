import type { Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TimelineItemProps as BaseTimelineItemProps,
} from "./types"

export type Props = BaseProps

export type TimelineItemProps = BaseTimelineItemProps

export type Slots = DefaultSlots

export type TimelineItemSlots = { label?: Slot; marker?: Slot } & DefaultSlots

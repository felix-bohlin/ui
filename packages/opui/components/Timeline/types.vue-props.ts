import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TimelineItemProps as BaseTimelineItemProps,
  TimelineItemSlots as BaseTimelineItemSlots,
} from "./types"

export type Props = BaseProps & Class

export type TimelineItemProps = BaseTimelineItemProps & Class

export type Slots = DefaultSlots

export type TimelineItemSlots = BaseTimelineItemSlots<Slot> & DefaultSlots

import type { HTMLAttributes, Slot } from "vue"
import type {
  Props as BaseProps,
  Slots as BaseSlots,
  TimelineItemProps as BaseTimelineItemProps,
} from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type TimelineItemProps = BaseTimelineItemProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
}

export type TimelineItemSlots = BaseSlots<Slot> & {
  default?: Slot
}

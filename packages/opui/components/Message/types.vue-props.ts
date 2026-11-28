import type { IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  MessageListProps as BaseMessageListProps,
  Props as BaseProps,
} from "./types"

export type MessageListProps = BaseMessageListProps & {
  role?: IntrinsicElementAttributes["ol"]["role"]
}

export type Props = BaseProps

export type MessageListSlots = DefaultSlots

export type Slots = {
  actions?: Slot
  bottom?: Slot
  end?: Slot
  start?: Slot
} & DefaultSlots

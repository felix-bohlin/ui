import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  MessageListProps as BaseMessageListProps,
  Props as BaseProps,
} from "./types"

export type MessageListProps = BaseMessageListProps &
  Class & { role?: IntrinsicElementAttributes["ol"]["role"] }

export type Props = BaseProps & Class

export type MessageListSlots = DefaultSlots

export type Slots = { bottom?: Slot; end?: Slot; start?: Slot } & DefaultSlots

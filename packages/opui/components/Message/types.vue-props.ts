import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  MessagesProps as BaseMessagesProps,
  Props as BaseProps,
} from "./types"

export type MessagesProps = BaseMessagesProps & Class

export type Props = BaseProps & Class

export type MessagesSlots = DefaultSlots

export type Slots = { bottom?: Slot; end?: Slot; start?: Slot } & DefaultSlots

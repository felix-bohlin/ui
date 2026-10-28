import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  MessagesProps as BaseMessagesProps,
  Props as BaseProps,
  Slots as BaseSlots,
} from "./types"

export type Props = BaseProps & Class

export type MessagesProps = BaseMessagesProps & Class

export type Slots = BaseSlots<Slot> & DefaultSlots

export type MessagesSlots = DefaultSlots

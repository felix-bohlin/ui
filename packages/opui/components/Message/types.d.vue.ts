import type { HTMLAttributes, Slot } from "vue"
import type {
  MessagesProps as BaseMessagesProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type MessagesProps = BaseMessagesProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  avatar?: Slot
  default?: Slot
  footer?: Slot
}

export type MessagesSlots = {
  default?: Slot
}

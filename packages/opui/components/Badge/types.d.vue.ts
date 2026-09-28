import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps, Slots as BaseSlots } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = BaseSlots<Slot> & {
  default?: Slot
}

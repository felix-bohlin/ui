import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
  description?: Slot
  end?: Slot
  headline?: Slot
  start?: Slot
  text?: Slot
}

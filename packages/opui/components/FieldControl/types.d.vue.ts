import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
  prefix?: Slot
  suffix?: Slot
  header?: Slot
  footer?: Slot
}
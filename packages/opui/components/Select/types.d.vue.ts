import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  id?: HTMLAttributes["id"]
  value?: string | number | (string | number)[]
}

export type Slots = {
  default?: Slot
  "end-text"?: Slot
  footer?: Slot
  header?: Slot
  label?: Slot
  prefix?: Slot
  "start-text"?: Slot
  suffix?: Slot
}

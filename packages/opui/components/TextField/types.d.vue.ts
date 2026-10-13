import type { HTMLAttributes, InputHTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  id?: HTMLAttributes["id"]
  type?: InputHTMLAttributes["type"] | "numeric"
}

export type Slots = {
  default?: Slot
  description?: Slot
  "end-text"?: Slot
  footer?: Slot
  header?: Slot
  label?: Slot
  prefix?: Slot
  "supporting-text"?: Slot
  suffix?: Slot
}

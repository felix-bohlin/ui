import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = Omit<BaseProps, "value"> & {
  class?: HTMLAttributes["class"]
  id?: HTMLAttributes["id"]
}

export type Slots = {
  default?: Slot
  description?: Slot
  "end-text"?: Slot
  label?: Slot
}

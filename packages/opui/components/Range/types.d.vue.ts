import type { HTMLAttributes, Slot } from "vue"
import type { RangeProps as BaseRangeProps } from "./types"

export type RangeProps = BaseRangeProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  datalist?: Slot
  default?: Slot
  "end-text"?: Slot
  "start-text"?: Slot
  value?: Slot
}

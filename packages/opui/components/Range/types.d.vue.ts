import type { HTMLAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { RangeProps as BaseRangeProps } from "./types"

export type RangeProps = BaseRangeProps &
  Class & {
    id?: HTMLAttributes["id"]
  }

export type Slots = {
  datalist?: Slot
  default?: Slot
  "end-text"?: Slot
  "start-text"?: Slot
  value?: Slot<{ value: number }>
}

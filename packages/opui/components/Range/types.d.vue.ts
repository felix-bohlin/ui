import type { HTMLAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    id?: HTMLAttributes["id"]
  }

export type Slots = {
  datalist?: Slot
  "end-text"?: Slot
  label?: Slot
  "start-text"?: Slot
  "value-text"?: Slot<{ value: number }>
}

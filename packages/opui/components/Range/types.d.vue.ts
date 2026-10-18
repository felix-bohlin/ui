import type { HTMLAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
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

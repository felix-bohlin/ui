import type { HTMLAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    id?: HTMLAttributes["id"]
    value?: string
  }

export type Slots = {
  "end-text"?: Slot
  label?: Slot
}

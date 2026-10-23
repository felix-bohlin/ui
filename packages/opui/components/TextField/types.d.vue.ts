import type { HTMLAttributes, InputHTMLAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    id?: HTMLAttributes["id"]
    type?: InputHTMLAttributes["type"] | "numeric"
    value?: string | number
  }

export type Slots = {
  bottom?: Slot
  default?: Slot
  end?: Slot
  "end-text"?: Slot
  label?: Slot
  start?: Slot
  "start-text"?: Slot
  top?: Slot
}

import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    id?: IntrinsicElementAttributes["input"]["id"]
    name?: IntrinsicElementAttributes["input"]["name"]
    type?: IntrinsicElementAttributes["input"]["type"]
    value?: string | number
  }

export type Slots = {
  bottom?: Slot
  end?: Slot
  "end-text"?: Slot
  "icon-checked"?: Slot
  "icon-unchecked"?: Slot
  label?: Slot
  start?: Slot
  "start-text"?: Slot
  top?: Slot
} & DefaultSlots

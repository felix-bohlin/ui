import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  // Add 'numeric' as valid input type
  type?: IntrinsicElementAttributes["input"]["type"] | "numeric"
} & Class & {
    id?: IntrinsicElementAttributes["input"]["id"]
    inputmode?: IntrinsicElementAttributes["input"]["inputmode"]
    name?: IntrinsicElementAttributes["input"]["name"]
    pattern?: IntrinsicElementAttributes["input"]["pattern"]
    value?: string | number
  }

export type Slots = {
  bottom?: Slot
  end?: Slot
  "end-text"?: Slot
  label?: Slot
  start?: Slot
  "start-text"?: Slot
  top?: Slot
} & DefaultSlots

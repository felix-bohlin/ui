import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    id?: IntrinsicElementAttributes["input"]["id"]
    lang?: IntrinsicElementAttributes["input"]["lang"]
    max?: IntrinsicElementAttributes["input"]["max"]
    min?: IntrinsicElementAttributes["input"]["min"]
    name?: IntrinsicElementAttributes["input"]["name"]
    step?: IntrinsicElementAttributes["input"]["step"]
  }

export type Slots = {
  datalist?: Slot
  "end-text"?: Slot
  label?: Slot
  "start-text"?: Slot
  "value-text"?: Slot
}

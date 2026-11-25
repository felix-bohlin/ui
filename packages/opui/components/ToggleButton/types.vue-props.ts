import type { IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  name?: IntrinsicElementAttributes["input"]["name"]
  value?: IntrinsicElementAttributes["input"]["value"]
}

export type Slots = DefaultSlots

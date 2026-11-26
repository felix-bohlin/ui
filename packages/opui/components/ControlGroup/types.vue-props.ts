import type { IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  role?: IntrinsicElementAttributes["div"]["role"]
}

export type Slots = DefaultSlots

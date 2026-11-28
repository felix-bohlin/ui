import type { IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  as?: "ol" | "ul"
  role?:
    | IntrinsicElementAttributes["ol"]["role"]
    | IntrinsicElementAttributes["ul"]["role"]
}

export type Slots = DefaultSlots

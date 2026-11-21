import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    as?: "ol" | "ul"
    role?:
      | IntrinsicElementAttributes["ol"]["role"]
      | IntrinsicElementAttributes["ul"]["role"]
  }

export type Slots = DefaultSlots

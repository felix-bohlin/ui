import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    as?: "legend" | "p"
    id?:
      | IntrinsicElementAttributes["legend"]["id"]
      | IntrinsicElementAttributes["p"]["id"]
  }

export type Slots = DefaultSlots

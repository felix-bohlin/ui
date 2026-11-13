import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & { role?: IntrinsicElementAttributes["div"]["role"] }

export type Slots = DefaultSlots

import type { Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps

export type Slots = {
  bottom?: Slot
  end?: Slot
  "end-text"?: Slot
  label?: Slot
  start?: Slot
  "start-text"?: Slot
  top?: Slot
} & DefaultSlots

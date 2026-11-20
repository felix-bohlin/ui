import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & Class

export type Slots = {
  "decrease-icon"?: Slot
  "end-text"?: Slot
  "increase-icon"?: Slot
  label?: Slot
  "start-text"?: Slot
} & DefaultSlots

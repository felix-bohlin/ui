import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & Class & { as?: "a" | "button" }

export type Slots = {
  description?: Slot
  end?: Slot
  "icon-checked"?: Slot
  label?: Slot
  start?: Slot
  submenu?: Slot
} & DefaultSlots

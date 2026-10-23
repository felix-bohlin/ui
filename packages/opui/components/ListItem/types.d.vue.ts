import type { Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & Class

export type Slots = {
  default?: Slot
  description?: Slot
  end?: Slot
  label?: Slot
  start?: Slot
  submenu?: Slot
}

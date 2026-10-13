import type { HTMLAttributes, Slot } from "vue"
import type { CheckboxProps as BaseCheckboxProps } from "./types"

export type CheckboxProps = BaseCheckboxProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

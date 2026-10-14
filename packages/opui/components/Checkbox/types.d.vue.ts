import type { HTMLAttributes, Slot } from "vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  CheckboxProps as BaseCheckboxProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type CheckboxProps = BaseCheckboxProps & Class

export type CheckboxInputProps = BaseCheckboxInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

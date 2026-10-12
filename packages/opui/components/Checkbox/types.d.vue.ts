import type { HTMLAttributes, Slot } from "vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  CheckboxProps as BaseCheckboxProps,
} from "./types"

export type CheckboxProps = BaseCheckboxProps & {
  class?: HTMLAttributes["class"]
}

export type CheckboxInputProps = BaseCheckboxInputProps

export type Slots = {
  default?: Slot
}

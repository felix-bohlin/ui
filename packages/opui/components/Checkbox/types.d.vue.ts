import type { Slot } from "vue"
import type { Class } from "../vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  CheckboxProps as BaseCheckboxProps,
} from "./types"

export type CheckboxProps = BaseCheckboxProps & Class

export type CheckboxInputProps = BaseCheckboxInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

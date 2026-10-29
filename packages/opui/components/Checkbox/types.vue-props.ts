import type { Slot } from "vue"
import type { Class } from "../vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type CheckboxInputProps = BaseCheckboxInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  Props as BaseProps,
} from "./types"

export type CheckboxInputProps = BaseCheckboxInputProps &
  Class & { name?: IntrinsicElementAttributes["input"]["name"] }

export type Props = BaseProps & Class

export type Slots = { "end-text"?: Slot } & DefaultSlots

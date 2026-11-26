import type { IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  Props as BaseProps,
} from "./types"

export type CheckboxInputProps = BaseCheckboxInputProps & {
  name?: IntrinsicElementAttributes["input"]["name"]
}

export type Props = BaseProps

export type Slots = { "end-text"?: Slot } & DefaultSlots

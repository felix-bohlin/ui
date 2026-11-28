import type { Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  CheckboxInputProps as BaseCheckboxInputProps,
  Props as BaseProps,
} from "./types"

export type CheckboxInputProps = BaseCheckboxInputProps

export type Props = BaseProps

export type Slots = { "end-text"?: Slot } & DefaultSlots

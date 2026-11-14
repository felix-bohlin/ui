import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  SwitchInputProps as BaseSwitchInputProps,
} from "./types"

export type Props = BaseProps & Class

export type SwitchInputProps = BaseSwitchInputProps &
  Class & { name?: IntrinsicElementAttributes["input"]["name"] }

export type Slots = {
  "end-text"?: Slot
  "icon-checked"?: Slot
  "icon-unchecked"?: Slot
} & DefaultSlots

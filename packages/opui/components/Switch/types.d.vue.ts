import type { Slot } from "vue"
import type { Class } from "../vue"
import type {
  Props as BaseProps,
  SwitchInputProps as BaseSwitchInputProps,
} from "./types"

export type Props = BaseProps & Class

export type SwitchInputProps = BaseSwitchInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
  "icon-checked"?: Slot
  "icon-unchecked"?: Slot
}

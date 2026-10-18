import type { Slot } from "vue"
import type { Class } from "../vue"
import type {
  SwitchInputProps as BaseSwitchInputProps,
  SwitchProps as BaseSwitchProps,
} from "./types"

export type SwitchProps = BaseSwitchProps & Class

export type SwitchInputProps = BaseSwitchInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
  "icon-checked"?: Slot
  "icon-unchecked"?: Slot
}

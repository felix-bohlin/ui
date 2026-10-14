import type { HTMLAttributes, Slot } from "vue"
import type {
  SwitchInputProps as BaseSwitchInputProps,
  SwitchProps as BaseSwitchProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type SwitchProps = BaseSwitchProps & Class

export type SwitchInputProps = BaseSwitchInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
  "icon-checked"?: Slot
  "icon-unchecked"?: Slot
}

import type { HTMLAttributes, Slot } from "vue"
import type { SwitchProps as BaseSwitchProps } from "./types"

export type SwitchProps = BaseSwitchProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
  "end-text"?: Slot
  "icon-checked"?: Slot
  "icon-unchecked"?: Slot
}

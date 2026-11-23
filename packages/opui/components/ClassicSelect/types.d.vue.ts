import type { HTMLAttributes, Slot } from "vue"
import type { ClassicSelectProps as BaseClassicSelectProps } from "./types"

export type ClassicSelectProps = BaseClassicSelectProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
}

import type { HTMLAttributes, Slot } from "vue"
import type { RadioProps as BaseRadioProps } from "./types"

export type RadioProps = BaseRadioProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

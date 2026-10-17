import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  as?: "div" | "form"
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
}

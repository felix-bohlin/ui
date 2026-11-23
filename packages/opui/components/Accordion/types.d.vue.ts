import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  name?: string
  open?: boolean
}

export type Slots = {
  actions?: Slot
  default?: Slot
  marker?: Slot
  summary?: Slot
}

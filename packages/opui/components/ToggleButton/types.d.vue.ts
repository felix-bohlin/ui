import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  disabled?: boolean
  id?: string
  name?: string
  value?: string
}

export type Slots = {
  default?: Slot
}

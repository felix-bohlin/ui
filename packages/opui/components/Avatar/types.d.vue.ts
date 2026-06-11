import type { Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  alt?: string
  src?: string
  class?: string
}

export type Slots = {
  default?: Slot
}

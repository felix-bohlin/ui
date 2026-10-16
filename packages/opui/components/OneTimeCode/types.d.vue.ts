import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  id?: HTMLAttributes["id"]
}

export type Slots = {
  "end-text"?: Slot
  label?: Slot
}

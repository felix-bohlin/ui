import type { HTMLAttributes, Slot } from "vue"
import type { IconOnlyProps, SharedProps } from "./types"

export type Props = SharedProps & {
  class?: HTMLAttributes["class"]
  iconOnly?: boolean
} & /* @vue-ignore */ IconOnlyProps

export type Slots = {
  default?: Slot
}

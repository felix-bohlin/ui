import type { HTMLAttributes, Slot } from "vue"
import type {
  AnchorContentProps as BaseAnchorContentProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  id?: HTMLAttributes["id"]
}

export type AnchorContentProps = BaseAnchorContentProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
}

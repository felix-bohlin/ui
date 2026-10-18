import type { HTMLAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  AnchorContentProps as BaseAnchorContentProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps &
  Class & {
    id?: HTMLAttributes["id"]
  }

export type AnchorContentProps = BaseAnchorContentProps & Class

export type Slots = DefaultSlots

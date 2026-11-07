import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  AnchorContentProps as BaseAnchorContentProps,
  Props as BaseProps,
} from "./types"

export type AnchorContentProps = BaseAnchorContentProps & Class

export type Props = BaseProps &
  Class & { id?: IntrinsicElementAttributes["span"]["id"] }

export type Slots = DefaultSlots

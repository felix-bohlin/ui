import type { IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  AnchorContentProps as BaseAnchorContentProps,
  Props as BaseProps,
} from "./types"

export type AnchorContentProps = BaseAnchorContentProps & {
  id?: IntrinsicElementAttributes["span"]["id"]
}

export type Props = BaseProps & {
  id?: IntrinsicElementAttributes["span"]["id"]
}

export type Slots = DefaultSlots

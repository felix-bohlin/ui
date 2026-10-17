import type { HTMLAttributes, Slot } from "vue"
import type {
  AvatarGroupProps as BaseAvatarGroupProps,
  Props as BaseProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type AvatarGroupProps = BaseAvatarGroupProps & Class

export type Slots = {
  default?: Slot
}

import type { Class, DefaultSlots } from "../vue"
import type {
  AvatarGroupProps as BaseAvatarGroupProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type AvatarGroupProps = BaseAvatarGroupProps & Class

export type Slots = DefaultSlots

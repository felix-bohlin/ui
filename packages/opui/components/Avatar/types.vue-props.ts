import type { Class, DefaultSlots } from "../vue"
import type {
  AvatarGroupProps as BaseAvatarGroupProps,
  Props as BaseProps,
} from "./types"

export type AvatarGroupProps = Omit<
  BaseAvatarGroupProps,
  "aria-label" | "aria-labelledby"
> &
  Class

export type Props = BaseProps & Class & { as?: "a" | "button" | "div" }

export type Slots = DefaultSlots

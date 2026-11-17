import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  AvatarGroupProps as BaseAvatarGroupProps,
  Props as BaseProps,
} from "./types"

export type AvatarGroupProps = Omit<
  BaseAvatarGroupProps,
  "aria-label" | "aria-labelledby"
> &
  Class & { role?: IntrinsicElementAttributes["div"]["role"] }

export type Props = BaseProps & Class & { as?: "a" | "button" | "div" }

export type Slots = DefaultSlots

import type { Component, IntrinsicElementAttributes } from "vue"
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

export type Props = BaseProps<Component> & Class

export type Slots = DefaultSlots

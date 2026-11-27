import type { Component, IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  AvatarGroupProps as BaseAvatarGroupProps,
  Props as BaseProps,
} from "./types"

export type AvatarGroupProps = Omit<
  BaseAvatarGroupProps,
  "aria-label" | "aria-labelledby"
> & { role?: IntrinsicElementAttributes["div"]["role"] }

export type Props = BaseProps<Component>

export type Slots = DefaultSlots

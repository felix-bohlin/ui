import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { MenuItem as BaseMenuItem, Props as BaseProps } from "./types"

export type MenuItem = BaseMenuItem &
  Omit<
    IntrinsicElementAttributes["a"] & IntrinsicElementAttributes["button"],
    keyof BaseMenuItem | "children"
  >

export type Props = Omit<BaseProps, "items"> & {
  items?: MenuItem[]
} & Class

export type Slots = DefaultSlots

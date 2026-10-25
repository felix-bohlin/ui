import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { MenuItem as BaseMenuItem, Props as BaseProps } from "./types"

export type MenuItem = BaseMenuItem &
  Omit<
    AnchorHTMLAttributes & ButtonHTMLAttributes,
    keyof BaseMenuItem | "children"
  >

export type Props = Omit<BaseProps, "items"> &
  Class & {
    items?: MenuItem[]
  }

export type Slots = DefaultSlots

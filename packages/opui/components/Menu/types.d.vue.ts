import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  Slot,
} from "vue"
import type { MenuItem as BaseMenuItem, Props as BaseProps } from "./types"

export type MenuItem = BaseMenuItem &
  Omit<
    AnchorHTMLAttributes & ButtonHTMLAttributes,
    keyof BaseMenuItem | "children"
  >

export type Props = Omit<BaseProps, "items"> & {
  class?: HTMLAttributes["class"]
  items?: MenuItem[]
}

export type Slots = {
  default?: Slot
}

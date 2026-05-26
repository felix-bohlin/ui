import type { HTMLAttributes, Slot } from "vue"
import type {
  DrawerFooterProps as BaseDrawerFooterProps,
  DrawerHeaderProps as BaseDrawerHeaderProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type DrawerHeaderProps = BaseDrawerHeaderProps & {
  class?: HTMLAttributes["class"]
}

export type DrawerFooterProps = BaseDrawerFooterProps & {
  class?: HTMLAttributes["class"]
}

export type DrawerSlots = {
  content?: Slot
  footer?: Slot
  header?: Slot
}

export type DrawerHeaderSlots = {
  default?: Slot
}

export type DrawerFooterSlots = {
  default?: Slot
}

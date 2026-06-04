import type { HTMLAttributes, Slot } from "vue"
import type {
  DrawerFooterProps as BaseDrawerFooterProps,
  DrawerHeaderProps as BaseDrawerHeaderProps,
  Props as BaseProps,
export type DrawerSlots = BaseSlots<Slot>

export type DrawerHeaderSlots = {
  default?: Slot
}

export type DrawerFooterSlots = {
  default?: Slot
}

import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  DrawerContentProps as BaseDrawerContentProps,
  DrawerFooterProps as BaseDrawerFooterProps,
  DrawerHeaderProps as BaseDrawerHeaderProps,
  DrawerTitleProps as BaseDrawerTitleProps,
  Props as BaseProps,
} from "./types"

export type DrawerContentProps = BaseDrawerContentProps & Class

export type DrawerFooterProps = BaseDrawerFooterProps & Class

export type DrawerHeaderProps = BaseDrawerHeaderProps & Class

export type DrawerTitleProps = BaseDrawerTitleProps &
  Class & { id?: IntrinsicElementAttributes["h2"]["id"] }

export type Props = BaseProps & Class

export type Slots = DefaultSlots

export type DrawerHeaderSlots = { "close-icon"?: Slot } & DefaultSlots

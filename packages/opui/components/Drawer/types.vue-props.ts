import type { IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  DrawerContentProps as BaseDrawerContentProps,
  DrawerFooterProps as BaseDrawerFooterProps,
  DrawerHeaderProps as BaseDrawerHeaderProps,
  DrawerTitleProps as BaseDrawerTitleProps,
  Props as BaseProps,
} from "./types"

export type DrawerContentProps = BaseDrawerContentProps

export type DrawerFooterProps = BaseDrawerFooterProps

export type DrawerHeaderProps = BaseDrawerHeaderProps

export type DrawerTitleProps = BaseDrawerTitleProps & {
  id?: IntrinsicElementAttributes["h2"]["id"]
}

export type Props = BaseProps

export type Slots = DefaultSlots

export type DrawerHeaderSlots = { "close-icon"?: Slot } & DefaultSlots

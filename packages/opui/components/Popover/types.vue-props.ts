import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  PopoverContentProps as BasePopoverContentProps,
  PopoverFooterProps as BasePopoverFooterProps,
  PopoverHeaderProps as BasePopoverHeaderProps,
  PopoverTitleProps as BasePopoverTitleProps,
  Props as BaseProps,
} from "./types"

export type PopoverContentProps = BasePopoverContentProps & Class

export type PopoverFooterProps = BasePopoverFooterProps & Class

export type PopoverHeaderProps = BasePopoverHeaderProps & Class

export type PopoverTitleProps = BasePopoverTitleProps &
  Class & { id?: IntrinsicElementAttributes["h2"]["id"] }

export type Props = BaseProps & Class

export type Slots = DefaultSlots

export type PopoverHeaderSlots = { "close-icon"?: Slot } & DefaultSlots

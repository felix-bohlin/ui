import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  DialogContentProps as BaseDialogContentProps,
  DialogFooterProps as BaseDialogFooterProps,
  DialogHeaderProps as BaseDialogHeaderProps,
  DialogTitleProps as BaseDialogTitleProps,
  Props as BaseProps,
} from "./types"

export type DialogContentProps = BaseDialogContentProps & Class

export type DialogFooterProps = BaseDialogFooterProps & Class

export type DialogHeaderProps = BaseDialogHeaderProps & Class

export type DialogTitleProps = BaseDialogTitleProps &
  Class & { id?: IntrinsicElementAttributes["h2"]["id"] }

export type Props = BaseProps & Class

export type Slots = DefaultSlots

export type DialogHeaderSlots = { "close-icon"?: Slot } & DefaultSlots

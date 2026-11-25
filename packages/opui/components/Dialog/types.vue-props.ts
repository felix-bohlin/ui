import type { IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  DialogContentProps as BaseDialogContentProps,
  DialogFooterProps as BaseDialogFooterProps,
  DialogHeaderProps as BaseDialogHeaderProps,
  DialogTitleProps as BaseDialogTitleProps,
  Props as BaseProps,
} from "./types"

export type DialogContentProps = BaseDialogContentProps

export type DialogFooterProps = BaseDialogFooterProps

export type DialogHeaderProps = BaseDialogHeaderProps

export type DialogTitleProps = BaseDialogTitleProps & {
  id?: IntrinsicElementAttributes["h2"]["id"]
}

export type Props = BaseProps

export type Slots = DefaultSlots

export type DialogHeaderSlots = { "close-icon"?: Slot } & DefaultSlots

import type { HTMLAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  DialogContentProps as BaseDialogContentProps,
  DialogFooterProps as BaseDialogFooterProps,
  DialogHeaderProps as BaseDialogHeaderProps,
  DialogTitleProps as BaseDialogTitleProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type DialogContentProps = BaseDialogContentProps & Class

export type DialogFooterProps = BaseDialogFooterProps & Class

export type DialogHeaderProps = BaseDialogHeaderProps & Class

export type DialogTitleProps = BaseDialogTitleProps &
  Class & {
    id?: HTMLAttributes["id"]
  }

export type Slots = DefaultSlots

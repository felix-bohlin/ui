import type { HTMLAttributes, Slot } from "vue"
import type {
  DialogActionsProps as BaseDialogActionsProps,
  DialogContentProps as BaseDialogContentProps,
  DialogHeaderProps as BaseDialogHeaderProps,
  Props as BaseProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type DialogActionsProps = BaseDialogActionsProps & Class

export type DialogContentProps = BaseDialogContentProps & Class

export type DialogHeaderProps = BaseDialogHeaderProps &
  Class & {
    id?: HTMLAttributes["id"]
  }

export type Slots = {
  default?: Slot
}

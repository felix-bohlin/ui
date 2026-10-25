import type { HTMLAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  DrawerActionsProps as BaseDrawerActionsProps,
  DrawerContentProps as BaseDrawerContentProps,
  DrawerHeaderProps as BaseDrawerHeaderProps,
  DrawerTitleProps as BaseDrawerTitleProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type DrawerActionsProps = BaseDrawerActionsProps & Class

export type DrawerContentProps = BaseDrawerContentProps & Class

export type DrawerHeaderProps = BaseDrawerHeaderProps & Class

export type DrawerTitleProps = BaseDrawerTitleProps &
  Class & {
    id?: HTMLAttributes["id"]
  }

export type Slots = DefaultSlots

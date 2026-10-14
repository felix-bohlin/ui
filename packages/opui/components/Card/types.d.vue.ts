import type { HTMLAttributes, Slot } from "vue"
import type {
  CardActionsProps as BaseCardActionsProps,
  CardContentProps as BaseCardContentProps,
  CardHeaderProps as BaseCardHeaderProps,
  Props as BaseProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type CardActionsProps = BaseCardActionsProps & Class

export type CardContentProps = BaseCardContentProps & Class

export type CardHeaderProps = BaseCardHeaderProps & Class

export type Slots = {
  default?: Slot
}

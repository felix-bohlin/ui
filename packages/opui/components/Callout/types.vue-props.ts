import type { Class, DefaultSlots } from "../vue"
import type {
  CalloutActionsProps as BaseCalloutActionsProps,
  CalloutContentProps as BaseCalloutContentProps,
  CalloutIconProps as BaseCalloutIconProps,
  Props as BaseProps,
} from "./types"

export type CalloutActionsProps = BaseCalloutActionsProps & Class

export type CalloutContentProps = BaseCalloutContentProps & Class

export type CalloutIconProps = BaseCalloutIconProps & Class

export type Props = BaseProps & Class

export type Slots = DefaultSlots

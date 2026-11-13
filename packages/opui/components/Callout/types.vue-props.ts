import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  CalloutActionsProps as BaseCalloutActionsProps,
  CalloutContentProps as BaseCalloutContentProps,
  CalloutIconProps as BaseCalloutIconProps,
  Events as BaseEvents,
  Props as BaseProps,
} from "./types"

export type CalloutActionsProps = BaseCalloutActionsProps & Class

export type CalloutContentProps = BaseCalloutContentProps & Class

export type CalloutIconProps = BaseCalloutIconProps & Class

export type Props = BaseProps &
  Class & { id?: IntrinsicElementAttributes["div"]["id"] }

export type Emits = { dismiss: [event: BaseEvents["dismiss"]] }

export type CalloutActionsSlots = DefaultSlots

export type CalloutContentSlots = DefaultSlots

export type Slots = { "close-icon"?: Slot } & DefaultSlots

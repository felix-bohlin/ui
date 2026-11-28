import type { IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  CalloutActionsProps as BaseCalloutActionsProps,
  CalloutContentProps as BaseCalloutContentProps,
  CalloutIconProps as BaseCalloutIconProps,
  Events as BaseEvents,
  Props as BaseProps,
} from "./types"

export type CalloutActionsProps = BaseCalloutActionsProps

export type CalloutContentProps = BaseCalloutContentProps

export type CalloutIconProps = BaseCalloutIconProps

export type Props = BaseProps & { id?: IntrinsicElementAttributes["div"]["id"] }

export type Emits = { dismiss: [event: BaseEvents["dismiss"]] }

export type CalloutActionsSlots = DefaultSlots

export type CalloutContentSlots = DefaultSlots

export type Slots = { "close-icon"?: Slot } & DefaultSlots

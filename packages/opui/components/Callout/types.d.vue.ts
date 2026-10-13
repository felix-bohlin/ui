import type { HTMLAttributes, InjectionKey, Slot } from "vue"
import type {
  CalloutContentProps as BaseCalloutContentProps,
  CalloutIconProps as BaseCalloutIconProps,
  CalloutTitleProps as BaseCalloutTitleProps,
  Props as BaseProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type CalloutContentProps = BaseCalloutContentProps & Class

export type CalloutIconProps = BaseCalloutIconProps & Class

export type CalloutTitleProps = BaseCalloutTitleProps & Class

export type Slots = {
  default?: Slot
}

export const CalloutKey = Symbol() as InjectionKey<{
  severity: BaseProps["severity"]
}>

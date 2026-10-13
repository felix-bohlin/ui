import type { HTMLAttributes, Slot } from "vue"
import type {
  AccordionActionsProps as BaseAccordionActionsProps,
  AccordionContentProps as BaseAccordionContentProps,
  AccordionSummaryProps as BaseAccordionSummaryProps,
  Props as BaseProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps &
  Class & {
    name?: string
    open?: boolean
  }

export type AccordionActionsProps = BaseAccordionActionsProps & Class

export type AccordionContentProps = BaseAccordionContentProps & Class

export type AccordionSummaryProps = BaseAccordionSummaryProps & Class

export type Slots = {
  default?: Slot
}

export type AccordionSummarySlots = {
  default?: Slot
  marker?: Slot
}

import type { HTMLAttributes, Slot } from "vue"
import type {
  AccordionActionsProps as BaseAccordionActionsProps,
  AccordionContentProps as BaseAccordionContentProps,
  AccordionSummaryProps as BaseAccordionSummaryProps,
  AccordionSummarySlots as BaseAccordionSummarySlots,
  Props as BaseProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type AccordionActionsProps = BaseAccordionActionsProps & Class

export type AccordionContentProps = BaseAccordionContentProps & Class

export type AccordionSummaryProps = BaseAccordionSummaryProps & Class

export type Slots = {
  default?: Slot
}

export type AccordionSummarySlots = BaseAccordionSummarySlots<Slot> & {
  default?: Slot
}

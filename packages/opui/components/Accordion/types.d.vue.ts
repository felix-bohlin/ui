import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  AccordionActionsProps as BaseAccordionActionsProps,
  AccordionContentProps as BaseAccordionContentProps,
  AccordionSummaryProps as BaseAccordionSummaryProps,
  AccordionSummarySlots as BaseAccordionSummarySlots,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type AccordionActionsProps = BaseAccordionActionsProps & Class

export type AccordionContentProps = BaseAccordionContentProps & Class

export type AccordionSummaryProps = BaseAccordionSummaryProps & Class

export type Slots = DefaultSlots

export type AccordionSummarySlots = BaseAccordionSummarySlots<Slot> &
  DefaultSlots

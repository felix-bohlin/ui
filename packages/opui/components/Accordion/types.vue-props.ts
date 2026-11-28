import type { Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  AccordionActionsProps as BaseAccordionActionsProps,
  AccordionContentProps as BaseAccordionContentProps,
  AccordionSummaryProps as BaseAccordionSummaryProps,
  Props as BaseProps,
} from "./types"

export type AccordionActionsProps = BaseAccordionActionsProps

export type AccordionContentProps = BaseAccordionContentProps

export type AccordionSummaryProps = BaseAccordionSummaryProps

export type Props = BaseProps

export type Slots = DefaultSlots

export type AccordionSummarySlots = { marker?: Slot } & DefaultSlots

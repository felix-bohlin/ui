import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & ComponentProps<"details">

export type AccordionActionsProps = Base.AccordionActionsProps &
  ComponentProps<"div">

export type AccordionContentProps = Base.AccordionContentProps &
  ComponentProps<"div">

export type AccordionSummaryProps = Base.AccordionSummaryProps &
  Base.AccordionSummarySlots<ReactNode> &
  ComponentProps<"summary">

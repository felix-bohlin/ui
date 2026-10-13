import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.DetailsHtmlAttributes<HTMLDetailsElement>

export type AccordionActionsProps = Base.AccordionActionsProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type AccordionContentProps = Base.AccordionContentProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type AccordionSummaryProps = Base.AccordionSummaryProps &
  Base.AccordionSummarySlots<JSX.Element> &
  JSX.HTMLAttributes<HTMLElement>

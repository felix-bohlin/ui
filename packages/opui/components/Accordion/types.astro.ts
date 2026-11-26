import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"details">

export type AccordionActionsProps = Base.AccordionActionsProps &
  HTMLAttributes<"div">

export type AccordionContentProps = Base.AccordionContentProps &
  HTMLAttributes<"div">

export type AccordionSummaryProps = Base.AccordionSummaryProps &
  HTMLAttributes<"summary">

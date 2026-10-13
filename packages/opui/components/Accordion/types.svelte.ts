import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props & SvelteHTMLElements["details"]

export type AccordionActionsProps = Base.AccordionActionsProps &
  SvelteHTMLElements["div"]

export type AccordionContentProps = Base.AccordionContentProps &
  SvelteHTMLElements["div"]

export type AccordionSummaryProps = Base.AccordionSummaryProps &
  Base.AccordionSummarySlots<Snippet> &
  SvelteHTMLElements["summary"]

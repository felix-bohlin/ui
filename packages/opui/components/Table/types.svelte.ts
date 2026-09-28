import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type ColumnProps = Base.ColumnProps & SvelteHTMLElements["col"]
export type Props = Base.Props & SvelteHTMLElements["table"]
export type SectionProps<
  T extends "colgroup" | "tbody" | "td" | "tfoot" | "th" | "thead" | "tr" =
    "tbody",
> = Base.SectionProps & SvelteHTMLElements[T]

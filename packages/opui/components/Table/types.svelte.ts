import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

type Section = "colgroup" | "tbody" | "td" | "th" | "thead" | "tr"

export type ColumnProps = Base.ColumnProps & SvelteHTMLElements["col"]
export type Props = Base.Props & SvelteHTMLElements["table"]
export type SectionProps<T extends Section = Section> = Base.SectionProps &
  SvelteHTMLElements[T]

import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

type Section =
  "caption" | "colgroup" | "tbody" | "td" | "tfoot" | "th" | "thead" | "tr"

export type Props = Base.Props & SvelteHTMLElements["table"]
export type SectionProps<T extends Section = Section> = Base.SectionProps &
  SvelteHTMLElements[T]
export type TableColumnProps = Base.TableColumnProps & SvelteHTMLElements["col"]

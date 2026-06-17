import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type ColumnProps = Base.ColumnProps & SvelteHTMLElements["col"]
export type Props = Base.Props & SvelteHTMLElements["table"]
export type SectionProps = Base.SectionProps &
  (
    | SvelteHTMLElements["tbody"]
    | SvelteHTMLElements["tfoot"]
    | SvelteHTMLElements["thead"]
  )

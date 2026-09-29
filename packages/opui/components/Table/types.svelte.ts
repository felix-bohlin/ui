import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

type SectionElements = {
  colgroup: HTMLTableColElement
  tbody: HTMLTableSectionElement
  td: HTMLTableCellElement
  tfoot: HTMLTableSectionElement
  th: HTMLTableCellElement
  thead: HTMLTableSectionElement
  tr: HTMLTableRowElement
}

export type ColumnProps = Base.ColumnProps &
  SvelteHTMLElements["col"] & {
    ref?: HTMLTableColElement | null
  }
export type Props = Base.Props &
  SvelteHTMLElements["table"] & {
    ref?: HTMLTableElement | null
  }
export type SectionProps<T extends keyof SectionElements = "tbody"> =
  Base.SectionProps &
    SvelteHTMLElements[T] & {
      ref?: SectionElements[T] | null
    }

import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["table"]

export type TableBodyProps = SvelteHTMLElements["tbody"]

export type TableCaptionProps = SvelteHTMLElements["caption"]

export type TableCellProps = Base.TableCellProps & SvelteHTMLElements["td"]

export type TableColumnGroupProps = SvelteHTMLElements["colgroup"]

export type TableColumnProps = Base.TableColumnProps & SvelteHTMLElements["col"]

export type TableFootProps = SvelteHTMLElements["tfoot"]

export type TableHeaderCellProps = Base.TableHeaderCellProps &
  SvelteHTMLElements["th"]

export type TableHeadProps = SvelteHTMLElements["thead"]

export type TableRowProps = SvelteHTMLElements["tr"]

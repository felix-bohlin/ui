import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLTableElement>

export type TableBodyProps = JSX.HTMLAttributes<HTMLTableSectionElement>

export type TableCaptionProps = JSX.HTMLAttributes<HTMLTableCaptionElement>

export type TableCellProps = JSX.HTMLAttributes<HTMLTableCellElement>

export type TableColumnGroupProps = JSX.HTMLAttributes<HTMLTableColElement>

export type TableColumnProps = Base.TableColumnProps &
  JSX.HTMLAttributes<HTMLTableColElement>

export type TableFootProps = JSX.HTMLAttributes<HTMLTableSectionElement>

export type TableHeaderCellProps = JSX.HTMLAttributes<HTMLTableCellElement>

export type TableHeadProps = JSX.HTMLAttributes<HTMLTableSectionElement>

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement>

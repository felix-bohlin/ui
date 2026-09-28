import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type CellProps = Base.SectionProps &
  JSX.TdHTMLAttributes<HTMLTableCellElement>

export type ColumnGroupProps = Base.SectionProps &
  JSX.ColgroupHTMLAttributes<HTMLTableColElement>

export type ColumnProps = Base.ColumnProps &
  Omit<JSX.ColHTMLAttributes<HTMLTableColElement>, "width">

export type HeaderCellProps = Base.SectionProps &
  JSX.ThHTMLAttributes<HTMLTableCellElement>

export type Props = Base.Props & JSX.HTMLAttributes<HTMLTableElement>

export type RowProps = Base.SectionProps &
  JSX.HTMLAttributes<HTMLTableRowElement>

export type SectionProps = Base.SectionProps &
  JSX.HTMLAttributes<HTMLTableSectionElement>

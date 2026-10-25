import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"table">

export type TableBodyProps = HTMLAttributes<"tbody">

export type TableCaptionProps = HTMLAttributes<"caption">

export type TableCellProps = Base.TableCellProps & HTMLAttributes<"td">

export type TableColumnGroupProps = HTMLAttributes<"colgroup">

export type TableColumnProps = Base.TableColumnProps & HTMLAttributes<"col">

export type TableFootProps = HTMLAttributes<"tfoot">

export type TableHeaderCellProps = Base.TableCellProps & HTMLAttributes<"th">

export type TableHeadProps = HTMLAttributes<"thead">

export type TableRowProps = HTMLAttributes<"tr">

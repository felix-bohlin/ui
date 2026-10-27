import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"table">

export type TableBodyProps = ComponentProps<"tbody">

export type TableCaptionProps = ComponentProps<"caption">

export type TableCellProps = Base.TableCellProps & ComponentProps<"td">

export type TableColumnGroupProps = ComponentProps<"colgroup">

export type TableColumnProps = Base.TableColumnProps & ComponentProps<"col">

export type TableFootProps = ComponentProps<"tfoot">

export type TableHeaderCellProps = Base.TableHeaderCellProps &
  ComponentProps<"th">

export type TableHeadProps = ComponentProps<"thead">

export type TableRowProps = ComponentProps<"tr">

import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TableColumnProps as BaseTableColumnProps,
} from "./types"

export type Props = BaseProps & Class

export type TableBodyProps = Class

export type TableCaptionProps = Class

export type TableCellProps = Class

export type TableColumnGroupProps = Class

export type TableColumnProps = BaseTableColumnProps & Class

export type TableFootProps = Class

export type TableHeaderCellProps = Class

export type TableHeadProps = Class

export type TableRowProps = Class

export type Slots = DefaultSlots

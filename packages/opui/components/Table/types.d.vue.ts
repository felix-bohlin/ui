import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  SectionProps as BaseSectionProps,
  TableColumnProps as BaseTableColumnProps,
} from "./types"

export type Props = BaseProps & Class

export type SectionProps = BaseSectionProps & Class

export type TableColumnProps = BaseTableColumnProps & Class

export type Slots = DefaultSlots

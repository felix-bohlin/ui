import type { HTMLAttributes, Slot } from "vue"
import type {
  Props as BaseProps,
  SectionProps as BaseSectionProps,
  TableColumnProps as BaseTableColumnProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type SectionProps = BaseSectionProps & Class

export type TableColumnProps = BaseTableColumnProps & Class

export type Slots = {
  default?: Slot
}

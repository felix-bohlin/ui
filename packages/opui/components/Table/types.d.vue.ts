import type { HTMLAttributes, Slot } from "vue"
import type {
  ColumnProps as BaseColumnProps,
  Props as BaseProps,
  SectionProps as BaseSectionProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type ColumnProps = BaseColumnProps & Class

export type SectionProps = BaseSectionProps & Class

export type Slots = {
  default?: Slot
}

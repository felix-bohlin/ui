import type { HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type DescriptionProps = Class

export type ItemProps = Class

export type TermProps = Class

export type Slots = {
  default?: Slot
}

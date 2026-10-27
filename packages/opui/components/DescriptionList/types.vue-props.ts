import type { Class, DefaultSlots } from "../vue"
import type {
  DescriptionListItemProps as BaseDescriptionListItemProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type DescriptionListDescriptionProps = Class

export type DescriptionListItemProps = BaseDescriptionListItemProps & Class

export type DescriptionListTermProps = Class

export type Slots = DefaultSlots

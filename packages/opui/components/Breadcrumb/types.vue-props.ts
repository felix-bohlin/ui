import type { Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  BreadcrumbItemProps as BaseBreadcrumbItemProps,
  Props as BaseProps,
} from "./types"

export type BreadcrumbItemProps = BaseBreadcrumbItemProps

export type Props = Omit<BaseProps, "aria-label" | "aria-labelledby">

export type BreadcrumbItemSlots = { separator?: Slot } & DefaultSlots

export type Slots = { separator?: Slot } & DefaultSlots

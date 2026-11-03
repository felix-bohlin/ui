import type { IntrinsicElementAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TabsItemProps as BaseTabsItemProps,
  TabsLabelProps as BaseTabsLabelProps,
  TabsPanelProps as BaseTabsPanelProps,
} from "./types"

export type Props = BaseProps & {
  value?: string
} & Class & { value?: string }

export type TabsItemProps = BaseTabsItemProps &
  Class & {
    id?: IntrinsicElementAttributes["input"]["id"]
    value?: IntrinsicElementAttributes["input"]["value"]
  }

export type TabsLabelProps = BaseTabsLabelProps &
  Class & { for?: IntrinsicElementAttributes["label"]["for"] }

export type TabsPanelProps = BaseTabsPanelProps & Class

export type Slots = DefaultSlots

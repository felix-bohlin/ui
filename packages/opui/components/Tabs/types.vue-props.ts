import type { IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TabsItemProps as BaseTabsItemProps,
  TabsLabelProps as BaseTabsLabelProps,
  TabsPanelProps as BaseTabsPanelProps,
} from "./types"

export type Props = BaseProps & {
  role?: IntrinsicElementAttributes["div"]["role"]
}

export type TabsItemProps = BaseTabsItemProps & {
  id?: IntrinsicElementAttributes["input"]["id"]
  value?: IntrinsicElementAttributes["input"]["value"]
}

export type TabsLabelProps = BaseTabsLabelProps & {
  for?: IntrinsicElementAttributes["label"]["for"]
}

export type TabsPanelProps = BaseTabsPanelProps

export type Slots = DefaultSlots

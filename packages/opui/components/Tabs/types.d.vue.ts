import type { InputHTMLAttributes, LabelHTMLAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TabsItemProps as BaseTabsItemProps,
  TabsPanelProps as BaseTabsPanelProps,
  TabsLabelProps as BaseTabsLabelProps,
} from "./types"

export type Props = BaseProps & Class

export type TabsItemProps = BaseTabsItemProps &
  Class & {
    id?: InputHTMLAttributes["id"]
    value?: InputHTMLAttributes["value"]
  }

export type TabsPanelProps = BaseTabsPanelProps & Class

export type TabsLabelProps = BaseTabsLabelProps &
  Class & {
    for?: LabelHTMLAttributes["for"]
  }

export type Slots = DefaultSlots

import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  TabsItemProps as BaseTabsItemProps,
  TabsPanelProps as BaseTabsPanelProps,
  TabsTabProps as BaseTabsTabProps,
} from "./types"

export type Props = BaseProps & Class

export type TabsItemProps = BaseTabsItemProps & Class

export type TabsPanelProps = BaseTabsPanelProps & Class

export type TabsTabProps = BaseTabsTabProps & Class

export type Slots = DefaultSlots

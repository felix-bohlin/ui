import type { HTMLAttributes, InjectionKey, Slot } from "vue"
import type {
  Props as BaseProps,
  TabsItemProps as BaseTabsItemProps,
  TabsPanelProps as BaseTabsPanelProps,
  TabsTabProps as BaseTabsTabProps,
} from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type TabsItemProps = BaseTabsItemProps & {
  class?: HTMLAttributes["class"]
}

export type TabsPanelProps = BaseTabsPanelProps & {
  class?: HTMLAttributes["class"]
}

export type TabsTabProps = BaseTabsTabProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
}

export const TabsGroupNameKey = Symbol() as InjectionKey<string>
export const CurrentTabIdKey = Symbol() as InjectionKey<string>
export const CurrentPanelIdKey = Symbol() as InjectionKey<string>

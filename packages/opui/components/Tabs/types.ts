import type { HTMLAttributes, InjectionKey } from 'vue'

export type Props = {
  [key: string]: any
  class?: HTMLAttributes['class']
  name?: string
}

export type TabsItemProps = {
  class?: HTMLAttributes['class']
  name?: string
  open?: boolean
  tabId?: string
  panelId?: string
}

export const TabsGroupNameKey = Symbol() as InjectionKey<string>
export const CurrentTabIdKey = Symbol() as InjectionKey<string>
export const CurrentPanelIdKey = Symbol() as InjectionKey<string>

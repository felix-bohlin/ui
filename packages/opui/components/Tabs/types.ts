export type Props = {
  name?: string
  variant?: "line"
}

export type TabsItemProps = {
  name?: string
  open?: boolean
  panelId?: string
  tabId?: string
}

export type TabsTabProps = {
  tabId?: string
}

export type TabsPanelProps = {
  panelId?: string
  tabId?: string
}

export type Props = {
  name?: string
  scrollable?: boolean
  variant?: "filled" | "line" | "outlined" | "tonal"
}

export type TabsItemProps = {
  name?: string
  open?: boolean
  tabId?: string
}

export type TabsPanelProps = {}

export type TabsTabProps = {
  tabId?: string
}

export type Context = {
  groupName?: string
  tabId?: string
}

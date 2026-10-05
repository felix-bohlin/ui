export type Props = {
  name?: string
  scrollable?: boolean
  variant?: "filled" | "line" | "outlined"
}

export type TabsItemProps = {
  name?: string
  open?: boolean
  tabId?: string
}

export type TabsTabProps = {
  tabId?: string
}

export type TabsPanelProps = {}

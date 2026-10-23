export type Props = {
  name?: string
  overflow?: "scroll" | "wrap"
  variant?: "filled" | "line" | "outlined" | "tonal"
}

export type TabsItemProps = {
  checked?: boolean
  name?: string
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

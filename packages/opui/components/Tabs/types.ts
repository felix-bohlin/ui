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

export type TabsLabelProps = {
  tabId?: string
}

export type Context = {
  groupName?: string
  tabId?: string
}

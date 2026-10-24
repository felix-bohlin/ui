export type Props = {
  name?: string
  overflow?: "scroll" | "wrap"
  variant?: "filled" | "line" | "outlined" | "tonal"
}

export type TabsItemProps = {
  checked?: boolean
  name?: string
}

export type TabsPanelProps = {}

export type TabsLabelProps = {}

export type Context = {
  change?: (input: HTMLInputElement) => void
  groupName?: string
  tabId?: string
  value?: string
}

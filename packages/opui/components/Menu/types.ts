export type MenuItem = {
  borderTop?: boolean
  color?: "critical"
  disabled?: boolean
  href?: string
  keepOpen?: boolean
  label: string
  shortcut?: string
}

export type Props = {
  align?: "start" | "end"
  bordered?: boolean
  dense?: boolean
  id: string
  items?: MenuItem[]
  orientation?: "horizontal" | "vertical"
  popover?: "auto" | "manual"
  side?: "block-end" | "block-start" | "inline-end" | "inline-start"
}

export type Context = {
  rootId?: string
}

export type MenuItem = {
  borderTop?: boolean
  closeOnClick?: boolean
  color?: "critical"
  disabled?: boolean
  href?: string
  shortcut?: string
  text: string
}

export type Props = {
  align?: "start" | "end"
  bordered?: boolean
  dense?: boolean
  id?: string
  items?: MenuItem[]
  popover?: "auto" | "manual"
  side?: "block-end" | "block-start" | "inline-end" | "inline-start"
}

export type Context = {
  rootId?: string
}

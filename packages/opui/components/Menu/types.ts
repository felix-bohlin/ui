export type MenuItem = {
  borderTop?: boolean
  closeOnClick?: boolean
  critical?: boolean
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
  placement?: "block-end" | "block-start" | "inline-end" | "inline-start"
  popover?: "auto" | "manual"
}

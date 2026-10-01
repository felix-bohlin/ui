export type MenuItem = {
  borderTop?: boolean
  closeOnClick?: boolean
  critical?: boolean
  disabled?: boolean
  href?: string
  label: string
  shortcut?: string
}

export type Props = {
  align?: "start" | "end"
  dense?: boolean
  id?: string
  items?: MenuItem[]
  placement?: "block-end" | "block-start" | "inline-end" | "inline-start"
  popover?: "auto" | "manual"
}

export type Slots<S> = {
  children?: S
}

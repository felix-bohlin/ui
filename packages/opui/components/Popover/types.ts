export type Props = {
  align?: "start" | "end"
  closeOnNavigate?: boolean
  id: string
  popover?: "auto" | "manual"
  side?: "block-end" | "block-start" | "inline-end" | "inline-start"
}

export type PopoverContentProps = {}

export type PopoverFooterProps = {
  align?: "start" | "end"
}

export type PopoverHeaderProps = {
  closeLabel?: string
}

export type PopoverHeaderSlots<S> = {
  closeIcon?: S
}

export type PopoverTitleProps = {
  as?: "h2" | "h3" | "h4" | "h5" | "h6"
}

export type Context = {
  id?: string
  titleId?: string
}

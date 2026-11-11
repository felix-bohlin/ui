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

export type PopoverTitleProps = {}

export type Context = {
  id?: string
  titleId?: string
}

export type Props = {
  closedby?: "any" | "closerequest" | "none"
}

export type DialogContentProps = {}

export type DialogFooterProps = {
  align?: "start" | "end"
}

export type DialogHeaderProps = {
  closeLabel?: string
}

export type DialogHeaderSlots<S> = {
  closeIcon?: S
}

export type DialogTitleProps = {}

export type Context = {
  id?: string
  titleId?: string
}

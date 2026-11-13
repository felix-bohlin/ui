export type Props = {
  backdrop?: "blurred" | "transparent"
  closedby?: "any" | "closerequest" | "none"
  closeOnNavigate?: boolean
  id: string
  scrollLock?: boolean
  side?: "block-end" | "block-start" | "inline-end" | "inline-start"
}

export type DrawerContentProps = {}

export type DrawerFooterProps = {
  align?: "start" | "end"
}

export type DrawerHeaderProps = {
  closeButton?: boolean
  closeLabel?: string
  commandfor?: string
}

export type DrawerHeaderSlots<S> = {
  closeIcon?: S
}

export type DrawerTitleProps = {}

export type Context = {
  id: string
  titleId?: string
}

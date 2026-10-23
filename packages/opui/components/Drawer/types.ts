export type Props = {
  backdrop?: "blurred" | "transparent"
  closedby?: "any" | "closerequest" | "none"
  id: string
  scrollLock?: boolean
  side?: "block-end" | "block-start" | "inline-end" | "inline-start"
}

export type DrawerActionsProps = {
  align?: "start" | "end"
}

export type DrawerContentProps = {}

export type DrawerHeaderProps = {
  closeLabel?: string
  commandfor?: string
}

export type DrawerTitleProps = {}

export type Context = {
  id: string
  titleId?: string
}

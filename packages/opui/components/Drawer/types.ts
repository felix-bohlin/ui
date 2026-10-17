export type Props = {
  backdrop?: "transparent" | "blurred"
  closedby?: "any" | "closerequest" | "none"
  id?: string
  scrollLock?: boolean
  side?: "inline-start" | "inline-end" | "block-start" | "block-end"
}

export type DrawerContentProps = {}

export type DrawerFooterProps = {}

export type DrawerHeaderProps = {
  closeLabel?: string
  commandfor?: string
}

export type DrawerTitleProps = {}

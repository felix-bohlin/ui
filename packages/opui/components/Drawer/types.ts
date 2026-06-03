export type Props = {
  backdrop?: "transparent" | "blurred"
  closedby?: "any" | "closerequest" | "none"
  id?: string
  scrollLock?: boolean
  side?: "inline-start" | "inline-end" | "block-start" | "block-end"
}

export type DrawerHeaderProps = {
  heading?: string
}

export type DrawerFooterProps = {}

export type Slots<S> = {
  content?: S
  footer?: S
  header?: S
}

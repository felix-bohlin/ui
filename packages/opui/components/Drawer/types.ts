export type Props = {
  [key: string]: any
  backdrop?: "transparent" | "blurred"
  closedby?: "any" | "closerequest" | "none"
  id?: string
  scrollLock?: boolean
  side?: "inline-start" | "inline-end" | "block-start" | "block-end"
}

export type DrawerHeaderProps = {
  [key: string]: any
  heading?: string
}

export type DrawerFooterProps = {
  [key: string]: any
}

export type Slots<S> = {
  content?: S
  footer?: S
  header?: S
}

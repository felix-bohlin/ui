export type Props = {
  closedby?: "any" | "closerequest" | "none"
}

export type DialogContentProps = {}

export type DialogFooterProps = {
  align?: "start" | "end"
}

export type DialogHeaderProps =
  | {
      closeButton: boolean
      closeLabel?: string
      commandfor?: string
    }
  | {
      closeButton?: never
      closeLabel?: never
      commandfor?: never
    }

export type DialogHeaderSlots<S> =
  | {
      closeButton: boolean
      closeIcon?: S
    }
  | {
      closeButton?: never
      closeIcon?: never
    }

export type DialogTitleProps = {}

export type Context = {
  id?: string
  titleId?: string
}

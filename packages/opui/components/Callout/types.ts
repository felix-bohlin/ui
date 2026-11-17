export type Props = {
  closeButton?: boolean
  closeLabel?: string
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "outlined" | "tonal"
}

export type CalloutActionsProps = {}

export type CalloutContentProps = {}

export type CalloutIconProps = {}

export type Context = Pick<Props, "severity">

export type Events = {
  dismiss: Event
}

export type Slots<S> = {
  closeIcon?: S
}

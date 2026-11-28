export type Props = {
  color?: "accent"
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "outlined" | "tonal"
} & (
  | {
      closeButton: boolean
      closeLabel?: string
    }
  | {
      closeButton?: never
      closeLabel?: never
    }
)

export type CalloutActionsProps = {}

export type CalloutContentProps = {}

export type CalloutIconProps = {}

export type Context = Pick<Props, "severity">

export type Events = {
  dismiss: Event
}

export type Slots<S> =
  | {
      closeButton: boolean
      closeIcon?: S
    }
  | {
      closeButton?: never
      closeIcon?: never
    }

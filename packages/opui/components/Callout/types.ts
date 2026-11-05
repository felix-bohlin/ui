export type Props = {
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "outlined" | "tonal"
}

export type CalloutActionsProps = {}

export type CalloutContentProps = {}

export type CalloutIconProps = {}

export type Context = Pick<Props, "severity">

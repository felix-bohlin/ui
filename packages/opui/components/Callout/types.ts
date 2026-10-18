export type Props = {
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "tonal" | "outlined"
}

export type CalloutContentProps = {}

export type CalloutIconProps = {}

export type Context = Pick<Props, "severity">
